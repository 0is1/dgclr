// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'rebass';
import { debounce } from 'lodash';
import { setFilter as setFilterFunc } from 'components/SearchContainer/actions';
import {
  getFilterTypeData,
  queryResultsFromState,
  latestAdvancedQuery as latestAdvancedQueryFunc,
} from 'components/SearchContainer/selectors';
import Map from 'components/Map';
import Input from 'components/Input';
import { ClipLoader } from 'components/Spinners';
import { ADVANCED_NEARBY } from 'lib/constants';
import { convertCoordinatesToObject, convertMetersToKilometers, courseAddressDetails } from 'helpers/utils';

import type {
  Course, CoordinatesObject, CourseForMap, State as ReduxState,
} from 'lib/types';

type Props = {
  defaultValue: Array<{ coordinates: CoordinatesObject, radius: number }>,
  onChange: Function,
  setFilter: Function,
  queryResults: Array<?Course>,
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

  filterQueryResultsForMap = (): Array<CourseForMap> => {
    const { queryResults } = this.props;
    return queryResults.map((result: ?Course) => {
      const {
        _id, name, locationInfo, slug,
      } = result || {};
      return {
        name,
        id: _id,
        address: courseAddressDetails(locationInfo),
        coordinates: convertCoordinatesToObject(locationInfo.location.coordinates),
        slug,
      };
    });
  };

  render() {
    const {
      coordinates, radius, zoom, waitingLocation,
    } = this.state;
    if (waitingLocation) {
      return <ClipLoader />;
    }
    const filteredResults = this.filterQueryResultsForMap();
    const props = {
      advancedSearch: true,
      coordinates,
      data: { name: `Keskipiste: ${coordinates.lat}, ${coordinates.lng}`, queryResults: filteredResults },
      onDragEnd: this.onCircleDragEnd,
      radius,
      zoom,
    };
    const inputOptions = {
      max: '150000',
      min: '1000',
      name: 'radius',
      step: '1000',
      type: 'range',
    };
    return (
      <React.Fragment>
        <Map {...props} />
        <Label>{`Maksimietäisyys (${convertMetersToKilometers(parseInt(radius, 10))}km): `}</Label>
        <Input value={radius} options={inputOptions} onChange={this.onRadiusChange} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const latestQuery = latestAdvancedQueryFunc(state);
  return {
    defaultValue: getFilterTypeData(state, ADVANCED_NEARBY),
    queryResults: queryResultsFromState(state, latestQuery),
  };
};
const mapDispatchToProps = dispatch => ({
  setFilter: (filterName, data) => dispatch(setFilterFunc(filterName, data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdvancedSearchMap);
