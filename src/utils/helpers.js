const graphXYHelper = (data) => {
  let plot_data = [];
  let x = [];
  let y = [];
  data.map((each) => {
    x.push(each.time);
    y.push(each.intensity);
  });
  plot_data["x"] = x;
  plot_data["y"] = y;
  return plot_data;
};

export { graphXYHelper };