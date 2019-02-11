// @flow
import React, { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Tabs, Tab, Text } from 'rebass';
import * as gtag from 'lib/gtag';
import colors from 'components/colors';
import Styles from './Container.styles';

type Props = {
  activeRoute?: string,
  children: Node,
  router: {
    events: {
      on: Function,
      off: Function,
    },
  },
};

const { Container, Footer, HeaderLink } = Styles;

class ContainerComponent extends Component<Props> {
  static defaultProps = {
    activeRoute: '',
  };

  componentDidMount() {
    const { router } = this.props;
    router.events.on('routeChangeComplete', this.handleRouteChange);
  }

  componentWillUnmount() {
    const { router } = this.props;
    router.events.off('routeChangeComplete', this.handleRouteChange);
  }

  handleRouteChange = (url) => {
    gtag.pageview(url);
  };

  render() {
    const { activeRoute, children } = this.props;
    return (
      <React.Fragment>
        <header>
          <Tabs px={4} pt={2}>
            <Tab hover={{ borderColor: colors.border }} borderColor={activeRoute === '/' ? `${colors.border}` : 'transparent'} px={3}>
              <Link href="/">
                <HeaderLink>Haku</HeaderLink>
              </Link>
            </Tab>
            <Tab hover={{ borderColor: colors.border }} borderColor={activeRoute === 'info' ? `${colors.border}` : 'transparent'} px={3}>
              <Link href="/info">
                <HeaderLink>Info</HeaderLink>
              </Link>
            </Tab>
          </Tabs>
        </header>
        <Container p={['0 0 2rem 0', '0.5rem 0', '0.5rem 0', '2rem 0']}>{children}</Container>
        <Footer>
          <Text mt={2} textAlign="center">
            DGCLR.fi ei vastaa sivujen sisällön oikeellisuudesta tai virheettömyydestä!
          </Text>
          <Text mt={2} textAlign="center">
            <a
              className="github-button"
              href="https://github.com/0is1/dgclr"
              data-size="large"
              data-show-count="false"
              aria-label="See 0is1/dgclr in GitHub"
            >
              See code in GitHub
            </a>
          </Text>
        </Footer>
      </React.Fragment>
    );
  }
}

export default withRouter(ContainerComponent);
