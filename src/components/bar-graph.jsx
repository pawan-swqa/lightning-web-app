import React from "react";
import Plot from "react-plotly.js";
import { graphXYHelper } from "../utils/helpers";
function BarGraph(props) {
  const data = graphXYHelper(props.graphData);
    return (
      <Plot
        data={[
          {
            type: "bar",
            x: data["x"],
            y: data["y"],
            marker: { color: "black" },
            mode: 'markers',
            hoverinfo:"x+y"
          },
        ]}
        layout={
          { width: "50%", height: 300, hovermode: "closest" , autosize: false, }
        }
      />
    );
}
export default BarGraph;
