// @flow
import React from 'react';

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
  <div>
    <div
      style={{
        position: 'absolute',
        marginTop: 14,
        width: 1,
        height: 5,
        backgroundColor: 'rgb(200,200,200)',
        left: `${tick.percent}%`,
      }}
    />
    <div
      style={{
        position: 'absolute',
        marginTop: 22,
        fontSize: 10,
        textAlign: 'center',
        marginLeft: `${-(100 / count) / 2}%`,
        width: `${100 / count}%`,
        left: `${tick.percent}%`,
      }}
    >
      {typeof format === 'function' && format(tick.value)}
    </div>
  </div>
);

Tick.defaultProps = {
  format: d => d,
};

export default Tick;
