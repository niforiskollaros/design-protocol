---
name: dp-start
description: Entry point to the DP (Design Protocol) workflow. Asks what the user needs and routes them — a full end-to-end design project, a single deliverable (PRD, journey, roadmap, color, research, UX, UI, review, presentation) run standalone or tracked, or an existing project. Creates the .design/ directory with config, roadmap, requirements, and state when a project is started. Run `/dp:start full` to skip the wizard.
---

# /dp:start — Initialize Design Project

You are the front door to the DP (Design Protocol) workflow. Your job is to understand what the user actually needs and route them to the right starting point — a full end-to-end project, a single deliverable, or an existing project — rather than assuming everyone wants the whole workflow.

**Escape hatch:** if the user runs `/dp:start full` (or says "just start the full workflow"), skip the wizard and go straight to Step 3 (full-workflow init).

## Workflow

### Step 1: Check for Existing Project

First, check if `.design/` already exists:

```bash
ls .design/config.json 2>/dev/null
```

**If exists:** Warn user and ask if they want to:
1. Continue existing project (show `/dp:progress`)
2. Archive and start fresh

**If not exists:** Proceed to Step 2.

### Step 2: Route the Intent (wizard)

Present this once, then let the user answer by number **or** by describing their need in their own words — infer the route from free text when they do.

```
What are you here to do?

  1. Design something end-to-end                → full workflow (default)
     Discovery → UX → UI → Review, plus any optional phases you choose

  2. Produce one specific deliverable
     a. PRD / product spec ............ /dp:prd
     b. Customer journey map .......... /dp:journey
     c. UX roadmap .................... /dp:roadmap
     d. Color system (OKLCH) .......... /dp:color
     e. Research plan ................. /dp:research
     f. UX review of existing UI ...... /dp:ux
     g. Visual / UI design ............ /dp:ui
     h. Code / accessibility review ... /dp:eng_review
     i. Stakeholder presentation ...... /dp:storytell

  3. Continue or check an existing project      → /dp:progress

Or just describe what you're trying to accomplish and I'll recommend a path.
```

**Routing:**

- **Choice 1 (full workflow)** → continue to Step 3. This is the default if the user is vague about scope or clearly wants to design a feature/product from scratch.
- **Choice 2 (one deliverable)** → ask the one question that matters:
  > "Run this as a **standalone** deliverable (no project files created), or **track it in a project** (creates `.design/` so later phases can build on it)?"
  - **Standalone** → do NOT create `.design/`. Invoke the mapped skill directly (it detects the absence of `.design/` and runs in standalone mode) and stop. Tell the user they can run `/dp:start` again anytime to set up a full project.
  - **Track it in a project** → create the `.design/` structure (Steps 3–5), set `optional_phases.<that_phase>.enabled` to `true`, set `workflow.workflow_status` to `"ready"`, then hand off to the mapped skill/command.
- **Choice 3 (existing project)** → run `/dp:progress` and stop.
- **Free-text** → map the described need to the closest route above, state your recommendation and why, and confirm before proceeding (e.g. *"Sounds like a one-off color system — I'd run `/dp:color` standalone. Sound right?"*).

### Step 3: Gather Project Information

Ask the user these questions to populate the project files:

**Project Basics:**
1. "What's the project or feature name?"
2. "In one sentence, what problem are we solving and for whom?"

**Users:**
3. "Who is the primary user? (role, not demographics)"
4. "What are they trying to accomplish?"

**Constraints:**
5. "Any known constraints? (technical, timeline, brand, etc.)"

**Settings:**
6. "How thorough should discovery be?
   - **Quick** (1-2 rounds) — You have good clarity already
   - **Standard** (2-4 rounds) — Typical feature work [default]
   - **Thorough** (4-6 rounds) — High-stakes or unclear requirements"

7. "Is this B2B/enterprise? (affects UI patterns)"

**Design system (detect first, ask second):**

8. Before asking anything, glob the repo for a design contract at the conventional locations:

```bash
ls DESIGN.md design.md docs/DESIGN.md design-system.md docs/design-system.md 2>/dev/null
ls IMPLEMENTATION.md docs/IMPLEMENTATION.md 2>/dev/null
```

   - **Exactly one contract found** → confirm, don't interrogate: "Found `DESIGN.md` — I'll treat it as your design contract: UI and color phases will apply its tokens instead of inventing new ones. Sound right?"
   - **Several found** → ask which one is canonical.
   - **None found** → ask once: "Do you have a design system file (a DESIGN.md — tokens, principles, component rules)? If yes, give me the path; if no, the UI phase will create tokens from scratch and you can adopt them as your DESIGN.md later."

   Record the contract path and the implementation adapter path (if any) — they populate `design_system` in config.json.

