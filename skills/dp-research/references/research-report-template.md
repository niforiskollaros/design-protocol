# Research Report Template

Presenting findings so stakeholders actually act on them.

---

## Know Your Audience First

| Audience | They Care About | Give Them |
|----------|-----------------|-----------|
| **Executives** | Business impact, decisions, risks | 1-page summary, 3 key findings max |
| **Product Managers** | Priorities, roadmap, trade-offs | Findings + recommendations + effort |
| **Designers** | Details, user quotes, inspiration | Full report + video clips |
| **Engineers** | Feasibility, edge cases, specifics | Technical implications |
| **Stakeholders (mixed)** | "Did we learn what we needed?" | Clear answers to original questions |

**Pro tip:** Make one comprehensive report, then create audience-specific views.

---

## Report Structure

### Executive Summary (1 page max)

This may be the only thing leadership reads. Make it count.

```markdown
# [Project Name] Research Summary

## What We Studied
[1 sentence: Topic and why it mattered]

## How We Studied It
[Method] with [N participants] who [participant criteria]
[Dates conducted]

## Top Findings

### 1. [Finding title]
[2-3 sentences: What we learned and why it matters]

### 2. [Finding title]
[2-3 sentences]

### 3. [Finding title]
[2-3 sentences]

## Recommended Actions
1. [Action] — [Why] — [Priority]
2. [Action] — [Why] — [Priority]
3. [Action] — [Why] — [Priority]

## What's Next
[Immediate next steps or decisions needed]
```

---

### Full Report Structure

```markdown
# [Project Name] Research Report

## Executive Summary
[Copy from above]

---

## Background & Objectives

### Business Context
Why did we conduct this research? What problem or opportunity prompted it?

### Research Questions
1. [Primary question we wanted to answer]
2. [Secondary question]
3. [Secondary question]

### What This Research Is NOT
[Scope limitations, out-of-bounds topics]

---

## Methodology

### Approach
[Method chosen] because [rationale for method selection]

### Participants
- **Sample size:** N participants
- **Criteria:** [Who qualified]
- **Recruitment:** [How we found them]
- **Demographics/Segments:** [Relevant breakdowns]

| ID | Role | Experience | Relevant Traits |
|----|------|------------|-----------------|
| P1 | Senior Trader | 8 years | Heavy platform user |
| P2 | Analyst | 2 years | New to platform |
| ... | | | |

### Materials
[What we tested, showed, or used]

### Limitations & Caveats
- [Limitation 1] — How it might affect findings
- [Limitation 2]

---

## Key Findings

### Finding 1: [Insight-Driven Title]

**Severity:** [Critical / High / Medium / Low]
**Frequency:** [X of Y participants]
**Confidence:** [High / Medium / Low]

#### What We Observed
[Specific, factual description of what happened]

#### Evidence
> "[Direct quote from participant]" — P3

> "[Another quote]" — P5

[Description of observed behavior]

#### What This Means
[Interpretation: Why this matters, what it implies]

#### Recommendation
[What to do about it]

---

### Finding 2: [Title]
[Same structure]

---

### Finding 3: [Title]
[Same structure]

---

## Additional Observations

[Smaller findings that didn't rise to "key finding" level but are worth noting]

- [Observation]: [Brief implication]
- [Observation]: [Brief implication]

---

## Answers to Research Questions

| Question | Answer | Confidence |
|----------|--------|------------|
| [Original question 1] | [Clear answer] | High/Med/Low |
| [Original question 2] | [Clear answer] | High/Med/Low |

---

## Recommendations

| Priority | Recommendation | Addresses | Effort | Impact |
|----------|----------------|-----------|--------|--------|
| 1 | [Action] | Finding #1, #3 | [S/M/L] | [High/Med/Low] |
| 2 | [Action] | Finding #2 | [S/M/L] | [High/Med/Low] |
| 3 | [Action] | Finding #4 | [S/M/L] | [High/Med/Low] |

### Detailed Recommendation Descriptions

**Recommendation 1: [Title]**
[2-3 sentences expanding on what this means practically]

**Recommendation 2: [Title]**
[Expansion]

---

## Open Questions & Future Research

### Unresolved Questions
- [Question]: [Why it matters, potential approach to answer]
- [Question]: [Why it matters]

### Suggested Follow-Up Research
- [Research idea]: [What it would answer]

---

## Appendix

### A. Discussion Guide / Test Script
[Include or link]

### B. Participant Screener
[Criteria and questions used]

### C. Raw Data
[Link to full notes, recordings, or synthesis artifacts]

### D. Video Highlights
[Links to key clips with timestamps]
```

