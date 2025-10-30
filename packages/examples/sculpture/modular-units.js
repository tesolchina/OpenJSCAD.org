/**
 * Modular Stacking Units
 * @category Sculpture
 * @skillLevel 2
 * @description Create interlocking forms for building larger assemblages
 * @tags sculpture, modular, stackable, installation, assemblage
 * @authors Visual Art Demo
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { cylinder, cuboid, sphere } = jscad.primitives
const { translate, rotate, scale } = jscad.transforms
const { subtract, union } = jscad.booleans

const getParameterDefinitions = () => [
  { name: 'unitType', type: 'choice', caption: 'Unit Type',
    values: ['wave', 'saddle', 'twist', 'sphere-joint', 'notched-block'],
    initial: 'wave',
    captions: ['Wave Tile', 'Saddle Surface', 'Twisted Block', 'Sphere Joint', 'Notched Block'] },
  { name: 'size', type: 'number', initial: 40, min: 20, max: 80, step: 5, caption: 'Base size (mm)' },
  { name: 'height', type: 'number', initial: 20, min: 10, max: 50, step: 5, caption: 'Height (mm)' },
  { name: 'tolerance', type: 'number', initial: 0.3, min: 0.1, max: 1, step: 0.1, caption: 'Joint tolerance (mm)' },
  { name: 'makeMultiple', type: 'checkbox', checked: false, caption: 'Show 3×3 array?' }
]

const createWaveTile = (size, height, tolerance) => {
  // Sine wave surface that tiles seamlessly
  const { extrudeFromSlices, slice } = jscad.extrusions
  const { mat4 } = jscad.maths
  const { rectangle } = jscad.primitives
  const { geom2 } = jscad.geometries
  
  const baseSlice = slice.fromSides(geom2.toSides(
    rectangle({ size: [size, size] })
  ))
  
  return extrudeFromSlices({
    numberOfSlices: 20,
    callback: (progress) => {
      const z = progress * height
      const amplitude = height * 0.2
      const frequency = 2 * Math.PI / size
      const xOffset = amplitude * Math.sin(frequency * z * 4)
      
      let matrix = mat4.fromTranslation(mat4.create(), [xOffset, 0, z])
      return slice.transform(matrix, baseSlice)
    }
  }, baseSlice)
}

const createSaddleSurface = (size, height) => {
  const { extrudeFromSlices, slice } = jscad.extrusions
  const { mat4 } = jscad.maths
  const { rectangle } = jscad.primitives
  const { geom2 } = jscad.geometries
  
  const baseSlice = slice.fromSides(geom2.toSides(
    rectangle({ size: [size, size] })
  ))
  
  return extrudeFromSlices({
    numberOfSlices: 20,
    callback: (progress) => {
      const t = (progress - 0.5) * 2 // -1 to 1
      const z = progress * height
      const scaleX = 1 + t * 0.3
      const scaleY = 1 - t * 0.3
      
      let matrix = mat4.fromTranslation(mat4.create(), [0, 0, z])
      matrix = mat4.multiply(matrix, matrix, mat4.fromScaling(mat4.create(), [scaleX, scaleY, 1]))
      return slice.transform(matrix, baseSlice)
    }
  }, baseSlice)
}

const createTwistedBlock = (size, height) => {
  const { extrudeLinear } = jscad.extrusions
  const { rectangle } = jscad.primitives
  
  return extrudeLinear(
    { height, twistAngle: Math.PI / 4, twistSteps: 20 },
    rectangle({ size: [size, size] })
  )
}

const createSphereJoint = (size, tolerance) => {
  const radius = size / 2
  const socketDepth = radius * 0.6
  const ballRadius = radius * 0.5 - tolerance
  
  // Base block with socket on top
  const base = cuboid({ size: [size, size, size / 2] })
  const socket = translate([0, 0, size / 4 + socketDepth / 2], 
    sphere({ radius: socketDepth, segments: 32 })
  )
  const baseWithSocket = subtract(base, socket)
  
  // Ball joint on bottom
  const ball = translate([0, 0, -size / 4 - ballRadius / 2], 
    sphere({ radius: ballRadius, segments: 32 })
  )
  
  return union(baseWithSocket, ball)
}

const createNotchedBlock = (size, height, tolerance) => {
  const notchSize = size / 4
  
  const base = cuboid({ size: [size, size, height] })
  
  // Notches on sides (male/female alternating)
  const notchDepth = notchSize / 2 + tolerance / 2
  
  const notchLeft = translate([-size / 2 + notchDepth / 2, 0, 0],
    cuboid({ size: [notchDepth, notchSize, height] })
  )
  const notchRight = translate([size / 2 - notchDepth / 2, 0, 0],
    cuboid({ size: [notchDepth, notchSize, height] })
  )
  
  return subtract(base, notchLeft, notchRight)
}

const main = (params) => {
  const { unitType, size, height, tolerance, makeMultiple } = params
  
  let unit
  switch (unitType) {
    case 'wave':
      unit = createWaveTile(size, height, tolerance)
      break
    case 'saddle':
      unit = createSaddleSurface(size, height)
      break
    case 'twist':
      unit = createTwistedBlock(size, height)
      break
    case 'sphere-joint':
      unit = createSphereJoint(size, tolerance)
      break
    case 'notched-block':
      unit = createNotchedBlock(size, height, tolerance)
      break
  }
  
  if (!makeMultiple) {
    return unit
  }
  
  // Create 3×3 array
  const units = []
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      units.push(translate([x * (size + 2), y * (size + 2), 0], unit))
    }
  }
  
  return units
}

module.exports = { main, getParameterDefinitions }
