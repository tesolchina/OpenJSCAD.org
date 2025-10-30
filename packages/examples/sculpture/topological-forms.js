/**
 * Möbius Strip and Topological Forms
 * @category Sculpture
 * @skillLevel 3
 * @description Explore non-orientable surfaces and mathematical topology
 * @tags sculpture, topology, mobius, klein, mathematical, surface
 * @authors Visual Art Demo
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { extrudeFromSlices, slice } = jscad.extrusions
const { mat4 } = jscad.maths
const { rectangle } = jscad.primitives
const { geom2 } = jscad.geometries

const getParameterDefinitions = () => [
  { name: 'surfaceType', type: 'choice', caption: 'Surface Type', 
    values: ['mobius', 'double-mobius', 'trefoil', 'figure8'], 
    initial: 'mobius',
    captions: ['Möbius Strip', 'Double Möbius', 'Trefoil Knot', 'Figure-8 Knot'] },
  { name: 'radius', type: 'number', initial: 40, min: 20, max: 80, step: 5, caption: 'Main radius (mm)' },
  { name: 'width', type: 'number', initial: 15, min: 5, max: 30, step: 1, caption: 'Strip width (mm)' },
  { name: 'thickness', type: 'number', initial: 2, min: 1, max: 5, step: 0.5, caption: 'Strip thickness (mm)' },
  { name: 'segments', type: 'number', initial: 120, min: 40, max: 200, step: 10, caption: 'Smoothness (segments)' },
  { name: 'twists', type: 'number', initial: 1, min: 1, max: 5, step: 1, caption: 'Number of twists (Möbius only)' }
]

const main = (params) => {
  const { surfaceType, radius, width, thickness, segments, twists } = params
  
  const baseSlice = slice.fromSides(geom2.toSides(
    rectangle({ size: [width, thickness] })
  ))
  
  return extrudeFromSlices({
    numberOfSlices: segments + 1,
    callback: (progress, index, base) => {
      const t = progress * 2 * Math.PI // 0 to 2π
      let x, y, z, normalRotation, tiltAngle
      
      switch (surfaceType) {
        case 'mobius':
          // Classic Möbius strip: one loop with half-twist(s)
          x = (radius + (width / 4) * Math.cos(twists * t / 2)) * Math.cos(t)
          y = (radius + (width / 4) * Math.cos(twists * t / 2)) * Math.sin(t)
          z = (width / 4) * Math.sin(twists * t / 2)
          normalRotation = t
          tiltAngle = twists * t / 2
          break
          
        case 'double-mobius':
          // Two twists
          x = (radius + (width / 4) * Math.cos(t)) * Math.cos(t)
          y = (radius + (width / 4) * Math.cos(t)) * Math.sin(t)
          z = (width / 4) * Math.sin(2 * t)
          normalRotation = t
          tiltAngle = t
          break
          
        case 'trefoil':
          // Trefoil knot (p=2, q=3)
          x = Math.sin(t) + 2 * Math.sin(2 * t)
          y = Math.cos(t) - 2 * Math.cos(2 * t)
          z = -Math.sin(3 * t)
          x *= radius / 3
          y *= radius / 3
          z *= radius / 3
          normalRotation = t * 3
          tiltAngle = 0
          break
          
        case 'figure8':
          // Figure-8 knot (4_1 knot)
          x = (2 + Math.cos(2 * t)) * Math.cos(3 * t)
          y = (2 + Math.cos(2 * t)) * Math.sin(3 * t)
          z = Math.sin(4 * t)
          x *= radius / 3
          y *= radius / 3
          z *= radius / 3
          normalRotation = t * 2
          tiltAngle = t
          break
      }
      
      // Build transformation matrix
      let matrix = mat4.create()
      matrix = mat4.fromTranslation(matrix, [x, y, z])
      matrix = mat4.multiply(matrix, matrix, mat4.fromZRotation(mat4.create(), normalRotation))
      matrix = mat4.multiply(matrix, matrix, mat4.fromXRotation(mat4.create(), tiltAngle))
      
      return slice.transform(matrix, base)
    }
  }, baseSlice)
}

module.exports = { main, getParameterDefinitions }
