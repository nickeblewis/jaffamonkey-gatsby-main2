import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import Helmet from 'react-helmet';
import ContentHeader from '../components/ContentHeader';
import Wrapper from '../components/Wrapper';
import Container from '../components/Container';
import selfie from '../images/me.jpg';
import formatDate from 'date-fns/format';

const createTags = tags => {
  if (!tags) {
    return [];
  } else if (isArray(tags)) {
    return tags;
  }

  return tags.split(',').map(tag => tag.trim());
};

const css = {
  posts: {
    margin: '0'
  },
  post: {
    margin: '0 0 3rem 0',
    ':last-child': {
      margin: '0'
    }
  },
  postDate: {
    color: '#999',
    fontWeight: '600',
    fontSize: '.77519rem',
    margin: '0'
  },
  postTitle: {
    margin: '0 0 .5rem 0',
    color: '#F39C12',
    fontWeight: '400',
    fontSize: '1.6rem'
  },
  postExcerpt: {
    color: '#666',
    lineHeight: '1.5rem',
    margin: '0 0 .5rem 0',
  }
};

class TagsTemplate extends React.Component {

  renderPosts = () => {
    const articles = [];
    const posts = get(this, 'props.data.allMarkdownRemark.edges', []);
    posts.forEach(post => {
      const title = get(post, 'node.frontmatter.title', 'missing title');
      const tags = createTags(get(post, 'node.frontmatter.tags'));
      const date = formatDate(get(post, 'node.frontmatter.date'), 'MMMM D, YYYY');
      articles.push(
        <article css={css.post} key={post.node.fields.slug}>
          <Link to={post.node.fields.slug}>
            <date css={css.postDate}>{date}</date>
            <h4 css={css.postTitle}>{post.node.frontmatter.title}</h4>
            <p css={css.postExcerpt}>{post.node.excerpt}</p>
          </Link>
        </article>
      );
    });

    return articles;
  }
  render() {
    const posts = this.renderPosts();
    const title = (
      <span>Tag: <i style={{color: '#777'}}>{this.props.pathContext.tag}</i></span>
    );

    return (
      <div>
        <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />
        <ContentHeader title={title} />
        <Wrapper tag="main">
          <Container size="small">
            <section css={css.posts}>
              {posts}
            </section>
          </Container>
        </Wrapper>
      </div>
    );
  }
}

TagsTemplate.propTypes = {
  route: PropTypes.object
};

export default TagsTemplate;

export const pageQuery = graphql`
  query BlogPostsByTags($tag: String!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { tags: { in: [$tag] } }
        fields: { collection: { eq: "posts" } }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 168),
          fields {
            slug
          }
          frontmatter {
            title,
            tags,
            date
          }
        }
      }
    }
  }
`;
