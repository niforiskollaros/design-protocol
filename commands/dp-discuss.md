---
name: dp-discuss
description: Capture design decisions and context before running a phase skill. Creates a CONTEXT.md file with resolved gray areas, assumptions, and direction.
---

# /dp:discuss — Pre-Phase Decision Capture

You are facilitating a discussion to capture context before running a phase skill. This ensures decisions are documented and the skill has clear direction.

## When to Use

- Before any phase when there are unclear aspects
- When multiple valid approaches exist
- When stakeholder input needs documenting
- When assumptions need explicit acknowledgment

## Workflow

### Step 1: Check Workflow Exists

```bash
ls .design/config.json 2>/dev/null
```

**If not found:**
```
No DP workflow found. Start one with /dp:start first.
```

### Step 2: Determine Current Phase

Read `.design/STATE.md` to get current phase number and name.

Read `.design/config.json` to get the next pending phase.

### Step 3: Load Previous Context

If not the first phase, load relevant previous phase documents:
- For UX: Load DISCOVERY.md
- For UI: Load DISCOVERY.md + UX-DECISIONS.md
- For Review: Load all previous phases

Display summary:
```
CONTEXT FROM PREVIOUS PHASES
────────────────────────────────────────────────────────────────────────────────
From Discovery:
• Problem: [one-liner]
• Primary User: [role]
• Key Requirements: [top 3]

Ready to discuss [Phase Name] phase direction.
```

### Step 4: Facilitate Discussion

Ask questions based on the phase:

**For Discovery (`/dp:discovery`):**
1. "What do you already know about this feature/problem?"
2. "Are there any assumptions you want me to challenge particularly hard?"
3. "Any areas I should NOT probe deeply? (sensitive topics, already decided, etc.)"
4. "What format would be most useful for the output?"

**For PRD (`/dp:prd`, optional Phase 1.5a):**
1. "Who is the PRD for — stakeholders or Claude Code implementation?"
2. "Which requirements from discovery are in scope for this PRD?"
3. "Any decisions already made that the PRD should record rather than reopen?"

**For Journey Mapping (`/dp:journey`, optional Phase 1.5b):**
1. "Which actor and scenario should the map cover?"
2. "Do we have research to ground the map, or is this hypothesis mode?"
3. "Which artifact type fits best? (journey map, experience map, service blueprint, etc.)"

**For Roadmap (`/dp:roadmap`, optional Phase 1.5c):**
1. "What scope — team, product, or portfolio?"
2. "Which prioritization framework do you prefer, if any?"
3. "Are there fixed commitments that must appear in Now?"

**For Color System (`/dp:color`, optional Phase 2b):**
1. "Are there fixed brand colors or an existing palette we must build around?"
2. "What accessibility level is the target — WCAG AA or AAA?"
3. "Do we need dark mode token overrides, sRGB-only, or P3-enhanced output?"

**For UX (`/dp:ux`):**
1. "Any specific user flows you want to prioritize?"
2. "Are there UI patterns from elsewhere in the product we should match?"
3. "Any accessibility requirements beyond WCAG AA?"
4. "What states are most critical to define? (error handling, empty states, etc.)"

**For UI (`/dp:ui`):**
1. "Any brand guidelines or design system constraints?"
2. "Should we optimize for information density or breathing room?"
3. "Are there specific components you need detailed specs for?"
4. "Any existing visual patterns we must match?"

**For Review (`/dp:eng_review`):**
1. "What files/components should I review?"
2. "Any known issues you want me to focus on?"
3. "What's the quality threshold? (strict vs. pragmatic)"
4. "Should I include spec alignment check against the design phases?"

### Step 5: Capture Decisions

