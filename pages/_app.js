import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { Provider as RebassProvider } from 'rebass';
import { createGlobalStyle } from 'styled-components';
import { appWithTranslation } from 'lib/i18n';
import { configureStore } from 'lib/withReduxSaga';

const GlobalStyle = createGlobalStyle`
  a {
    color: #280ea7;
    &:hover {
        color: #5836fb;
    }
  }
`;

class DGCLRApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <GlobalStyle />
        <RebassProvider>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </RebassProvider>
      </>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(appWithTranslation(DGCLRApp)));
