/**
 * Organic Blob - Noise-Based Sculpture
 * @category Sculpture
 * @skillLevel 2
 * @description Create organic, unpredictable forms using mathematical noise
 * @tags sculpture, abstract, organic, noise, generative
 * @authors Visual Art Demo
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { sphere } = jscad.primitives
const { translate, scale } = jscad.transforms
const { union } = jscad.booleans

// Simple noise function (Perlin-like approximation)
const noise3D = (x, y, z, seed) => {
  const n = Math.sin(x * 12.9898 + y * 78.233 + z * 45.164 + seed) * 43758.5453
  return (n - Math.floor(n)) * 2 - 1 // -1 to 1
}

const getParameterDefinitions = () => [
  { name: 'baseSize', type: 'number', initial: 40, min: 20, max: 80, step: 5, caption: 'Base size (mm)' },
  { name: 'blobCount', type: 'number', initial: 120, min: 40, max: 300, step: 10, caption: 'Detail (blob count)' },
  { name: 'noiseScale', type: 'number', initial: 0.15, min: 0.05, max: 0.4, step: 0.05, caption: 'Noise scale' },
  { name: 'bumpiness', type: 'number', initial: 0.6, min: 0.2, max: 1.5, step: 0.1, caption: 'Bumpiness' },
  { name: 'seed', type: 'number', initial: 42, min: 1, max: 999, step: 1, caption: 'Random seed (for variations)' },
  { name: 'elongation', type: 'choice', caption: 'Elongation', values: ['sphere', 'vertical', 'horizontal'], initial: 'sphere' }
]

const main = (params) => {
  const { baseSize, blobCount, noiseScale, bumpiness, seed, elongation } = params
  
  const blobs = []
  const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle
  
  for (let i = 0; i < blobCount; i++) {
    // Fibonacci sphere distribution
    const y = 1 - (i / (blobCount - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = phi * i
    
    let x = Math.cos(theta) * radius
    let z = Math.sin(theta) * radius
    
    // Apply elongation
    let scaleX = 1, scaleY = 1, scaleZ = 1
    if (elongation === 'vertical') {
      scaleY = 1.8
    } else if (elongation === 'horizontal') {
      scaleX = 1.5
      scaleZ = 1.5
    }
    
    // Add noise displacement
    const noiseX = noise3D(x * noiseScale, y * noiseScale, z * noiseScale, seed)
    const noiseY = noise3D(x * noiseScale + 100, y * noiseScale, z * noiseScale, seed + 1)
    const noiseZ = noise3D(x * noiseScale, y * noiseScale + 100, z * noiseScale, seed + 2)
    
    x += noiseX * bumpiness
    y += noiseY * bumpiness
    z += noiseZ * bumpiness
    
    // Scale to base size and apply elongation
    x *= baseSize * scaleX
    y *= baseSize * scaleY
    z *= baseSize * scaleZ
    
    // Blob size varies with noise
    const noiseMagnitude = Math.abs(noiseX + noiseY + noiseZ) / 3
    const blobSize = (2 + noiseMagnitude * 3) * (baseSize / 40)
    
    const blob = sphere({ radius: blobSize, segments: 8 })
    blobs.push(translate([x, y, z], blob))
  }
  
  return union(blobs)
}

module.exports = { main, getParameterDefinitions }
