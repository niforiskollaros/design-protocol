# Visual Design Principles

The foundational rules behind polished, professional interfaces.

## Grid Systems

### The 8px Grid
All spacing, sizing, and positioning should use multiples of 8px:
- **4px** — Fine adjustments only (icon padding, border radius)
- **8px** — Minimum spacing unit
- **16px** — Common element padding
- **24px** — Section spacing
- **32px** — Major section breaks
- **48px, 64px** — Large spacing, hero areas

**Why 8px?** Divisible by 2 and 4, scales well, aligns with common screen sizes.

### Column Grids
```
┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐
│1 │2 │3 │4 │5 │6 │7 │8 │9 │10│11│12│  ← 12-column grid
└──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘
```
- **12 columns** — Most flexible (divisible by 2, 3, 4, 6)
- **Gutters** — 16px (compact), 24px (standard), 32px (spacious)
- **Margins** — Consistent left/right page margins (16-64px depending on viewport)

### Responsive Breakpoints
```
Mobile:     320px - 767px    (1-4 columns)
Tablet:     768px - 1023px   (6-8 columns)
Desktop:    1024px - 1439px  (12 columns)
Large:      1440px+          (12 columns, max-width container)
```

## Visual Hierarchy

### Size Scale
Establish a type scale with clear hierarchy:
```
Display:    32-48px  — Hero headlines
H1:         24-32px  — Page titles
H2:         20-24px  — Section headers
H3:         16-18px  — Subsection headers
Body:       14-16px  — Primary content
Caption:    12-13px  — Secondary info, metadata
Micro:      10-11px  — Badges, labels (use sparingly)
```

### Weight Hierarchy
- **Bold (600-700)** — Headlines, emphasis, primary labels
- **Medium (500)** — Subheadings, interactive elements
- **Regular (400)** — Body text, secondary content
- **Light (300)** — Use rarely, only for large display text

### Creating Hierarchy
```
┌─────────────────────────────────────┐
│  MOST IMPORTANT                     │  ← Largest, boldest, highest contrast
│                                     │
│  Secondary Information              │  ← Medium size, regular weight
│                                     │
│  Supporting details and metadata    │  ← Smaller, lighter, lower contrast
└─────────────────────────────────────┘
```

**The Squint Test**: Blur your vision — can you still identify what's most important?

## Gestalt Principles

### Proximity
Items close together are perceived as related.
```
Good:                          Bad:
┌────────┐ ┌────────┐         ┌────────┐
│ Name   │ │ Email  │         │ Name   │
│ [____] │ │ [____] │         │ [____] │
└────────┘ └────────┘         │        │
                              │ Email  │
┌────────┐ ┌────────┐         │ [____] │
│ City   │ │ Zip    │         │        │
│ [____] │ │ [____] │         │ City   │
└────────┘ └────────┘         └────────┘
```

### Similarity
Similar-looking elements are perceived as related.
- Same color = same category/type
- Same shape = same function
- Same size = same importance

### Continuity
Eyes follow lines, edges, and curves.
- Align elements to create visual flow
- Use consistent left edges for forms
- Horizontal rules guide scanning

### Closure
The mind completes incomplete shapes.
- Progress indicators don't need full circles
- Icons can be simplified/abstracted
- Negative space can define shapes

### Figure/Ground
Clear separation between content (figure) and background (ground).
- Sufficient contrast between layers
- Cards/panels create figure separation
- Shadows establish depth hierarchy

## Typography

### Font Pairing
- **One family** often enough — Use weight/size for variation
- **Two families max** — Display + body (e.g., serif headlines + sans body)
- **Contrast is key** — If pairing, make them clearly different

### Line Length
- **Optimal**: 50-75 characters per line
- **Minimum**: 45 characters
- **Maximum**: 90 characters
- Too wide = hard to track back to next line
- Too narrow = choppy, awkward breaks

### Line Height
- **Body text**: 1.4-1.6 (150% is safe default)
- **Headlines**: 1.1-1.3 (tighter for large text)
- **Dense UI**: 1.3-1.4 (tables, lists)

