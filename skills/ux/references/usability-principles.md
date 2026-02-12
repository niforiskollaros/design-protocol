# Usability Principles

## Nielsen's 10 Heuristics (with Modern Interpretations)

### 1. Visibility of System Status
**Classic**: Keep users informed about what's going on through appropriate feedback within reasonable time.

**Modern application**:
- Skeleton screens during loading (not spinners for content)
- Progress indicators for multi-step processes
- Real-time sync status (saved, saving, offline)
- Subtle toast notifications for background operations
- Network/connection status indicators

**Examples**: Linear shows "Saving..." → "Saved" transitions. Figma shows multiplayer cursors and selection states.

### 2. Match Between System and Real World
**Classic**: Use words, phrases, and concepts familiar to the user, not system-oriented jargon.

**Modern application**:
- Domain-specific language matching user's mental model
- Metaphors that make sense (folder, trash, archive)
- Date/time in user's locale and relative terms ("2 hours ago")
- Currency and number formatting per locale
- Avoid technical errors ("Error 500") — translate to human impact

### 3. User Control and Freedom
**Classic**: Provide a clearly marked "emergency exit" to leave unwanted states.

**Modern application**:
- Undo everywhere (Cmd+Z should work)
- Non-destructive operations by default (soft delete, archive)
- Easy escape from modals (click outside, Escape key)
- Clear back/cancel paths in flows
- Bulk undo for batch operations
- Draft auto-save so users never lose work

**Examples**: Gmail's "Undo Send", Notion's version history, Linear's Cmd+Z for almost everything.

### 4. Consistency and Standards
**Classic**: Follow platform conventions — users shouldn't wonder if different words/actions mean the same thing.

**Modern application**:
- Platform-native keyboard shortcuts (Cmd on Mac, Ctrl on Windows)
- Standard icon meanings (gear = settings, X = close)
- Consistent terminology throughout the app
- Design tokens for spacing, colors, typography
- Component behavior consistency (all dropdowns work the same)

### 5. Error Prevention
**Classic**: Eliminate error-prone conditions or present users with a confirmation option.

**Modern application**:
- Disable invalid actions, don't just error afterward
- Smart defaults that minimize required input
- Inline validation as users type
- Format hints and input masks for structured data
- Confirmation only for truly destructive/irreversible actions
- Autosuggest to prevent typos

**Examples**: Stripe's inline card validation, Linear's smart date parsing.

### 6. Recognition Rather Than Recall
**Classic**: Minimize memory load by making objects, actions, and options visible.

**Modern application**:
- Command palette with searchable actions (Cmd+K)
- Recent items and frequently used at the top
- Contextual actions in right-click menus
- Autocomplete with recent/suggested options
- Visual affordances for draggable/interactive elements
- Breadcrumbs for deep navigation

### 7. Flexibility and Efficiency of Use
**Classic**: Accelerators — unseen by novices — speed up interaction for experts.

**Modern application**:
- Keyboard shortcuts for power users
- Command palette (Cmd+K) for everything
- Bulk operations and multi-select
- Quick actions and hover menus
- Customizable workflows and views
- API/integrations for automation

**Examples**: Notion's slash commands, Linear's keyboard-first design, Figma's plugins.

### 8. Aesthetic and Minimalist Design
**Classic**: Don't include information that is irrelevant or rarely needed.

**Modern application**:
- Progressive disclosure — show advanced options on demand
- Information hierarchy — most important content is most prominent
- Whitespace as a design element, not wasted space
- Reduce visual noise — every element should earn its place
- Contextual UI that adapts to current task

### 9. Help Users Recognize, Diagnose, and Recover from Errors
**Classic**: Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution.

**Modern application**:
- Error format: What happened → Why → How to fix
- Inline errors next to the field, not at page top
- Suggested fixes and one-click resolution when possible
- Link to help docs for complex errors
- Never show stack traces or error codes alone

**Example**: "This email is already registered. [Log in instead] or [Reset password]"

### 10. Help and Documentation
**Classic**: Provide help and documentation that is easy to search and focused on user tasks.

**Modern application**:
- Contextual help (? icons, tooltips) over manual hunting
- Searchable help within the app
- Interactive tutorials and onboarding
- Empty states as teaching moments
- Keyboard shortcut cheat sheets (Cmd+/)

## Additional Modern Principles

### Performance is a Feature
- First contentful paint < 1.5s
- Time to interactive < 3s
- Perceived performance through optimistic UI
- Skeleton screens and progressive loading
- Offline-capable when relevant

### Mobile is Not Desktop Shrunk Down
- Touch targets 44×44px minimum
- Thumb-zone optimized primary actions
- Swipe gestures for common actions
- Pull-to-refresh where expected
- Bottom sheets over modals on mobile

### Accessibility is Not Optional
- Keyboard navigable
- Screen reader compatible
- Sufficient color contrast
- Focus indicators visible
- Motion-reduced alternatives
