// @flow
import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Heading } from 'rebass';
import { i18n, withTranslation } from 'lib/i18n';
import Container from 'components/Container';
import BaseStyles from 'components/Container/Container.styles';

const { BaseText, UL, LI } = BaseStyles;
type Props = { currentLanguage: ?string, t: Function };

const InfoPage = ({ currentLanguage, t }: Props) => {
  const moreFeaturesListData = t('info:more-features-list-data-one').split(',');
  return (
    <Container activeRoute="/info" currentLanguage={currentLanguage}>
      <Helmet>
        <title>{`${t('common:title')} – ${t('info:title')}`}</title>
      </Helmet>
      <Box p={4}>
        <Heading ml="1rem" mb={3}>
          {t('info:title')}
        </Heading>
        <BaseText>{t('info:description')}</BaseText>
        <BaseText pt={2} mb={-2}>
          {t('info:more-features-info')}
        </BaseText>
        <Box p="0.5rem 2rem">
          <UL>
            <LI>{t('info:more-features-list-title-one')}</LI>
            <UL padding="0 0 0 1rem">
              {moreFeaturesListData.map((item) => (
                <LI key={item}>{item}</LI>
              ))}
            </UL>
            <LI>{t('info:more-features-list-title-two')}</LI>
            <LI>{t('info:more-features-list-title-three')}</LI>
          </UL>
        </Box>
        <BaseText>
          {t('info:send-ideas-description')}
          {' '}
          <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/0is1">
            @0is1
          </a>
        </BaseText>
      </Box>
    </Container>
  );
};

InfoPage.getInitialProps = async ({ req }) => {
  const currentLanguage = req ? req.language : i18n.language;
  return { namespacesRequired: ['common', 'info'], currentLanguage };
};

export default withTranslation(['common', 'info'])(InfoPage);
