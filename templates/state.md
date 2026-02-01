# DSP Workflow State

> Last Updated: [TIMESTAMP]

## Current Position

```
Phase: [0-4] of 4 ([phase_name])
Status: [not_started | ready | in_progress | completed | blocked]
Progress: [░░░░░░░░░░] 0%
```

## Phase Status

| # | Phase | Status | Completed | Output |
|---|-------|--------|-----------|--------|
| 1 | Discovery | pending | — | DISCOVERY.md |
| 2 | UX | pending | — | UX-DECISIONS.md |
| 2a | Execute | pending | — | Wireframe components |
| 3 | UI | pending | — | UI-SPEC.md |
| 3a | Execute | pending | — | Polished components |
| 4 | Review | pending | — | REVIEW.md |

**Optional:**
| Phase | Status | Output |
|-------|--------|--------|
| Research | not_enabled | research/*.md |

## Execution Status

| Mode | Status | Output Location | Preview URL |
|------|--------|-----------------|-------------|
| Wireframe | pending | — | — |
| Polished | pending | — | — |

## Session Continuity

### Last Activity
- **Date:** [TIMESTAMP]
- **Action:** [What was done]
- **Phase:** [Which phase]
- **User:** [Who was working]

### What Happened
> Brief summary of the last session's progress

### Where We Left Off
> Specific next action or decision point

## Accumulated Context

### Problem Summary
> One-paragraph summary of the problem being solved (from Discovery)

### Primary User
> Brief description of the primary user (from Discovery)

### Key Requirements
> Top 3-5 requirements that must be met

1.
2.
3.

### Major Decisions Made
> Key decisions from each completed phase

| Phase | Decision | Impact |
|-------|----------|--------|
| | | |

## Current Blockers

> Anything preventing progress

| Blocker | Phase | Resolution Needed |
|---------|-------|-------------------|
| | | |

## Next Actions

> What needs to happen next

1. [ ]
2. [ ]
3. [ ]

---

## Quick Commands

- `/dsp:progress` — View this state summary
- `/dsp:execute` — Generate implementation (wireframe or polished)
- `/dsp:discuss` — Capture decisions before running a phase
- `/dsp:skip` — Skip current phase
- `/dsp:back` — Go back to previous phase
- `/dsp:verify` — Check deliverables

## Phase Commands

- `/ux-jesus` — Run discovery (Phase 1)
- `/ux` — Run usability (Phase 2)
- `/dsp:execute` — Generate wireframe (after Phase 2)
- `/ui` — Run visual design (Phase 3)
- `/dsp:execute` — Generate polished (after Phase 3)
- `/design-engineer` — Run review (Phase 4)
- `/ux-research` — Run research (optional)
