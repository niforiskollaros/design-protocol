# DSP 2.1 — Design Shit Properly

A comprehensive design workflow framework with full state management, context engineering, goal-backward verification, and **implementation generation**.

---

## Quick Start

```bash
# Start a new design project
/dsp:start

# Or jump directly into a skill (standalone mode)
/ux-jesus    # Discovery
/ux          # Usability
/ui          # Visual design
/design-engineer  # Code review
```

---

## Overview

DSP 2.1 transforms vague requirements into production-quality implementations through a structured design process with **implementation generation** at key checkpoints.

```
                    ┌─────────────────────────────────────────────────────────┐
                    │                    DSP 2.1 WORKFLOW                     │
                    └─────────────────────────────────────────────────────────┘

/dsp:start → PROJECT.md + ROADMAP.md + REQUIREMENTS.md + STATE.md + config.json
                                              │
                                              ▼
                                         /ux-jesus
                                         (Phase 1)
                                              │
                                              ▼
                               ┌──────────────────────────────┐
                               │  DISCOVERY.md                │
                               │  (problem, users, reqs)      │
                               └──────────────────────────────┘
                                              │
              ┌───────────────────────────────┤
              ▼                               ▼
     /ux-research                          /ux
     (optional)                         (Phase 2)
              │                               │
              ▼                               ▼
     research/*.md              ┌──────────────────────────────┐
                                │  UX-DECISIONS.md             │
                                │  (flows, states, patterns)   │
                                └──────────────────────────────┘
                                              │
                                              ▼
                                       /dsp:execute
                                       (Wireframe)
                                              │
                                              ▼
                               ┌──────────────────────────────┐
                               │  src/components/{feature}/   │
                               │  Interactive wireframe       │
                               │  (validate flow in browser)  │
                               └──────────────────────────────┘
                                              │
                                              ▼
                                           /ui
                                        (Phase 3)
                                              │
                                              ▼
                               ┌──────────────────────────────┐
                               │  UI-SPEC.md                  │
                               │  (visual, tokens, specs)     │
                               └──────────────────────────────┘
                                              │
                                              ▼
                                       /dsp:execute
                                       (Polished)
                                              │
                                              ▼
                               ┌──────────────────────────────┐
                               │  src/components/{feature}/   │
                               │  Full React + Tailwind +     │
                               │  shadcn implementation       │
                               └──────────────────────────────┘
                                              │
                                              ▼
                                    /design-engineer
                                        (Phase 4)
                                              │
                                              ▼
                               ┌──────────────────────────────┐
                               │  REVIEW.md                   │
                               │  (quality score, issues)     │
                               └──────────────────────────────┘
                                              │
                                              ▼
                                       /dsp:verify
                                              │
                          ┌───────────────────┴───────────────────┐
                          ▼                                       ▼
                    PASSED                                  GAPS FOUND
                    (workflow complete)                     (iterate)
```

---

## Commands Reference

### Workflow Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/dsp:start` | Initialize design project | Beginning a new design effort |
| `/dsp:progress` | Show workflow status | Check current position and context |
| `/dsp:execute` | Generate working implementation | After UX (wireframe) or UI (polished) |
| `/dsp:discuss` | Capture decisions before a phase | Clarify direction before running skill |
| `/dsp:verify` | Verify design deliverables | After completing phases, before handoff |
| `/dsp:skip` | Skip current phase | Phase not needed or already done |
| `/dsp:back` | Return to previous phase | New info invalidates earlier decisions |

### Phase Skills

