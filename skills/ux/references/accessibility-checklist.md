# Accessibility Checklist

Essential WCAG 2.1 AA compliance for production interfaces.

## Keyboard Navigation

- [ ] All interactive elements reachable via Tab
- [ ] Logical tab order (follows visual flow)
- [ ] Focus indicator visible on all focusable elements
- [ ] Custom focus styles (not just browser default)
- [ ] Skip links for main content on complex pages
- [ ] No keyboard traps (can always Tab out)
- [ ] Modal focus trapping (Tab cycles within modal)
- [ ] Escape closes modals/dropdowns
- [ ] Arrow keys for menu/option navigation
- [ ] Enter/Space activates buttons and links

## Color & Contrast

- [ ] Text contrast ratio ≥ 4.5:1 (normal text)
- [ ] Text contrast ratio ≥ 3:1 (large text, 18px+ or 14px bold)
- [ ] UI component contrast ≥ 3:1 against background
- [ ] Focus indicators have ≥ 3:1 contrast
- [ ] Color is never the ONLY indicator of meaning
- [ ] Error states use icon/text + color, not just red
- [ ] Links distinguishable from body text (underline or 3:1 contrast)

## Text & Typography

- [ ] Base font size ≥ 16px
- [ ] Line height ≥ 1.5 for body text
- [ ] Text resizable up to 200% without breaking layout
- [ ] No text in images (except logos)
- [ ] Language attribute set on HTML element
- [ ] Avoid justified text (uneven spacing)

## Images & Media

- [ ] All images have alt text (or alt="" for decorative)
- [ ] Complex images have extended descriptions
- [ ] Icons with meaning have accessible labels
- [ ] Decorative icons hidden from screen readers (aria-hidden="true")
- [ ] Video has captions
- [ ] Audio has transcript

## Forms

- [ ] All inputs have associated labels (not just placeholder)
- [ ] Labels are visible (not visually hidden unless icon is clear)
- [ ] Required fields marked and announced
- [ ] Error messages linked to inputs (aria-describedby)
- [ ] Error messages are specific and helpful
- [ ] Form validation announced to screen readers
- [ ] Autocomplete attributes for common fields
- [ ] Input type matches expected data (email, tel, etc.)

## Interactive Elements

- [ ] Buttons use `<button>`, not `<div onClick>`
- [ ] Links use `<a>` with href, not `<span onClick>`
- [ ] Custom components have appropriate ARIA roles
- [ ] aria-expanded for collapsible sections
- [ ] aria-selected for tabs/selections
- [ ] aria-live regions for dynamic content
- [ ] Loading states announced (aria-busy or live region)
- [ ] Disabled states use `disabled` attribute or aria-disabled

## Motion & Animation

- [ ] Respect prefers-reduced-motion media query
- [ ] No auto-playing video/audio
- [ ] Animations can be paused
- [ ] No flashing content (< 3 flashes/second)
- [ ] Essential information not conveyed only through motion

## Touch & Mobile

- [ ] Touch targets ≥ 44×44px
- [ ] Adequate spacing between touch targets (≥ 8px)
- [ ] Gestures have alternative controls
- [ ] Pinch-to-zoom not disabled
- [ ] Orientation not locked (unless essential)

## Screen Reader Essentials

```html
<!-- Landmark regions -->
<header role="banner">
<nav role="navigation">
<main role="main">
<footer role="contentinfo">

<!-- Headings hierarchy -->
<h1> (one per page)
  <h2>
    <h3>

<!-- Live regions for dynamic updates -->
<div aria-live="polite">Status updates here</div>
<div aria-live="assertive">Critical alerts here</div>

<!-- Hide decorative elements -->
<span aria-hidden="true">🎉</span>

<!-- Accessible names -->
<button aria-label="Close dialog">×</button>
<input aria-describedby="hint-id">
<span id="hint-id">Password must be 8+ characters</span>
```

## Testing Checklist

1. **Keyboard only** — Unplug mouse, complete all tasks
2. **Screen reader** — Test with VoiceOver (Mac) or NVDA (Windows)
3. **Zoom** — Test at 200% browser zoom
4. **Color blindness** — Use simulator (Stark, Sim Daltonism)
5. **Reduced motion** — Enable in OS settings, verify animations reduce
6. **Contrast checker** — Use WebAIM contrast checker or Figma plugin

## Quick Wins

If limited time, prioritize these high-impact items:
1. Keyboard navigation works for all interactions
2. All form inputs have visible labels
3. Color contrast meets minimums
4. Focus indicators are visible
5. Images have alt text
6. Buttons are `<button>`, links are `<a>`
