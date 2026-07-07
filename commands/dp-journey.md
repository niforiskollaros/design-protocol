---
name: dp-journey
description: Build a customer journey map, service blueprint, or omnichannel experience map using NNGroup methodology. Optional phase 1.5b in DP workflow, runs between Discovery and UX.
---

# /dp:journey — Journey Mapping Phase

You are running the journey-mapping phase of the DP workflow. Invoke the `dp-journey` skill immediately.

## What this command does

Produces one of five journey artifacts using NNGroup's methodology:
- Customer journey map (default)
- Experience map
- Day-in-the-life map
- Service blueprint
- Omnichannel journey map

Each artifact follows Kaplan's 5 principles: establish why/what, base on truth, collaborate, don't rush to visualization, engage others.

## Workflow

### Step 1 — Detect workflow mode

```bash
ls .design/config.json 2>/dev/null
```

If found → workflow mode. Load:
- `.design/config.json`
- `.design/phases/DISCOVERY.md`
- `.design/phases/PRD.md` (if exists)
- Any research artifacts under `.design/research/` (e.g., `RESEARCH-PLAN.md`, `FINDINGS-*.md`)
- `.design/phases/01.5b-CONTEXT.md` (if `/dp:discuss` was run)

If not found → standalone mode. Ask the user whether they want to run the full DP workflow with `/dp:start`, or proceed standalone.

### Step 2 — Invoke the skill

Invoke the `dp-journey` skill. The skill drives:
- Artifact type selection
- Scope definition (actor + scenario)
- Research basis check (→ hypothesis mode if missing)
- Six-step synthesis process
- Output generation

### Step 3 — Write output

**Workflow mode:** writes `.design/phases/JOURNEY-MAP.md`, updates STATE.md, and sets `optional_phases.journey` in config.json to `{ "enabled": true, "completed": true, "timestamp": "<ISO 8601>", "output": "phases/JOURNEY-MAP.md" }`.

**Standalone mode:** outputs inline; offers to save.

### Step 4 — Handoff

After completion, suggest next step:
- `/dp:ux` — continue to UX phase (most common)
- `/dp:research` — if hypothesis-mode map needs validation
- `/dp:prd` — if PRD hasn't been generated and journey insights should feed it

> When to use vs. avoid this phase is defined in the `dp-journey` skill description — Claude uses that for triggering. This wrapper only handles workflow invocation and `.design/` wiring.

## Workflow Navigation

| | |
|---|---|
| **Previous** | `/dp:discovery` — Discovery (Phase 1) |
| **Parallel** | `/dp:prd` — PRD (Phase 1.5a) |
| **This** | `/dp:journey` — Journey mapping (Phase 1.5b) |
| **Next** | `/dp:ux` — UX phase (Phase 2) |
| **Related** | `/dp:research` — Validate hypotheses |
| | `/dp:discuss` — Capture context first |
| | `/dp:back` — Return to discovery |
