import React from 'react';
import Link from 'gatsby-link';
import logo from '../images/ewh.png';

const css = {
  nav: {
    width: '100%',
    maxWidth: '1280px',
    margin: '0.5rem auto 0',
    display: 'flex',
    alignItems: 'center'
  },
  logoLink: {
    marginRight: 'auto'
  },
  logo: {
    display: 'block',
    height: '5rem',
    width: '5rem',
    margin: '0 .75rem 0 0',
    opacity: '.75',
    padding: '0.5rem',
    '@media(min-width: 800px)': {
      height: '5.5rem',
      width: '5.5rem',
    }
  },
  list: {
    display: 'flex',
    margin: '0',
    padding: '0',
    alignItems: 'center'
  },
  listItem: {
    listStyle: 'none',
    margin: '0 .5rem',
    padding: '.5rem',
    '@media(min-width: 800px)': {
      margin: '0 .75rem'
    }
  },
  listItemLink: {
    color: '#666',
    textTransform: 'uppercase',
    textShadow: '1px 1px 0 white',
    textDecoration: 'none',
    fontSize: '1rem'
  },
  menu: {
    flex: '1'
  }
};

const NavHeader = props => {
  return (
    <div>
      <nav css={css.nav}>
        <Link css={css.logoLink} to={'/'}>
          <img src={logo} css={css.logo} />
        </Link>
        <ul css={css.list}>
        <li css={css.listItem}>
            <Link css={css.listItemLink} to={'/profile/'}>Profile</Link>
        </li>
        <li css={css.listItem}>
          <Link css={css.listItemLink} to={'/test-automation/'}>Test Engineering</Link>
        </li>
        <li css={css.listItem}>
        <Link css={css.listItemLink} to={'/security-testing/'}>Security</Link>
        </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavHeader;
