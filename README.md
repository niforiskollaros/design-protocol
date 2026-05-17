# DP - Design Protocol

A complete design workflow system for Claude Code. Takes you from vague requirements to polished, reviewed implementations with **state management**, **implementation generation**, and **goal-backward verification**.

[![NPM Version](https://img.shields.io/npm/v/design-protocol?style=flat-square&logo=npm&logoColor=white&label=NPM&color=cb0000)](https://www.npmjs.com/package/design-protocol)
[![Downloads](https://img.shields.io/npm/dm/design-protocol?style=flat-square&logo=npm&logoColor=white&label=Downloads&color=cb0000)](https://www.npmjs.com/package/design-protocol)
[![GitHub Stars](https://img.shields.io/github/stars/niforiskollaros/design-protocol?style=flat-square&logo=github&logoColor=white&label=Stars&color=6e5494)](https://github.com/niforiskollaros/design-protocol)
[![License](https://img.shields.io/npm/l/design-protocol?style=flat-square&label=License&color=444444)](https://github.com/niforiskollaros/design-protocol/blob/main/LICENSE)

```
/dp:start → /dp:discovery → /dp:ux → /dp:execute → /dp:ui → /dp:execute → /dp:eng_review → /dp:verify
                               (wireframe)          (polished)
```

## Installation

```bash
npx design-protocol
```

### Options

```bash
npx design-protocol --global     # Install to ~/.claude/ (all projects)
npx design-protocol --local      # Install to ./.claude/ (current project)
npx design-protocol --uninstall  # Remove DP
```

### Updating

```bash
npx design-protocol --check-update  # Check for updates
npx design-protocol --update        # Update to latest version
npx design-protocol@latest          # Or install latest directly
```

## What's New in v2.2

- **Project auto-detection** — `/dp:execute` detects your framework, component directory, and dev server instead of assuming Next.js
- **State validation** — Commands validate `config.json` on load and offer to repair corrupted state
- **47-test suite** — Automated checks run before every publish (version sync, file integrity, no hardcoded paths)
- **`--verbose` flag** — Troubleshoot installs with `npx design-protocol --verbose`
- **Workflow navigation** — Every skill and command shows where you are in the pipeline and what comes next
- **Installer hardening** — Symlink protection, depth limits, clear error messages with file-level context

## Quick Start

```
/dp:start              # Begin a new design workflow
/dp:progress           # Check where you are
/dp:execute            # Generate implementation
/dp:verify             # Verify completeness
```

## Workflow

| # | Phase | Command | Output |
|---|-------|---------|--------|
| 1 | Discovery | `/dp:discovery` | DISCOVERY.md |
| -- | PRD (optional) | `/dp:prd` | PRD.md |
| -- | Journey Map (optional) | `/dp:journey` | JOURNEY-MAP.md |
| -- | Roadmap (optional) | `/dp:roadmap` | ROADMAP.md |
| 2 | UX | `/dp:ux` | UX-DECISIONS.md |
| 2a | Execute | `/dp:execute` | Wireframe components |
| -- | Color System (optional) | `/dp:color` | COLOR-SYSTEM.md |
| 3 | UI | `/dp:ui` | UI-SPEC.md |
| 3a | Execute | `/dp:execute` | Polished components |
| 4 | Review | `/dp:eng_review` | REVIEW.md |
| 5 | Verify | `/dp:verify` | Verification report |

## Commands

| Command | Description |
|---------|-------------|
| `/dp:start` | Initialize a new design project |
| `/dp:progress` | View workflow status with progress bar |
| `/dp:execute` | Generate implementation (wireframe or polished) |
| `/dp:discuss` | Capture decisions before a phase |
| `/dp:verify` | Goal-backward verification |
| `/dp:skip` | Skip current phase |
| `/dp:back` | Return to previous phase |
| `/dp:journey` | Run journey map as optional phase (cross-phase) |
| `/dp:roadmap` | Run roadmap as optional phase (cross-phase) |
| `/dp:storytell` | Generate audience-tuned presentation outline (cross-phase) |

## Skills

| Skill | Purpose |
|-------|---------|
| `/dp:discovery` | Discovery agent — interrogates requirements with heavy challenge mode |
| `/dp:prd` | PRD generation — interview-driven, stakeholder-ready or Claude Code-ready specs |
| `/dp:journey` | Customer journey maps, service blueprints, omnichannel experience maps (NNGroup) |
| `/dp:roadmap` | Theme-based UX roadmap with Now/Next/Future horizons (NNGroup) |
| `/dp:ux` | UX principles — user flows, states, accessibility, cognitive foundations |
| `/dp:color` | OKLCH palettes, shade ramps, contrast checking, color theory |
| `/dp:ui` | Visual design — grids, tokens, aesthetic archetypes, B2B patterns, data viz |
| `/dp:eng_review` | Code review — a11y, React patterns, spec alignment |
| `/dp:research` | Research planning — interviews, usability tests, synthesis |
| `/dp:storytell` | Audience-tuned presentation outlines for design work (cross-phase) |

## Implementation Generation

DP generates working code at two checkpoints:

### Wireframe Mode (After UX)
- Validates flow before visual polish
- Minimal styling (gray palette)
- Full functionality
- Output: Auto-detected component directory

### Polished Mode (After UI)
- Production-ready components
- Full Tailwind + shadcn/ui
- Design tokens applied
- Output: Auto-detected component directory

```
UX Decisions → /dp:execute → Test Flow → UI Spec → /dp:execute → Final Component
                   ↓                                      ↓
              Wireframe                              Polished
```

## State Management

DP creates a `.design/` directory to track progress:

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

`/dp:verify` performs goal-backward verification:

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

## Troubleshooting

### Skills not found after install

Restart Claude Code after installing. DP skills are loaded on startup.

```bash
# Verify files were installed
ls ~/.claude/skills/    # Should show: dp-discovery, dp-prd, dp-journey, dp-roadmap, dp-ux, dp-color, dp-ui, dp-eng_review, dp-research, dp-storytell
ls ~/.claude/commands/  # Should show: dp-*.md files
```

If files are missing, re-run the installer:
```bash
npx design-protocol@latest --global
```

### `.design/` already exists

If `/dp:start` finds an existing project, it will ask if you want to continue or start fresh. To manually archive:

```bash
mv .design .design-backup-$(date +%Y%m%d)
```

### Permission errors during install

```bash
# Check ~/.claude/ ownership
ls -la ~/.claude/

# If owned by root, fix it
sudo chown -R $(whoami) ~/.claude/
```

### `/dp:execute` can't find components directory

The execute command auto-detects your project structure by reading `package.json`. If detection fails, it will ask you where to place components. Make sure you run the command from your project root.

### Dev server not detected

`/dp:execute` looks for a running dev server on common ports (3000, 5173, 8080). If yours uses a different port, the command will provide the preview URL for manual access. Just run your dev server separately.

### shadcn/ui not detected (polished mode)

The command checks for `components.json` and `@/components/dp:ui/`. If you haven't installed shadcn yet:

```bash
npx shadcn@latest init
```

Or tell the command to generate without shadcn — it will use plain Tailwind instead.

## Requirements

- Claude Code CLI
- Node.js 14+

## License

MIT

---

Made with frustration at half-assed designs.
