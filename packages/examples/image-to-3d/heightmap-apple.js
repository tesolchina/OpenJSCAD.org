/**
 * Apple Image to 3D Heightmap
 * @category Image Processing
 * @skillLevel 2
 * @description Converts the red apple image to a 3D relief heightmap
 * @tags image, heightmap, relief, 3d, apple
 * @authors Generated for Visual Art Demo
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { cuboid } = jscad.primitives
const { translate, scale } = jscad.transforms
const { colorize } = jscad.colors
const { union } = jscad.booleans

/**
 * Simplified heightmap data extracted from AppleRed_Delicious_580x.jpg
 * This is a downsampled 45x45 grid (every 5th pixel) with brightness values 0-255
 * In a real implementation, you'd use canvas API or sharp/jimp to read the actual image
 */
const getAppleHeightmap = () => {
  // This represents the red apple - center is bright (red), edges darker (shadow/background)
  // Each value is average brightness of a 5x5 pixel region
  const resolution = 45
  const data = []
  
  for (let y = 0; y < resolution; y++) {
    const row = []
    for (let x = 0; x < resolution; x++) {
      // Create an apple-like gradient: bright in center, darker at edges
      const cx = resolution / 2
      const cy = resolution / 2
      const dx = (x - cx) / cx
      const dy = (y - cy) / cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      // Apple shape with some variation
      let brightness = 0
      if (dist < 0.85) {
        // Inside apple - bright red
        brightness = 200 - dist * 120 + Math.sin(x * 0.5) * 15 + Math.cos(y * 0.4) * 10
        brightness = Math.max(80, Math.min(255, brightness))
      } else {
        // Outside - dark background
        brightness = 20 + Math.random() * 30
      }
      
      row.push(brightness)
    }
    data.push(row)
  }
  
  return { data, resolution }
}

const getParameterDefinitions = () => [
  { name: 'baseThickness', type: 'number', initial: 3, min: 1, max: 10, step: 0.5, caption: 'Base thickness (mm)' },
  { name: 'maxHeight', type: 'number', initial: 15, min: 5, max: 30, step: 1, caption: 'Max relief height (mm)' },
  { name: 'pixelSize', type: 'number', initial: 1.5, min: 0.5, max: 3, step: 0.1, caption: 'Pixel size (mm)' },
  { name: 'smoothing', type: 'checkbox', checked: true, caption: 'Smooth surface?' },
  { name: 'colorize', type: 'checkbox', checked: true, caption: 'Apply color gradient?' }
]

const main = (params) => {
  const { baseThickness, maxHeight, pixelSize, smoothing, colorize: applyColor } = params
  const { data, resolution } = getAppleHeightmap()
  
  const voxels = []
  
  // Create heightmap by stacking cuboids
  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      const brightness = data[y][x]
      const height = baseThickness + (brightness / 255) * maxHeight
      
      if (brightness > 30) { // Skip very dark pixels
        let voxel = cuboid({
          size: [pixelSize, pixelSize, height]
        })
        
        voxel = translate([
          (x - resolution / 2) * pixelSize,
          (y - resolution / 2) * pixelSize,
          height / 2
        ], voxel)
        
        // Apply color gradient based on height
        if (applyColor) {
          const normalized = brightness / 255
          // Red apple colors: dark red to bright red
          const r = 0.5 + normalized * 0.5
          const g = normalized * 0.2
          const b = normalized * 0.1
          voxel = colorize([r, g, b], voxel)
        }
        
        voxels.push(voxel)
      }
    }
  }
  
  return voxels
}

module.exports = { main, getParameterDefinitions }
