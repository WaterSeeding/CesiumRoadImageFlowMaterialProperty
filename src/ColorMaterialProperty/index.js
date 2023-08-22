import * as Cesium from "cesium";

function ColorMaterialProperty(color) {
  this._definitionChanged = new Cesium.Event();
  this._color = undefined;
  this._colorSubscription = undefined;

  this.color = color;
}

Object.defineProperties(ColorMaterialProperty.prototype, {
  isConstant: {
    get: function () {
      return Cesium.Property.isConstant(this._color);
    },
  },

  definitionChanged: {
    get: function () {
      return this._definitionChanged;
    },
  },

  color: Cesium.createPropertyDescriptor("color"),
});

ColorMaterialProperty.prototype.getType = function (time) {
  return "Color";
};

ColorMaterialProperty.prototype.getValue = function (time, result) {
  if (!Cesium.defined(result)) {
    result = {};
  }
  result.color = Cesium.Property.getValueOrClonedDefault(
    this._color,
    time,
    Cesium.Color.WHITE,
    result.color
  );
  return result;
};

ColorMaterialProperty.prototype.equals = function (other) {
  return (
    this === other ||
    (other instanceof ColorMaterialProperty &&
      Cesium.Property.equals(this._color, other._color))
  );
};

Cesium.Material._materialCache.addMaterial("Color", {
  fabric: {
    type: "Color",
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
    },
    // components: {
    //   diffuse: "color.rgb",
    //   alpha: "color.a",
    // },
    source: `
      czm_material czm_getMaterial(czm_materialInput materialInput) {
        czm_material material = czm_getDefaultMaterial(materialInput);
        material.alpha = color.a;
        material.diffuse = color.rgb * 1.5;
        return material;
      }
    `,
  },
  translucent: function (material) {
    return material.uniforms.color.alpha < 1.0;
  },
});

export default ColorMaterialProperty;
