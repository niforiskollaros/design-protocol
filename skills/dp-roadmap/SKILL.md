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

### 1. Now / Next / Future (theme-based)
The canonical NNGroup format. Three time columns × theme rows.

**Use when:** Communicating direction across a cross-functional audience, especially when timelines are uncertain.

### 2. Outcome-based
Organized by outcome metrics (e.g., "Reduce onboarding drop-off 20%"). Themes nest under outcomes.

**Use when:** The org has clear outcome targets and wants to tie work to measurable shifts.

### 3. Theme-based (without horizons)
Just themes ranked by priority, no time columns. Used when the team commits to themes but doesn't pre-allocate timing.

**Use when:** The team's velocity is highly variable or timing can't be predicted.

### 4. Lean / low-fidelity
A stripped-down sticky-note version. Used in early-stage workshops or when the roadmap is a living conversation, not a document.

**Use when:** Roadmapping is happening in a workshop and polish would slow alignment.

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

The skill supports two NNGroup workshop structures. Pick based on how much time and research is available.

### Format A — Single 3-Hour Workshop
Assumes inputs are already gathered. Good when research exists.

| Time | Activity |
|---|---|
| 25 min | Introduction — icebreaker + "Roadmap hopes & fears" exercise |
| 15 min | Read-out — present context and input-collection methods |
| 45 min | Distill themes — small groups read inputs, individual post-up, converge, name themes, playback |
| 20 min | Break |
| 30 min | Affinity diagramming — large group converges cluster insights |
| 45 min | Prioritization — criteria, scoring, playback |

**Post-workshop:** visualize and share within 48 hours.

### Format B — Two Workshops + Research
Better when inputs are thin and more research is needed.

**Workshop 1 (1 hour):**
| Time | Activity |
|---|---|
| 5 min | Intro + roadmap definition |
| 15 min | Hopes & fears — individual then cluster |
| 30 min | Strategy collection from stakeholders, small groups identify insights + cluster |
| 10 min | Open questions — flag research gaps |

**Between workshops:** research team closes open questions (competitive, user, stakeholder interviews).

**Workshop 2 (2 hours):**
| Time | Activity |
|---|---|
| 15 min | Intro + research recap |
| 30 min | Distill themes — individual post-up, converge, playback |
| 15 min | Break |
| 30 min | Affinity diagramming |
| 30 min | Prioritization |

---

## Writing Good Themes

A theme should read as a problem statement with a beneficiary and a desired outcome — not as a feature list.

### The pattern
> *"For [beneficiary], [need] so that [business objective]."*

### Examples

| Bad (feature-based) | Good (theme-based) |
|---|---|
| Build a new onboarding wizard | For first-time customers, reduce time-to-first-value so that trial-to-paid conversion increases |
| Redesign checkout | For returning shoppers, remove friction in checkout so that cart-abandonment drops |
| Add SSO | For IT buyers, meet enterprise auth requirements so that deals over $50k don't stall |
| Improve search | For knowledge-base users, surface relevant help earlier so that support contact rate decreases |