| Skill | Phase | Purpose | Output |
|-------|-------|---------|--------|
| `/ux-jesus` | 1. Discovery | Interrogate requirements, challenge assumptions | DISCOVERY.md |
| `/ux` | 2. UX | Apply usability principles, define behaviors | UX-DECISIONS.md |
| `/ui` | 3. Visual | Apply visual design, specify components | UI-SPEC.md |
| `/design-engineer` | 4. Review | Audit code, check spec alignment | REVIEW.md |
| `/ux-research` | Optional | Plan & execute user research | research/*.md |

---

## Directory Structure

### Framework Files (this repo)

```
DesignShitProperly/
├── CLAUDE.md                    # This file
├── templates/
│   ├── config.json              # Default workflow settings
│   ├── project.md               # Design vision template
│   ├── roadmap.md               # Phase goals template
│   ├── requirements.md          # Requirements tracking template
│   ├── state.md                 # Session state template
│   └── context.md               # Pre-phase context template
├── commands/
│   ├── dsp-start.md             # Initialize project
│   ├── dsp-progress.md          # Show status
│   ├── dsp-execute.md           # Generate implementation
│   ├── dsp-discuss.md           # Capture decisions
│   ├── dsp-verify.md            # Verify deliverables
│   ├── dsp-skip.md              # Skip phase
│   └── dsp-back.md              # Go back
├── agents/
│   ├── dsp-verifier.md          # Verification agent
│   └── dsp-researcher.md        # Research agent
└── skills/
    ├── ux-jesus/
    │   └── SKILL.md
    ├── ux-excellence/
    │   ├── SKILL.md
    │   └── references/
    ├── ui-excellence/
    │   ├── SKILL.md
    │   └── references/
    ├── design-engineer/
    │   ├── SKILL.md
    │   └── references/
    └── ux-research/
        ├── SKILL.md
        └── references/
```

### Runtime Directory (created by /dsp:start)

```
.design/
├── config.json                  # Workflow settings
├── PROJECT.md                   # Design vision & constraints
├── ROADMAP.md                   # Phase goals & success criteria
├── REQUIREMENTS.md              # Trackable requirements
├── STATE.md                     # Session state & context
├── research/                    # Optional research outputs
│   ├── RESEARCH-PLAN.md
│   └── FINDINGS-*.md
└── phases/
    ├── 01-CONTEXT.md            # Pre-discovery context (optional)
    ├── DISCOVERY.md             # /ux-jesus output
    ├── 02-CONTEXT.md            # Pre-UX context (optional)
    ├── UX-DECISIONS.md          # /ux output
    ├── 03-CONTEXT.md            # Pre-UI context (optional)
    ├── UI-SPEC.md               # /ui output
    ├── 04-CONTEXT.md            # Pre-review context (optional)
    └── REVIEW.md                # /design-engineer output
```

### Implementation Output (created by /dsp:execute)

```
src/
├── components/
│   └── {feature-name}/          # Generated components
│       ├── index.ts
│       ├── {feature-name}.tsx
│       ├── {component-1}.tsx
│       └── {component-2}.tsx
└── app/
    └── preview/
        └── {feature-name}/      # Preview page
            └── page.tsx
```

---

## Workflow Modes

### Workflow Mode (Recommended)

When `.design/config.json` exists, skills operate in workflow mode:

- **Context Loading**: Each skill loads previous phase outputs
- **State Persistence**: Progress tracked in STATE.md
- **Structured Handoffs**: Clear transitions between phases
- **Requirements Tracing**: Decisions map to requirements
- **Verification**: `/dsp:verify` checks completeness

### Standalone Mode

When no `.design/` directory exists, skills work independently:

- Output appears inline in conversation
- No state persistence between sessions
- Manual handoff prompts offered
- Good for quick reviews or single-phase work

---

## Phase Details

### Phase 1: Discovery (`/ux-jesus`)

**Goal:** Transform vague requirements into a bulletproof design brief

**Interrogation Domains:**
- Users & Context — Who, what goals, what workflow
- Business & Strategy — Why now, what's the bet
- Constraints & Dependencies — Technical limits, timeline, sacred cows
- Success & Measurement — How we'll know it worked
- Existing Landscape — Current state, competitors, history

**Challenge Mode:** Heavy by default (questions assumptions aggressively)

**Output Structure:**
- Executive Summary
- Problem Statement
- Users & Context
- Journey Map
- Requirements (must/should/could/must-not)
- Constraints
- Success Metrics
- Risks & Assumptions
- Action Plan

### Phase 2: UX (`/ux`)

**Goal:** Apply usability principles to design intuitive interactions

**Core Principles:**
- Clarity over cleverness
- Respect cognitive load
- Feedback & responsiveness
- Error prevention > error messages
- Consistency & predictability

**State Coverage Required:**
| State | Description |
|-------|-------------|
| Default | Normal resting state |
| Hover | Mouse over (desktop) |
| Focus | Keyboard focus (visible ring) |
| Active | Being clicked/tapped |
| Disabled | Cannot interact |
| Loading | Async operation |
| Error | Something went wrong |
| Empty | No content/data |
| Success | Operation completed |

**Output Structure:**
- User Flow
- Usability Principles Applied
- Key Decisions Table
- Component Behaviors & States
- Accessibility Requirements
- Error Handling
- Empty/Loading States
- Requirements Coverage

### Phase 3: UI (`/ui`)

**Goal:** Apply visual design principles for polished interfaces

**Core Principles:**
- Visual Hierarchy (size, weight, color, position, whitespace)
- Grid Systems (8px base, 12-column layouts)
- Gestalt Principles (proximity, similarity, continuity, closure)
- Whitespace as design element

**B2B Priorities:**
- Efficiency over delight
- Information density
- Keyboard shortcuts
- Customization
- Bulk operations

**Output Structure:**
- Visual Direction
- Layout & Grid
- Design Tokens (colors, typography, spacing, radius, shadows)
- Component Visual Specifications
- Animation & Transitions
- Responsive Behavior
- Requirements Coverage

### Phase 4: Review (`/design-engineer`)

**Goal:** Audit implementation for quality and spec alignment

**Review Categories:**
1. Accessibility (WCAG 2.1 AA)
2. Component Quality (shadcn/ui, state completeness, TypeScript)
3. Tailwind Consistency
4. React Patterns
5. Performance
6. Spec Alignment (workflow mode)

**Severity Levels:**
| Level | Meaning | Action |
|-------|---------|--------|
| Critical | Blocks shipping | Must fix |
| Serious | Blocks quality | Should fix |
| Moderate | Polish | Consider fixing |

**Scoring Rubric:**
| Score | Rating |
|-------|--------|
| 90-100 | Excellent |
| 80-89 | Good |
| 70-79 | Needs Work |
| 60-69 | Poor |
| <60 | Failing |

### Optional: Research (`/ux-research`)

**Goal:** Validate assumptions and gather user insights

**Methods:**
- User Interviews — Mental models, behaviors
- Usability Testing — Does design work
- Surveys — Quantitative patterns
- Contextual Inquiry — Real environment
- Card Sorting — Information architecture

**Can Branch From:** Any phase (most commonly Discovery)

**Feeds Back To:** Updates DISCOVERY.md with validated/invalidated assumptions

---

## Execution System (`/dsp:execute`)

DSP 2.1 generates working implementations at two checkpoints, allowing validation before committing to polish.

### Execution Modes

| Mode | Triggered After | Purpose | Output |
|------|-----------------|---------|--------|
| **Wireframe** | UX phase complete | Validate flow & interactions | Interactive prototype |
| **Polished** | UI phase complete | Validate visual design | Production-ready code |

### Why Two Execution Points?

```
Without execution checkpoints:
UX Decisions → UI Spec → Implementation → "Wait, this flow is wrong" → Redo everything 😤

With execution checkpoints:
UX Decisions → Execute → "Flow feels off" → Fix UX → Re-execute ✓
                                               ↓
                                          UI Spec → Execute → Verify visual → Review ✓
```

### Wireframe Mode (After UX)

Generates functional React components with minimal styling:

- **Styling:** Gray boxes, borders only (`bg-gray-100`, `border-gray-300`)
- **Functionality:** All states working, all interactions functional
- **Purpose:** Test the flow, not the visual design
- **Output:** `src/components/{feature-name}/`

```tsx
// Wireframe example - functional but unstyled
<input
  className="px-3 py-2 border border-gray-300 rounded"
  placeholder="Enter email"
/>
```

### Polished Mode (After UI)

Generates production-ready components with full styling:

- **Styling:** Full Tailwind classes from UI-SPEC.md
- **Components:** shadcn/ui integration
- **Design Tokens:** Colors, spacing, typography, shadows
- **Animations:** Per specification
- **Output:** `src/components/{feature-name}/`

```tsx
// Polished example - full visual treatment
<Input
  className={cn(
    'h-11 pr-10',
    error && 'border-destructive bg-destructive/10',
    isValid && 'border-green-500'
  )}
  placeholder="Enter email address"
/>
```

### Output Structure

```
src/components/{feature-name}/
├── index.ts                    # Barrel export
├── {feature-name}.tsx          # Main container component
├── {sub-component-1}.tsx       # Sub-component
├── {sub-component-2}.tsx       # Sub-component
└── types.ts                    # TypeScript interfaces

src/app/preview/{feature-name}/
└── page.tsx                    # Preview page for browser testing
```

### Preview & Iteration

After `/dsp:execute`:

1. Start dev server: `npm run dev`
2. Visit: `http://localhost:3000/preview/{feature-name}`
3. Test interactions and validate design
4. If issues found: Fix UX/UI specs → Re-run `/dsp:execute`
5. When satisfied: Continue to next phase

---

## Verification System

DSP 2.0 uses **goal-backward verification** (adapted from GSD):

### Design Truths (What must be TRUE)
- Problem is clearly defined
- User is well-understood
- Requirements are prioritized
- User flow is complete
- All states are specified
- Accessibility is addressed
- Visual hierarchy is clear
- Components are specified

### Design Artifacts (What must EXIST)
- DISCOVERY.md with problem statement
- UX-DECISIONS.md with user flows
- UI-SPEC.md with visual specs
- REVIEW.md with quality assessment

### Design Wiring (What must CONNECT)
- Requirements trace to design decisions
- UX decisions trace to UI specs
- UI specs provide implementation guidance

---

## Configuration

Default settings in `.design/config.json`:

```json
{
  "version": "2.0",
  "settings": {
    "depth": "standard",      // quick | standard | thorough
    "challenge_mode": "heavy" // light | heavy | heavy+
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
  }
}
```

---

## Usage Examples

### Starting a New Design Project

```
> /dsp:start

What's the project name? Campaign Scheduler

In one sentence, what problem are we solving?
Marketing team needs an easier way to schedule and manage campaigns.

Who is the primary user? Campaign Manager

How thorough should discovery be? Standard

Is this B2B/enterprise? Yes

✓ DSP project initialized: Campaign Scheduler
  Phase: 1 of 4 (Discovery)
  Progress: [░░░░░░░░░░] 0%

> /ux-jesus

DSP workflow detected. Loading project context...
I'm UX Jesus, here to make sure this feature is worthy.
Tell me what you've got...
```

### Checking Progress

```
> /dsp:progress

═══════════════════════════════════════════════════════════════════════════════
DSP WORKFLOW STATUS: Campaign Scheduler
═══════════════════════════════════════════════════════════════════════════════

Progress: [█████░░░░░] 50%

│ # │ Phase     │ Status    │ Output            │
│ 1 │ Discovery │ ● complete│ DISCOVERY.md      │
│ 2 │ UX        │ ● complete│ UX-DECISIONS.md   │
│ 3 │ UI        │ ◐ current │ UI-SPEC.md        │
│ 4 │ Review    │ ○ pending │ REVIEW.md         │

Context: Campaign Manager needs easier campaign scheduling...
```

### Verifying Completeness

```
> /dsp:verify

═══════════════════════════════════════════════════════════════════════════════
DSP VERIFICATION REPORT: Campaign Scheduler
═══════════════════════════════════════════════════════════════════════════════

Overall Status: GAPS FOUND

TRUTH VERIFICATION
✓ Problem clearly defined
✓ Primary user documented
◐ PARTIAL: All states not specified (missing: empty)
✓ Accessibility addressed

ARTIFACT VERIFICATION
✓ DISCOVERY.md exists and substantive
✓ UX-DECISIONS.md exists and substantive
✓ UI-SPEC.md exists and substantive

WIRING VERIFICATION
✓ Requirements → UX: 8/8 connected
◐ UX → UI: Missing empty state visual spec

RECOMMENDATIONS
1. [ ] Add empty state to UI-SPEC.md
```

---

## Reference Libraries

Skills reference these detailed guides:

**UX Excellence:**
- usability-principles.md — Nielsen's heuristics + modern interpretations
- accessibility-checklist.md — WCAG 2.1 AA compliance
- ux-patterns.md — States, feedback, navigation, forms
- product-excellence.md — Linear, Stripe, Notion patterns

**UI Excellence:**
- visual-design-principles.md — Grids, hierarchy, Gestalt, typography
- b2b-enterprise-patterns.md — Dashboards, tables, complex workflows
- data-visualization.md — Charts, graphs, real-time data

**Design Engineer:**
- code-review-checklist.md — Full audit criteria
- shadcn-patterns.md — Component usage patterns
- tailwind-conventions.md — Styling standards
- react-patterns.md — React 19 best practices

**UX Research:**
- method-selection.md — When to use which method
- interview-guide-template.md — Interview structure
- usability-test-template.md — Test scripts
- synthesis-methods.md — Data to insights

---

## Keyboard Shortcuts

| Action | Command |
|--------|---------|
| Start workflow | `/dsp:start` |
| Check status | `/dsp:progress` |
| Run discovery | `/ux-jesus` |
| Run UX | `/ux` |
| Generate wireframe | `/dsp:execute` (after UX) |
| Run UI | `/ui` |
| Generate polished | `/dsp:execute` (after UI) |
| Run review | `/design-engineer` |
| Run research | `/ux-research` |
| Verify | `/dsp:verify` |
| Skip phase | `/dsp:skip` |
| Go back | `/dsp:back` |

---

## Migration from DSP 1.0

If you have existing DSP skills without workflow integration:

1. Skills in `/Users/nkollaros/Projects/Claudeskills/skills/` remain unchanged
2. DSP 2.0 skills are in this repo with full workflow integration
3. Both can coexist — DSP 2.0 skills detect `.design/` to enable workflow mode
4. Without `.design/`, DSP 2.0 skills behave like original standalone skills

---

## Troubleshooting

**Skills not detecting workflow mode:**
- Ensure `.design/config.json` exists
- Run `/dsp:start` to initialize

**State seems stale:**
- Run `/dsp:progress` to see current state
- Check `.design/STATE.md` for last activity

**Want to restart:**
- Delete `.design/` directory
- Run `/dsp:start` again

**Verification failing:**
- Run `/dsp:verify` to see specific gaps
- Address critical gaps first
- Re-run verification after fixes

---

## Development & Sessions

This project tracks development sessions for continuity:

```
sessions/
├── INDEX.md                              # Running log of all sessions
├── DECISIONS.md                          # Architectural decisions
└── YYYY-MM-DD-topic-slug.md              # Individual session summaries
```

Use `/wrap-up` to document sessions and `/context` to load previous session context.

---

## Architectural Decisions

Key decisions made during DSP 2.0 development:

### Copy + Enhance Strategy
Skills are copied from Claudeskills to this repo rather than modified in place. This keeps DSP 2.0 self-contained, allows independent evolution, and preserves originals for other projects.

### Goal-Backward Verification
Adapted from GSD — verification checks what must be TRUE (truths), what must EXIST (artifacts), and what must CONNECT (wiring), rather than just "did the task run."

### Dual-Mode Operation
All skills detect `.design/config.json` to switch between workflow mode (full context, state updates) and standalone mode (original behavior). This provides backward compatibility and flexibility.

### Research as Branch
Research is an optional branch (not a phase) that can fork from any phase and feeds findings back. This accommodates varying research timing needs across projects.

### Two-Stage Execution
Implementation is generated at two checkpoints: after UX (wireframe) and after UI (polished). This allows validating flow before committing to visual polish, reducing wasted effort when UX issues are found late. Both outputs go to `src/components/` as real implementation code, not throwaway prototypes.

See `sessions/DECISIONS.md` for full decision records with rationale.
