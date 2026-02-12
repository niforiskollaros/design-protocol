# DSP - Design Shit Properly

A complete design workflow system for Claude Code. Takes you from vague requirements to polished, reviewed implementations with **state management**, **implementation generation**, and **goal-backward verification**.

[![NPM Version](https://img.shields.io/npm/v/design-shit-properly?style=flat-square&logo=npm&logoColor=white&label=NPM&color=cb0000)](https://www.npmjs.com/package/design-shit-properly)
[![Downloads](https://img.shields.io/npm/dm/design-shit-properly?style=flat-square&logo=npm&logoColor=white&label=Downloads&color=cb0000)](https://www.npmjs.com/package/design-shit-properly)
[![GitHub Stars](https://img.shields.io/github/stars/SignalOrg/design-shit-properly?style=flat-square&logo=github&logoColor=white&label=Stars&color=6e5494)](https://github.com/SignalOrg/design-shit-properly)
[![License](https://img.shields.io/npm/l/design-shit-properly?style=flat-square&label=License&color=444444)](https://github.com/SignalOrg/design-shit-properly/blob/main/LICENSE)

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

### Updating

```bash
npx design-shit-properly --check-update  # Check for updates
npx design-shit-properly --update        # Update to latest version
npx design-shit-properly@latest          # Or install latest directly
```

## What's New in v2.2

- **Project auto-detection** — `/dsp:execute` detects your framework, component directory, and dev server instead of assuming Next.js
- **State validation** — Commands validate `config.json` on load and offer to repair corrupted state
- **47-test suite** — Automated checks run before every publish (version sync, file integrity, no hardcoded paths)
- **`--verbose` flag** — Troubleshoot installs with `npx design-shit-properly --verbose`
- **Workflow navigation** — Every skill and command shows where you are in the pipeline and what comes next
- **Installer hardening** — Symlink protection, depth limits, clear error messages with file-level context

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

DSP generates working code at two checkpoints:

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

## Troubleshooting

### Skills not found after install

Restart Claude Code after installing. DSP skills are loaded on startup.

```bash
# Verify files were installed
ls ~/.claude/skills/    # Should show: ux-jesus, ux, ui, design-engineer, ux-research
ls ~/.claude/commands/  # Should show: dsp-*.md files
```

If files are missing, re-run the installer:
```bash
npx design-shit-properly@latest --global
```

### `.design/` already exists

If `/dsp:start` finds an existing project, it will ask if you want to continue or start fresh. To manually archive:

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

### `/dsp:execute` can't find components directory

The execute command auto-detects your project structure by reading `package.json`. If detection fails, it will ask you where to place components. Make sure you run the command from your project root.

### Dev server not detected

`/dsp:execute` looks for a running dev server on common ports (3000, 5173, 8080). If yours uses a different port, the command will provide the preview URL for manual access. Just run your dev server separately.

### shadcn/ui not detected (polished mode)

The command checks for `components.json` and `@/components/ui/`. If you haven't installed shadcn yet:

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
