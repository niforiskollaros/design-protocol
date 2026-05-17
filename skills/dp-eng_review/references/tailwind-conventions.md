# Tailwind Conventions

Project-specific Tailwind CSS standards and patterns. Reference this when reviewing styling consistency.

---

## Spacing System {#spacing}

Always use the Tailwind spacing scale. Never use arbitrary values unless absolutely necessary.

### Spacing Scale Reference

| Class | Value | Use Case |
|-------|-------|----------|
| `*-0` | 0px | Reset |
| `*-0.5` | 2px | Micro spacing |
| `*-1` | 4px | Tight spacing |
| `*-2` | 8px | Small gaps |
| `*-3` | 12px | Default gap |
| `*-4` | 16px | Section spacing |
| `*-6` | 24px | Large gaps |
| `*-8` | 32px | Section breaks |
| `*-12` | 48px | Major sections |
| `*-16` | 64px | Page sections |

### Spacing Anti-Patterns

```tsx
// BAD: Arbitrary values
<div className="mt-[13px] p-[7px] gap-[11px]">

// GOOD: Use scale
<div className="mt-3 p-2 gap-3">

// BAD: Inconsistent spacing
<div className="p-4">
  <div className="p-3">  {/* Different from parent */}
    <div className="p-5"> {/* Different again */}

// GOOD: Consistent rhythm
<div className="p-6">
  <div className="p-4">
    <div className="p-4">
```

### When Arbitrary Values Are OK

```tsx
// OK: Matching specific design specs or logos
<div className="w-[120px]">  {/* Logo container with exact size */}

// OK: Complex calculations
<div className="h-[calc(100vh-64px)]">  {/* Full height minus header */}

// OK: Unusual aspect ratios
<div className="aspect-[16/9]">
```

---

## Color Usage

### Use Design Tokens

```tsx
// BAD: Raw color values
<div className="bg-slate-100 text-gray-900 border-gray-200">
<div className="text-[#1a1a1a] bg-[#f5f5f5]">

// GOOD: Design tokens (from shadcn/ui)
<div className="bg-background text-foreground border-border">
<div className="bg-muted text-muted-foreground">
<div className="bg-card text-card-foreground">
<div className="bg-primary text-primary-foreground">
<div className="bg-secondary text-secondary-foreground">
<div className="bg-accent text-accent-foreground">
<div className="bg-destructive text-destructive-foreground">
```

### Semantic Color Usage

| Token | Use For |
|-------|---------|
| `background/foreground` | Main page background and text |
| `card/card-foreground` | Elevated surfaces |
| `muted/muted-foreground` | Subdued backgrounds and secondary text |
| `primary/primary-foreground` | Primary actions, links |
| `secondary/secondary-foreground` | Secondary actions |
| `accent/accent-foreground` | Highlights, hover states |
| `destructive/destructive-foreground` | Delete, error states |
| `border` | All borders |
| `input` | Form input borders |
| `ring` | Focus rings |

### Status Colors

```tsx
// Define consistent status colors
// Success
<Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
  Active
</Badge>

// Warning
<Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
  Pending
</Badge>

// Error (use destructive)
<Badge variant="destructive">Failed</Badge>

// Info
<Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
  In Progress
</Badge>
```

---

## Typography

### Heading Hierarchy

```tsx
// Page title
<h1 className="text-3xl font-bold tracking-tight">Page Title</h1>

// Section title
<h2 className="text-2xl font-semibold tracking-tight">Section</h2>

// Subsection
<h3 className="text-xl font-semibold">Subsection</h3>

// Card/component title
<h4 className="text-lg font-medium">Card Title</h4>

// Small heading
<h5 className="text-base font-medium">Small Heading</h5>
```

### Text Sizes

```tsx
// Body text (default)
<p className="text-sm">Standard body text</p>

// Large body
<p className="text-base">Larger body text</p>

// Small/caption
<p className="text-xs text-muted-foreground">Caption or hint text</p>

// Lead paragraph
<p className="text-lg text-muted-foreground">Introductory text</p>
```

