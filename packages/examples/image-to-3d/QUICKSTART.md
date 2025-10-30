# Your Apple Image → 3D Models ✨

## What I Created for You

I've converted your red apple image (`/workspaces/OpenJSCAD.org/image/AppleRed_Delicious_580x.jpg`) into **4 different 3D models**:

### 📁 Files Created

```
packages/examples/image-to-3d/
├── heightmap-apple.js       → 3D terrain relief
├── lithophane-apple.js      → Backlit lamp/art
├── voxel-apple.js          → Minecraft-style blocks
├── apple-processed.js      → Real photo data (auto-generated)
├── image-processor.js      → Image converter tool
├── generate-all.sh         → One-click STL generator
├── README.md               → Full documentation
└── package.json
```

## 🚀 Quick Start (3 Ways)

### Method 1: Online Editor (Easiest - No Install)
1. Go to https://openjscad.xyz
2. Click "Load JSCAD Project"
3. Select one of the files above
4. Adjust sliders in the right panel
5. Click "Export" → "STL"
6. 🎉 Ready to 3D print!

### Method 2: Generate STL Files Now
```bash
cd /workspaces/OpenJSCAD.org/packages/examples/image-to-3d
./generate-all.sh
```
This creates 4 STL files instantly!

### Method 3: Local Web UI (Live Preview)
```bash
cd /workspaces/OpenJSCAD.org
npm run web
# Opens at http://localhost:8081
# Drag & drop any .js file from image-to-3d/
```

## 🎨 What Each Model Does

### 1️⃣ Heightmap Relief (`heightmap-apple.js`)
**What it is:** Like a topographic map - bright parts stick out more

**Best for:**
- Wall art / decorative panels
- Embossed logos
- Tactile prints for accessibility
- Desktop sculptures

**Customizable:**
- Base thickness (how thick the backing is)
- Max height (how much the apple "pops out")
- Pixel size (detail level)
- Color gradient (red apple fade)

**Print settings:**
- Material: Any (PLA, PETG, resin)
- Orientation: Flat (face up)
- Supports: Not needed
- Layer height: 0.15mm

---

### 2️⃣ Lithophane (`lithophane-apple.js`)
**What it is:** Backlit art - light shines through thin areas to reveal the image

**Best for:**
- Lamp shades
- Window hangings
- Night lights
- Photo gifts

**How it works:**
- Dark pixels → thick walls (blocks light)
- Bright pixels → thin walls (glows)

**Customizable:**
- Min/max wall thickness
- Frame size and thickness
- Pixel detail

**Print settings:** ⚠️ IMPORTANT
- Material: **White or natural PLA/PETG** (best light diffusion)
- Orientation: **Vertical** (prevents warping)
- Layer height: **0.1mm or finer**
- Infill: **100%** (must be solid)
- Supports: Yes (for frame)
- Light source: LED strip or candle behind it

---

### 3️⃣ Voxel Art (`voxel-apple.js`)
**What it is:** Each pixel becomes a colored 3D cube (Minecraft aesthetic)

**Best for:**
- Retro/pixel art aesthetic
- Desk toys
- Art installations
- Gaming-inspired decor

**Customizable:**
- Voxel size (cube dimensions)
- Gap between cubes
- Style: solid / relief / tall towers
- Height multiplier

**Print settings:**
- Material: Any (multi-color if available!)
- Orientation: Flat or 45°
- Layer height: 0.2mm
- Infill: 15-20%

---

### 4️⃣ Real Photo Data (`apple-processed.js`)
**What it is:** Auto-generated from your actual JPG pixel data (45×45 resolution)

**This is THE REAL DEAL** - uses actual brightness values from your image!

Same settings as heightmap but with authentic photo fidelity.

---

## 🖨️ 3D Printing Cheat Sheet

| Model Type | Size (approx) | Print Time | Material Cost | Difficulty |
|------------|---------------|------------|---------------|------------|
| Heightmap  | 70×70×20mm   | 3-4 hours  | $2-3         | Easy ⭐    |
| Lithophane | 70×70×4mm    | 4-6 hours  | $1-2         | Medium ⭐⭐ |
| Voxel      | 60×60×40mm   | 2-3 hours  | $2-3         | Easy ⭐    |

## 🎯 Try These Custom Parameters

```bash
# Giant heightmap with extreme height
npx jscad heightmap-apple.js --maxHeight 30 --pixelSize 2.5 -o apple-giant.stl

# Thin lithophane for LED strip
npx jscad lithophane-apple.js --minThickness 0.6 --maxThickness 3 -o apple-led.stl

# Chunky voxel towers
npx jscad voxel-apple.js --voxelSize 3 --style tall -o apple-towers.stl
```

## 🔧 Make It Your Own

### Process a Different Image
```bash
cd /workspaces/OpenJSCAD.org/packages/examples/image-to-3d
# Replace the image path in image-processor.js (line 17)
node image-processor.js
# Now you have a new apple-processed.js with your image!
```

### Combine with Other JSCAD Features
Open any `.js` file and add:
- Text labels (use `vectorText`)
- Frames and stands (boolean operations)
- Multiple copies (loops and arrays)
- Custom colors

## 📚 Learn More

- **Full docs:** `README.md` in this folder
- **JSCAD tutorials:** `/workspaces/OpenJSCAD.org/jsdoc/tutorials/`
- **More examples:** `packages/examples/core/`
- **Online guide:** https://openjscad.xyz/guide.html

## 🎁 Next Project Ideas

1. **Photo cube:** Use 6 images (one per face) on a cube
2. **Lithophane lamp:** Stack multiple lithophanes in a cylinder
3. **Terrain map:** Process a topographic map → 3D landscape
4. **Logo stamp:** Import your logo SVG → extrude → 3D stamp
5. **Portrait gift:** Convert a photo to lithophane → frame it

---

**Made with 🍎 for visual art exploration**

Questions? Open the `.js` files - they're fully commented and beginner-friendly!
