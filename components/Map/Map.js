// @flow

import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import { GoLocation } from 'react-icons/go';
import { isArrayWithLength } from 'helpers/utils';
import { getCurrentLocation, validateCoordsFromMap } from 'helpers/geolocation';
import type { CoordinatesObject, CourseForMap } from 'lib/types';
import { MAP_DEFAULT_ZOOM } from 'lib/constants';
import MapComponent from './MapComponent';
import AdvancedMapStyles from './AdvancedSearchMap.styles';
import Styles from './Map.styles';
import type { LatLngFunctions } from './types';

const QUERY_RESULTS_CHANGED = 'QUERY_RESULTS_CHANGED';

const { LocationButton, LocationIconWrapper } = AdvancedMapStyles;
const { MapWrapper } = Styles;
type MarkerData = { isOpen: boolean } & CourseForMap;

type Props = {
  advancedSearch?: boolean,
  coordinates: CoordinatesObject,
  data: { name: string, queryResults?: Array<?CourseForMap> },
  onCircleDragEnd?: Function,
  onZoomChange?: Function,
  radius?: string,
  zoom?: number,
};
type State = {
  currentLocationCoordinates: ?CoordinatesObject,
  searchAreaCircleCoordinates: ?CoordinatesObject,
  isMarkerShown: boolean,
  markers: Array<MarkerData>,
  useCurrentLocation: boolean,
};

class Map extends PureComponent<Props, State> {
  timeOut = null;

  static defaultProps = {
    advancedSearch: false,
    onCircleDragEnd: null,
    onZoomChange: null,
    radius: 10000,
    zoom: MAP_DEFAULT_ZOOM,
  };

  state = {
    currentLocationCoordinates: null,
    searchAreaCircleCoordinates: null,
    isMarkerShown: false,
    markers: [],
    useCurrentLocation: false,
  };

  constructor(props: Props) {
    super(props);
    const { data } = props;
    const { queryResults } = data;
    if (isArrayWithLength(queryResults)) {
      const markers = this.getMarkersFromQueryData();
      this.state = {
        searchAreaCircleCoordinates: null,
        isMarkerShown: false,
        markers,
        useCurrentLocation: false,
        currentLocationCoordinates: null,
      };
    }
  }

  componentDidMount() {
    const { advancedSearch } = this.props;
    this.updateMarkers();
    if (advancedSearch) {
      // Only in advanced search
      this.updateCoordinatesToCurrentLocation();
    }
  }

  componentDidUpdate(props: Props, state: State, snapshot: ?string) {
    if (snapshot === QUERY_RESULTS_CHANGED) {
      this.updateMarkers();
    }
  }

  componentWillUnmount() {
    if (this.timeOut) clearTimeout(this.timeOut);
  }

  getSnapshotBeforeUpdate(prevProps: Props) {
    const { data } = this.props;
    const { queryResults } = data;
    if (!isEqual(queryResults, prevProps.data.queryResults)) {
      return QUERY_RESULTS_CHANGED;
    }
    return null;
  }

  getMarkersFromQueryData = () => {
    const { data } = this.props;
    const { queryResults } = data;
    if (isArrayWithLength(queryResults)) {
      // $FlowFixMe isArrayWithLength check that this is array but flow doesn't get it
      return queryResults.map((marker: MarkerData) => ({ ...marker, isOpen: false }));
    }
    return [];
  };

  updateMarkers = () => {
    const markers = this.getMarkersFromQueryData();
    this.setState({ markers });
  };

  onMarkerClick = (markerId: string) => {
    const { markers } = this.state;
    // eslint-disable-next-line max-len
    const updatedMarkers = markers.map((marker: MarkerData) => (marker && marker.id === markerId ? { ...marker, isOpen: !marker.isOpen } : { ...marker, isOpen: false }));
    console.log('updatedMarkers: ', updatedMarkers);
    this.setState({ markers: updatedMarkers });
  };

