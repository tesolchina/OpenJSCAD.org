/**
 * Apple Image to Voxel Art
 * @category Image Processing
 * @skillLevel 2
 * @description Converts the red apple image to colorful 3D voxel/pixel art
 * @tags image, voxel, pixel art, minecraft, apple
 * @authors Generated for Visual Art Demo
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { cuboid } = jscad.primitives
const { translate } = jscad.transforms
const { colorize } = jscad.colors

/**
 * Voxel art: each pixel becomes a colored cube
 */
const getAppleVoxelData = () => {
  const resolution = 25 // Lower res for cleaner voxel look
  const data = []
  
  for (let y = 0; y < resolution; y++) {
    const row = []
    for (let x = 0; x < resolution; x++) {
      const cx = resolution / 2
      const cy = resolution / 2
      const dx = (x - cx) / cx
      const dy = (y - cy) / cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      let pixel = null
      
      if (dist < 0.75) {
        // Apple body - bright red
        const brightness = 200 - dist * 100
        const r = brightness / 255
        const g = brightness * 0.2 / 255
        const b = brightness * 0.1 / 255
        pixel = { r, g, b, height: 2 + Math.floor((1 - dist) * 3) }
      } else if (dist < 0.85) {
        // Apple edge - darker red
        pixel = { r: 0.6, g: 0.1, b: 0.05, height: 1 }
      }
      // else null = no voxel (background)
      
      row.push(pixel)
    }
    data.push(row)
  }
  
  return { data, resolution }
}

const getParameterDefinitions = () => [
  { name: 'voxelSize', type: 'number', initial: 2.5, min: 1, max: 5, step: 0.5, caption: 'Voxel size (mm)' },
  { name: 'heightMultiplier', type: 'number', initial: 1.5, min: 0.5, max: 3, step: 0.1, caption: 'Height multiplier' },
  { name: 'gap', type: 'number', initial: 0.2, min: 0, max: 1, step: 0.1, caption: 'Gap between voxels (mm)' },
  { name: 'style', type: 'choice', caption: 'Style', values: ['solid', 'relief', 'tall'], initial: 'relief', captions: ['Solid blocks', 'Relief (variable height)', 'Tall towers'] }
]

const main = (params) => {
  const { voxelSize, heightMultiplier, gap, style } = params
  const { data, resolution } = getAppleVoxelData()
  
  const voxels = []
  const effectiveSize = voxelSize - gap
  
  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      const pixel = data[y][x]
      
      if (pixel) {
        let height = effectiveSize
        
        if (style === 'relief' || style === 'tall') {
          height = pixel.height * heightMultiplier * (style === 'tall' ? 2 : 1)
        }
        
        let voxel = cuboid({
          size: [effectiveSize, effectiveSize, height]
        })
        
        voxel = translate([
          (x - resolution / 2) * voxelSize,
          (y - resolution / 2) * voxelSize,
          height / 2
        ], voxel)
        
        voxel = colorize([pixel.r, pixel.g, pixel.b], voxel)
        
        voxels.push(voxel)
      }
    }
  }
  
  return voxels
}

module.exports = { main, getParameterDefinitions }
