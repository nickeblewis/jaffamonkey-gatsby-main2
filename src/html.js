import React from 'react';
import Helmet from 'react-helmet';

let stylesStr;
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`);
  } catch (e) {
    console.error(e);
  }
}

module.exports = props => {
  const head = Helmet.rewind();
  let css;
  if (process.env.NODE_ENV === `production`) {
    css = (
      <style
        id="gatsby-inlined-css"
        dangerouslySetInnerHTML={{ __html: stylesStr }}
      />
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="jaffamonkey - UI Engineer / San Francisco, CA"
        />
        <link href={require('./images/ewh.ico')} rel="icon" />
        {props.headComponents}
        {css}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="jaffamonkey.com"
          href="/rss.xml"
        />
        <link href='//cdn.jsdelivr.net/devicons/1.8.0/css/devicons.min.css' rel='stylesheet'>
      </head>
      <body>
        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  );
};
