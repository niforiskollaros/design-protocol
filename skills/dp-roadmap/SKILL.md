---
name: dp-roadmap
description: >
  Build theme-based UX roadmaps using NNGroup's methodology (Sarah Gibbons). Trigger for
  "/dp:roadmap", UX roadmap, design roadmap, product roadmap, theme roadmap, now/next/future
  roadmap, roadmap workshop, prioritization session, quarterly planning. Optional Phase 1.5c of
  DP workflow. Produces strategic, living roadmap artifacts organized by themes (problems to
  solve) rather than features (things to build), with Now/Next/Future time horizons and explicit
  beneficiary/need/business-objective framing.
---

# UX Roadmapping

Build a strategic, living artifact that aligns, prioritizes, and communicates UX (or product) work across a cross-functional team. Based on Sarah Gibbons' NNGroup framework — problem-oriented, not feature-oriented; outcome-driven, not output-driven.

> **Roadmap (NNGroup, Gibbons):** *A strategic, living artifact that aligns, prioritizes, and communicates a UX team's future work and problems to solve.*

---

## When to Use This Skill

Run `/dp:roadmap` when you need to:

- **Plan quarterly or annual UX work** at a team or org level
- **Align cross-functional stakeholders** around a shared set of problems
- **Convert journey-map opportunities** into prioritized, time-bounded work
- **Communicate direction to leadership** without making feature commitments
- **Replace a feature-based roadmap** with a problem-based one
- **Re-plan after a major strategic shift**

**Don't use this skill for:**
- Sprint planning or backlog grooming — roadmaps are strategic, not tactical
- Feature specs or requirements — use `/dp:prd`
- Engineering roadmaps (tech debt, infrastructure) — this is UX/product-oriented
- Individual feature design — use `/dp:ux` + `/dp:ui`

---

## DP Workflow Integration

This skill is an optional sub-phase (Phase 1.5c) placed between Discovery and UX, parallel to PRD and Journey mapping. It can also run standalone for pure planning work.

### Detecting Workflow Mode

At the start of any invocation, detect the mode by checking for `.design/config.json`: if present, run in **workflow mode** (load prior-phase context, write outputs under `.design/`, update state, and hand off to the next phase); if absent, run in **standalone mode** (operate independently and offer to save output).

At the start of any `/dp:roadmap` invocation:

1. **Check for `.design/config.json`**
2. **If found** (workflow mode):
   - Load `.design/config.json` for settings
   - Load `.design/phases/DISCOVERY.md` for problem context
   - Load `.design/phases/JOURNEY-MAP.md` if exists (opportunities feed themes)
   - Load any research artifacts under `.design/research/` if any (findings feed themes) — this is where `/dp:research` writes, not under `phases/`
   - Load `.design/phases/PRD.md` if exists (check alignment)
   - Check for `.design/phases/01.5c-CONTEXT.md` if `/dp:discuss` was run first
   - Announce: "Running roadmap generation as part of DP workflow..."
3. **If not found** (standalone mode):
   - Ask: "Is this a new roadmap from scratch, or updating an existing one?"
   - Ask: "What level — team, product line, or whole org?"

### Pre-fill Rules (Workflow Mode)

| Field | Pre-fill Source | Action |
|---|---|---|
| High-level goals | DISCOVERY.md problem statement + business goals | Confirm + refine |
| Beneficiaries | DISCOVERY.md personas | Confirm |
| Needs (themes seed) | JOURNEY-MAP.md opportunities + RESEARCH findings | Review + expand |
| Business objectives | DISCOVERY.md success metrics | Expand into measurable outcomes |
| Product / experience areas | DISCOVERY.md existing landscape | Confirm |

**Workflow mode summary:**
```
DP WORKFLOW ACTIVE
────────────────────────────────────────────────────────────────────────────────
Project: [name]
Phase: 1.5c (UX Roadmapping — optional)
Previous: Discovery (complete) [+ Journey (complete) if run]
Next: UX (Phase 2)

Inputs loaded:
  Discovery ✓  Journey ◐  Research ◐  PRD ◐
  Themes seed count: [N opportunities identified]

I'll walk you through the 6-step process: Goals → Inputs → Themes → Prioritize → Visualize → Revisit.
────────────────────────────────────────────────────────────────────────────────
```

---

## Core Concepts (Vocabulary)

These terms are used precisely throughout the skill. Based on Gibbons' UX Roadmaps Vocabulary.

