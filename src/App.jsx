import "./App.css";
import MapComponent from "./components/map-component";

function App() {
  return (
    <div className="main-content">
      <div className="row">
        <div className="col">
        <MapComponent></MapComponent>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}

export default App;
