# UI-SPEC.md Output Template (Workflow Mode)

The full structure `/dp:ui` writes to `.design/phases/UI-SPEC.md` in workflow mode. Copy this scaffold and fill every placeholder.

## Contents

- Frontmatter
- Visual Direction
- Layout & Grid
- Visual Hierarchy
- Design Tokens (Colors, Typography, Spacing, Border Radius, Shadows)
- Component Visual Specifications
- Animation & Transitions
- Responsive Behavior
- Requirements Coverage
- Handoff Notes for Review Phase

---

```yaml
---
phase: ui
skill: ui
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
