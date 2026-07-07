---
name: dp-research
description: UX research agent that helps plan, execute, analyze, and present user research. Trigger with "/dp:research" when you need to conduct interviews, usability tests, or synthesize findings. Can pick up research questions from /dp:discovery briefs or work standalone. Provides templates, question frameworks, and bias-free facilitation guides. Optional branch in DP workflow.
---

# UX Research — From Questions to Insights

Structure your research so you can focus on listening, not figuring out what to ask next.

> **This skill vs. the `dp-researcher` agent:** this skill is the **interactive** research assistant — use it when the user is working through research turn by turn in the main conversation. The `dp-researcher` agent is a **spawned subagent** for delegated, self-contained research work invoked by other commands (`/dp:discuss`, `/dp:verify`, `/dp:discovery`). Both write the same `.design/research/` artifacts; this skill's `references/` are the canonical method and synthesis guides for both.

---

## DP Workflow Integration

This skill is an **optional branch** in the DP (Design Protocol) workflow. It can be triggered from any phase to validate assumptions or gather user insights.

### Detecting Workflow Mode

At the start of any invocation, detect the mode by checking for `.design/config.json`: if present, run in **workflow mode** (load prior-phase context, write outputs under `.design/`, update state, and hand off to the next phase); if absent, run in **standalone mode** (operate independently and offer to save output).

At the start of any `/dp:research` invocation:

1. **Check for `.design/config.json`**
2. **If found** (workflow mode):
   - Load `.design/phases/DISCOVERY.md` for research questions
   - Check "Research Needed" section for pre-identified questions
   - Load project context for background
   - Announce: "Running research as part of DP workflow..."
3. **If not found** (standalone mode):
   - Run with default behavior
   - Ask what research challenge they're facing

### Context Loading (Workflow Mode)

When workflow documents exist:

```
DP WORKFLOW ACTIVE
────────────────────────────────────────────────────────────────────────────────
Project: [name]
Current Phase: [N] of 4 ([phase name])
Research: Optional branch

From Discovery (Research Needed section):
• [Research question 1] → [Suggested method]
• [Research question 2] → [Suggested method]

Key Assumptions to Validate:
• [Assumption 1]
• [Assumption 2]

Primary User Profile:
• Role: [role]
• Goals: [goals]
• Pain points: [pain points]
────────────────────────────────────────────────────────────────────────────────

What would you like to research? I can help with:
1. Plan — Define goals and pick the right method
2. Prepare — Write interview guides, test scripts, or surveys
3. Execute — Tips for running sessions without bias
4. Synthesize — Turn raw data into insights
5. Present — Structure findings for stakeholders
```

### Research in the Workflow

```
Discovery ──┬──► UX ──► UI ──► Review
            │
            └──► Research ───┘
                 (feeds back)
```

Research can branch from any phase and feeds insights back to update earlier documents.

---

## When to Invoke

- Planning user interviews or stakeholder conversations
- Preparing usability test scripts
- Needing help writing unbiased questions
- Synthesizing research data into findings
- Presenting research to stakeholders
- Picking up "Research Needed" items from a `/dp:discovery` brief

---

## Workflow

### On Invocation

When triggered with `/dp:research`, ask:

> "What research challenge are you facing? I can help with:
>
> 1. **Plan** — Define goals and pick the right method
> 2. **Prepare** — Write interview guides, test scripts, or surveys
> 3. **Execute** — Tips for running sessions without bias
> 4. **Synthesize** — Turn raw data into insights
> 5. **Present** — Structure findings for stakeholders
>
> Or if you have open questions from a `/dp:discovery` brief, paste them and I'll build a research plan.
>
> Where are you stuck?"

Then follow the relevant phase below.

---

## Phase 1: Planning Research

### Goal Definition

Help user articulate:
- **Research question**: What are we trying to learn? (not validate)
- **Decision it informs**: What will we do differently based on findings?
- **Assumptions to test**: What do we believe that might be wrong?

Use this format:
> We want to learn **[research question]** so that we can **[decision/action]**. We currently assume **[assumption]** but need to validate this.

### Method Selection

Guide to the right method based on what they need to learn:

