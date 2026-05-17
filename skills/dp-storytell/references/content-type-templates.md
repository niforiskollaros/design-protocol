# Content-Type Templates — Worked Examples

Full end-to-end templates for each of the 6 content types. Use as scaffolding; adjust based on audience playbook.

---

## Template 1 — Design Proposal (Pitching New Work)

### Goal
Get approval / budget / resources to start a new initiative.

### Default framework
SCR + NABC + Minto

### Structure (15-min version)

**Slide 1 — Hook (1 min)**
Single user quote or data point + one visual.
> "I can't find where I signed up for this — help." — Enterprise admin, 8 yrs tenure

**Slide 2 — Situation (2 min)**
Current state, agreed on by all.
> We acquired 4,200 enterprise accounts last year. Average activation takes 6 weeks. Top-quartile accounts activate in 2.

**Slide 3 — Complication (3 min)**
What's at risk; why this matters now.
> 38% of new enterprise accounts don't reach first value inside 30 days. CS spends 22 hours per account hand-holding. Competitor [X] just launched 48-hour activation. Churn-at-90-days has risen 4 pts in the last two quarters.

**Slide 4-5 — Evidence (3 min)**
Research / data / benchmarks. Max 3 headline numbers + 1 user quote.

**Slide 6-7 — Resolution (4 min)**
What we propose. 3 supporting points, MECE.
> 1. Progressive onboarding (tied to value milestones, not config)
> 2. Self-serve checklist replacing CS hand-holding
> 3. Automated early-risk detection

**Slide 8 — Ask (1 min)**
Specific decision needed.
> Approval to start in Q3. $280K budget (3 designers × 6 months, 1 PM, 2 engineers). Decision by [date] to stay on critical path.

**Slide 9 — Risk if we don't (1 min)**
The counterfactual.
> Status quo: continued activation-time drift, CS cost scaling with accounts, competitive erosion. We project 6-point churn impact within 4 quarters.

### Slide-by-slide variation rules
- Executive audience → compress to 5 slides total (Hook / Situation+Complication / Resolution / Ask / Risk)
- Engineering audience → expand Resolution to 4 slides, add Constraints slide
- Mixed audience → lead with exec version; move detail to appendix

---

## Template 2 — Design Review (Showing Work for Critique)

### Goal
Get usable feedback; align peers on direction.

### Default framework
Process narrative for peers; Problem-Solution for PMs

### Structure (60-min version)

**Pre-read (sent 24h ahead):**
- One-paragraph context: problem, goal, constraints
- Link to Figma / prototype
- Explicit ask: *"I want feedback on [X]. I do not want feedback on [Y]."*

**0-3 min — Recap**
Problem, goal, constraints, ask. Reset the frame.

**3-8 min — Walk the design (no commentary)**
Show, don't defend. Just walk through. No justifications yet.

**8-15 min — Clarifying questions only**
Facilitator enforces: no feedback yet. Prevents first-voice bias.

**15-40 min — Structured feedback**
Round-robin. Each reviewer answers the specific ask. Timer per person.

**40-50 min — Open discussion**
Trade-offs, alternatives, parking-lot any scope expansion.

**50-55 min — Decisions + owners + dates**
One person writes in real-time on a shared doc. Who does what by when.

**55-60 min — Buffer**
Don't run over.

### Rules (Bob Baxley / Julie Zhuo)
- *Design review is not a vote. It is a decision meeting with an owner.*
- Critique the work, not the person
- Restate the designer's goal first; critique against that goal only
- The designer owns the decision; reviewers give input, not orders

### The pre-read scope contract
Every design review opens with:
> *"Today's decision is about [X]. Out of scope for today: [Y, Z]. Parking-lot anything else."*

---

## Template 3 — Research Readout

### Goal
Share insights; drive decisions from research.

### Default framework
Problem-Insight-Recommendation per finding

### Deck structure (15-25 slides)

1. **Cover** — project, date, team
2. **TL;DR** — 3 bullets + one most-important decision this research unblocks
3. **Research questions** — verbatim from the plan
4. **Method** — one slide: N participants, recruitment criteria, tasks, dates, tool
5. **Who we talked to** — participant grid (personas/segments), never real names
6. **Key findings (3-5 max)** — one slide per finding: headline + evidence + quote + clip
7. **Journey / emotion curve** — visual synthesis
8. **Recommendations** — prioritized, linked to finding IDs
9. **What changes now** — owners + next steps
10. **Appendix** — raw notes, quote bank, severity matrix, clip index

### Finding slide template
```
┌───────────────────────────────────────────────────────────┐
│ FINDING #3: Users mistake system status for input state    │
│ Severity: 4 (Catastrophe) · Observed in: 5 of 6 users     │
├───────────────────────────────────────────────────────────┤
│ OBSERVATION (what happened)                                │
│ 5 of 6 participants clicked the green checkmark thinking  │
│ they were confirming; it was only a validation indicator. │
│                                                            │
│ INSIGHT (so what)                                          │
│ Visual affordance and action aren't distinguished. Users  │
│ fall back to web conventions where color = interactivity. │
│                                                            │
│ RECOMMENDATION (action)                                    │
│ Replace checkmark with passive text "✓ Valid"; add an     │
│ explicit button. Owner: Design. Sprint 23.                 │
├───────────────────────────────────────────────────────────┤
│ [15-sec video clip] · "P3: 'I thought I submitted it'"     │
└───────────────────────────────────────────────────────────┘
```

