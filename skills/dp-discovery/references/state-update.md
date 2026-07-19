# Write Output & Update State (Workflow Mode)

Phase 5 of the discovery process. When in workflow mode, after synthesis, perform these four writes.

## 1. Write output to `.design/phases/DISCOVERY.md`

Write the Design Brief with YAML frontmatter:

```yaml
---
phase: discovery
skill: dp-discovery
completed: YYYY-MM-DDTHH:MM:SSZ
depth: [quick|standard|thorough]
challenge_mode: [light|heavy|heavy+]
context_loaded:
  - PROJECT.md
  - 01-CONTEXT.md (if existed)
problem_statement: "One-liner problem"
primary_user: "User role"
key_requirements:
  - REQ-01: [requirement text]
  - REQ-02: [requirement text]
---

[Design Brief content]
```

## 2. Update `.design/STATE.md`

```markdown
## Current Position
Phase: 1 of 4 (Discovery)
Status: completed
Progress: [██░░░░░░░░] 25%

### Last Activity
- **Date:** [TIMESTAMP]
- **Action:** Completed discovery phase with /dp:discovery
- **User:** [session user]

### What Happened
[Brief summary of discovery: problem identified, users defined, requirements captured]

### Accumulated Context
#### Problem Summary
[Problem statement from brief]

#### Primary User
[Primary user description]

#### Key Requirements
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]
```

## 3. Update `.design/config.json`

```json
{
  "workflow": {
    "current_phase": 2,
    "phases_completed": ["discovery"],
    "workflow_status": "in_progress"
  }
}
```

## 4. Log key decisions to `.design/PROJECT.md` Key Decisions table

```markdown
| Date | Phase | Decision | Rationale | Decided By |
|------|-------|----------|-----------|------------|
| [date] | Discovery | [problem framing decision] | [why] | [user] |
| [date] | Discovery | [scope decision] | [why] | [user] |
```
