---
name: dp-prd
description: Generate an industry-standard PRD as optional Phase 1.5a of the DP workflow. Runs between Discovery and UX, parallel to Journey (1.5b) and Roadmap (1.5c). Wraps the dp-prd skill and wires its output into .design/.
---

# /dp:prd — PRD Phase

You are running the PRD phase of the DP workflow. Invoke the `dp-prd` skill immediately.

## What this command does

Produces a complete, industry-standard Product Requirements Document via the `dp-prd` skill's interview-driven process, and — in workflow mode — wires the result into the `.design/` workflow so downstream phases can read it.

## Workflow

### Step 1 — Detect workflow mode

```bash
ls .design/config.json 2>/dev/null
```

If found → workflow mode. Load:
- `.design/config.json`
- `.design/phases/DISCOVERY.md` (reuse the problem, users, and requirements already gathered — do not re-interview for these)
- `.design/phases/01.5a-CONTEXT.md` (if `/dp:discuss` was run)

If not found → standalone mode. Ask whether to run the full DP workflow with `/dp:start`, or proceed standalone.

### Step 2 — Invoke the skill

Invoke the `dp-prd` skill. It drives persona/format/audience selection, the structured interview, optional competitive research, draft generation, and the refinement loop.

### Step 3 — Write output

**Workflow mode:** always write a Markdown copy to `.design/phases/PRD.md` (in addition to any docx/HTML the user requested), update `.design/STATE.md`, and set `optional_phases.prd` in `config.json` to `{ "enabled": true, "completed": true, "timestamp": "<ISO 8601>", "output": "phases/PRD.md" }`.

**Standalone mode:** output in the requested format(s); offer to save.

### Step 4 — Handoff

After completion, suggest the next step:
- `/dp:journey` — map the experience (Phase 1.5b)
- `/dp:ux` — continue to UX design (Phase 2)
- `/dp:research` — if the PRD surfaced hypotheses that need validation

## Workflow Navigation

| | |
|---|---|
| **Previous** | `/dp:discovery` — Discovery (Phase 1) |
| **This** | `/dp:prd` — PRD (Phase 1.5a) |
| **Parallel** | `/dp:journey` (1.5b), `/dp:roadmap` (1.5c) |
| **Next** | `/dp:ux` — UX phase (Phase 2) |
| **Related** | `/dp:discuss` — Capture context first |
