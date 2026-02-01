---
name: dsp-skip
description: Skip the current DSP workflow phase and move to the next one. Use when a phase is not needed or already addressed elsewhere.
---

# /dsp:skip — Skip Current Phase

You are skipping the current phase in the DSP workflow. This moves to the next phase without running the current phase's skill.

## When to Use

- Phase requirements already met elsewhere
- Time constraints require skipping
- Phase not applicable for this project
- User wants to focus on specific phases only

## Workflow

### Step 1: Check Workflow Exists

```bash
ls .design/config.json 2>/dev/null
```

### Step 2: Get Current Phase

Read `.design/STATE.md` and `.design/config.json` to determine:
- Current phase number
- Current phase name
- Next phase

### Step 3: Confirm Skip

Ask for confirmation:

```
You're about to skip: Phase [N] — [Phase Name]

This phase would normally produce: [output file]

Skipping means:
• No [output] will be generated
• Next phase won't have this context
• /dsp:verify may flag missing artifacts

Are you sure? (y/n)

If you want to provide minimal context instead, use /dsp:discuss first.
```

### Step 4: Handle Skip Options

**If confirmed:**
1. Update `.design/STATE.md`:
   - Mark current phase as "skipped"
   - Set next phase as current
   - Add skip to activity log
   - Note reason if provided

2. Update `.design/config.json`:
   - Add current phase to `phases_completed` with status "skipped"
   - Increment `current_phase`

3. Create placeholder in `.design/phases/`:
   - Create `{PHASE_NAME}.md` with skip marker
   ```markdown
   # [Phase Name]: SKIPPED

   > Skipped: [TIMESTAMP]
   > Reason: [user provided reason or "User chose to skip"]

   This phase was skipped. Context may be incomplete for subsequent phases.

   To complete this phase later, run: /[skill-name]
   ```

**Output:**
```
✓ Skipped: Phase [N] — [Phase Name]

New Position:
  Phase: [N+1] of 4 ([Next Phase Name])
  Status: Ready
  Progress: [████░░░░░░] [X]%

Next: Run /[next-skill] to continue
      Or /dsp:back to return to [Phase Name]
```

### Step 5: Edge Cases

**Skipping Discovery (Phase 1):**
```
⚠️ Skipping Discovery is not recommended.

Discovery establishes:
• Problem statement
• User personas
• Requirements
• Constraints

Without discovery, subsequent phases lack critical context.

Alternatives:
1. /dsp:discuss — Provide minimal context without full interrogation
2. Paste existing brief — If you have a design brief, share it and I'll extract context

Still skip? (y/n)
```

**Skipping Review (Phase 4):**
```
Skipping Review means:
• No quality score
• No accessibility audit
• No spec alignment check

This is only recommended if:
• Code hasn't been implemented yet
• You'll run /design-engineer later

Skip anyway? (y/n)
```

**Skipping when already on last phase:**
```
You're on the last phase (Review).

Options:
• Run /design-engineer to complete the workflow
• Run /dsp:verify to check deliverables
• Consider the workflow complete without formal review
```

**All phases skipped:**
If user tries to skip all phases, warn that this defeats the purpose:
```
⚠️ All phases would be skipped.

If you don't need the DSP workflow, run skills standalone instead:
• /ux-jesus — Discovery
• /ux — Usability
• /ui — Visual design
• /design-engineer — Code review

These work without the workflow infrastructure.
```

## State Updates

**STATE.md updates:**
```markdown
## Phase Status

| # | Phase | Status | Completed | Output |
|---|-------|--------|-----------|--------|
| 1 | Discovery | ⊘ skipped | 2024-01-15 | — |
| 2 | UX | ◐ current | — | UX-DECISIONS.md |
```

**Activity log entry:**
```markdown
### Last Activity
- **Date:** [TIMESTAMP]
- **Action:** Skipped Discovery phase
- **Reason:** [User provided reason]
```

## Recovery

To undo a skip:
1. `/dsp:back` returns to the skipped phase
2. Running the phase skill will generate the output
3. Phase status changes from "skipped" to "completed"
