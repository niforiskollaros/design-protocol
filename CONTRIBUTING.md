# Contributing to Design Protocol

This guide defines how DP skills and commands are authored and kept consistent. It is grounded in Anthropic's official Agent Skills guidance ([best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices), [Claude Code skills docs](https://code.claude.com/docs/en/skills), [engineering blog](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)).

## Skill authoring standards

**Frontmatter**
- `name`: ≤ 64 chars, lowercase letters/numbers/hyphens only. No reserved words (`claude`, `anthropic`).
- `description`: ≤ 1024 chars, **third person**, stating both *what the skill does* and *when to trigger it*. Put the primary use case in the **first sentence** — the combined description is truncated at ~1536 chars in the skill listing, and it's what Claude uses to pick among many skills.

**Body (SKILL.md)**
- Keep the body **under 500 lines**. Anything longer belongs in a `references/` file.
- Use **progressive disclosure**: only `name`/`description` are pre-loaded; the body loads when the skill is relevant; reference files load only when needed. Don't duplicate reference material inline.
- Keep reference files **one level deep** from SKILL.md and link to them directly.
- Any reference file over **100 lines** must start with a table of contents.
- Write the body as **standing instructions** — once invoked, a skill stays in context for the session, so every inline line is a recurring token cost.

**Content patterns**
- Offer **one default approach** plus an escape hatch, not a menu of options.
- Match "degrees of freedom" to task fragility: exact steps/scripts for fragile operations, heuristics for open-ended ones.
- For multi-step or high-stakes flows, embed a **validator → fix → repeat** loop and/or a **plan → validate → execute** checklist.
- Avoid time-sensitive information; use consistent terminology across skills.

## Evaluation-driven iteration

Anthropic recommends building skills against evaluations, not intuition. When adding or materially changing a skill:

1. **Identify the gap** — pick 3+ representative tasks the skill should handle.
2. **Write evaluations first** — define 3+ scenarios with expected outcomes *before* writing extensive docs.
3. **Establish a baseline** — run each scenario in a fresh session *without* the skill; note where Claude falls short.
4. **Write the minimum** — add only the instructions needed to pass the evals.
5. **Iterate with two Claudes** — one authors/refines, another tests the skill on real tasks in fresh sessions.
6. **Tune the description** — measure *should-trigger* vs *should-not-trigger* hit rates; adjust the description until both are high.

Record a skill's eval scenarios alongside it (e.g. a `references/evals.md`) so future edits can re-run them.

## Consistency contracts (enforced by `npm test`)

These invariants are checked by `test/install.test.js`. If you change one side, change the other:

- **Config drift** — the inline `config.json` in `commands/dp-start.md` must equal `templates/config.json`.
- **Command list** — `commands/*.md` must match the `expectedCommands` list.
- **Optional-phase keys** — every `optional_phases.<key>` a skill reads/writes must exist in the config schema (the `color`/`color_system` mismatch bug is the cautionary tale).
- **Verification T-list** — the T1–T10 truths and W1–W6 wiring in `commands/dp-verify.md` must match the canonical list in `agents/dp-verifier.md`.
- **Workflow-mode block** — the canonical "Detecting Workflow Mode" procedure must appear verbatim in every workflow skill.

## Running checks

```bash
npm test      # structural + semantic consistency tests
npm run verify   # version sync check
```
