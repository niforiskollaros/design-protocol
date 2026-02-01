---
name: ui-excellence
description: Apply visual design principles and B2B/enterprise UI patterns to create polished, professional interfaces. Trigger with "/ui" or when designing dashboards, data-dense interfaces, complex tables, enterprise applications. Phase 3 of DSP workflow.
---

# UI Design — Visual Principles & B2B Patterns

Create interfaces with the visual rigor of Stripe, the data density of Bloomberg, and the clarity of Linear — polished, professional, and built for power users.

---

## DSP Workflow Integration

This skill is Phase 3 of the DSP (Design Shit Properly) workflow. It automatically detects and integrates with the workflow when present.

### Detecting Workflow Mode

At the start of any `/ui` invocation:

1. **Check for `.design/config.json`**
2. **If found** (workflow mode):
   - Load `.design/phases/DISCOVERY.md` for problem context
   - Load `.design/phases/UX-DECISIONS.md` for interaction patterns
   - Load `.design/REQUIREMENTS.md` for visual requirements
   - Check for `03-CONTEXT.md` if `/dsp:discuss` was run first
   - Announce: "Loading context from discovery and UX phases..."
   - Display: "Components to design: [list from UX-DECISIONS.md]"
3. **If not found** (standalone mode):
   - Run with default behavior
   - Ask: "What would you like me to help design visually?"

### Context Loading (Workflow Mode)

When workflow documents exist, extract and display:

```
DSP WORKFLOW ACTIVE
────────────────────────────────────────────────────────────────────────────────
Project: [name]
Phase: 3 of 4 (UI)
Previous: Discovery complete, UX complete

From Discovery:
• Problem: [problem statement one-liner]
• User: [primary user role]
• Constraints: [relevant visual/brand constraints]

From UX Decisions:
• Components to specify visually:
  - [Component 1] (9 states defined)
  - [Component 2] (6 states defined)
  - [Component 3] (4 states defined)
• Visual direction hints: [any from UX handoff]
• Accessibility requirements: [list]

Your Focus This Phase:
Apply visual design principles to create polished interface specifications.
────────────────────────────────────────────────────────────────────────────────

Ready to proceed? Or /dsp:back to revisit UX decisions.
```

### Context Sources

| From Discovery | Used For |
|----------------|----------|
| Problem statement | Design context |
| Primary user | Audience consideration |
| Constraints | Technical/timeline boundaries |
| Brand guidelines | Visual constraints |

| From UX-DECISIONS | Used For |
|-------------------|----------|
| Component list | Design targets |
| State coverage needed | Required visual states |
| Accessibility constraints | A11y requirements |
| Visual direction hints | Style guidance |
| User flow | Layout context |

---

## Workflow

1. **Combine with ux skill** — Always apply usability principles alongside visual design
2. **Apply visual fundamentals** — Check references/visual-design-principles.md for grids, hierarchy, Gestalt
3. **Use B2B patterns** — Check references/b2b-enterprise-patterns.md for dashboards, tables, complex workflows
4. **Data visualization** — Check references/data-visualization.md for charts, graphs, real-time data

---

## Core Visual Principles

### Visual Hierarchy
Establish clear importance through:
- **Size** — Larger = more important
- **Weight** — Bolder = more important
- **Color** — Higher contrast/saturation = more important
- **Position** — Top-left (in LTR) scans first
- **Whitespace** — Isolated elements draw attention

### Grid Systems
- Use 8px base grid for all spacing (4px for fine adjustments)
- 12-column grids for complex layouts
- Consistent gutters (16px, 24px, or 32px)
- Align everything — if it looks slightly off, it is

### The Gestalt Principles
- **Proximity** — Group related items close together
- **Similarity** — Similar items appear related
- **Continuity** — Eyes follow lines and curves
- **Closure** — Mind completes incomplete shapes
- **Figure/Ground** — Clear separation of content and background

### Whitespace
- Whitespace is not empty — it's a design element
- More whitespace around important elements
- Consistent spacing creates rhythm
- Dense ≠ cluttered (see Bloomberg, Linear)

---

## B2B Design Priorities

1. **Efficiency over delight** — Power users need speed, not whimsy
2. **Information density** — Show more, scroll less (when designed well)
3. **Keyboard shortcuts** — Essential for daily-use tools
4. **Customization** — Let users configure their workspace
5. **Bulk operations** — Multi-select, batch actions are expected
6. **Clear data hierarchy** — Most important metrics prominent

---

## Output Structure (Workflow Mode)

When in workflow mode, produce structured output:

### UI-SPEC.md Structure

