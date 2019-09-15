// @flow
import React, { PureComponent } from 'react';
import Styles from './Handle.styles';
import SliderRailStyles from './SliderRail.styles';

const { TooltipContainer, Tooltip, TooltipText } = SliderRailStyles;

const { HandleDiv, Slider } = Styles;

type Props = {
  domain: Array<number>,
  isActive: boolean,
  handle: {
    id: string,
    value: number,
    percent: number,
  },
  getHandleProps: Function,
  disabled?: boolean,
  format: Function,
};
type State = { mouseOver: boolean };

class Handle extends PureComponent<Props, State> {
  static defaultProps = { disabled: false };

  state = {
    mouseOver: false,
  };

  onMouseEnter = () => {
    this.setState({ mouseOver: true });
  };

  onMouseLeave = () => {
    this.setState({ mouseOver: false });
  };

  render() {
    const {
      domain: [min, max],
      handle: { id, value, percent },
      isActive,
      disabled,
      getHandleProps,
      format,
    } = this.props;
    const { mouseOver } = this.state;
    return (
      <>
        {(mouseOver || isActive) && !disabled ? (
          <TooltipContainer percent={percent}>
            <Tooltip>
              <TooltipText>{format(value)}</TooltipText>
            </Tooltip>
          </TooltipContainer>
        ) : null}
        <HandleDiv
          percent={percent}
          {...getHandleProps(id, {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
          })}
        />
        <Slider
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          percent={percent}
          disabled={disabled}
        />
      </>
    );
  }
}

Handle.defaultProps = {
  disabled: false,
};

export default Handle;
