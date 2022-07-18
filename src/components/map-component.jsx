import "../App.css";
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

function MapComponent(props) {
  return (
    <MapContainer center={[4.7804, 46.5313]} zoom={10} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {props.positions.map((data , i) => (
          <CircleMarker
          key={`marker_${i}`}
            color={
              data.properties.intensity >= 0 && data.properties.intensity <= 5
                ? "darkgreen"
                : data.properties.intensity >= 5.1
                ? "orange"
                : "red"
            }
            center={data.geometry.coordinates}
          >
            <Popup>
              <ul>
                <li>
                  <span>Intensity</span>:
                  <span>{data.properties.intensity}</span>
                </li>
                <li>
                  <span>X:{data.geometry.coordinates[0]}</span>
                </li>
                <li>
                  <span>Y:{data.geometry.coordinates[1]}</span>
                </li>
              </ul>
            </Popup>
          </CircleMarker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default MapComponent;
