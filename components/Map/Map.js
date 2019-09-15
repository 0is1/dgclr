// @flow

import React, { PureComponent } from 'react';
import Link from 'next/link';
import { isEqual } from 'lodash';
import {
  compose, lifecycle, withProps, withStateHandlers,
} from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import { BarLoader } from 'components/Spinners';
import colors from 'components/colors';
import { isArrayWithLength } from 'helpers/utils';
import type { CoordinatesObject, CourseForMap } from 'lib/types';
import { MAP_DEFAULT_ZOOM } from 'lib/constants';

const QUERY_RESULTS_CHANGED = 'QUERY_RESULTS_CHANGED';

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing&key=AIzaSyCgbVaENPZQ1wOhdIyCok5yJTSVKBa6gYQ',
    loadingElement: (
      <div style={{ height: '500px' }}>
        <BarLoader />
      </div>
    ),
    containerElement: <div style={{ height: '500px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withStateHandlers(
    () => ({
      isOpen: false,
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      }),
      // $FlowFixMe
      onMarkerClustererClick: () => (markerClusterer) => {
        const clickedMarkers = markerClusterer.getMarkers();
        console.log(`Current clicked markers length: ${clickedMarkers.length}`);
        console.log(clickedMarkers);
      },
    },
  ),
  lifecycle({
    componentDidMount() {
      const refs = { map: null, circle: null };

      this.setState({
        onCircleMounted: (ref) => {
          refs.circle = ref;
        },
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        onCircleCenterChanged: () => {
          if (refs.circle) {
            this.props.onCenterChanged(refs.circle.getCenter());
          }
        },
        onZoomChanged: () => {
          if (refs.map) {
            this.props.onZoomChange(refs.map.getZoom());
          }
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap,
)((props) => {
  const {
    advancedSearch,
    defaultCenter,
    defaultZoom,
    isOpen,
    markerName,
    markers,
    onCircleCenterChanged,
    onCircleMounted,
    onDragEnd,
    onMapMounted,
    onMarkerClick,
    onToggleOpen,
    onZoomChanged,
    radius,
  } = props;
  // console.log('props: ', props);
  return (
    <GoogleMap
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
      onZoomChanged={onZoomChanged}
      ref={onMapMounted}
    >
      {!advancedSearch && (
        <Marker position={defaultCenter} onClick={onToggleOpen}>
          {isOpen && (
            <InfoBox
              onCloseClick={onToggleOpen}
              options={{ closeBoxURL: '', enableEventPropagation: true }}
            >
              <div style={{ backgroundColor: colors.info, padding: '12px' }}>
                <div style={{ fontSize: '16px', color: '#ffffff' }}>
                  {markerName}
                </div>
              </div>
            </InfoBox>
          )}
        </Marker>
      )}
      {isArrayWithLength(markers) && (
        <MarkerClusterer
          onClick={props.onMarkerClustererClick}
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          {markers.map(marker => (
            <Marker
              key={marker.name}
              position={marker.coordinates}
              onClick={() => {
                onMarkerClick(marker.id);
              }}
            >
              {marker.isOpen && (
                <InfoBox
                  onCloseClick={() => {
                    onMarkerClick(marker.id);
                  }}
                  options={{ closeBoxURL: '', enableEventPropagation: true }}
                >
                  <div
                    style={{ backgroundColor: colors.info, padding: '10px' }}
                  >
                    <div style={{ fontSize: '13px', color: '#ffffff' }}>
                      {`${marker.name} – ${marker.address}`}
                    </div>
                    <Link
                      as={`/${marker.slug}`}
                      href={`/course?slug=${marker.slug}`}
                    >
                      <p>Näytä rata</p>
                    </Link>
                  </div>
                </InfoBox>
              )}
            </Marker>
          ))}
        </MarkerClusterer>
      )}
      {advancedSearch && (
        <Circle
          ref={onCircleMounted}
          defaultCenter={defaultCenter}
          defaultDraggable
          defaultRadius={20000}
          onDragEnd={onDragEnd}
          radius={parseInt(radius, 10)}
          onCenterChanged={onCircleCenterChanged}
          options={{ fillColor: colors.green, strokeColor: colors.green }}
        />
      )}
    </GoogleMap>
  );
});

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

  handleMarkerClick = (markerId: string) => {
    const { markers } = this.state;
    // eslint-disable-next-line max-len
    const updatedMarkers = markers.map(marker => (marker && marker.id === markerId
      ? { ...marker, isOpen: !marker.isOpen }
      : { ...marker, isOpen: false }));
    this.setState({ markers: updatedMarkers });
    // this.delayedShowMarker();
  };

  handleOnCircleDragEnd = () => {
    const { onDragEnd } = this.props;
    const { coordinates } = this.state;
    if (typeof onDragEnd === 'function' && coordinates) {
      onDragEnd(coordinates);
    }
  };

  onCircleCenterChanged = (coords: { lat: Function, lng: Function }) => {
    this.setState({ coordinates: { lat: coords.lat(), lng: coords.lng() } });
  };

  handleZoomChange = (zoom: number) => {
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
      defaultCenter: coordinates,
      defaultZoom: zoom,
      isMarkerShown,
      markerName: data.name,
      onCenterChanged: this.onCircleCenterChanged,
      onDragEnd: this.handleOnCircleDragEnd,
      onMarkerClick: this.handleMarkerClick,
      onZoomChange: this.handleZoomChange,
      radius,
      markers,
    };
    return <MyMapComponent {...props} />;
  }
}

export default Map;
