// @flow
import React, { Component } from 'react';
import {
  Slider, Rail, Handles, Tracks, Ticks,
} from 'react-compound-slider';
import { connect } from 'react-redux';
import { Label } from 'rebass';
import { setFilter as setFilterFunc } from 'components/AdvancedSearch/actions';
import { getFilterTypeData } from 'components/AdvancedSearch/selectors';
import type { State, SliderFilterData } from 'lib/types';
import { isArrayWithLength } from 'helpers/utils';
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
  initialValues: SliderFilterData,
  domain: Array<number>,
  filterName: string,
  handleOnChange: Function,
  reversed?: boolean,
  step?: number,
};

type MapStateToProps = {
  currentValue: SliderFilterData,
};

type MapDispatchToProps = {
  setFilter: Function,
};

type CombinedProps = Props & MapStateToProps & MapDispatchToProps;

class SliderContainer extends Component<CombinedProps> {
  static defaultProps = {
    reversed: false,
    step: 5,
  };

  onChange = (values: Array<number>) => {
    const { filterName, handleOnChange, setFilter } = this.props;
    handleOnChange(values);
    setFilter(filterName, values);
  };

  render() {
    const {
      currentValue, domain, initialValues, reversed, step,
    } = this.props;
    const values = isArrayWithLength(currentValue)
      ? currentValue
      : initialValues;
    const tracksLeftRight = domain.length > 1 ? { right: false, left: false } : { right: false };
    const currentValues = values.join(' - ');
    return (
      <>
        <Label>
          {currentValues}
m
        </Label>
        <Slider
          mode={2} // mode 1 simple, 2 prevent crossing, 3 pushable
          step={step}
          domain={domain}
          reversed={reversed}
          rootStyle={sliderStyle}
          // onUpdate={this.onUpdate}
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

const mapStateToProps = (state: State, ownProps: Props): MapStateToProps => ({
  currentValue: getFilterTypeData(state, ownProps.filterName),
});
const mapDispatchToProps = (dispatch: Function): MapDispatchToProps => ({
  setFilter: (filterName, data) => dispatch(setFilterFunc(filterName, data)),
});
export default connect<CombinedProps, Props, any, any, any, Function>(
  mapStateToProps,
  mapDispatchToProps,
)(SliderContainer);
