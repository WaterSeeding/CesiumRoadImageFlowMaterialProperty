import * as Cesium from 'cesium';

function getValueOrClonedDefault(
  property: any,
  time: any,
  valueDefault: any,
  result: any,
) {
  var value;
  if (Cesium.defined(property)) {
    value = property.getValue(time, result);
  }
  if (!Cesium.defined(value)) {
    value = valueDefault.clone(value);
  }
  return value;
}

export default getValueOrClonedDefault;
