import { plot, Plot } from "nodeplotlib";

const layout = {
  autosize: false,
  width: 1920,
  height: 900,
  scene: {
    xaxis: {
      color: "#fff",
      nticks: 9,
      range: [-10, 10]
    },
    yaxis: {
      color: "#fff",
      nticks: 7,
      range: [-10, 10]
    },
    zaxis: {
      color: "#fff",
      nticks: 10,
      range: [-10, 10]
    }
  }
};

const trace: Plot = {
  connectgaps: false,
  x: [1],
  y: [0],
  z: [0],
  type: "scatter3d",
  mode: "markers"
};

plot([trace], layout);
