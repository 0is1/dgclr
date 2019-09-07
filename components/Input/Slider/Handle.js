// @flow
import React from 'react';
import colors from 'components/colors';

type Props = {
  domain: Array<number>,
  handle: {
    id: string,
    value: number,
    percent: number,
  },
  getHandleProps: Function,
  disabled?: boolean,
};
const Handle = ({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
}: Props) => (
  <>
    <div
      style={{
        left: `${percent}%`,
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        zIndex: 5,
        width: 28,
        height: 42,
        cursor: 'pointer',
        backgroundColor: 'none',
      }}
      {...getHandleProps(id)}
    />
    <div
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{
        left: `${percent}%`,
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        width: 24,
        height: 24,
        borderRadius: '50%',
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
        backgroundColor: disabled ? '#666' : colors.lightGray,
      }}
    />
  </>
);

Handle.defaultProps = {
  disabled: false,
};
export default Handle;
