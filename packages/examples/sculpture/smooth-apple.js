/**
 * Beautiful Apple Sculpture
 * @category Sculpture
 * @skillLevel 2
 * @description Organic, smooth apple form with stem - looks like a real apple
 * @tags apple, fruit, organic, smooth, sculpture
 * @authors Visual Art Demo
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { sphere, cylinder } = jscad.primitives
const { translate, scale, rotate } = jscad.transforms
const { union, subtract } = jscad.booleans
const { colorize } = jscad.colors

const getParameterDefinitions = () => [
  { name: 'size', type: 'number', initial: 40, min: 20, max: 80, step: 5, caption: 'Apple size (mm)' },
  { name: 'stemLength', type: 'number', initial: 8, min: 3, max: 15, step: 1, caption: 'Stem length (mm)' },
  { name: 'appleColor', type: 'choice', caption: 'Apple Color', 
    values: ['red', 'green', 'yellow', 'custom'],
    initial: 'red' },
  { name: 'topIndent', type: 'number', initial: 0.6, min: 0.2, max: 1, step: 0.1, caption: 'Top indent depth' },
  { name: 'bottomIndent', type: 'number', initial: 0.4, min: 0.1, max: 0.8, step: 0.1, caption: 'Bottom indent depth' },
  { name: 'segments', type: 'number', initial: 64, min: 32, max: 128, step: 16, caption: 'Smoothness' }
]

const main = (params) => {
  const { size, stemLength, appleColor, topIndent, bottomIndent, segments } = params
  
  // Main apple body - slightly squashed sphere
  let appleBody = sphere({ radius: size, segments })
  appleBody = scale([1, 1, 0.88], appleBody) // Squash vertically to make it apple-shaped
  
  // Top indent (where stem goes)
  const topIndentSphere = sphere({ radius: size * topIndent, segments: segments / 2 })
  const topIndentCut = translate([0, 0, size * 0.75], topIndentSphere)
  
  // Bottom indent (blossom end)
  const bottomIndentSphere = sphere({ radius: size * bottomIndent, segments: segments / 2 })
  const bottomIndentCut = translate([0, 0, -size * 0.82], bottomIndentSphere)
  
  // Create apple with indents
  appleBody = subtract(appleBody, topIndentCut, bottomIndentCut)
  
  // Stem
  const stem = cylinder({
    radius: size * 0.08,
    height: stemLength,
    segments: 16
  })
  const stemRotated = rotate([0.15, 0.1, 0], stem) // Slight tilt
  const stemPositioned = translate([0, 0, size * 0.75], stemRotated)
  
  // Leaf (optional small detail)
  const leaf = scale([3, 1, 0.3], sphere({ radius: size * 0.12, segments: 16 }))
  const leafRotated = rotate([0.3, 0, 0.5], leaf)
  const leafPositioned = translate([size * 0.15, 0, size * 0.8], leafRotated)
  
  // Combine
  const apple = union(appleBody, stemPositioned, leafPositioned)
  
  // Apply color
  let color
  switch (appleColor) {
    case 'red':
      color = [0.85, 0.15, 0.1]
      break
    case 'green':
      color = [0.4, 0.75, 0.2]
      break
    case 'yellow':
      color = [0.95, 0.85, 0.2]
      break
    case 'custom':
      color = [0.9, 0.3, 0.2] // Red-orange
      break
  }
  
  const stemColor = [0.4, 0.3, 0.2] // Brown
  const leafColor = [0.3, 0.6, 0.2] // Green
  
  return [
    colorize(color, appleBody),
    colorize(stemColor, stemPositioned),
    colorize(leafColor, leafPositioned)
  ]
}

module.exports = { main, getParameterDefinitions }
