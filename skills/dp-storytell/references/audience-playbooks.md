# Audience Playbooks

Deep playbooks for each of the 5 primary audiences. Use these to tune every presentation.

---

## Playbook 1 — Executive / Leadership

### What they care about
- Business outcome (revenue, retention, risk, competitive position)
- Cost of action vs. cost of inaction
- Downstream risk and dependencies
- The decision needed now — not the process

### What they dismiss
- Designer jargon ("hierarchy," "delight," "craft")
- Process recounting ("we did 12 interviews")
- Long alternative-comparisons (they assume you did the work)
- Consensus-seeking language ("we think maybe")

### Attention economics
- Assume **50% of scheduled time** — a 30-min slot is 15 min of presenting
- **One slide, one idea** — grok in 6 seconds or it fails
- Prepare **30-sec, 3-min, and 30-min versions** — you'll get interrupted; know which version lands

### Vocabulary translation

| You say | They hear | Say instead |
|---|---|---|
| "Better hierarchy" | Aesthetics | "Users find the primary action 40% faster" |
| "Cleaner UI" | Taste | "Reduced form errors cut support cost $X" |
| "Improved IA" | (nothing) | "Cut clicks-to-purchase from 6 to 3" |
| "Accessible" | Compliance cost | "Opens $X market; avoids ADA litigation risk" |
| "Design system" | Engineering vanity | "Ship features 30% faster; one source of truth" |
| "Delight" | Fluff | "NPS lift; retention driver; reduces churn" |

**Rule:** never present a design decision without a unit (dollars, minutes, percentage points, or users).

### Structure they respond to
- BLUF (Bottom Line Up Front)
- Minto Pyramid (SCQA intro + 3 supporting points)
- Executive one-pager

### Questions they'll ask
1. "What's the ask?" → have a 1-sentence answer ready
2. "What's the ROI?" → have a number, even if rough
3. "What's the risk if we don't?" → quantify the counterfactual
4. "Who else is affected?" → stakeholder map ready
5. "When?" → specific date, not "Q3ish"

### Winning them
- Pre-wire 1:1 before the meeting (see delivery-tactics.md)
- Lead with the ask in sentence one
- Use one hero visual, not a deck
- Offer a 24-hour commitment, not a decision-in-room if they're on the fence
- Bob Baxley's rule: *"The most senior audience gets the shortest, simplest artifact."*

### Failure modes with execs
1. Walking through process → redirect to outcome
2. Over-qualifying with "maybe / might / possibly" → sounds unprepared
3. Showing 5 alternatives equally → signals no point of view
4. Running live prototypes that break → use static + video clip instead

---

## Playbook 2 — Peer Designer / Design Review

### What they care about
- Craft quality (typography, spacing, states, motion)
- Alternatives considered (did you explore? what did you reject?)
- Design-decision rationale
- System-level consistency
- User research grounding

### What they dismiss
- Polish without rationale
- Unjustified deviations from the design system
- Decisions unsupported by user data
- Showing only the final solution

### Structure they respond to
- Process narrative
- Show-and-tell with alternatives
- Before/after across iterations

### Questions they'll ask
1. "Why this pattern instead of X?" → have the alternative ready
2. "What happens in [edge case]?" → bring edge-case states
3. "Did you test it?" → have research signals ready
4. "How does this fit the system?" → map to tokens/components
5. "What's the accessibility story?" → have WCAG references ready

### Winning them
- Share alternatives openly, including weak ones
- Invite critique on specific items (not "any thoughts?")
- Use **Julie Zhuo's critique rules:**
  - Restate the designer's goal first
  - Critique the work, not the person
  - Critique against the stated goal only
  - The designer owns the decision; reviewers give input, not orders

### Failure modes with peers
- Presenting only one option → seems defensive
- Glossing over trade-offs → invites nitpicking
- Resisting feedback → burns future capital

---

## Playbook 3 — Engineering

### What they care about
- Feasibility within current stack
- Edge cases and states (empty, loading, error, success)
- Performance implications
- Accessibility implementation cost
- Handoff quality (specs, tokens, components)

### What they dismiss
- Mocked states that don't consider data reality
- Designs that ignore existing constraints
- Single-path happy-flow designs
- Vague interaction specs ("smooth animation")

