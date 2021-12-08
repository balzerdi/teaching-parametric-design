const jscad = require('@jscad/modeling')
const {line, arc, circle, ellipse, rectangle, cube, sphere, cylinder, cuboid, roundedCuboid, geodesicSphere, ellipsoid, roundedCylinder, cylinderElliptic, torus} = jscad.primitives;
const {extrudeRectangular, extrudeLinear, extrudeRotate} = jscad.extrusions;
const {colorize, colorNameToRgb} = jscad.colors;
const {union, subtract, intersect, scission} = jscad.booleans;
const {translate, rotate, scale, center, align} = jscad.transforms;

const main = () => {
  let circle = ellipse({radius: [10, 10], segments: 64+64})
  circle = extrudeLinear({height: 2}, circle)

  const cube = cuboid({size: [10, 10, 10]})

  const earthSign = subtract(circle, cube)

  return earthSign
};

module.exports = { main };