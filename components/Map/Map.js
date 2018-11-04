// @flow

import React, { PureComponent } from 'react';
import {
  compose, lifecycle, withProps, withStateHandlers,
} from 'recompose';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker, Circle,
} from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import { BarLoader } from 'components/Spinners';
import colors from 'components/colors';
import type { CoordinatesObject } from 'lib/types';

const MyMapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing&key=AIzaSyCgbVaENPZQ1wOhdIyCok5yJTSVKBa6gYQ',
    loadingElement: (
      <div style={{ height: '400px' }}>
        <BarLoader />
      </div>
    ),
    containerElement: <div style={{ height: '400px' }} />,
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
    radius,
  } = props;
  console.log('props: ', props);
  return (
    <GoogleMap defaultZoom={defaultZoom} defaultCenter={defaultCenter}>
      <Marker position={defaultCenter} onClick={onToggleOpen}>
        {isOpen && (
          <InfoBox onCloseClick={onToggleOpen} options={{ closeBoxURL: '', enableEventPropagation: true }}>
            <div style={{ backgroundColor: colors.info, padding: '12px' }}>
              <div style={{ fontSize: '16px', color: '#ffffff' }}>{markerName}</div>
            </div>
          </InfoBox>
        )}
      </Marker>
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

type Props = {
  advancedSearch?: boolean,
  coordinates: CoordinatesObject,
  data: { name: string },
  onDragEnd?: Function,
  radius?: string,
  zoom?: number,
};
type State = {
  coordinates: ?CoordinatesObject,
  isMarkerShown: boolean,
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
    this.state = {
      coordinates: null,
      isMarkerShown: false,
    };
  }

  componentDidMount() {
    this.delayedShowMarker();
  }

  componentWillUnmount() {
    if (this.timeOut) clearTimeout(this.timeOut);
  }

  delayedShowMarker = () => {
    this.timeOut = setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
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
    const { isMarkerShown } = this.state;
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
    };
    return (
      <React.Fragment>
        <MyMapComponent {...props} />
      </React.Fragment>
    );
  }
}

export default Map;
