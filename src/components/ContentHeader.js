import React from 'react';
import Wrapper from './Wrapper';
import Container from './Container';

const css = {
  title: {
    fontSize: '3.46rem',
    margin: '0',
    fontWeight: '300',
    color: '#555'
  },
  subtitle: {
    fontSize: '1.1rem',
    margin: '0',
  },
  leading: {
    fontSize: '1.1rem'
  },
  p: {
    margin: '0'
  },
  tags: {
    margin: '0',
    fontSize: '0.85rem'
  },
};

const ContentHeader = ({title, date, tags, children}) => {
  return (
    <Wrapper tag="header">
      <Container size="large">
        { title && (
          <h1 css={css.title}>{title}</h1>
        )}
        { date && (
          <p css={css.p}>
            Published on {date}
          </p>
        )}
        { tags && (
          <p css={css.tags}>{tags}</p>
        )}
        {children}
      </Container>
    </Wrapper>
  );
};

export default ContentHeader;
