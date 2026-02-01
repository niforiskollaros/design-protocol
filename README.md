# DSP - Design Shit Properly

A complete design workflow system for Claude Code. Takes you from vague requirements to polished, reviewed implementations with **state management**, **implementation generation**, and **goal-backward verification**.

```
/dsp:start → /ux-jesus → /ux → /dsp:execute → /ui → /dsp:execute → /design-engineer → /dsp:verify
                               (wireframe)          (polished)
```

## Installation

```bash
npx design-shit-properly
```

### Options

```bash
npx design-shit-properly --global     # Install to ~/.claude/ (all projects)
npx design-shit-properly --local      # Install to ./.claude/ (current project)
npx design-shit-properly --uninstall  # Remove DSP
```

## What's New in v2.1

- **Implementation Generation** - `/dsp:execute` creates working React components
- **Two-Stage Execution** - Wireframe (after UX) + Polished (after UI)
- **Goal-Backward Verification** - `/dsp:verify` checks truths, artifacts, and wiring
- **Full State Management** - Persistent workflow state in `.design/`
- **5 Specialized Skills** - ux-jesus, ux, ui, design-engineer, ux-research

## Quick Start

```
/dsp:start              # Begin a new design workflow
/dsp:progress           # Check where you are
/dsp:execute            # Generate implementation
/dsp:verify             # Verify completeness
```

## Workflow

| # | Phase | Command | Output |
|---|-------|---------|--------|
| 1 | Discovery | `/ux-jesus` | DISCOVERY.md |
| 2 | UX | `/ux` | UX-DECISIONS.md |
| 2a | Execute | `/dsp:execute` | Wireframe components |
| 3 | UI | `/ui` | UI-SPEC.md |
| 3a | Execute | `/dsp:execute` | Polished components |
| 4 | Review | `/design-engineer` | REVIEW.md |
| 5 | Verify | `/dsp:verify` | Verification report |

## Commands

| Command | Description |
|---------|-------------|
| `/dsp:start` | Initialize a new design project |
| `/dsp:progress` | View workflow status with progress bar |
| `/dsp:execute` | Generate implementation (wireframe or polished) |
| `/dsp:discuss` | Capture decisions before a phase |
| `/dsp:verify` | Goal-backward verification |
| `/dsp:skip` | Skip current phase |
| `/dsp:back` | Return to previous phase |

## Skills

| Skill | Purpose |
|-------|---------|
| `/ux-jesus` | Discovery agent - interrogates requirements with heavy challenge mode |
| `/ux` | UX principles - user flows, states, accessibility |
| `/ui` | Visual design - grids, tokens, B2B patterns |
| `/design-engineer` | Code review - a11y, React patterns, spec alignment |
| `/ux-research` | Research planning - interviews, usability tests, synthesis |

## Implementation Generation

DSP 2.1 generates working code at two checkpoints:

### Wireframe Mode (After UX)
- Validates flow before visual polish
- Minimal styling (gray palette)
- Full functionality
- Output: `src/components/{feature}/`

### Polished Mode (After UI)
- Production-ready components
- Full Tailwind + shadcn/ui
- Design tokens applied
- Output: `src/components/{feature}/`

```
UX Decisions → /dsp:execute → Test Flow → UI Spec → /dsp:execute → Final Component
                   ↓                                      ↓
              Wireframe                              Polished
```

## State Management

DSP creates a `.design/` directory to track progress:

```
.design/
├── config.json              # Workflow settings
├── PROJECT.md               # Design vision & constraints
├── REQUIREMENTS.md          # Trackable requirements
├── STATE.md                 # Current state and context
└── phases/
    ├── DISCOVERY.md         # Phase 1 output
    ├── UX-DECISIONS.md      # Phase 2 output
    ├── UI-SPEC.md           # Phase 3 output
    └── REVIEW.md            # Phase 4 output
```

## Verification

`/dsp:verify` performs goal-backward verification:

- **Truths** - What must be TRUE (problem defined, user understood, etc.)
- **Artifacts** - What must EXIST (phase documents)
- **Wiring** - What must CONNECT (requirements → UX → UI → Review)

## Configuration

```json
{
  "settings": {
    "depth": "standard",      // quick | standard | thorough
    "challenge_mode": "heavy" // light | heavy
  },
  "phases": {
    "ux": { "include_accessibility": true },
    "ui": { "include_b2b": true }
  }
}
```

## Standalone vs Workflow

All skills detect `.design/config.json`:

- **Workflow mode** - Full context, state updates, structured handoffs
- **Standalone mode** - Independent operation, inline output

## Requirements

- Claude Code CLI
- Node.js 14+

## License

MIT

---

Made with frustration at half-assed designs.