### Text Utilities

```tsx
// Truncation
<p className="truncate">Long text that will be truncated...</p>
<p className="line-clamp-2">Text limited to 2 lines...</p>

// Alignment
<p className="text-left">Left (default)</p>
<p className="text-center">Center</p>
<p className="text-right">Right</p>

// Font weight
<span className="font-normal">Normal (400)</span>
<span className="font-medium">Medium (500)</span>
<span className="font-semibold">Semibold (600)</span>
<span className="font-bold">Bold (700)</span>
```

---

## Layout Patterns

### Flexbox

```tsx
// Horizontal center
<div className="flex items-center justify-center">

// Space between
<div className="flex items-center justify-between">

// Stack with gap
<div className="flex flex-col gap-4">

// Row with gap
<div className="flex items-center gap-2">
```

### Grid

```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Dashboard layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Common Layouts

```tsx
// Page container
<div className="container mx-auto px-4 py-8">

// Centered content with max width
<div className="mx-auto max-w-2xl">

// Full-height page
<div className="min-h-screen">

// Sticky header
<header className="sticky top-0 z-50 bg-background/95 backdrop-blur">
```

---

## Responsive Design

### Breakpoint Usage

| Breakpoint | Min Width | Use For |
|------------|-----------|---------|
| (default) | 0px | Mobile first |
| `sm:` | 640px | Large phones |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large screens |

### Responsive Patterns

```tsx
// Mobile-first approach
<div className="p-4 md:p-6 lg:p-8">

// Hide/show
<div className="hidden md:block">Desktop only</div>
<div className="md:hidden">Mobile only</div>

// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
```

---

## Interactive States

### Required Focus States

```tsx
// ALWAYS include focus-visible for interactive elements
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">

// shadcn components have this built in - don't remove it!
```

### Hover States

```tsx
// Subtle background change
<div className="hover:bg-accent transition-colors">

// Button hover (built into variants)
<Button>Has hover built in</Button>

// Custom hover
<div className="hover:bg-muted/50 transition-colors cursor-pointer">
```

### Transitions

```tsx
// Standard transition
<div className="transition-colors">  {/* Color changes */}
<div className="transition-opacity">  {/* Opacity changes */}
<div className="transition-all">  {/* Everything (use sparingly) */}

// Duration
<div className="transition-colors duration-150">  {/* Faster */}
<div className="transition-colors duration-300">  {/* Slower */}
```

---

## Common Anti-Patterns

### Conflicting Classes

```tsx
// BAD: Conflicting classes
<div className="p-4 p-6">  {/* Which one applies? */}
<div className="text-red-500 text-blue-500">  {/* Unpredictable */}

// BAD: Overriding base with arbitrary
<div className="mt-4 mt-[20px]">  {/* Confusing */}
```

### Unnecessary Complexity

```tsx
// BAD: Over-specified
<div className="flex flex-row items-stretch justify-start">
// flex-row is default, items-stretch is default, justify-start is default

// GOOD: Only what's needed
<div className="flex">
```

### Magic Numbers

```tsx
// BAD: Arbitrary values everywhere
<div className="w-[342px] h-[87px] mt-[13px] rounded-[7px]">

// GOOD: Use scale and standard values
<div className="w-80 h-20 mt-3 rounded-lg">
```

---

## Dark Mode

### Using Dark Mode Classes

```tsx
// Explicit dark mode styles
<div className="bg-white dark:bg-slate-900">
<p className="text-gray-900 dark:text-gray-100">

// BETTER: Use design tokens (automatic dark mode)
<div className="bg-background">  {/* Automatically handles dark mode */}
<p className="text-foreground">  {/* Automatically handles dark mode */}
```

### Dark Mode Testing Checklist

- [ ] All text is readable in both modes
- [ ] Borders are visible in both modes
- [ ] Status colors work in both modes
- [ ] Images/icons work in both modes
- [ ] Focus states visible in both modes
