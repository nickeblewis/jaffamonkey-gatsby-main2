import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import ContentHeader from '../components/ContentHeader';
import Wrapper from '../components/Wrapper';
import Container from '../components/Container';

const NotFound = (props) => {
  return (
    <div>
      <Helmet title={props.data.site.siteMetadata.title} />
      <ContentHeader title="404 - ¯\(°_o)/¯" />
    </div>
  );
};

NotFound.propTypes = {
  route: PropTypes.object
};

export default NotFound;

export const pageQuery = graphql`
query NotFoundQuery {
  site {
    siteMetadata {
      title
    }
  }
}
`;
