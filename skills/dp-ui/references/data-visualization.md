# Data Visualization

Charts, graphs, and maritime-specific display patterns.

## Chart Selection Guide

### Choose Based on Data Relationship

| Relationship | Best Chart Types |
|--------------|------------------|
| **Comparison** (between categories) | Bar chart, grouped bar, radar |
| **Trend** (over time) | Line chart, area chart |
| **Part-to-whole** | Pie chart (≤5 segments), stacked bar, treemap |
| **Distribution** | Histogram, box plot, violin plot |
| **Correlation** | Scatter plot, bubble chart |
| **Geographic** | Map, choropleth, connection map |
| **Flow/Process** | Sankey, funnel |
| **Hierarchy** | Treemap, sunburst |

### Common Chart Patterns

**Line Chart** — Time series, trends
```
│     ╭─────╮
│    ╱       ╲    ╱
│   ╱         ╲──╱
│──╱
└────────────────────
  Jan  Feb  Mar  Apr
```
- Use for continuous data over time
- Limit to 5-7 lines before it gets cluttered
- Zero baseline not required (but be transparent)

**Bar Chart** — Comparison across categories
```
│ ████████████████ 87
│ ██████████████ 76
│ ████████████ 65
│ ████████ 43
└─────────────────────
```
- Horizontal bars for long labels
- Start at zero (truncated bars mislead)
- Order by value (unless natural order exists)

**Area Chart** — Volume over time, stacked composition
- Use stacked area for part-to-whole over time
- Ensure colors have enough contrast
- Consider 100% stacked for proportions

**Scatter Plot** — Correlation, distribution of two variables
- Use color/size for third dimension
- Add trend line to show correlation
- Handle overplotting (transparency, jitter)

## Chart Design Best Practices

### Visual Hierarchy
1. **Data** — Most prominent (highest contrast)
2. **Labels** — Supporting (medium contrast)
3. **Grid/axes** — Background (low contrast, subtle)

### Color Usage
```
Sequential:    Light → Dark (for magnitude)
              ░▒▓█

Diverging:     Color ← Neutral → Color (for +/-)
              █▓▒░ ░▒▓█

Categorical:   Distinct, accessible palette
              █ █ █ █ █ (max 5-7 colors)
```

### Accessible Palettes
- **Colorblind Safe**: Avoid Red/Green acting as the only differentiator.
- **Patterns**: Use dashed lines or textures for series differentiation.
- **Safe Pairs**: Blue/Orange, Purple/Green.
- **High Contrast**: Support system preference (thicker borders, distinct fills).

### Labeling
- **Title**: What is this showing? (not just "Chart")
- **Axis labels**: Include units
- **Data labels**: Directly on chart when possible (reduces eye movement)
- **Legend**: Near relevant data, avoid separate legend when possible

### Reduce Chart Junk
Remove:
- 3D effects (distort perception)
- Decorative gridlines
- Unnecessary borders
- Redundant legends
- Background colors (unless functional)

### Responsiveness
- Simplify for small screens (fewer data points, larger touch targets)
- Provide summary stats when chart can't fit
- Allow expand to full screen
- Horizontal scroll for time series on mobile

## Real-Time Data Visualization

### Streaming Data Patterns

**Live Line Chart**
```
Window approach:
│    ╱╲   ╱╲  ╱╲   ╱╲
│╱╲╱    ╲╱  ╲╱  ╲╱  ╲
└──────────────────────→ time
[← 5 minutes →] slides right
```
- Show rolling time window (last 5 min, last hour)
- Smooth transitions for new data points
- Option to pause/resume updates
- Show "live" indicator

**Real-Time Gauges**
```
        ╭──────╮
      ╱    ▲    ╲
     │     │     │    Current: 72%
     │   ╲ │ ╱   │    Target: 80%
      ╲   ─┴─   ╱
        ╰──────╯
         0   100
```
- Use for single KPIs with known range
- Show target/threshold lines
- Color changes at thresholds

### Update Animation
- Smooth transitions (300-500ms)
- Highlight new data briefly
- Don't animate if updates are too frequent (>1/second)

## Maritime-Specific Visualizations

### Vessel Position Map
```
┌─────────────────────────────────────┐
│                    ▲ Vessel A       │
│     ○ Port        ╱ (12 kts, N)     │
│                  ╱                  │
│                ╱                    │
│      - - - - ▲ Vessel B (anchored)  │
│            (predicted path)         │
│                                     │
│     ○ Port                          │
└─────────────────────────────────────┘

Legend:
▲ Vessel (arrow = heading)
● AIS position
○ Port
─ Historical track
- - Predicted path
```

