#!/bin/bash
# Quick demo script - generates STL files from the apple image

echo "=== JSCAD Apple Image to 3D Models ==="
echo ""
echo "Processing your red apple image into 3D models..."
echo ""

cd /workspaces/OpenJSCAD.org

# Check if CLI is available
if ! command -v jscad &> /dev/null; then
    echo "Installing JSCAD CLI..."
    npm install -g @jscad/cli
fi

echo "1. Generating Heightmap Relief (terrain-style)..."
npx jscad packages/examples/image-to-3d/heightmap-apple.js -o apple-heightmap.stl

echo "2. Generating Lithophane (backlit lamp)..."
npx jscad packages/examples/image-to-3d/lithophane-apple.js -o apple-lithophane.stl

echo "3. Generating Voxel/Pixel Art..."
npx jscad packages/examples/image-to-3d/voxel-apple.js -o apple-voxel.stl

echo "4. Generating from REAL image data..."
npx jscad packages/examples/image-to-3d/apple-processed.js -o apple-real-photo.stl

echo ""
echo "✓ Done! Generated STL files:"
ls -lh *.stl | grep apple
echo ""
echo "You can now:"
echo "  - Open these STL files in your slicer (Cura, PrusaSlicer, etc.)"
echo "  - Import them into Blender, Fusion 360, or other 3D software"
echo "  - Send them to your 3D printer!"
echo ""
echo "To customize, edit the .js files or use parameters:"
echo "  npx jscad heightmap-apple.js --maxHeight 25 --pixelSize 2 -o custom.stl"
