import React, { PureComponent } from 'react';
import {
  GoogleMap, useLoadScript, MarkerClusterer, Marker, InfoBox, Circle,
} from '@react-google-maps/api';
import Link from 'next/link';
import { isArrayWithLength } from 'helpers/utils';
import { BarLoader } from 'components/Spinners';
import colors from 'components/colors';
import type { CoordinatesObject, CourseForMap } from 'lib/types';

type MarkerData = { isOpen: boolean } & CourseForMap;

type Props = {
  advancedSearch: boolean,
  center: CoordinatesObject,
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
      advancedSearch, center, zoom, markerName, markers, handleDragEnd, handleMarkerClick, radius, useCurrentLocation,
    } = this.props;
    const { isOpen } = this.state;
    const mapOptions = useCurrentLocation ? { center } : {};
    return (
      <div
        style={{
          height: '500px',
        }}
      >
        <GoogleMap
          id="example-map"
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
                  <div
                    style={{
                      backgroundColor: colors.info,
                      padding: '12px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '16px',
                        color: '#ffffff',
                      }}
                    >
                      {markerName}
                    </div>
                  </div>
                </InfoBox>
              )}
            </Marker>
          )}
          {isArrayWithLength(markers) && (
            <MarkerClusterer onClick={this.onMarkerClustererClick} averageCenter enableRetinaIcons gridSize={60}>
              {clusterer => markers.map(marker => (
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
                    <div
                      style={{
                        backgroundColor: colors.info,
                        padding: '10px',
                      }}
                    >
                      <div style={{ fontSize: '13px', color: '#ffffff' }}>{`${marker.name} – ${marker.address}`}</div>
                      <Link as={`/${marker.slug}`} href={`/course?slug=${marker.slug}`}>
                        <p>Näytä rata</p>
                      </Link>
                    </div>
                  </InfoBox>
                  )}
                </Marker>
              ))
              }
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
      </div>
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
      <div style={{ display: 'flex', justifyContent: 'center', height: '500px' }}>
        <BarLoader />
      </div>
    );
  }
  return <Map {...props} />;
};
export default LoadMap;
