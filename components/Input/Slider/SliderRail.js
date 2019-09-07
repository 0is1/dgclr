// @flow
import React from 'react';
import colors from 'components/colors';

const railOuterStyle = {
  position: 'absolute',
  width: '100%',
  height: 42,
  transform: 'translate(0%, -50%)',
  borderRadius: 7,
  cursor: 'pointer',
};

const railInnerStyle = {
  position: 'absolute',
  width: '100%',
  height: 14,
  transform: 'translate(0%, -50%)',
  borderRadius: 7,
  pointerEvents: 'none',
  backgroundColor: colors.greenAlpha,
};

type Props = { getRailProps: Function };

const SliderRail = ({ getRailProps }: Props) => (
  <>
    <div style={railOuterStyle} {...getRailProps()} />
    <div style={railInnerStyle} />
  </>
);

export default SliderRail;
