# Map Structures — Templates Per Artifact Type

Full swimlane templates for each of the five artifact types. Use these as the scaffold when synthesizing research into a draft.

## Contents
- [1. Customer Journey Map — Full Template](#1-customer-journey-map--full-template)
- [2. Experience Map — Full Template](#2-experience-map--full-template)
- [3. Day-in-the-Life Map — Full Template](#3-day-in-the-life-map--full-template)
- [4. Service Blueprint — Full Template](#4-service-blueprint--full-template)
- [5. Omnichannel Journey Map — Full Template](#5-omnichannel-journey-map--full-template)
- [Output Conventions](#output-conventions)
- [Journey Map Anatomy (Zone A/B/C)](#journey-map-anatomy-zone-abc)
- [JOURNEY-MAP.md Output Template (Workflow Mode)](#journey-mapmd-output-template-workflow-mode)

---

## 1. Customer Journey Map — Full Template

### Zone A — The Lens
```
Actor: [Persona name] — [one-line description]
Scenario: [Specific time-bounded scenario with entry and exit points]
Expectations Entering:
  1. [What they expect]
  2. [What they expect]
  3. [What they expect]
Goal: [What success looks like from their POV]
Research basis: [interviews N=X, usability N=Y, analytics source] OR [HYPOTHESIS]
```

### Zone B — The Experience

**Phase row (top):** 4-7 high-level phases, chronological
**Standard phase archetypes:**
- Commerce: Awareness → Consideration → Purchase → Onboarding → Use → Advocacy
- SaaS: Discover → Evaluate → Trial → Adopt → Expand → Renew/Advocate
- Service: Trigger → Research → Decide → Engage → Experience → Follow-up
- Support: Problem → Search → Contact → Diagnose → Resolve → Verify

**Swimlanes (per phase):**

| Swimlane | Prompt |
|---|---|
| Actions | What does the actor literally do? |
| Thoughts | What are they asking themselves? What questions? |
| Emotions | How do they feel? Plot as 1-5 value |
| Touchpoints | Which interfaces/channels at this moment? |
| Pain Points | What friction or frustration occurs here? |
| Quotes | Verbatim or paraphrased — "..." from research |

**Emotion Curve:** draw as a single line across all phases showing peaks (delight) and valleys (frustration).

### Zone C — The Insights

- **Opportunities** per phase (ranked)
- **Key Moments of Truth** — where experience succeeds or fails
- **Ownership Map** — who owns each phase
- **Metrics** — what to measure to know if the journey improves

---

## 2. Experience Map — Full Template

Same structure as Customer Journey Map but:
- Actor = generic human (not a customer of any one company)
- Scenario = life context, not product context
- Touchpoints = may include competitive/substitute options
- Opportunities = category-level, not product-level

---

## 3. Day-in-the-Life Map — Full Template

### Header
```
Actor: [Persona]
Time horizon: [6am–11pm / full workday / weekend]
Context: [Location, role, constraints]
```

### Timeline Swimlanes

| Swimlane | Prompt |
|---|---|
| Time blocks | Hourly or by natural breaks |
| Activities | What they're doing |
| Tools used | Apps, devices, services, physical tools |
| Social context | Alone / with family / with colleagues |
| Emotional state | Stress level, energy level |
| Cognitive load | Focused work / reactive / ambient |
| Unmet needs | What's missing or painful |
| Opportunity tags | Potential product/service intervention |

---

## 4. Service Blueprint — Full Template

### 5 Layers (top to bottom)
```
┌─────────────────────────────────────────────────────────────┐
│ Physical / Digital Evidence                                  │
├─────────────────────────────────────────────────────────────┤
│ Customer Actions                                             │
│ ══════════════════════════ Line of Interaction ═══════════ │
│ Frontstage Actions                                           │
│ ══════════════════════════ Line of Visibility ════════════ │
│ Backstage Actions                                            │
│ ══════════════════════ Line of Internal Interaction ══════ │
│ Support Processes                                            │
└─────────────────────────────────────────────────────────────┘
```

### Layer Definitions (NNGroup, Sarah Gibbons)

| Layer | Contents |
|---|---|
| **Physical / Digital Evidence** | Props, places, UIs the customer encounters — receipt, signage, app screen, email |
| **Customer Actions** | Steps, choices, activities the customer performs to reach a goal (this IS the journey row) |
| **Frontstage Actions** | Actions occurring directly in view of the customer — contact employees or self-service tech |
| **Backstage Actions** | Steps behind the scenes that support frontstage — kitchen prep, order entry into KDS, CRM lookup |
| **Support Processes** | Internal systems, third parties, policies, SLAs that enable the layers above |

### Critical Nuance
A frontstage *employee* can perform a backstage *action*. Example: a waiter typing the order into the kitchen display system is a backstage action even though the waiter is a frontstage employee. The distinction is about visibility of the *action*, not the *role*.

### The 3 Lines

| Line | Separates |
|---|---|
| Line of Interaction | Customer Actions ↔ Frontstage Actions |
| Line of Visibility | Frontstage ↔ Backstage |
| Line of Internal Interaction | Backstage ↔ Support Processes |

### Building Process (5 steps — Gibbons)
1. **Find support** — build cross-disciplinary team, establish stakeholder support
2. **Define the goal** — scope and alignment on why
3. **Gather research** — from customers, employees, stakeholders
4. **Map the blueprint** — low-fidelity first
5. **Refine and distribute** — to high-fidelity, distribute to clients and stakeholders

---

## 5. Omnichannel Journey Map — Full Template

### Additional rows beyond the Customer Journey Map

| Row | Prompt |
|---|---|
| **Channel** | web / mobile / email / SMS / phone / in-person / chat / kiosk |
| **Device** | phone / laptop / tablet / kiosk / POS / voice assistant |
| **Touchpoint** | channel + device + task composite |

### Channel Transition Markers

At every transition, insert a block:

```
╔═══════════════════════════════╗
║ TRANSITION: [From] → [To]    ║
║ What carries: [context]       ║
║ What breaks: [failures]       ║
║ Priority: [H / M / L]         ║
╚═══════════════════════════════╝
```

### Channel Inventory Table

| Channel | Role | Strengths Leveraged | Known Limitations |
|---|---|---|---|
| Web | Primary research | Deep content, filters, comparison | Large screen assumed |
| Mobile app | Transactional | Quick actions, notifications, camera | Small screen, attention-fragmented |
| Email | Async confirmation | Persistent record | One-way, delayed |
| SMS | Real-time alert | Immediate, high open-rate | 160 chars, no rich media |
| Phone | High-touch resolution | Human empathy, complex cases | Queue wait, scheduling |
| In-person | Trust-building, physical | Full sensory, high bandwidth | Geographic limits, hours |
| Chat (live) | Mid-touch support | Real-time, multitask-compatible | Requires agent availability |

---

## Output Conventions

- Always Zone A (lens), Zone B (experience), Zone C (insights) order
- Always one actor per map
- Always chronological left-to-right phases
- Always emotion as a continuous line, not discrete values
- Always opportunities ranked (severity × reach × strategic fit)
- Always a named journey owner in Zone C

---

## Journey Map Anatomy (Zone A/B/C)

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

## JOURNEY-MAP.md Output Template (Workflow Mode)

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
