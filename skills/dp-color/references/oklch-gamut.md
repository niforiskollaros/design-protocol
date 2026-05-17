# OKLCH Gamut Reference

## How OKLCH Works

- **L (Lightness):** 0 (black) → 1 (white). Perceptually uniform — equal steps feel equal.
- **C (Chroma):** 0 (gray) → ~0.4 (max saturation). Actual max depends on hue and lightness.
- **H (Hue):** 0–360 degrees. 0/360 = pink-red, 90 = yellow, 145 = green, 265 = blue, 330 = magenta.

## sRGB Maximum Chroma by Hue (at L = 0.65)

These are approximate ceilings. Exceeding them produces out-of-gamut colors that browsers
will clamp, potentially shifting hue or lightness unpredictably.

| Hue Range | Hue (°) | Max Chroma (sRGB) | Notes |
|-----------|---------|-------------------|-------|
| Red | 25 | ~0.22 | High chroma available |
| Orange | 55 | ~0.18 | Moderate ceiling |
| Yellow | 90 | ~0.18 | Drops fast at high L |
| Yellow-green | 120 | ~0.17 | Narrow gamut |
| Green | 145 | ~0.17 | sRGB is weakest here |
| Teal | 175 | ~0.13 | Very constrained |
| Cyan | 200 | ~0.13 | Constrained |
| Blue | 265 | ~0.17 | Moderate |
| Violet | 295 | ~0.18 | Opens up slightly |
| Magenta | 330 | ~0.22 | High chroma |
| Pink-red | 0/360 | ~0.22 | High chroma |

## Key Gamut Rules

1. **Chroma ceiling varies by both hue AND lightness.** At very low or very high L, max chroma
   drops significantly regardless of hue.
2. **sRGB is smallest around teal/cyan (H ≈ 175–200).** If you need vibrant teals, consider
   P3 gamut or accept lower chroma.
3. **P3 gamut extends chroma ~20–40% beyond sRGB** depending on hue region. Most impactful
   in greens and cyans.
4. **Always test in-browser.** Even "safe" values can clip on some displays. Use
   `color-mix(in oklch, ...)` or `@media (color-gamut: p3)` for progressive enhancement.

## Display P3 Approximate Max Chroma (at L = 0.65)

| Hue Region | Max Chroma (P3) | Gain over sRGB |
|------------|-----------------|----------------|
| Red (25°) | ~0.29 | +32% |
| Green (145°) | ~0.24 | +41% |
| Teal (175°) | ~0.19 | +46% |
| Cyan (200°) | ~0.18 | +38% |
| Blue (265°) | ~0.22 | +29% |
| Magenta (330°) | ~0.28 | +27% |

## Lightness vs. Chroma Envelope

General pattern for sRGB at any hue:

```
L = 0.00–0.15  →  Max C ≈ 0.05–0.10  (very dark, low chroma ceiling)
L = 0.15–0.35  →  Max C rises steeply
L = 0.35–0.70  →  Max C at peak (hue-dependent, see table above)
L = 0.70–0.85  →  Max C starts dropping
L = 0.85–1.00  →  Max C ≈ 0.04–0.08  (very light, low chroma ceiling)
```

This means your most saturated shades will sit in the mid-lightness range (~400–600 on a
typical scale). The extremes (25, 50, 850, 900) will always be lower chroma.

## Practical CSS

```css
/* sRGB safe */
--color-primary-500: oklch(0.65 0.17 265);

/* P3 enhanced with sRGB fallback */
--color-primary-500: oklch(0.65 0.17 265);
@media (color-gamut: p3) {
  --color-primary-500: oklch(0.65 0.22 265);
}

/* Relative color syntax for tinting */
--color-primary-100: oklch(from var(--color-primary-500) 0.95 0.03 h);
```
