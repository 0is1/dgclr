import App, { Container } from 'next/app';
import Link from 'next/link';
import React from 'react';
import withReduxSaga from 'lib/withReduxSaga';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
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

        <Component {...pageProps} />

        <footer>I`m here to stay</footer>
      </Container>
    );
  }
}

export default withReduxSaga(MyApp);
