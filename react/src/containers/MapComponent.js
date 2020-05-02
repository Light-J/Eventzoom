import {
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";
  import React from "react"
  
const MapWithAMarker = withGoogleMap(props =>
    <GoogleMap
      defaultZoom={13}
      defaultCenter={ props.coordinates || { lat: -34.397, lng: 150.644 } }
    >
      <Marker
        position={props.coordinates || { lat: -34.397, lng: 150.644 }}
      />
    </GoogleMap>
  );

  export default MapWithAMarker;