# Abstract/Conceptual Sculpture Examples

Five parametric sculptures for exploring form, iteration, and mathematical concepts.

## Files Created

All in `/workspaces/OpenJSCAD.org/packages/examples/sculpture/`:

1. **twisted-column.js** - Rotation and morphing through space
2. **organic-blob.js** - Noise-based organic forms
3. **fractal-tree.js** - Recursive branching structures
4. **topological-forms.js** - Möbius strips, knots, non-orientable surfaces
5. **modular-units.js** - Stackable/interlocking pieces for assemblage

## Quick View

Open any file at https://openjscad.xyz:
1. Go to the site
2. "Load JSCAD Project" → select a file
3. Adjust sliders → instant variations
4. Export STL when ready

## What Each Explores

### 1. Twisted Column (`twisted-column.js`)
**Concept:** Transformation through space - rotation, scaling, morphing

**Parameters:**
- Base shape (circle, square, star, hexagon)
- Twist amount (0-720°)
- Top scale (narrow or expand)
- Wave distortion (add sinusoidal movement)

**Why it's useful:**
- Study how forms change through continuous transformation
- Create column designs for installation
- Explore tension between geometric and organic

**Scale suggestions:** 50-200mm tall; print vertically

---

### 2. Organic Blob (`organic-blob.js`)
**Concept:** Generative form using mathematical noise (Perlin-like)

**Parameters:**
- Detail level (40-300 blobs)
- Noise scale (frequency of variation)
- Bumpiness (displacement intensity)
- Random seed (infinite variations)
- Elongation (sphere, vertical, horizontal)

**Why it's useful:**
- Every seed = unique form (perfect for series/editions)
- Non-designed, algorithm-generated aesthetics
- Study natural vs artificial form language

**Scale suggestions:** 40-80mm; hollow out for lighter prints

---

### 3. Fractal Tree (`fractal-tree.js`)
**Concept:** Self-similarity and recursive iteration

**Parameters:**
- Recursion depth (2-7; ⚠️ slow >6)
- Branch angle (spread)
- Branches per node (2-5)
- Length/radius ratios (child/parent proportions)
- Optional spheres at tips

**Why it's useful:**
- Visualize recursion and self-reference
- Natural branching patterns (trees, coral, blood vessels)
- Explore balance, symmetry, growth systems

**Scale suggestions:** 100-150mm tall; needs supports

---

### 4. Topological Forms (`topological-forms.js`)
**Concept:** Mathematical surfaces (Möbius, trefoil knot, figure-8)

**Surfaces:**
- Möbius strip (adjustable twists)
- Double Möbius
- Trefoil knot (3-fold)
- Figure-8 knot

**Why it's useful:**
- Non-orientable surfaces (one-sided forms)
- Impossible objects / visual paradoxes
- Pure mathematical beauty
- Continuous loops with no beginning/end

**Scale suggestions:** 60-120mm; delicate - print slowly

---

### 5. Modular Units (`modular-units.js`)
**Concept:** Interlocking pieces for larger assemblages

**Unit types:**
- Wave tile (tessellating sine wave)
- Saddle surface (hyperbolic paraboloid)
- Twisted block
- Sphere joint (ball-and-socket stackable)
- Notched block (tab-and-slot)

**Parameters:**
- Size and height
- Joint tolerance (fit adjustment)
- Show 3×3 array preview

**Why it's useful:**
- Build large installations from small units
- Explore modularity and system-based art
- Create maquettes for site-specific work
- Study positive/negative space through assembly

**Scale suggestions:** 40mm units; print 10-20 copies; stack/arrange

---

## Workflow for Conceptual Work

1. **Generate variations** - Change one parameter, export 5-10 STLs
2. **Print small studies** - 30-50mm scale, fast prints
3. **Critique series** - Which formal relationships work?
4. **Scale up winner** - Print at exhibition size (200mm+)
5. **Iterate** - Return to code, adjust, repeat

## Combining Examples

Mix and match:
- Fractal tree with organic blob noise
- Modular units arranged in fractal patterns
- Twisted column using topological cross-sections
- Wave tiles with parametric height variations

## Export Tips

**For casting (mold-making):**
- Smooth forms work best (increase `segments` parameter)
- Export as STL → print → make silicone mold
- Consider draft angles and undercuts

**For assemblage:**
- Print modular units in multiples
- Test joint tolerances (0.2-0.4mm typical)
- Use different colors/materials per unit type

**For exhibition scale:**
- Scale factor: current size × 3-5
- Check printer bed limits
- Consider splitting large forms (boolean cuts)

## Customization Ideas

- Add your own mathematical functions
- Combine primitives in new ways
- Use color to highlight structure
- Create parametric bases/pedestals
- Generate families (same code, varied params)

---

**These are starting points** - open the code, read the comments, modify freely. The parametric nature means infinite variations from one concept.

**View them:** https://openjscad.xyz (drag & drop .js files)
