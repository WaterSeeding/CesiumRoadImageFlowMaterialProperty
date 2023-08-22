import * as Cesium from "cesium";
import RoadImageFlowMaterialProperty from "./RoadImageFlowMaterialProperty/index";
import ColorMaterialProperty from "./ColorMaterialProperty/index";

const addRoad = (viewer: Cesium.Viewer, url: string) => {
  const roadImageFlowMaterialProperty = new RoadImageFlowMaterialProperty({
    image: "./static/img/image.png",
    duration: 1000,
  });

  Cesium.GeoJsonDataSource.load(url, {
    clampToGround: true,
    stroke: Cesium.Color.fromCssColorString("orange"),
    strokeWidth: 2,
  }).then((dataSource) => {
    viewer.dataSources.add(dataSource);

    const entities = dataSource.entities.values;
    for (let i = 0; i < entities.length; i++) {
      let entity = entities[i];
      entity.polyline.width = new Cesium.ConstantProperty(1.7);
      // @ts-ignore;
      entity.polyline.material = roadImageFlowMaterialProperty;
    }
  });

  addPoint(viewer);
};

const addPoint = (viewer: Cesium.Viewer) => {
  viewer.entities.add(
    new Cesium.Entity({
      position: Cesium.Cartesian3.fromDegrees(
        119.05873530968688,
        36.59381910886481
      ),
      box: {
        dimensions: new Cesium.Cartesian3(10000.0, 10000.0, 10000.0),
        // @ts-ignore;
        material: new ColorMaterialProperty(
          new Cesium.Color(1.0, 0.0, 1.0, 1.0)
        ),
      },
    })
  );
};

export default addRoad;
