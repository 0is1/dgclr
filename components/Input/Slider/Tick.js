// @flow
import React from 'react';
import Styles from './Tick.styles';

const { TickWrapper, TickComponent } = Styles;

type Props = {
  tick: {
    id: string,
    value: number,
    percent: number,
  },
  count: number,
  format?: Function,
};
const Tick = ({ tick, count, format }: Props) => (
  <>
    <TickWrapper percent={tick.percent} />
    <TickComponent count={count} percent={tick.percent}>
      {typeof format === 'function' && format(tick.value)}
    </TickComponent>
  </>
);

Tick.defaultProps = {
  format: d => d,
};

export default Tick;
