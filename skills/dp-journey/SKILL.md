---
name: dp-journey
description: >
  Build customer journey maps, service blueprints, and omnichannel experience maps using NNGroup's
  methodology (Kaplan, Salazar, Gibbons, Kaley). Trigger for "/dp:journey", journey map, customer
  journey, experience map, service blueprint, touchpoint map, omnichannel journey, CX journey,
  onboarding journey, journey management. Optional Phase 1.5b of DP workflow — runs between
  Discovery and UX, parallel to PRD. Produces research-grounded journey artifacts with
  actor/scenario, phases, actions, thoughts, emotions, pain points, and opportunities.
---

# Journey Mapping & Experience Design

Create journey artifacts that align cross-functional teams around the *customer's* experience — not the organization's. Grounded in NNGroup's five-principle framework: shared vision, customer focus, collaborative, research-based, iterative.

---

## When to Use This Skill

Run `/dp:journey` when you need to:

- **Understand an existing experience** — map the current-state journey based on research
- **Envision a new experience** — design the future-state journey before UX details
- **Diagnose painful moments** — find the worst part of a multi-step experience
- **Align stakeholders** — create a shared artifact for a cross-functional team
- **Design across channels** — coordinate web, mobile, email, in-person, phone, chat
- **Extend a journey into operations** — use a service blueprint to align frontstage + backstage

**Don't use this skill for:**
- Single-screen UX decisions — use `/dp:ux`
- Feature specs — use `/dp:prd`
- User flow diagrams — those are part of UX, not journey mapping (flows are UI-centric; journeys are human-centric)

---

## DP Workflow Integration

This skill is an optional sub-phase (Phase 1.5b) placed between Discovery and UX, parallel to PRD.

### Detecting Workflow Mode

At the start of any invocation, detect the mode by checking for `.design/config.json`: if present, run in **workflow mode** (load prior-phase context, write outputs under `.design/`, update state, and hand off to the next phase); if absent, run in **standalone mode** (operate independently and offer to save output).

At the start of any `/dp:journey` invocation:

1. **Check for `.design/config.json`**
2. **If found** (workflow mode):
   - Load `.design/config.json` for settings
   - Load `.design/phases/DISCOVERY.md` for persona, problem, context
   - Load `.design/phases/PRD.md` if it exists
   - Load any research artifacts under `.design/research/` if research was run (e.g., `RESEARCH-PLAN.md`, `FINDINGS-*.md`) — this is where `/dp:research` writes, not under `phases/`
   - Check for `.design/phases/01.5b-CONTEXT.md` if `/dp:discuss` was run first
   - Announce: "Running journey mapping as part of DP workflow..."
3. **If not found** (standalone mode):
   - Run with default behavior
   - Ask: "Are we mapping an existing journey (current-state) or designing a new one (future-state)?"

### Pre-fill Rules (Workflow Mode)

| Field | Pre-fill Source | Interview Action |
|---|---|---|
| Actor / persona | DISCOVERY.md primary user | Confirm — only ask if ambiguous |
| Scenario | DISCOVERY.md problem statement | Refine — problem ≠ scenario |
| Goals & expectations | DISCOVERY.md user goals | Confirm |
| Known pain points | DISCOVERY.md + RESEARCH findings | Expand |
| Touchpoints / channels | DISCOVERY.md existing landscape | Ask for completeness |
| Research basis | RESEARCH files | Flag if none → "hypothesis mode" |

**Workflow mode summary message:**
```
DP WORKFLOW ACTIVE
────────────────────────────────────────────────────────────────────────────────
Project: [name]
Phase: 1.5b (Journey Mapping — optional)
Previous: Discovery (complete)
Next: UX (Phase 2)

Pre-filled from Discovery:
  Actor ✓  Scenario ◐  Goals ✓  Touchpoints ◐
  Research basis: [research artifacts found | NONE — hypothesis mode]

I'll confirm pre-filled sections and interview you on the gaps.
────────────────────────────────────────────────────────────────────────────────
```

