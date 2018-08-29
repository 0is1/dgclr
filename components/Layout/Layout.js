// @flow

import React from 'react';
import { Badge, Box, Text } from 'rebass';
import CourseStyles from 'components/Course/Course.styles';

type Props = {
  active: Boolean,
  layout: {
    name: string,
  },
};

const { Strong } = CourseStyles;
const Layout = ({ active, layout }: Props) => {
  if (!active) return null;
  console.log('layout: ', layout);
  return (
    <Box width="100%" mt={2} p={2}>
      {layout.rating && <Badge ml={0}>{layout.rating}</Badge>}
      {layout.holeCount && (
        <Text my=".85rem" mx=".25rem">
          <Strong>Väylien määrä: </Strong>
          {`${layout.holeCount}`}
        </Text>
      )}
      {layout.totalPar && (
        <Text my=".85rem" mx=".25rem">
          <Strong>Radan par: </Strong>
          {`${layout.totalPar}`}
        </Text>
      )}
    </Box>
  );
};

export default Layout;
