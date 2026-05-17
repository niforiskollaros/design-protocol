---
name: dp-start
description: Initialize a new DP (Design Protocol) design project with structured workflow. Creates .design/ directory with project config, roadmap, requirements, and state tracking.
---

# /dp:start — Initialize Design Project

You are initializing a new DP 2.0 design workflow. This creates the `.design/` directory structure and captures initial project context.

## Workflow

### Step 1: Check for Existing Project

First, check if `.design/` already exists:

```bash
ls .design/config.json 2>/dev/null
```

**If exists:** Warn user and ask if they want to:
1. Continue existing project (show `/dp:progress`)
2. Archive and start fresh

**If not exists:** Proceed with initialization.

### Step 2: Gather Project Information

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

### Step 3: Create Directory Structure

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

### Step 4: Populate Files

**config.json:**
- Set `project_name` from answer #1
- Set `created` to current timestamp
- Set `settings.depth` based on answer #6
- Set `phases.ui.include_b2b` based on answer #7
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

### Step 5: Confirm and Offer Next Steps

After creating files, display:

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

Next Steps:
  1. /dp:discuss — Capture any known context before discovery
  2. /dp:discovery    — Start discovery interrogation

Ready to begin discovery?
```

## File Templates

Use these inline templates as the base for each file, replacing placeholders with gathered information.

### config.json

```json
{
  "version": "2.1",
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
Status: [not_started | ready | in_progress | completed | blocked]
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
   - `workflow.workflow_status` (one of: `not_started`, `ready`, `in_progress`, `blocked`, `complete`, `gaps`)
   - `phases.discovery`, `phases.ux`, `phases.ui`, `phases.review` (objects with `enabled` boolean)
3. **Values are consistent:**
   - `current_phase` matches `workflow_status` (phase 0 = `ready`, not `complete`)
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
| **This command** | `/dp:start` — Initialize design project |
| **Next step** | `/dp:discuss` — Capture known context, then `/dp:discovery` — Start discovery |
| **Check status** | `/dp:progress` — View workflow status |
