import React from "react";
import Plot from "react-plotly.js";
import { graphXYHelper } from "../utils/helpers";
function BarGraph(props) {
  const data = graphXYHelper(props.graphData);

  function sendHighlightedRanges(dates) {
    props.setHignlightedData(dates);
  }

  return (
    <Plot
      data={[
        {
          type: "histogram",
          x: data["x"],
          y: data["y"],
          marker: { color: "#00ffff", size: 10 },
        },
      ]}
      layout={{ width: 1500, height: 400 }}
      onClick={(data) => {
        let dates = [];
        data.points.map((d) => {
          dates.push(d.x);
        });
        sendHighlightedRanges(dates);
      }}
    />
  );
}
export default BarGraph;
