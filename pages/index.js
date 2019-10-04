// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import withApollo from 'lib/withApollo';
import { i18n, withTranslation } from 'lib/i18n';
import Container from 'components/Container';
import SearchContainer from 'components/SearchContainer';

type Props = { currentLanguage: ?string, t: Function };

const Index = ({ currentLanguage, t }: Props) => (
  <Container activeRoute="/" currentLanguage={currentLanguage}>
    <Helmet>
      <title>{`${t('title')}`}</title>
    </Helmet>
    <SearchContainer />
  </Container>
);

Index.getInitialProps = async ({ req }) => {
  const currentLanguage = req ? req.language : i18n.language;
  return { namespacesRequired: ['common', 'search'], currentLanguage };
};

export default withApollo(withTranslation('common')(Index));
