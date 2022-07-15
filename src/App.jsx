// import { useSelector , useDispatch} from "react-redux";
import "./App.css";
// import MapComponent from "./components/map-component";
// import {getLightningDataByFilters} from "./redux-state/reducers/lightningReducer"
import LightningPage from "./screens/LightningPage";

function App() {
  // const dispatch = useDispatch();
  // const fromDate = "2022-06-08T15:44:04Z";
  // const todate = "2022-06-08T12:44:04Z";
  // const intensityFrom = "6";
  // const intensityTo = "12";
  // const isCloudToCloud = "true";
  // dispatch(getLightningDataByFilters({"id":"2" , "name":"thor"}));
  // const data = useSelector(store => store.lightning);
  // console.log(data , 'dataaaaaaaaaa')
  // fetch(
  //   `http://localhost:3000/features?properties.intensity>=${intensityFrom}&&properties.intensity<=${intensityTo}&&properties.time>=${fromDate}&&properties.time<=${todate}&&properties.isCloudToCloud=${isCloudToCloud}`
  // ).then((res) => {
  //   res.json().then((response) => {
     
  //     console.log(response, "Api response");
  //   });
  // });
  return (
    <div className="main-content">
      <LightningPage></LightningPage>
    </div>
  );
}

export default App;
