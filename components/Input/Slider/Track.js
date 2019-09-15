// @flow
import React from 'react';
import colors from 'components/colors';

type Props = {
  source: {
    id: string,
    value: number,
    percent: number,
  },
  target: {
    id: string,
    value: number,
    percent: number,
  },
  getTrackProps: Function,
  disabled?: boolean,
};
const Track = ({
  source, target, getTrackProps, disabled,
}: Props) => (
  <div
    style={{
      position: 'absolute',
      transform: 'translate(0%, -50%)',
      height: 14,
      zIndex: 1,
      backgroundColor: disabled ? '#999' : colors.green,
      borderRadius: 7,
      cursor: 'pointer',
      left: `${source.percent}%`,
      width: `${target.percent - source.percent}%`,
    }}
    {...getTrackProps()}
  />
);

Track.defaultProps = {
  disabled: false,
};

export default Track;
