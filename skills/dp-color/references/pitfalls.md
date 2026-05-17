# Common OKLCH Pitfalls

Mistakes that even experienced designers make when working with OKLCH. Consult this when
generating palettes to avoid known traps.

## 1. Chroma Clipping (The Silent Destroyer)

**Problem:** You set `oklch(0.65 0.25 185)` — a vibrant teal. But sRGB max chroma at H=185°
is ~0.13. The browser silently clamps it, shifting both the hue and lightness in
unpredictable ways. Your carefully tuned color is now something else entirely.

**Symptoms:**
- Color looks different than expected
- Two "different" OKLCH values render as the same hex
- Hue appears shifted (common with greens/teals)
- Lightness appears wrong

**Fix:** Always check against the gamut ceiling for the target hue (see `oklch-gamut.md`).
When in doubt, reduce chroma by 10–15% from what you think the limit is.

**CSS mitigation:**
```css
/* Let the browser do smart gamut mapping */
color: oklch(0.65 0.25 185);  /* Browser clamps — unpredictable */

/* Better: explicitly target the gamut */
color: color(display-p3 0.2 0.6 0.55);  /* P3-safe equivalent */
```

## 2. Gray Hue Shift (The Phantom Color)

**Problem:** You create a "neutral gray" with `oklch(0.50 0.003 260)`. At C=0.003, you'd
expect it to look gray. But because the chroma isn't exactly 0, it carries a visible blue
tint — especially noticeable on calibrated displays and in large surface areas.

**Symptoms:**
- "Gray" surfaces have a color cast
- Different "grays" at different hues don't match
- Neutral UI elements look tinted

**Fix:** For true neutrals, use `C = 0` (achromatic). For intentionally tinted neutrals
(which are great for design systems — see the test artifact's approach), use `C = 0.01–0.02`
and be deliberate about it. The danger zone is `C = 0.002–0.008` — too much color to be
gray, too little to read as intentional.

**Rule of thumb:**
- `C = 0` → True gray (no hue influence)
- `C = 0.01–0.02` → Subtly tinted neutral (deliberate warmth/coolness)
- `C = 0.003–0.008` → Danger zone (looks like a mistake)
- `C ≥ 0.03` → Clearly colored

## 3. Lightness ≠ Luminance (The WCAG Trap)

**Problem:** You ensure a OKLCH lightness difference of 0.45 between text and background,
assuming it passes WCAG AA. But WCAG uses relative luminance (derived from linear RGB),
not perceptual lightness. High-chroma colors can have the same OKLCH L but different
WCAG luminance values.

**Symptoms:**
- Palette passes your ΔL check but fails a WCAG contrast checker
- Saturated colors unexpectedly fail contrast
- Blues appear to pass more easily than yellows at the same ΔL

**Fix:** Use OKLCH ΔL as a first approximation (see `apca-contrast.md` for the heuristic),
but always validate with a proper WCAG calculator for production. The correlation breaks
down most at high chroma.

## 4. Hue Discontinuity at 360°/0°

**Problem:** You're interpolating between H=350° (pink) and H=10° (red). Naively
interpolating gives you H=180° (teal) instead of H=0° (the short path through red).

**Symptoms:**
- Color transitions pass through unexpected hues
- Gradient goes "the long way around" the hue wheel
- Animated color transitions produce rainbow flashes

**Fix:** When interpolating hue, always take the shortest path around the wheel:
```javascript
function shortestHuePath(h1, h2, t) {
  let diff = h2 - h1;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return ((h1 + diff * t) % 360 + 360) % 360;
}
```

In CSS, `color-mix(in oklch, ...)` handles this automatically with `shorter hue` (the default).

## 5. Non-Uniform Chroma Across a Ramp

**Problem:** You use the same chroma value (say C=0.15) across all lightness steps in a
ramp. The result: mid-tones look vivid, light tints look washed out, dark shades look
oversaturated and may clip gamut.

**Symptoms:**
- Light steps (50, 100) look barely tinted
- Dark steps (800, 900) look muddy or have hue shift
- The ramp doesn't feel "smooth"

**Fix:** Use a bell-curve chroma distribution that peaks at mid-lightness. See
`scale-patterns.md` for the recommended multiplier curves. This mirrors the natural
shape of the sRGB gamut envelope.

## 6. Assuming P3 Is Always Better

**Problem:** You add P3-enhanced values everywhere, pushing chroma higher for all colors.
But for blues and magentas, the sRGB and P3 gamuts are very similar. You're adding
complexity (extra CSS) for negligible visual difference.

**Symptoms:**
- P3 values barely differ from sRGB values for some hues
- Extra code for no visible benefit
- Testing burden increases

**Fix:** Only include P3 overrides where the gain is meaningful (>15% chroma increase).
The biggest wins are in greens (H≈145°, +41%), teals (H≈175°, +46%), and cyans (H≈200°, +38%).
Blues and magentas gain less than 30% — often not worth the complexity.

## 7. Dark Mode by Inversion

**Problem:** You create dark mode by simply swapping your 50 with 900, 100 with 800, etc.
This produces:
- Text that's too bright (original backgrounds were very light)
- Surfaces that are too dark (original text was very dark)
- Chroma that vibrates on dark backgrounds

**Symptoms:**
- Eye strain on dark mode
- Colors feel "electric" or harsh
- Contrast ratios are technically fine but readability suffers

**Fix:** Don't invert — remap. See the dark mode rules in SKILL.md directive 7. Key moves:
- Surfaces: L ≈ 0.15–0.20 (not the 0.04 you'd get from inverting step 950)
- Text: L ≈ 0.85–0.92 (not the 0.96 you'd get from inverting step 50)
- Chroma: reduce 15–25% across the board
- Test with real UI components, not just swatch grids

## 8. Over-Rotating Hue Across Steps

**Problem:** You add hue rotation to make the ramp feel more natural (warm lights, cool darks).
But rotating more than ~20° total causes the ramp to lose its identity. A "blue" ramp starts
looking purple in the darks and green in the lights.

**Symptoms:**
- Dark steps don't feel like they belong to the same color
- Users describe the color inconsistently ("is this blue or purple?")
- Adjacent ramps start overlapping in hue

**Fix:** Keep total hue rotation under 15–20°. A rotation of 2–3° per step is usually enough
to create natural shadow depth without losing identity.

## 9. Ignoring Simultaneous Contrast

**Problem:** You test your green "success" color on a white background and it looks perfect.
Then a user places it next to your red "error" color and the green shifts dramatically —
it looks more yellow.

**Symptoms:**
- Colors look "wrong" in certain UI contexts
- Side-by-side status colors shift unexpectedly
- The same color looks different on different pages

**Fix:** This is Albers' core lesson. Always test colors in context — next to the other
colors they'll actually appear beside. Particularly test:
- Success next to Error (complementary clash)
- Primary next to Neutral (chroma amplification)
- Warning next to any high-chroma neighbor

When in doubt, increase the spatial separation (more padding, dividers) or reduce chroma
on one of the neighbors.
