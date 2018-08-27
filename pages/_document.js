import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';

export default class extends Document {
  // w/ styled componentns
  // see https://github.com/zeit/next.js/blob/canary/examples/with-styled-components/pages/_document.js
  static async getInitialProps({ renderPage, ...args }) {
    const documentProps = await super.getInitialProps({
      renderPage,
      ...args,
    });
    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    const combined = { ...documentProps, ...page };
    return {
      ...combined,
      helmet: Helmet.renderStatic(),
      styleTags,
    };
  }

  // should render on <html>
  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  // should render on <body>
  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  // should render on <head>
  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent());
  }

  // eslint-disable-next-line class-methods-use-this
  get helmetJsx() {
    return <Helmet htmlAttributes={{ lang: 'fi' }} title="DGCLR" />;
  }

  render() {
    return (
      <html lang="fi" {...this.helmetHtmlAttrComponents}>
        <Head>
          {this.helmetJsx}
          {this.helmetHeadComponents}
          {this.props.styleTags}
        </Head>
        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
