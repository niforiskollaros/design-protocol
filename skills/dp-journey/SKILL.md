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

The skill supports five distinct artifact types. Pick one per invocation based on the user's goal. These align with NNGroup's UX Mapping Cheat Sheet (Gibbons).

### 1. Customer Journey Map (default)
**What it is:** One actor, one scenario, tied to a specific product or service, chronological, from the user's perspective.

**Use when:** Improving an existing experience or designing a specific product flow (e.g., "first-time buyer on mobile").

**Variants:**
- **Current-state** — how the journey works *today* (research-grounded, diagnostic)
- **Future-state** — how the journey *should* work (vision-setting, strategy)

**Structure:** Zone A (Actor/Scenario/Expectations) → Zone B (Phases + Actions + Thoughts + Emotions + Touchpoints) → Zone C (Opportunities + Ownership + Metrics).

### 2. Experience Map
**What it is:** Broader than a journey map — a *generic* human perspective, not tied to a specific product or service. Describes how people experience a whole domain (e.g., "managing personal finances" or "planning a wedding").

**Use when:** Upstream discovery for a new product category; understanding context before a product exists; seeing competitive/substitute options.

**Structure:** Same swimlanes as journey map, but scenario is a life context spanning multiple providers.

### 3. Day-in-the-Life Map
**What it is:** Plots actions/thoughts/emotions across a person's *whole day* (or wider context), not just a product-specific journey.

**Use when:** Finding new product opportunities; understanding competing priorities; designing for moments (not screens).

**Structure:** Timeline = hours of a day; swimlanes = activities, tools, emotions, unmet needs.

### 4. Service Blueprint
**What it is:** NNGroup (Gibbons): *"a diagram that visualizes the relationships between different service components — people, props (physical or digital evidence), and processes — that are directly tied to touchpoints in a specific customer journey."* Extends the journey map *downward* into the organization.

**Use when:** The experience involves service delivery (humans, systems, handoffs) and internal coordination is the bottleneck. Banking, healthcare, hospitality, complex B2B SaaS onboarding, omnichannel retail.

**Structure:** 5 layers separated by 3 lines — see Service Blueprint Specifics below.

### 5. Omnichannel Journey Map
**What it is:** A journey map where channel switching is first-class. Shows the same actor moving across web, mobile, email, phone, in-person, chat.

**Use when:** The experience spans 2+ channels and handoff quality matters (e.g., buy online, pick up in store; apply online, sign in person).

**Structure:** Journey map + explicit Channel row + Device row + Channel Transition markers at every handoff.

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