```yaml
---
phase: ui
skill: ui-excellence
completed: YYYY-MM-DDTHH:MM:SSZ
context_loaded:
  - DISCOVERY.md
  - UX-DECISIONS.md
  - 03-CONTEXT.md (if existed)
requirements_addressed:
  - VIS-01
  - VIS-02
components_specified:
  - ComponentName1
  - ComponentName2
---

# UI Specification: [Feature Name]

## Visual Direction

**Style:** [Modern minimal / Dense professional / Playful / etc.]
**Inspiration:** [Reference products or styles]
**Key Principles:**
1. [Principle 1]
2. [Principle 2]
3. [Principle 3]

## Layout & Grid

**Grid System:** 8px base grid
**Columns:** [12-column / 6-column / custom]
**Gutters:** [16px / 24px / 32px]
**Max Width:** [1280px / 1440px / fluid]
**Breakpoints:**
| Breakpoint | Width | Columns | Gutter |
|------------|-------|---------|--------|
| Mobile | <640px | 4 | 16px |
| Tablet | 640-1024px | 8 | 24px |
| Desktop | >1024px | 12 | 24px |

## Visual Hierarchy

**Primary Focus:** [What draws eye first]
**Secondary Elements:** [Supporting content]
**Tertiary/Background:** [Less prominent items]

**Z-Index Layers:**
| Layer | Z-Index | Contents |
|-------|---------|----------|
| Base | 0 | Main content |
| Elevated | 10 | Cards, dropdowns |
| Modal | 100 | Modals, dialogs |
| Toast | 200 | Notifications |

## Design Tokens

### Colors

**Brand/Primary:**
| Token | Value | Usage |
|-------|-------|-------|
| --primary | [hex] | Primary actions, links |
| --primary-hover | [hex] | Hover state |
| --primary-foreground | [hex] | Text on primary |

**Semantic:**
| Token | Value | Usage |
|-------|-------|-------|
| --success | [hex] | Success states |
| --error | [hex] | Error states |
| --warning | [hex] | Warning states |
| --info | [hex] | Info states |

**Neutrals:**
| Token | Value | Usage |
|-------|-------|-------|
| --background | [hex] | Page background |
| --foreground | [hex] | Primary text |
| --muted | [hex] | Secondary text |
| --border | [hex] | Borders |

### Typography

**Font Family:**
- Headings: [Font name]
- Body: [Font name]
- Mono: [Font name]

**Scale:**
| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| --text-xs | 12px | 16px | 400 | Captions |
| --text-sm | 14px | 20px | 400 | Secondary |
| --text-base | 16px | 24px | 400 | Body |
| --text-lg | 18px | 28px | 500 | Emphasis |
| --text-xl | 20px | 28px | 600 | Subheadings |
| --text-2xl | 24px | 32px | 700 | Headings |
| --text-3xl | 30px | 36px | 700 | Page titles |

### Spacing

**Scale (8px base):**
| Token | Value | Usage |
|-------|-------|-------|
| --space-1 | 4px | Tight spacing |
| --space-2 | 8px | Default small |
| --space-3 | 12px | Medium small |
| --space-4 | 16px | Default |
| --space-5 | 20px | Medium |
| --space-6 | 24px | Large |
| --space-8 | 32px | Section gap |
| --space-10 | 40px | Large section |
| --space-12 | 48px | Page section |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| --radius-sm | 4px | Small elements |
| --radius-md | 6px | Default |
| --radius-lg | 8px | Cards |
| --radius-xl | 12px | Modals |
| --radius-full | 9999px | Pills, avatars |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| --shadow-sm | [box-shadow] | Subtle elevation |
| --shadow-md | [box-shadow] | Cards |
| --shadow-lg | [box-shadow] | Dropdowns |
| --shadow-xl | [box-shadow] | Modals |

## Component Visual Specifications

### [Component 1]: [Name]

**Dimensions:**
- Height: [value]
- Min Width: [value]
- Padding: [value]

**Visual States:**
| State | Background | Border | Text | Shadow | Other |
|-------|------------|--------|------|--------|-------|
| Default | [value] | [value] | [value] | [value] | |
| Hover | [value] | [value] | [value] | [value] | cursor: pointer |
| Focus | [value] | [value] | [value] | [value] | ring: 2px |
| Active | [value] | [value] | [value] | [value] | |
| Disabled | [value] | [value] | [value] | [value] | opacity: 0.5 |
| Loading | [value] | [value] | [value] | [value] | spinner |
| Error | [value] | [value] | [value] | [value] | |
| Success | [value] | [value] | [value] | [value] | |

**Tailwind Classes:**
```
Default: bg-background border border-border text-foreground rounded-md px-4 py-2
Hover: hover:bg-muted hover:border-primary
Focus: focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
...
```

**Variants:**
| Variant | Modifications |
|---------|---------------|
| Primary | bg-primary text-primary-foreground |
| Secondary | bg-secondary text-secondary-foreground |
| Outline | bg-transparent border-2 |
| Ghost | bg-transparent hover:bg-muted |

### [Component 2]: [Name]
...

## Animation & Transitions

**Default Transition:**
- Duration: 150ms
- Easing: ease-out
- Properties: color, background-color, border-color, opacity, transform

**Specific Animations:**
| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Modal enter | fade + scale | 200ms | ease-out |
| Modal exit | fade | 150ms | ease-in |
| Dropdown | slide-down | 150ms | ease-out |
| Toast | slide-in | 200ms | ease-out |

**Reduced Motion:**
- Respect `prefers-reduced-motion`
- Replace animations with instant changes

## Responsive Behavior

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| [Component 1] | [behavior] | [behavior] | [behavior] |
| [Component 2] | [behavior] | [behavior] | [behavior] |

## Requirements Coverage

| Requirement | Addressed By | Notes |
|-------------|--------------|-------|
| VIS-01: [text] | [Token/Component] | |
| VIS-02: [text] | [Token/Component] | |
| A11Y-03: Color independence | Semantic tokens | Icons + text for all states |

## Handoff Notes for Review Phase

- Implementation approach: [shadcn/ui components to use]
- Critical visual details: [list]
- Known compromises: [list]
- Testing priorities: [list]
```