**Optional phases:**
9. "The core flow is always Discovery → UX → UI → Review. Do you want any optional phases enabled now? (you can add them later too)
   - **PRD** (1.5a) — a formal product spec
   - **Journey map** (1.5b) — a multi-step or omnichannel experience
   - **Roadmap** (1.5c) — theme-based Now/Next/Future planning
   - **Color system** (2b) — an OKLCH palette and tokens
   - **Research** (branch) — validate assumptions with users
   - **Storytelling** — stakeholder presentations
   Pick any, all, or none."

Record which optional phases the user selected — they drive the `enabled` flags in Step 5. (If a design contract was found in #8 and the user wants a color system, note that `/dp:color` will audit/extend the contract's palette rather than invent one.)

### Step 4: Create Directory Structure

Create the `.design/` directory with all files:

```
.design/
├── config.json
├── PROJECT.md
├── ROADMAP.md
├── REQUIREMENTS.md
├── STATE.md
└── phases/
    └── (created as phases complete)
```

### Step 5: Populate Files

**config.json:**
- Set `project_name` from answer #1
- Set `created` to current timestamp
- Set `settings.depth` based on answer #6
- Set `phases.ui.include_b2b` based on answer #7
- Set `design_system.path` and `design_system.implementation_path` from answer #8 (leave `null` if none), and `design_system.detected` to `true` when the file was found by globbing rather than user-supplied
- For each optional phase the user selected in answer #9, set `optional_phases.<phase>.enabled` to `true` (leave the rest `false`)
- Set `workflow.current_phase` to 1
- Set `workflow.workflow_status` to "ready"

**PROJECT.md:**
- Set project name and vision from answers #1, #2
- Set primary user from answers #3, #4
- Set constraints from answer #5

**ROADMAP.md:**
- Set project name
- Set created date

**REQUIREMENTS.md:**
- Set project name
- Leave requirements empty (populated during discovery)

**STATE.md:**
- Set Phase to "1 of 4 (Discovery)"
- Set Status to "ready"
- Set Progress bar to 0%
- Set last activity to initialization

### Step 6: Confirm and Offer Next Steps

After creating files, display (list any enabled optional phases so the user sees them):

```
✓ DP project initialized: [project_name]

Created:
  .design/config.json     — Workflow settings
  .design/PROJECT.md      — Design vision & constraints
  .design/ROADMAP.md      — Phase goals & success criteria
  .design/REQUIREMENTS.md — Trackable requirements
  .design/STATE.md        — Session state

Current Position:
  Phase: 1 of 4 (Discovery)
  Status: Ready
  Progress: [░░░░░░░░░░] 0%

Optional phases enabled: [list, or "none"]
Design contract: [path, or "none — UI phase will create tokens from scratch"]

Next Steps:
  1. /dp:discuss — Capture any known context before discovery
  2. /dp:discovery    — Start discovery interrogation

Ready to begin discovery?
```

If the user reached this step via a **one-off deliverable tracked in a project** (Step 2, choice 2 → "track it"), adjust the next-step suggestion to point at the mapped skill/command for that phase instead of discovery.

## File Templates

Use these inline templates as the base for each file, replacing placeholders with gathered information.

### config.json

```json
{
  "version": "1.0",
  "created": "",
  "project_name": "",
  "workflow": {
    "current_phase": 0,
    "phases_completed": [],
    "workflow_status": "not_started",
    "executions": {
      "wireframe": {
        "completed": false,
        "timestamp": null,
        "output_dir": null
      },
      "polished": {
        "completed": false,
        "timestamp": null,
        "output_dir": null
      }
    }
  },
  "settings": {
    "depth": "standard",
    "challenge_mode": "heavy"
  },
  "design_system": {
    "path": null,
    "implementation_path": null,
    "detected": false
  },
  "phases": {
    "discovery": {
      "enabled": true,
      "challenge_mode": "heavy",
      "depth": "standard"
    },
    "ux": {
      "enabled": true,
      "include_accessibility": true,
      "include_all_states": true
    },
    "ui": {
      "enabled": true,
      "include_b2b": false,
      "include_data_viz": false,
      "grid_system": "8px"
    },
    "review": {
      "enabled": true,
      "severity_threshold": "moderate",
      "include_spec_alignment": true
    }
  },
  "optional_phases": {
    "research": {
      "enabled": false,
      "methods": []
    },
    "prd": {
      "enabled": false,
      "completed": false,
      "timestamp": null,
      "output": null
    },
    "journey": {
      "enabled": false,
      "completed": false,
      "timestamp": null,
      "output": null
    },
    "roadmap": {
      "enabled": false,
      "completed": false,
      "timestamp": null,
      "output": null
    },
    "color": {
      "enabled": false,
      "completed": false,
      "timestamp": null,
      "output": null,
      "accessibility_level": "AA",
      "include_dark_mode": true
    },
    "storytell": {
      "presentations": []
    }
  }
}
```

### PROJECT.md

```markdown
# Design Project: [PROJECT_NAME]

> Created: [DATE]
> Status: [not_started | in_progress | complete]

## Design Vision

**One-liner:** [What is this and why does it matter?]

**Core Value Proposition:**
> What unique value does this design deliver to users?

## Target Users

### Primary User
| Attribute | Description |
|-----------|-------------|
| Role | |
| Goals | |
| Pain Points | |
| Expertise Level | |
| Usage Context | |

### Secondary Users
| Role | Relationship to Primary | Key Needs |
|------|------------------------|-----------|
| | | |

## Design Principles

> What principles guide design decisions for this project?

1. **[Principle 1]** — [Brief explanation]
2. **[Principle 2]** — [Brief explanation]
3. **[Principle 3]** — [Brief explanation]

## Constraints

### Technical Constraints
-

### Brand/Visual Constraints
-

### Timeline Constraints
-

### Business Constraints
-

## Success Criteria

| Metric | Current | Target | How Measured |
|--------|---------|--------|--------------|
| | | | |

## Key Decisions

> Log major design decisions here as they're made

| Date | Phase | Decision | Rationale | Decided By |
|------|-------|----------|-----------|------------|
| | | | | |

## References

- [Link to existing designs]
- [Link to brand guidelines]
- [Link to competitor examples]
- [Link to inspiration]

---

## Scope

### In Scope
-

### Out of Scope
-

### Future Considerations
-
```

### ROADMAP.md

```markdown
# Design Roadmap: [PROJECT_NAME]

> Created: [DATE]
> Target Completion: [DATE]

## Overview

Discovery ──► UX ──► UI ──► Review
    │
    └──► Research (optional branch)

---

## Phase 1: Discovery

**Goal:** Transform vague requirements into a bulletproof design brief
**Skill:** `/dp:discovery`

**Success Criteria:**
- [ ] Problem is clearly articulated
- [ ] Primary user is well-defined
- [ ] Requirements are prioritized
- [ ] Constraints are documented
- [ ] Success metrics are measurable

---

## Phase 2: UX

**Goal:** Apply usability principles to create intuitive user flows and interactions
**Skill:** `/dp:ux`

**Success Criteria:**
- [ ] User flow is complete end-to-end
- [ ] All interactive states are defined
- [ ] Accessibility requirements documented
- [ ] Usability principles applied with rationale

---

## Phase 3: UI

**Goal:** Apply visual design principles to create polished, professional interface specs
**Skill:** `/dp:ui`

**Success Criteria:**
- [ ] Visual hierarchy is clear (squint test)
- [ ] 8px grid system applied
- [ ] Design tokens specified
- [ ] Components are fully specified

---

## Phase 4: Review

**Goal:** Audit implementation for quality, accessibility, and spec alignment
**Skill:** `/dp:eng_review`

**Success Criteria:**
- [ ] No critical accessibility issues
- [ ] Quality score meets threshold
- [ ] Spec alignment verified
- [ ] All issues have recommended fixes

---

## Milestones

| Milestone | Phase | Deliverable | Target Date |
|-----------|-------|-------------|-------------|
| Brief Complete | Discovery | DISCOVERY.md | |
| Flows Complete | UX | UX-DECISIONS.md | |
| Spec Complete | UI | UI-SPEC.md | |
| Ready to Ship | Review | REVIEW.md + Score | |
```

### REQUIREMENTS.md

```markdown
# Design Requirements: [PROJECT_NAME]

> Created: [DATE]
> Last Updated: [DATE]

## Requirements Overview

| Category | Total | Complete | Verified |
|----------|-------|----------|----------|
| Usability | 0 | 0 | 0 |
| Accessibility | 0 | 0 | 0 |
| Visual | 0 | 0 | 0 |
| Technical | 0 | 0 | 0 |
| **Total** | **0** | **0** | **0** |

---

## Usability Requirements

| ID | Requirement | Priority | Phase | Status | Verified |
|----|-------------|----------|-------|--------|----------|
| UX-01 | | must | | pending | |

---

## Accessibility Requirements

| ID | Requirement | WCAG | Priority | Phase | Status | Verified |
|----|-------------|------|----------|-------|--------|----------|
| A11Y-01 | All images have alt text | 1.1.1 | must | ui | pending | |
| A11Y-02 | All interactive elements keyboard accessible | 2.1.1 | must | ux | pending | |
| A11Y-03 | Color is not only indicator | 1.4.1 | must | ui | pending | |
| A11Y-04 | Focus states visible | 2.4.7 | must | ui | pending | |
| A11Y-05 | Touch targets ≥44x44px | 2.5.5 | should | ui | pending | |
| A11Y-06 | Form inputs have labels | 1.3.1 | must | ux | pending | |

---

## Visual Requirements

| ID | Requirement | Priority | Phase | Status | Verified |
|----|-------------|----------|-------|--------|----------|
| VIS-01 | Follows 8px grid system | must | ui | pending | |
| VIS-02 | Clear visual hierarchy | must | ui | pending | |
| VIS-03 | Consistent spacing | must | ui | pending | |
| VIS-04 | Design tokens used | should | ui | pending | |

---

## Technical Requirements

| ID | Requirement | Priority | Phase | Status | Verified |
|----|-------------|----------|-------|--------|----------|
| TECH-01 | | must | | pending | |

---

## State Coverage Requirements

| Component | Default | Hover | Focus | Active | Disabled | Loading | Error | Empty | Success |
|-----------|---------|-------|-------|--------|----------|---------|-------|-------|---------|
| | ▢ | ▢ | ▢ | ▢ | ▢ | ▢ | ▢ | ▢ | ▢ |

**Legend:** ▢ = not specified, ◐ = partial, ● = complete
```

### STATE.md

```markdown
# DP Workflow State

> Last Updated: [TIMESTAMP]

## Current Position

Phase: [0-4] of 4 ([phase_name])
Status: [not_started | ready | in_progress | blocked | complete | gaps | verified]
Progress: [░░░░░░░░░░] 0%

## Phase Status

| # | Phase | Status | Completed | Output |
|---|-------|--------|-----------|--------|
| 1 | Discovery | pending | — | DISCOVERY.md |
| 2 | UX | pending | — | UX-DECISIONS.md |
| 2a | Execute | pending | — | Wireframe components |
| 3 | UI | pending | — | UI-SPEC.md |
| 3a | Execute | pending | — | Polished components |
| 4 | Review | pending | — | REVIEW.md |

## Session Continuity

### Last Activity
- **Date:** [TIMESTAMP]
- **Action:** [What was done]
- **Phase:** [Which phase]

### Where We Left Off
> Specific next action or decision point

## Next Actions

1. [ ]
2. [ ]
3. [ ]

---

## Quick Commands

- `/dp:progress` — View this state summary
- `/dp:execute` — Generate implementation
- `/dp:discuss` — Capture decisions before running a phase
- `/dp:skip` — Skip current phase
- `/dp:back` — Go back to previous phase
- `/dp:verify` — Check deliverables
```

## State Validation

After writing `config.json`, verify it by reading it back and checking:

1. **JSON is valid** — `JSON.parse()` succeeds
2. **Required fields present:**
   - `version` (string)
   - `project_name` (non-empty string)
   - `created` (ISO 8601 timestamp)
   - `workflow.current_phase` (number, 0-4)
   - `workflow.phases_completed` (array)
   - `workflow.workflow_status` (one of: `not_started`, `ready`, `in_progress`, `blocked`, `complete`, `gaps`, `verified`)
   - `phases.discovery`, `phases.ux`, `phases.ui`, `phases.review` (objects with `enabled` boolean)
   - `design_system` (object with `path`, `implementation_path`, `detected` — `path` may be `null`)
3. **Values are consistent:**
   - A fresh project has `current_phase: 1` and `workflow_status: "ready"` (Step 5 sets these — the raw template defaults of `0`/`not_started` must be overridden)
   - `phases_completed` is empty for a fresh project

If validation fails, fix the issue immediately before showing the success message.

## Error Handling

- If user cancels mid-flow, don't create partial directory
- If file write fails, report error and clean up `.design/` entirely
- If a single file fails, report which file and why

## Integration Notes

- This command creates the foundation for all other DP commands
- Skills detect `.design/config.json` to switch to workflow mode
- STATE.md is the source of truth for current position

---

## Workflow Navigation

| | |
|---|---|
| **This command** | `/dp:start` — Route the intent / initialize design project |
| **Skip the wizard** | `/dp:start full` — jump straight to full-workflow init |
| **Next step (full)** | `/dp:discuss` — Capture known context, then `/dp:discovery` — Start discovery |
| **Next step (deliverable)** | The mapped skill — e.g. `/dp:color`, `/dp:prd`, `/dp:journey` |
| **Check status** | `/dp:progress` — View workflow status |
