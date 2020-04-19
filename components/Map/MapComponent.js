import React, { PureComponent } from 'react';
import {
  GoogleMap, useLoadScript, MarkerClusterer, Marker, InfoBox, Circle,
} from '@react-google-maps/api';
import Link from 'next/link';
import { isArrayWithLength } from 'helpers/utils';
import { BarLoader } from 'components/Spinners';
import colors from 'components/colors';
import type { CoordinatesObject, CourseForMap } from 'lib/types';
import Styles from './MapComponent.styles';

const {
  Wrapper, LoaderWrapper, InfoBoxContainer, InfoBoxText,
} = Styles;
type MarkerData = { isOpen: boolean } & CourseForMap;

type Props = {
  advancedSearch: boolean,
  center: CoordinatesObject,
  currentLocationCoordinates: ?CoordinatesObject,
  data: { name: string, queryResults?: Array<?CourseForMap> },
  handleCenterChanged: Function,
  handleDragEnd: Function,
  handleMarkerClick: Function,
  handleMapCenterChange: Function,
  handleZoomChange: Function,
  markerName: string,
  markers: Array<?MarkerData>,
  radius: number,
  useCurrentLocation: boolean,
  zoom: number,
};

class Map extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.circleRef = React.createRef();
  }

  state = {
    isOpen: false,
  };

  onToggleOpen = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  onZoomChanged = () => {
    if (this.mapRef.current) {
      const { handleZoomChange } = this.props;
      const { state } = this.mapRef.current;
      // console.log('state.map.zoom: ', state.map.zoom);
      handleZoomChange(state.map.zoom);
    }
  };

  onMapCenterChanged = () => {
    if (this.mapRef.current) {
      const { handleMapCenterChange } = this.props;
      const { state } = this.mapRef.current;
      handleMapCenterChange(state.map.center);
    }
  };

  onCircleCenterChanged = () => {
    if (this.circleRef.current) {
      const { state } = this.circleRef.current;
      const { handleCenterChanged } = this.props;
      // console.log('state.circle.center: ', state.circle.center);
      handleCenterChanged(state.circle.center);
    }
  };

  onMarkerClustererClick = () => () => {
    // const clickedMarkers = markerClusterer.getMarkers();
    // console.log(`Current clicked markers length: ${clickedMarkers.length}`);
    // console.log(clickedMarkers);
  };

  render() {
    const {
      advancedSearch,
      currentLocationCoordinates,
      center,
      zoom,
      markerName,
      markers,
      handleDragEnd,
      handleMarkerClick,
      radius,
      useCurrentLocation,
    } = this.props;
    const { isOpen } = this.state;
    const mapOptions = useCurrentLocation ? { center: currentLocationCoordinates } : {};
    return (
      <Wrapper>
        <GoogleMap
          id="dgclr-map"
          zoom={zoom}
          center={center}
          onCenterChanged={this.onMapCenterChanged}
          onZoomChanged={this.onZoomChanged}
          mapContainerStyle={{
            height: '100%',
          }}
          ref={this.mapRef}
          options={mapOptions}
        >
          {currentLocationCoordinates && (
            <Marker title="Sijaintisi" icon="/static/location-pin.svg" position={currentLocationCoordinates} />
          )}
          {!advancedSearch && (
            <Marker position={center} onClick={this.onToggleOpen}>
              {isOpen && (
                <InfoBox
                  onCloseClick={this.onToggleOpen}
                  options={{
                    closeBoxURL: '',
                    enableEventPropagation: true,
                  }}
                  position={center}
                >
                  <InfoBoxContainer>
                    <InfoBoxText>{markerName}</InfoBoxText>
                  </InfoBoxContainer>
                </InfoBox>
              )}
            </Marker>
          )}
          {isArrayWithLength(markers) && (
            <MarkerClusterer onClick={this.onMarkerClustererClick} averageCenter enableRetinaIcons gridSize={60}>
              {(clusterer) => markers.map((marker) => (
                <Marker
                  key={marker.name}
                  position={marker.coordinates}
                  onClick={() => {
                    handleMarkerClick(marker.id);
                  }}
                  clusterer={clusterer}
                >
                  {marker.isOpen && (
                  <InfoBox
                    onCloseClick={() => {
                      handleMarkerClick(marker.id);
                    }}
                    options={{
                      closeBoxURL: '',
                      enableEventPropagation: true,
                    }}
                    position={marker.coordinates}
                  >
                    <InfoBoxContainer>
                      <InfoBoxText>{`${marker.name} – ${marker.address}`}</InfoBoxText>
                      <Link as={`/${marker.slug}`} href={`/course?slug=${marker.slug}`}>
                        <p>Näytä rata</p>
                      </Link>
                    </InfoBoxContainer>
                  </InfoBox>
                  )}
                </Marker>
              ))}
            </MarkerClusterer>
          )}
          {advancedSearch && (
            <Circle
              ref={this.circleRef}
              center={center}
              onDragEnd={handleDragEnd}
              onCenterChanged={this.onCircleCenterChanged}
              options={{
                fillColor: colors.green,
                strokeColor: colors.green,
                radius: parseInt(radius, 10),
                zIndex: 2,
                visible: true,
                draggable: true,
              }}
            />
          )}
        </GoogleMap>
      </Wrapper>
    );
  }
}

const LoadMap = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    id: 'script-loader',
    googleMapsApiKey: 'AIzaSyCgbVaENPZQ1wOhdIyCok5yJTSVKBa6gYQ',
  });
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }
  if (!isLoaded) {
    return (
      <LoaderWrapper>
        <BarLoader />
      </LoaderWrapper>
    );
  }
  return <Map {...props} />;
};
export default LoadMap;
