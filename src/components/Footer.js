import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import selfie from '../images/me.jpg';

const css = {
  selfie: {
    borderRadius: '100%',
    display: 'inline-block',
    width: '4rem'
  },
  wrapper: {},
  container: {
    margin: '4rem 0',
    padding: '0 1rem',
    textAlign: 'center',
    fontSize: '0.9rem'
  },
  p: {
    margin: '0.5rem 0'
  }
};

const Footer = props => {
  const renderSelfie = get(props, 'location.pathname') !== '/';
  return (
    <footer css={css.wrapper}>
      <div css={css.container}>
        {renderSelfie &&
          <img css={css.selfie} src={selfie} title="Eddy Hernandez" />}
        <p css={css.p}>
          <strong>eddy was here</strong>
        </p>
        <p css={css.p}>
          follow me on <a href="https://twitter.com/eddywashere/">twitter</a>{' '}
          &amp; <a href="https://github.com/eddywashere">github</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
