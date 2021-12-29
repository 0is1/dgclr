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
  format: Function,
};
function Tick({ tick, count, format }: Props) {
  return (
    <>
      <TickWrapper percent={tick.percent} />
      <TickComponent count={count} percent={tick.percent}>
        {typeof format === 'function' && format(tick.value)}
      </TickComponent>
    </>
  );
}

export default Tick;
