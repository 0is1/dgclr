// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'rebass';
import { debounce } from 'lodash';
import { setFilter as setFilterFunc } from 'components/SearchContainer/actions';
import { getFilterTypeData } from 'components/SearchContainer/selectors';
import Map from 'components/Map';
import Input from 'components/Input';
import type { CoordinatesObject, State as ReduxState } from 'lib/types';
import { ADVANCED_NEARBY } from 'lib/constants';

type Props = {
  defaultValue: Array<{ coordinates: CoordinatesObject, radius: number }>,
  onChange: Function,
  setFilter: Function,
};
type State = {
  coordinates: CoordinatesObject,
  radius: string,
  zoom: number,
  waitingLocation: boolean,
};
const defaultCoordinates = { lat: 60.190599999999996, lng: 24.89741416931156 };

class AdvancedSearchMap extends Component<Props, State> {
  state = {
    coordinates: defaultCoordinates,
    radius: '20000',
    zoom: 9,
    waitingLocation: true,
  };

  debounceRadius = debounce((radius) => {
    this.updateFilter({ radius });
  }, 300);

  constructor(props) {
    super(props);
    const { defaultValue } = props;
    if (defaultValue.length && defaultValue[0].coordinates && defaultValue[0].radius) {
      this.state = {
        coordinates: defaultValue[0].coordinates,
        radius: defaultValue[0].radius,
        zoom: 9,
        waitingLocation: true,
      };
    }
  }

  componentDidMount() {
    const { coordinates } = this.state;
    if (defaultCoordinates.lat === coordinates.lat && defaultCoordinates.lng === coordinates.lng) {
      try {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };

        const getCurrentPositionSuccess = (pos) => {
          const { coords } = pos;
          const newCoordinates = { lat: coords.latitude, lng: coords.longitude };
          this.updateFilter({ coordinates: newCoordinates });
          this.setState({ coordinates: newCoordinates, waitingLocation: false });
        };

        const getCurrentPositionError = (err) => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
          this.setState({ waitingLocation: false });
        };
        navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess, getCurrentPositionError, options);
      } catch (e) {
        console.error('getCurrentPosition error: ', e);

        this.setState({ waitingLocation: false });
      }
    } else {
      this.setState({ waitingLocation: false });
    }
  }

  updateFilter = (data: {}) => {
    const { defaultValue, onChange, setFilter } = this.props;
    const { coordinates, radius } = this.state;
    const [currentData = { coordinates, radius }] = defaultValue;
    const updatedFilter = { ...currentData, ...data };
    setFilter(ADVANCED_NEARBY, [updatedFilter]);
    onChange(updatedFilter);
  };

  onCircleDragEnd = (coordinates: CoordinatesObject) => {
    this.updateFilter({ coordinates });
    this.setState({ coordinates });
  };

  onRadiusChange = (radius: string) => {
    this.setState({ radius });
    this.debounceRadius(radius);
  };

  render() {
    const {
      coordinates, radius, zoom, waitingLocation,
    } = this.state;
    if (waitingLocation) return null;
    const props = {
      advancedSearch: true,
      coordinates,
      data: { name: `${coordinates.lat}, ${coordinates.lng}` },
      onDragEnd: this.onCircleDragEnd,
      radius,
      zoom,
    };
    const inputOptions = {
      max: '100000',
      min: '1000',
      name: 'radius',
      step: '1000',
      type: 'range',
    };
    return (
      <React.Fragment>
        <Map {...props} />
        <Label>{`Maksimietäisyys (${parseInt(radius, 10) / 1000}km): `}</Label>
        <Input value={radius} options={inputOptions} onChange={this.onRadiusChange} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  defaultValue: getFilterTypeData(state, ADVANCED_NEARBY),
});
const mapDispatchToProps = dispatch => ({
  setFilter: (filterName, data) => dispatch(setFilterFunc(filterName, data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdvancedSearchMap);
