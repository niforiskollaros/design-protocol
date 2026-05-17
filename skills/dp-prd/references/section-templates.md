# PRD Section Templates

This file defines the structure and formatting for each section of the generated PRD.
Use these as the canonical output format across all delivery formats (docx, HTML, markdown).

---

## Document Header

```
[Product/Feature Name] — Product Requirements Document
Version: [1.0 / 2.0 / etc.]
Status: [Draft / In Review / Approved]
Owner: [Name, Role]
Last Updated: [Date]
Stakeholders: [Names and roles]
```

---

## Section 1 — Overview

Short executive summary (3–5 sentences max). Answer:
- What is this?
- Why are we building it?
- Who is it for?
- When is it expected to ship?

---

## Section 2 — Problem Statement

**The Problem**
[2–4 sentences describing the problem clearly]

**Why Now**
[Why is this the right time to solve it? Market signal, business pressure, user demand?]

**Evidence**
[Data, research, quotes, or signals that validate the problem exists]

**Impact of Not Solving**
[What happens if we don't address this?]

---

## Section 3 — Target Users & Personas

For each persona, use this structure:

**Persona Name** *(e.g. "The Enterprise Account Manager")*
- Role: [job title / description]
- Goal: [what they're trying to accomplish]
- Pain Point: [what frustrates them today]
- Job-to-be-done: [When I ______, I want to ______, so I can ______]

---

## Section 4 — Goals & Success Metrics

**Objectives**
[List 2–4 clear objectives this initiative must achieve]

**Success Metrics**

| Metric | Baseline | Target | Timeframe |
|--------|----------|--------|-----------|
| [metric name] | [current value] | [goal] | [when] |

**Connected OKRs / KPIs**
[Link to parent OKR or business KPI if applicable]

**Definition of Failure**
[What threshold would trigger a pivot or stop?]

---

## Section 5 — Functional Requirements

For each requirement:

**REQ-[N]: [Short Title]**
- Description: [What the feature does, written from the user's perspective]
- Priority: [Must Have / Should Have / Could Have / Won't Have]
- User Story: As a [persona], I want to [action], so that [outcome]
- Acceptance Criteria:
  - Given [context], when [action], then [result]
  - Given [context], when [action], then [result]
- Notes: [edge cases, dependencies, open questions]

---

## Section 6 — Non-Functional Requirements

**Performance**
[Load time, response time, throughput targets]

**Accessibility**
[WCAG level, APCA targets, specific requirements]

**Security & Privacy**
[Auth requirements, data handling, compliance (GDPR, CCPA, etc.)]

**Scalability**
[User volume, data volume, concurrency]

**Compatibility**
[Browsers, devices, OS, screen sizes]

**Localisation**
[Languages, date/currency formats, RTL support if needed]

---

## Section 7 — Design Considerations

**Design System / Component Library**
[Name of design system, version, link to Figma]

**Key Screens / Flows**
[List of screens or flows that need design work, with Figma links where available]

**Design Principles to Apply**
[List 2–4 principles relevant to this feature]

**Accessibility Requirements**
[Specific design-level accessibility requirements: colour contrast ratios, focus states, touch targets, etc.]

**Responsive Behaviour**
[How the feature adapts across breakpoints]

**Open Design Questions**
[Unresolved design decisions that need exploration]

---

## Section 8 — Scope

**In Scope**
- [Item 1]
- [Item 2]
- [Item 3]

**Out of Scope**
- [Item 1 — and why if useful]
- [Item 2]

**Deferred to Later**
- [Item 1 — target milestone/version]

**MoSCoW Summary** *(if applicable)*

| Must Have | Should Have | Could Have | Won't Have (this release) |
|-----------|-------------|------------|--------------------------|
| [req] | [req] | [req] | [req] |

---

## Section 9 — Competitive Landscape *(if research was requested)*

**Overview**
[2–3 sentence market context]

**Competitor Comparison**

| Competitor | Key Features | Positioning | Pricing | Notable Gap |
|------------|-------------|-------------|---------|-------------|
| [name] | [features] | [positioning] | [pricing] | [gap] |

**Feature Gap Analysis**
[What do competitors do that this PRD addresses? What do they do that we're not addressing?]

**SWOT Summary** *(if deep dive was selected)*

| Strengths | Weaknesses | Opportunities | Threats |
|-----------|-----------|---------------|---------|
| | | | |

---

## Section 10 — Risks, Assumptions & Dependencies

**Assumptions**
- [Assumption 1 — what would need to be true for this to succeed]

**Known Risks**

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| [risk] | High/Med/Low | High/Med/Low | [mitigation] |

**Dependencies**

| Dependency | Owner | Status | Notes |
|------------|-------|--------|-------|
| [dep name] | [team/person] | [status] | |

**Open Questions**

| # | Question | Owner | Due |
|---|----------|-------|-----|
| 1 | [question] | [name] | [date] |

---

## Section 11 — Release Criteria & Rollout

**Release Criteria**
The following must be true before shipping:
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

**Rollout Plan**
- Phase 1: [description, audience, timeline]
- Phase 2: [description, audience, timeline]
- Full release: [timeline]

**Launch Dependencies**
[Anything that must happen before or alongside launch: legal sign-off, marketing assets, support docs, etc.]

**Rollback Plan**
[How to revert if something goes wrong post-launch]

---

## Appendix — Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [date] | [name] | Initial draft |
