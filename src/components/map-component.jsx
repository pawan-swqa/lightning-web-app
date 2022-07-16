import "../App.css";
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";

function MapComponent(props) {


  return (
    <MapContainer center={[4.375, 49.3248]} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='Lightning Data' url=""
    />

    <MarkerClusterGroup chunkedLoading>
    {props.positions.map((data) => (
      <CircleMarker center={data.geometry.coordinates}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </CircleMarker>
      ))}
    </MarkerClusterGroup>
      
  </MapContainer>
  );
}

export default MapComponent;
