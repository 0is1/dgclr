// @flow

import React, { PureComponent } from 'react';
import Link from 'next/link';
import { isEqual } from 'lodash';
import {
  compose, lifecycle, withProps, withStateHandlers,
} from 'recompose';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker, Circle,
} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import { BarLoader } from 'components/Spinners';
import colors from 'components/colors';
import { isArrayWithLength } from 'helpers/utils';
import type { CoordinatesObject, CourseForMap } from 'lib/types';

const QUERY_RESULTS_CHANGED = 'QUERY_RESULTS_CHANGED';

const MyMapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing&key=AIzaSyCgbVaENPZQ1wOhdIyCok5yJTSVKBa6gYQ',
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
      onMarkerClustererClick: () => (markerClusterer) => {
        const clickedMarkers = markerClusterer.getMarkers();
        console.log(`Current clicked markers length: ${clickedMarkers.length}`);
        console.log(clickedMarkers);
      },
    },
  ),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        onCircleMounted: (ref) => {
          refs.circle = ref;
        },
        onCircleCenterChanged: () => {
          if (refs.circle) {
            console.log(refs.circle.getBounds());
            this.props.onCenterChanged(refs.circle.getCenter());
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
    onCircleCenterChanged,
    onCircleMounted,
    onDragEnd,
    onToggleOpen,
    onMarkerClick,
    radius,
    markers,
  } = props;
  console.log('props: ', props);
  return (
    <GoogleMap defaultZoom={defaultZoom} defaultCenter={defaultCenter}>
      {!advancedSearch && (
        <Marker position={defaultCenter} onClick={onToggleOpen}>
          {isOpen && (
            <InfoBox onCloseClick={onToggleOpen} options={{ closeBoxURL: '', enableEventPropagation: true }}>
              <div style={{ backgroundColor: colors.info, padding: '12px' }}>
                <div style={{ fontSize: '16px', color: '#ffffff' }}>{markerName}</div>
              </div>
            </InfoBox>
          )}
        </Marker>
      )}
      {isArrayWithLength(markers) && (
        <MarkerClusterer onClick={props.onMarkerClustererClick} averageCenter enableRetinaIcons gridSize={60}>
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
                  <div style={{ backgroundColor: colors.info, padding: '10px' }}>
                    <div style={{ fontSize: '13px', color: '#ffffff' }}>{`${marker.name} – ${marker.address}`}</div>
                    <Link as={`/${marker.slug}`} href={`/course?slug=${marker.slug}`}>
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
    onDragEnd: () => {},
    radius: 10000,
    zoom: 11,
  };

  constructor(props: Props) {
    super(props);
    const { data } = props;
    const { queryResults } = data;
    // $FlowFixMe isArrayWithLength check that this is array but flow doesn't get it
    const markers = isArrayWithLength(queryResults) ? queryResults.map(marker => ({ ...marker, isOpen: false })) : [];
    this.state = {
      coordinates: null,
      isMarkerShown: false,
      markers,
    };
  }

  componentDidMount() {
    this.delayedShowMarker();
  }

  componentDidUpdate(props: Props, state: State, snapshot: ?string) {
    if (snapshot === QUERY_RESULTS_CHANGED) {
      const { data } = this.props;
      const { queryResults } = data;
      // $FlowFixMe isArrayWithLength check that this is array but flow doesn't get it
      const markers = isArrayWithLength(queryResults) ? queryResults.map(marker => ({ ...marker, isOpen: false })) : [];
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ markers });
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

  delayedShowMarker = () => {
    this.timeOut = setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = (markerId: string) => {
    const { markers } = this.state;
    const updatedMarkers = markers.map(
      marker => (marker && marker.id === markerId ? { ...marker, isOpen: !marker.isOpen } : { ...marker, isOpen: false }),
    );
    this.setState({ markers: updatedMarkers });
    // this.delayedShowMarker();
  };

  handleOnCircleDragEnd = () => {
    const { onDragEnd } = this.props;
    const { coordinates } = this.state;
    if (onDragEnd && coordinates) onDragEnd(coordinates);
  };

  onCircleCenterChanged = (coords: { lat: Function, lng: Function }) => {
    this.setState({ coordinates: { lat: coords.lat(), lng: coords.lng() } });
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
      radius,
      markers,
    };
    return (
      <React.Fragment>
        <MyMapComponent {...props} />
      </React.Fragment>
    );
  }
}

export default Map;