---

## The Five NNGroup Principles (Kate Kaplan)

Every journey artifact this skill produces must honor these five principles — they double as process steps:

1. **Establish the "why" and the "what"** — A map without a business goal becomes decoration. Define the decision it will drive before starting.
2. **Base it on truth** — Ground the map in real qualitative research (interviews, observations, diary studies), supplemented by quantitative data. Assumption-based maps are dangerous. If research is missing, the skill enters **hypothesis mode** (see below) and flags every unverified claim.
3. **Don't design in a vacuum** — Collaborate across functions (product, engineering, support, marketing, ops) during synthesis, not just review. Co-creation produces buy-in; presentation produces compliance.
4. **Don't jump to visualization** — The insight work happens in synthesis. Visualizing too early locks in bad structure. Populate all swimlanes before styling the artifact.
5. **Engage others with the artifact** — Treat the map as an *interactive, living document rather than static output*. Maps are tools for alignment and action, not deliverables to file.

**Hypothesis mode:** If no user research exists, the skill proceeds but prefixes every actions/thoughts/emotions entry with `[HYPOTHESIS]` and adds a "Validation Plan" section recommending research methods.

---

## Journey Artifact Types

The skill supports five distinct artifact types. Pick one per invocation based on the user's goal (aligned with NNGroup's UX Mapping Cheat Sheet, Gibbons):

1. **Customer Journey Map** (default) — one actor, one scenario, tied to a specific product/service. Current-state (diagnostic) or future-state (vision) variants. Use to improve or design a specific flow.
2. **Experience Map** — generic human perspective across a whole domain, not tied to one product. Use for upstream discovery of a new category.
3. **Day-in-the-Life Map** — actions/thoughts/emotions across a person's whole day. Use to find new opportunities and design for moments, not screens.
4. **Service Blueprint** — extends the journey map *downward* into the organization (5 layers, 3 lines). Use when internal coordination/backstage is the bottleneck. See Service Blueprint Specifics below.
5. **Omnichannel Journey Map** — channel switching is first-class (Channel + Device rows + transition markers). Use when the experience spans 2+ channels and handoff quality matters. See Omnichannel Specifics below.

See `references/journey-types.md` for the decision tree, comparison matrix, and worked examples of each type, and `references/map-structures.md` for the full swimlane template per type.

### Related but NOT produced by this skill
- **Empathy Map** (Says/Thinks/Feels/Does quadrants) — attitudinal, not chronological. Use `/dp:research` synthesis instead.
- **User Flow Diagram** — screen-by-screen, UI-centric. Use `/dp:ux`.

---

## The Six-Step Process

The skill runs the user through these six steps. Each has a clear input and output.

### Step 1 — Define scope
- Pick artifact type (from the four above)
- Confirm actor (persona): one persona per map
- Define scenario: specific, time-bounded, outcome-oriented
- State the actor's expectations entering the scenario
- Define phases: 4-7 high-level stages (Awareness → Consideration → Purchase → Onboarding → Usage → Advocacy is a common template; customize per domain)

**Anti-pattern:** scenarios like "uses our product" (too broad). Good: "renews an expiring subscription from a billing email."

### Step 2 — Gather inputs
- Research artifacts: interviews, usability tests, support tickets, analytics
- Existing docs: personas, flow diagrams, SOPs
- Stakeholder knowledge: CS team, sales, ops
- If workflow mode with research: load automatically
- If no research: enter hypothesis mode and log the gap

### Step 3 — Synthesize per phase
For each phase, fill in these swimlanes:

| Swimlane | Question it answers | Source |
|---|---|---|
| **Actions** | What does the actor do? | Observable behavior |
| **Thoughts / Mindset** | What are they thinking? | Interview quotes |
| **Emotions** | How do they feel? (1-5 scale or curve) | Observed + self-reported |
| **Touchpoints** | What interfaces/channels do they use? | Channel inventory |
| **Pain Points** | What's frustrating? | Research signals |
| **Opportunities** | Where could we improve? | Derived insight |
| **Internal Ownership** | Which team owns each part? | Org map |

