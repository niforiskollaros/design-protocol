# Journey Artifact Types — Decision Guide

This reference helps pick the right artifact type for the situation. Source: NNGroup's UX Mapping Methods cheat sheet (Sarah Gibbons) plus related Kaplan, Salazar, and Flaherty articles.

---

## Decision Tree

```
Is the scope tied to a specific product or service?
├── No, broader human behavior across providers
│   ├── Whole-day or whole-life context?
│   │   ├── Yes → Day-in-the-Life Map
│   │   └── No  → Experience Map
│   └──
└── Yes, specific product/service
    ├── Do channels/handoffs matter?
    │   ├── Yes → Omnichannel Journey Map
    │   └── No  → Continue
    ├── Do internal operations/backstage matter?
    │   ├── Yes → Service Blueprint
    │   └── No  → Customer Journey Map
    └──
```

---

## Comparison Matrix

| Method | Perspective | Scope | Chronological? | Tied to product? | Primary output |
|---|---|---|---|---|---|
| Customer Journey Map | One actor | One scenario | Yes | Yes | Emotional arc + opportunities |
| Experience Map | Generic human | Whole domain | Yes | No | Context + upstream opportunities |
| Day-in-the-Life Map | One actor | Whole day | Yes | No | Context + unmet needs |
| Service Blueprint | Organization | One service | Yes | Yes | Frontstage/backstage alignment |
| Omnichannel Journey Map | One actor | Multi-channel journey | Yes | Yes | Channel transitions + gaps |

---

## Current-State vs Future-State vs Day-in-the-Life

Three purposes for a journey map, per Kaplan:

| Variant | Purpose | When to use |
|---|---|---|
| **Current-state** | Diagnose how the journey works *today* | Improving an existing experience; aligning on reality; onboarding new team members |
| **Future-state** | Envision how the journey *should* work | Vision-setting; pitching a North Star; designing something that doesn't exist |
| **Day-in-the-Life** | Understand the person's *wider context* | Finding new opportunities; pre-product discovery; designing for moments not screens |

**Rule of thumb:** Use current-state to fix. Use future-state to envision. Use day-in-the-life to find.

---

## Examples Per Type

### Customer Journey Map — "First-time SaaS trial signup"
Actor: IT manager evaluating tools
Scenario: from email ad click → 14-day trial → purchase decision
Phases: Discover → Evaluate → Trial → Expand → Decide → Purchase/Abandon

### Experience Map — "Learning a new skill"
Actor: self-directed adult learner
Scope: not tied to any one course platform
Phases: Awaken desire → Explore options → Commit → Practice → Plateau → Apply → Share

### Day-in-the-Life Map — "Remote knowledge worker"
Actor: mid-career software engineer
Scope: 6am–11pm weekday
Swimlanes: activities, tools, emotional state, meeting load, unmet needs

### Service Blueprint — "Home appliance warranty claim"
Actor: customer with broken dishwasher
Customer actions: call support → schedule visit → technician arrives → repair done
Frontstage: phone agent, scheduling app, technician
Backstage: CRM, parts inventory, dispatch system
Support: vendor parts supplier, SLA contracts

### Omnichannel Journey Map — "Buy online, pick up in store"
Actor: working parent
Channels: web (browse), mobile (pay), email (receipt), SMS (ready-for-pickup), in-store (counter)
Transitions: 4 channel handoffs, each requiring context persistence

---

## When NOT to Use Journey Mapping

Use something else when:

| Situation | Use instead |
|---|---|
| You need to synthesize user research | Empathy map, affinity diagramming |
| You need to design a specific screen flow | User flow diagram (part of UX) |
| You need to document information architecture | Sitemap, IA diagram |
| You need feature requirements | PRD |
| You need persona detail | Persona document |

Journey maps are for *narrative and alignment*, not for *specification*.