### NNGroup severity scale (Nielsen 0-4)
- **0** — not a usability problem
- **1** — cosmetic (fix only if extra time)
- **2** — minor (low priority, fix next release)
- **3** — major (important to fix, high priority)
- **4** — catastrophe (imperative to fix before release)

Severity = f(Frequency × Impact × Persistence). Have 3+ evaluators rate independently, then average.

### Quote rules
- 1-2 per finding in the deck; 3-5 in the appendix
- 1-3 sentences max; trim with `[...]`
- Attribution format: `P4, Enterprise admin, 8 yrs tenure` — never real names
- Pull-quote style: larger than body, italicized
- Never paraphrase and call it a quote
- Prefer quotes that reveal *inner thinking*, not just surface behavior

### Video clip rules
- 20-60 seconds per clip; absolute ceiling ~90s
- Context slide before: "You're about to watch P3 trying to add a second payment method"
- Caption heavily (accessibility + silent rooms)
- Lower third: participant ID, task, timestamp
- Debrief slide after: what you want them to have noticed
- Never more than 3 clips in a row
- Transcribe below the clip

### Observation → Insight → Recommendation (mandatory 3 layers)
The #1 mistake is listing problems without prescribing action. Every finding has all three layers. Strip any slide that doesn't move a decision.

### Counts vs percentages
NNGroup: never report percentages with N<20 without a caveat. With 5-8 users, report counts (`4 of 6`), not percentages.

### Stakeholder-empathy tactics (GV / NNGroup)
- **Watch parties** — stakeholders watch sessions live; 1 hour of observation beats 20 pages of report
- **Rotating note-taker role** — different PM/eng per sprint
- **"Bring a finding" standup** — weekly 5 min, one member shares one observation
- **Insight wall / research repo** — tagged, findable
- **Pre-reads with a question** — "what would you want to explore?" guarantees engagement

---

## Template 4 — Executive One-Pager

### Goal
Busy leader makes a decision without a meeting.

### Default framework
BLUF + Minto Pyramid

### Exact structure
```
TITLE: [Decision needed] — [Project], [Date]
OWNER: [Name] | DECIDER: [Exec] | DEADLINE: [Date]

RECOMMENDATION (1 sentence)
Ship X by Y to achieve Z.

WHY NOW (2-3 bullets)
- Market / user / competitive pressure
- Cost of inaction
- Window of opportunity

WHAT WE LEARNED (3-5 bullets, evidence)
- User research finding (N=)
- Data point (conversion, churn, etc.)
- Benchmark / competitive signal

THE DESIGN (1 hero image + 2 alt images max)
[Annotated screen — callouts tie to the 3 "why now" points]

OPTIONS CONSIDERED (table)
| Option | Cost | Risk | Outcome | Verdict |

ASK
- Approval on X
- $ or headcount Y
- Decision by Z

APPENDIX LINK (prototype, full research, system spec)
```

### Rules
- One page. Really. If it spills, the decision isn't clear enough.
- Hero image earns 60% of the page
- No jargon the exec hasn't used in the last quarter
- Every claim has a unit (dollars, %, users, minutes)

---

## Template 5 — Prototype / Demo Walkthrough

### Goal
Audience experiences the design firsthand.

### Default framework
Journey-based — walk the user's path

### Structure

**Opening (10% of time) — Set the scene**
> "Imagine you're Priya, a new enterprise customer. You've just received a welcome email. It's Monday morning."

Never start with "Here's our new feature." Always start with "Imagine you're…".

**Core walkthrough (70% of time) — Walk the path**
- Narrate in user voice, not designer voice
- "Priya clicks here, and she sees…" not "We built this screen to…"
- Pause at friction → "Here's where the old version made her give up"
- Continue through resolution → "Here, she's done in 3 clicks instead of 11"

**Zoom-out moments (15% of time) — Highlight rationale**
3-4 pauses during the walkthrough to zoom out:
> "Here's why we chose [pattern] — research showed [evidence]."

**Edge cases (5% of time) — What we haven't yet designed**
Transparent about unfinished parts. Builds trust.

### Prototype vs. static decision
- Exec audience → static hero + 20-sec clip (prototypes break live)
- Peer / eng audience → interactive prototype
- Research / usability → interactive (users need to do, not see)
- Board / investor → static, polished

**The three prototype failure modes with execs:**
1. Breaks live → catastrophic credibility hit
2. Invites pixel-peeping → critique of microcopy instead of strategy
3. Eats the clock → 2-min click-through kills a 10-min slot

---

## Template 6 — Postmortem / Retrospective

### Goal
Learn from what happened; improve next cycle.

### Default framework
STAR or 3-Act

### Structure

**Part 1 — What we set out to do (15%)**
- Original goal
- Hypotheses we held
- How we'd know it worked

**Part 2 — What happened (35%)**
- Timeline of key events (dates, decisions)
- Metrics across the cycle (not just end-state)
- Surprises (positive and negative)

**Part 3 — What we learned (35%)**
- Correct calls we made (and why)
- Wrong calls we made (and why)
- Assumptions validated
- Assumptions broken
- Surprises we didn't see coming

**Part 4 — What changes (15%)**
- Concrete process changes for next cycle
- Owners for each change
- When we'll check in on whether it worked

### Blameless-postmortem rules
- No "who" attribution for failures
- Focus on systems, not individuals
- Distinguish "bad outcome from bad decision" vs. "bad outcome from good decision that didn't work"
- End on changes, not blame
