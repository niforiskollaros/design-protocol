# Code Review Checklist

Complete audit criteria for design engineer reviews. Use this as your reference when reviewing components.

---

## Accessibility Audit (WCAG 2.1 AA)

### Critical Issues — Always Flag

#### 1. Missing Alternative Text (WCAG 1.1.1)

```tsx
// BAD: No alt text
<Image src="/logo.png" width={100} height={50} />
<img src="/icon.svg" />

// GOOD: Descriptive alt
<Image src="/logo.png" width={100} height={50} alt="Shiplex logo" />
<img src="/icon.svg" alt="" /> {/* Empty alt for decorative images */}

// GOOD: Decorative images hidden from AT
<Image src="/decorative.png" alt="" aria-hidden="true" />
```

#### 2. Icon-Only Buttons (WCAG 4.1.2)

```tsx
// BAD: No accessible name
<Button size="icon">
  <Trash2 className="h-4 w-4" />
</Button>

// GOOD: aria-label
<Button size="icon" aria-label="Delete item">
  <Trash2 className="h-4 w-4" />
</Button>

// GOOD: sr-only text
<Button size="icon">
  <Trash2 className="h-4 w-4" />
  <span className="sr-only">Delete item</span>
</Button>

// GOOD: Tooltip with accessible name
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button size="icon" aria-label="Delete item">
        <Trash2 className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>Delete item</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

#### 3. Form Inputs Without Labels (WCAG 1.3.1)

```tsx
// BAD: Placeholder is not a label
<Input placeholder="Enter email" />

// BAD: Label not associated
<p>Email</p>
<Input />

// GOOD: Proper label association
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>

// GOOD: aria-label for icon inputs
<Input aria-label="Search vessels" type="search" />

// GOOD: Visually hidden label
<Label htmlFor="search" className="sr-only">Search</Label>
<Input id="search" type="search" placeholder="Search..." />
```

#### 4. Non-Semantic Click Handlers (WCAG 2.1.1)

```tsx
// BAD: div as button
<div onClick={handleClick}>Click me</div>

// BAD: span as link
<span onClick={() => navigate('/home')}>Go home</span>

// GOOD: Use proper elements
<button onClick={handleClick}>Click me</button>
<Button onClick={handleClick}>Click me</Button>

// GOOD: If you must use div, add full semantics
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Click me
</div>
```

#### 5. Missing Keyboard Support (WCAG 2.1.1)

```tsx
// BAD: Mouse-only interaction
<div onClick={selectItem}>Item</div>

// GOOD: Full keyboard support
<div
  role="option"
  tabIndex={0}
  onClick={selectItem}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      selectItem()
    }
  }}
  aria-selected={isSelected}
>
  Item
</div>

// BEST: Use existing accessible components
<CommandItem onSelect={selectItem}>Item</CommandItem>
```

---

### Serious Issues — Flag for Quality

#### 6. Focus Outline Removed (WCAG 2.4.7)

```tsx
// BAD: Focus removed with no replacement
<button className="outline-none">Click</button>
<input className="focus:outline-none" />

// GOOD: Custom focus indicator
<button className="outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  Click
</button>

// GOOD: shadcn default (already has focus styles)
<Button>Click</Button>
<Input /> {/* Has built-in focus ring */}
```

#### 7. Color-Only Information (WCAG 1.4.1)

```tsx
// BAD: Status only indicated by color
<span className={status === 'error' ? 'text-red-500' : 'text-green-500'}>
  {status}
</span>

// GOOD: Color + icon
<span className={status === 'error' ? 'text-red-500' : 'text-green-500'}>
  {status === 'error' ? <AlertCircle className="inline mr-1" /> : <CheckCircle className="inline mr-1" />}
  {status}
</span>

// GOOD: Color + text explanation
<Badge variant={status === 'error' ? 'destructive' : 'success'}>
  {status === 'error' ? 'Failed' : 'Completed'}
</Badge>
```

#### 8. Small Touch Targets (WCAG 2.5.5)

```tsx
// BAD: Too small (< 44x44px)
<button className="p-1 h-6 w-6">
  <X className="h-4 w-4" />
</button>

// GOOD: Adequate touch target
<button className="p-2 h-11 w-11 min-h-[44px] min-w-[44px]">
  <X className="h-4 w-4" />
</button>

// GOOD: Use size="icon" which is properly sized
<Button size="icon"> {/* 40x40px by default */}
  <X className="h-4 w-4" />