### The artifact and the practice
- **Roadmap (noun)** — a strategic, living artifact that aligns, prioritizes, and communicates future work and problems to solve
- **Roadmapping (verb)** — the process of identifying, aligning, and prioritizing a team's future work

### The three audiences
Every roadmap has three audiences. Design for all three.

| Role | Who | Relationship to roadmap |
|---|---|---|
| **Creator** | Owner / Manager | Authors and leads creation; accountable for quality |
| **Contributor** | Peer / team member | Contributes to and delivers the work |
| **Consumer** | Stakeholder / partner / customer | Reads and uses the roadmap; doesn't directly create or deliver it |

### The context dimension (framing)
Every roadmap has these framing fields so any reader can understand it:
- **Title** — the product, team, or portfolio the roadmap covers
- **Roadmap Owner** — the named creator (team or person)
- **Date** — when it was created or last updated
- **High-Level Goals** — the broader company/org strategy the roadmap serves

### Time horizons
NNGroup's canonical time-horizon model:

| Horizon | Definition | Specificity |
|---|---|---|
| **Completed** | Work just previously delivered (shown for context) | Concrete |
| **Now** | Work in progress or to be completed imminently | Well-defined, specific |
| **Next** | Near-future work starting in the next ~2 quarters | Medium specificity |
| **Future** | Work 6+ months away | Ambiguous, most likely to change |
| **Future++** | Potential future work — parking-lot or idea pool | Hypothesis-level |

**Critical rule:** specificity decreases with distance. Treat "Future" as direction, not commitment.

### The 9 theme components (primary + secondary)
Every theme on the roadmap can have these attributes:

**Primary (required):**
- **Theme** — a bundle of future UX work representing an area of focus, initiative, or problem to solve
- **Beneficiary** — the recipient of the value (customer, end user, buyer, internal user)
- **Need** — the problem being solved (the purpose of the work)
- **Business Objective** — the outcome from the business POV (new insight, user growth, engagement, discovery ease, revenue)

**Secondary (add as needed):**
- **Subtheme** — specifics: sub-goals, specific personas, pre-validated solutions, or discrete features already tested
- **Ownership (who)** — the person or team who will complete the work
- **Ownership (what)** — at a high level, the kind of work required
- **Product / Experience Area** — the area the work will touch
- **Confidence** — informal assessment of likely impact and demonstrated need (High / Medium / Low)
- **Disclaimers** — requirements or risks associated with the theme

---

## Feature-Based vs Theme-Based Roadmaps

This is the central distinction in NNGroup's framework.

| Dimension | Feature-based (traditional) | Theme-based (NNGroup recommended) |
|---|---|---|
| Primary unit | A feature to ship | A problem to solve |
| Orientation | Output | Outcome |
| Communication | "We will ship X by Q3" | "We will improve Y for beneficiary Z" |
| Flexibility | Locks in solutions early | Preserves solution space |
| Stakeholder effect | Creates commitment debt | Creates alignment on *why* |
| Works when | Solutions are already validated | Solutions are still being discovered |

**Default:** this skill produces theme-based roadmaps. Feature-level specificity belongs in the "Now" column (or in a PRD), not across the whole horizon.

---

## Four Roadmap Types (Gibbons)

Pick one format at the start. Can be mixed but discuss tradeoffs first.

| Type | Structure | Use when |
|---|---|---|
| **1. Now / Next / Future** (theme-based) | Three time columns × theme rows (canonical NNGroup) | Communicating direction cross-functionally; timelines uncertain |
| **2. Outcome-based** | Themes nest under outcome metrics | Org has clear outcome targets; work tied to measurable shifts |
| **3. Theme-based** (no horizons) | Themes ranked by priority, no time columns | Velocity is highly variable or timing can't be predicted |
| **4. Lean / low-fidelity** | Stripped-down sticky-note version | Early-stage workshops; polish would slow alignment |

See `references/roadmap-structures.md` for full templates per type, audience-specific variants (exec deck, team view, stakeholder one-pager), and visualization formats.

---

## The Six-Step Process (Gibbons)

The skill walks users through these six steps. Pre-workshop vs workshop vs post-workshop split indicated.

### Step 1 — Establish Goals (Pre)
- Confirm roadmap type (from the four above)
- Confirm audience mix (creator / contributor / consumer — who will consume this?)
- Define high-level goals this roadmap will serve
- Define scope (product, team, portfolio)

