import React from "react";
import { connect } from "react-redux";
import { getLightningDataService } from "../shared-services/lightning-service";
import { getLightningDataByFilters } from "../redux-state/reducers/lightningReducer";
import MapComponent from "../components/map-component";
import LightningDatatable from "../components/lightning-datatable";
import BarGraph from "../components/bar-graph";
import { filterLightningData } from "../utils/filterLightningData";

class LightningPage extends React.Component {
  constructor(props) {
    // passing props into super will allow us to access props using ".this"
    super(props);
    this.state = {
      dataTableData: [],
      mapData: [],
    };
  }

  // An react life cycle method , this will be called once at the start of page load
  async componentDidMount() {
    const filters = await {
      fromDate: "2010-06-09T15:44:04Z",
      todate: "2022-06-10T12:44:04Z",
      intensityFrom: "4",
      intensityTo: "12",
      isCloudToCloud: "true",
    };
    const lightningDataBulk = await getLightningDataService();
    const lightningData = await filterLightningData(lightningDataBulk, filters);
    let dataTableData = [];
    for (let data of lightningData) {
      dataTableData.push(data.properties);
    }
    this.setState({
      dataTableData: dataTableData,
      mapData: lightningData,
    });
    await this.props.setLightningDataByFilters(lightningData);
  }

  // An react life cycle method  , this will be called every time we change state ,
  // so that we can handle data changing very well , we can compare "prevProps" and "Props"
  // in order to check if something is changed or not
  async componentDidUpdate(prevProps) {}

  render() {
    // Render() method excecutes before ComponentDidMount and ComponentDidUpdate
    // here we can destruct the properties like , Props and State

    return (
      <div className="Lightning" id="wrapper">
        <div className="map-div">
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="card">
                    <MapComponent positions={this.state.mapData}></MapComponent>
                  </div>
                </td>
                <td>
                  <div className="card">
                    <LightningDatatable
                      dataSource={this.state.dataTableData}
                    ></LightningDatatable>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td>
                <div className="card">
                <BarGraph graphData={this.state.dataTableData}></BarGraph>
              </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

// Here Im Mapping Action into the components props , so that we can call action via props easily
const mapDispatchToProps = (dispatch) => {
  return {
    setLightningDataByFilters: (data) =>
      dispatch(getLightningDataByFilters(data)),
  };
};

// Here Im mapping State Data into the current component props data
const mapStateToProps = (state) => {
  return { lightning: state.lightning };
};

// Here Redux connect() helps us to connect both the action into the component
export default connect(mapStateToProps, mapDispatchToProps)(LightningPage);