**Map Features**:
- Vessel icons showing heading direction
- Historical track (past 24h, configurable)
- Predicted path based on speed/heading
- Port markers with names
- Vessel clusters at zoom levels
- Click for vessel details popup

### Voyage Timeline
```
Load Port        Discharge Port
   ○─────────────────●
   │                 │
   ▼                 ▼
[Rotterdam]     [Singapore]
 Jan 5            Jan 28
 
──●────○────○────○────●──────────→
  Load  Canal Waiting Discharge  Next
  3d    1d    2d     4d         voyage

Status: ● Complete  ○ In Progress  ◌ Planned
```

### Fleet Overview Grid
```
┌────────────┬────────────┬────────────┐
│ ▲ ALPHA    │ ▲ BETA     │ ⚓ GAMMA   │
│ En route   │ En route   │ At port    │
│ → Singapore│ → Dubai    │ Rotterdam  │
│ ETA: 3d    │ ETA: 7d    │ Dep: 2d    │
├────────────┼────────────┼────────────┤
│ ⚓ DELTA   │ ▲ EPSILON  │ ⚠ ZETA    │
│ At port    │ En route   │ Delayed    │
│ Houston    │ → Santos   │ Weather    │
│ Dep: 1d    │ ETA: 12d   │ +2d        │
└────────────┴────────────┴────────────┘
```

### Freight Rate Charts
```
Baltic Index (Time Series)
│2500
│    ╭──╮
│   ╱    ╲  ╭──
│  ╱      ╲╱
│1500
└────────────────────────
 Jan  Feb  Mar  Apr  May

Annotations:
↑ Market event markers
─ Moving average (30-day)
░ Confidence interval / range
```

### Port Congestion Visualization
```
Port Rotterdam
┌─────────────────────────────────────┐
│ Vessels waiting: 23 (+5 vs avg)     │
│ Avg wait time: 2.3 days             │
├─────────────────────────────────────┤
│ Wait time distribution:             │
│ <1d  ████████░░░░░░░ 12             │
│ 1-3d ██████████░░░░░ 8              │
│ >3d  ███░░░░░░░░░░░░ 3              │
└─────────────────────────────────────┘
```

### Distance/Duration Matrix
```
           Rotterdam  Singapore  Houston
Rotterdam     -          28d       14d
Singapore    28d          -        35d
Houston      14d         35d        -

Visual encoding:
░ Short  ▒ Medium  ▓ Long
```

### Vessel Performance Dashboard
```
┌──────────────────────────────────────────────────┐
│ MV Pacific Voyager                               │
├─────────────┬─────────────┬──────────────────────┤
│ Speed       │ Fuel        │ Efficiency           │
│   12.4 kts  │  45 MT/day  │   92%               │
│   ↓ 0.2     │   ↑ 2%      │   ↓ 3%              │
├─────────────┴─────────────┴──────────────────────┤
│ Speed vs Consumption (Scatter)                   │
│      •                                           │
│    • • •    Optimal zone                         │
│   •  ●  •  ┌───────────┐                        │
│     • •    │           │ Current: ●             │
│            └───────────┘                        │
└──────────────────────────────────────────────────┘
```

## Interactive Features

### Tooltips
```
Hover on data point:
┌──────────────────────┐
│ January 2025         │
│ Revenue: $1,234,567  │
│ vs LY: +12.4%        │
│ [View details →]     │
└──────────────────────┘
```
- Show on hover (desktop), tap (mobile)
- Formatted values with context
- Link to drill-down when available

### Zoom & Pan
- Click-drag to zoom to selection
- Mousewheel for zoom in/out
- Reset zoom button always visible
- Mini-map for context in large datasets

### Cross-Filtering
When clicking a chart element, filter other charts:
```
Click "January" in bar chart → 
  Line chart highlights January
  Table filters to January rows
  Map shows January positions
```

### Advanced Interactions
- **Sticky Tooltips**: Tooltip follows mouse vs. snaps to nearest point.
- **Drill-Down**:
  - Click bar → Filter dashboard → Show detailed table.
  - Maintains context (don't lose where you came from).
- **Brushing**: Drag to select range on one chart → highlights on others.

## Accessibility in Charts

- Don't rely on color alone (use patterns, labels)
- Provide data table alternative
- Keyboard navigation for interactive elements
- Screen reader descriptions for charts
- Sufficient contrast in all visual elements