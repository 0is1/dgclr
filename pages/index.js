// @flow

import React, { Component } from 'react';

type Props = {};
class Index extends Component<Props> {
  componentDidMount() {
    console.log('Hello mom!');
  }

  render() {
    return <div>This is next.js! </div>;
  }
}

export default Index;
