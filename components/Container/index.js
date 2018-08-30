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
    events: {},
  },
};

const { Container, Footer, HeaderLink } = Styles;

class ContainerComponent extends Component<Props> {
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
            <Tab
              hover={{ borderColor: colors.border }}
              borderColor={activeRoute === '/' ? `${colors.border}` : 'transparent'}
              px={3}
            >
              <Link href="/">
                <HeaderLink>Haku</HeaderLink>
              </Link>
            </Tab>
            <Tab
              hover={{ borderColor: colors.border }}
              borderColor={activeRoute === 'info' ? `${colors.border}` : 'transparent'}
              px={3}
            >
              <Link href="/info">
                <HeaderLink>Info</HeaderLink>
              </Link>
            </Tab>
          </Tabs>
        </header>
        <Container>{children}</Container>
        <Footer>
          <Text mt={2} textAlign="center">
            DGCLR ei vastaa sivujen sisällön oikeellisuudesta tai virheettömyydestä!
          </Text>
        </Footer>
      </React.Fragment>
    );
  }
}

ContainerComponent.defaultProps = {
  activeRoute: '',
};

export default withRouter(ContainerComponent);
