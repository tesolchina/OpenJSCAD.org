/**
 * Twisted Column - Parametric Abstract Sculpture
 * @category Sculpture
 * @skillLevel 2
 * @description Explore rotation, scaling, and morphing through space
 * @tags sculpture, abstract, twist, deformation, parametric
 * @authors Visual Art Demo
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { extrudeFromSlices, slice } = jscad.extrusions
const { mat4 } = jscad.maths
const { star, circle, rectangle } = jscad.primitives
const { geom2 } = jscad.geometries

const getParameterDefinitions = () => [
  { name: 'height', type: 'number', initial: 100, min: 50, max: 200, step: 5, caption: 'Height (mm)' },
  { name: 'slices', type: 'number', initial: 80, min: 20, max: 150, step: 5, caption: 'Smoothness (slices)' },
  { name: 'twistDegrees', type: 'number', initial: 180, min: 0, max: 720, step: 15, caption: 'Twist (degrees)' },
  { name: 'baseShape', type: 'choice', caption: 'Base Shape', values: ['circle', 'square', 'star', 'hexagon'], initial: 'star' },
  { name: 'topScale', type: 'number', initial: 0.3, min: 0.1, max: 2, step: 0.1, caption: 'Top scale ratio' },
  { name: 'waveAmplitude', type: 'number', initial: 0, min: 0, max: 20, step: 1, caption: 'Wave amplitude' },
  { name: 'waveFrequency', type: 'number', initial: 2, min: 1, max: 8, step: 0.5, caption: 'Wave frequency' }
]

const main = (params) => {
  const { height, slices, twistDegrees, baseShape, topScale, waveAmplitude, waveFrequency } = params
  
  // Create base shape
  let base
  switch (baseShape) {
    case 'circle':
      base = circle({ radius: 20, segments: 32 })
      break
    case 'square':
      base = rectangle({ size: [35, 35] })
      break
    case 'star':
      base = star({ outerRadius: 22, innerRadius: 12, points: 5 })
      break
    case 'hexagon':
      base = circle({ radius: 20, segments: 6 })
      break
  }
  
  const baseSlice = slice.fromSides(geom2.toSides(base))
  const twistRadians = (twistDegrees * Math.PI) / 180
  
  return extrudeFromSlices({
    numberOfSlices: slices,
    callback: (progress, index, baseSlice) => {
      const t = progress // 0 to 1
      
      // Calculate transformations
      const angle = t * twistRadians
      const scale = 1 - t * (1 - topScale)
      const z = t * height
      
      // Optional wave distortion
      const waveOffset = waveAmplitude * Math.sin(t * waveFrequency * Math.PI * 2)
      
      // Build transformation matrix
      let matrix = mat4.create()
      matrix = mat4.fromTranslation(matrix, [waveOffset, 0, z])
      matrix = mat4.multiply(matrix, matrix, mat4.fromZRotation(mat4.create(), angle))
      matrix = mat4.multiply(matrix, matrix, mat4.fromScaling(mat4.create(), [scale, scale, 1]))
      
      return slice.transform(matrix, baseSlice)
    }
  }, baseSlice)
}

module.exports = { main, getParameterDefinitions }
