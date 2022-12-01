import React, { memo, useCallback, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  maxHeight: "50vh",
  minHeight: "200px",
  height: "80ch",
  width: "100%",
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};
const getCenterFromCoordinates = (coordinates?: number[]) => {
  if (!coordinates) {
    return defaultCenter;
  }
  return {
    lat: coordinates[1],
    lng: coordinates[0],
  };
};
type Props = {
  coordinates?: number[];
};

function MapComponent(props: Props) {
  const { coordinates } = props;
  const center = getCenterFromCoordinates(coordinates);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
    setTimeout(() => map.setZoom(15), 300);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);
  if (!isLoaded) {
    return null;
  }
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} />
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  );
}

export default memo(MapComponent);
