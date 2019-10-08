// @flow
import React from 'react';
import Styles from './Track.styles';

const { Track } = Styles;

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

const TrackComponent = ({
  source, target, getTrackProps, disabled,
}: Props) => (
  <Track disabled={disabled} targetPercent={target.percent} sourcePercent={source.percent} {...getTrackProps()} />
);

TrackComponent.defaultProps = {
  disabled: false,
};

export default TrackComponent;
