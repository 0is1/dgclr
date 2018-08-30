// @flow

import React from 'react';
import { Badge, Box, Flex } from 'rebass';
import { getRandomKey } from 'helpers/utils';
import CourseStyles from 'components/Course/Course.styles';
import BaseStyles from 'components/Container/Container.styles';
import type { Layout as LayoutType } from 'lib/types';

type Props = {
  active: Boolean,
  layout: LayoutType,
};

const { Strong } = CourseStyles;
const { BaseText, OL, LI } = BaseStyles;

const Layout = ({ active, layout }: Props) => {
  if (!active) return null;
  const { holes } = layout;
  const holeData = holes.map(hole => (
    <LI key={getRandomKey()}>
      <Flex>
        <Box width="65px">
          {!!hole.par && (
            <BaseText>
              <Strong>Par: </Strong>
              {` ${hole.par}`}
            </BaseText>
          )}
        </Box>
        <Box width="120px">
          {!!hole.length.meter && (
            <BaseText>
              <Strong>Pituus: </Strong>
              {` ${hole.length.meter}m`}
            </BaseText>
          )}
        </Box>
      </Flex>
    </LI>
  ));
  return (
    <Box width="100%" mt={2} p={2}>
      {layout.rating && <Badge mx="1rem">{layout.rating}</Badge>}
      {layout.holeCount && (
        <BaseText mt={0}>
          <Strong>Väylien määrä: </Strong>
          {`${layout.holeCount}`}
        </BaseText>
      )}
      {layout.totalPar && (
        <BaseText>
          <Strong>Radan par: </Strong>
          {`${layout.totalPar}`}
        </BaseText>
      )}
      {holeData
        && holeData.length > 0 && (
          <React.Fragment>
            <BaseText>
              <Strong>Radan väylät: </Strong>
            </BaseText>
            <OL>{holeData}</OL>
          </React.Fragment>
      )}
    </Box>
  );
};

export default Layout;
