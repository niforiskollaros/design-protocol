---
name: dp-color
description: Build an OKLCH color system as optional Phase 2b of the DP workflow. Runs between UX and UI. Wraps the dp-color skill and wires its output into .design/.
---

# /dp:color — Color System Phase

You are running the color-system phase of the DP workflow. Invoke the `dp-color` skill immediately.

## What this command does

Produces a perceptually-uniform OKLCH color system (palette, shade ramps, contrast matrix, tokens, dark-mode overrides) via the `dp-color` skill, and — in workflow mode — wires the result into `.design/` so `/dp:ui` picks up the tokens automatically.

## Workflow

### Step 1 — Detect workflow mode

```bash
ls .design/config.json 2>/dev/null
```

If found → workflow mode. Load:
- `.design/config.json` (read `optional_phases.color` for `enabled`, `accessibility_level`, `include_dark_mode`)
- `.design/phases/DISCOVERY.md` (brand constraints, tone, audience)
- `.design/phases/UX-DECISIONS.md` (semantic color needs, component list)
- `.design/phases/02b-CONTEXT.md` (if `/dp:discuss` was run)

If not found → standalone mode. The skill clarifies intent and outputs inline.

### Step 2 — Invoke the skill

Invoke the `dp-color` skill. It drives palette construction, gamut checks, contrast verification, and theory-grounded rationale.

### Step 3 — Write output

**Workflow mode:** write `.design/phases/COLOR-SYSTEM.md`, update `.design/STATE.md`, and set `optional_phases.color` in `config.json` to `{ "enabled": true, "completed": true, "timestamp": "<ISO 8601>", "output": "phases/COLOR-SYSTEM.md" }` (preserving `accessibility_level` and `include_dark_mode`).

**Standalone mode:** output inline; offer to save.

### Step 4 — Handoff

After completion: "Color system complete. Your tokens will be loaded automatically by `/dp:ui`. Ready to proceed with visual design?"

## Workflow Navigation

| | |
|---|---|
| **Previous** | `/dp:ux` — UX phase (Phase 2) |
| **This** | `/dp:color` — Color system (Phase 2b, optional) |
| **Next** | `/dp:ui` — Visual design (Phase 3) |
| **Related** | `/dp:discuss` — Capture context first |
