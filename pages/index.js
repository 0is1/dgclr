// @flow

import React from 'react';
import withApollo from 'lib/withApollo';
import { i18n } from 'i18n';
import Container from 'components/Container';
import SearchContainer from 'components/SearchContainer';

type Props = { currentLanguage: ?string };

const Index = ({ currentLanguage }: Props) => (
  <Container activeRoute="/" currentLanguage={currentLanguage}>
    <SearchContainer />
  </Container>
);

Index.getInitialProps = async ({ req }) => {
  const currentLanguage = req ? req.language : i18n.language;
  return { namespacesRequired: ['common', 'search'], currentLanguage };
};

export default withApollo(Index);
