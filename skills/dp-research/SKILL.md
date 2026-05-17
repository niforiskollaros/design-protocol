---
name: dp-research
description: UX research agent that helps plan, execute, analyze, and present user research. Trigger with "/dp:research" when you need to conduct interviews, usability tests, or synthesize findings. Can pick up research questions from /dp:discovery briefs or work standalone. Provides templates, question frameworks, and bias-free facilitation guides. Optional branch in DP workflow.
---

# UX Research — From Questions to Insights

Structure your research so you can focus on listening, not figuring out what to ask next.

---

## DP Workflow Integration

This skill is an **optional branch** in the DP (Design Protocol) workflow. It can be triggered from any phase to validate assumptions or gather user insights.

### Detecting Workflow Mode

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

**Question Quality Rules:**

✅ **Good questions:**
- Open-ended: "Tell me about..." / "Walk me through..." / "How do you..."
- Behavior-focused: "Last time you did X, what happened?"
- Non-leading: "What was that experience like?"

❌ **Bad questions:**
- Leading: "Don't you think X is frustrating?"
- Hypothetical: "Would you use X if we built it?"
- Binary: "Do you like X?" (yes/no)
- Compound: "Do you do X and Y and how often?"

See: `references/question-writing.md` for comprehensive guidance.

### Usability Test Scripts

See: `references/usability-test-template.md`

**Structure:**
1. **Introduction script** — Explain think-aloud, permission, no wrong answers
2. **Pre-task questions** — Current behavior, familiarity
3. **Task scenarios** — Realistic goals, not instructions
4. **Post-task questions** — Difficulty rating, expectations vs. reality
5. **Wrap-up** — Overall impressions, comparison to current tools

**Task Scenario Rules:**

✅ **Good scenario:**
> "You need to find a vessel that's arriving in Rotterdam next week and check its cargo details. Please show me how you'd do that."

❌ **Bad scenario:**
> "Click on the search bar, type a vessel name, and use the filter to select Rotterdam."

Scenarios describe **goals**, not **steps**.

### Survey Design

**Question Types:**
- Use rating scales (1-5 or 1-7) for measuring attitudes
- Use multiple choice for behaviors with known options
- Use open-ended sparingly and at the end
- Include "Other" and "N/A" options

**Bias Prevention:**
- Randomize option order where appropriate
- Avoid double-barreled questions
- Don't prime with leading language
- Test survey with colleagues first

---

## Phase 3: Executing Research

### Session Facilitation

See: `references/facilitation-guide.md`

**Before the Session:**
- Test all technology
- Have backup recording method
- Prepare note-taking template
- Brief observers on their role (silent)

**During the Session:**

| Do | Don't |
|----|-------|
| Listen more than talk | Fill silences immediately |
| Use "tell me more" | Ask leading questions |
| Follow unexpected threads | Stick rigidly to script |
| Note body language | Only capture verbal |
| Ask for examples | Accept generalizations |
| Embrace awkward pauses | Rescue them from silence |

**The 5-Second Rule:**
After they answer, count to 5 silently. They'll often add the most valuable insight to fill the silence.

**Probing Techniques:**
- "Tell me more about that..."
- "What do you mean by [term they used]?"
- "Can you give me a specific example?"
- "What happened next?"
- "How did that make you feel?"
- "Why was that important?"

**When They Ask Questions:**
- "What do you think it means?" (turn it back)
- "What would you expect?" (understand mental model)
- "Let's see what happens" (for usability tests)

### Bias Awareness

**Your biases to watch:**
- Confirmation bias: Hearing what supports your hypothesis
- Leading: Subtle cues that suggest "right" answers
- Anchoring: First impressions coloring everything after
- Social desirability: They want to please you

**Mitigation:**
- Have someone else take notes
- Record and review later
- Use standardized probes
- Debrief immediately after

---

## Phase 4: Synthesizing Findings

See: `references/synthesis-methods.md`

### Affinity Mapping Process

1. **Extract observations** — One insight per sticky note
2. **Cluster** — Group related observations (no labels yet)
3. **Name clusters** — What theme connects these?
4. **Find hierarchy** — Which themes are biggest? Related?
5. **Identify patterns** — What appears across multiple participants?

### From Observations to Insights

**Observation** (what happened):
> "3 of 5 users clicked the wrong button first"

**Insight** (what it means):
> "Users expect vessel actions to be grouped by workflow, not data type"

**Recommendation** (what to do):
> "Reorganize vessel actions around user tasks: 'Track this vessel' vs 'View vessel data'"

### Quantifying Qualitative Data

- Count frequency: "4 of 6 participants struggled with X"
- Severity rating: Critical / Major / Minor
- Confidence level: High (consistent) / Medium (mixed) / Low (limited data)

---

## Phase 5: Presenting Research

See: `references/research-report-template.md`

### Know Your Audience

| Audience | They Care About | Format |
|----------|-----------------|--------|
| Executives | Business impact, decisions | 1-page summary, 3 key findings |
| Product Managers | Priorities, roadmap implications | Findings + recommendations |
| Designers | Details, examples, quotes | Full report + highlight clips |
| Engineers | Feasibility, specifics | Technical implications |

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
