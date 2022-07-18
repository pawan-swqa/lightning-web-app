import React from "react";
import Plot from "react-plotly.js";
import { graphXYHelper } from "../utils/helpers";
function BarGraph(props) {
  const data = graphXYHelper(props.graphData);
    return (
      <Plot
        data={[
          {
            type: "histogram",
            x: data["x"],
            y: data["y"],
            marker: { color: "black" },
            mode: 'markers',
          },
        ]}
        layout={
          { width: 1500, height: 400,hovermode: 'closet' ,  autosize: true, }
        }
      />
    );
}
export default BarGraph;
