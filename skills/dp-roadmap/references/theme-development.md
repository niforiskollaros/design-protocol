# Theme Development — From Raw Inputs to Roadmap Themes

How to derive roadmap themes from research, journey maps, support signals, and stakeholder inputs. The hardest part of roadmapping is making the jump from "what we know" to "what we'll work on."

---

## The Theme Formula

Every theme on the roadmap reads as:

> **For [beneficiary], [need] so that [business objective].**

- **Beneficiary:** *who* gets the value (not who pays, not who decides — who experiences)
- **Need:** *what* problem is being solved (never *how*)
- **Business objective:** *why* the org cares — the measurable shift

This formula is a constraint. If the theme doesn't fit, it's either too vague or too prescriptive.

---

## Good Theme Tests

Before finalizing a theme, check:

1. **Beneficiary test** — Can you name the beneficiary in concrete terms? ("users" fails; "first-time buyers on mobile" passes)
2. **Solution-agnostic test** — Does the theme stay open to multiple solutions? ("Add SSO" fails; "Meet enterprise auth requirements" passes)
3. **Measurable outcome test** — Can the business objective be measured? ("Improve UX" fails; "Reduce support contact rate by 20%" passes)
4. **Other-solution test** — Ask: "What else could solve this?" If nothing comes to mind, it's a feature in disguise.
5. **Beneficiary-outcome alignment test** — Does the outcome actually matter *to the beneficiary*? ("Increase engagement" often fails this — it's an org-metric, not a user-benefit)

---

## Source-to-Theme Mapping

Different inputs produce different kinds of themes:

### From user research (interviews, usability tests)
- Pain points → themes ("for [persona], reduce [friction] so that [outcome]")
- Unmet needs → themes ("for [persona], enable [capability] so that [outcome]")
- Misaligned mental models → themes ("for [persona], align [UI surface] with [expected model] so that [outcome]")

### From journey maps
- Opportunity columns → theme candidates
- Low-emotion phases → theme candidates (valley in the emotion curve)
- Broken channel transitions → theme candidates (esp. omnichannel)
- Pain points with high reach → theme candidates

### From support / CS data
- High-volume ticket categories → themes (reduce support contact rate)
- Escalation patterns → themes (prevent scenarios that require human intervention)
- NPS comments (negative) → themes

### From analytics
- High drop-off points → themes (reduce drop-off at phase X)
- Underused features → either theme or deprecation candidate
- Search queries with no results → themes (surface missing content/capabilities)

### From stakeholder interviews
- Strategic bets → themes (expand into segment X)
- Competitive gaps → themes (match table-stakes in market X)
- Revenue concentration → themes (reduce dependency on X)
- Risk/compliance → themes (meet requirement X)

---

## Theme Evolution Across Horizons

Themes don't stay static — they evolve as they move through the time horizons.

| Horizon | Specificity | Evidence | Notes |
|---|---|---|---|
| **Future++** | Hypothesis only | Stakeholder suggestion or weak signal | Parking lot |
| **Future** | Direction only | Some evidence, unvalidated | Ambiguous, will change |
| **Next** | Scoped theme | Research exists, opportunity validated | Solution space still open |
| **Now** | Near-ready | Research validated, solutions drafted | May have concrete subthemes |
| **Completed** | Delivered | Outcome measured | Show for context |

**Rule:** a theme should not jump from Future directly to Now without passing through Next. If it does, question whether sufficient validation happened.

---

## Good vs Bad Theme Examples

| Bad | Why it's bad | Good version |
|---|---|---|
| Build a new onboarding wizard | Prescribes solution, no beneficiary, no outcome | For first-time customers, reduce time-to-first-value so that trial-to-paid conversion increases |
| Redesign checkout | No specific user, no outcome | For returning shoppers, remove friction in checkout so that cart-abandonment drops below 20% |
| Improve mobile app | Too vague, no dimension | For commuter users, optimize one-handed critical flows so that mobile NPS matches desktop |
| Add SSO and MFA | Lists solutions; no "why" | For IT buyers, meet enterprise auth requirements so that deals over $50k don't stall on security review |
| Better analytics dashboard | No beneficiary, no outcome | For operations managers, surface shift-level KPIs in real time so that intervention happens within 15 min |
| Fix bugs in payments | Not a theme — it's a backlog item | For all paying customers, remove stability issues in payments so that involuntary churn drops |
| Migrate to new stack | Engineering-internal, not UX | (Not a UX roadmap theme; belongs on eng roadmap) |
| Delight the user | Vacuous | For long-tenure power users, surface earned capability so that retention at 12 months improves |

---

## Theme Anti-Patterns to Reject

1. **The feature theme** — names a specific solution ("Build X")
2. **The vague theme** — no beneficiary, no outcome ("Improve UX")
3. **The org theme** — beneficiary is the org, not the user ("Grow revenue")
4. **The compound theme** — tries to do 3 things ("Redesign nav AND improve search AND add filters")
5. **The fantasy theme** — outcome is not achievable by the work described ("Become #1 in market")
6. **The tautology theme** — outcome restates the need ("Reduce friction so that friction is lower")
7. **The internal-only theme** — no user visible impact ("Refactor backend")

Internal-only work can still appear on the roadmap but should be labeled differently (e.g., "Capabilities" or "Platform") and not framed as beneficiary-need themes.

---

## Subthemes

Once themes are chosen, break each into 2-5 subthemes for the "Now" horizon only. Subthemes can be:

- **Sub-goals** — milestones within the theme
- **Specific user segments** — if the beneficiary splits into meaningful sub-populations
- **Pre-validated solutions** — when research has already identified the answer
- **Discrete features** — when the theme is near-ready to ship

Example:

> **Theme:** For first-time customers, reduce time-to-first-value so that trial-to-paid conversion increases.
>
> **Subthemes (Now horizon):**
> - Replace 7-step wizard with 3-step flow (pre-validated via usability tests)
> - Add "skip for now" to non-essential setup steps
> - Move sample-data import to first use, not signup
> - Measure time-to-first-value via funnel instrumentation

Only "Now" themes need subthemes. "Next" themes should stay at theme-level; "Future" should stay directional.

---

## Confidence Calibration

Assign confidence to every theme:

| Level | Criteria |
|---|---|
| **High** | Research validates the need; 2+ solution directions tested; team knows what to do |
| **Medium** | Need is supported by some research; solution space not yet explored |
| **Low** | Hypothesis only; may not be the right problem; needs validation |

**Distribution heuristic for a healthy roadmap:**
- Now: 80% high, 20% medium
- Next: 40% high, 40% medium, 20% low
- Future: 20% high, 40% medium, 40% low

If all themes at every horizon are "high confidence," the team is over-committing or mis-calibrating. If everything is "low," the team needs more research before roadmapping.

---

## Linking Themes to Research Sources

Every theme should have a traceable source:

```
Theme 1: For first-time customers, reduce time-to-first-value...
  Sources:
    - RESEARCH-interviews.md — 8/10 participants mentioned setup pain
    - JOURNEY-MAP.md — Phase 2 emotion valley at -2
    - Support tickets (Q1 2026) — 34% of new-user tickets about setup
    - Analytics — 45% drop-off between signup and first workflow
```

Untraceable themes = stakeholder opinions disguised as user needs. Either:
1. Source them, or
2. Mark as low-confidence hypothesis and move to Future++ pending research.