Every journey map this skill produces has these zones (NNGroup's Zone A/B/C model):

```
┌─────────────────────────────────────────────────────────────────┐
│ ZONE A — The Lens                                                │
│ Actor + Scenario + Expectations                                  │
├─────────────────────────────────────────────────────────────────┤
│ ZONE B — The Experience                                          │
│ ─────────────────────────────────────────────────────────────   │
│ Phase 1      Phase 2      Phase 3      Phase 4      Phase 5     │
│ ─────────────────────────────────────────────────────────────   │
│ Actions      Actions      Actions      Actions      Actions     │
│ Thoughts     Thoughts     Thoughts     Thoughts     Thoughts    │
│ Emotions ▁▂▅▇▅▃▁ (curve across all phases)                      │
│ Touchpoints Touchpoints  Touchpoints  Touchpoints  Touchpoints  │
├─────────────────────────────────────────────────────────────────┤
│ ZONE C — The Insights                                            │
│ Pain Points | Opportunities | Ownership | Metrics                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Omnichannel Specifics

When artifact type is "Omnichannel Journey Map":

### Apply NNGroup's 5 Components of Omnichannel UX (Kim Flaherty)
1. **Consistent** — a cohesive, familiar experience across channels (brand, content, data, core functionality)
2. **Optimized (for context)** — each channel's UI is suited to its device, constraints, and context of use (not a copy-paste of desktop)
3. **Seamless** — channel transitions involve zero or minimal overhead; users can pick up where they left off
4. **Orchestrated** — proactively guides customers through their journey with the right interaction at the right time
5. **Collaborative** — lets customers use multiple channels *simultaneously* (e.g., agent call + web screen-share, TV + mobile companion app)

### Define touchpoints precisely (NNGroup, Kim Salazar)
A **touchpoint** = **channel × device × task**. Separate these explicitly:
- **Channel** — method of communication/delivery (web, app, call center, store, email, SMS)
- **Device** — hardware (phone, laptop, kiosk, POS terminal)
- **Touchpoint** — a specific interaction = channel + device + task

A **touchpoint inventory** enumerates every (channel × device × task) combo the actor hits across the journey.

### Treat channel transitions as first-class events
At every handoff, document:
- What the user just did (source channel)
- What they try to do next (destination channel)
- What context *should* carry over (auth, cart, preferences, session state, intent)
- What *actually* carries over (current reality)
- Failure mode if context is lost (forced re-login, re-typing, re-explaining)

### Multichannel vs cross-channel vs omnichannel (precise NNGroup usage)
- **Multichannel** — presence on many channels, but each designed in isolation. No shared state, no transition design.
- **Cross-channel** — channels are coordinated (e.g., email contains a web link that persists session).
- **Omnichannel** — channels are designed as a connected system: each optimized for its context, transitions explicitly designed, built around the customer's journey rather than the org's channel silos.

**Consistent what, contextual how:** keep brand, data, and core capability consistent across channels; let UI, interaction modality, and detail level adapt to each channel's context.

Call out in the output which tier the current experience operates at.

### Common omnichannel pitfalls to flag
- Treating multichannel presence as omnichannel
- Siloed ownership (each channel owned by a different team)
- Inconsistent data state across channels (stale cart, stale status)
- Forcing channel parity (replicating desktop UI on mobile)
- Unmanaged handoffs (re-auth, re-enter, re-explain)
- Over-personalization without permission
- Mapping only the happy path — gaps live at transitions and recovery paths
- Skipping the touchpoint inventory

---

## Service Blueprint Specifics

When artifact type is "Service Blueprint":

### The five layers (top to bottom)
1. **Physical Evidence** — tangible artifacts the customer encounters (receipt, signage, UI screen)
2. **Customer Actions** — what the customer does (this IS the journey map row)
3. **Frontstage Actions** — what employees/systems do visibly
4. **Backstage Actions** — what employees/systems do invisibly
5. **Support Processes** — upstream systems, policies, and vendors

### The three lines
- **Line of Interaction** — between Customer Actions and Frontstage (every interaction crosses this)
- **Line of Visibility** — between Frontstage and Backstage (customer cannot see below this)
- **Line of Internal Interaction** — between Backstage and Support Processes

### When to use vs journey map
Use a service blueprint when:
- Failures happen backstage but surface frontstage
- Cross-team coordination is the actual problem (not UI)
- You're designing a new service, not just a new interface

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

When in workflow mode, write to `.design/phases/JOURNEY-MAP.md`:

```yaml
---
phase: journey
skill: dp-journey
artifact_type: [customer_journey | experience_map | service_blueprint | omnichannel_journey]
completed: YYYY-MM-DDTHH:MM:SSZ
mode: [research_based | hypothesis]
actor: [persona name]
scenario: [one-line scenario]
phases_count: N
research_sources:
  - RESEARCH-interviews.md
  - RESEARCH-usability.md
validation_status: [validated | partial | unvalidated]
---

# Journey Map: [Scenario title]

> Artifact type: [Customer Journey Map | Experience Map | Service Blueprint | Omnichannel Journey Map]
> Mode: [Research-based | Hypothesis-based ⚠]

## Zone A — The Lens

**Actor:** [Persona name + one-line description]

**Scenario:** [Specific, time-bounded, outcome-oriented scenario]

**Actor's Expectations Entering:**
- [Expectation 1]
- [Expectation 2]
- [Expectation 3]

**Actor's Goal:** [What success looks like from their perspective]

## Zone B — The Experience

### Phases
| # | Phase Name | Duration | Key Question |
|---|---|---|---|
| 1 | [Phase 1] | [e.g., minutes / days] | [What is the actor trying to achieve?] |
| ... | ... | ... | ... |

### Phase-by-Phase Breakdown

#### Phase 1: [Phase Name]

**Actions**
- [What the actor does]
- [Next action]

**Thoughts**
- [Verbatim or paraphrased quotes — "..." if from research]

**Emotions** — [value on 1-5 scale, e.g., 3/5 neutral]
[Short description of emotional state]

**Touchpoints / Channels**
- [Touchpoint 1] ([channel type])
- [Touchpoint 2] ([channel type])

**Pain Points**
- [Pain point 1 — with research source or [HYPOTHESIS] flag]

**Opportunities**
- [Opportunity 1 — concrete, actionable]

**Internal Ownership**
- [Team / role responsible]

[Repeat for each phase]

### Emotion Curve (across all phases)
```
  5 ┤
  4 ┤    ╱╲
  3 ┤   ╱  ╲___
  2 ┤  ╱       ╲
  1 ┤_╱         ╲___
    └────────────────
    P1  P2  P3  P4  P5
```

## Zone C — The Insights

### Top 3 Opportunity Zones
Ranked by severity × reach × strategic fit:

1. **[Opportunity name]** — [Phase X]
   - Severity: [1-5] — [why]
   - Reach: [% of users affected]
   - Strategic fit: [alignment with org goals]
   - Suggested action: [concrete next step]

2. ...

3. ...

### Key Moments of Truth
Critical interactions where the experience succeeds or fails:
- [Moment 1] — [why it matters]
- [Moment 2] — [why it matters]

### Ownership & Governance
**Journey Owner (accountable):** [Name / Role — single person, RACI "A"]

**Review Cadence:** [Weekly | Monthly | Quarterly] — [rationale]

**Metrics to Monitor**
| Tier | Metric | Current | Target | Source |
|---|---|---|---|---|
| Experience | NPS / CSAT / CES | [value] | [target] | [survey tool] |
| Behavioral | Completion rate | [%] | [%] | [analytics] |
| Behavioral | Drop-off points | [phase X] | — | [analytics] |
| Business | Revenue / retention / cost-to-serve | [value] | [target] | [system] |

**Phase Ownership**
| Phase | Primary Owner | Secondary | Handoff Risks |
|---|---|---|---|
| Phase 1 | [Team] | [Team] | [What breaks at handoff] |

## [If Service Blueprint] Backstage Analysis

### Frontstage Actions
[Per phase — what employees/systems do visibly]

### Backstage Actions
[Per phase — what happens behind the line of visibility]

### Support Processes
[Upstream systems, policies, vendors that enable backstage]

### Cross-Line Failure Risks
| Failure | Where | Customer Impact |
|---|---|---|
| [e.g., CRM sync delay] | Backstage → Frontstage | Agent sees stale data |

## [If Omnichannel] Channel Transition Analysis

### Channels in This Journey
| Channel | Role | Strengths Leveraged |
|---|---|---|
| [Channel 1] | [Primary / secondary / fallback] | [What it does best] |

### Channel Transitions
| # | From | To | Context That Should Carry | Context That Does | Failure Mode |
|---|---|---|---|---|---|
| 1 | [Email] | [Web] | [Auth, offer ID] | [Offer ID only] | [Forces re-login] |

### Omnichannel Tier
Current state: [Multichannel | Cross-channel | Omnichannel]
[One-line justification]

## [If Hypothesis Mode] Validation Plan

⚠ This map is hypothesis-based. Validate before making large investments.

### Highest-Risk Hypotheses
1. **Claim:** [Hypothesis from the map]
   **Why risky:** [What decisions depend on it]
   **Method:** [Interview / usability test / survey / analytics]
   **Sample:** [N, criteria]
   **Timing:** [Before what decision]

[Repeat for top 5-8 hypotheses]

## Handoff Notes for UX Phase

- Key opportunities to design for: [list]
- Phases needing the most UX attention: [list]
- Cross-channel requirements: [if applicable]
- Open questions for UX: [list]
```

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
