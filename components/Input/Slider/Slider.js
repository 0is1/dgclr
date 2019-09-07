// @flow
import React, { PureComponent } from 'react';
import {
  Slider, Rail, Handles, Tracks, Ticks,
} from 'react-compound-slider';
import SliderRail from './SliderRail';
import Handle from './Handle';
import Track from './Track';
import Tick from './Tick';

const sliderStyle = {
  margin: '1rem 0 3rem',
  position: 'relative',
  touchAction: 'none',
  width: '95%',
};

type Props = {
  defaultValues: Array<number>,
  domain: Array<number>,
  handleOnChange: Function,
  reversed?: boolean,
  step?: number,
};

type State = {
  values: ?Array<number>,
};

class SliderContainer extends PureComponent<Props, State> {
  state = {
    values: null,
  };

  onChange = (values) => {
    const { handleOnChange } = this.props;
    // TODO: values from redux props
    this.setState({ values });
    handleOnChange(values);
  };

  render() {
    const { values: updatedValues } = this.state;
    const {
      domain, defaultValues, reversed, step,
    } = this.props;
    const values = updatedValues || defaultValues;
    const tracksLeftRight = domain.length > 1 ? { right: false, left: false } : { right: false };
    return (
      <>
        <Slider
          mode={2} // mode 1 simple, 2 prevent crossing, 3 pushable
          step={step}
          domain={domain}
          reversed={reversed}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks {...tracksLeftRight}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={10}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </>
    );
  }
}
SliderContainer.defaultProps = {
  reversed: false,
  step: 5,
};

export default SliderContainer;
