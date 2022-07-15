import React, { Component } from 'react'
import Plot from 'react-plotly.js';
class BarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], layout: {}, frames: [], config: {} };
  }
  componentDidMount() {
    let properties = [];
    fetch("https://raw.githubusercontent.com/meteotest/frontend-coding-challenge/master/data.geojson").then(res => {
      res.json().then(response => {
        properties = []
        for (let data of response.features) {
          properties.push(data.properties)
        }
        this.setState({ data: properties })
      })
    })
  }
  transformData(data) {
    let plot_data = [];
    let x = [];
    let y = [];
    data.map(each => {
      x.push(each.time)
      y.push(each.time)
    })
    plot_data['x'] = x
    plot_data['y'] = y
    return plot_data
  }
  render() {
    return (
      <Plot
        data={[{
          type: 'histogram',
          x: this.transformData(this.state.data)['x'],
          y: this.transformData(this.state.data)['y'],
          marker:{color:'grey'}
        }]}
        layout = {{width:1000,height:300,hovermode:'closest'}}
      />
    )
  }
}
export default BarGraph