# Research Methods for Journey Mapping

How to fill each swimlane with evidence. Never fabricate. If research is missing, enter hypothesis mode and log the gap.

---

## Swimlane → Method Matrix

| Swimlane | Best method | Acceptable substitutes | Red flags |
|---|---|---|---|
| **Actions** | Contextual inquiry, usability testing, analytics funnels | Support ticket review, sales call recordings | Assumptions from product team ("users probably…") |
| **Thoughts / Mindset** | Semi-structured interviews, think-aloud usability | Diary studies, session replays with narration | Marketing-voice ("delighted users say…") |
| **Emotions** | Interviews with emotional probes, diary studies | Sentiment analysis of reviews, survey NPS comments | Designer-projected feelings without user validation |
| **Touchpoints** | Touchpoint inventory workshop + analytics | Support team interviews (they know every channel) | Only listing channels the org *wants* used |
| **Pain Points** | Support tickets + interviews + churn exits | Session replays, heatmaps, complaint reviews | Only listing polite / survey-compliant feedback |
| **Opportunities** | Derived from pain points + jobs-to-be-done | Ideation workshops grounded in research | Ideas generated without pain-point anchors |
| **Backstage (blueprints)** | Employee interviews, process observation | SOP docs, Slack archives | Customer-side assumptions about internal ops |

---

## How Much Research Is Enough?

Per NNGroup's "base it on truth" principle:

### Minimum viable research (for one map)
- **5-8 user interviews** with people who match the actor persona
- **Review of 20+ support tickets** from the last 90 days (if applicable)
- **1 touchpoint inventory workshop** with CS, sales, ops
- **Analytics pull** for the key funnel (if quantitative exists)

### Stronger basis (for consequential maps)
- 10-15 interviews across 2-3 segments of the actor persona
- Diary study (5-10 participants, 1-2 weeks)
- Usability test of 2-3 scenarios (N=5 minimum, Nielsen)
- Employee interviews if service blueprint (minimum 3 per team)

### Hypothesis mode triggers
Enter hypothesis mode if any of these are true:
- Zero user interviews have been conducted
- Only indirect data (exec opinions, sales calls, surveys with <20 responses)
- The actor/persona is aspirational (you don't have any yet)
- The scenario is future-state and the team hasn't tested a prototype

---

## Interview Question Bank — Journey-Focused

Use these in `/dp:research` interviews to feed journey synthesis:

### Warm-up (establish context)
- Walk me through the last time you [did the scenario activity]
- What triggered you to [start the journey]?

### Phase exploration (per phase)
- What did you do at that point?
- What were you trying to figure out?
- What were you thinking when [specific event]?
- What made you feel [emotion observed]?

### Pain discovery
- What was the most frustrating part?
- What almost made you quit?
- What did you have to work around?

### Expectation check
- What were you expecting that didn't happen?
- What surprised you?

### Comparison (for experience maps)
- How else could you have [achieved the goal]?
- What else did you try?

### Closure
- If you could change one thing about that experience, what would it be?

---

## Synthesizing Research Into Swimlanes

### Step 1 — Transcribe and tag
Tag every research statement with:
- Phase it belongs to
- Swimlane (Action / Thought / Emotion / Pain / Opportunity / Touchpoint)
- Emotional valence (+2 / +1 / 0 / -1 / -2)

### Step 2 — Affinity diagram
Cluster tagged statements per (phase, swimlane). Patterns emerge where 3+ participants converge.

### Step 3 — Extract the narrative
For each phase, write 1-3 sentence narrative summarizing the cluster. Attribute quotes.

### Step 4 — Plot emotion curve
Average emotional valence per phase. Draw the line.

### Step 5 — Derive opportunities
For each pain point (valence -1 or -2), ask: what would need to change to move this to 0 or +1?

---

## Validating a Journey Map

Post-synthesis, run the map by:

1. **3-5 users who match the actor** — do they recognize themselves?
2. **2-3 employees who serve this actor** — does it match what they see?
3. **The journey owner** — are the opportunities aligned with strategy?
4. **Engineering / ops** — are the backstage claims (if service blueprint) accurate?

Red flag: if validation reveals >20% of the map is wrong, the research basis is too thin — redo with more participants before shipping the map as an alignment tool.

---

## Quantitative Overlays

Once qualitative is solid, overlay quantitative:

| Overlay | What it adds | Source |
|---|---|---|
| Drop-off % per phase | Objective severity ranking | Analytics |
| Time-in-phase | Identifies stuck points | Analytics |
| Support contact rate per phase | Confirms pain points | Support system |
| NPS by phase | Confirms emotion curve | Survey |
| Completion rate | Overall journey health | Analytics |

Quantitative validates qualitative — it does not replace it.
