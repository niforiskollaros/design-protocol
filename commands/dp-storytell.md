---
name: dp-storytell
description: Transform design phase output into a ready-to-deliver presentation outline for a specific audience. Cross-phase skill — can be invoked after any DP phase.
---

# /dp:storytell — Build a Presentation

You are running the storytelling skill. Invoke the `dp-storytell` skill immediately.

## What this command does

Packages design work (from any DP phase or pasted content) into a structured narrative for a specific audience. Produces a complete presentation outline with opening hook, narrative arc, evidence package, Q&A prep, and delivery notes.

## Workflow

### Step 1 — Detect workflow mode

```bash
ls .design/config.json 2>/dev/null
```

If found → workflow mode. Ask which phase output to build the story from:
- Discovery (`.design/phases/DISCOVERY.md`)
- PRD (`.design/phases/PRD.md`)
- Journey map (`.design/phases/JOURNEY-MAP.md`)
- Roadmap (`.design/phases/ROADMAP.md`)
- Research findings (anything under `.design/research/` — e.g., `RESEARCH-PLAN.md`, `FINDINGS-*.md`)
- UX decisions (`.design/phases/UX-DECISIONS.md`)
- UI spec (`.design/phases/UI-SPEC.md`)
- Engineering review (`.design/phases/REVIEW.md`)
- Full workflow (all artifacts)

If not found → standalone mode. Ask the user to describe or paste the content.

### Step 2 — Gather framing

Ask:
- **Audience**: executive / peer / engineering / product / customer
- **Content type**: proposal / review / research readout / one-pager / demo / postmortem
- **Delivery mode**: live presentation / deck to read / memo / demo
- **Duration**: 5 / 15 / 30 / 60 min
- **Stakeholder starting position**: supportive / neutral / skeptical / hostile
- **Worst-case objection**: (to pre-empt in Q&A prep)

### Step 3 — Invoke the skill

The `dp-storytell` skill drives:
- Narrative framework selection (SCR, NABC, Minto, STAR, 3-Act, Story Spine, etc.)
- Beat-by-beat outline construction
- Evidence package assembly from source artifacts
- Q&A preparation
- SUCCESs check (Simple, Unexpected, Concrete, Credible, Emotional, Story)

### Step 4 — Write output

**Workflow mode:** writes `.design/phases/PRESENTATION-[topic].md` and appends `"phases/PRESENTATION-[topic].md"` to the `optional_phases.storytell.presentations` array in config.json (multiple presentations allowed).

**Standalone mode:** outputs inline; offers to save.

### Step 5 — Handoff

After completion, suggest:
- Review and edit the narrative arc
- Build deck/prototype/memo from the outline
- Rehearse with a trusted reviewer
- Run `/dp:storytell` again for a different audience (same source) if needed

> When to use vs. avoid this skill is defined in the `dp-storytell` skill description — Claude uses that for triggering. This wrapper only handles workflow invocation and `.design/` wiring.

## Workflow Navigation

| | |
|---|---|
| **Cross-phase** | Invokable from any DP phase |
| **Input** | Any phase artifact (or pasted content) |
| **This** | `/dp:storytell` — build a presentation |
| **Output** | PRESENTATION-[topic].md — beat-by-beat outline + Q&A prep |
| **Related** | `/dp:research` — add evidence if thin |
| | `/dp:verify` — typical predecessor |
| | `/dp:progress` — see other presentations |
