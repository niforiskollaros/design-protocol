# Roadmap Structures — Full Templates per Type

Templates for the four NNGroup roadmap types plus audience-specific variants. Use the matching template based on the type chosen in Step 1.

---

## Template 1 — Now / Next / Future (canonical NNGroup)

### Header
```
TITLE: [Product/Team/Portfolio] Roadmap
OWNER: [Name / Role]
DATE: [YYYY-MM-DD]
HIGH-LEVEL GOALS:
  1. [Company/org goal]
  2. [Company/org goal]
  3. [Company/org goal]
```

### Body

| Completed | Now | Next (2 quarters) | Future (6+ months) | Future++ |
|---|---|---|---|---|
| ✓ [Theme] | 🔨 [Theme] | → [Theme] | ? [Theme] | 💭 [Idea] |
| ✓ [Theme] | 🔨 [Theme] | → [Theme] | ? [Theme] | 💭 [Idea] |

### Per-theme detail (linked from the table)

Each theme has full detail with Beneficiary / Need / Business Objective / Confidence / Disclaimers.

### When to use
- Default choice
- Cross-functional audience
- Timelines uncertain but direction is clear

---

## Template 2 — Outcome-Based

### Header
Same as Template 1.

### Body
Themes grouped under outcomes:

```
OUTCOME 1: Reduce onboarding drop-off from 40% → 25%
├── Theme A: For first-time users, simplify activation path [Now]
├── Theme B: For first-time users, reduce time-to-first-value [Next]
└── Theme C: For first-time users, personalize early suggestions [Future]

OUTCOME 2: Increase retention at 90 days from 50% → 65%
├── Theme D: For active users, surface unused value [Now]
├── Theme E: For at-risk users, trigger re-engagement [Next]
└── Theme F: ...
```

### When to use
- Org has explicit outcome targets (OKRs, North Star metric)
- Leadership wants to see work tied to measurable shifts
- Measuring progress matters more than sequencing

---

## Template 3 — Theme-Based (No Time Horizons)

### Header
Same as Template 1 + "Commit order" line.

### Body
Just themes, stack-ranked:

```
1. [Theme] — Priority score [X] — Owner [who]
2. [Theme] — Priority score [X] — Owner [who]
3. [Theme] — Priority score [X] — Owner [who]
...
```

### When to use
- Velocity is unpredictable
- Team works in pull mode (take next when ready)
- Reporting to stakeholders who don't need timing commitments

---

## Template 4 — Lean / Low-Fidelity

### Structure
Sticky-note wall (or digital equivalent — Miro, FigJam):

- **Column headers:** Now / Next / Future
- **Sticky notes:** one per theme, hand-written or typed
- **Color coding:** by audience or product area
- **Dot-vote marks:** for prioritization output

### When to use
- In a workshop — live, collaborative
- When polish would slow alignment
- Iterating fast before freezing a format

---

## Audience-Specific Variants

The roadmap artifact can be re-rendered for different audiences without changing the content.

### Variant A — Executive Read-Out (1-pager)
```
╔═══════════════════════════════════════════════════════════════╗
║ [PRODUCT] UX ROADMAP — [QUARTER YEAR]                        ║
║ Owner: [Name]  ·  Last updated: [Date]                       ║
╠═══════════════════════════════════════════════════════════════╣
║ HIGH-LEVEL GOALS                                              ║
║ 1. [Goal]                                                     ║
║ 2. [Goal]                                                     ║
║ 3. [Goal]                                                     ║
╠═══════════════════════════════════════════════════════════════╣
║ NOW         │ NEXT        │ FUTURE                           ║
║ [3 themes]  │ [3 themes]  │ [3 themes]                       ║
╠═══════════════════════════════════════════════════════════════╣
║ TOP-3 OUTCOMES WE'RE TARGETING                                ║
║ 1. [Outcome]  — Current: [X]  Target: [Y]                    ║
║ 2. [Outcome]  — Current: [X]  Target: [Y]                    ║
║ 3. [Outcome]  — Current: [X]  Target: [Y]                    ║
╠═══════════════════════════════════════════════════════════════╣
║ NEXT REVIEW: [Date]                                           ║
╚═══════════════════════════════════════════════════════════════╝
```
One page. No feature names. All outcome-oriented.

### Variant B — Team-Internal View
Full detail table with all 9 theme components. Typically in Notion, Confluence, or a shared doc.

### Variant C — Stakeholder Commitment View
Shows only **Now** and **Next**. Hides Future entirely to avoid over-commitment. Includes explicit disclaimer: *"Future direction is shown in the full roadmap on request — commitments are limited to Now and Next."*

### Variant D — Product-Ops / Delivery View
Includes:
- Owner (team or person) per theme
- Estimated effort (from prioritization)
- Dependencies between themes
- Risk flags

Used by delivery/ops to plan capacity.

---

## Visualization Formats

The same content rendered in different visual formats:

| Format | Best for | Tool |
|---|---|---|
| Swimlane table | Detail-rich review | Notion, Confluence, Markdown |
| Gantt-like bars | Showing duration | Timeline view, Aha! |
| Kanban columns | Rolling refresh | Trello, Linear, Miro |
| Slide deck | Executive read-out | Slides with one theme per slide |
| One-pager PDF | Send-and-forget comms | PDF export |
| Live workshop wall | Iterative facilitation | Miro, FigJam, sticky notes |

**Recommendation:** maintain source-of-truth in one format (usually table). Generate derivatives from that source on demand.

---

## Versioning & Change Log

Every roadmap iteration should include:

```markdown
## Change Log
| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-04-01 | [Owner] | Initial roadmap |
| 1.1 | 2026-05-15 | [Owner] | Moved Theme X from Next to Now; added Theme Y to Future (new research from team Z) |
| 2.0 | 2026-07-01 | [Owner] | Quarterly refresh — 40% of themes revised |
```

Never delete themes from history — mark them as *completed*, *deprecated*, or *merged into X*.
