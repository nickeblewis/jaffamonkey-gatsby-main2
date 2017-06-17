const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');
const slugify = require('slugify');

const resourceTypePathMap = {
  posts: {
    path: '/blog',
    component: path.resolve('./src/templates/post.js')
  },
  pages: {
    component: path.resolve('./src/templates/page.js')
  }
};

const createTags = (tags) => {
  if (!tags) {
    return [];
  } else if (_.isArray(tags)) {
    return tags;
  }

  return tags.split(',').map(tag => tag.trim());
}

const ensureSlashes = slug => {
  if (slug.charAt(0) !== '/') {
    slug = '/' + slug;
  }

  if (slug.charAt(slug.length - 1) !== '/') {
    slug = slug + '/';
  }

  return slug.toLowerCase();
};

const parsePostFileName = fileNode => {
  return path.basename(
    fileNode.relativePath,
    path.extname(fileNode.relativePath)
  );
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const pages = [];
    resolve(
      graphql(
        `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                slug
                collection
              },
              frontmatter {
                title,
                tags
              }
            }
          }
        }
      }
    `
      ).then(result => {
        if (result.errors) {
          console.error('[BUILD ERROR]', result.errors);
          return reject(result.errors);
        }

        const nodes = result.data.allMarkdownRemark.edges.map(e => e.node);

        // Create blog posts pages.
        _.each(nodes, node => {
          createPage({
            path: node.fields.slug, // required
            component:
              resourceTypePathMap[node.fields.collection].component,
            context: {
              slug: node.fields.slug,
              collection: node.fields.collection
            }
          });
        });

        // create tag pages
        const tags = _.uniq(_.flatMap(nodes, n => createTags(n.frontmatter.tags)));

        _.each(tags, tag => {
          const tagPath = slugify(tag);
          createPage({
            path: `/blog/tags/${tagPath}/`, // required
            component: path.resolve('./src/templates/tags.js'),
            context: {
              tag
            }
          });
        });
        // create pagination
      })
    );
  });
};

// Add custom slug for blog posts to both File and MarkdownRemark nodes.
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  switch (node.internal.type) {
    case 'File':
      const parsedFilePath = path.parse(node.relativePath);
      const slug = `/${parsedFilePath.dir}/`;
      createNodeField({
        node,
        fieldName: 'slug',
        fieldValue: slug
      });
      return;

    case 'MarkdownRemark':
      const fileNode = getNode(node.parent);
      let nodeSlug = ensureSlashes(
        _.get(node, 'frontmatter.path') ||
          slugify(
            _.get(node, 'frontmatter.title') || parsePostFileName(fileNode)
          )
      );

      if (
        nodeSlug &&
        resourceTypePathMap[fileNode.sourceInstanceName] &&
        resourceTypePathMap[fileNode.sourceInstanceName].path
      ) {
        nodeSlug =
          resourceTypePathMap[fileNode.sourceInstanceName].path + nodeSlug;
      }

      createNodeField({
        node,
        fieldName: 'collection',
        fieldValue: fileNode.sourceInstanceName
      });

      if (nodeSlug) {
        createNodeField({ node, fieldName: 'slug', fieldValue: nodeSlug });
      }
      return;
  }
};
