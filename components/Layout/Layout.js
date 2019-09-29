// @flow

import React from 'react';
import { Badge, Box, Flex } from 'rebass';
import { withTranslation } from 'lib/i18n';
import { getRandomKey } from 'helpers/utils';
import CourseStyles from 'components/Course/Course.styles';
import BaseStyles from 'components/Container/Container.styles';
import type { Layout as LayoutType } from 'lib/types';

type Props = {
  active: Boolean,
  layout: LayoutType,
  t: Function,
};

const { Strong } = CourseStyles;
const { BaseText, OL, LI } = BaseStyles;

const Layout = ({ active, layout, t }: Props) => {
  if (!active) return null;
  const { holes } = layout;
  const holeData = holes.map(hole => (
    <LI key={getRandomKey()}>
      <Flex>
        <Box width="70px">
          {!!hole.par && (
            <BaseText>
              <Strong>{t('course:par')}</Strong>
              {` ${hole.par}`}
            </BaseText>
          )}
        </Box>
        <Box width="140px">
          {!!hole.length.meter && (
            <BaseText>
              <Strong>{t('course:length')}</Strong>
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
          <Strong>{t('course:hole-count')}</Strong>
          {`${layout.holeCount}`}
        </BaseText>
      )}
      {layout.holeAverageLength && (
        <BaseText>
          <Strong>{t('course:hole-average-length')}</Strong>
          {`${layout.holeAverageLength.meter}m`}
        </BaseText>
      )}
      {layout.totalPar && (
        <BaseText>
          <Strong>{t('course:course-par')}</Strong>
          {`${layout.totalPar}`}
        </BaseText>
      )}
      {holeData && holeData.length > 0 && (
        <>
          <BaseText>
            <Strong>{t('course:course-holes')}</Strong>
          </BaseText>
          <OL>{holeData}</OL>
        </>
      )}
    </Box>
  );
};

export default withTranslation(['course'])(Layout);
