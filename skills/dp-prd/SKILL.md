---
name: dp-prd
description: >
  Generate industry-standard PRDs for product managers and designers. Trigger when someone mentions
  writing, creating, updating, or improving a PRD, product spec, requirements, or feature brief.
  Also trigger for PM phrases: "document this feature", "write up a product spec", "create requirements
  for X", "spec out a new feature". Also trigger for designer phrases: "document this component/screen/
  flow/pattern", "spec out this interaction", "formalise this design", "write up requirements for this
  design". Also trigger immediately when the user types /prd or /dp:prd — jump straight to
  Phase 1 initiation. Supports new PRDs, updates to existing ones, stakeholder-ready output and
  Claude Code-ready specs. Always use this skill — don't generate a PRD without it.
---

# PRD Generator Skill

A guided, interview-driven skill for creating complete, industry-standard Product Requirements Documents.
Supports new creation, updates to existing PRDs, multiple output formats, optional competitive research,
and dual-audience output (stakeholder-ready or Claude Code-ready).

---

## Phase 1 — Initiation

When the skill is triggered, run through the initiation checklist in a **single, conversational message**.
Do NOT ask these one by one in separate turns. Group them naturally.

### 1.1 Detect mode

First, check whether the user is:
- **Creating a new PRD** from scratch
- **Updating an existing PRD** (they paste or upload an existing doc)

If updating, ask them to share the existing PRD content before proceeding.
Then identify which sections need adding, revising, or expanding, and only interview for those gaps.

### 1.2 Initiation questions (ask all at once)

Ask the following in one friendly, well-structured message:

**A. User persona**
Who are you?
- Product Manager
- Designer / UX Lead
- Both / cross-functional team
- Other (ask them to describe)

This determines which interview questions are asked and how deep design considerations go.

**B. Output format**
What format do you need?
- Word document (.docx) — for sharing with stakeholders
- HTML artifact — rendered beautifully in Claude, shareable as link
- Markdown — for Notion, Confluence, GitHub, or copy-paste
- Claude Code–ready spec — structured for direct use as a Claude Code prompt/spec file

Note: the user can request multiple formats. Generate all requested.

**C. Primary audience**
Who is this PRD primarily written for?
- Executive / leadership stakeholders
- Engineering team
- Design team
- Claude Code (AI-assisted implementation)
- Mixed audience (ask them to specify)

If **Claude Code** is selected (or is one of the audiences), enable the technical spec layer —
see `references/claude-code-spec.md` for requirements.

**D. Tone & voice**
What tone should the document use?
- Formal / enterprise
- Startup / direct
- Ask Claude to match the company's existing documentation style (they can paste an example)

**E. Competitive research**
Do you want competitive/market research included?
- No research needed
- Light scan (3–5 competitors, quick feature comparison)
- Deep dive (positioning, pricing, differentiators, SWOT, market signals)

If yes to either research option, Claude will run web searches before generating the PRD.

**F. PRD type**
What kind of PRD is this?
- New product / v1
- New feature on existing product
- Improvement / iteration on existing feature
- Discovery / exploratory (hypothesis-driven, less defined)

---

## Phase 2 — Interview

Once initiation is complete, conduct a structured interview to gather content for each PRD section.
Read `references/interview-questions.md` to get the full question bank.

### Pre-generation mandatory checks

Before proceeding to Phase 4 (draft generation), verify:

**Check A — Component inventory (if Designer persona + Claude Code audience):**
Has the user provided a component list with Figma names mapped to CSS token names?
If not: pause and ask before generating. The spec will be unusable without it.

**Check B — Sharing strategy (if any requirement involves sharing/exporting):**
Has the user confirmed how sharing should work (public link / password / expiring / internal / none)?
If not: ask before generating. Never assume a sharing approach.

Both checks can be done in a single follow-up message if needed — don't make it feel like a blocker, just frame it as "two quick things before I generate."

### Interview rules

