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
        Sivusto on harrasteluprojekti ja varhaisessa kehitysvaiheessa. DGCLR.fi:n ideana on auttaa frisbeegolfin ystäviä löytämään
        mahdollisimman helposti mielekkäitä ratoja.
      </BaseText>
      <BaseText pt={2} mb={-2}>
        Lisää (haku)toimintoja on tulossa:
      </BaseText>
      <Box p="0.5rem 2rem">
        <UL>
          <LI>Lisää ominaisuuksia kehittyneeseen hakuun, kuten haku:</LI>
          <UL padding="0 0 0 1rem">
            <LI>Hintatiedon</LI>
            <LI>Ratasuunnittelijan</LI>
            <LI>Ylläpitosyklin</LI>
            <LI>Minkä muun mukaan?</LI>
          </UL>
          <LI>Tietoja ratojen kilpailuista ja tapahtumista (ehkä tuloksiakin?)</LI>
          <LI>Mahdollisuus merkitä kadonneet kiekot?</LI>
        </UL>
      </Box>
      <BaseText>
        Jos mieleesi tulee kehitysideoita, heitä ne sähköpostiin: janne.juhani [AT] gmail DOT com tai tykitä viestiä Twitterissä
        {' '}
        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/0is1">
          @0is1
        </a>
      </BaseText>
    </Box>
  </Container>
);

export default InfoPage;
