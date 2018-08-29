import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { Provider as RebassProvider } from 'rebass';
import { configureStore } from 'lib/withReduxSaga';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <RebassProvider>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </RebassProvider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga({ async: true })(MyApp));
