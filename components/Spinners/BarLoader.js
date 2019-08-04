import React from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { Box, Flex } from 'rebass';
import colors from 'components/colors';

const Spinner = () => (
  <Flex alignItems="center" justifyContent="center">
    <Box>
      <BarLoader className="loading" sizeUnit="%" width={80} height={8} color={colors.info} loading />
    </Box>
  </Flex>
);

export default Spinner;