| Need to Learn | Method | When to Use |
|---------------|--------|-------------|
| User behaviors, mental models, pain points | **User Interviews** | Early discovery, understanding context |
| Whether a design works | **Usability Testing** | Have a prototype or live product |
| Broad patterns, preferences | **Surveys** | Need quantitative data, have clear hypotheses |
| How users naturally work | **Contextual Inquiry** | Need to observe real environment |
| Information architecture | **Card Sorting** | Organizing content, navigation |
| Preference between options | **A/B Testing** | Have traffic, testing specific variations |
| Stakeholder alignment | **Stakeholder Interviews** | Politics, competing priorities, constraints |

See: `references/method-selection.md` for detailed guidance.

### Research Plan Template

```markdown
## Research Plan: [Project Name]

### Research Questions
1. Primary:
2. Secondary:

### Method
[Selected method] because [rationale]

### Participants
- Target profile:
- Number needed:
- Recruitment approach:

### Timeline
- Recruitment: [dates]
- Sessions: [dates]
- Analysis: [dates]
- Readout: [date]

### Resources Needed
- Tools:
- Incentives:
- Observers:

### Success Criteria
We'll know research is complete when we can confidently answer:
- [ ] Question 1
- [ ] Question 2
```

---

## Phase 2: Preparing Research Materials

### Interview Guides

See: `references/interview-guide-template.md`

**Structure:**
1. **Warm-up** (5 min) — Build rapport, set expectations
2. **Context** (10 min) — Understand their world, role, typical day
3. **Core exploration** (25-30 min) — Deep dive on research questions
4. **Reactions** (10 min) — Show concepts/prototypes if applicable
5. **Wrap-up** (5 min) — Anything we missed, thank you

See `references/question-writing.md` for writing open-ended, non-leading questions and avoiding leading/loaded/hypothetical/binary/compound phrasing.

### Usability Test Scripts

See: `references/usability-test-template.md`

**Structure:**
1. **Introduction script** — Explain think-aloud, permission, no wrong answers
2. **Pre-task questions** — Current behavior, familiarity
3. **Task scenarios** — Realistic goals, not instructions
4. **Post-task questions** — Difficulty rating, expectations vs. reality
5. **Wrap-up** — Overall impressions, comparison to current tools

Scenarios describe **goals**, not **steps** — see the template for good/bad examples.

### Survey Design

See `references/method-selection.md` (Survey Design) for question types and bias prevention.

---

## Phase 3: Executing Research

### Session Facilitation

See: `references/facilitation-guide.md` for the full guide — active listening, neutral probing, the 5-second silence rule, handling difficult situations, managing observers, and bias awareness (confirmation, leading, anchoring, social desirability) with mitigations.

**Before the session:** test all technology, have a backup recording method, prepare a note-taking template, and brief observers to stay silent.

**Core stance during the session:** listen more than you talk, follow unexpected threads, ask for specific examples, and embrace awkward pauses rather than filling them.

---

## Phase 4: Synthesizing Findings

See: `references/synthesis-methods.md` for the full process — data extraction, affinity mapping, pattern recognition, turning observations into insights, quantifying qualitative data (frequency, severity, confidence), and prioritization.

**The core move:** separate **observation** (what happened) → **insight** (what it means) → **recommendation** (what to do). Always note sample size ("X of Y participants") and a confidence level.

---

## Phase 5: Presenting Research

See: `references/research-report-template.md` for report structure, audience-specific framing (executives, PMs, designers, engineers), live-readout tips, one-page formats, and video-clip guidelines.

Tailor format to audience: lead with insights (not methodology), separate findings from recommendations, and be honest about confidence.

---

## Output Structure (Workflow Mode)

When in workflow mode, write research artifacts to `.design/research/`:

### Research Plan: `.design/research/RESEARCH-PLAN.md`

```yaml
---
created: YYYY-MM-DDTHH:MM:SSZ
status: planning | recruiting | in_progress | analyzing | complete
method: interviews | usability | survey | contextual | card_sort
---

[Research plan content]
```

### Research Materials: `.design/research/[type]-guide.md`
- `interview-guide.md`
- `usability-test-script.md`
- `survey-questions.md`

### Findings: `.design/research/FINDINGS-[topic].md`

