import App, { Container } from 'next/app';
import Link from 'next/link';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
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
        <header>
          <nav>
            <Link href="/">
              <a href="/">Home</a>
            </Link>
            |
          </nav>
        </header>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
        <footer>I`m here to stay</footer>
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga({ async: true })(MyApp));
