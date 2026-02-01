---
name: dsp-back
description: Go back to a previous DSP workflow phase. Use to revisit decisions, update context, or re-run a phase with new information.
---

# /dsp:back — Return to Previous Phase

You are navigating back in the DSP workflow. This allows revisiting earlier phases to update or refine design work.

## When to Use

- New information invalidates earlier decisions
- Need to update discovery based on research findings
- Want to refine UX decisions after UI work revealed issues
- Stakeholder feedback requires earlier phase changes
- Review found issues that need design-level fixes

## Workflow

### Step 1: Check Workflow Exists

```bash
ls .design/config.json 2>/dev/null
```

### Step 2: Get Current Position

Read `.design/STATE.md` and `.design/config.json` to determine:
- Current phase number
- Completed phases
- Available phases to return to

### Step 3: Present Options

**If current phase > 1:**
```
CURRENT POSITION: Phase [N] — [Phase Name]

Go back to:
  1. Discovery — Update problem/users/requirements
  2. UX — Revise user flows and states
  [3. UI — Adjust visual specs]

Or enter phase number (1-[N-1])

Which phase? (1-[N-1] or cancel)
```

**If on first phase:**
```
You're on Phase 1 (Discovery) — can't go back further.

Options:
• Run /ux-jesus to start/redo discovery
• Run /dsp:progress to see status
```

### Step 4: Handle Navigation

**When user selects a phase:**

1. Confirm the action:
```
Going back to: Phase [X] — [Phase Name]

This will:
✓ Set Phase [X] as current
✓ Keep existing [Phase X] output for reference
○ Later phases remain but may need updates

Continue? (y/n)
```

2. Update `.design/STATE.md`:
   - Set current phase to selected phase
   - Add navigation to activity log
   - Note any context about why going back

3. Update `.design/config.json`:
   - Set `current_phase` to selected phase number
   - Don't remove later phases from `phases_completed` (they exist but may be stale)

4. Rename existing phase file (if exists):
   - `.design/phases/DISCOVERY.md` → `.design/phases/DISCOVERY.v1.md`
   - Allows fresh start while preserving history

**Output:**
```
✓ Returned to: Phase [X] — [Phase Name]

Previous output preserved as: [PHASE_NAME].v1.md

Current Position:
  Phase: [X] of 4 ([Phase Name])
  Status: Ready
  Progress: [██░░░░░░░░] [X]%

Note: Phases [X+1] through [N] may need updates after you modify this phase.

Next: Run /[skill] to redo this phase
      Or /dsp:discuss to capture new context first
```

### Step 5: Provide Context

When going back, remind user of relevant context:

**Going back to Discovery:**
```
CONTEXT FOR DISCOVERY REDO
────────────────────────────────────────────────────────────────────────────────
What triggered going back:
• [from user or inferred]

Existing outputs that may be affected:
• UX-DECISIONS.md — May need updates
• UI-SPEC.md — May need updates

Key questions to reconsider:
• Is the problem statement still accurate?
• Has our understanding of users changed?
• Do requirements need reprioritization?
```

**Going back to UX:**
```
CONTEXT FOR UX REDO
────────────────────────────────────────────────────────────────────────────────
From Discovery (unchanged):
• Problem: [problem statement]
• User: [primary user]

What may need updating:
• User flows
• State definitions
• Accessibility requirements

Existing UI spec may need realignment after UX changes.
```

### Step 6: Edge Cases

**Going back with uncommitted changes:**
```
Note: You have changes in progress for Phase [N].

Options:
1. Go back anyway (current progress will be marked incomplete)
2. Complete current phase first, then go back
3. Cancel

Choice?
```

**Going back to a skipped phase:**
```
Phase [X] was previously skipped.

Going back will:
• Set Phase [X] as current
• Allow you to complete it properly

This is a good way to fill in a skipped phase.

Continue? (y/n)
```

**Multiple iterations:**

Track version history in STATE.md:
```markdown
## Iteration History

| Phase | Version | Date | Reason |
|-------|---------|------|--------|
| Discovery | v1 | 2024-01-15 | Initial |
| Discovery | v2 | 2024-01-18 | Updated after research |
| UX | v1 | 2024-01-16 | Initial |
```

## Version Management

When going back, preserve history:

```
.design/phases/
├── DISCOVERY.md        # Current version (v2)
├── DISCOVERY.v1.md     # Previous version
├── UX-DECISIONS.md     # Current (may be stale)
└── UI-SPEC.md          # Current (may be stale)
```

Maximum versions to keep: 3 (oldest auto-deleted)

## State Updates

**STATE.md activity log:**
```markdown
### Last Activity
- **Date:** [TIMESTAMP]
- **Action:** Returned to Discovery phase (was on UI)
- **Reason:** Research findings changed user understanding
```

## Integration Notes

- Skills should check STATE.md to see if they're running as a redo
- If redoing, skill can offer to show diff from previous version
- Later phases should be flagged as "may need update" in progress view
