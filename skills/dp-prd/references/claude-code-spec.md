# Claude Code–Ready Spec Format

When the user selects "Claude Code" as a primary audience, generate a **separate structured spec file**
alongside (or instead of) the full stakeholder PRD. This spec is designed to be used as a prompt
or context file fed directly into Claude Code.

---

## What makes a spec Claude Code–ready

Claude Code works best when given:
1. **Precise functional scope** — what to build, not how to build it
2. **Acceptance criteria** — testable conditions in Given/When/Then format
3. **Component/API contracts** — what exists, what needs to be created
4. **Design system references** — exact token names, component names, Figma links
5. **Technical constraints** — stack, libraries, patterns to follow
6. **File/folder structure hints** — where new code should live
7. **Example inputs/outputs** — concrete examples reduce ambiguity

---

## Claude Code Spec Template

```markdown
# [Feature Name] — Implementation Spec
Generated from PRD v[X.X] | [Date]

## Overview
[2–3 sentences: what to build and why. Keep it tight.]

## Stack & Constraints
- Framework: Next.js (latest stable)
- Styling: Tailwind CSS + CSS custom properties (design tokens)
- Design system: Custom designOS — tokens follow `--[component]-[variant]-[modifier]` convention (e.g. `--button-primary`, `--color-brand-500`)
- State management: [confirm per feature — React Context / Zustand]
- Key libraries already in use: [list any additional]
- DO NOT use: inline styles, hardcoded colour values, non-token references

## Design References
- Figma file: [URL — paste from Figma]
- Component names to use: [exact Figma component names — ask designer to list]
- Token references: CSS custom properties e.g. `--button-primary`, `--color-surface`, `--spacing-md`
- Responsive breakpoints: Tailwind defaults unless overridden in config

## Features to Implement

### Feature 1: [Name]
**Description:** [What this feature does]
**Location:** [File path or component to create/modify]

**Acceptance Criteria:**
- Given [user is on X screen], when [they do Y], then [Z happens]
- Given [edge case], when [action], then [expected behaviour]
- Given [error state], when [it occurs], then [error is handled by...]

**Inputs:** [Props, API params, user inputs]
**Outputs:** [Return values, UI changes, side effects]
**API / Data:** [Endpoint, payload shape, response shape]

### Feature 2: [Name]
[Same structure]

## Components to Create

| Component Name | File Path | Props | Notes |
|----------------|-----------|-------|-------|
| [Name] | [path] | [prop: type] | |

## API Contracts

### [Endpoint name]
- Method: [GET / POST / PUT / DELETE]
- Path: [/api/...]
- Request body: [shape]
- Response: [shape]
- Error states: [400, 401, 404, 500 — expected handling]

## State Shape (if applicable)
```typescript
interface [FeatureName]State {
  [field]: [type];
}
```

## Test Cases to Write
- Unit: [what to unit test]
- Integration: [what integration scenarios to cover]
- E2E: [what user flows to test end-to-end]

## Out of Scope for This Implementation
[Explicit list — prevents Claude Code from over-building]

## Open Technical Questions
[Anything unresolved that the developer or Claude Code should flag before proceeding]
```

---

## Instructions for Claude when generating this spec

1. **Be explicit about file paths** — Claude Code works better with concrete locations
2. **Use TypeScript types** if the codebase uses TypeScript
3. **Reference exact component/token names** from the design system — don't describe visually
4. **Write acceptance criteria in Given/When/Then** — this maps to test generation
5. **Include error states and edge cases** explicitly — they're often missed in PRDs
6. **Mark genuinely unknown things as `[TBD — ask before implementing]`** rather than guessing
7. **Keep the spec focused** — include only what Claude Code needs, not stakeholder context
