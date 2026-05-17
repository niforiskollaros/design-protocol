# Prioritization Frameworks — Detailed Reference

Eight frameworks for ranking themes on a roadmap, with exact formulas, scales, fit, and pitfalls. Pick one per roadmap (mixing is OK once the team is mature).

---

## 1. RICE (Intercom, Sean McBride)

### Formula
```
RICE Score = (Reach × Impact × Confidence) / Effort
```

### Component scales

| Component | Scale | Notes |
|---|---|---|
| **Reach** | Absolute number | Users/events affected in a defined period (e.g., per quarter). Use real units. |
| **Impact** | 0.25 / 0.5 / 1 / 2 / 3 | 3 = massive; 2 = high; 1 = medium; 0.5 = low; 0.25 = minimal |
| **Confidence** | 50% / 80% / 100% | <50% = "moonshot"; don't go below that |
| **Effort** | Person-months | Combined design + eng + PM; min 0.5 |

### Output unit
"Total impact per time worked."

### When to use
- Data-rich backlog (you have usage analytics)
- Medium-to-large teams
- Mixed portfolio serving different segments (Reach normalizes)

### When NOT to use
- Early-stage / low-data (Confidence collapses to <50% everywhere)
- Strategic platform bets (Effort dominates denominator, kills compounding investments)
- Compliance / must-do items (score irrelevant)

### Strengths
- Forces explicit numbers
- Reach prevents loud-voice bias
- Confidence is anti-BS mechanism

### Weaknesses
- Encourages false precision
- Impact scale still subjective
- Penalizes large bets

### Common mistakes
1. Treating 4.7 > 4.3 as meaningful when inputs are gut picks
2. Confidence inflation — everyone defaults to 80-100%
3. Effort underestimation — estimated before discovery
4. Reach double-counting — same user across multiple features
5. Mixing time units — Reach per quarter, Effort in weeks
6. No cutoff threshold — scoring without a go/no-go is theater

---

## 2. ICE (Sean Ellis)

### Formula
```
ICE Score = Impact × Confidence × Ease
```
Each factor 1-10.

### When to use
- Growth/experimentation backlogs
- Early-stage teams
- A/B test ideation
- Speed > rigor

### When NOT to use
- Cross-team portfolio decisions (too subjective to defend)
- When reach normalization matters

### Critical caveat
ICE is a **conversation tool, not a decision algorithm**. Score variance between raters is huge. Use with ≥3 raters for mitigating bias.

---

## 3. MoSCoW

### Structure
Not a formula — a categorization.

| Tier | Meaning |
|---|---|
| **M**ust have | Non-negotiable this release. Failure = project failure. |
| **S**hould have | Important, not vital. Painful to skip; project survives without. |
| **C**ould have | Desirable, low cost. Included if time/budget allows. |
| **W**on't have | Explicitly deferred. Critical to document. |

### DSDM budget guideline
Must-haves ≤ 60% of effort. Should + Could ≈ 40% (Could acts as contingency).

### When to use
- Fixed-timebox releases (sprints, MVPs, regulatory deadlines)
- Stakeholder alignment on scope cuts
- Agency/client contexts

### When NOT to use
- Continuous delivery (timebox breaks down)
- Large backlogs — too coarse, everything becomes "Must"

### Common failure
**Must-inflation.** Push back hard: "If this slipped, would the project fail?" If no, it's not a Must.

---

## 4. Kano Model (Noriaki Kano, 1984)

### Five categories

| Category | Meaning | Example |
|---|---|---|
| **Must-be / Basic** | Expected. Absence causes dissatisfaction; presence is neutral. | Brakes on a car |
| **Performance** | Satisfaction scales linearly with investment. | Battery life |
| **Attractive / Delighter** | Unexpected. Absence not missed; presence delights. | Surprise discount |
| **Indifferent** | Users don't care. | Extra settings nobody uses |
| **Reverse** | Presence causes dissatisfaction for some. | Forced gamification |

### Measurement
Kano survey pairs two questions per feature:
- **Functional:** "How would you feel if the product HAD feature X?"
- **Dysfunctional:** "How would you feel if it did NOT?"

Answers: Like / Expect / Neutral / Tolerate / Dislike.

Answer-pair lookup table classifies the feature.

### Kano decay
Delighters → Performance → Basic over time. What wowed in 2020 is expected in 2026.

### When to use
- Differentiation strategy
- Table-stakes vs. competitive differentiator diagnosis
- Need real user panel (≥30 respondents per segment)

### When NOT to use
- Internal tools / B2B efficiency tools
- No survey capability
- Pure effort/cost reasoning

---

## 5. Value vs. Effort Matrix (2×2)

### Structure
```
              Low Effort        High Effort
High Value    QUICK WINS        BIG BETS
Low Value     FILL-INS          MONEY PITS
```

### When to use
- Rapid workshops, early ideation
- Aligning on obvious next moves
- "What should we do today?" conversations

### When NOT to use
- Final prioritization (too coarse)
- When Value hides sub-dimensions (reach, confidence)

### Common failure
**Top-left migration.** Every theme drifts to "high value / low effort" by stakeholder optimism. Force-rank within each quadrant to break the tie.

### Recommended pairing
Use 2×2 as **first-pass filter**, then apply RICE or WSJF on the "Big Bets" quadrant.

---

## 6. WSJF — Weighted Shortest Job First (SAFe, Don Reinertsen)

