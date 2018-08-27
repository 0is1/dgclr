// @flow

import React, { Component } from 'react';
import SearchContainer from 'components/SearchContainer';

type Props = {};
class Index extends Component<Props> {
  componentDidMount() {
    console.log('Hello mom!');
  }

  render() {
    return <SearchContainer />;
  }
}

export default Index;
