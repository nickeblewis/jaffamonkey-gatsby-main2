import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';
import ContentHeader from '../components/ContentHeader';
import Main from '../components/Main';
import cssStyles from '../css/prism.css';

class Page extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <ContentHeader title={post.frontmatter.title} />
        <Main html={post.html} />
      </div>
    );
  }
}

export default Page;

export const pageQuery = graphql`
  query PageByPath($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug }}) {
      id
      html
      frontmatter {
        title
        date
      }
    }
  }
`;
