// @flow

import React, { PureComponent } from 'react';
import { compose, withProps, withStateHandlers } from 'recompose';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker,
} from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import colors from 'components/colors';

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing&key=AIzaSyCgbVaENPZQ1wOhdIyCok5yJTSVKBa6gYQ',
    loadingElement: <div style={{ height: '100%' }} />,
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
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap defaultZoom={11} defaultCenter={props.defaultCenter}>
    <Marker position={props.defaultCenter} onClick={props.onToggleOpen}>
      {props.isOpen && (
        <InfoBox
          onCloseClick={props.onToggleOpen}
          options={{ closeBoxURL: '', enableEventPropagation: true }}
        >
          <div style={{ backgroundColor: colors.info, padding: '12px' }}>
            <div style={{ fontSize: '16px', color: '#ffffff' }}>Hello, Kaohsiung!</div>
          </div>
        </InfoBox>
      )}
    </Marker>
  </GoogleMap>
));

type Props = {
  coordinates: {},
};

class Map extends PureComponent<Props> {
  state = {
    isMarkerShown: false,
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  render() {
    const { coordinates } = this.props;
    const { isMarkerShown } = this.state;
    return (
      <MyMapComponent
        defaultCenter={coordinates}
        isMarkerShown={isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    );
  }
}

export default Map;
