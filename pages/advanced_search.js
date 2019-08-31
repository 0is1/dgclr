// @flow
import React from 'react';
import { Helmet } from 'react-helmet';
import withApollo from 'lib/withApollo';
import { getTitle } from 'helpers/utils';
import Container from 'components/Container';
import AdvancedSearch from 'components/AdvancedSearch';

type Props = {};

const AdvancedSearchPage = (): Props => (
  <Container activeRoute="/advanced_search">
    <Helmet>
      <title>{getTitle('Edistynyt haku')}</title>
    </Helmet>
    <AdvancedSearch />
  </Container>
);
export default withApollo(AdvancedSearchPage);
