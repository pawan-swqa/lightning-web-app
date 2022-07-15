import "../App.css";
import { MapContainer, TileLayer, Marker , Popup } from 'react-leaflet'

function MapComponent() {

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[51.505, -0.09]}>
      <Popup>
        Popup Content
      </Popup>
    </Marker>
  </MapContainer>
  );
}

export default MapComponent;
