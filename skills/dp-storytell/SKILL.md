---
name: dp-storytell
description: >
  Transform design work into compelling stories for stakeholders, executives, engineering, and
  customers. Based on NNGroup storytelling methodology (Rachel Krause), Nancy Duarte, Minto Pyramid,
  and Heath brothers' SUCCESs. Trigger for "/dp:storytell", design presentation, stakeholder
  review, exec update, research readout, design critique prep, pitch deck, demo script, design
  narrative, storytelling for UX. Cross-phase skill — invoke after any DP phase to produce
  a ready-to-deliver presentation outline with structure, speaker notes, and audience-specific
  framing.
---

# Storytelling for Design Work

Great design loses to mediocre design that's better told. This skill packages the output of any DP phase into a deliberately structured narrative for a specific audience — so the design actually lands, gets approved, and drives action.

> **NNGroup framing (Krause):** A design story doesn't describe what you built. It dramatizes why it mattered, what happened, and what we do next.

---

## When to Use This Skill

Run `/dp:storytell` when you need to:

- **Pitch new design work** to leadership (get approval / budget)
- **Review a design** with cross-functional stakeholders
- **Present research findings** to a broad audience
- **Demo a prototype** to customers, execs, or internal users
- **Write an executive one-pager** summarizing a design decision
- **Prepare for a design critique** (your own or someone else's)
- **Run a postmortem** on a shipped design
- **Respond to skepticism** about a design direction

**Don't use this skill for:**
- Writing requirements → `/dp:prd`
- Building a journey map → `/dp:journey`
- Making design decisions → `/dp:ux`, `/dp:ui`
- Sprint-level updates (too tactical for narrative structure)

---

## DP Workflow Integration

This is a **cross-phase skill** — it does not sit at a specific workflow position. It can be invoked:

- After any DP phase to communicate the output
- At end of workflow as a capstone (`/dp:verify` → `/dp:storytell`)
- Standalone, not tied to a DP workflow

### Detecting Workflow Mode

At the start of any invocation, detect the mode by checking for `.design/config.json`: if present, run in **workflow mode** (load prior-phase context, write outputs under `.design/`, update state, and hand off to the next phase); if absent, run in **standalone mode** (operate independently and offer to save output).

At the start of any `/dp:storytell` invocation:

1. **Check for `.design/config.json`**
2. **If found** (workflow mode):
   - Load `.design/config.json`
   - Ask: "Which phase output are we telling the story of?"
   - Let the user pick: Discovery / PRD / Journey / Roadmap / Research / UX / UI / Review / Full workflow
   - Load the relevant `.design/phases/*.md` file(s)
   - **Check for storytelling-specific context:** if the user ran `/dp:discuss` before this skill, load any `.design/phases/STORYTELL-*-CONTEXT.md` files that exist. Use them to pre-fill the audience, framework, and framing questions below.
   - Proceed to audience + format selection
3. **If not found** (standalone mode):
   - Ask the user to describe or paste the content to be told as a story
   - Proceed to audience + format selection

### Output (Workflow Mode)

Writes to `.design/phases/PRESENTATION-[topic].md` — one file per audience+format combination, so multiple presentations can coexist for the same content.

---

## Three Core Principles

Every presentation this skill produces is built on three principles, drawn from Nancy Duarte, Barbara Minto, and Tom Greever.

### Principle 1 — Conflict is the engine (Duarte)
No conflict, no story. Nancy Duarte's **Sparkline** frames every great talk as oscillation between **"What Is"** (current state) and **"What Could Be"** (aspirational future), ending on **"New Bliss"** (the state *if the audience acts*).

Every presentation must contain:
- A clear **protagonist** — the user, or the team (not the company)
- A clear **antagonist** — the current painful state, the constraint, the risk
- A clear **resolution** — what we're proposing and why it works

The audience is the hero. You are the mentor (Yoda, not Luke).

Include somewhere in the middle a **STAR moment** ("Something They'll Always Remember") — a repeatable sound bite, a shocking stat, an evocative image, or a dramatic demo.

### Principle 2 — Answer first (Minto)
Per Minto Pyramid Principle: lead with your conclusion, then support it. Executives don't want a mystery novel — they want the verdict in sentence one, then the evidence.

Minto's **SCQA intro structure:**
- **Situation** — the stable context everyone agrees on
- **Complication** — what changed or what's at risk
- **Question** — the question the complication raises
- **Answer** — your recommendation (the governing thought)

Below the governing thought, group supporting ideas **MECE** (mutually exclusive, collectively exhaustive). Each level answers "why?" or "how?" from the level above.

**Answer-first for execs, process-second for peers.**

### Principle 3 — The response loop (Greever)
When feedback comes — especially critical feedback — don't defend. Use Tom Greever's 3-step process from *Articulating Design Decisions*:

1. **Listen** — let them finish. Take notes. Don't interrupt even if they're wrong.
2. **Understand** — restate their concern in your words: *"So what I'm hearing is you're worried that X will cause Y. Is that right?"* Confirms, refines vague concerns, buys thinking time.
3. **Respond** — tie your answer to (a) the project goal, (b) the user, and (c) a prior agreement or data point.

This loop appears in the Q&A prep and delivery notes of every output.

---

## Audience Framework

Every story is built for a specific audience. Pick one at the start.

### The 5 Primary Audiences

| Audience | Primary concern | Time budget | Preferred format |
|---|---|---|---|
| **Executive / leadership** | Business outcome, risk, resources | 5-10 min | Answer-first, 1-pager, BLUF |
| **Peer designer / design review** | Craft quality, alternatives considered, rationale | 30-60 min | Process-narrative, critique-ready |
| **Engineering** | Feasibility, constraints, edge cases, handoff quality | 20-45 min | Spec-backed, state-rich |
| **Product management** | Metrics, tradeoffs, scope, sequencing | 20-40 min | Theme-based, outcome-tied |
| **Customer / end user** | Benefit to me, no jargon, visible value | 5-15 min | Demo, before/after, testimonial |

### Audience diagnostic questions (skill asks these)

Before writing the story, the skill asks:
1. Who is the primary audience? (pick one from above — if multiple, prioritize)
2. What decision do they need to make?
3. What's their starting position? (supportive / neutral / skeptical / hostile)
4. How much time do they have?
5. What's the delivery mode? (live presentation / deck to read / memo / demo)
6. What's the worst-case objection?

These answers govern every downstream choice.

---

## Narrative Frameworks

The skill selects a narrative framework based on the story's purpose. See `references/narrative-frameworks.md` for full details on each.

### Quick selector

| Purpose | Framework |
|---|---|
| Pitch new work to exec | **SCR** (Situation → Complication → Resolution) + Minto |
| Research findings readout | **Before / During / After** or **Problem-Insight-Recommendation** |
| Design proposal | **NABC** (Need, Approach, Benefits per Cost, Competition) |
| Pivot / strategic shift | **3-Act Structure** (setup, confrontation, resolution) |
| Case study / retro | **STAR** (Situation, Task, Action, Result) |
| Journey / change story | **Pixar Story Spine** or **Hero's Journey** |
| Complex explanation for a lay audience | **Pyramid Principle** (Minto) |
| Highly emotional / cultural shift | **Freytag's Pyramid** (exposition → rising action → climax → resolution) |

### The Heath brothers' SUCCESs (message stickiness)
Every story the skill produces is tested against 6 criteria — **Simple, Unexpected, Concrete, Credible, Emotional, Story** — applied in the output SUCCESs self-check below. See `references/narrative-frameworks.md` (#12) for each criterion and its common failure mode.

---

## Content-Type Templates

The skill supports six distinct content types. Pick one based on the goal, then use the full worked template.

| Type | Goal | Default framework |
|---|---|---|
| **1 — Design Proposal** | Get approval / budget / resources | SCR + NABC + Minto |
| **2 — Design Review** | Get usable feedback; align peers | Process narrative (peers) / Problem-Solution (PMs) |
| **3 — Research Readout** | Share insights; drive decisions | Problem-Insight-Recommendation per finding |
| **4 — Executive One-Pager** | Busy leader decides without a meeting | BLUF + Minto Pyramid |
| **5 — Prototype / Demo Walkthrough** | Audience experiences the design | Journey-based (walk the user's path) |
| **6 — Postmortem / Retrospective** | Learn from what happened | STAR or 3-Act |

See `references/content-type-templates.md` for the full end-to-end structure, slide-by-slide breakdowns, and worked examples of each type.

Beyond these formal templates, `references/narrative-frameworks.md` catalogs **design-specific story patterns** (user-quote opener, before/after, data-insight-action, journey-emotion curve, counterfactual, small-bet demo, expert-voice sandwich) to use as opening/beat devices.

---

## Stakeholder Dynamics & Visual Storytelling

Real presentations have difficult moments (skeptics, "I don't like blue," scope-expansion attacks, the silent room, leadership override, design-by-committee) and depend on how slides, prototypes, and video clips carry the story.

See `references/delivery-tactics.md` for the full playbook: handling each difficult moment, and the Visual Storytelling Principles (slide design, prototype vs static decision, video-clip best practices).

---

## Output Structure (Workflow Mode)

Writes to `.design/phases/PRESENTATION-[topic].md`:

```yaml
---
phase: storytell
skill: dp-storytell
content_type: [design_proposal | design_review | research_readout | exec_one_pager | demo_walkthrough | postmortem]
source_phases: [discovery | prd | journey | roadmap | research | ux | ui | review]
audience: [executive | peer | engineering | product | customer]
framework_used: [SCR | NABC | Minto | STAR | 3-Act | Pixar Spine | Problem-Insight-Recommendation]
delivery_mode: [live_presentation | deck_to_read | memo | demo]
duration: [5min | 15min | 30min | 60min]
completed: YYYY-MM-DDTHH:MM:SSZ
---

# Presentation: [Topic]

> Audience: [primary audience]
> Framework: [chosen framework]
> Duration: [target]
> Delivery: [mode]

## Opening Hook

**Hook type:** [user quote | data point | provocative question | before/after]

**Opening line (speak first):**
> "[Exact opening sentence]"

**Visual (show first):**
[Description of first slide / screen / image]

---

## Narrative Arc (beat-by-beat)

### Beat 1 — [Name] ([time allocation])
**Goal:** [what this beat accomplishes]
**Content:**
- [Point 1]
- [Point 2]

**Speaker notes:**
> "[What to say verbatim]"

**Visual:**
[What to show]

**Transition to next beat:**
> "[Transition sentence]"

[Repeat for each beat]

---

## Evidence Package

**Data points** (max 3 headline numbers):
1. [Number] — [what it means] — [source]
2. ...

**User quotes** (max 3, 1-2 sentences each):
1. *"[Quote]"* — [User identifier], [context]
2. ...

**Visuals** (in order of appearance):
1. [Current state screen / painful path]
2. [Proposed state screen / improved path]
3. [Data visualization]

---

## The Ask

**Primary ask (one sentence):**
> "[What you need from the audience]"

**Decision criteria** (how they'll evaluate):
- [Criterion 1]
- [Criterion 2]

**Timeline:**
- Decision needed by: [date]
- Execution starts: [date]

---

## Q&A Preparation

**Top 5 anticipated questions:**
1. **Q:** [Likely question]
   **A:** [Crisp answer, 1-3 sentences]
2. ...

**Hostile questions & redirects:**
- If asked "[X]" → respond with "[Y]"

**What to do if asked something you don't know:**
> "Great question — I want to give you a data-backed answer. Let me come back within 24 hours with specifics."

---

## Delivery Notes

- **Pacing:** [where to slow down, where to speed up]
- **Silences:** [where to pause intentionally]
- **Physical:** [in-person only — stand/sit, hands, movement]
- **Voice:** [emphasis points, tone shifts]

---

## Slide-by-Slide Outline

(If the format is a deck.)

| # | Slide title | Visual | Speaker beat |
|---|---|---|---|
| 1 | [Title or hook] | [Image] | [Beat 1 opening] |
| 2 | ... | ... | ... |

---

## SUCCESs Self-Check

- [ ] **Simple** — core idea in one sentence?
- [ ] **Unexpected** — does it break a pattern?
- [ ] **Concrete** — specific users, real quotes, actual screens?
- [ ] **Credible** — research, data, or prototype backing?
- [ ] **Emotional** — will the audience feel something?
- [ ] **Story** — clear arc with conflict and resolution?

---

## Post-Presentation Follow-Up Plan

- **Send-after artifact:** [1-pager / recording / deck]
- **Decision capture:** [what was decided / deferred / rejected]
- **Follow-up owners:** [who does what next]
- **Success measure:** [what tells us the presentation worked]
```

---

## State Updates (Workflow Mode)

After completing the presentation:

1. **Write output to `.design/phases/PRESENTATION-[topic].md`**

2. **Update `.design/STATE.md`:**
```markdown
### Last Activity
- **Date:** [TIMESTAMP]
- **Action:** Built presentation for [audience] with /dp:storytell
- **Content type:** [type]
- **Source phase:** [phase]
```

3. **Update `.design/config.json`:** APPEND a new entry to the existing `optional_phases.storytell.presentations` array and **flip `optional_phases.storytell.enabled` to `true`**. **Do not replace the array.** Multiple presentations (different topics, audiences, framings) coexist over the project's life — overwriting here silently drops every earlier presentation's metadata.

Procedure:
1. Set `optional_phases.storytell.enabled = true`. (Downstream consumers like `/dp:verify` key off this flag — without flipping it, the just-generated presentation is treated as if storytelling was never run.)
2. Read the current value of `optional_phases.storytell.presentations`. If it doesn't exist, initialize to `[]`.
3. Dedupe key: `topic + audience + delivery_mode`. If an entry with the same key already exists, overwrite just that entry in place (user re-generated the same presentation). Otherwise, push a new entry.
4. Write the full merged array back.

Entry shape:
```json
{
  "topic": "[name]",
  "audience": "[audience]",
  "framework": "[framework]",
  "delivery_mode": "[live_presentation | deck_to_read | memo | demo]",
  "file": "PRESENTATION-[topic].md",
  "created": "YYYY-MM-DDTHH:MM:SSZ"
}
```

Example resulting config after three presentations have been generated:
```json
{
  "optional_phases": {
    "storytell": {
      "enabled": true,
      "presentations": [
        { "topic": "q2-exec-readout", "audience": "executive", "framework": "SCR", "delivery_mode": "live_presentation", "file": "PRESENTATION-q2-exec-readout.md", "created": "2026-04-19T10:00:00Z" },
        { "topic": "q2-exec-readout", "audience": "peer", "framework": "Process", "delivery_mode": "deck_to_read", "file": "PRESENTATION-q2-peer-review.md", "created": "2026-04-20T14:00:00Z" },
        { "topic": "research-findings", "audience": "product", "framework": "Problem-Insight-Recommendation", "delivery_mode": "live_presentation", "file": "PRESENTATION-research-findings.md", "created": "2026-04-21T09:00:00Z" }
      ]
    }
  }
}
```

**Never write `"presentations": [{ single new entry }]`** — that deletes earlier metadata. Always merge into whatever is already there.

---

## Handoff (Workflow Mode)

```
═══════════════════════════════════════════════════════════════════════════════
PRESENTATION READY
═══════════════════════════════════════════════════════════════════════════════

Output: .design/phases/PRESENTATION-[topic].md

Summary:
• Audience: [primary audience]
• Content type: [type]
• Framework: [framework]
• Duration: [target]
• Delivery: [mode]

SUCCESs check: [Simple ✓ | Unexpected ✓ | ...]

Next Steps:
────────────────────────────────────────────────────────────────────────────────
1. Review and edit the narrative arc
2. Build the deck/prototype/memo from the outline
3. Rehearse with a trusted reviewer
4. Deliver
5. Return with outcome — optionally run /dp:storytell again for a different audience

Or:
→ /dp:storytell — Create another presentation for a different audience
→ /dp:progress — Review full workflow status
═══════════════════════════════════════════════════════════════════════════════
```

---

## Standalone Mode Behavior

When no `.design/` directory exists:

1. Ask: "What are you presenting? Paste the content, or describe the design work."
2. Ask audience (from the 5 primary)
3. Ask content type (from the 6 templates)
4. Ask delivery mode and duration
5. Generate the full presentation outline
6. Output inline
7. Offer: "Want to start a DP workflow to keep this presentation linked to future design phases?"

---

## Common Anti-Patterns

The skill actively guards against content-level anti-patterns (process-dump, no antagonist, feature parade, jargon soup, bullet-hellscape, no ask, weak evidence, symmetry worship, under-rehearsed, single-audience deck for a multi-audience room, over-polished, ignoring the room).

See `references/narrative-frameworks.md` ("Storytelling Anti-Patterns") for the full list, and `references/delivery-tactics.md` for delivery-level anti-patterns.

---

## Reference Files

Load these as needed:

- **references/narrative-frameworks.md** — Full structures for 12+ frameworks (Freytag, Hero's Journey, Pixar Spine, 3-Act, Story Circle, SCR, Minto, STAR, NABC, PAS, Before/During/After, SUCCESs) with design-work examples
- **references/audience-playbooks.md** — Deep playbooks for each of the 5 audiences: what they care about, what they dismiss, what questions they'll ask, how to win them
- **references/content-type-templates.md** — Full end-to-end templates for each of the 6 content types, with worked examples
- **references/delivery-tactics.md** — Pacing, silence, handling skeptics, responding to "I don't like blue," scope-expansion defense, the silent-room rescue, pre-wiring stakeholders

---

## Config Integration

Respects these settings from `.design/config.json`:

```json
{
  "optional_phases": {
    "storytell": {
      "enabled": true,
      "default_audience": "executive",
      "default_duration": "15min",
      "default_framework": "SCR",
      "include_qa_prep": true,
      "include_success_check": true
    }
  }
}
```

---

## Workflow Navigation

```
Any phase → /dp:storytell → Presentation artifact (for chosen audience)

                     ┌─────────────────────┐
  Any DP phase ─────►│ /dp:storytell     │─────► PRESENTATION-[topic].md
                     │ Cross-phase skill   │
                     └─────────────────────┘
```

| | |
|---|---|
| **Triggered from** | Any DP phase, or standalone |
| **Input** | Any phase output artifact (or pasted content) |
| **Output** | PRESENTATION-[topic].md — ready-to-deliver narrative |
| **Related** | `/dp:verify` — capstone review (typical predecessor) |
| | `/dp:research` — if the presentation needs more evidence |
| | `/dp:progress` — see other presentations created |
