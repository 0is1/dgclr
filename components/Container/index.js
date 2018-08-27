// @flow
import React from 'react';
import Styles from './Container.styles';

type Props = {
  children: Node,
};

const { Container } = Styles;

export default ({ children }: Props) => <Container>{children}</Container>;
