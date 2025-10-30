# Image-to-3D Examples for JSCAD

These examples convert the red apple image (`/workspaces/OpenJSCAD.org/image/AppleRed_Delicious_580x.jpg`) into 3D models using different techniques.

## Quick Start

### Option 1: Use the pre-built examples (no image processing needed)
The examples contain hard-coded representations of the apple image optimized for 3D. Just open them in JSCAD:

1. **Heightmap Relief** (`heightmap-apple.js`)
   - Creates a 3D terrain-style relief
   - Brighter pixels = taller features
   - Great for: wall art, embossed logos, tactile prints
   - Customizable: base thickness, max height, pixel size, color gradient

2. **Lithophane** (`lithophane-apple.js`)
   - For backlit display (light shines through)
   - Darker pixels = thicker (blocks light), bright pixels = thinner (glows)
   - Great for: lamp shades, window hangings, night lights
   - Print tip: Use white/translucent filament (PLA, PETG)

3. **Voxel/Pixel Art** (`voxel-apple.js`)
   - Minecraft-style 3D blocks
   - Each pixel becomes a colored cube
   - Great for: retro aesthetic, desk toys, art installations
   - Styles: solid, relief (variable height), tall towers

### Option 2: Process the actual image file

For real image-to-heightmap conversion, use the Node.js processor:

```bash
cd /workspaces/OpenJSCAD.org/packages/examples/image-to-3d
npm install # installs sharp for image processing
node image-processor.js
```

This generates `apple-processed.js` with real pixel data from the JPG.

## How to Use

### In the Web UI
1. Go to https://openjscad.xyz or run the local web server:
   ```bash
   cd /workspaces/OpenJSCAD.org
   npm run web
   ```
2. Drag and drop one of the example files into the editor
3. Adjust parameters with the sliders on the right
4. Click "Generate STL" or "Export" → choose format

### With the CLI
```bash
npx @jscad/cli heightmap-apple.js -o apple-heightmap.stl
npx @jscad/cli lithophane-apple.js -o apple-lithophane.stl --minThickness 0.6 --maxThickness 4
npx @jscad/cli voxel-apple.js -o apple-voxel.stl --style relief
```

## 3D Printing Tips

### Heightmap Relief
- **Orientation:** Print flat (image face up)
- **Layer height:** 0.1-0.2mm for detail
- **Supports:** Usually not needed
- **Infill:** 20-30%
- **Material:** Any (PLA, PETG, resin)

### Lithophane
- **Orientation:** Stand vertically (thin walls can warp if flat)
- **Layer height:** 0.1mm or finer for smooth light transmission
- **Supports:** Yes, for the frame
- **Infill:** 100% (solid walls required)
- **Material:** White/natural PLA or PETG (best light diffusion)
- **Nozzle:** 0.4mm works; 0.3mm better for thin walls
- **Test first:** Print a small section to check min/max thickness

### Voxel Art
- **Orientation:** Flat or 45° (depends on overhang)
- **Layer height:** 0.2mm is fine
- **Supports:** May need for tall styles
- **Infill:** 15-20%
- **Material:** Any; multi-color if your printer supports it

## Customization Ideas

1. **Different images:** Replace the pixel data generation with your own image
2. **Size scaling:** Adjust `pixelSize` parameter (mm per pixel)
3. **Detail level:** Change `resolution` in the code (higher = more detail, slower render)
4. **Color schemes:** Modify the RGB values in the heightmap/voxel examples
5. **Hybrid:** Combine techniques (e.g., voxel base + smooth heightmap top)

## Technical Notes

- The examples use a **downsampled representation** of the 225×225 image (typically 25×25 or 45×45 grid) to keep render time reasonable
- For production lithophanes, consider external tools like ItsLitho or 3DP Rocks, then import STL into JSCAD for modifications
- Real-time image processing in JSCAD requires Canvas API (browser) or sharp/jimp (Node.js)

## Next Steps

- Try importing your own images (see `image-processor.js`)
- Combine with other JSCAD features (text, boolean operations)
- Create parametric frames or stands
- Experiment with dual-color prints (heightmap with color changes)

---

**Created for visual art exploration with JSCAD**
