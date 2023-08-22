import * as Cesium from 'cesium';

const getValueOrDefault = (
  property: Cesium.Property | any,
  time: Cesium.JulianDate,
  valueDefault: any,
  result: any,
) => {
  return Cesium.defined(property)
    ? Cesium.defaultValue(property.getValue(time, result), valueDefault)
    : valueDefault;
};

export default getValueOrDefault;