### Formula
```
WSJF = Cost of Delay / Job Duration (or Size)

Cost of Delay (CoD) = User-Business Value + Time Criticality + Risk Reduction / Opportunity Enablement
```

### Scoring
**Modified Fibonacci** (1, 2, 3, 5, 8, 13, 20). Relative ranking within the batch. Never absolute units.

### Components
- **User-Business Value** — relative value; revenue/penalty
- **Time Criticality** — does value decay? deadlines? competitive windows?
- **Risk Reduction / Opportunity Enablement (RR|OE)** — risks retired; opportunities unlocked
- **Job Size** — effort proxy (story points)

### When to use
- SAFe / scaled agile
- Portfolio-level Epics
- Time-sensitive releases (compliance, seasonal)

### When NOT to use
- Small teams, flat backlogs
- Near-identical time-criticality across items
- Non-SAFe orgs (high overhead)

### Unique strength
**Time decay** is first-class. No other framework models "value erodes while we wait."

---

## 7. Opportunity Scoring (Anthony Ulwick, JTBD)

### Formula
```
Opportunity Score = Importance + max(Importance − Satisfaction, 0)
```

### Measurement
Survey users on **desired outcomes** (not features):
- **Importance:** "How important is it that [outcome]?" (1-10)
- **Satisfaction:** "How satisfied are you with your current ability to achieve [outcome]?" (1-10)

### Interpretation thresholds
| Score | Meaning |
|---|---|
| ≥ 15 | Under-served (huge opportunity) |
| 12-15 | Opportunity |
| 10-12 | Appropriately served |
| < 10 | Over-served (disruption risk — simplify) |

### When to use
- Product-market-fit discovery
- Competitive whitespace analysis
- JTBD-driven strategy

### When NOT to use
- Feature-level backlog grooming (wrong altitude — it ranks outcomes)
- Small samples

### Output
Classifies outcomes, not solutions. You still need ideation after.

---

## 8. Story Mapping (Jeff Patton)

### Structure (not a prioritization formula)
- **Horizontal axis (Backbone):** user journey, left→right chronological
- **Vertical axis (Priority depth):** stories sliced top-to-bottom
- **Horizontal slices:** releases ("walking skeleton" = thinnest end-to-end slice)

### Role in roadmapping
Story mapping is **orthogonal** to prioritization — not a replacement for RICE/ICE. Canonical pairing:
1. Story map → identify the MVP slice
2. RICE / WSJF → rank work within or across slices

### When to use
- MVP scoping
- Aligning UX journey to engineering backlog
- Communicating scope across disciplines

### Patton principle
*"Shared documents aren't shared understanding."* The point of story mapping is the conversation, not the artifact.

---

## Framework Selection Guide

| Situation | Data maturity | Team size | Recommended |
|---|---|---|---|
| Workshop, early ideation | None | Any | **Value / Effort 2×2** |
| Growth experiments | Some analytics | Small | **ICE** |
| Feature backlog with metrics | Good analytics | Medium+ | **RICE** |
| Timeboxed release (client/MVP) | Any | Any | **MoSCoW** |
| SAFe / scaled agile portfolio | Mature PM | Large | **WSJF** |
| Differentiation strategy | Survey capability | Any | **Kano** |
| Market / outcome discovery | Research budget | Any | **Opportunity Scoring** |
| MVP scoping | Any | Any | **Story Mapping** (+ a ranker) |

**Meta-rule:**
- Data-poor → qualitative (MoSCoW, 2×2)
- Data-rich → quantitative (RICE, WSJF)
- Research-rich → user-based (Kano, Opportunity Scoring)

---

## Universal Pitfalls (All Frameworks)

1. **Confusing precision with accuracy** — A decimal-precise score built from gut picks is still a gut pick
2. **Single-rater bias** — Always score with ≥3 people independently, then discuss deltas
3. **No cutoff line** — If the team scores but never says "we'll do the top N and nothing below," the whole exercise is theater
4. **Strategic bet exclusion** — Numeric frameworks penalize large platform bets. Carve out a reserved % of capacity for strategic investment outside the framework
5. **Score inflation over time** — Themes added later get benchmarked against current scores rather than original scale; recalibrate quarterly
6. **Ignoring dependencies** — A "high-score" theme blocked by a "low-score" theme still has to wait. Prioritization must include dependency ordering
7. **Skipping validation** — High scores based on untested assumptions create larger waste than low-confidence admissions
8. **Framework worship** — Any single framework will mis-prioritize edge cases. Use frameworks as tools, not as decision-makers

---

## NNGroup's General Stance

NNGroup generally prefers:
- **Lightweight visual tools (2×2)** during workshops for alignment
- **Skepticism toward numeric frameworks** — false precision is a recurring concern
- **Theme-based prioritization** — by user problem / outcome, not feature
- **Kano** useful diagnostically, not as sole tool

Verify at nngroup.com — "Prioritization Matrices," "UX Roadmaps," "Kano Model in UX."

---

## Workflow Integration

The skill uses prioritization output as follows:

1. Score every theme using the chosen framework
2. Rank-order within each horizon (Now / Next / Future)
3. Write scores into the Theme Detail blocks
4. Store the framework name and version in `config.json` under `optional_phases.roadmap.prioritization_framework`
5. At each review cycle, re-score and log delta in the Change Log
