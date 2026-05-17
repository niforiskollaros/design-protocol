# Map Structures — Templates Per Artifact Type

Full swimlane templates for each of the five artifact types. Use these as the scaffold when synthesizing research into a draft.

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