### Step 2 — Gather Inputs (Pre)
Collect raw material from:
- Research artifacts (interviews, usability tests, diary studies)
- Journey maps + their opportunities
- Analytics / quantitative signals
- Support/CS data (tickets, NPS comments)
- Stakeholder interviews (sales, marketing, leadership perspective)
- Existing PRDs / specs
- Competitive signals

**In workflow mode:** auto-load from `.design/phases/`.

### Step 3 — Create Themes (Workshop)
- Individual post-up of problems observed in the inputs
- Small-group convergence and theme naming
- Large-group affinity diagramming
- Name each theme using the pattern: *"For [beneficiary], [need] so that [business objective]"*
- Draft Beneficiary / Need / Business Objective per theme

### Step 4 — Prioritize (Workshop)
- Define prioritization criteria (see Prioritization Frameworks below)
- Score themes
- Place themes on the Now / Next / Future horizon
- Capture Confidence level per theme
- Note Disclaimers (risks, dependencies, open questions)

### Step 5 — Visualize & Share (Post)
- Produce the final artifact in a format appropriate to the Consumer audience
- Distribute via the org's channels (wiki, Miro, Figma, deck)
- Hold a read-out session for stakeholders

### Step 6 — Revisit (Post)
- Set a review cadence (typically monthly or quarterly)
- Define triggers for off-cycle updates (major strategy shift, research finding, incident)
- Assign the Roadmap Owner responsibility for the refresh

---

## Workshop Formats

The skill supports two NNGroup workshop structures. Pick based on how much time and research is available:

- **Format A — Single 3-Hour Workshop:** assumes inputs are already gathered. Good when research exists.
- **Format B — Two Workshops + Research:** better when inputs are thin and more research is needed between sessions.

See `references/roadmap-workshops.md` for full facilitation agendas for both formats, plus key exercises (hopes & fears, affinity diagramming, dot voting, strategy-collection interviews), stakeholder mapping, and revisit cadence.

---

## Writing Good Themes

A theme should read as a problem statement with a beneficiary and a desired outcome — not as a feature list.

**The pattern:**
> *"For [beneficiary], [need] so that [business objective]."*

