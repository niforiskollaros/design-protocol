---
name: dp-verify
description: Verify design deliverables are complete using goal-backward verification. Checks truths, artifacts, and wiring to ensure design quality before handoff.
---

# /dp:verify — Design Deliverable Verification

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
- `.design/phases/PRD.md` (if PRD phase ran)
- `.design/phases/JOURNEY-MAP.md` (if journey phase ran)
- `.design/phases/ROADMAP.md` (if roadmap phase ran)
- `.design/phases/UX-DECISIONS.md`
- `.design/phases/COLOR-SYSTEM.md` (if color phase ran)
- `.design/phases/UI-SPEC.md`
- `.design/phases/REVIEW.md`

### Step 3: Run Truth Verification

**Design Truths** — What must be TRUE.

> **Canonical source:** the T1–T10 truths, artifact list, and W1–W6 wiring checks are defined once in `agents/dp-verifier.md`. This command mirrors them for quick inline runs; if the two ever disagree, the agent file wins. The `test/install.test.js` truth-list drift test enforces that they stay identical.

| ID | Truth | Check | Source |
|----|-------|-------|--------|
| T1 | Problem is clearly articulated | Is there a problem statement in discovery? | DISCOVERY.md |
| T2 | Primary user is well-defined | Is primary user documented with goals? | DISCOVERY.md |
| T3 | Requirements are prioritized | Are there must/should/could/must-not categories? | DISCOVERY.md, REQUIREMENTS.md |
| T4 | User flow is complete | Is there an end-to-end flow? | UX-DECISIONS.md |
| T5 | All interactive states defined | Are default/hover/focus/active/disabled/loading/error/empty/success documented? | UX-DECISIONS.md |
| T6 | Accessibility is addressed | Are a11y requirements documented with WCAG references? | UX-DECISIONS.md, REQUIREMENTS.md |
| T7 | Visual hierarchy is clear | Is there visual spec with hierarchy? | UI-SPEC.md |
| T8 | Components are specified | Are key components detailed? | UI-SPEC.md |
| T9 | Design tokens documented | Are colors, spacing, typography tokens defined? | UI-SPEC.md, COLOR-SYSTEM.md (if present) |
| T10 | Implementation guidance clear | Is there enough detail for a developer to build? | UI-SPEC.md, REVIEW.md |

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

**Optional-phase artifacts** — verify only if the phase is enabled/completed in `config.json` (`optional_phases.*.completed`):

| Artifact | Required when | Location |
|----------|---------------|----------|
| PRD.md | `optional_phases.prd.completed` | .design/phases/ |
| JOURNEY-MAP.md | `optional_phases.journey.completed` | .design/phases/ |
| ROADMAP.md | `optional_phases.roadmap.completed` | .design/phases/ |
| COLOR-SYSTEM.md | `optional_phases.color.completed` | .design/phases/ |

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

| ID | From | To | Check |
|----|------|-----|-------|
| W1 | Discovery requirements | UX decisions | Each must-have requirement has corresponding UX decision |
| W2 | Discovery users | UX flows | Flows address documented user goals |
| W3 | UX components | UI specs | Each component in UX has visual spec |
| W4 | UX states | UI states | Each state in UX has visual treatment |
| W5 | All phases | Review | Review checks against documented specs |
| W6 | Requirements | Final | All must-have requirements can be traced to implementation guidance |

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
DP VERIFICATION REPORT: [Project Name]
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
   → Run /dp:ui to generate visual specifications

2. State coverage incomplete
   → Update UX-DECISIONS.md with: focus, disabled, empty states
   → Then update UI-SPEC.md with visual specs for these states

RECOMMENDATIONS
────────────────────────────────────────────────────────────────────────────────
1. [ ] Complete /dp:ui phase to generate UI-SPEC.md
2. [ ] Add missing states to UX-DECISIONS.md
3. [ ] Re-run /dp:verify after addressing gaps

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

This command can spawn the `dp-verifier` agent for deeper analysis if needed.

---

## Workflow Navigation

| | |
|---|---|
| **This command** | `/dp:verify` — Goal-backward verification |
| **Previous** | `/dp:eng_review` — Code review (Phase 4) |
| **If gaps found** | `/dp:back` — Return to the phase that needs fixing |
| **If passed** | Workflow complete — ready for handoff |
| **Related** | `/dp:progress` — Quick status overview |
