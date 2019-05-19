// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Box, Label } from 'rebass';
import { debounce } from 'lodash';
import { setFilter as setFilterFunc, setAdvancedSearchMapZoom } from 'components/SearchContainer/actions';
import {
  getFilterTypeData,
  getAdvancedMapZoom,
  queryResultsFromState,
  latestAdvancedQuery as latestAdvancedQueryFunc,
} from 'components/SearchContainer/selectors';
import Map from 'components/Map';
import Input from 'components/Input';
import { ClipLoader } from 'components/Spinners';
import { ADVANCED_NEARBY } from 'lib/constants';
import { convertCoordinatesToObject, convertMetersToKilometers, courseAddressDetails } from 'helpers/utils';
import AdvancedSearchQueryStyles from 'components/SearchContainer/AdvancedSearchQuery.styles';

import type {
  Course, CoordinatesObject, CourseForMap, State as ReduxState,
} from 'lib/types';

const { NoResults } = AdvancedSearchQueryStyles;

type Props = {
  defaultValue: Array<{ coordinates: CoordinatesObject, radius: number }>,
  handleChange: Function,
  mapVisible: boolean,
  setFilter: Function,
  setMapZoom: Function,
  queryResults: Array<?Course>,
  zoom: number,
};
type State = {
  coordinates: CoordinatesObject,
  radius: string,
  waitingLocation: boolean,
  error: ?string,
};

const defaultCoordinates = { lat: 60.190599999999996, lng: 24.89741416931156 };

class AdvancedSearchMap extends Component<Props, State> {
  state = {
    coordinates: defaultCoordinates,
    radius: '20000',
    waitingLocation: true,
    error: null,
  };

  debounceRadius = debounce((radius) => {
    this.updateFilter({ radius });
  }, 300);

  inputOptions = {
    max: '150000',
    min: '1000',
    name: 'radius',
    step: '1000',
    type: 'range',
  };

  constructor(props) {
    super(props);
    const { defaultValue } = props;
    if (defaultValue.length && defaultValue[0].coordinates && defaultValue[0].radius) {
      this.state = {
        coordinates: defaultValue[0].coordinates,
        radius: defaultValue[0].radius,
        waitingLocation: true,
        error: null,
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
          this.setState({ waitingLocation: false, error: err.message });
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
    const props = {
      advancedSearch: true,
      coordinates,
      data: { name: `Keskipiste: ${coordinates.lat}, ${coordinates.lng}`, queryResults: filteredResults },
      onDragEnd: this.onCircleDragEnd,
      onZoomChange: this.handleZoomChange,
      radius,
      zoom,
    };

    return (
      <Fragment>
        {error && (
          <Box p={[0, '0.5rem 2rem']}>
            <NoResults>{error}</NoResults>
          </Box>
        )}
        <Map {...props} />
        <Label pt={['.5rem', '.5rem', '1rem', '1rem']}>{`Maksimietäisyys (${convertMetersToKilometers(parseInt(radius, 10))}km): `}</Label>
        <Input value={radius} options={this.inputOptions} onChange={this.onRadiusChange} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const latestQuery = latestAdvancedQueryFunc(state);
  return {
    defaultValue: getFilterTypeData(state, ADVANCED_NEARBY),
    queryResults: queryResultsFromState(state, latestQuery),
    zoom: getAdvancedMapZoom(state),
  };
};
const mapDispatchToProps = dispatch => ({
  setFilter: (filterName, data) => dispatch(setFilterFunc(filterName, data)),
  setMapZoom: (zoom: number) => dispatch(setAdvancedSearchMapZoom(zoom)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdvancedSearchMap);
