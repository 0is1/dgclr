import React, { memo, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { Button } from 'antd';

const containerStyle = {
  maxHeight: '50vh',
  minHeight: '200px',
  height: '80ch',
  width: '100%',
};

type MapData = {
  id: number | string;
  lat: number | undefined;
  lng: number | undefined;
  name: string;
  slug: string;
};

type Props = {
  locations: MapData[];
};

function AdvancedMapComponent(props: Props) {
  const router = useRouter();
  const { locations } = props;
  const [activeMarker, setActiveMarker] = useState<MapData | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const addClusterer = useCallback(
    (currentMap: google.maps.Map) => {
      const bounds = new window.google.maps.LatLngBounds();
      const markers = locations
        .map((location) => {
          if (!location.lat || !location.lng) return null;
          const marker = new google.maps.Marker({
            position: {
              lat: location.lat,
              lng: location.lng,
            },
          });
          //extend the bounds to include each marker's position
          bounds.extend({
            lat: location.lat,
            lng: location.lng,
          });

          // markers can only be keyboard focusable when they have click listeners
          // open info window when marker is clicked
          marker.addListener('click', () => {
            setActiveMarker(location);
          });

          return marker;
        })
        .filter((value) => !!value) as google.maps.Marker[]; // filter out null values
      // fit the map to the newly inclusive bounds
      currentMap.fitBounds(bounds);
      new MarkerClusterer({ markers, map: currentMap });
      const zoom = currentMap.getZoom();
      // if zoom is too high, set it to 14
      if (zoom && zoom > 14) {
        currentMap.setZoom(14);
      }
    },
    [locations]
  );
  // if locations change, add new markers to map
  useEffect(() => {
    if (map) {
      addClusterer(map);
    }
  }, [locations, map, addClusterer]);

  const onLoad = useCallback(
    (currentMap: google.maps.Map) => {
      setMap(currentMap);
      setTimeout(() => addClusterer(currentMap), 500);
    },
    [addClusterer]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);
  if (!isLoaded) {
    return null;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {activeMarker && activeMarker.lat && activeMarker.lng && (
        <InfoWindow
          onCloseClick={() => setActiveMarker(null)}
          position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
        >
          <Button
            type="primary"
            onClick={() => router.push(`/${activeMarker.slug}`)}
          >
            {activeMarker.name}
          </Button>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default memo(AdvancedMapComponent);