### Good theme tests
- Can you state the beneficiary in concrete terms?
- Can you state the need without naming a solution?
- Can you state the business objective as a measurable shift?
- Does the theme survive the "what else could solve this?" question? (If it reduces to one solution, it's a feature masquerading as a theme)

---

## Prioritization Frameworks

Pick one framework per roadmap. The skill explains each and helps the user choose.

### RICE (Intercom, Sean McBride)
Formula: **(Reach × Impact × Confidence) ÷ Effort**
- Reach: how many users affected per quarter (absolute number)
- Impact: per-user effect (3 = massive, 2 = high, 1 = medium, 0.5 = low, 0.25 = minimal)
- Confidence: how sure are we? (100% / 80% / 50%)
- Effort: person-months
- **Use when:** team has reasonable data on reach and impact

### ICE (Sean Ellis)
Formula: **Impact × Confidence × Ease** (all 1-10)
- Simpler than RICE, less rigor
- **Use when:** speed matters more than precision (early stage, workshops)

### MoSCoW
Must / Should / Could / Won't (this cycle)
- **Use when:** scope negotiation with stakeholders, not comparing alternatives

### Value vs Effort (2×2)
Plot each theme on a 2×2 matrix: high/low value × high/low effort. Quick wins = high value × low effort.
- **Use when:** early in workshops when data is thin and you need visual alignment fast

### Kano Model
Basic (expected), Performance (satisfaction scales with investment), Excitement (delighters), Indifferent, Reverse
- **Use when:** deciding between "improve existing" and "add new" across a portfolio

### Opportunity Scoring (Ulwick / JTBD)
Opportunity = Importance + max(Importance − Satisfaction, 0)
Survey users on importance of outcomes and satisfaction with current state. Largest opportunity = most important *and* most underserved.
- **Use when:** you have quantitative JTBD research

### Framework selection guide
| Situation | Framework |
|---|---|
| Lots of data, need precision | RICE |
| Fast consensus in a workshop | ICE or Value/Effort |
| Scope negotiation with leadership | MoSCoW |
| Product strategy (new vs existing) | Kano |
| JTBD research available | Opportunity Scoring |

---

## Common Anti-Patterns

The skill actively guards against these:

1. **Feature list dressed up as themes** — "Build X, ship Y, launch Z" is not a roadmap; it's a backlog
2. **No beneficiary named** — themes without a clear user/customer tend to serve the org, not the user
3. **All themes in "Now"** — signals inability to defer or prioritize; every roadmap needs a distribution across horizons
4. **Missing business objectives** — themes without outcomes can't be evaluated for success
5. **Commitment creep** — stakeholders treat "Future" themes as commitments; the roadmap should explicitly disclaim this
6. **Set-and-forget** — no review cadence = stale roadmap in 3 months
7. **Designed for only one audience** — creator-only view misses consumer needs (and vice versa)
8. **No prioritization rationale** — if you can't explain *why* A is before B, the roadmap won't survive its first pushback
9. **Confusing a UX roadmap with a product roadmap with a release plan** — different artifacts, different audiences, different purposes
10. **Skipping confidence levels** — treating all themes with the same certainty misleads consumers

---

## Output Structure (Workflow Mode)

When in workflow mode, write to `.design/phases/ROADMAP.md`:

```yaml
---
phase: roadmap
skill: dp-roadmap
roadmap_type: [now_next_future | outcome_based | theme_based | lean]
completed: YYYY-MM-DDTHH:MM:SSZ
owner: [role / person]
scope: [team / product / portfolio]
horizon: [e.g., Q2–Q4 2026]
themes_count: N
prioritization_framework: [RICE | ICE | MoSCoW | Value/Effort | Kano | Opportunity Scoring]
inputs_used:
  - DISCOVERY.md
  - JOURNEY-MAP.md
  - RESEARCH-interviews.md
review_cadence: [monthly | quarterly]
next_review: YYYY-MM-DD
---

# Roadmap: [Title]

> Type: [Now/Next/Future | Outcome-based | Theme-based | Lean]
> Owner: [Name / Role]
> Last updated: [Date]

## Context

**High-Level Goals**
- [Goal 1 — company / org strategy this serves]
- [Goal 2]
- [Goal 3]

**Scope**
[What is in / out of scope for this roadmap]

**Audience**
- Creator: [who]
- Contributors: [who]
- Consumers: [who]

---

## Roadmap

### Completed (just shipped)
| Theme | Beneficiary | Outcome achieved |
|---|---|---|
| [Theme] | [who] | [measurable shift] |

### Now
| # | Theme | Beneficiary | Need | Business Objective | Owner | Confidence | Disclaimers |
|---|---|---|---|---|---|---|---|
| 1 | [Name] | [who] | [problem] | [outcome] | [team] | H | [risk/dep] |

### Next (next ~2 quarters)
| # | Theme | Beneficiary | Need | Business Objective | Owner | Confidence | Disclaimers |
|---|---|---|---|---|---|---|---|
| 1 | [Name] | [who] | [problem] | [outcome] | [team] | M | [risk/dep] |

### Future (6+ months)
| # | Theme | Beneficiary | Need | Business Objective | Confidence | Disclaimers |
|---|---|---|---|---|---|---|---|
| 1 | [Name] | [who] | [problem] | [outcome] | L | [risk/dep] |

### Future++ (parking lot)
- [Idea 1 — source]
- [Idea 2 — source]

---

## Themes in Detail

### Theme 1: [Theme name]

**Pattern:** For [beneficiary], [need] so that [business objective].

- **Beneficiary:** [who]
- **Need:** [problem — no solution mentioned]
- **Business Objective:** [measurable shift]
- **Subthemes:**
  - [sub-goal 1]
  - [sub-goal 2]
- **Product / Experience Area:** [where]
- **Owner (who):** [team / role]
- **Owner (what):** [kind of work — research, redesign, new capability]
- **Confidence:** [H / M / L] — [rationale]
- **Disclaimers:** [risks, dependencies, open questions]
- **Prioritization score:** [framework] = [value]
- **Source inputs:** [research, journey opportunity, etc.]

[Repeat for each theme]

---

## Prioritization Detail

**Framework used:** [name]

**Scoring matrix:**
| Theme | [Criteria 1] | [Criteria 2] | [Criteria 3] | Score | Rank |
|---|---|---|---|---|---|
| T1 | [value] | [value] | [value] | [score] | 1 |

**Rationale for top 3:**
1. [Theme] — [why it ranks #1]
2. [Theme] — [why #2]
3. [Theme] — [why #3]

---

## Governance

- **Review cadence:** [monthly / quarterly]
- **Next scheduled review:** [date]
- **Update triggers (off-cycle):**
  - Major strategic shift
  - New research finding invalidates a theme
  - Delivery signal (theme completed or abandoned)
  - Leadership request
- **Versioning:** increment version on major refresh; track in git

---

## Open Questions

- [Question 1 — planned research to close]
- [Question 2]

---

## Disclaimers

- This roadmap is directional, not a commitment
- "Future" themes are likely to change as we learn
- Confidence levels reflect current evidence — not guaranteed outcomes
```

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
