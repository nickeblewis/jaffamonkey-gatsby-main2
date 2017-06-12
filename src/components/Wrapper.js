import React from 'react';

const styles = {
  wrapper: {
    ':after': {
      clear: 'both',
      display: 'block',
      content: '""',
      height: '1px',
      backgroundImage: 'linear-gradient(to right, transparent 2%, rgba(0,0,0,0.08) 10%, rgba(0,0,0,0.08) 90%, transparent 98%)',
    }
  }
};

const Wrapper = ({ tag: Tag, css = {}, ...props}) => {
  Tag = Tag || 'div';
  return (
    <Tag css={{ ...styles.wrapper, ...css}} {...props}/>
  );
};

export default Wrapper;
