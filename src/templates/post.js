import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';
import formatDate from 'date-fns/format';
import Disqus from '../components/Disqus';
import ContentHeader from '../components/ContentHeader';
import Wrapper from '../components/Wrapper';
import Container from '../components/Container';
import slugify from 'slugify';
import '../css/prism.css';
import '../css/style.css';

const css = {
  comments: {
    width: '100%',
    maxWidth: '820px',
    margin: '4rem auto 2rem',
    padding: '0 1rem'
  },
  tagLink: {
    color: '#E32B46'
  }
};

class BlogPost extends React.Component {
  renderTags = (post) => {
    const tags = get(post, 'frontmatter.tags');
    const tagCount = tags.length;
    const addComma = (i) => {
      if(i === tagCount - 1) {
        return null;
      }

      return ', ';
    };
    return tags.map((tag, i) => {
      const path = slugify(tag);
      return (
        <span key={tag}>
          <Link css={css.tagLink} to={`/blog/tags/${path}`}>{tag}</Link>
          {addComma(i)}
        </span>
      )
    });
  }
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const date = formatDate(get(post, 'frontmatter.date'), 'MMMM D, YYYY');
    const tags = this.renderTags(post);
    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <ContentHeader title={post.frontmatter.title} date={date} tags={tags} />
        <Wrapper tag="main">
          <Container>
            <article className="markdown" dangerouslySetInnerHTML={{ __html: post.html }} />
            <section css={css.comments}>
              <Disqus
                shortname="eddywashere"
        				title={post.frontmatter.title}
        				url={'http://eddywashere.com' + this.props.location.pathname}
              />
            </section>
          </Container>
        </Wrapper>
      </div>
    );
  }
}

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!, $collection: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark( fields: {
       slug: { eq: $slug }
       collection: { eq: $collection }
     }
   ) {
      id
      html
      frontmatter {
        date
        title
        tags
      }
    }
  }
`;
