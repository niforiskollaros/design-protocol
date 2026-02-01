---
name: dsp-start
description: Initialize a new DSP (Design Shit Properly) design project with structured workflow. Creates .design/ directory with project config, roadmap, requirements, and state tracking.
---

# /dsp:start — Initialize Design Project

You are initializing a new DSP 2.0 design workflow. This creates the `.design/` directory structure and captures initial project context.

## Workflow

### Step 1: Check for Existing Project

First, check if `.design/` already exists:

```bash
ls .design/config.json 2>/dev/null
```

**If exists:** Warn user and ask if they want to:
1. Continue existing project (show `/dsp:progress`)
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
✓ DSP project initialized: [project_name]

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
  1. /dsp:discuss — Capture any known context before discovery
  2. /ux-jesus    — Start discovery interrogation

Ready to begin discovery?
```

## File Templates

Use the templates from `/Users/nkollaros/Projects/DesignShitProperly/templates/` as the base for each file, replacing placeholders with gathered information.

## Error Handling

- If user cancels mid-flow, don't create partial directory
- If file write fails, report error and clean up
- If templates can't be read, fall back to inline templates

## Integration Notes

- This command creates the foundation for all other DSP commands
- Skills detect `.design/config.json` to switch to workflow mode
- STATE.md is the source of truth for current position