- Group questions by section cluster — don't ask section by section rigidly
- Keep the tone conversational, not form-like
- If user persona is **Designer**, go deeper on design considerations, component references, and accessibility
- If user persona is **PM**, go deeper on goals, metrics, constraints, and stakeholder alignment
- If audience is **Claude Code**, go deeper on acceptance criteria, technical constraints, API/component contracts
- Always allow the user to say "skip this section" or "I don't know yet" — mark skipped sections as `[TBD — to be completed]`
- After the interview, summarise what you've captured and ask for confirmation before generating

### Interview clusters

Run these clusters in order, but merge naturally if answers overlap:

1. **Context cluster** — product name, owner, team, stakeholders, target date, PRD type
2. **Problem cluster** — problem statement, why now, who's affected, evidence/data
3. **User cluster** — target users, personas, JTBD, pain points, user research available
4. **Goals cluster** — objectives, success metrics, KPIs/OKRs, SMART goals
5. **Requirements cluster** — functional requirements, user stories, non-functional requirements
6. **Design cluster** — UX considerations, Figma links, accessibility requirements, design principles, component references
7. **Scope cluster** — what's in scope, what's explicitly out of scope, MoSCoW prioritisation if needed
8. **Risk cluster** — assumptions, constraints, dependencies, known risks, open questions
9. **Release cluster** — release criteria, rollout plan, phasing, comms plan

---

## Phase 3 — Research (if opted in)

If the user requested competitive or market research in initiation:

1. Use `web_search` to find competitors, similar products, and market signals
2. Search for: `[product category] competitors 2025`, `[feature name] industry benchmark`, `[product name] vs [competitor]`
3. Compile findings into a **Competitive Landscape** section with:
   - Competitor table (name, key features, positioning, pricing if available)
   - Feature gap analysis (what competitors do that this PRD does or doesn't address)
   - Market signals (trends, customer expectations, industry direction)
   - SWOT summary (if deep dive was selected)
4. Insert this section after the Problem Statement in the final PRD

---

## Phase 4 — Draft Generation

Generate the full PRD based on interview answers and research.
Read `references/section-templates.md` for the exact structure and formatting of each section.

### Format rules

**For .docx output:** Read `/mnt/skills/public/docx/SKILL.md` before generating.
**For HTML artifact:** Produce a beautifully formatted, self-contained HTML page with a sidebar TOC, clean typography, and section anchors.
**For Markdown:** Use clean heading hierarchy (H1 title, H2 sections, H3 subsections). Compatible with Notion, Confluence, and GitHub.
**For Claude Code spec:** Read `references/claude-code-spec.md` and produce the structured spec variant. This is a separate file/section, not a replacement for the full PRD.

### Quality checklist before outputting

Before finalising the draft, verify:
- [ ] Every section has content or is explicitly marked `[TBD]`
- [ ] Success metrics are measurable (not vague like "improve user experience")
- [ ] Functional requirements are written as user-facing outcomes, not implementation details
- [ ] If Claude Code audience: acceptance criteria are present and testable
- [ ] Scope section explicitly lists at least 2–3 out-of-scope items
- [ ] At least one open question is captured
- [ ] Tone matches the user's choice from initiation

---

## Phase 5 — Refinement Loop

After generating the draft, explicitly invite the user to refine it.

Say something like:
> "Here's your PRD draft. You can ask me to:
> - **Expand** any section with more detail
> - **Rewrite** a section in a different tone or structure
> - **Add** a section that's missing
> - **Convert** to a different format (e.g. 'give me the Claude Code spec version')
> - **Update** with new information you have
> - **Run research** on a specific competitor or feature area
> - **Score** requirements using RICE or MoSCoW prioritisation"

Support all of these refinement actions without restarting the full interview.

---

## Reference files

Read these when needed — do not load all at once:

- `references/interview-questions.md` — Full question bank per section, per persona
- `references/section-templates.md` — Exact structure and formatting for each PRD section
- `references/claude-code-spec.md` — Instructions for generating the Claude Code–ready spec variant