**Quick tests:** name the beneficiary concretely; state the need without a solution; state the business objective as a measurable shift; and survive the "what else could solve this?" question (if it reduces to one solution, it's a feature in disguise).

See `references/theme-development.md` for deriving themes from inputs (research, journey maps, support signals), the full good-theme test set, good vs bad examples, theme anti-patterns, subthemes, confidence calibration, and source traceability.

---

## Prioritization Frameworks

Pick one framework per roadmap. Quick selection guide:

| Situation | Framework |
|---|---|
| Lots of data, need precision | RICE |
| Fast consensus in a workshop | ICE or Value/Effort |
| Scope negotiation with leadership | MoSCoW |
| Product strategy (new vs existing) | Kano |
| JTBD research available | Opportunity Scoring |
| Scaled agile / time-sensitive portfolio | WSJF |
| MVP scoping | Story Mapping (+ a ranker) |

See `references/prioritization-frameworks.md` for exact formulas, scales, fit, and pitfalls for all eight frameworks (RICE, ICE, MoSCoW, Kano, Value/Effort, WSJF, Opportunity Scoring, Story Mapping), plus universal pitfalls and NNGroup's stance.

---

## Common Anti-Patterns

The skill actively guards against feature-lists-as-themes, missing beneficiaries or business objectives, all-themes-in-Now, commitment creep, set-and-forget, single-audience design, missing prioritization rationale, and skipped confidence levels.

See `references/roadmap-structures.md` for the full 10-item roadmap anti-pattern list; `references/theme-development.md` for theme-specific anti-patterns; `references/roadmap-workshops.md` for workshop anti-patterns.

---

## Output Structure (Workflow Mode)

When in workflow mode, write the roadmap to `.design/phases/ROADMAP.md`.

See `references/roadmap-structures.md` → "Workflow-Mode Output Template (ROADMAP.md)" for the complete file template (YAML frontmatter, Context, Now/Next/Future tables, Themes in Detail, Prioritization Detail, Governance, Open Questions, Disclaimers).

---

## State Updates (Workflow Mode)

After completing the roadmap:

1. **Write output to `.design/phases/ROADMAP.md`**

2. **Update `.design/STATE.md`:**
```markdown
### Last Activity
- **Date:** [TIMESTAMP]
- **Action:** Completed UX roadmap with /dp:roadmap
- **Type:** [roadmap_type]
- **Themes count:** [N]

#### Major Decisions Made
| Phase | Decision | Impact |
|---|---|---|
| Roadmap | Top "Now" theme identified | [Drives UX priority] |
| Roadmap | Framework chosen: [RICE/ICE/etc.] | [Governs future reviews] |
```

3. **Update `.design/config.json`:**
```json
{
  "optional_phases": {
    "roadmap": {
      "enabled": true,
      "roadmap_type": "now_next_future",
      "prioritization_framework": "RICE",
      "review_cadence": "quarterly",
      "completed": true
    }
  },
  "workflow": {
    "phases_completed": [..., "roadmap"],
    "current_optional_phase": null
  }
}
```

**State-machine rules for this optional phase:**
- **On entry** (as soon as the user invokes `/dp:roadmap`): set `workflow.current_optional_phase` to `"roadmap"`.
- **On completion** (after writing ROADMAP.md): clear `workflow.current_optional_phase` to `null`. Do **not** change `workflow.current_phase` — the numeric main-phase value is governed by main workflow skills.

---

## Handoff (Workflow Mode)

```
═══════════════════════════════════════════════════════════════════════════════
ROADMAP COMPLETE
═══════════════════════════════════════════════════════════════════════════════

Output: .design/phases/ROADMAP.md

Summary:
• Type: [roadmap_type]
• Themes mapped: [N]
• Now: [X]  Next: [Y]  Future: [Z]
• Framework: [RICE / ICE / etc.]
• Review cadence: [monthly / quarterly]
• Next review: [date]

Ready for Next Phase?
────────────────────────────────────────────────────────────────────────────────
→ /dp:ux      — Continue to UX phase (work on Now themes)
→ /dp:prd     — Generate PRD for highest-priority theme
→ /dp:research — Close open questions / validate Future themes

Or:
→ /dp:progress — Review full status
→ /dp:back    — Revisit discovery
═══════════════════════════════════════════════════════════════════════════════
```

---

## Standalone Mode Behavior

When no `.design/` directory exists:

1. Ask: "New roadmap or updating existing?"
2. Ask scope: team / product / portfolio
3. Ask roadmap type (4 options)
4. Walk through 6-step process
5. Output inline
6. Offer: "Would you like to start a full DP workflow with `/dp:start`?"

---

## Reference Files

Load these as needed for detailed guidance:

- **references/roadmap-structures.md** — Full templates for each of the 4 roadmap types, plus audience-specific variants (exec deck, team view, stakeholder one-pager)
- **references/theme-development.md** — How to derive themes from inputs (research, journey maps, support tickets); good vs bad theme examples; theme evolution across horizons
- **references/prioritization-frameworks.md** — Detailed guides for RICE, ICE, MoSCoW, Kano, Value/Effort, Opportunity Scoring with examples and pitfalls
- **references/roadmap-workshops.md** — Full facilitation guides for both workshop formats, stakeholder interview templates, hopes-and-fears exercises, dot-voting mechanics

---

## Config Integration

Respects these settings from `.design/config.json`:

```json
{
  "optional_phases": {
    "roadmap": {
      "enabled": true,
      "roadmap_type": "now_next_future",
      "prioritization_framework": "RICE",
      "review_cadence": "quarterly",
      "include_confidence": true,
      "include_disclaimers": true,
      "workshop_format": "single_3hr"
    }
  }
}
```

---

## Workflow Navigation

```
                                                            ┌─────────┐
/dp:start → /dp:discovery → (/dp:prd) → (/dp:journey) → │ YOU ARE │ → /dp:ux → /dp:execute → /dp:ui → /dp:eng_review → /dp:verify
              Phase 1         Phase 1.5a    Phase 1.5b     │  HERE   │   Phase 2
                                                            │  1.5c   │
                                                            └─────────┘
```

| | |
|---|---|
| **Previous** | `/dp:discovery` — Discovery (Phase 1) |
| **Parallel** | `/dp:prd` — PRD (1.5a), `/dp:journey` — Journey mapping (1.5b) |
| **Current** | `/dp:roadmap` — UX roadmap (Phase 1.5c) |
| **Next** | `/dp:ux` — UX phase (Phase 2) |
| **Related** | `/dp:research` — Close open questions / validate Future themes |
| | `/dp:discuss` — Capture context before this phase |
| | `/dp:back` — Return to discovery if scope changes |
