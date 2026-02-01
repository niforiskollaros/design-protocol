---
name: dsp-verify
description: Verify design deliverables are complete using goal-backward verification. Checks truths, artifacts, and wiring to ensure design quality before handoff.
---

# /dsp:verify — Design Deliverable Verification

You are running goal-backward verification on the design workflow. This checks what must be TRUE, what must EXIST, and what must CONNECT.

## Verification Philosophy

**Goal-backward verification** asks:
1. What must be TRUE for this design to succeed?
2. What artifacts must EXIST to prove we've done the work?
3. What must CONNECT between phases for coherence?

This is NOT a checklist of "did we do the task" — it's validation that the design is actually ready.

## Workflow

### Step 1: Check Workflow Exists

```bash
ls .design/config.json 2>/dev/null
```

### Step 2: Load All Phase Documents

Read whatever exists:
- `.design/PROJECT.md`
- `.design/REQUIREMENTS.md`
- `.design/phases/DISCOVERY.md`
- `.design/phases/UX-DECISIONS.md`
- `.design/phases/UI-SPEC.md`
- `.design/phases/REVIEW.md`

### Step 3: Run Truth Verification

**Design Truths** — What must be TRUE:

| Truth | Check | Source |
|-------|-------|--------|
| Problem is clearly defined | Is there a problem statement in discovery? | DISCOVERY.md |
| User is well-understood | Is primary user documented with goals? | DISCOVERY.md |
| Requirements are prioritized | Are there must/should/could categories? | DISCOVERY.md, REQUIREMENTS.md |
| User flow is complete | Is there an end-to-end flow? | UX-DECISIONS.md |
| All states are specified | Are default/hover/focus/error/empty/loading documented? | UX-DECISIONS.md |
| Accessibility addressed | Are a11y requirements documented? | UX-DECISIONS.md, REQUIREMENTS.md |
| Visual hierarchy is clear | Is there visual spec with hierarchy? | UI-SPEC.md |
| Components are specified | Are key components detailed? | UI-SPEC.md |

**Output:**
```
TRUTH VERIFICATION
────────────────────────────────────────────────────────────────────────────────
✓ Problem clearly defined
  "Marketing team needs a way to schedule campaigns..."

✓ Primary user documented
  Campaign Manager with goals: [list]

✗ MISSING: All states not specified
  Found: default, hover, error
  Missing: focus, loading, empty, success

◐ PARTIAL: Accessibility addressed
  Keyboard navigation: documented
  Color contrast: not specified
```

### Step 4: Run Artifact Verification

**Design Artifacts** — What must EXIST:

| Artifact | Required | Location |
|----------|----------|----------|
| DISCOVERY.md | For any phase beyond discovery | .design/phases/ |
| UX-DECISIONS.md | For UI or Review phases | .design/phases/ |
| UI-SPEC.md | For Review phase | .design/phases/ |
| REVIEW.md | For workflow completion | .design/phases/ |

For each artifact, also verify it's substantive:
- Not just placeholder text
- Contains actual decisions/specs
- Has required sections populated

**Output:**
```
ARTIFACT VERIFICATION
────────────────────────────────────────────────────────────────────────────────
✓ DISCOVERY.md exists and substantive
  Sections: Problem Statement ✓, Users ✓, Requirements ✓, Journey Map ✓

✓ UX-DECISIONS.md exists and substantive
  Sections: User Flow ✓, States ◐, Accessibility ✓

✗ UI-SPEC.md missing
  Expected at: .design/phases/UI-SPEC.md
  Needed for: Review phase

○ REVIEW.md not yet expected
  Current phase: UI
```

### Step 5: Run Wiring Verification

**Design Wiring** — What must CONNECT:

| Connection | From | To | Check |
|------------|------|-----|-------|
| Requirements trace | DISCOVERY.md | UX-DECISIONS.md | Do UX decisions reference requirements? |
| UX to UI | UX-DECISIONS.md | UI-SPEC.md | Does UI spec cover all components from UX? |
| States coverage | UX-DECISIONS.md | UI-SPEC.md | Are all UX states visually specified? |
| Spec to Review | All phases | REVIEW.md | Does review check against specs? |

**Output:**
```
WIRING VERIFICATION
────────────────────────────────────────────────────────────────────────────────
✓ Requirements → UX Decisions
  8 of 8 must-have requirements addressed in UX phase

◐ UX Decisions → UI Spec
  5 of 7 components have visual specs
  Missing: ErrorToast, EmptyState

✗ State Coverage Gap
  UX defined 9 states, UI spec covers 6
  Missing visual specs: focus, disabled, empty
```

### Step 6: Generate Summary Report

```
═══════════════════════════════════════════════════════════════════════════════
DSP VERIFICATION REPORT: [Project Name]
═══════════════════════════════════════════════════════════════════════════════

Overall Status: GAPS FOUND

SUMMARY
────────────────────────────────────────────────────────────────────────────────
│ Category   │ Pass │ Partial │ Fail │
│────────────│──────│─────────│──────│
│ Truths     │  6   │    1    │   1  │
│ Artifacts  │  2   │    0    │   1  │
│ Wiring     │  1   │    1    │   1  │
│────────────│──────│─────────│──────│
│ TOTAL      │  9   │    2    │   3  │

CRITICAL GAPS (must fix)
────────────────────────────────────────────────────────────────────────────────
1. UI-SPEC.md missing
   → Run /ui to generate visual specifications

2. State coverage incomplete
   → Update UX-DECISIONS.md with: focus, disabled, empty states
   → Then update UI-SPEC.md with visual specs for these states

RECOMMENDATIONS
────────────────────────────────────────────────────────────────────────────────
1. [ ] Complete /ui phase to generate UI-SPEC.md
2. [ ] Add missing states to UX-DECISIONS.md
3. [ ] Re-run /dsp:verify after addressing gaps

═══════════════════════════════════════════════════════════════════════════════
```

### Step 7: Update State

Update `.design/STATE.md` with verification results:
- If all pass: workflow_status → "verified"
- If gaps found: workflow_status → "gaps", list blockers

Update `.design/config.json`:
- `workflow.workflow_status` → "verified" or "gaps"

## Verification Thresholds

| Result | Criteria |
|--------|----------|
| PASSED | All truths verified, all required artifacts exist, wiring complete |
| GAPS FOUND | Any truth false, artifact missing, or wiring broken |
| CANNOT VERIFY | Missing critical files to even check |

## When to Run

- After completing all phases (before handoff)
- After fixing gaps from previous verification
- When uncertain about design completeness
- Before starting implementation

## Agent Integration

This command can spawn the `dsp-verifier` agent for deeper analysis if needed.
