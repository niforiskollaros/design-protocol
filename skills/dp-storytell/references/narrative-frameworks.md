# Narrative Frameworks — Full Reference

Twelve frameworks for structuring a design story, with exact structures and design-work examples. Use with the quick-selector in SKILL.md.

## Contents

- [1. SCR — Situation, Complication, Resolution](#1-scr--situation-complication-resolution-mckinsey)
- [2. NABC — Need, Approach, Benefits, Competition](#2-nabc--need-approach-benefits-competition-sri-international)
- [3. Minto Pyramid Principle](#3-minto-pyramid-principle-barbara-minto-1967)
- [4. STAR — Situation, Task, Action, Result](#4-star--situation-task-action-result)
- [5. 3-Act Structure](#5-3-act-structure)
- [6. Pixar Story Spine](#6-pixar-story-spine)
- [7. Hero's Journey](#7-heros-journey-joseph-campbell-simplified)
- [8. Dan Harmon's Story Circle](#8-dan-harmons-story-circle-8-steps)
- [9. Freytag's Pyramid](#9-freytags-pyramid-classical-5-act)
- [10. Problem-Agitate-Solve (PAS)](#10-problem-agitate-solve-pas)
- [11. Before / During / After](#11-before--during--after)
- [12. Pyramid Principle meets Heath's SUCCESs](#12-pyramid-principle-meets-heaths-successs)
- [Framework Selection Quick Reference](#framework-selection-quick-reference)
- [Meta-Rules Across All Frameworks](#meta-rules-across-all-frameworks)
- [Design-Specific Story Patterns](#design-specific-story-patterns)
- [Storytelling Anti-Patterns (content-level)](#storytelling-anti-patterns-content-level)

---

## 1. SCR — Situation, Complication, Resolution (McKinsey)

### Structure
- **Situation** — the stable context everyone agrees on
- **Complication** — what changed, what's at risk, what's painful
- **Resolution** — what we propose and why it works

### Best use
Executive pitches, design proposals, consulting engagements. Crisp, decision-oriented, minimum setup.

### Design-work example
> **Situation:** Our trial-to-paid conversion has been stable at 23% for 4 quarters.
> **Complication:** New research shows 40% of abandoners leave at step 3 of onboarding — a step introduced in last year's refactor.
> **Resolution:** Remove step 3's unasked-for configuration; move sample-data generation to first use. Expect +4 pts conversion within a quarter.

---

## 2. NABC — Need, Approach, Benefits, Competition (SRI International)

### Structure
- **Need** — a clear customer/user need
- **Approach** — how you'll address it
- **Benefits per Cost** — quantified value relative to effort
- **Competition** — why your approach wins vs. alternatives

### Best use
Design proposals where resources are being allocated; innovation pitches; feature sell-ins.

### Design-work example
> **Need:** B2B buyers need to compare 5+ enterprise options; current comparison table hides critical differentiators.
> **Approach:** Side-by-side comparison view with user-customizable columns, sourced from a structured feature catalog.
> **Benefits/Cost:** 3 engineer-months; projected +8% pipeline velocity (based on competitive benchmark); estimated $1.2M ARR lift.
> **Competition:** Competitors offer static tables; our dynamic approach is a defensible differentiator.

---

## 3. Minto Pyramid Principle (Barbara Minto, 1967)

### Structure
- **Top: governing thought** — one sentence; the recommendation
- **Middle: supporting points** — typically 3, MECE (mutually exclusive, collectively exhaustive)
- **Bottom: detail / evidence**

Intro uses **SCQA** (Situation → Complication → Question → Answer). Each level answers "why?" or "how?" from the level above.

### Best use
Written memos, executive one-pagers, board decks, any time the reader is senior and scanning.

### Design-work example
```
GOVERNING THOUGHT
Ship the redesigned checkout (single-page variant) in Q3 — expect +1.8 pts conversion and −22% support tickets.

SUPPORTING POINT 1: Users struggle with the current multi-step flow.
  Evidence: 4 of 6 participants failed task; 40% drop-off at step 3.

SUPPORTING POINT 2: Industry benchmark favors single-page.
  Evidence: Baymard 2024 benchmark; 3 top-5 competitors single-page.

SUPPORTING POINT 3: Internal cost model supports the investment.
  Evidence: $X projected ARR lift vs. $Y engineering cost; payback < 6 months.
```

---

## 4. STAR — Situation, Task, Action, Result

### Structure
- **Situation** — context
- **Task** — what needed doing
- **Action** — what you/team did
- **Result** — outcome, measured

### Best use
Case studies, retrospectives, postmortems, portfolio presentations, behavioral interviews.

### Design-work example
> **Situation:** Enterprise onboarding took 6 weeks average, driving CS cost and delaying time-to-value.
> **Task:** Cut onboarding time to under 2 weeks without reducing feature adoption.
> **Action:** Research + 3 design iterations + progressive-disclosure pattern + self-service checklist.
> **Result:** 11-day average (down from 42); support tickets during onboarding down 61%; NPS at 30-day up 18 pts.

---

## 5. 3-Act Structure

### Structure
- **Act 1 — Setup** — world, protagonist, inciting incident
- **Act 2 — Confrontation** — obstacles, stakes rise, low point
- **Act 3 — Resolution** — climax, new state

### Best use
Longer presentations (30+ min), strategic pivots, change-management narratives, keynote-style talks.

### Design-work example
> **Act 1:** Our users love our product. But last year, we lost 12% of our enterprise segment to a competitor who shipped faster.
> **Act 2:** We tried to match their pace with more designers — it didn't work. Features shipped but quality dropped, NPS fell, churn accelerated. We were on a path to lose the rest.
> **Act 3:** We invested in a design system. 18 months in, ship velocity doubled, design debt is tracked and shrinking, and NPS recovered. Here's the next phase.

---

## 6. Pixar Story Spine

### Structure
- Once upon a time…
- Every day…
- Until one day…
- Because of that…
- Because of that…
- Until finally…
- And ever since then…

### Best use
Warm, narrative-heavy presentations; user journey walkthroughs; research readouts with high emotional content.

### Design-work example
> Once upon a time, a small team shipped a product users loved.
> Every day, more users signed up, usage grew, and the product gained features.
> Until one day, a user named Priya spent 20 minutes trying to do a task that should've taken 2.
> Because of that, she gave up and called support — one of 800 tickets that week about the same screen.
> Because of that, we pulled the screen into research and discovered three converging failures.
> Until finally, we redesigned it with progressive disclosure, and weekly tickets dropped 82%.
> And ever since then, the screen is our most-praised example of "how to grow a product without growing complexity."

---

## 7. Hero's Journey (Joseph Campbell, simplified)

### Structure (3-stage simplified)
- **Call to Adventure** — the protagonist's ordinary world is disrupted
- **Trials** — they face obstacles, gain allies and skills
- **Return with Elixir** — they return transformed, with something to share

### Best use
Longform narrative — keynotes, company-all-hands, change narratives, case studies with personal arc.

### Design-work example
> **Call:** Our design team was drowning in review cycles; every decision required six meetings.
> **Trials:** We tried templates — too rigid. We tried async — too slow. We tried office hours — still didn't scale.
> **Return:** We built a critique protocol modeled on writing workshops: pre-read, silent observation, structured feedback, decision owner. Review cycles dropped 70%. We're sharing the protocol at the conference next month.

---

## 8. Dan Harmon's Story Circle (8 steps)

### Structure
1. A character is in a zone of comfort
2. But they want something
3. They enter an unfamiliar situation
4. Adapt to it
5. Get what they wanted
6. Pay a heavy price
7. Return to their familiar situation
8. Having changed

### Best use
Rich user-journey stories; customer success narratives with transformation arc.

---

## 9. Freytag's Pyramid (classical, 5-act)

### Structure
- **Exposition** — setup
- **Rising Action** — complications build
- **Climax** — turning point
- **Falling Action** — consequences unfold
- **Resolution** — new equilibrium

### Best use
Emotionally weighty presentations; cultural or strategic shifts; retrospectives on painful incidents.

---

## 10. Problem-Agitate-Solve (PAS)

### Structure
- **Problem** — name the pain
- **Agitate** — make the pain feel immediate and costly
- **Solve** — present the relief

### Best use
Marketing-adjacent presentations; sell-ins; pitches where urgency needs to be manufactured honestly. Use sparingly — easy to slip into fear-mongering.

### Design-work example
> **Problem:** 40% of users abandon at step 3.
> **Agitate:** That's 12,000 people a week who reach our product, decide it's not worth it, and leave forever. Every week. That's $4M in ARR walking away annually.
> **Solve:** Here's what 4 weeks of research and 2 weeks of redesign recovers.

---

## 11. Before / During / After

### Structure
- **Before** — state of the world before the work
- **During** — what happened, what was learned
- **After** — new state, measured

### Best use
Research readouts; case studies; retrospectives; design-system adoption stories.

### Design-work example
> **Before:** 6 designers, 5 different button styles, inconsistent accessibility. Velocity: 3 features/quarter.
> **During:** 4 months of design-system foundation work — token architecture, component library, accessibility audit, migration playbook.
> **After:** 1 token system, 1 component library, WCAG 2.1 AA baseline. Velocity: 9 features/quarter.

---

## 12. Pyramid Principle meets Heath's SUCCESs

Every story must pass the **SUCCESs test** (Chip & Dan Heath, *Made to Stick*):
- **Simple** — one core idea, ruthlessly curated
- **Unexpected** — breaks a pattern
- **Concrete** — specific users, real quotes, actual screens
- **Credible** — research / data / prototype backing
- **Emotional** — audience feels something
- **Story** — narrative arc, not a bullet list

### Common failures
- Long-winded → fails Simple
- Predictable → fails Unexpected
- Abstract ("users") → fails Concrete
- Opinion-only → fails Credible
- Detached → fails Emotional
- Feature-list → fails Story

---

## Framework Selection Quick Reference

| Purpose | Framework | Why |
|---|---|---|
| Pitch to exec | SCR + Minto | Fast, decision-oriented |
| Research readout | Before/During/After or Problem-Insight-Recommendation | Evidence-heavy |
| Design proposal | NABC | Forces quantified value |
| Case study | STAR | Outcome-measured |
| Change narrative | 3-Act | Arc carries emotion |
| Longform keynote | Hero's Journey or Story Circle | Journey-based |
| Research with empathy | Pixar Story Spine | Warm, human |
| Strategic pivot | Freytag's Pyramid | Dramatic weight |
| Sell-in / urgency | PAS | Manufactured tension (careful) |
| Executive memo | Minto Pyramid | Scannable, MECE |

---

## Meta-Rules Across All Frameworks

1. **Audience is the hero.** You are the mentor (Yoda, not Luke). — Duarte
2. **Every talk has a throughline.** One sentence that connects every element; if a section doesn't serve it, cut it. — Anderson
3. **Show, don't tell.** Prototypes > screenshots > bullet lists. — Duarte, Anderson
4. **Oscillate between "what is" and "what could be."** Tension sustains attention. — Duarte
5. **End on New Bliss.** The future state *if the audience acts*. Never end flat. — Duarte
6. **Seed a STAR moment.** One repeatable, memorable beat somewhere in the middle. — Duarte

---

## Design-Specific Story Patterns

Beyond the formal frameworks above, these are patterns that work specifically for design work.

### Pattern A — User quote opener
Start with a verbatim user statement. Creates immediate empathy and credibility.
> *"I've been trying to do this for 20 minutes and I just gave up."* — Sarah, P4

### Pattern B — Before / After side-by-side
Two screens. Current state left, proposed right. Minimal annotation. The contrast speaks.

### Pattern C — Data-insight-action
Number → what it means → what we do about it.
> *"40% of users abandon at step 3. That's the step we introduce unasked-for configuration. We propose removing it."*

### Pattern D — Journey-emotion curve
Plot the emotion line across phases. Point to valleys. Show the fix narrows or closes the valley.

### Pattern E — Counterfactual
"If we don't do this, here's what happens." Used sparingly — too often and it reads as fear-mongering.

### Pattern F — Small-bet demo
Show a cheap prototype or scrappy test that validates the direction. Reduces risk perception.

### Pattern G — Expert-voice sandwich
Your opinion, supported by an authoritative source (Nielsen heuristic, research paper, competitor benchmark), then back to your specific case.

---

## Storytelling Anti-Patterns (content-level)

Guard against these when structuring the narrative and content (for delivery-level anti-patterns, see `delivery-tactics.md`):

1. **Process-dump** — walking the audience through your timeline instead of the user's story
2. **No antagonist** — presenting "what we built" without "what was broken"
3. **Feature parade** — listing deliverables instead of tying to outcomes
4. **Jargon soup** — using designer/PM terms with an audience that doesn't share them
5. **Bullet-hellscape** — slides full of text; text on slides competes with the speaker
6. **No ask** — ending with "any questions?" instead of a specific decision request
7. **Weak evidence** — "users told us" with no named users, no quote, no count
8. **Symmetry worship** — equal time to every alternative, even weak ones; audience loses signal
9. **Under-rehearsed** — reading slides; losing timing; running 2x over
10. **Single-audience deck for a multi-audience meeting** — if there are 3 audiences in the room, pick the primary and say so
11. **Over-rehearsed / over-polished** — feels like a commercial; audience disengages
12. **Ignoring the room** — sticking to script when the audience has already moved on
