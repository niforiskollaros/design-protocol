# APCA & WCAG Contrast Reference

## APCA (Accessible Perceptual Contrast Algorithm)

APCA uses **Lc (Lightness Contrast)** values. Unlike WCAG 2.x ratios, APCA is polarity-aware:
dark text on light background produces positive Lc; light text on dark background produces
negative Lc. Use the absolute value for threshold comparisons.

### APCA Minimum Lc Thresholds by Use Case

| Use Case | Min |Lc| | Font Size Context |
|----------|---------|-------------------|
| Body text (primary content) | 75 | 16px+ regular, 14px+ bold |
| Large text / headings | 60 | 24px+ regular, 18.66px+ bold |
| Sub-text, captions, labels | 60 | 14px+ |
| Placeholder text | 60 | Minimum for legibility |
| Non-text UI elements (icons, borders) | 45 | Meaningful boundaries |
| Decorative / disabled states | 30 | Minimum perceptible |
| Large non-text (logos, hero graphics) | 45 | Large-scale elements |

### APCA Bronze/Silver/Gold Conformance

| Level | Body Text |Lc| | Large Text |Lc| | Non-text |Lc| |
|-------|-----------|------------|------------|
| Bronze (minimum) | 60 | 45 | 30 |
| Silver (recommended) | 75 | 60 | 45 |
| Gold (enhanced) | 90 | 75 | 60 |

### Computing APCA Lc from OKLCH

APCA operates on luminance, not OKLCH lightness directly. However, OKLCH L correlates well
with perceptual lightness. As a rough heuristic:

```
ΔL (OKLCH) of 0.40+ between text and background → usually |Lc| ≥ 60
ΔL (OKLCH) of 0.55+ between text and background → usually |Lc| ≥ 75
ΔL (OKLCH) of 0.65+ between text and background → usually |Lc| ≥ 90
```

**These are approximations.** Always validate with a proper APCA calculator for production.
The correlation is best when chroma is low; high-chroma colors can deviate.

## WCAG 2.2 Contrast Ratios

WCAG 2.x uses a simpler luminance ratio (1:1 to 21:1).

### Minimum Ratios

| Level | Normal Text (< 24px / < 18.66px bold) | Large Text (≥ 24px / ≥ 18.66px bold) | Non-text UI |
|-------|---------------------------------------|--------------------------------------|-------------|
| AA | 4.5:1 | 3:1 | 3:1 |
| AAA | 7:1 | 4.5:1 | — |

### WCAG Ratio from OKLCH Lightness (Heuristic)

| ΔL (OKLCH) | Approx. WCAG Ratio | Meets |
|------------|---------------------|-------|
| 0.30 | ~3:1 | AA Large, UI |
| 0.40 | ~4.5:1 | AA Normal |
| 0.55 | ~7:1 | AAA Normal |
| 0.70+ | ~12:1+ | Well exceeds AAA |

Again, these are directional. WCAG ratio depends on relative luminance, not perceptual
lightness, so hue and chroma affect the actual ratio.

## Practical Guidelines for Palette Design

1. **Text colors on light backgrounds (L ≥ 0.92):** Use L ≤ 0.45 for body text (AA),
   L ≤ 0.35 for AAA.
2. **Text colors on dark backgrounds (L ≤ 0.20):** Use L ≥ 0.65 for body text (AA),
   L ≥ 0.75 for AAA.
3. **Colored text on colored backgrounds:** Reduce chroma on both to improve luminance
   separation. High-chroma pairs can pass OKLCH ΔL checks but fail WCAG because chroma
   affects relative luminance differently per hue.
4. **Interactive states:** Ensure hover/focus states maintain at least the same contrast as
   the default state. Don't rely solely on color change — combine with underline, outline,
   or weight changes.
5. **Dark mode:** Don't just invert. Remap: light backgrounds become L ≈ 0.15–0.20,
   text becomes L ≈ 0.85–0.92. Reduce chroma slightly to avoid vibrating colors on dark
   backgrounds.

## Tools for Validation

- **APCA Calculator:** [apcacontrast.com](https://apcacontrast.com)
- **WCAG Contrast Checker:** browser DevTools (Chrome, Firefox both have built-in)
- **Huetone:** Validates OKLCH palettes against contrast targets
- **Leonardo (Adobe):** Contrast-ratio-driven palette generation
