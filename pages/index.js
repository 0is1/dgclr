// @flow

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { getTitle } from 'helpers/utils';
import withApollo from 'lib/withApollo';
import Container from 'components/Container';
import SearchContainer from 'components/SearchContainer';

type Props = {};
class Index extends Component<Props> {
  componentDidMount() {
    console.log('Hello index!');
  }

  render() {
    return (
      <Container activeRoute="/">
        <Helmet>
          <title>{getTitle()}</title>
        </Helmet>
        <SearchContainer />
      </Container>
    );
  }
}

export default withApollo(Index);
