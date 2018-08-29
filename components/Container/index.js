// @flow
import React from 'react';
import Link from 'next/link';
import { Tabs, Tab, Text } from 'rebass';
import Styles from './Container.styles';

type Props = {
  activeRoute?: string,
  children: Node,
};

const { Container, HeaderLink } = Styles;

const ContainerComponent = ({ activeRoute, children }: Props) => (
  <React.Fragment>
    <header>
      <Tabs px={4} pt={2}>
        <Tab borderColor={activeRoute === '/' ? 'blue' : 'transparent'} px={3}>
          <Link href="/">
            <HeaderLink>Haku</HeaderLink>
          </Link>
        </Tab>
        {/* <Tab px={3}>
          <Link href="/">
            <HeaderLink>Info</HeaderLink>
          </Link>
        </Tab> */}
      </Tabs>
    </header>
    <Container>{children}</Container>
    <footer>
      <Text mt={2} textAlign="center">
        DGCLR ei vastaa sivujen sisällön oikeellisuudesta tai virheettömyydestä!
      </Text>
    </footer>
  </React.Fragment>
);
ContainerComponent.defaultProps = {
  activeRoute: '',
};

export default ContainerComponent;
