# PRD Interview Question Bank

This file contains the full question bank, organised by section cluster and user persona.
Claude should select questions contextually — not ask every question — and adapt based on answers given.

---

## Cluster 1 — Context

Ask everyone:
- What is the name of the product or feature you're building?
- Who is the PM / owner of this PRD?
- Who are the key stakeholders who need to sign off?
- What is the target release date or timeline?
- Is this a new product, new feature, improvement, or discovery?
- Are there any related PRDs, specs, or documents I should be aware of?

---

## Cluster 2 — Problem Statement

Core questions (everyone):
- What problem are you solving? Describe it in 2–3 sentences.
- Who is experiencing this problem?
- What evidence do you have that this is a real problem? (data, research, complaints, metrics)
- Why is this problem worth solving now?
- What happens if you don't solve it?

Deeper for PM persona:
- What is the business cost of this problem today?
- Is this problem growing, stable, or declining in frequency?
- Have you tried to solve this before? What happened?

---

## Cluster 3 — Target Users & Personas

Core questions (everyone):
- Who are the primary users of this product/feature?
- Can you describe 1–2 key personas? (role, goal, pain point)
- What is the user trying to accomplish? (job-to-be-done)
- What does success look like from the user's perspective?
- Do you have any existing user research, interviews, or data to reference?

Deeper for Designer persona:
- Are there different user skill levels to account for? (novice vs power user)
- Are there accessibility requirements for specific user groups?
- What devices or contexts will users be in when using this?
- Are there any emotional states or stress scenarios to design for?

---

## Cluster 4 — Goals & Success Metrics

Core questions (everyone):
- What are the top 2–3 goals for this initiative?
- How will you know if this is successful? What does "done well" look like?
- What metrics will you track? (e.g. conversion rate, task completion time, NPS, retention)
- Do you have OKRs or KPIs this initiative is tied to?
- What does failure look like, and what's the threshold that would cause you to pivot?

For PM persona:
- Are there business metrics (revenue, cost, efficiency) this needs to move?
- What is the target improvement you're aiming for, and over what timeframe?
- How will you measure the metric before and after? Do you have a baseline?

---

## Cluster 5 — Functional Requirements

Core questions (everyone):
- What are the core features or capabilities this product/feature must have?
- Walk me through how a user would interact with this feature from start to finish.
- What are the must-have requirements vs. nice-to-haves?
- Are there any specific user actions, workflows, or states the feature needs to support?
- Are there edge cases or error states you need to handle?

For Claude Code audience (technical spec layer):
- What are the acceptance criteria for each requirement? (Given/When/Then format preferred)
- What APIs, services, or data sources does this need to integrate with?
- Are there specific components, libraries, or design system elements to use?
- What are the input/output contracts for key interactions?
- Are there state management or data persistence requirements?
- What error handling behaviour is expected?
- **Sharing & collaboration:** If this feature involves sharing content or outputs with other users, how should sharing work? Choose one:
  - Public link (anyone with the link can view — no auth required)
  - Password-protected link
  - Expiring link (define TTL: 24h / 7 days / 30 days)
  - Internal only (requires login to the same account/org)
  - No sharing needed
  
  Note for Claude: Never default silently to a sharing approach. If sharing is part of any requirement, this question is mandatory before spec generation.

---

## Cluster 6 — Non-Functional Requirements

Core questions (everyone):
- Are there performance requirements? (load time, response time, throughput)
- Are there accessibility standards to meet? (WCAG 2.1 AA, APCA, etc.)
- Are there security or privacy requirements? (auth, data handling, compliance)
- Are there scalability requirements? (user volume, data volume)
- Are there browser/device/OS compatibility requirements?
- Are there internationalisation or localisation requirements?

---

## Cluster 7 — Design Considerations

Ask if user persona is Designer or Mixed:
- Do you have Figma files, prototypes, or mockups to reference? (paste links)
- What design system or component library should be used?
- Are there specific design principles or brand guidelines to follow?
- Are there interaction patterns or animations to consider?
- What are the key screens or flows that need to be designed?
- Are there existing patterns in the product this should align with or intentionally diverge from?
- Are there responsive/adaptive design requirements?

Ask if audience includes Claude Code:
- **Component inventory (required):** Please list every component from your design system that this feature will use. For each, provide the exact Figma component name and its CSS custom property token (e.g. `Button/Primary` → `--button-primary`, `Card/Surface` → `--color-surface`). Claude will use these exact names in the spec — no placeholders.
- Are there any net-new components that don't exist in the design system yet and need to be created for this feature?
- Are there specific Tailwind utility classes that pair with these components?
- Is there a design handoff format preference? (e.g. annotated Figma, Storybook, component spec)

Note for Claude: If the user is a Designer persona and the audience includes Claude Code, this component inventory question is MANDATORY — do not proceed to draft generation without it. If the user skips it, remind them that without exact component names the spec will contain placeholders that Claude Code cannot act on.

---

## Cluster 8 — Scope

Core questions (everyone):
- What is explicitly in scope for this release?
- What is explicitly out of scope? (be specific — this prevents scope creep)
- Are there related features or improvements you're intentionally deferring?
- Is there a phased delivery plan? What goes in v1 vs. later?
- Do you want to apply MoSCoW prioritisation? (Must have / Should have / Could have / Won't have)

---

## Cluster 9 — Risks, Assumptions & Dependencies

Core questions (everyone):
- What assumptions are you making that could turn out to be wrong?
- What are the biggest risks to delivering this successfully?
- What are the dependencies? (other teams, APIs, infrastructure, legal, third-party services)
- What are the known constraints? (budget, timeline, technical debt, compliance)
- What open questions still need to be answered before or during development?

---

## Cluster 10 — Release & Rollout

Core questions (everyone):
- What are the release criteria? (what must be true before you ship?)
- Do you plan a phased rollout? (beta, limited release, full launch)
- Who needs to be notified or involved at launch? (comms, sales, support, legal)
- Is there a rollback plan if something goes wrong?
- Are there launch dependencies? (marketing, legal approval, partner readiness)
