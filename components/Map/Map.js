// @flow

import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import { GoLocation } from 'react-icons/go';
import { isArrayWithLength } from 'helpers/utils';
import { getCurrentLocation } from 'helpers/geolocation';
import type { CoordinatesObject, CourseForMap } from 'lib/types';
import { MAP_DEFAULT_ZOOM } from 'lib/constants';
import MapComponent from './MapComponent';
import Styles from './AdvancedSearchMap.styles';

const QUERY_RESULTS_CHANGED = 'QUERY_RESULTS_CHANGED';
const { LocationButton, LocationIconWrapper } = Styles;

type MarkerData = { isOpen: boolean } & CourseForMap;
type LatLngFunctions = { lat: Function, lng: Function };

type Props = {
  advancedSearch?: boolean,
  coordinates: CoordinatesObject,
  data: { name: string, queryResults?: Array<?CourseForMap> },
  onDragEnd?: Function,
  onZoomChange?: Function,
  radius?: string,
  zoom?: number,
};
type State = {
  coordinates: ?CoordinatesObject,
  isMarkerShown: boolean,
  markers: Array<?MarkerData>,
  useCurrentLocation: boolean,
};

class Map extends PureComponent<Props, State> {
  timeOut = null;

  static defaultProps = {
    advancedSearch: false,
    onDragEnd: null,
    onZoomChange: null,
    radius: 10000,
    zoom: MAP_DEFAULT_ZOOM,
  };

  state = {
    coordinates: null,
    isMarkerShown: false,
    markers: [],
    useCurrentLocation: false,
  };

  constructor(props: Props) {
    super(props);
    const { advancedSearch, data } = props;
    const { queryResults } = data;
    if (isArrayWithLength(queryResults)) {
      const markers = this.getMarkersFromQueryData();
      this.state = {
        coordinates: null,
        isMarkerShown: false,
        markers,
        useCurrentLocation: !!advancedSearch,
      };
    }
  }

  componentDidMount() {
    this.delayedShowMarker();
    this.updateCoordinatesToCurrentLocation();
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
      return queryResults.map(marker => ({ ...marker, isOpen: false }));
    }
    return [];
  };

  updateMarkers = () => {
    const markers = this.getMarkersFromQueryData();
    this.setState({ markers });
  };

  delayedShowMarker = () => {
    this.timeOut = setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  onMarkerClick = (markerId: string) => {
    const { markers } = this.state;
    // eslint-disable-next-line max-len
    const updatedMarkers = markers.map(marker => (marker && marker.id === markerId ? { ...marker, isOpen: !marker.isOpen } : { ...marker, isOpen: false }));
    this.setState({ markers: updatedMarkers });
    // this.delayedShowMarker();
  };

  onCircleDragEnd = () => {
    const { onDragEnd } = this.props;
    const { coordinates } = this.state;
    // console.log('coordinates: ', coordinates);
    if (typeof onDragEnd === 'function' && coordinates) {
      onDragEnd(coordinates);
    }
  };

  onCircleCenterChanged = (coords: LatLngFunctions) => {
    if (coords && typeof coords.lat === 'function' && typeof coords.lng === 'function') {
      this.setState({ coordinates: { lat: coords.lat(), lng: coords.lng() } });
    }
  };

  onZoomChange = (zoom: number) => {
    const { onZoomChange } = this.props;
    if (typeof onZoomChange === 'function') {
      onZoomChange(zoom);
    }
  };

  onMapCenterChange = (coords: LatLngFunctions) => {
    const { coordinates, useCurrentLocation } = this.state;
    if (coords && coordinates && typeof coords.lat === 'function' && typeof coords.lng === 'function') {
      const newCoordinates = { lat: coords.lat().toFixed(7), lng: coords.lng().toFixed(7) };
      const coordinatesToFixed = { lat: coordinates.lat.toFixed(7), lng: coordinates.lng.toFixed(7) };
      if (useCurrentLocation && coordinates && !isEqual(coordinatesToFixed, newCoordinates)) {
        this.toggleCurrentLocation();
      }
    }
  };

  updateCoordinatesToCurrentLocation = () => {
    try {
      const getCurrentPositionSuccess = (pos) => {
        const { onDragEnd } = this.props;
        const { coords } = pos;
        const newCoordinates = {
          lat: coords.latitude,
          lng: coords.longitude,
        };
        this.setState({
          coordinates: newCoordinates,
        });
        // TODO: separate variables for circle coords and map coords
        if (typeof onDragEnd === 'function') {
          onDragEnd(newCoordinates);
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
    console.log('newUseCurrentLocationValue: ', newUseCurrentLocationValue);
    if (newUseCurrentLocationValue) {
      this.updateCoordinatesToCurrentLocation();
    }
  };

  render() {
    const {
      advancedSearch, coordinates, data, radius, zoom,
    } = this.props;
    const { isMarkerShown, markers, useCurrentLocation } = this.state;
    const props = {
      advancedSearch,
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
      <>
        <MapComponent {...props} />
        {advancedSearch && (
          <LocationButton onClick={this.toggleCurrentLocation} title="Käytä nykyistä sijaintia">
            <LocationIconWrapper useCurrentLocation={useCurrentLocation}>
              <GoLocation size="1.25rem" />
            </LocationIconWrapper>
          </LocationButton>
        )}
      </>
    );
  }
}

Map.defaultProps = {
  advancedSearch: false,
  onDragEnd: null,
  onZoomChange: null,
  radius: 10000,
  zoom: MAP_DEFAULT_ZOOM,
};
export default Map;
