---
name: dp-ui
description: >
  Applies visual design principles and enterprise/B2B UI patterns to produce polished, professional
  interface specs — visual hierarchy, 8px grid systems, design tokens, component specifications, and
  data-dense layouts. Use as Phase 3 of the DP workflow, or standalone when designing dashboards,
  complex tables, data-viz, or enterprise applications. Trigger with "/dp:ui", "visual design",
  "design tokens", "dashboard", "data-dense", "complex table", or "enterprise UI". For user flows,
  interaction states, and usability, use "/dp:ux" first; for color palettes, use "/dp:color".
---

# UI Design — Visual Principles & B2B Patterns

Create interfaces with the visual rigor of Stripe, the data density of Bloomberg, and the clarity of Linear — polished, professional, and built for power users.

---

## DP Workflow Integration

This skill is Phase 3 of the DP (Design Protocol) workflow. It automatically detects and integrates with the workflow when present.

### Detecting Workflow Mode

At the start of any invocation, detect the mode by checking for `.design/config.json`: if present, run in **workflow mode** (load prior-phase context, write outputs under `.design/`, update state, and hand off to the next phase); if absent, run in **standalone mode** (operate independently and offer to save output).

At the start of any `/dp:ui` invocation:

1. **Check for `.design/config.json`**
2. **If found** (workflow mode):
   - Load `.design/phases/DISCOVERY.md` for problem context
   - Load `.design/phases/UX-DECISIONS.md` for interaction patterns
   - Load `.design/REQUIREMENTS.md` for visual requirements
   - Check for `03-CONTEXT.md` if `/dp:discuss` was run first
   - Announce: "Loading context from discovery and UX phases..."
   - Display: "Components to design: [list from UX-DECISIONS.md]"
3. **If not found** (standalone mode):
   - Run with default behavior
   - Ask: "What would you like me to help design visually?"

### Context Loading (Workflow Mode)

When workflow documents exist, extract and display:

```
DP WORKFLOW ACTIVE
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

Ready to proceed? Or /dp:back to revisit UX decisions.
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

Write `.design/phases/UI-SPEC.md` using the full scaffold in **`references/ui-spec-template.md`** — it covers frontmatter, visual direction, layout/grid, visual hierarchy, the complete design-token tables (colors, typography, spacing, radius, shadows), per-component visual state specs, animation, responsive behavior, requirements coverage, and handoff notes. Fill every placeholder with project-specific values.

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
- **Action:** Completed UI phase with /dp:ui
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
→ /dp:eng_review to review implementation (recommended)

Or:
→ /dp:progress to review full status
→ /dp:back to revisit UX decisions

═══════════════════════════════════════════════════════════════════════════════
```

---

## Standalone Mode Behavior

When no `.design/` directory exists:

1. Output UI specifications inline (current behavior)
2. Ask standard handoff question:
   > "Would you like me to run `/dp:eng_review` to review the implementation?"
3. Optionally offer: "Or start a full DP workflow with `/dp:start`?"

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

---

## Workflow Navigation

```
                                                                                              ┌─────────┐
/dp:start    →    /dp:discovery    →    /dp:ux    →    /dp:execute    →                           │ YOU ARE  │    →    /dp:execute    →    /dp:eng_review    →    /dp:verify
                    Phase 1          Phase 2      (wireframe)                                  │  HERE   │         (polished)          Phase 4
                                                                                              │ Phase 3 │
                                                                                              └─────────┘
```

| | |
|---|---|
| **Previous** | `/dp:execute` — Wireframe implementation |
| **Current** | `/dp:ui` — Visual design & tokens (Phase 3) |
| **Next** | `/dp:execute` — Generate polished implementation |
| **Related** | `/dp:discuss` — Capture context before this phase |
| | `/dp:back` — Return to UX if flows need changes |
