import * as Cesium from 'cesium';

const equals = (left: any, right: any) => {
  return left === right || (Cesium.defined(left) && left.equals(right));
};

export default equals;
