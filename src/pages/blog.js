import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import Helmet from 'react-helmet';
import selfie from '../images/me.jpg';
import formatDate from 'date-fns/format';
import ContentHeader from '../components/ContentHeader';
import Wrapper from '../components/Wrapper';
import Container from '../components/Container';

const createTags = tags => {
  if (!tags) {
    return [];
  } else if (isArray(tags)) {
    return tags;
  }

  return tags.split(',').map(tag => tag.trim());
};

const css = {
  button: {
    color: '#fff',
    border: '1px solid #F39C12',
    padding: '.5rem 1rem',
    display: 'inline-block',
    borderRadius: '2px',
    fontSize: '1rem',
    backgroundColor: '#F39C12',
    marginTop: '1rem',
    textDecoration: 'none',
    ':hover': {
      backgroundColor: 'transparent',
      color: '#F39C12'
    }
  },
  posts: {
    margin: '2rem 0 0 0'
  },
  post: {
    margin: '0 0 3rem 0'
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

class BlogIndex extends React.Component {

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

    return (
      <div>
        <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />
        <ContentHeader title="Blog Archive" />
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

BlogIndex.propTypes = {
  route: PropTypes.object
};

export default BlogIndex;

export const pageQuery = graphql`
query BlogQuery {
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date] },
    filter: {
      frontmatter: { draft: { ne: true } },
      fields: { collection: { eq: "posts" }}
    }
  ) {
    edges {
      node {
        excerpt(pruneLength: 168),
        frontmatter {
          title,
          tags,
          date
        }
        fields {
          slug
        }
      }
    }
  }
}
`;
