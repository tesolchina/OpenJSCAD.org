#!/usr/bin/env node
/**
 * Image to JSCAD 3D Model Processor
 * Reads the apple JPG and generates JSCAD code with real pixel data
 */

const fs = require('fs')
const path = require('path')

// Try to use sharp if available, otherwise use a simpler approach
let sharp
try {
  sharp = require('sharp')
} catch (err) {
  console.log('Sharp not installed. Install with: npm install')
  console.log('Falling back to mock data...')
}

const IMAGE_PATH = path.join(__dirname, '../../../image/AppleRed_Delicious_580x.jpg')
const OUTPUT_PATH = path.join(__dirname, 'apple-processed.js')

async function processImage() {
  console.log('Processing image:', IMAGE_PATH)
  
  if (!sharp) {
    generateMockData()
    return
  }

  try {
    // Resize to manageable resolution and get pixel data
    const resolution = 45
    const { data, info } = await sharp(IMAGE_PATH)
      .resize(resolution, resolution, { fit: 'fill' })
      .raw()
      .toBuffer({ resolveWithObject: true })
    
    console.log(`Processed ${info.width}x${info.height} image`)
    
    // Convert to brightness values
    const heightmap = []
    for (let y = 0; y < info.height; y++) {
      const row = []
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * info.channels
        const r = data[idx]
        const g = data[idx + 1]
        const b = data[idx + 2]
        // Calculate brightness (perceived luminance)
        const brightness = Math.round(0.299 * r + 0.587 * g + 0.114 * b)
        row.push(brightness)
      }
      heightmap.push(row)
    }
    
    generateJSCADCode(heightmap, resolution)
    console.log('✓ Generated:', OUTPUT_PATH)
    console.log('You can now open this file in JSCAD!')
    
  } catch (err) {
    console.error('Error processing image:', err.message)
    console.log('Generating mock data instead...')
    generateMockData()
  }
}

function generateJSCADCode(heightmap, resolution) {
  const code = `/**
 * Apple Image - Real Photo Data
 * Auto-generated from AppleRed_Delicious_580x.jpg
 */

const jscad = require('@jscad/modeling')
const { cuboid } = jscad.primitives
const { translate } = jscad.transforms
const { colorize } = jscad.colors

// Real pixel brightness data from the apple image
const heightmapData = ${JSON.stringify(heightmap, null, 2)}

const getParameterDefinitions = () => [
  { name: 'baseThickness', type: 'number', initial: 3, min: 1, max: 10, step: 0.5, caption: 'Base thickness (mm)' },
  { name: 'maxHeight', type: 'number', initial: 15, min: 5, max: 30, step: 1, caption: 'Max relief height (mm)' },
  { name: 'pixelSize', type: 'number', initial: 1.5, min: 0.5, max: 3, step: 0.1, caption: 'Pixel size (mm)' },
  { name: 'threshold', type: 'number', initial: 30, min: 0, max: 100, step: 5, caption: 'Min brightness (skip dark)' },
  { name: 'applyColor', type: 'checkbox', checked: true, caption: 'Red apple gradient?' }
]

const main = (params) => {
  const { baseThickness, maxHeight, pixelSize, threshold, applyColor } = params
  const resolution = heightmapData.length
  const voxels = []
  
  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      const brightness = heightmapData[y][x]
      
      if (brightness > threshold) {
        const height = baseThickness + (brightness / 255) * maxHeight
        
        let voxel = cuboid({
          size: [pixelSize, pixelSize, height]
        })
        
        voxel = translate([
          (x - resolution / 2) * pixelSize,
          (y - resolution / 2) * pixelSize,
          height / 2
        ], voxel)
        
        if (applyColor) {
          const normalized = brightness / 255
          // Red apple colors
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
`
  
  fs.writeFileSync(OUTPUT_PATH, code)
}

function generateMockData() {
  console.log('Generating mock apple data (install sharp for real image processing)')
  const resolution = 45
  const heightmap = []
  
  for (let y = 0; y < resolution; y++) {
    const row = []
    for (let x = 0; x < resolution; x++) {
      const cx = resolution / 2
      const cy = resolution / 2
      const dx = (x - cx) / cx
      const dy = (y - cy) / cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      let brightness = 0
      if (dist < 0.85) {
        brightness = 200 - dist * 120 + Math.sin(x * 0.5) * 15 + Math.cos(y * 0.4) * 10
        brightness = Math.max(80, Math.min(255, Math.round(brightness)))
      } else {
        brightness = Math.round(20 + Math.random() * 30)
      }
      
      row.push(brightness)
    }
    heightmap.push(row)
  }
  
  generateJSCADCode(heightmap, resolution)
  console.log('✓ Generated mock data:', OUTPUT_PATH)
}

// Run if called directly
if (require.main === module) {
  processImage().catch(console.error)
}

module.exports = { processImage }
