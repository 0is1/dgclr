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
        onCenterChanged: () => {
          this.props.onCenterChanged(refs.circle.getCenter());
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap,
)((props) => {
  const {
    course, defaultCenter, isOpen, onCenterChanged, onCircleMounted, onDragEnd, onToggleOpen, radius,
  } = props;
  const { name } = course;
  return (
    <GoogleMap defaultZoom={11} defaultCenter={defaultCenter}>
      <Marker position={defaultCenter} onClick={onToggleOpen}>
        {isOpen && (
          <InfoBox onCloseClick={onToggleOpen} options={{ closeBoxURL: '', enableEventPropagation: true }}>
            <div style={{ backgroundColor: colors.info, padding: '12px' }}>
              <div style={{ fontSize: '16px', color: '#ffffff' }}>{name}</div>
            </div>
          </InfoBox>
        )}
      </Marker>
      <Circle
        ref={onCircleMounted}
        defaultCenter={defaultCenter}
        defaultDraggable
        defaultRadius={10000}
        onDragEnd={onDragEnd}
        radius={radius}
        onCenterChanged={onCenterChanged}
      />
    </GoogleMap>
  );
});

type Props = {
  coordinates: { lat: number, lng: number },
  course: {},
};
type State = {
  coordinates: ?{ lat: number, lng: number },
  isMarkerShown: boolean,
  radius: number,
};

class Map extends PureComponent<Props, State> {
  timeOut = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      coordinates: props.coordinates,
      isMarkerShown: false,
      radius: 10000,
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
    console.log('onDragEnd');
  };

  onCircleCenterChanged = (coords: { lat: Function, lng: Function }) => {
    this.setState({ coordinates: { lat: coords.lat(), lng: coords.lng() } });
  };

  onRadiusChange = (e: { target: { value: number } }) => {
    this.setState({ radius: parseInt(e.target.value, 10) });
  };

  render() {
    const { course } = this.props;
    const { coordinates, isMarkerShown, radius } = this.state;
    // console.log('this.state: ', this.state);
    const props = {
      course,
      defaultCenter: coordinates,
      isMarkerShown,
      onCenterChanged: this.onCircleCenterChanged,
      onDragEnd: this.handleOnCircleDragEnd,
      onMarkerClick: this.handleMarkerClick,
      radius,
    };
    return (
      <React.Fragment>
        <MyMapComponent {...props} />
        <input value={radius} type="range" name="radius" min="1000" max="50000" onChange={this.onRadiusChange} />
      </React.Fragment>
    );
  }
}

export default Map;
