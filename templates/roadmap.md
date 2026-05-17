# Design Roadmap: [PROJECT_NAME]

> Created: [DATE]
> Target Completion: [DATE]

## Overview

```
Discovery ──► UX ──► UI ──► Review
    │
    └──► Research (optional branch)
```

---

## Phase 1: Discovery

**Goal:** Transform vague requirements into a bulletproof design brief

**Skill:** `/dp:discovery`

**Inputs:**
- Initial requirements or feature request
- Stakeholder context
- Existing research (if any)

**Outputs:**
- Problem statement
- User personas and journey
- Requirements (must/should/could/must-not)
- Constraints documented
- Success metrics defined

**Success Criteria:**
- [ ] Problem is clearly articulated
- [ ] Primary user is well-defined
- [ ] Requirements are prioritized
- [ ] Constraints are documented
- [ ] Success metrics are measurable

**Dependencies:** None (starting phase)

---

## Phase 2: UX

**Goal:** Apply usability principles to create intuitive user flows and interactions

**Skill:** `/dp:ux`

**Inputs:**
- Discovery brief (DISCOVERY.md)
- Design requirements

**Outputs:**
- User flow diagrams
- Component behaviors defined
- All states specified (empty, loading, error, success, etc.)
- Accessibility requirements
- Usability patterns applied

**Success Criteria:**
- [ ] User flow is complete end-to-end
- [ ] All interactive states are defined
- [ ] Accessibility requirements documented
- [ ] Usability principles applied with rationale
- [ ] Component behaviors specified

**Dependencies:** Discovery complete

---

## Phase 3: UI

**Goal:** Apply visual design principles to create polished, professional interface specs

**Skill:** `/dp:ui`

**Inputs:**
- Discovery brief (DISCOVERY.md)
- UX decisions (UX-DECISIONS.md)

**Outputs:**
- Visual hierarchy definitions
- Grid and spacing specifications
- Component visual specs with tokens
- Color and typography usage
- Animation guidelines

**Success Criteria:**
- [ ] Visual hierarchy is clear (squint test)
- [ ] 8px grid system applied
- [ ] Design tokens specified
- [ ] Components are fully specified
- [ ] Responsive considerations documented

**Dependencies:** UX complete

---

## Phase 4: Review

**Goal:** Audit implementation for quality, accessibility, and spec alignment

**Skill:** `/dp:eng_review`

**Inputs:**
- All previous phase documents
- Implemented code to review

**Outputs:**
- Quality score (0-100)
- Issues by severity (critical/serious/moderate)
- Spec alignment report
- Recommended fixes

**Success Criteria:**
- [ ] No critical accessibility issues
- [ ] Quality score meets threshold
- [ ] Spec alignment verified
- [ ] All issues have recommended fixes

**Dependencies:** UI complete, code implemented

---

## Optional: Research

**Goal:** Validate assumptions and gather user insights

**Skill:** `/dp:research`

**When to Include:**
- Significant unknowns in discovery
- High-risk design decisions
- Need user validation before building
- Existing research is outdated

**Inputs:**
- Research questions (from Discovery "Research Needed" section)
- Access to target users

**Outputs:**
- Research plan
- Interview/test materials
- Research findings
- Updated design brief (if findings change assumptions)

**Can Branch From:** Discovery (most common) or any phase

---

## Milestones

| Milestone | Phase | Deliverable | Target Date |
|-----------|-------|-------------|-------------|
| Brief Complete | Discovery | DISCOVERY.md | |
| Flows Complete | UX | UX-DECISIONS.md | |
| Spec Complete | UI | UI-SPEC.md | |
| Ready to Ship | Review | REVIEW.md + Score | |

---

## Risk Register

| Risk | Phase | Likelihood | Impact | Mitigation |
|------|-------|------------|--------|------------|
| | | | | |
