# shadcn/ui Patterns

Correct usage patterns for shadcn/ui components in this project. Reference this when reviewing component implementations.

---

## Component Usage Philosophy

1. **Use shadcn components over primitives** — Don't write `<button>` when `<Button>` exists
2. **Leverage composition** — Most components are built to be composed
3. **Don't override internals** — Style via className, don't recreate
4. **Check the docs** — Each component has specific patterns

---

## Button Patterns

### Basic Usage

```tsx
import { Button } from "@/components/ui/button"

// Variants
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <Plus className="h-4 w-4" />
</Button>
```

### Button Loading State {#button-loading}

```tsx
// REQUIRED PATTERN for async buttons
interface SubmitButtonProps {
  isLoading: boolean
  children: React.ReactNode
}

function SubmitButton({ isLoading, children }: SubmitButtonProps) {
  return (
    <Button disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}

// Usage
<Button disabled={isSubmitting} onClick={handleSubmit}>
  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {isSubmitting ? 'Saving...' : 'Save'}
</Button>
```

### Icon Buttons (Accessibility Required)

```tsx
// ALWAYS add aria-label for icon-only buttons
<Button size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// Or use sr-only text
<Button size="icon">
  <X className="h-4 w-4" />
  <span className="sr-only">Close dialog</span>
</Button>

// With tooltip (preferred for discoverability)
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

### Button as Link

```tsx
// Use asChild to render as different element
import Link from "next/link"

<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>

// NOT this (wrong semantics)
<Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
```

---

## Form Patterns

### Input with Label (Required)

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// ALWAYS pair inputs with labels
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="name@example.com" />
</div>
```

### Input with Error State

```tsx
<div className="space-y-2">
  <Label htmlFor="email" className={error ? 'text-destructive' : ''}>
    Email
  </Label>
  <Input
    id="email"
    type="email"
    aria-invalid={!!error}
    aria-describedby={error ? 'email-error' : undefined}
    className={error ? 'border-destructive' : ''}
  />
  {error && (
    <p id="email-error" className="text-sm text-destructive">
      {error}
    </p>
  )}
</div>
```

### Complete Form Field Pattern

```tsx
interface FormFieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}

function FormField({ id, label, error, hint, required, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={error ? 'text-destructive' : ''}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
```

### Select Component

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<div className="space-y-2">
  <Label htmlFor="status">Status</Label>
  <Select value={status} onValueChange={setStatus}>
    <SelectTrigger id="status">
      <SelectValue placeholder="Select status" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="active">Active</SelectItem>
      <SelectItem value="inactive">Inactive</SelectItem>
      <SelectItem value="pending">Pending</SelectItem>
    </SelectContent>
  </Select>
</div>
```

---

## Dialog Patterns

### Basic Dialog

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      {/* DialogTitle is REQUIRED for accessibility */}
      <DialogTitle>Edit Profile</DialogTitle>
      {/* DialogDescription is REQUIRED for accessibility */}
      <DialogDescription>
        Make changes to your profile here. Click save when done.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {/* Content */}
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Controlled Dialog

```tsx
function EditDialog({ open, onOpenChange }: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>Make changes to the item.</DialogDescription>
        </DialogHeader>
        {/* Content */}
      </DialogContent>
    </Dialog>
  )
}
```

### Alert Dialog (Destructive Actions)

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the item.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

## Table Patterns

### Basic Table

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {items.map((item) => (
      <TableRow key={item.id}>
        <TableCell className="font-medium">{item.name}</TableCell>
        <TableCell>
          <Badge variant={item.active ? 'default' : 'secondary'}>
            {item.active ? 'Active' : 'Inactive'}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="icon" aria-label={`Edit ${item.name}`}>
            <Pencil className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Empty Table State

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {items.length === 0 ? (
      <TableRow>
        <TableCell colSpan={2} className="h-24 text-center">
          <div className="flex flex-col items-center justify-center">
            <Package className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No items found</p>
          </div>
        </TableCell>
      </TableRow>
    ) : (
      items.map((item) => (
        <TableRow key={item.id}>
          {/* ... */}
        </TableRow>
      ))
    )}
  </TableBody>
</Table>
```

---

## Card Patterns

### Basic Card

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Clickable Card

```tsx
// Use proper semantic when card is clickable
<Card
  className="cursor-pointer hover:bg-accent transition-colors"
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  {/* Content */}
</Card>

// Better: Use Link for navigation
<Link href={`/items/${item.id}`} className="block">
  <Card className="hover:bg-accent transition-colors">
    {/* Content */}
  </Card>
</Link>
```

---

## Toast Patterns

```tsx
import { toast } from "sonner"

// Success
toast.success("Item created successfully")

// Error
toast.error("Failed to create item")

// With description
toast.success("Item created", {
  description: "Your item has been added to the list."
})

// With action
toast.error("Failed to save", {
  action: {
    label: "Retry",
    onClick: () => handleRetry(),
  },
})

// Promise-based
toast.promise(saveItem(), {
  loading: 'Saving...',
  success: 'Item saved!',
  error: 'Failed to save item',
})
```

---

## Common Anti-Patterns

### Don't Recreate Components

```tsx
// BAD: Custom button
<button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2">
  Click me
</button>

// GOOD: Use the component
<Button>Click me</Button>
```

### Don't Skip Accessibility

```tsx
// BAD: Missing required parts
<Dialog>
  <DialogContent>
    <h2>Title</h2>  {/* Wrong! Use DialogTitle */}
    Content here
  </DialogContent>
</Dialog>

// GOOD: Proper structure
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    Content here
  </DialogContent>
</Dialog>
```

### Don't Fight the Styling System

```tsx
// BAD: Inline styles overriding design system
<Button style={{ backgroundColor: '#ff0000' }}>Delete</Button>

// GOOD: Use variants
<Button variant="destructive">Delete</Button>

// GOOD: If custom color needed, use className
<Button className="bg-orange-500 hover:bg-orange-600">Custom</Button>
```
