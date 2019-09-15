// @flow
import React, { PureComponent } from 'react';
import Styles from './SliderRail.styles';

const {
  TooltipContainer,
  Tooltip,
  TooltipText,
  RailStyle,
  RailCenterStyle,
} = Styles;

type Props = {
  activeHandleID: string,
  getRailProps: Function,
  getEventData: Function,
  format: Function,
};
type State = { value: ?number, percent: ?number };

class SliderRail extends PureComponent<Props, State> {
  state = {
    value: null,
    percent: null,
  };

  onMouseEnter = () => {
    document.addEventListener('mousemove', this.onMouseMove);
  };

  onMouseLeave = () => {
    this.setState({ value: null, percent: null });
    document.removeEventListener('mousemove', this.onMouseMove);
  };

  onMouseMove = (e: MouseEvent) => {
    const { activeHandleID, getEventData } = this.props;

    if (activeHandleID) {
      this.setState({ value: null, percent: null });
    } else {
      const { format } = this.props;
      const { value, percent } = getEventData(e);
      this.setState({ value: format(value), percent });
    }
  };

  render() {
    const { activeHandleID, getRailProps } = this.props;
    const { value, percent } = this.state;
    return (
      <>
        {!activeHandleID && value ? (
          <TooltipContainer percent={percent}>
            <Tooltip>
              <TooltipText>{value}</TooltipText>
            </Tooltip>
          </TooltipContainer>
        ) : null}
        <RailStyle
          {...getRailProps({
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
          })}
        />
        <RailCenterStyle />
      </>
    );
  }
}

export default SliderRail;
