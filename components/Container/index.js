// @flow
import React from 'react';
import Link from 'next/link';
import { Tabs, Tab, Text } from 'rebass';

import colors from 'components/colors';
import Styles from './Container.styles';

type Props = {
  activeRoute?: string,
  children: Node,
};

const { Container, Footer, HeaderLink } = Styles;

const ContainerComponent = ({ activeRoute, children }: Props) => (
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
ContainerComponent.defaultProps = {
  activeRoute: '',
};

export default ContainerComponent;
