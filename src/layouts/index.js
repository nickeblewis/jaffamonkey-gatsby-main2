import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import NavHeader from '../components/NavHeader';
import ContentHeader from '../components/ContentHeader';
import Footer from '../components/Footer';


import 'typeface-lato';

const css = {
  wrapper: {
    minHeight: '100vh',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  }
};

class Layout extends React.Component {
  render() {
    const { location, children } = this.props;
    // add Header and Footer, pass props
    return (
      <div css={css.wrapper}>
        <NavHeader {...this.props} />
        <div css={css.content}>
          {children()}
        </div>
        <Footer {...this.props} />
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object
};

export default Layout;