```yaml
---
completed: YYYY-MM-DDTHH:MM:SSZ
method: [method]
participants: [N]
confidence: high | medium | low
---

# Research Findings: [Topic]

## Executive Summary
...

## Key Findings
...

## Recommendations
...

## Impact on Design Brief
...
```

---

## State Updates (Workflow Mode)

After completing research:

1. **Update `.design/phases/DISCOVERY.md`**:
   - Mark validated assumptions with ✓
   - Note invalidated assumptions
   - Add new insights to user understanding
   - Update requirements if findings warrant

2. **Update `.design/REQUIREMENTS.md`**:
   - Add research-backed requirements
   - Note changed requirements from findings

3. **Update `.design/STATE.md`**:
   ```markdown
   ### Last Activity
   - **Date:** [TIMESTAMP]
   - **Action:** Completed user research ([method])
   - **Key Finding:** [one-liner]
   - **Impact:** [Updated discovery brief / Validated assumptions / etc.]
   ```

4. **Update `.design/config.json`** if research is enabled:
   ```json
   {
     "optional_phases": {
       "research": {
         "enabled": true,
         "methods": ["interviews"],
         "status": "complete"
       }
     }
   }
   ```

---

## Handoff (Workflow Mode)

```
═══════════════════════════════════════════════════════════════════════════════
RESEARCH COMPLETE
═══════════════════════════════════════════════════════════════════════════════

Output: .design/research/FINDINGS-[topic].md

Summary:
• Method: [method]
• Participants: [N]
• Key Finding: [one-liner]
• Confidence: [high/medium/low]

Impact on Design:
• [X] assumptions validated
• [Y] assumptions invalidated
• [Z] new insights added to DISCOVERY.md

Next Steps:
────────────────────────────────────────────────────────────────────────────────
→ Continue to /dp:ux with validated understanding
→ Update /dp:discovery brief if findings changed direction
→ /dp:progress to see updated workflow status

═══════════════════════════════════════════════════════════════════════════════
```

---

## Standalone Mode Behavior

When no `.design/` directory exists:

1. Output research materials inline
2. Ask what the user wants to do next
3. Offer to start DP workflow if they want structured design process

---

## Behavior Guidelines

### Adaptive Support
- If user is experienced → Skip basics, offer templates
- If user is learning → Explain rationale, teach principles
- If user is stuck → Ask what's blocking, provide targeted help

### B2B/Enterprise Awareness
- Users are often employees, not buyers
- Access to users may require stakeholder approval
- Research may need legal/compliance review
- Incentives may have policy restrictions
- Recording consent is critical

### Quality Checks
Before finalizing any research material, verify:
- [ ] Questions are open-ended and non-leading
- [ ] Goals are about learning, not validating
- [ ] Tasks describe goals, not steps
- [ ] Sample size is appropriate for method
- [ ] Findings separate observation from interpretation

---

## Reference Files

Load these as needed:

- **references/method-selection.md** — When to use which research method
- **references/interview-guide-template.md** — Ready-to-customize interview structure
- **references/usability-test-template.md** — Task-based test script template
- **references/question-writing.md** — How to write unbiased questions
- **references/facilitation-guide.md** — Running sessions like a pro
- **references/synthesis-methods.md** — Turning data into insights
- **references/research-report-template.md** — Stakeholder-ready report format

---

## Config Integration

Respects these settings from `.design/config.json`:
```json
{
  "optional_phases": {
    "research": {
      "enabled": false,
      "methods": []
    }
  }
}
```

When enabled, research outputs are tracked in the workflow state.

---

## Workflow Navigation

```
/dp:start    →    /dp:discovery    →    /dp:ux    →    /dp:execute    →    /dp:ui    →    /dp:execute    →    /dp:eng_review    →    /dp:verify
                    Phase 1   ↘      Phase 2      (wireframe)          Phase 3      (polished)          Phase 4
                               ┌─────────────┐
                               │   YOU ARE    │
                               │    HERE      │
                               │ (optional)   │
                               └─────────────┘
```

| | |
|---|---|
| **Branches from** | `/dp:discovery` — Discovery (most common) or any phase |
| **Current** | `/dp:research` — Research planning & synthesis (optional) |
| **Returns to** | The phase that triggered research |
| **Related** | `/dp:discuss` — Capture research questions before starting |
| | `/dp:discovery` — Re-run discovery if research changes assumptions |
