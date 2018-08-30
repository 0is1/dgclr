// @flow
import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Heading } from 'rebass';
import { getTitle } from 'helpers/utils';
import Container from 'components/Container';
import BaseStyles from 'components/Container/Container.styles';

const { BaseText, UL, LI } = BaseStyles;

const InfoPage = () => (
  <Container activeRoute="info">
    <Helmet>
      <title>{getTitle('Info')}</title>
    </Helmet>
    <Box p={4}>
      <Heading ml="1rem" mb={3}>
        Info
      </Heading>
      <BaseText>
        Sivusto on harrasteluprojekti ja varhaisessa kehitysvaiheessa. Lisää (haku)toimintoja on
        tulossa, kuten:
      </BaseText>
      <UL>
        <LI>Kehittynyt haku, jossa voi etsiä ratoja mm.</LI>
        <UL>
          <LI>Ratingin</LI>
          <LI>Pinnanmuotojen (paljon korkeuseroja, tasainen, jne.)</LI>
          <LI>Ratatyyppien (metsä- , pelto-, puistorata, jne.)</LI>
          <LI>Etäisyyden mukaan (esim. 30 km määritellystä pisteestä)</LI>
        </UL>
        <LI>Tietoja ratojen kilpailuista ja tapahtumista (ehkä tuloksiakin?)</LI>
      </UL>
      <BaseText>
        Jos mieleesi tulee kehitysideoita, heitä ne sähköpostiin: janne.juhani [AT] gmail DOT com
        tai tykitä viestiä Twitterissä
        {' '}
        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/0is1">
          @0is1
        </a>
      </BaseText>
    </Box>
  </Container>
);

export default InfoPage;
