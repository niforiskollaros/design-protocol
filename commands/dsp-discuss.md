---
name: dsp-discuss
description: Capture design decisions and context before running a phase skill. Creates a CONTEXT.md file with resolved gray areas, assumptions, and direction.
---

# /dsp:discuss — Pre-Phase Decision Capture

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
No DSP workflow found. Start one with /dsp:start first.
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

**For Discovery (`/ux-jesus`):**
1. "What do you already know about this feature/problem?"
2. "Are there any assumptions you want me to challenge particularly hard?"
3. "Any areas I should NOT probe deeply? (sensitive topics, already decided, etc.)"
4. "What format would be most useful for the output?"

**For UX (`/ux`):**
1. "Any specific user flows you want to prioritize?"
2. "Are there UI patterns from elsewhere in the product we should match?"
3. "Any accessibility requirements beyond WCAG AA?"
4. "What states are most critical to define? (error handling, empty states, etc.)"

**For UI (`/ui`):**
1. "Any brand guidelines or design system constraints?"
2. "Should we optimize for information density or breathing room?"
3. "Are there specific components you need detailed specs for?"
4. "Any existing visual patterns we must match?"

**For Review (`/design-engineer`):**
1. "What files/components should I review?"
2. "Any known issues you want me to focus on?"
3. "What's the quality threshold? (strict vs. pragmatic)"
4. "Should I include spec alignment check against the design phases?"

### Step 5: Capture Decisions

Create `.design/phases/{NN}-CONTEXT.md` where NN is the phase number:
- `01-CONTEXT.md` for Discovery
- `02-CONTEXT.md` for UX
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
| 1 | Discovery | /ux-jesus | 01-CONTEXT.md |
| 2 | UX | /ux | 02-CONTEXT.md |
| 3 | UI | /ui | 03-CONTEXT.md |
| 4 | Review | /design-engineer | 04-CONTEXT.md |

## Optional: Research Context

If user wants to discuss research before `/ux-research`:

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
| **This command** | `/dsp:discuss` — Pre-phase decision capture |
| **Use before** | Any phase skill (`/ux-jesus`, `/ux`, `/ui`, `/design-engineer`) |
| **Then run** | The phase skill that discussion was preparing for |
| **Related** | `/dsp:progress` — See which phase is next |
