# Hue Emotion Map

Consolidated from Adams' *Designer's Dictionary of Color* and Goethe's *Theory of Colours*,
with practical UI/UX context from Sherin.

## How to Use This Reference

When selecting hues for a design system, don't pick colors in isolation. Cross-reference the
emotional/cultural associations below with:

1. The **brand personality** the system needs to convey
2. The **audience's cultural context** (Western associations dominate below — adjust for other markets)
3. The **functional role** (is this color semantic, like "error", or expressive, like "brand"?)

## Hue Associations by Range

### Reds (H: 15–40°)

| Aspect | Association |
|--------|------------|
| **Goethe** | The "plus side" — stimulating, energetic, demands attention. The most forceful color. |
| **Adams** | Passion, urgency, danger, love, power. In finance: loss/decline. In East Asia: luck, prosperity. |
| **UI context** | Error states, destructive actions, urgent alerts. Use sparingly — it always dominates. |
| **Chroma note** | High sRGB chroma available (~0.22 at L=0.65). Can push vibrant reds safely. |

### Oranges (H: 40–70°)

| Aspect | Association |
|--------|------------|
| **Goethe** | Warmth, comfort, approachability. Less aggressive than red. |
| **Adams** | Energy, enthusiasm, creativity, warmth. Associated with affordability and friendliness. |
| **UI context** | Warning states (amber/orange), CTAs that feel energetic but not alarming. |
| **Chroma note** | Moderate ceiling (~0.18). Vibrant oranges need careful gamut management. |

### Yellows (H: 70–100°)

| Aspect | Association |
|--------|------------|
| **Goethe** | Closest to light itself. Joy, cheerfulness, but also anxiety and caution when desaturated. |
| **Adams** | Optimism, caution (traffic signals), intellect. Can feel cheap if oversaturated. |
| **UI context** | Warning/caution (amber-yellow), highlights, badges. Avoid as backgrounds — low contrast with white. |
| **Chroma note** | Drops fast at high lightness. Yellow-50 will be nearly white. Use darker steps for legibility. |

### Yellow-Greens (H: 100–130°)

| Aspect | Association |
|--------|------------|
| **Goethe** | Renewal, growth. The transition zone — can feel fresh or sickly depending on chroma. |
| **Adams** | Nature, freshness, sustainability. Chartreuse reads as modern/edgy. |
| **UI context** | Less common in enterprise. Works for eco/sustainability brands. |
| **Chroma note** | Narrow sRGB gamut (~0.17). Be conservative. |

### Greens (H: 130–170°)

| Aspect | Association |
|--------|------------|
| **Goethe** | Balance, rest, natural equilibrium. The "satisfying" color. |
| **Adams** | Growth, success, safety, money, health. Universal "positive" signal. |
| **UI context** | Success states, confirmations, positive metrics, "go" signals. |
| **Chroma note** | sRGB is very constrained here (~0.13–0.17). P3 adds significant headroom. |

### Teals / Cyans (H: 170–210°)

| Aspect | Association |
|--------|------------|
| **Goethe** | Cool, calming, evokes water and sky at their most serene. |
| **Adams** | Clarity, professionalism, modern tech. Teal signals sophistication without coldness. |
| **UI context** | Secondary/accent in tech products. Info states. Dashboard visualizations. |
| **Chroma note** | Most constrained sRGB region (~0.13). P3 is the biggest win here (+46% chroma). |

### Blues (H: 210–270°)

| Aspect | Association |
|--------|------------|
| **Goethe** | The "minus side" — calm, contemplative, receding. Evokes distance and depth. |
| **Adams** | Trust, stability, authority, intelligence. The most universally "safe" brand color. Dominates enterprise, finance, healthcare, tech. |
| **UI context** | Primary brand, links, interactive elements, info states. The default enterprise choice. |
| **Chroma note** | Moderate ceiling (~0.17 sRGB). Navy blues (high L contrast) are universally accessible. |

### Violets / Purples (H: 270–310°)

| Aspect | Association |
|--------|------------|
| **Goethe** | Restless, ambiguous — neither warm nor cool. Creates tension and mystery. |
| **Adams** | Luxury, creativity, royalty, spirituality. In tech: AI, innovation, premium tiers. |
| **UI context** | Premium features, AI/ML indicators, creative tools. Avoid for error/warning (confusion with semantic colors). |
| **Chroma note** | Opens up slightly (~0.18). Deep purples can be very rich. |

### Magentas / Pinks (H: 310–360°/0–15°)

| Aspect | Association |
|--------|------------|
| **Goethe** | The culmination of red and violet — maximum complexity. Regal and theatrical. |
| **Adams** | Romance, playfulness, femininity (culturally loaded — use with care). Hot pink reads as bold/rebellious. |
| **UI context** | Accent/highlight in consumer products. Rare in enterprise unless brand-driven. |
| **Chroma note** | High availability (~0.22). Can push vibrant magentas in sRGB. |

## Quick Reference Table

| Hue Range | H° | Primary Emotion | Enterprise Role | Itten Contrast Pair |
|-----------|-----|-----------------|-----------------|---------------------|
| Red | 15–40 | Urgency, power | Error, destructive | Complement: Teal (175–200) |
| Orange | 40–70 | Warmth, energy | Warning, CTA | Complement: Blue (220–250) |
| Yellow | 70–100 | Optimism, caution | Highlight, badge | Complement: Violet (250–280) |
| Green | 130–170 | Balance, success | Success, confirm | Complement: Magenta (310–350) |
| Teal | 170–210 | Clarity, calm | Info, secondary | Complement: Red-orange (25–50) |
| Blue | 210–270 | Trust, stability | Primary, links | Complement: Orange-yellow (50–90) |
| Violet | 270–310 | Luxury, creativity | Premium, AI | Complement: Yellow-green (90–130) |
| Magenta | 310–360 | Boldness, play | Accent, highlight | Complement: Green (130–170) |
