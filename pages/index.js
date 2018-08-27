// @flow

import React, { Component } from 'react';
import Container from 'components/Container';

type Props = {};
class Index extends Component<Props> {
  componentDidMount() {
    console.log('Hello mom!');
  }

  render() {
    return <Container>This is next.js! </Container>;
  }
}

export default Index;
