# Synthesis Methods

Turning raw research into actionable insights.

---

## The Synthesis Mindset

**You're not summarizing. You're interpreting.**

| Raw Data | Synthesis |
|----------|-----------|
| "3 users couldn't find the export button" | Users expect data actions grouped together, not scattered |
| "P2 said 'I always copy this to Excel'" | The built-in tools don't support their actual workflow |
| "5/6 asked about notifications" | Alert management is an unmet need |

Your job: **What does this pattern mean? What should we do about it?**

---

## Step 1: Data Extraction

### From Notes to Atomic Units

Go through all your notes and extract **individual observations** — one insight per sticky note (physical or digital).

**Format:** [Participant] + [Observation/Quote]

Examples:
- "P1: Clicked 'Reports' first when looking for cargo data"
- "P3: 'I always have three tabs open to compare vessels'"
- "P4: Hesitated 10+ seconds at the filter menu"
- "P2: 'My workaround is exporting to Excel and doing it there'"

**Keep:**
- Behaviors (what they did)
- Verbatim quotes (what they said)
- Emotions (frustration, delight, confusion)
- Workarounds
- Expectations (what they thought would happen)

**Don't combine or interpret yet.** Just extract.

---

## Step 2: Affinity Mapping

### Grouping Related Observations

1. **Spread out** all your observations
2. **Silently group** related items (no labels yet)
3. **Move things around** — a note can spark regrouping
4. **Don't force it** — some notes may not fit anywhere

### Naming Clusters

Once groups stabilize:
1. **Name the theme**, not the content
   - ❌ "Things people said about search"
   - ✅ "Search expectations mismatch"
2. **Use insight language**, not feature language
   - ❌ "Filter issues"
   - ✅ "Users need context to filter effectively"

### Finding Hierarchy

- Which themes are biggest? (most notes)
- Which themes overlap?
- What's the relationship between themes?

---

## Step 3: Pattern Recognition

### Look For

**Frequency:** How many participants showed this behavior/opinion?
- "4 of 6 participants struggled with X"
- "This came up in every interview"

**Intensity:** How strong was the reaction?
- Mild annoyance vs. complete task failure
- "It's fine" vs. "I absolutely hate this"

**Consistency:** Is this uniform or are there segments?
- "Senior traders do X, junior analysts do Y"
- "Power users have workarounds, new users get stuck"

**Contradictions:** Where do participants disagree?
- This might indicate different user segments
- Or context-dependent behavior

### Pattern Documentation

| Pattern | Frequency | Intensity | Notes |
|---------|-----------|-----------|-------|
| Users expect search to include cargo | 5/6 | High | Caused task failure in 3 cases |
| Copy-paste to Excel workaround | 4/6 | Medium | "It's annoying but I'm used to it" |
| Confusion about vessel status colors | 3/6 | Low | Asked about it but figured it out |

---

## Step 4: From Observations to Insights

### The Three Levels

**Observation** (What happened)
> "3 of 5 users clicked on the wrong section first when looking for arrival times"

**Insight** (What it means)
> "Users' mental model of 'arrival information' doesn't match our information architecture"

**Recommendation** (What to do)
> "Restructure vessel data around user tasks ('When will it arrive?' 'What's it carrying?') rather than data types"

### Insight Formulation

Template:
> **[User type]** expects/needs/believes **[thing]**, but currently **[gap/friction]**, which causes **[consequence]**.

Examples:
> **Traders** expect to see all vessel movements on a single screen, but the current design requires switching between three tabs, which causes them to miss time-sensitive changes.

> **Operations managers** believe arrival times should update automatically, but the current refresh model requires manual action, which creates a false sense of having current data.

---

## Step 5: Quantifying Qualitative Data

### Frequency Counts

Always note: "X of Y participants"
- "4 of 6 participants experienced this"
- "Mentioned in 5 of 8 interviews"

### Severity Rating

| Severity | Definition | Example |
|----------|------------|---------|
| Critical | Blocks task completion, no workaround | Couldn't complete primary task |
| High | Significant difficulty, poor workaround | Found it eventually but very frustrated |
| Medium | Notable friction, has workaround | Completed but not ideal |
| Low | Minor annoyance | Noticed but didn't impact task |

### Confidence Level

