import React from "react";
import { connect } from "react-redux";
import { getLightningDataService } from "../shared-services/lightning-service";
import { getLightningDataByFilters } from "../redux-state/reducers/lightningReducer";
import { setFilters } from "../redux-state/reducers/filtersReducer";
import {getLightningDatatableByFilters} from "../redux-state/reducers/lightningDataTableReducer";
import {setLoader} from "../redux-state/reducers/loaderReducer";
import MapComponent from "../components/map-component";
import LightningDatatable from "../components/lightning-datatable";
import BarGraph from "../components/bar-graph";
import {
  filterLightningData,
  filterHighLightedData,
  filterDataByRows,
  filterByPolygonSelection
} from "../utils/filterLightningData";
import TopNavBar from "../components/top-nav-bar";
import { SyncLoader } from "react-spinners";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Button } from "@mui/material";
import { setGraphData } from "../redux-state/reducers/graphReducer";

class LightningPage extends React.Component {
  coordniates=[4.7804, 46.5313];
  constructor(props) {
    // passing props into super will allow us to access props using ".this"
    super(props);
    this.state = {
      dataTableData: [],
      mapData: [],
      isLoading: false,
    };

    this.setComponentData = this.setComponentData.bind(this);
    this.setHignlightedData = this.setHignlightedData.bind(this);
    this.setDataByRowSelection = this.setDataByRowSelection.bind(this);
    this.setComponentDataBySelection = this.setComponentDataBySelection.bind(this);
  }

  // An react life cycle method , this will be called once at the start of page load
  async componentDidMount() {
    await this.setComponentData(this.props.filters);
  }

  // An react life cycle method  , this will be called every time we change state ,
  // so that we can handle data changing very well , we can compare "prevProps" and "Props"
  // in order to check if something is changed or not
  async componentDidUpdate(prevProps) {
    // const dataPrevProps = JSON.stringify(prevprops.filters);
    // const dataProps = JSON.stringify()
    // if(JSON.stringify(prevprops.filters) === JSON.stringify(this.props.filters)) {
    // }
  }

  async setComponentData(filters) {
    let dataTableData = [];
    this.props.setLoader(true);
    await this.props.setDataFilters(filters);
    const lightningDataBulk = await getLightningDataService();
    const lightningData = await filterLightningData(lightningDataBulk, filters);
    for (let data of lightningData) {
      dataTableData.push(data.properties);
    }
    await this.props.setLightningDataByFilters(lightningData);
    await this.props.getLightningDatatableByFilters(dataTableData);
    await this.props.setGraphData(dataTableData);
    this.props.setLoader(false);
  }

  async setHignlightedData(dates) {
    let dataTableData = [];
    this.props.setLoader(true);
    const date = new Date(dates[0]);
    const lightningDataBulk = await getLightningDataService();
    const filteredData = await filterHighLightedData(lightningDataBulk, date);
    for (let data of filteredData) {
      dataTableData.push(data.properties);
    }
    await this.props.setLightningDataByFilters(filteredData);
    await this.props.getLightningDatatableByFilters(dataTableData);
    await this.props.setGraphData(dataTableData);
    this.props.setLoader(false);
  }

  async setDataByRowSelection(rows) {
    this.props.setLoader(true);
    const lightningDataBulk = await getLightningDataService();
    const dataObj = await filterDataByRows(lightningDataBulk , rows);
    await this.props.setLightningDataByFilters(dataObj.filteredData);
    await this.props.getLightningDatatableByFilters(dataObj.dataTableData);
    await this.props.setGraphData(dataObj.dataTableData);
    this.props.setLoader(false);
  }

  setComponentDataBySelection = async (polypoints) => {
    let dataTableData = [];
    this.props.setLoader(true);
    const lightningDataBulk = await getLightningDataService();
    const filteredData = filterByPolygonSelection(lightningDataBulk , polypoints);
    for (let data of filteredData) {
      dataTableData.push(data.properties);
    }
    await this.props.setLightningDataByFilters(filteredData);
    await this.props.getLightningDatatableByFilters(dataTableData);
    this.props.setLoader(false);
  }

  render() {
    // Render() method excecutes before ComponentDidMount and ComponentDidUpdate
    // here we can destruct the properties like , Props and State
    return (
      <div className="main">
        {this.props.loader ? (
          <div className="loader">
            <SyncLoader size={30} color={"#F37A24"}></SyncLoader>
          </div>
        ) : (
          <div>
            {!this.props.loader && this.props.lightning.mainData.length > 0 ? (
              <div className="Lightning" id="wrapper">
                <TopNavBar
                  filters={this.props.filters}
                  refreshData={this.setComponentData}
                ></TopNavBar>
                <div className="map-div">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <div className="card">
                            <MapComponent
                            coords={this.coordniates}
                              positions={this.props.lightning.mainData}
                              setBySelection={this.setComponentDataBySelection}
                            ></MapComponent>
                          </div>
                        </td>
                        <td>
                          <div className="card">
                            <LightningDatatable
                              dataSource={this.props.datatableData.mainData}
                              onRowSelection={this.setDataByRowSelection}
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
                            <BarGraph
                              graphData={this.props.graphData}
                              setHignlightedData={this.setHignlightedData}
                            ></BarGraph>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="no-data">
                <h1>No Data Found</h1>
                <Button
                  variant="outlined"
                  startIcon={<RestartAltIcon />}
                  sx={{ marginLeft: 4, float: "right" }}
                  onClick={() => {
                    const filters = {
                      fromDate: "2010-06-09T15:44:04Z",
                      todate: "2022-06-10T12:44:04Z",
                      intensityFrom: "4",
                      intensityTo: "12",
                      isCloudToCloud: true,
                    };
                    this.setComponentData(filters);
                  }}
                >
                  Refresh page
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

// Here Im Mapping Action into the components props , so that we can call action via props easily
const mapDispatchToProps = (dispatch) => {
  return {
    setLightningDataByFilters:(data) => dispatch(getLightningDataByFilters(data)),
    setDataFilters:(data) => dispatch(setFilters(data)),
    getLightningDatatableByFilters:(data) => dispatch(getLightningDatatableByFilters(data)),
    setLoader:(data) => dispatch(setLoader(data)),
    setGraphData:(data) => dispatch(setGraphData(data))
  };
};

// Here Im mapping State Data into the current component props data
const mapStateToProps = (state) => {
  return { lightning: state.lightning, filters: state.filters.mainData , datatableData:state.datatable , loader:state.loader.isLoading , graphData:state.graph.mainData  };
};

// Here Redux connect() helps us to connect both the action into the component
export default connect(mapStateToProps, mapDispatchToProps)(LightningPage);
