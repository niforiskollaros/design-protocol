# Design Tool Workflows

Step-by-step workflows for integrating OKLCH palette work with the four major color
palette tools. Use this reference when the user mentions any of these tools or asks
how to validate/export palettes through external tooling.

## Atmos (atmos.style)

**What it does:** Generates entire color systems from a few seed colors. Produces
scales with configurable steps, lightness curves, and chroma behavior. Underrated
tool — one of the few that thinks in terms of full systems rather than individual colors.

### Workflow: Base Color → Full System

1. **Open Atmos** and start a new palette
2. **Add your seed color** as a HEX value (e.g., #1c2739)
3. **Configure scale steps:**
   - Set to 11 steps (50–950) or 13 steps (25–975) depending on system needs
   - Atmos uses its own lightness distribution — compare against the eased curve
     in `scale-patterns.md` and adjust if needed
4. **Add semantic colors:** Use Atmos's "add color" to create Success, Warning, Error, etc.
   - Tip: Set the hues manually based on your harmony strategy (see SKILL.md directive 8)
     rather than accepting Atmos defaults
5. **Review chroma behavior:** Atmos may push chroma higher than sRGB allows for some hues.
   Cross-check against `oklch-gamut.md` chroma ceilings
6. **Export:** Atmos exports CSS custom properties and JSON. The format may need light
   transformation to match W3C design token spec — use `scripts/export_tokens.py` for that.

### Strengths
- Thinks in full systems (multiple color roles at once)
- Good lightness distribution out of the box
- Quick iteration on seed colors

### Limitations
- Doesn't explicitly show OKLCH values (uses its own internal model)
- No APCA contrast validation built in
- May produce out-of-gamut values without warning

---

## Huetone (huetone.ardov.me)

**What it does:** Purpose-built for OKLCH palette creation. Visualizes the OKLCH color
space directly, shows gamut boundaries, and validates contrast between steps. The most
OKLCH-native tool available.

### Workflow: OKLCH Palette Validation

1. **Open Huetone** and create a new palette
2. **Set your hue angle** (e.g., H=260 for the navy primary)
3. **Define lightness stops:**
   - Enter L values for each step manually to match your target curve
   - Huetone shows a lightness graph — verify it follows the eased pattern
     from `scale-patterns.md`
4. **Set chroma per step:**
   - Huetone displays the sRGB gamut boundary as a shaded region
   - If your chroma dot falls outside the shaded area, it's out of gamut
   - Adjust chroma to stay inside the boundary
5. **Check contrast pairs:**
   - Huetone shows WCAG contrast ratios between any two steps
   - Verify that step 500+ on white meets your AA/AAA target
   - Verify dark mode pairings (step 100–200 text on step 900 surface)
6. **Export:** Huetone exports OKLCH values directly. Copy into your palette JSON
   and run through `scripts/export_tokens.py`

### Strengths
- Native OKLCH visualization
- Real-time gamut boundary display
- Built-in contrast checking between steps
- Shareable palette URLs

### Limitations
- One hue at a time (not a full system view)
- No dark mode preview
- Limited export formats
- Manual process for multi-color systems

---

## Leonardo (leonardocolor.io) by Adobe

**What it does:** Contrast-ratio-driven palette generation. You define target contrast
ratios and Leonardo computes the colors that achieve them. The "accessibility-first"
approach to palette building.

### Workflow: Contrast-Anchored Palette

1. **Open Leonardo** and create a new color scale
2. **Set your key color** (the mid-tone anchor — typically your brand color)
3. **Define contrast ratios** for each step against your background:
   ```
   Step 50  → 1.1:1  (barely tinted surface)
   Step 100 → 1.3:1  (light surface)
   Step 200 → 1.8:1  (decorative)
   Step 300 → 2.5:1  (large non-text)
   Step 400 → 3.0:1  (AA large text)
   Step 500 → 4.5:1  (AA normal text)
   Step 600 → 5.5:1  (comfortable reading)
   Step 700 → 7.0:1  (AAA normal text)
   Step 800 → 9.0:1  (high contrast)
   Step 900 → 12.0:1 (maximum)
   Step 950 → 15.0:1 (near-black)
   ```
4. **Choose the color space:** Select OKLCH (or LCH) as the interpolation space.
   Leonardo supports multiple spaces — always use OKLCH for perceptual uniformity.
5. **Adjust the lightness curve:** Leonardo auto-computes L values from contrast ratios.
   The resulting curve will be non-linear (contrast-anchored pattern from `scale-patterns.md`).
   Review whether the steps feel even visually.
6. **Generate for multiple backgrounds:**
   - White (#fff) for light mode
   - Your dark surface (e.g., primary-900) for dark mode
   - Leonardo recalculates all colors to hit the same contrast targets on each background
7. **Export:** Leonardo exports CSS, JSON, and SVG palettes. The CSS export uses
   the `color()` function — may need conversion to `oklch()` syntax.

### Strengths
- Accessibility is the foundation, not an afterthought
- Multi-background support (light + dark mode from the same definition)
- Generates tokens tied to contrast targets, not arbitrary lightness
- Adobe-maintained, actively developed

### Limitations
- Doesn't use OKLCH natively in its UI (uses CAM02/LCH internally)
- The contrast-driven approach produces uneven perceptual spacing
- Less intuitive for designers who think in hue/saturation terms
- Can produce surprising hue shifts at extreme contrast targets

---

## Colorbox (colorbox.io) by Lyft

**What it does:** Custom easing curves for palette generation. Lets you define
bezier curves for lightness, saturation, and hue independently — maximum control
over the shape of your ramp.

### Workflow: Custom Curve Palette

1. **Open Colorbox** and set the number of steps (11 recommended)
2. **Set your anchor color:**
   - Use the color picker or paste your HEX
   - Position it at the step where you want it to anchor (usually 500 or 600)
3. **Configure the Lightness curve:**
   - Colorbox provides bezier curve handles
   - For the eased pattern: pull the light end slightly flatter (more space for surfaces)
     and the dark end slightly flatter (more space for text shades)
   - For linear: make the curve as straight as possible
4. **Configure the Saturation curve:**
   - Shape this as a bell curve peaking at mid-steps
   - Pull the ends (light and dark) down to reduce chroma at extremes
   - This naturally mirrors the sRGB gamut envelope
5. **Configure the Hue curve:**
   - For no rotation: flat line
   - For natural shadow: slight upward curve (rotate toward cooler at dark end)
   - Keep total rotation under 15–20°
6. **Preview:** Colorbox renders the full ramp live. Check for:
   - Smooth visual transitions (no sudden jumps)
   - No gamut clipping (compare with `oklch-gamut.md`)
   - The anchor color sitting at the right step
7. **Export:** Colorbox exports HEX values. Convert to OKLCH using:
   ```bash
   # If you have the palette in JSON with hex values, the export script can help
   # Or convert manually with a tool like oklch.com
   ```

### Strengths
- Maximum control over curve shape
- Visual bezier editor is intuitive for designers
- Good for understanding how curves affect perception
- Fast iteration

### Limitations
- Works in HSL internally (not OKLCH) — perceptual uniformity not guaranteed
- No contrast validation built in
- Exports HEX only — requires post-conversion to OKLCH
- Gamut issues not surfaced (HSL doesn't have gamut boundaries)

---

## Tool Comparison Matrix

| Feature | Atmos | Huetone | Leonardo | Colorbox |
|---------|-------|---------|----------|----------|
| Native OKLCH | ✗ | ✓ | Partial | ✗ |
| Full system view | ✓ | ✗ | ✗ | ✗ |
| Gamut visualization | ✗ | ✓ | ✗ | ✗ |
| Contrast validation | ✗ | ✓ | ✓ (core) | ✗ |
| Dark mode support | ✗ | ✗ | ✓ | ✗ |
| Custom curves | ✗ | ✗ | ✗ | ✓ |
| Token export | CSS/JSON | Manual | CSS/JSON | HEX only |
| Best for | System overview | OKLCH precision | A11y-first builds | Curve experimentation |

## Recommended Workflow

For production design systems, combine tools:

1. **Start in Colorbox** — experiment with curves to find the right "feel"
2. **Validate in Huetone** — check gamut boundaries and inter-step contrast in OKLCH
3. **Anchor in Leonardo** — verify contrast targets are met on both light and dark surfaces
4. **Review in Atmos** — see the full multi-color system together
5. **Export with `scripts/export_tokens.py`** — generate production CSS, JSON, and Figma tokens
