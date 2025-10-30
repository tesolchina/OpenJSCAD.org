/**
 * Apple Image to Lithophane
 * @category Image Processing
 * @skillLevel 2
 * @description Converts the red apple image to a backlit lithophane
 * @tags image, lithophane, backlit, lamp, apple
 * @authors Generated for Visual Art Demo
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { cuboid } = jscad.primitives
const { translate } = jscad.transforms
const { union } = jscad.booleans

/**
 * For lithophanes: darker pixels = thicker walls (blocks more light)
 * lighter pixels = thinner walls (lets more light through)
 */
const getAppleLithophaneData = () => {
  const resolution = 45
  const data = []
  
  for (let y = 0; y < resolution; y++) {
    const row = []
    for (let x = 0; x < resolution; x++) {
      const cx = resolution / 2
      const cy = resolution / 2
      const dx = (x - cx) / cx
      const dy = (y - cy) / cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      // Inverted for lithophane: bright areas should be thin
      let brightness = 0
      if (dist < 0.85) {
        brightness = 200 - dist * 120 + Math.sin(x * 0.5) * 15 + Math.cos(y * 0.4) * 10
        brightness = Math.max(80, Math.min(255, brightness))
      } else {
        brightness = 20 + Math.random() * 30
      }
      
      row.push(brightness)
    }
    data.push(row)
  }
  
  return { data, resolution }
}

const getParameterDefinitions = () => [
  { name: 'minThickness', type: 'number', initial: 0.8, min: 0.4, max: 2, step: 0.1, caption: 'Min wall (mm) - brightest' },
  { name: 'maxThickness', type: 'number', initial: 3.5, min: 2, max: 6, step: 0.1, caption: 'Max wall (mm) - darkest' },
  { name: 'pixelSize', type: 'number', initial: 1.5, min: 0.5, max: 3, step: 0.1, caption: 'Pixel size (mm)' },
  { name: 'frameWidth', type: 'number', initial: 5, min: 0, max: 15, step: 1, caption: 'Frame border (mm)' },
  { name: 'frameThickness', type: 'number', initial: 2, min: 1, max: 5, step: 0.5, caption: 'Frame thickness (mm)' }
]

const main = (params) => {
  const { minThickness, maxThickness, pixelSize, frameWidth, frameThickness } = params
  const { data, resolution } = getAppleLithophaneData()
  
  const voxels = []
  
  // Create lithophane pixels
  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      const brightness = data[y][x]
      
      if (brightness > 30) {
        // Invert brightness for lithophane: bright pixels = thin, dark = thick
        const thickness = maxThickness - ((brightness / 255) * (maxThickness - minThickness))
        
        const voxel = cuboid({
          size: [pixelSize, pixelSize, thickness]
        })
        
        voxels.push(translate([
          (x - resolution / 2) * pixelSize,
          (y - resolution / 2) * pixelSize,
          thickness / 2
        ], voxel))
      }
    }
  }
  
  // Add frame if requested
  if (frameWidth > 0) {
    const totalSize = resolution * pixelSize
    const frameSize = totalSize + frameWidth * 2
    
    // Bottom frame
    voxels.push(cuboid({
      size: [frameSize, frameWidth, frameThickness],
      center: [0, -(totalSize / 2 + frameWidth / 2), frameThickness / 2]
    }))
    
    // Top frame
    voxels.push(cuboid({
      size: [frameSize, frameWidth, frameThickness],
      center: [0, (totalSize / 2 + frameWidth / 2), frameThickness / 2]
    }))
    
    // Left frame
    voxels.push(cuboid({
      size: [frameWidth, totalSize, frameThickness],
      center: [-(totalSize / 2 + frameWidth / 2), 0, frameThickness / 2]
    }))
    
    // Right frame
    voxels.push(cuboid({
      size: [frameWidth, totalSize, frameThickness],
      center: [(totalSize / 2 + frameWidth / 2), 0, frameThickness / 2]
    }))
  }
  
  return voxels
}

module.exports = { main, getParameterDefinitions }