  onCircleDragEnd = () => {
    const { onCircleDragEnd } = this.props;
    const { searchAreaCircleCoordinates } = this.state;
    if (typeof onCircleDragEnd === 'function' && searchAreaCircleCoordinates) {
      onCircleDragEnd(searchAreaCircleCoordinates);
    }
  };

  onCircleCenterChanged = (coords: LatLngFunctions) => {
    if (validateCoordsFromMap(coords)) {
      this.setState({ searchAreaCircleCoordinates: { lat: coords.lat(), lng: coords.lng() } });
    }
  };

  onZoomChange = (zoom: number) => {
    const { onZoomChange } = this.props;
    if (typeof onZoomChange === 'function') {
      onZoomChange(zoom);
    }
  };

  onMapCenterChange = (coords: LatLngFunctions) => {
    const { currentLocationCoordinates, useCurrentLocation } = this.state;
    if (validateCoordsFromMap(coords) && useCurrentLocation && currentLocationCoordinates) {
      const newCoordinates = { lat: coords.lat().toFixed(7), lng: coords.lng().toFixed(7) };
      const coordinatesToFixed = { lat: currentLocationCoordinates.lat.toFixed(7), lng: currentLocationCoordinates.lng.toFixed(7) };
      if (!isEqual(coordinatesToFixed, newCoordinates)) {
        this.toggleCurrentLocation();
      }
    }
  };

  updateCoordinatesToCurrentLocation = () => {
    try {
      const getCurrentPositionSuccess = (pos) => {
        const { onCircleDragEnd } = this.props;
        const { useCurrentLocation } = this.state;
        const { coords } = pos;
        const newCoordinates = {
          lat: coords.latitude,
          lng: coords.longitude,
        };
        this.setState({
          currentLocationCoordinates: newCoordinates,
        });
        // Update coordinates only if useCurrentLocation is true
        if (typeof onCircleDragEnd === 'function' && useCurrentLocation) {
          onCircleDragEnd(newCoordinates);
        }
      };

      const getCurrentPositionError = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };
      getCurrentLocation(getCurrentPositionSuccess, getCurrentPositionError);
    } catch (err) {
      console.warn(`updateCoordinatesToCurrentLocation: ${err.message}`);
    }
  };

  toggleCurrentLocation = () => {
    const { useCurrentLocation } = this.state;
    const newUseCurrentLocationValue = !useCurrentLocation;
    this.setState({ useCurrentLocation: newUseCurrentLocationValue });

    if (newUseCurrentLocationValue) {
      this.updateCoordinatesToCurrentLocation();
    }
  };

  render() {
    const {
      advancedSearch, coordinates, data, radius, zoom,
    } = this.props;
    const {
      currentLocationCoordinates, isMarkerShown, markers, useCurrentLocation,
    } = this.state;
    const props = {
      advancedSearch,
      currentLocationCoordinates,
      center: coordinates,
      zoom,
      isMarkerShown,
      markerName: data.name,
      handleCenterChanged: this.onCircleCenterChanged,
      handleDragEnd: this.onCircleDragEnd,
      handleMarkerClick: this.onMarkerClick,
      handleMapCenterChange: this.onMapCenterChange,
      handleZoomChange: this.onZoomChange,
      radius,
      markers,
      useCurrentLocation,
    };
    return (
      <MapWrapper>
        <MapComponent {...props} />
        {advancedSearch && (
          <LocationButton onClick={this.toggleCurrentLocation} title="Käytä nykyistä sijaintia">
            <LocationIconWrapper useCurrentLocation={useCurrentLocation}>
              <GoLocation size="20" />
            </LocationIconWrapper>
          </LocationButton>
        )}
      </MapWrapper>
    );
  }
}

Map.defaultProps = {
  advancedSearch: false,
  onCircleDragEnd: null,
  onZoomChange: null,
  radius: 10000,
  zoom: MAP_DEFAULT_ZOOM,
};
export default Map;