---

## State Updates (Workflow Mode)

After completing UI specification:

1. **Write output to `.design/phases/UI-SPEC.md`**

2. **Update `.design/STATE.md`**:
```markdown
## Current Position
Phase: 3 of 4 (UI)
Status: completed
Progress: [███████░░░] 75%

### Last Activity
- **Date:** [TIMESTAMP]
- **Action:** Completed UI phase with /ui
- **User:** [session user]

### Accumulated Context
...
#### Major Decisions Made
| Phase | Decision | Impact |
|-------|----------|--------|
| Discovery | [decision] | [impact] |
| UX | [decision] | [impact] |
| UI | [key visual decision 1] | [impact] |
| UI | [key visual decision 2] | [impact] |
```

3. **Update `.design/config.json`**:
```json
{
  "workflow": {
    "current_phase": 4,
    "phases_completed": ["discovery", "ux", "ui"],
    "workflow_status": "in_progress"
  }
}
```

4. **Update `.design/REQUIREMENTS.md`** with addressed visual requirements

---

## Handoff (Workflow Mode)

```
═══════════════════════════════════════════════════════════════════════════════
UI SPECIFICATION COMPLETE
═══════════════════════════════════════════════════════════════════════════════

Output: .design/phases/UI-SPEC.md

Summary:
• Visual direction: [style]
• Grid system: 8px base, [N]-column layout
• Design tokens: [M] colors, [P] typography scales, [Q] spacing tokens
• Components specified: [list]
• All [N] UX states have visual specs

Progress: [███████░░░] 75%

Ready for Implementation & Review?
────────────────────────────────────────────────────────────────────────────────
→ /design-engineer to review implementation (recommended)

Or:
→ /dsp:progress to review full status
→ /dsp:back to revisit UX decisions

═══════════════════════════════════════════════════════════════════════════════
```

---

## Standalone Mode Behavior

When no `.design/` directory exists:

1. Output UI specifications inline (current behavior)
2. Ask standard handoff question:
   > "Would you like me to run `/design-engineer` to review the implementation?"
3. Optionally offer: "Or start a full DSP workflow with `/dsp:start`?"

---

## Implementation Checklist

Before finalizing any UI:

- [ ] Does it follow an 8px grid?
- [ ] Is the visual hierarchy clear? (squint test)
- [ ] Are related items grouped? (proximity)
- [ ] Is spacing consistent throughout?
- [ ] Do colors convey meaning consistently?
- [ ] Is information density appropriate for the audience?
- [ ] Are primary actions visually dominant?
- [ ] Does it work at different viewport sizes?

---

## Reference Files

- **references/visual-design-principles.md** — Grids, hierarchy, Gestalt, typography, color theory
- **references/b2b-enterprise-patterns.md** — Dashboards, tables, filters, complex forms, workflows
- **references/data-visualization.md** — Charts, graphs, real-time data, maritime-specific displays

---

## Config Integration

Respects these settings from `.design/config.json`:
```json
{
  "phases": {
    "ui": {
      "enabled": true,
      "includeB2B": true,
      "includeDataViz": false,
      "gridSystem": "8px"
    }
  }
}
```

When `includeB2B: true`, automatically apply B2B/enterprise patterns.
When `includeDataViz: true`, include data visualization guidance.
