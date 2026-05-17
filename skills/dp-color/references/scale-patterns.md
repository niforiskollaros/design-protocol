# Color Scale Patterns Reference

## Standard Scale Steps

Design systems typically use named stops from 25 (lightest) to 900 (darkest). The most
common configurations:

### 13-Step Scale (Comprehensive)

`25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 975`

Best for: Large design systems with nuanced surface/state needs.

### 11-Step Scale (Standard)

`50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950`

Best for: Most production design systems. Matches Tailwind's structure.

### 9-Step Scale (Compact)

`100, 200, 300, 400, 500, 600, 700, 800, 900`

Best for: Simpler systems, single-brand palettes.

## Lightness Mapping

The core of a good ramp is the lightness curve. Here are proven patterns in OKLCH:

### Linear Lightness (Even Steps)

```
Step  →  L (OKLCH)
25   →  0.97
50   →  0.95
100  →  0.90
200  →  0.82
300  →  0.74
400  →  0.66
500  →  0.58
600  →  0.50
700  →  0.42
800  →  0.34
900  →  0.26
950  →  0.20
975  →  0.15
```

**Pros:** Truly perceptually uniform in OKLCH. Each step feels equal.
**Cons:** Mid-range (400–600) can feel compressed visually in UI context.

### Eased Lightness (Tailwind-style)

```
Step  →  L (OKLCH)
25   →  0.98
50   →  0.96
100  →  0.93
200  →  0.87
300  →  0.79
400  →  0.70
500  →  0.60
600  →  0.50
700  →  0.40
800  →  0.32
900  →  0.25
950  →  0.18
975  →  0.13
```

**Pros:** More space in the light end (useful for backgrounds/surfaces) and dark end (text).
**Cons:** Mid-tones are slightly compressed. Matches user expectations from Tailwind.

### Contrast-Anchored (Leonardo-style)

Instead of defining lightness directly, anchor certain stops to contrast targets:

```
Step 50   →  WCAG ≥ 1.1:1 against white  (barely tinted)
Step 100  →  WCAG ≥ 1.3:1 against white  (light surface)
Step 300  →  WCAG ≥ 2:1 against white     (decorative)
Step 500  →  WCAG ≥ 4.5:1 against white   (AA text on white)
Step 600  →  APCA |Lc| ≥ 60 on white      (APCA large text)
Step 700  →  WCAG ≥ 7:1 against white      (AAA text on white)
Step 900  →  WCAG ≥ 12:1 against white     (high contrast text)
```

**Pros:** Guarantees accessibility at named stops. Easy to document: "use 500+ on white."
**Cons:** Lightness spacing is uneven — driven by contrast math, not perception.

## Chroma Curves

Chroma should not stay constant across a ramp. Two patterns:

### Bell Curve (Recommended)

Chroma peaks at mid-lightness (~500) and tapers at both extremes.

```
Step  →  C multiplier (of max hue chroma)
25   →  0.15
50   →  0.20
100  →  0.30
200  →  0.50
300  →  0.70
400  →  0.85
500  →  1.00  (peak)
600  →  0.90
700  →  0.75
800  →  0.55
900  →  0.35
950  →  0.25
975  →  0.18
```

This mirrors the sRGB gamut envelope naturally. See `oklch-gamut.md` for why.

### Front-Loaded (Vibrant Lights)

Chroma peaks earlier (~300–400). Creates vivid light tints, muted darks.

```
Step  →  C multiplier
25   →  0.25
50   →  0.40
100  →  0.60
200  →  0.80
300  →  0.95
400  →  1.00  (peak)
500  →  0.85
600  →  0.65
700  →  0.50
800  →  0.35
900  →  0.25
```

Useful for palettes where light surfaces need to carry brand color strongly.

## Hue Rotation

In OKLCH, hue can shift slightly across a ramp to create more natural-feeling scales:

- **Warm shift:** Rotate hue +5–15° toward yellow/orange at lighter steps
- **Cool shift:** Rotate hue -5–10° toward blue at darker steps
- **Natural shadow:** Dark shades often look more natural slightly cooler (mimics real-world shadow)

Example for a blue palette (H = 265):
```
Step 50   →  H = 260  (slightly greener / lighter feel)
Step 500  →  H = 265  (anchor)
Step 900  →  H = 272  (slightly violet / deeper)
```

Keep total rotation under 20° to maintain color identity.

## Multi-Color System Layout

For a full design system with 12+ semantic colors:

| Color Role | Example Hues (H) | Notes |
|------------|-------------------|-------|
| Primary | Brand-dependent | Anchor color |
| Secondary | Primary ± 30–60° | Analogous harmony |
| Accent | Primary ± 150–180° | Complementary pop |
| Success | 145–155 | Green family |
| Warning | 80–95 | Yellow/amber family |
| Error/Danger | 25–35 | Red/orange family |
| Info | 230–260 | Blue family |
| Neutral | 0 chroma (or C ≤ 0.02) | True gray or tinted neutral |
| Neutral (tinted) | Primary hue, C = 0.01–0.03 | Warm/cool neutral |

Each of these gets the full step ramp (25–900).

## CSS Custom Properties Pattern

```css
:root {
  /* Primary blue — 11 steps */
  --primary-50:  oklch(0.96 0.03 265);
  --primary-100: oklch(0.93 0.05 265);
  --primary-200: oklch(0.87 0.09 264);
  --primary-300: oklch(0.79 0.12 264);
  --primary-400: oklch(0.70 0.15 265);
  --primary-500: oklch(0.60 0.17 265);
  --primary-600: oklch(0.50 0.15 266);
  --primary-700: oklch(0.40 0.13 267);
  --primary-800: oklch(0.32 0.09 268);
  --primary-900: oklch(0.25 0.06 270);
  --primary-950: oklch(0.18 0.04 272);
}
```

## JSON Token Format

```json
{
  "color": {
    "primary": {
      "50":  { "value": "oklch(0.96 0.03 265)", "hex": "#e8eeff" },
      "100": { "value": "oklch(0.93 0.05 265)", "hex": "#d1deff" },
      "500": { "value": "oklch(0.60 0.17 265)", "hex": "#4466dd" },
      "900": { "value": "oklch(0.25 0.06 270)", "hex": "#1a2244" }
    }
  }
}
```
