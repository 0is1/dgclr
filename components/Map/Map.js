// @flow

import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import { isArrayWithLength } from 'helpers/utils';
import type { CoordinatesObject, CourseForMap } from 'lib/types';
import { MAP_DEFAULT_ZOOM } from 'lib/constants';
import MapComponent from './MapComponent';

const QUERY_RESULTS_CHANGED = 'QUERY_RESULTS_CHANGED';

type MarkerData = { isOpen: boolean } & CourseForMap;

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
  };

  constructor(props: Props) {
    super(props);
    const { data } = props;
    const { queryResults } = data;
    if (isArrayWithLength(queryResults)) {
      const markers = this.getMarkersFromQueryData();
      this.state = {
        coordinates: null,
        isMarkerShown: false,
        markers,
      };
    }
  }

  componentDidMount() {
    this.delayedShowMarker();
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
    console.log('coordinates: ', coordinates);
    if (typeof onDragEnd === 'function' && coordinates) {
      onDragEnd(coordinates);
    }
  };

  onCircleCenterChanged = (coords: { lat: Function, lng: Function }) => {
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

  render() {
    const {
      advancedSearch, coordinates, data, radius, zoom,
    } = this.props;
    const { isMarkerShown, markers } = this.state;
    const props = {
      advancedSearch,
      center: coordinates,
      zoom,
      isMarkerShown,
      markerName: data.name,
      handleCenterChanged: this.onCircleCenterChanged,
      handleDragEnd: this.onCircleDragEnd,
      handleMarkerClick: this.onMarkerClick,
      handleZoomChange: this.onZoomChange,
      radius,
      markers,
    };
    return <MapComponent {...props} />;
  }
}

export default Map;
