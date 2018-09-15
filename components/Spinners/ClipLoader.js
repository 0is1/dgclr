import React from 'react';
import { ClipLoader } from 'react-spinners';
import { Box, Flex } from 'rebass';
import colors from 'components/colors';

const Spinner = () => (
  <Flex alignItems="center" p="5rem 0" justifyContent="center">
    <Box>
      <ClipLoader className="loading" sizeUnit="px" size={80} color={colors.info} loading />
    </Box>
  </Flex>
);

export default Spinner;