### Letter Spacing
- **Body**: 0 (default)
- **Headlines**: -0.5 to -2% (slightly tighter)
- **ALL CAPS**: +2 to +5% (more spacing needed)
- **Small text**: +1 to +2% (improves legibility)

## Color Theory

### Color Roles
```
Primary:    Brand color, primary actions
Secondary:  Supporting actions, accents
Neutral:    Text, borders, backgrounds (gray scale)
Success:    Confirmations, positive states (green)
Warning:    Caution, attention needed (yellow/orange)
Error:      Problems, destructive actions (red)
Info:       Informational states (blue)
```

### Color Application
- **60-30-10 Rule**: 60% dominant, 30% secondary, 10% accent
- **Backgrounds**: Neutral, low saturation
- **Text**: High contrast against background
- **Interactive**: Consistent color for clickable elements
- **Status**: Reserved colors for semantic meaning

### Creating Depth
```
Background layers (light theme):
Layer 0:    #FFFFFF (white)     — Base
Layer 1:    #F9FAFB (gray-50)   — Subtle sections
Layer 2:    #F3F4F6 (gray-100)  — Cards, panels
Layer 3:    #E5E7EB (gray-200)  — Hover states
```

### Dark Mode Considerations
- Don't just invert — redesign surfaces
- Reduce contrast slightly (not pure white on black)
- Desaturate colors slightly
- Shadows become less visible — use borders instead
- Elevation through lighter surfaces, not shadows

## Alignment & Consistency

### The Alignment Principle
**Everything should align to something.**
- Create invisible lines that elements follow
- Left-align most content (for LTR languages)
- Center only for short, focused content
- Right-align numbers in columns

### Consistency Rules
- Same spacing for same relationships
- Same size for same importance level
- Same color for same meaning
- Same component for same function
- If breaking consistency, do it dramatically (not subtly)

## Motion & Interaction

### Timing Guidelines
- **Instant (0-100ms)**: Hovers, micro-interactions.
- **Fast (200-300ms)**: Dropdowns, toggles, small transitions.
- **Natural (300-500ms)**: Page transitions, large movements.

### Easing
- **Ease-out (Decelerate)**: Elements entering view (feels natural).
- **Ease-in (Accelerate)**: Elements exiting view.
- **Linear**: Loaders and color changes only.

## Elevation & Depth

### Shadow Scale
- **Level 1 (Pressed/Low)**: `0 1px 2px rgba(0,0,0,0.05)` — Cards, controls
- **Level 2 (Dropdowns)**: `0 4px 6px -1px rgba(0,0,0,0.1)` — Popovers
- **Level 3 (Sticky)**: `0 10px 15px -3px rgba(0,0,0,0.1)` — Header, dock
- **Level 4 (Modal)**: `0 20px 25px -5px rgba(0,0,0,0.1)` — Dialogs, drawers

### Z-Index Layers
- **0-99**: Content layers
- **100-199**: Navigation (Sticky headers)
- **200-299**: Dropdowns & Popovers
- **300-399**: Overlays (Backdrops)
- **400-499**: Modals
- **500+**: Toasts and Tooltips

## Accessibility Standards

### WCAG AA Compliance
- **Comparison**: 4.5:1 ratio for normal text, 3:1 for large text.
- **UI Elements**: 3:1 contrast for borders on inputs/buttons.
- **Focus Indicators**: Visible outline (2px recommended) for keyboard navigation.

### Semantic Structure
- Use real `<button>` and `<a>` tags.
- Headings (`h1`-`h6`) must be in descending order.
- Meaningful `alt` text for informational images.

## Visual Polish Checklist

- [ ] All elements align to the grid
- [ ] Spacing is consistent (8px multiples)
- [ ] Type scale is defined and followed
- [ ] Colors are from a defined palette
- [ ] Visual hierarchy is clear (squint test)
- [ ] Related items are grouped (proximity)
- [ ] Similar items look similar (consistency)
- [ ] Sufficient contrast for accessibility
- [ ] Details are refined (borders, shadows, radius)