### Structure they respond to
- State-rich specs
- Prototype + edge-case catalog
- Spec-backed walkthroughs
- Technical-constraint acknowledgement upfront

### Questions they'll ask
1. "What happens when [data is missing / latency is high / API fails]?"
2. "How is this different from our existing component?"
3. "What's the performance cost of [animation / effect]?"
4. "How are we handling [accessibility case]?"
5. "What's the scope for v1 vs later?"

### Winning them
- Come with edge cases pre-designed
- Acknowledge the current stack's constraints
- Offer clear v1 vs. v2 scope
- Use interactive prototypes (they want to poke)
- Bring a11y spec, not "make it accessible"
- Use their vocabulary (states, props, components, tokens)

### Failure modes with engineering
- Designing only the happy path → triggers trust issues
- Ignoring existing system → signals disrespect
- Vague interactions → invites under-implementation
- No prioritization → they'll set it themselves

---

## Playbook 4 — Product Management

### What they care about
- Metrics movement
- Scope and sequencing
- Trade-offs (what's in, what's out, why)
- Dependencies
- Market / competitive implications

### What they dismiss
- Design work that doesn't tie to a metric
- Unclear scope
- Unquantified trade-offs
- Decisions with no rollback plan

### Structure they respond to
- Theme-based / outcome-oriented
- Before/after metrics
- Phased roadmap tied to the proposal
- RICE or MoSCoW scoring visible

### Questions they'll ask
1. "What metric moves? By how much?"
2. "What's the sequence? What ships first?"
3. "What's out of scope for v1?"
4. "What's the evidence that this works?"
5. "How does this compare to [competitor]?"

### Winning them
- Lead with the metric
- Show the scope explicitly (Now / Next / Future)
- Acknowledge trade-offs ("We chose X over Y because Z")
- Bring competitive benchmarks
- Have a measurement plan ("We'll know it worked if…")

### Failure modes with PMs
- No metric tie-in → "Why are we doing this?"
- Shipping everything at once → unrealistic scoping
- No competitive context → missing strategic frame
- No measurement plan → can't be held accountable

---

## Playbook 5 — Customer / End User

### What they care about
- Benefit to them personally
- Clarity of what changes
- How it affects their existing workflow
- When it's available

### What they dismiss
- Internal org language
- Feature names they don't recognize
- Long explanations of the "why"
- Technical jargon

### Structure they respond to
- Demo (they experience, not hear about)
- Before/after in their context
- Testimonials from people like them
- Simple Q&A, not formal Q&A

### Questions they'll ask
1. "Will this break my current setup?"
2. "Do I have to learn something new?"
3. "When do I get it?"
4. "Does this cost extra?"
5. "What if I don't want to change?"

### Winning them
- Demo first, explain second
- Use their language (extracted from support tickets / interviews)
- Acknowledge change cost ("here's how we'll help you transition")
- Give them a choice where possible ("you can opt in now or wait")
- Over-communicate the "when" — people tolerate change, not uncertainty

### Failure modes with customers
- Corporate-voice messaging → feels cold
- Assumed enthusiasm for change → lands as tone-deaf
- No transition plan → feels abandoned
- Jargon-heavy explanations → feels excluded

---

## Multi-Audience Meetings

When the room has 3+ audience types:

1. **Pick the primary audience and say so out loud.** "I've built this for [audience]; happy to take [other] questions at the end."
2. **Build for the hardest audience**, not the most senior. The hardest audience is typically the skeptical domain expert (engineering lead who's seen this fail before, PM who watched a competitor flop).
3. **Layer the content:** answer-first for the exec primer, process-middle for peers, detail-appendix for engineering.
4. **Bring 3 versions of the ask:** 30 sec, 3 min, 30 min. Pick based on who's in the room.

---

## Pre-Wire Loop (all audiences)

Never surprise a senior person in the room.

**48-72 hours before the meeting:**
1. Map the room (DACI or RACI)
2. 1:1 with the **Decider** first — walk the recommendation, listen, adjust
3. 1:1 with each **Approver** — tailored to their specific concern (finance = cost; eng = feasibility; legal = risk)
4. Handle the **skeptic** last — incorporate their input OR get their objection on record
5. Walk into the meeting with **no unknown dissenters**

The meeting is for *ratification*, not original argument.