For service blueprints, add:
| **Frontstage** | What does the employee/system do visibly? |
| **Backstage** | What happens behind the scenes? |
| **Support Processes** | What enables backstage actions? |

For omnichannel maps, mark every **Channel Transition** as a first-class event with:
- Source channel → destination channel
- What context carries over (or doesn't)
- Failure modes if context is lost

### Step 4 — Draft the artifact
Produce the structured markdown output (see Output Structure below).

### Step 5 — Validate with stakeholders (offline step)
The skill outputs a "Validation Checklist" section listing who should review each swimlane.

### Step 6 — Identify next actions
- Top 3 opportunity zones (ranked by severity × reach × strategic fit)
- Suggested research to close [HYPOTHESIS] entries
- Handoff to UX phase

---

## Journey Map Anatomy

Every journey map this skill produces uses NNGroup's Zone A/B/C model: **Zone A** (the lens — Actor + Scenario + Expectations) → **Zone B** (the experience — Phases with Actions, Thoughts, Emotion curve, Touchpoints) → **Zone C** (the insights — Pain Points, Opportunities, Ownership, Metrics). See `references/map-structures.md` for the full anatomy diagram and per-type templates.

---

## Omnichannel Specifics

When artifact type is "Omnichannel Journey Map":

- **Apply NNGroup's 5 components of omnichannel UX** (Flaherty): Consistent, Optimized (for context), Seamless, Orchestrated, Collaborative — *consistent what, contextual how.*
- **Define touchpoints precisely** (Salazar): a touchpoint = **channel × device × task**. Build a touchpoint inventory enumerating every combo the actor hits.
- **Treat channel transitions as first-class events** — at every handoff, document what context *should* carry over, what *actually* carries over, and the failure mode if it's lost.
- **Name the tier in the output**: Multichannel (siloed) vs Cross-channel (coordinated) vs Omnichannel (unified, designed transitions). Most orgs believe they are omnichannel but operate lower — state it honestly.

See `references/omnichannel-patterns.md` for the full 5-component definitions, touchpoint-inventory build steps, channel transition patterns, anti-patterns, and the maturity self-assessment.

---

## Service Blueprint Specifics

When artifact type is "Service Blueprint", the map extends *downward* into the organization:

- **5 layers** (top to bottom): Physical/Digital Evidence → Customer Actions (this IS the journey row) → Frontstage Actions → Backstage Actions → Support Processes.
- **3 lines**: Line of Interaction (Customer ↔ Frontstage), Line of Visibility (Frontstage ↔ Backstage), Line of Internal Interaction (Backstage ↔ Support).
- **When to use:** failures happen backstage but surface frontstage; cross-team coordination is the real problem (not UI); designing a new service, not just an interface.

See `references/map-structures.md` §4 for the full layer definitions, the visibility-of-action nuance, and the 5-step building process.

---

## Journey Mapping vs. Journey Management

A one-time map is an *artifact*. A managed journey is an *operating practice*. This skill produces the artifact but also equips the team for the practice.

**Journey management** (NNGroup, Sarah Gibbons): *"the ongoing practice of researching, measuring, optimizing, and orchestrating a customer journey to improve the customer experience for users and achieve business goals."*

### The 3 competencies of journey management
1. **Collecting insights** — continuous research into the journey (not once at kickoff)
2. **Analyzing insights to drive design strategy** — turning observations into roadmap decisions
3. **Orchestrating journey experiences for users** — delivering the right interaction at the right moment

### What "managed" journeys have that one-off maps don't
- **A single named owner** (RACI "A") responsible for the journey end-to-end
- **A review cadence** (typically monthly/quarterly) — without this, the map drifts from reality within ~6 months
- **Metrics tied to the journey** across three tiers:
  - *Experience KPIs*: NPS, CSAT, CES (Customer Effort Score)
  - *Behavioral KPIs*: completion rate, drop-off rate, time-to-complete
  - *Business KPIs*: revenue per user, retention, cost-to-serve
- **A validation plan** — research planned for the most-risky hypotheses
- **A connection to delivery** — insights feed concrete roadmap items with owners

The skill's output includes an **Ownership & Governance** section to seed these practices. Whether the team operationalizes it is organizational maturity — the skill flags when a project warrants managed-journey treatment (e.g., multi-team service, omnichannel, high customer-effort journey).

---

## Hypothesis Mode

When no research is available, the skill:

1. Proceeds with map creation based on stakeholder input and domain knowledge
2. Prefixes every Thoughts / Emotions / Pain Points entry with `[HYPOTHESIS]`
3. Adds a **Validation Plan** section listing:
   - 5-8 specific research questions to validate key claims
   - Recommended method per question (interview / usability test / survey / diary study / analytics pull)
   - Priority order (highest-risk hypotheses first)
4. Adds a banner to the output: `⚠ HYPOTHESIS-BASED — Not validated with research`

This honors the "Research-based" principle while letting teams move forward when research isn't yet available.

---

## Output Structure (Workflow Mode)

When in workflow mode, write the journey artifact to `.design/phases/JOURNEY-MAP.md`.

The file begins with a YAML frontmatter block (keys: `phase`, `skill`, `artifact_type`, `completed`, `mode`, `actor`, `scenario`, `phases_count`, `research_sources`, `validation_status`) followed by the body in Zone A → Zone B → Zone C order, plus conditional sections for Service Blueprint (Backstage Analysis), Omnichannel (Channel Transition Analysis), and Hypothesis Mode (Validation Plan), then Handoff Notes for UX.

See `references/map-structures.md` → "JOURNEY-MAP.md Output Template (Workflow Mode)" for the complete fill-in template.

---

## State Updates (Workflow Mode)

After completing the journey map:

1. **Write output to `.design/phases/JOURNEY-MAP.md`**

2. **Update `.design/STATE.md`:**
```markdown
### Last Activity
- **Date:** [TIMESTAMP]
- **Action:** Completed journey mapping with /dp:journey
- **Artifact type:** [type]
- **Mode:** [research-based | hypothesis]

#### Major Decisions Made
| Phase | Decision | Impact |
|---|---|---|
| Journey | [Top opportunity identified] | [Feeds UX priority] |
```

3. **Update `.design/config.json`:**
```json
{
  "optional_phases": {
    "journey": {
      "enabled": true,
      "artifact_type": "customer_journey",
      "mode": "research_based",
      "completed": true
    }
  },
  "workflow": {
    "phases_completed": [..., "journey"],
    "current_optional_phase": null
  }
}
```

**State-machine rules for this optional phase:**
- **On entry** (as soon as the user invokes `/dp:journey`): set `workflow.current_optional_phase` to `"journey"` (if it isn't already). This lets `/dp:progress` and `/dp:skip` know the user is currently inside a subphase.
- **On completion** (after writing JOURNEY-MAP.md): clear `workflow.current_optional_phase` to `null` so the main workflow is no longer marked as in-flight on a subphase. Do **not** change `workflow.current_phase` — the numeric main-phase value is governed by the main workflow skills (`/dp:discovery`, `/dp:ux`, etc.), not by optional subphases.

4. **If any [HYPOTHESIS] entries exist, update `.design/REQUIREMENTS.md`** with a "Validation Needed" section.

---

## Handoff (Workflow Mode)

```
═══════════════════════════════════════════════════════════════════════════════
JOURNEY MAP COMPLETE
═══════════════════════════════════════════════════════════════════════════════

Output: .design/phases/JOURNEY-MAP.md

Summary:
• Artifact: [type]
• Mode: [research-based | hypothesis ⚠]
• Phases mapped: [N]
• Top opportunities: [count]
• Validation needed: [count of hypotheses]

Ready for Next Phase?
────────────────────────────────────────────────────────────────────────────────
→ /dp:ux — Continue to UX phase (recommended)
→ /dp:research — Validate hypotheses first (if hypothesis mode)
→ /dp:prd — Generate PRD incorporating journey insights

Or:
→ /dp:progress — Review full status
→ /dp:back — Revisit discovery
═══════════════════════════════════════════════════════════════════════════════
```

---

## Standalone Mode Behavior

When no `.design/` directory exists:

1. Ask artifact type (4 options)
2. Ask actor + scenario
3. Ask for research inputs (or enter hypothesis mode)
4. Run the six-step process
5. Output inline (rendered markdown)
6. Offer: "Would you like to start a full DP workflow with `/dp:start`?"

---

## Common Pitfalls to Avoid (Kate Kaplan, NNGroup)

The skill actively guards against these ten:

1. **No clear purpose or business question** — map has no owner, drives no decision, ends up as wall art
2. **Basing the map on assumptions, not research** — "feelings" made up in a workshop rather than grounded in user data
3. **Designing for the visual first** — over-polishing the artifact before synthesis is complete
4. **Mixing actors in one map** — one map = one actor = one scenario; multi-actor maps dilute insight
5. **Scoping too broadly** — "uses the product" or "the whole customer lifecycle" hides specifics; scope to one scenario
6. **Leaving emotion out** — omitting the emotion curve reduces the map to a flowchart and kills empathy value
7. **Not including stakeholders in creation** — presenting a finished map produces no buy-in; co-creation does
8. **Treating it as one-and-done** — not updating the map as research/product evolves; dies on a wiki
9. **Confusing journey map with service blueprint or flow chart** — conflating user experience with internal process
10. **No opportunities or ownership** — stopping at "here's the problem" without who-owns-what and how-we-measure makes the map inactionable

---

## Reference Files

Load these as needed for detailed guidance:

- **references/journey-types.md** — Decision tree for picking artifact type; examples of each
- **references/map-structures.md** — Full templates for each of the four artifact types
- **references/research-methods.md** — How to gather inputs for each swimlane (actions, thoughts, emotions, pain points)
- **references/omnichannel-patterns.md** — Channel transition design, the 3 Cs, common cross-channel patterns

---

## Config Integration

Respects these settings from `.design/config.json`:

```json
{
  "optional_phases": {
    "journey": {
      "enabled": true,
      "artifact_type": "customer_journey",
      "mode": "research_based",
      "include_ownership": true,
      "include_emotion_curve": true
    }
  }
}
```

- `artifact_type`: one of `customer_journey`, `experience_map`, `service_blueprint`, `omnichannel_journey`
- `mode`: `research_based` requires research sources; `hypothesis` allows proceeding without
- `include_ownership`: when true, require Internal Ownership per phase
- `include_emotion_curve`: when true, include the ASCII emotion curve

---

## Workflow Navigation

```
                                                    ┌─────────┐
/dp:start → /dp:discovery → (/dp:prd) →  │ YOU ARE │  → /dp:ux → /dp:execute → /dp:ui → /dp:eng_review → /dp:verify
              Phase 1         Phase 1.5a    │  HERE   │    Phase 2
                                            │ 1.5b    │
                                            └─────────┘
```

| | |
|---|---|
| **Previous** | `/dp:discovery` — Discovery (Phase 1) |
| **Parallel** | `/dp:prd` — PRD generation (Phase 1.5a) |
| **Current** | `/dp:journey` — Journey mapping (Phase 1.5b) |
| **Next** | `/dp:ux` — UX principles & states (Phase 2) |
| **Related** | `/dp:research` — Run research to validate hypotheses |
| | `/dp:discuss` — Capture context before this phase |
| | `/dp:back` — Return to discovery if scope changes |
