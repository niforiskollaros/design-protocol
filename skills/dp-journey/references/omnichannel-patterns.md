# Omnichannel Patterns — Deep Reference

Extended reference for omnichannel journey mapping. Based on NNGroup's 5-component framework (Kim Flaherty), Kim Salazar's touchpoint model, and common cross-channel patterns.

---

## The 5 Components (Verbatim Definitions — NNGroup, Kim Flaherty)

### 1. Consistent
*"Providing a consistent, cohesive, and familiar experience across all channels."*

**4 consistency dimensions:**
- **Visual** — brand, typography, color, layout language
- **Functional** — core capabilities work the same way
- **Content / Voice** — tone, terminology, information hierarchy
- **Data / State** — account, cart, preferences are the same everywhere

**Benefits (NNGroup):**
- Familiarity & confidence — sets expectations
- Learnability — prior channel experience transfers
- Efficiency — users complete tasks faster
- Trust — builds credibility

### 2. Optimized (for context)
*"Creating individual channel experiences that are best suited for that particular device, channel constraints, and contexts of use."*

**Context variables:**
- Device (screen size, input modality)
- Session length (seconds to hours)
- Attention available (full / fragmented / passive)
- Environmental constraints (hands-free, one-handed, ambient noise)
- Permission/privacy context (public space vs. private)

**Principle:** *Consistent what, contextual how.* Keep brand/data/core capability consistent; let UI/interaction/detail adapt to channel.

### 3. Seamless
*"Making channel transitions as effortless as possible and helping customers pick up where they left off when they switch from one channel to another during a task."*

**Seamlessness requirements:**
- Persist state across channels (cart, form data, progress)
- Carry context forward (identity, intent, last action)
- Minimize re-authentication, re-typing, re-explaining
- Provide a visible "continue where you left off" affordance

### 4. Orchestrated
*"Proactively leading customers through their individual journeys with the right personalized interactions and messages at the right time."*

**Orchestration maturity levels:**
- **Reactive** — respond after user acts (send receipt after purchase)
- **Scheduled** — planned sequence (onboarding email drip)
- **Behavioral** — triggered by user signals (cart abandonment email)
- **Predictive** — engine decides next-best-action based on state + history + context

### 5. Collaborative
*"Enriching the customer journey by allowing customers to take advantage of multiple channels at the same time to improve the overall user experience."*

**Examples:**
- Second-screen (TV + mobile companion)
- Agent phone call + screen-share on web
- In-store app scanner while physically browsing
- QR code handoff from print to mobile
- Voice assistant + screen display

---

## Touchpoint Inventory — How to Build

Per Kim Salazar: **Touchpoint = Channel × Device × Task.**

### Step 1 — Enumerate channels
List every way the actor can interact with the organization:
- Web (marketing site, app, logged-in product)
- Mobile app (iOS, Android)
- Email
- SMS
- Push notification
- Phone (inbound, outbound)
- In-person (store, branch, event)
- Chat (live, chatbot, WhatsApp)
- Social (DMs, comments)
- Print (mail, receipt, signage)
- Kiosk / POS / self-service
- Voice assistant

### Step 2 — Enumerate devices
For each channel, which devices support it?

### Step 3 — Enumerate tasks per phase
For each journey phase, what tasks might the actor attempt?

### Step 4 — Create the inventory grid

| Phase | Channel | Device | Task | Actor goal | Frequency |
|---|---|---|---|---|---|
| Discover | Web | Desktop | Browse product pages | Evaluate fit | High |
| Discover | Mobile app | Phone | Tap ad | Investigate | High |
| Purchase | Web | Desktop | Enter payment | Complete checkout | High |
| Purchase | Mobile | Phone | Apple Pay | Complete checkout | Medium |
| Support | Phone | Phone | Call agent | Resolve issue | Low |
| Support | Chat | Desktop | Live chat | Resolve issue | Medium |

### Step 5 — Identify gaps
- Channels the actor uses that the org doesn't support
- Tasks that only work on one channel but should work on more
- Handoffs that break context

---

## Channel Transition Patterns

### Pattern A — Research-to-purchase handoff
User researches on desktop, purchases on mobile, or vice versa.

**Required context persistence:**
- Cart contents
- Account identity
- Viewed items / comparisons
- Discount codes / referral source

**Common failures:**
- Cart empties on channel switch
- Comparison lists don't sync
- Must re-login

### Pattern B — Digital-to-physical handoff (BOPIS: buy online, pickup in store)
User buys online, picks up in physical location.

**Required context persistence:**
- Order ID + contents
- Identity verification
- Ready-for-pickup notification
- Substitution consent (if item unavailable)

**Common failures:**
- Store employee sees nothing in system
- Customer has to show email on phone (re-prove order)
- Substitution not communicated

### Pattern C — Self-service-to-human handoff
User tries bot/FAQ, escalates to agent.

**Required context persistence:**
- Conversation history with bot
- Customer identity
- Issue category already identified
- Steps already attempted

**Common failures:**
- Agent has no chat transcript
- Customer must re-describe problem from zero
- Identity re-verification required

### Pattern D — Outbound-to-inbound (email/SMS → web)
Marketing or service message triggers user to visit web.

**Required context persistence:**
- Campaign source
- Offer ID (if promotional)
- Personalization context
- Deep link to relevant destination

**Common failures:**
- Link goes to homepage, not offer
- Offer not applied automatically
- Must re-authenticate when message implied authenticated state

### Pattern E — Synchronous multichannel (agent + customer on same screen)
Agent on phone, customer on web, both navigating together.

**Required real-time sync:**
- Shared cursor / co-browse
- Form field sync
- Mutual viewing of artifacts
- Agent access to customer's session state

**Common failures:**
- Agent can't see what customer sees
- Screen-share tools require customer install
- Privacy concerns around session visibility

---

## Anti-Patterns

1. **Channel parity** — replicating the desktop UI on mobile instead of optimizing for mobile's context
2. **Siloed ownership** — each channel owned by a separate team with separate KPIs
3. **Data-state divergence** — account balance different on web vs. app vs. branch
4. **Marketing-only omnichannel** — "omnichannel" that's really just "consistent branding across ads"
5. **Invasive orchestration** — proactive messaging that feels creepy, not helpful
6. **Forced channel switching** — channel A can't complete the task, user must switch to B
7. **Happy-path-only design** — channel transitions designed only for success, not recovery
8. **No identity continuity** — same user treated as stranger when they switch channels

---

## Maturity Self-Assessment

Use this to label the current experience state in the output:

| Tier | Signal |
|---|---|
| **Single-channel** | Only one channel exists |
| **Multichannel** | Multiple channels, each siloed, no shared state or transitions designed |
| **Cross-channel** | Channels are coordinated (deep links, email → web session) but not fully unified |
| **Omnichannel** | Unified customer identity, shared state, designed transitions, channel-appropriate UI |
| **Orchestrated Omnichannel** | All of the above + proactive, personalized next-best-action across channels |

Most organizations believe they are omnichannel and actually operate at the multichannel or cross-channel tier. Stating this honestly in the map is a feature, not a flaw.
