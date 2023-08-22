import "./app.css";
import * as Cesium from "cesium"
import * as dat from "dat.gui";
import { viewer } from "./main";
import Camera from "./Camera/index";
import addRoad from './addRoad'

const gui = new dat.GUI({
  name: "Cesium GUI",
  width: 450,
  autoPlace: true,
  closed: false,
});
gui.domElement.id = "gui";
gui.show();

let camera = new Camera(
  viewer,
  gui,
  {
    position: {
      longitude: 120.388879,
      latitude: 34.748598,
      height: 236414,
    },
    headingPitchRoll: {
      heading: 353.742967,
      pitch: -56.0019,
      roll: 359.999956,
    },
  },
  true,
);

addRoad(viewer, './static/geojson/qingdaoRoad.geojson')
