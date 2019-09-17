// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Label } from 'rebass';
import { debounce } from 'lodash';
import { setFilter as setFilterFunc, setAdvancedSearchMapZoom } from 'components/AdvancedSearch/actions';
import {
  queryResultsFromState,
  getFilterTypeData,
  getAdvancedMapZoom,
  latestAdvancedQuery as latestAdvancedQuerySelector,
} from 'components/AdvancedSearch/selectors';
import { getCurrentLocation } from 'helpers/geolocation';
import Map from 'components/Map';
import Input from 'components/Input';
import { ClipLoader } from 'components/Spinners';
import { ADVANCED_NEARBY } from 'lib/constants';
import {
  convertCoordinatesToObject, convertMetersToKilometers, courseAddressDetails, isArrayWithLength,
} from 'helpers/utils';

import AdvancedSearchQueryStyles from 'components/AdvancedSearch/AdvancedSearchQuery.styles';

import type {
  Course, CoordinatesObject, CourseForMap, State as ReduxState,
} from 'lib/types';
import { MAP_RADIUS_DISTANCE_MAX, MAP_RADIUS_DISTANCE_MIN, MAP_SEARCH_RADIUS_FILTER } from './constants';

const { NoResults } = AdvancedSearchQueryStyles;

type Props = {
  handleChange: Function,
  mapVisible: boolean,
};
type MapStateToProps = {
  defaultValue: Array<?{ coordinates: CoordinatesObject, radius: number }>,
  queryResults: Array<?Course>,
  zoom: number,
};

type MapDispatchToProps = { setFilter: Function, setMapZoom: Function };

type CombinedProps = Props & MapStateToProps & MapDispatchToProps;

type State = {
  coordinates: CoordinatesObject,
  error: ?string,
  radius: number,
  useCurrentLocation: boolean,
  waitingLocation: boolean,
};

export const defaultCoordinates = { lat: 60.190599999999996, lng: 24.89741416931156 };

export class AdvancedSearchMap extends Component<CombinedProps, State> {
  state = {
    coordinates: defaultCoordinates,
    error: null,
    radius: 20000,
    waitingLocation: true,
  };

  debounceRadius = debounce((radius: number) => {
    this.updateFilter({ radius });
  }, 300);

  inputOptions = {
    max: MAP_RADIUS_DISTANCE_MAX,
    min: MAP_RADIUS_DISTANCE_MIN,
    name: 'radius',
    step: 1000,
    type: 'slider',
    initialValues: [20000],
    domain: [MAP_RADIUS_DISTANCE_MIN, MAP_RADIUS_DISTANCE_MAX],
    filterName: MAP_SEARCH_RADIUS_FILTER,
    format: (value: number): number => parseInt(value / 1000, 10),
    showCurrentValues: false,
  };

  constructor(props: CombinedProps) {
    super(props);
    // $FlowFixMe defaultValue is set in MapStateToProps but flow complains that it's missing in Props or MapDispatchToProps
    const { defaultValue } = props;
    if (isArrayWithLength(defaultValue) && defaultValue[0].coordinates && defaultValue[0].radius) {
      this.state = {
        coordinates: defaultValue[0].coordinates,
        error: null,
        radius: defaultValue[0].radius,
        waitingLocation: true,
      };
    }
  }

  componentDidMount() {
    const { coordinates } = this.state;
    const { mapVisible } = this.props;
    if (mapVisible && defaultCoordinates.lat === coordinates.lat && defaultCoordinates.lng === coordinates.lng) {
      try {
        const getCurrentPositionSuccess = (pos) => {
          const { coords } = pos;
          const newCoordinates = {
            lat: coords.latitude,
            lng: coords.longitude,
          };
          this.updateFilter({ coordinates: newCoordinates });
          this.setState({
            coordinates: newCoordinates,
            waitingLocation: false,
          });
        };

        const getCurrentPositionError = (err) => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
          this.setState({ waitingLocation: false, error: err.message });
        };
        getCurrentLocation(getCurrentPositionSuccess, getCurrentPositionError);
      } catch (e) {
        console.error('getCurrentPosition error: ', e);

        this.setState({ waitingLocation: false });
      }
    } else {
      this.setState({ waitingLocation: false });
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { mapVisible } = this.props;
    if (mapVisible && !prevProps.mapVisible) {
      this.updateFilter();
    }
  }

  updateFilter = (data: ?{} = {}) => {
    const { defaultValue, handleChange, setFilter } = this.props;
    const { coordinates, radius } = this.state;
    const [currentData = { coordinates, radius }] = defaultValue;
    const updatedFilter = { ...currentData, ...data };
    setFilter(ADVANCED_NEARBY, [updatedFilter]);
    handleChange(updatedFilter);
  };

  onCircleDragEnd = (coordinates: CoordinatesObject) => {
    this.updateFilter({ coordinates });
    this.setState({ coordinates });
  };

  onRadiusChange = (radius: number) => {
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

  handleZoomChange = (zoom: number) => {
    const { setMapZoom } = this.props;
    if (parseInt(zoom, 10) > 0) {
      setMapZoom(zoom);
    }
  };

  render() {
    const { mapVisible, zoom } = this.props;
    if (!mapVisible) return null;
    const {
      coordinates, error, radius, waitingLocation,
    } = this.state;
    if (waitingLocation) {
      return <ClipLoader />;
    }
    const filteredResults = this.filterQueryResultsForMap();
    const mapProps = {
      advancedSearch: true,
      coordinates,
      data: {
        name: `Keskipiste: ${coordinates.lat}, ${coordinates.lng}`,
        queryResults: filteredResults,
      },
      onDragEnd: this.onCircleDragEnd,
      onZoomChange: this.handleZoomChange,
      radius,
      zoom,
    };
    const radiusOptions = this.inputOptions;

    return (
      <>
        {error && (
          <Box p={[0, '0.5rem 2rem']}>
            <NoResults>{error}</NoResults>
          </Box>
        )}
        <Map {...mapProps} />
        <Label pt={['.5rem', '.5rem', '1rem', '1rem']}>{`Maksimietäisyys (${convertMetersToKilometers(parseInt(radius, 10))}km): `}</Label>
        <Input options={{ ...radiusOptions, initialValues: [radius] }} onChange={this.onRadiusChange} />
      </>
    );
  }
}

const mapStateToProps = (state: ReduxState): MapStateToProps => {
  const latestQuery = latestAdvancedQuerySelector(state);
  return {
    defaultValue: getFilterTypeData(state, ADVANCED_NEARBY),
    queryResults: queryResultsFromState(state, latestQuery),
    zoom: getAdvancedMapZoom(state),
  };
};
const mapDispatchToProps = (dispatch: Function): MapDispatchToProps => ({
  setFilter: (filterName, data) => dispatch(setFilterFunc(filterName, data)),
  setMapZoom: (zoom: number) => dispatch(setAdvancedSearchMapZoom(zoom)),
});
export default connect<CombinedProps, Props, any, any, any, Function>(
  mapStateToProps,
  mapDispatchToProps,
)(AdvancedSearchMap);