</Button>
```

#### 9. Missing Error Association (WCAG 1.3.1)

```tsx
// BAD: Error not linked to input
<Input id="email" />
{error && <p className="text-red-500">{error}</p>}

// GOOD: Error linked via aria-describedby
<Input
  id="email"
  aria-invalid={!!error}
  aria-describedby={error ? "email-error" : undefined}
/>
{error && (
  <p id="email-error" className="text-sm text-destructive">
    {error}
  </p>
)}
```

---

### Moderate Issues — Note for Polish

#### 10. Heading Hierarchy (WCAG 1.3.1)

```tsx
// BAD: Skipped levels
<h1>Page Title</h1>
<h3>Section Title</h3> {/* Skipped h2 */}

// GOOD: Proper hierarchy
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>
```

#### 11. Positive tabIndex (WCAG 2.4.3)

```tsx
// BAD: Disrupts natural tab order
<button tabIndex={1}>First</button>
<button tabIndex={2}>Second</button>

// GOOD: Natural order or 0/-1
<button>First</button> {/* Natural order */}
<button tabIndex={0}>Focusable</button>
<div tabIndex={-1}>Programmatically focusable only</div>
```

#### 12. Missing Live Regions (WCAG 4.1.3)

```tsx
// BAD: Toast appears without announcement
{showToast && <div>Item saved!</div>}

// GOOD: Announce to screen readers
<div aria-live="polite" aria-atomic="true">
  {showToast && <span>Item saved!</span>}
</div>

// BEST: Use toast component (already handles this)
import { toast } from 'sonner'
toast.success('Item saved!')
```

---

## Component Quality Checklist

### State Coverage

For every interactive component, verify these states exist:

```tsx
// Button states example
<Button>Default</Button>
<Button disabled>Disabled</Button>
<Button className="hover:bg-primary/90">Hover (usually via Tailwind)</Button>
<Button className="focus-visible:ring-2">Focus (usually via Tailwind)</Button>
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading
</Button>
```

### Form State Checklist

```tsx
// Complete form input
<div className="space-y-2">
  <Label htmlFor="name" className={error ? 'text-destructive' : ''}>
    Name <span className="text-destructive">*</span>
  </Label>
  <Input
    id="name"
    value={value}
    onChange={onChange}
    disabled={isLoading}
    aria-invalid={!!error}
    aria-describedby={error ? 'name-error' : 'name-hint'}
    aria-required="true"
  />
  {error ? (
    <p id="name-error" className="text-sm text-destructive">{error}</p>
  ) : (
    <p id="name-hint" className="text-sm text-muted-foreground">
      Enter your full name
    </p>
  )}
</div>
```

### Empty States

```tsx
// BAD: No empty state
{items.map(item => <Item key={item.id} {...item} />)}

// GOOD: Empty state handled
{items.length === 0 ? (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <Package className="h-12 w-12 text-muted-foreground mb-4" />
    <h3 className="text-lg font-medium">No items yet</h3>
    <p className="text-sm text-muted-foreground mt-1">
      Get started by adding your first item
    </p>
    <Button className="mt-4">Add Item</Button>
  </div>
) : (
  items.map(item => <Item key={item.id} {...item} />)
)}
```

---

## TypeScript Quality

### Props Typing

```tsx
// BAD: Missing types
function UserCard({ user, onEdit }) {
  return <div>{user.name}</div>
}

// GOOD: Properly typed
interface UserCardProps {
  user: User
  onEdit: (id: string) => void
  className?: string
}

function UserCard({ user, onEdit, className }: UserCardProps) {
  return <div className={className}>{user.name}</div>
}
```

### Avoid `any`

```tsx
// BAD
const handleChange = (e: any) => setValue(e.target.value)
const data: any = await fetchData()

// GOOD
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
const data: ApiResponse = await fetchData()
```

---

## Testing Procedures

When reviewing, mentally test:

1. **Keyboard Navigation**
   - Can all interactive elements be reached with Tab?
   - Can they be activated with Enter/Space?
   - Is there a visible focus indicator?

2. **Screen Reader**
   - Do images have alt text?
   - Are form fields labeled?
   - Is dynamic content announced?

3. **State Coverage**
   - What happens when it's loading?
   - What happens on error?
   - What happens when empty?

4. **Responsive**
   - Does it work at 320px width?
   - Are touch targets big enough on mobile?
