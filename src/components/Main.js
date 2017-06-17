import React from 'react';
import Wrapper from './Wrapper';

const css = {
  contentContainer: {
    margin: '0 auto',
  },
};

const Main = ({html, children}) => {
  return (
    <Wrapper tag="main">
      <div css={css.contentContainer}>
        { html && (
          <article className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
        )}
        { children }
      </div>
    </Wrapper>
  );
};

export default Main;
