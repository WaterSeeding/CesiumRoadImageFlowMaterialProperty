import * as Cesium from 'cesium';
import RoadImageFlowMaterialGLSL from './glsl/shader';
import createPropertyDescriptor from './utils/createPropertyDescriptor';

let RoadImageFlowMaterialSource = RoadImageFlowMaterialGLSL

class RoadImageFlowMaterialProperty {
  _definitionChanged: Cesium.Event;
  _time: DOMHighResTimeStamp;
  image: string;
  duration: number;
  constructor(options: { image: string; duration: number }) {
    Object.defineProperties(this, {
      isConstant: {
        get: function () {
          return false;
        },
      },
      definitionChanged: {
        get: function () {
          return this._definitionChanged;
        },
      },
      duration: createPropertyDescriptor('duration'),
    });
    this._definitionChanged = new Cesium.Event();
    this._time = performance.now();
    this.image = options.image;
    this.duration = options.duration;
  }

  getType() {
    return 'RoadImageFlowMaterialProperty';
  }

  getValue(time: Cesium.JulianDate, result: any) {
    if (!Cesium.defined(result)) {
      result = {};
    }
    result.image = this.image;
    result.time =
      ((performance.now() - this._time) % this.duration) / this.duration;
    return result;
  }

  equals(other: RoadImageFlowMaterialProperty) {
    return (
      this === other ||
      (other instanceof RoadImageFlowMaterialProperty &&
        this.duration === other.duration)
    );
  }
}

// @ts-ignore;
Cesium.Material._materialCache.addMaterial('RoadImageFlowMaterialProperty', {
  fabric: {
    type: 'RoadImageFlowMaterialProperty',
    uniforms: {
      image: '',
      time: 0,
    },
    source: RoadImageFlowMaterialSource,
  },
  translucent: function () {
    return true;
  },
});

export default RoadImageFlowMaterialProperty;
