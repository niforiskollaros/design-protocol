# UX Patterns

Proven patterns for common UI challenges.

## Component States

Every interactive component needs these states designed:

### Button States
```
Default → Hover → Focus → Active (pressed) → Disabled → Loading
```
- **Loading**: Replace label with spinner, maintain button width, disable interaction
- **Disabled**: Reduce opacity (50-60%), remove hover effects, `cursor: not-allowed`
- **Focus**: Visible ring (not just browser default), works on dark and light backgrounds

### Input States
```
Empty → Focused → Filled → Error → Disabled → Read-only
```
- **Focused**: Border color change + subtle shadow/glow
- **Error**: Red border + error icon + message below (not just red border)
- **Filled**: Subtle distinction from empty (optional, for complex forms)

### Card/Item States
```
Default → Hover → Selected → Dragging → Drop target
```
- **Hover**: Subtle lift (shadow) or background shift
- **Selected**: Checkmark + background color + border (multiple indicators)
- **Dragging**: Reduced opacity on original, cursor change

## Empty States

Never leave users staring at blank space.

**Good empty state includes**:
1. Clear message about why it's empty
2. Visual element (illustration or icon)
3. Primary action to remedy the emptiness
4. Secondary context (optional)

**Examples**:
```
[Illustration of inbox]
No messages yet
When you receive messages, they'll appear here.
[Compose message] ← Primary CTA
```

```
[Search icon]
No results for "quarterly reports"
Try adjusting your search or filters.
[Clear filters] [Browse all]
```

## Loading States

### Skeleton Screens (preferred for content)
- Match layout of expected content
- Animate with subtle shimmer (left to right)
- Transition smoothly to loaded state

### Spinners (for actions)
- Use for button loading states
- Use for discrete operations (save, submit)
- Include timeout/retry for long operations

### Progress Bars (for known duration)
- File uploads, multi-step processes
- Show percentage or steps remaining
- Include cancel option for long operations

### Optimistic UI (for fast actions)
- Show success immediately, reconcile in background
- Have rollback plan for failures
- Example: Toggling a like shows instantly, syncs async

## Error Handling

### Inline Validation
```
[Email input with red border]
✗ Please enter a valid email address
```
- Validate on blur (not on every keystroke)
- Clear error when user starts fixing
- Show success state when corrected ✓

### Error Messages Formula
```
What happened + Why + How to fix
```

**Bad**: "Error 422: Unprocessable entity"
**Good**: "We couldn't save your changes. The file is too large (max 10MB). Try compressing it or choosing a smaller file."

### Error Message Placement
- Form errors: Below the input, not at page top
- System errors: Toast notification or banner
- Critical errors: Full-screen with recovery options

### Error Recovery
- Preserve user input on error (never clear the form)
- Offer one-click retry
- Suggest alternatives when primary path fails

## Feedback & Confirmation

### Toast Notifications
- Position: Top-right or bottom-center
- Auto-dismiss: 3-5 seconds for success, persist for errors
- Include undo action when relevant
- Stack if multiple (limit to 3 visible)

### Success Feedback
- Checkmark animation (200-300ms)
- Brief toast: "Saved" / "Sent" / "Done"
- Don't overdo it — success should feel lightweight

### Destructive Action Confirmation
**Use confirmation dialog when**:
- Action is irreversible
- Data loss would occur
- Significant impact on others

**Avoid confirmation when**:
- Undo is available
- Action is easily recoverable
- Frequent/routine action

**Confirmation dialog pattern**:
```
Delete "Q3 Report"?
This will permanently delete the file and cannot be undone.
[Cancel] [Delete] ← Destructive action in red, on right
```

## Navigation Patterns

### Breadcrumbs
- Use for hierarchical content (> 2 levels deep)
- Current page is last item, not clickable
- Truncate middle items on mobile: Home > ... > Current

### Tabs
- Use for same-level, parallel content
- One tab active at a time
- Content changes, URL optionally changes
- Tab count: 2-7 (more = consider different pattern)

### Command Palette (Cmd+K)
- Search across all actions, pages, items
- Recent/frequent items first
- Keyboard navigable (arrows, enter)
- Show keyboard shortcuts in results

### Back Navigation
- Back button returns to previous view/state
- Preserve scroll position and filters when returning
- Clear navigation history mental model

## Form Patterns

### Single Column Layout
- One column for most forms (fastest to complete)
- Only use multi-column for related short fields (First/Last name)

### Logical Grouping
- Group related fields with subtle visual separator
- Limit groups to 5-7 fields each
- Progressive disclosure for optional/advanced fields

### Smart Defaults
- Pre-fill from context (timezone from location, etc.)
- Remember user preferences
- Select most common option by default

### Required vs Optional
- If most fields required: Mark optional ones "(optional)"
- If most fields optional: Mark required ones with asterisk *
- Never mark both — redundant

### Form Submission
```
[Idle] → [Submitting...] → [Success ✓] or [Error]
```
- Disable submit button while processing
- Show inline errors on validation failure
- Success: Navigate away or show clear confirmation

## Mobile-Specific Patterns

### Bottom Sheet
- Prefer over modals on mobile
- Drag handle at top
- Swipe down to dismiss
- Multiple breakpoints (peek, half, full)

### Pull to Refresh
- Use for feed/list content
- Loading spinner at top
- Release threshold before triggering

### Swipe Actions
- Swipe to reveal actions (delete, archive)
- Show action preview during swipe
- Snap back if not completed

### Thumb Zone
```
┌─────────────────┐
│   Hard to reach │
│                 │
│    Okay reach   │
│                 │
│    Easy reach   │ ← Primary actions here
└─────────────────┘
```
Primary actions (FAB, main nav) in bottom third.