| Level | Meaning | Action |
|-------|---------|--------|
| High | Consistent across participants | Act on this |
| Medium | Mixed signals or smaller sample | Consider acting, maybe more research |
| Low | One or two mentions | Note for future, don't prioritize |

---

## Step 6: Prioritizing Findings

### Impact vs. Frequency Matrix

```
                High Frequency
                     │
         ┌───────────┼───────────┐
         │ Important │ Critical  │
 Low     │ (Monitor) │ (Fix Now) │
 Impact  ├───────────┼───────────┤ High
         │ Low       │ Important │ Impact
         │ Priority  │ (Plan)    │
         └───────────┼───────────┘
                     │
                Low Frequency
```

**Critical:** High impact + High frequency → Fix immediately
**Important (Plan):** High impact + Low frequency → Schedule soon
**Important (Monitor):** Low impact + High frequency → Improve when possible
**Low Priority:** Low impact + Low frequency → Backlog or ignore

---

## Synthesis Output Template

### Finding Format

```markdown
## Finding [#]: [Theme Name]

**Severity:** Critical / High / Medium / Low
**Frequency:** X of Y participants
**Confidence:** High / Medium / Low

### Observation
What we saw or heard (specific, factual)

### Evidence
- P1: [quote or behavior]
- P3: [quote or behavior]
- Observed in X/Y usability sessions

### Insight
What this means (interpretation)

### Recommendation
What to do about it

### Open Questions
What we still don't know
```

### Example Finding

```markdown
## Finding 3: Search Expectations Gap

**Severity:** Critical
**Frequency:** 5 of 6 participants
**Confidence:** High

### Observation
Users typed cargo-related terms (commodity names, bill of lading numbers) into vessel search and expected results.

### Evidence
- P1: Typed "crude oil" expecting to see vessels carrying crude
- P2: "I assumed I could search by cargo, that's how I think about it"
- P4: Searched "BL12345" then said "oh, I guess that's not how it works"
- Task failure in 3/6 usability sessions

### Insight
Users' mental model centers on cargo/shipment, not vessel identity. They think: "I need to find my cargo" not "I need to find the vessel my cargo is on."

### Recommendation
Either: (a) Expand search to include cargo attributes, or (b) Create a separate cargo/shipment search, or (c) Provide clear affordances that direct users to the cargo search path.

### Open Questions
- Would combined search create confusion for users who DO search by vessel?
- What's the relative frequency of cargo-first vs. vessel-first mental models?
```

---

## Common Synthesis Mistakes

| Mistake | Problem | Better Approach |
|---------|---------|-----------------|
| Reporting observations without insight | Doesn't guide action | Always add "what this means" |
| Cherry-picking supportive data | Confirmation bias | Report contradicting evidence too |
| Over-generalizing from few data points | False confidence | Always note sample size |
| Recommending solutions too early | Closes options | Separate findings from recommendations |
| Ignoring outliers | Misses edge cases or segments | Note and explain outliers |
| Vague insights | Can't act on them | Be specific and concrete |

---

## Tools for Synthesis

### Physical
- Sticky notes + wall/whiteboard
- Sharpies (forces conciseness)
- Dot voting for prioritization

### Digital
- Miro / FigJam — virtual sticky notes
- Notion / Airtable — structured database
- Dovetail — dedicated research repository
- Simple spreadsheet — observations in rows

### What Works Best
Honestly? Sticky notes. The physical act of writing and moving things creates better thinking than typing and dragging.

If remote: FigJam or Miro with everyone silent, music playing, moving notes independently before discussing.

---

## Synthesis Session Structure

### Solo Synthesis (~2 hours)

1. **Extract** — Pull all observations into atomic notes (45 min)
2. **Cluster** — Group silently, no labels (30 min)
3. **Name** — Label clusters with insight themes (15 min)
4. **Interpret** — Write insight statements (30 min)

### Team Synthesis Workshop (~3 hours)

1. **Individual extraction** — Everyone reviews notes, writes stickies (30 min, silent)
2. **Affinity clustering** — Team groups stickies silently (20 min)
3. **Theme naming** — Discuss and name clusters (30 min)
4. **Insight generation** — Small groups draft insights (30 min)
5. **Prioritization** — Impact/frequency mapping (30 min)
6. **Recommendations** — Discuss implications (30 min)
