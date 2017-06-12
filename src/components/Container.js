import React from 'react';
// import Link from 'gatsby-link';

const styles = {
  none: {
    margin: '0 auto',
  },
  large: {
    width: '100%',
    maxWidth: '1280px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '3rem 1rem',
    '@media(min-width: 480px)': {
      padding: '4rem 0.5rem',
    },
    '@media(min-width: 1200px)': {
      padding: '5rem 0.5rem',
    }
  },
  small: {
    width: '100%',
    maxWidth: '820px',
    margin: '0 auto',
    padding: '3rem 1rem',
    '@media(min-width: 480px)': {
      padding: '4rem 0.5rem',
    },
    '@media(min-width: 1200px)': {
      padding: '4rem 0.5rem',
    }
  },
};

const Container = ({ tag: Tag, size = "none", css = {}, ...props}) => {
  Tag = Tag || 'div';

  return (
    <Tag css={{ ...styles[size], ...css}} {...props}/>
  );
};

export default Container;