Create `.design/phases/{NN}-CONTEXT.md` where NN is the phase number:
- `01-CONTEXT.md` for Discovery
- `01.5a-CONTEXT.md` for PRD (optional)
- `01.5b-CONTEXT.md` for Journey Mapping (optional)
- `01.5c-CONTEXT.md` for Roadmap (optional)
- `02-CONTEXT.md` for UX
- `02b-CONTEXT.md` for Color System (optional)
- `03-CONTEXT.md` for UI
- `04-CONTEXT.md` for Review

Populate with:
- Timestamp
- Phase name
- Gray areas resolved
- Assumptions made
- Constraints acknowledged
- Preferred approach
- Rejected alternatives
- Open questions

### Step 6: Confirm and Handoff

```
✓ Context captured for [Phase Name] phase

Saved to: .design/phases/[NN]-CONTEXT.md

Summary:
• [Key decision 1]
• [Key decision 2]
• [Assumption acknowledged]

Ready to run /[skill-name] with this context.
Continue? (y/n)
```

If yes, provide instructions to run the phase skill.

## Context Template

Use this inline template, replacing placeholders with gathered information:

```markdown
# Phase Context: [PHASE_NAME]

> Captured: [TIMESTAMP]
> Phase: [PHASE_NUMBER] — [PHASE_NAME]

## Pre-Phase Discussion

> Decisions and context captured before running the phase skill

### What We're Working On
> Brief description of the focus for this phase

### Gray Areas Resolved

> Questions that were unclear before starting, now answered

| Question | Answer | Decided By |
|----------|--------|------------|
| | | |

### Assumptions Made

> Things we're assuming to be true for this phase

1.
2.
3.

### Constraints Acknowledged

> Limitations we're working within

-
-

---

## Design Direction

### Preferred Approach
> If multiple approaches exist, which direction are we taking?

### Rejected Alternatives
> What did we consider but decide against, and why?

| Alternative | Why Rejected |
|-------------|--------------|
| | |

---

## Inputs for This Phase

### From Previous Phase
> Key context carried forward

-

### New Information
> Anything new since the last phase

-

### User/Stakeholder Input
> Relevant feedback or requests

-

---

## Expected Outputs

### Must Produce
- [ ]

### Should Produce
- [ ]

### Nice to Have
- [ ]

---

## Open Questions

> Questions that remain unanswered going into this phase

1.
2.

---

## Notes

> Any additional context that might be helpful
```

## Phase Mapping

| Phase # | Phase Name | Skill | Context File |
|---------|------------|-------|--------------|
| 1 | Discovery | /dp:discovery | 01-CONTEXT.md |
| 1.5a | PRD (optional) | /dp:prd | 01.5a-CONTEXT.md |
| 1.5b | Journey (optional) | /dp:journey | 01.5b-CONTEXT.md |
| 1.5c | Roadmap (optional) | /dp:roadmap | 01.5c-CONTEXT.md |
| 2 | UX | /dp:ux | 02-CONTEXT.md |
| 2b | Color System (optional) | /dp:color | 02b-CONTEXT.md |
| 3 | UI | /dp:ui | 03-CONTEXT.md |
| 4 | Review | /dp:eng_review | 04-CONTEXT.md |

## Optional: Research Context

If user wants to discuss research before `/dp:research`:

1. "What are the key unknowns you want to validate?"
2. "Who do you have access to for research?"
3. "What method are you leaning toward?"
4. "Timeline constraints for research?"

Save to: `.design/research/RESEARCH-CONTEXT.md`

## Integration Notes

- Skills will check for and load the context file when they run
- Context file is loaded AFTER the main phase document
- Decisions in context file take precedence over defaults
- Update STATE.md to note that discussion occurred

---

## Workflow Navigation

| | |
|---|---|
| **This command** | `/dp:discuss` — Pre-phase decision capture |
| **Use before** | Any phase skill (`/dp:discovery`, `/dp:ux`, `/dp:ui`, `/dp:eng_review`) |
| **Then run** | The phase skill that discussion was preparing for |
| **Related** | `/dp:progress` — See which phase is next |
