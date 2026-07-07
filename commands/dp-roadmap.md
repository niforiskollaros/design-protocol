---
name: dp-roadmap
description: Build a theme-based UX roadmap using NNGroup's Now/Next/Future methodology. Optional Phase 1.5c in DP workflow, between Discovery and UX.
---

# /dp:roadmap — UX Roadmap Phase

You are running the UX roadmapping phase of the DP workflow. Invoke the `dp-roadmap` skill immediately.

## What this command does

Produces a strategic, living roadmap artifact using Sarah Gibbons' (NNGroup) methodology:
- Theme-based, not feature-based
- Now / Next / Future time horizons (default), or outcome-based / theme-ranked / lean variants
- Every theme includes Beneficiary, Need, Business Objective, Confidence, Disclaimers
- Integrates prioritization (RICE, ICE, MoSCoW, Kano, Value/Effort, or Opportunity Scoring)

## Workflow

### Step 1 — Detect workflow mode

```bash
ls .design/config.json 2>/dev/null
```

If found → workflow mode. Load:
- `.design/config.json`
- `.design/phases/DISCOVERY.md`
- `.design/phases/JOURNEY-MAP.md` (if exists)
- Any research artifacts under `.design/research/` (e.g., `RESEARCH-PLAN.md`, `FINDINGS-*.md`)
- `.design/phases/PRD.md` (if exists)
- `.design/phases/01.5c-CONTEXT.md` (if `/dp:discuss` was run)

If not found → standalone mode. Ask scope (team / product / portfolio) and whether new vs. updating.

### Step 2 — Invoke the skill

Invoke the `dp-roadmap` skill. The skill drives:
- Roadmap type selection (4 options)
- High-level goals and scope definition
- 6-step process: Goals → Inputs → Themes → Prioritize → Visualize → Revisit
- Prioritization framework selection
- Output generation

### Step 3 — Write output

**Workflow mode:** writes `.design/phases/ROADMAP.md`, updates STATE.md, and sets `optional_phases.roadmap` in config.json to `{ "enabled": true, "completed": true, "timestamp": "<ISO 8601>", "output": "phases/ROADMAP.md" }`.

**Standalone mode:** outputs inline; offers to save.

### Step 4 — Handoff

After completion, suggest next step:
- `/dp:ux` — continue to UX phase (work on Now themes)
- `/dp:prd` — generate PRD for highest-priority theme
- `/dp:research` — validate low-confidence Future themes

> When to use vs. avoid this phase is defined in the `dp-roadmap` skill description — Claude uses that for triggering. This wrapper only handles workflow invocation and `.design/` wiring.

## Workflow Navigation

| | |
|---|---|
| **Previous** | `/dp:discovery` — Discovery (Phase 1) |
| **Parallel** | `/dp:prd` (1.5a), `/dp:journey` (1.5b) |
| **This** | `/dp:roadmap` — Roadmap (Phase 1.5c) |
| **Next** | `/dp:ux` — UX phase (Phase 2) |
| **Related** | `/dp:research` — Close open questions |
| | `/dp:discuss` — Capture context first |
| | `/dp:back` — Return to discovery |
