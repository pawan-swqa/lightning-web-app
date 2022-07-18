import React from "react";
import { connect } from "react-redux";
import { getLightningDataService } from "../shared-services/lightning-service";
import { getLightningDataByFilters } from "../redux-state/reducers/lightningReducer";
import {setFilters} from "../redux-state/reducers/filtersReducer"
import MapComponent from "../components/map-component";
import LightningDatatable from "../components/lightning-datatable";
import BarGraph from "../components/bar-graph";
import { filterLightningData , filterHighLightedData } from "../utils/filterLightningData";
import TopNavBar from "../components/top-nav-bar";
import { SyncLoader } from "react-spinners";

class LightningPage extends React.Component {
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
    this.setState({
      isLoading: true,
    });
    await this.props.setDataFilters(filters)
    const lightningDataBulk = await getLightningDataService();
    const lightningData = await filterLightningData(lightningDataBulk, filters);
    await this.props.setLightningDataByFilters(lightningData);
    for (let data of lightningData) {
      dataTableData.push(data.properties);
    }
    this.setState({
      dataTableData: dataTableData,
      mapData: lightningData,
      isLoading: false,
    });
  }

  async setHignlightedData(dates) {
    let dataTableData = [];
    this.setState({
      isLoading: true,
    });
    const date = new Date(dates[0]);
    const lightningDataBulk = await getLightningDataService();
    const filteredData = await filterHighLightedData(lightningDataBulk , date);
    await this.props.setLightningDataByFilters(filteredData);
    for (let data of filteredData) {
      dataTableData.push(data.properties);
    }
    this.setState({
      dataTableData: dataTableData,
      mapData: filteredData,
      isLoading: false,
    });
  }

  render() {
    // Render() method excecutes before ComponentDidMount and ComponentDidUpdate
    // here we can destruct the properties like , Props and State

    return (
      <div className="main">
        {this.state.isLoading ? (
          <div className="loader">
            <SyncLoader size={30} color={'#F37A24'}></SyncLoader>
          </div>
        ) : (
          <div>
            {!this.state.isLoading && this.state.mapData.length > 0 ?
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
                          positions={this.state.mapData}
                        ></MapComponent>
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
                        <BarGraph
                          graphData={this.state.dataTableData}
                          setHignlightedData={this.setHignlightedData}
                        ></BarGraph>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> :
          <div className="no-data">
            <h1>No Data Found</h1>
          </div>
            }
          </div>
        )}
      </div>
    );
  }
}

// Here Im Mapping Action into the components props , so that we can call action via props easily
const mapDispatchToProps = (dispatch) => {
  return {
    setLightningDataByFilters: (data) => dispatch(getLightningDataByFilters(data)),
    setDataFilters: (data) => dispatch(setFilters(data))
  };
};

// Here Im mapping State Data into the current component props data
const mapStateToProps = (state) => {
  return { lightning: state.lightning, filters: state.filters.mainData };
};

// Here Redux connect() helps us to connect both the action into the component
export default connect(mapStateToProps, mapDispatchToProps)(LightningPage);
