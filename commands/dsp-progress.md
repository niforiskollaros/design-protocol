---
name: dsp-progress
description: Display current DSP workflow status, phase progress, and accumulated context. Shows where you are in the design process and what comes next.
---

# /dsp:progress — View Workflow Status

You are displaying the current DSP workflow status. This command reads state and provides a clear picture of progress.

## Workflow

### Step 1: Check for Workflow

Check if DSP workflow exists:

```bash
ls .design/config.json 2>/dev/null
```

**If not found:**
```
No DSP workflow found in this directory.

Start one with: /dsp:start
Or run skills standalone: /ux-jesus, /ux, /ui, /design-engineer
```

### Step 2: Load State Files

Read these files:
- `.design/config.json` — Settings and workflow metadata
- `.design/STATE.md` — Current position and context
- `.design/PROJECT.md` — Project overview

### Step 3: Calculate Progress

Determine completion percentage:
- Phase 0 (not started): 0%
- Phase 1 (discovery) complete: 25%
- Phase 2 (ux) complete: 50%
- Phase 3 (ui) complete: 75%
- Phase 4 (review) complete: 100%

Generate progress bar:
- 0%: `[░░░░░░░░░░]`
- 25%: `[██░░░░░░░░]`
- 50%: `[█████░░░░░]`
- 75%: `[███████░░░]`
- 100%: `[██████████]`

### Step 4: Display Status

Output this format:

```
═══════════════════════════════════════════════════════════════════════════════
DSP WORKFLOW STATUS: [Project Name]
═══════════════════════════════════════════════════════════════════════════════

Progress: [██░░░░░░░░] 25%

PHASE STATUS
────────────────────────────────────────────────────────────────────────────────
│ # │ Phase     │ Status    │ Completed  │ Output            │
│───│───────────│───────────│────────────│───────────────────│
│ 1 │ Discovery │ ● complete│ 2024-01-15 │ DISCOVERY.md      │
│ 2 │ UX        │ ◐ current │ —          │ UX-DECISIONS.md   │
│ 3 │ UI        │ ○ pending │ —          │ UI-SPEC.md        │
│ 4 │ Review    │ ○ pending │ —          │ REVIEW.md         │

Optional: Research — not enabled

CURRENT POSITION
────────────────────────────────────────────────────────────────────────────────
Phase: 2 of 4 (UX)
Status: In Progress
Last Activity: [timestamp] — Completed discovery phase

CONTEXT SUMMARY
────────────────────────────────────────────────────────────────────────────────
Problem: [One-liner from discovery]
User: [Primary user role]
Key Requirement: [Most important must-have]

RECENT DECISIONS
────────────────────────────────────────────────────────────────────────────────
• Discovery: [Key decision 1]
• Discovery: [Key decision 2]

NEXT ACTIONS
────────────────────────────────────────────────────────────────────────────────
→ Run /ux to continue with usability principles
  Or /dsp:discuss to capture decisions first

═══════════════════════════════════════════════════════════════════════════════
QUICK COMMANDS
═══════════════════════════════════════════════════════════════════════════════
/ux-jesus     — Discovery (Phase 1)      /dsp:discuss  — Capture decisions
/ux           — UX principles (Phase 2)  /dsp:skip     — Skip current phase
/ui           — Visual design (Phase 3)  /dsp:back     — Go to previous phase
/design-engineer — Review (Phase 4)      /dsp:verify   — Check deliverables
═══════════════════════════════════════════════════════════════════════════════
```

### Step 5: Show Phase Details (Optional)

If user asks for more detail on a specific phase, read the corresponding file:
- Discovery: `.design/phases/DISCOVERY.md`
- UX: `.design/phases/UX-DECISIONS.md`
- UI: `.design/phases/UI-SPEC.md`
- Review: `.design/phases/REVIEW.md`

Display a summary of that phase's output.

## Status Icons

- `●` complete — Phase finished
- `◐` current — Currently active phase
- `○` pending — Not yet started
- `⊘` skipped — Explicitly skipped
- `✕` blocked — Cannot proceed

## Workflow Status Values

From `config.json`:
- `not_started` — Project initialized but no phase started
- `in_progress` — Actively working through phases
- `blocked` — Cannot proceed (show blockers from STATE.md)
- `complete` — All phases done
- `gaps` — Review found issues needing iteration

## Error Handling

- If STATE.md is corrupted, offer to rebuild from phase files
- If phase files are missing but marked complete, flag inconsistency
- Always show what commands are available regardless of state
