import "../App.css";
import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker,
  FeatureGroup,
  Polygon,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

function MapComponent(props) {
  const _created = (e) => {
    props.setBySelection(e.layer._latlngs[0]);
  }
  return (
    <MapContainer center={props.coords} zoom={10} scrollWheelZoom={true}>
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={_created}
          draw={{
            rectangle:false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline:false
          }}
        ></EditControl>
      </FeatureGroup>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {props.positions.map((data, i) => (
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