---

## Presenting Research (Live)

### Structure for a 30-min Readout

| Section | Time | Content |
|---------|------|---------|
| Context | 2 min | Why we did this, what we asked |
| Method | 3 min | Who, how, caveats |
| Findings | 15 min | Top 3-4 findings with evidence |
| Recommendations | 5 min | What to do, prioritized |
| Discussion | 5 min | Questions, debate, next steps |

### Presentation Tips

**Lead with insights, not methodology**
- ❌ "We interviewed 6 users over 2 weeks using semi-structured interviews..."
- ✅ "Users can't find their cargo. Here's what we learned..."

**Use quotes and clips**
- A 30-second video clip is worth 10 minutes of explanation
- Prepare 2-3 highlight clips (moments of frustration, confusion, insight)
- Anonymize if needed ("A senior trader said...")

**Show, don't tell**
- Screenshots of where they got stuck
- Heatmaps or path visualizations if available
- Before/after mental model diagrams

**Separate findings from recommendations**
- Findings = What we learned (facts, evidence)
- Recommendations = What we suggest (opinions, options)
- Make the distinction clear

**Be honest about confidence**
- "We're highly confident about X"
- "Y is suggestive but based on limited data"
- "Z is a hypothesis that needs validation"

**Prepare for pushback**
- "How do we know this is representative?"
- "But our power users do it differently"
- "That's not feasible technically"

Have evidence ready. Be willing to say "we don't know" when you don't.

---

## Common Report Mistakes

| Mistake | Why It's Bad | Instead |
|---------|--------------|---------|
| Burying the insights | Executives won't find them | Executive summary first |
| Too much methodology | Nobody cares about your process | Keep it brief, detail in appendix |
| Observations without insights | Doesn't guide decisions | Always interpret "so what?" |
| Recommendations without findings | Opinions without evidence | Connect every rec to evidence |
| Wall of text | Won't be read | Use headers, bullets, visuals |
| No prioritization | Overwhelming, no action | Rank recommendations |
| Hiding caveats | Undermines trust | Be upfront about limitations |
| No next steps | Report dies in a doc | End with clear actions |

---

## One-Page Formats

### For Slack/Email Updates

```
📊 [Project] Research Complete

We talked to [N] [participants] about [topic].

🔑 Key findings:
• [Finding 1] — [Impact]
• [Finding 2] — [Impact]
• [Finding 3] — [Impact]

💡 Top recommendation: [Action]

📄 Full report: [link]

Questions? Let's discuss in [channel/meeting]
```

### For Quick Stakeholder Update

```
RESEARCH: [Topic]
STATUS: Complete
PARTICIPANTS: N [type]

LEARNED:
1. [Insight] → [Implication]
2. [Insight] → [Implication]

RECOMMEND:
→ [Primary action]

NEXT:
• [Immediate step]
```

---

## Video Clip Guidelines

### What Makes a Good Clip

- **Clear audio** — Can hear what they said
- **Visible reaction** — Shows emotion/frustration/confusion
- **Self-contained** — Makes sense without context
- **Brief** — 15-45 seconds ideal, never over 90

### When to Use Clips

- To prove a point stakeholders might doubt
- To create empathy ("look how frustrated they are")
- To show a specific interaction failure
- When a quote is more powerful spoken

### Preparing Clips

1. Timestamp key moments during synthesis
2. Trim to essential moment (don't make people wait)
3. Add captions if audio quality is imperfect
4. Anonymize if needed (blur face, change name)

---

## Report Templates by Research Type

### User Interview Report
- Emphasize themes and patterns
- Heavy use of quotes
- Journey maps if applicable
- Persona implications

### Usability Test Report
- Task success rates table
- Severity ratings
- Specific UI element callouts
- Video clips essential
- Annotated screenshots

### Survey Report
- Charts and graphs
- Statistical significance notes
- Segment comparisons
- Verbatim responses for open-ended

### Competitive Analysis
- Feature comparison matrix
- Screenshots from competitors
- Strengths/weaknesses
- Opportunities identified
