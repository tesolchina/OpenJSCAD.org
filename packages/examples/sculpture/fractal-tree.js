/**
 * Recursive Fractal Tree
 * @category Sculpture
 * @skillLevel 3
 * @description Branching fractal structure - explore iteration and self-similarity
 * @tags sculpture, fractal, recursive, tree, branching
 * @authors Visual Art Demo
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { cylinder, sphere } = jscad.primitives
const { translate, rotate } = jscad.transforms
const { union } = jscad.booleans

const getParameterDefinitions = () => [
  { name: 'depth', type: 'number', initial: 5, min: 2, max: 7, step: 1, caption: 'Recursion depth (⚠️ slow >6)' },
  { name: 'trunkHeight', type: 'number', initial: 30, min: 15, max: 50, step: 5, caption: 'Initial trunk height' },
  { name: 'trunkRadius', type: 'number', initial: 4, min: 2, max: 8, step: 0.5, caption: 'Initial trunk radius' },
  { name: 'branchAngle', type: 'number', initial: 30, min: 15, max: 60, step: 5, caption: 'Branch angle (deg)' },
  { name: 'branches', type: 'number', initial: 3, min: 2, max: 5, step: 1, caption: 'Branches per node' },
  { name: 'lengthRatio', type: 'number', initial: 0.7, min: 0.5, max: 0.9, step: 0.05, caption: 'Child length ratio' },
  { name: 'radiusRatio', type: 'number', initial: 0.65, min: 0.4, max: 0.85, step: 0.05, caption: 'Child radius ratio' },
  { name: 'addSpheres', type: 'checkbox', checked: false, caption: 'Add spheres at tips?' }
]

const createBranch = (height, radius, depth, params) => {
  if (depth === 0) {
    // Leaf node - optionally add sphere
    if (params.addSpheres) {
      return sphere({ radius: radius * 2, segments: 12 })
    }
    return []
  }
  
  const parts = []
  
  // Current branch segment
  const segment = cylinder({
    height: height,
    radius: radius,
    segments: 16
  })
  parts.push(translate([0, 0, height / 2], segment))
  
  // Create child branches
  const angleRad = (params.branchAngle * Math.PI) / 180
  const childHeight = height * params.lengthRatio
  const childRadius = radius * params.radiusRatio
  
  for (let i = 0; i < params.branches; i++) {
    const rotationAngle = (i * 2 * Math.PI) / params.branches
    
    let childBranch = createBranch(childHeight, childRadius, depth - 1, params)
    
    if (Array.isArray(childBranch) && childBranch.length > 0) {
      childBranch = union(childBranch)
    }
    
    if (childBranch && childBranch.polygons) { // Check it's a valid geometry
      // Tilt outward
      childBranch = rotate([angleRad, 0, 0], childBranch)
      // Rotate around trunk
      childBranch = rotate([0, 0, rotationAngle], childBranch)
      // Move to top of current segment
      childBranch = translate([0, 0, height], childBranch)
      
      parts.push(childBranch)
    }
  }
  
  return parts
}

const main = (params) => {
  const { depth, trunkHeight, trunkRadius } = params
  
  const tree = createBranch(trunkHeight, trunkRadius, depth, params)
  
  if (tree.length === 0) return sphere({ radius: 1 }) // Fallback
  
  return union(tree)
}

module.exports = { main, getParameterDefinitions }
