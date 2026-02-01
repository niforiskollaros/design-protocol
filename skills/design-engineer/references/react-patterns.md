# React 19 Patterns

Best practices and anti-patterns for React 19 in Next.js 16. Reference this when reviewing component implementations.

---

## Component Structure

### Function Components (Standard)

```tsx
// GOOD: Standard function component
interface UserCardProps {
  user: User
  onEdit?: (id: string) => void
}

export function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
    </Card>
  )
}
```

### Props Typing

```tsx
// GOOD: Explicit interface
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
  onClick?: () => void
}

// GOOD: Extending HTML attributes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
}

// GOOD: Using ComponentProps for composition
import { ComponentProps } from 'react'
type ButtonProps = ComponentProps<typeof Button> & {
  customProp?: string
}
```

---

## Lists and Keys

### Always Provide Stable Keys

```tsx
// BAD: Using index as key
{items.map((item, index) => (
  <Item key={index} {...item} />  // Will cause issues with reordering
))}

// BAD: No key
{items.map((item) => (
  <Item {...item} />  // React will warn
))}

// GOOD: Stable unique key
{items.map((item) => (
  <Item key={item.id} {...item} />
))}

// GOOD: Compound key when needed
{items.map((item) => (
  <Item key={`${item.category}-${item.id}`} {...item} />
))}
```

---

## Event Handlers & Callbacks {#callbacks}

### Avoid Inline Functions in Render

```tsx
// BAD: Creates new function every render
<Button onClick={() => handleDelete(item.id)}>Delete</Button>

// GOOD: useCallback for stable reference
const handleItemDelete = useCallback((id: string) => {
  deleteItem(id)
}, [deleteItem])

// Then in render
<Button onClick={() => handleItemDelete(item.id)}>Delete</Button>

// BETTER: Pass data via data attributes
const handleDelete = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
  const id = e.currentTarget.dataset.itemId
  if (id) deleteItem(id)
}, [deleteItem])

<Button data-item-id={item.id} onClick={handleDelete}>Delete</Button>
```

### Event Handler Typing

```tsx
// GOOD: Properly typed handlers
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value)
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  // submit logic
}

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    submit()
  }
}
```

---

## State Management

### Derived State

```tsx
// BAD: Duplicating state
const [items, setItems] = useState<Item[]>([])
const [filteredItems, setFilteredItems] = useState<Item[]>([])  // Derived!
const [itemCount, setItemCount] = useState(0)  // Derived!

useEffect(() => {
  setFilteredItems(items.filter(i => i.active))
  setItemCount(items.length)
}, [items])

// GOOD: Derive values directly
const [items, setItems] = useState<Item[]>([])
const filteredItems = items.filter(i => i.active)  // Computed
const itemCount = items.length  // Computed

// GOOD: useMemo for expensive derivations
const filteredItems = useMemo(
  () => items.filter(i => expensiveCheck(i)),
  [items]
)
```

### State Initialization

```tsx
// BAD: Expensive computation on every render
const [data, setData] = useState(expensiveComputation())

// GOOD: Lazy initialization
const [data, setData] = useState(() => expensiveComputation())
```

### State Updates

```tsx
// BAD: State based on previous without using callback
const increment = () => {
  setCount(count + 1)  // Might be stale
}

// GOOD: Functional update for state based on previous
const increment = () => {
  setCount(prev => prev + 1)
}

// BAD: Multiple related state updates
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [email, setEmail] = useState('')

// GOOD: Group related state
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
})
```

---

## useEffect Patterns

### Dependency Arrays

```tsx
// BAD: Missing dependencies
useEffect(() => {
  fetchUser(userId)  // userId should be in deps
}, [])

// BAD: Object/array in deps (new reference each render)
useEffect(() => {
  doSomething(options)
}, [options])  // If options = { foo: 'bar' } in render, runs every time

// GOOD: Stable primitive dependencies
useEffect(() => {
  fetchUser(userId)
}, [userId])

// GOOD: Memoize objects if needed in deps
const options = useMemo(() => ({ foo: 'bar' }), [])
useEffect(() => {
  doSomething(options)
}, [options])
```

### Cleanup

```tsx
// BAD: No cleanup for subscriptions
useEffect(() => {
  const subscription = subscribe(channel)
  // Memory leak! No cleanup
}, [channel])

// GOOD: Proper cleanup
useEffect(() => {
  const subscription = subscribe(channel)
  return () => {
    subscription.unsubscribe()
  }
}, [channel])

// GOOD: Abort controller for fetch
useEffect(() => {
  const controller = new AbortController()

  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') {
        setError(err)
      }
    })

  return () => controller.abort()
}, [url])
```

### Avoid useEffect for Derived Data

```tsx
// BAD: useEffect for transformation
const [items, setItems] = useState<Item[]>([])
const [sortedItems, setSortedItems] = useState<Item[]>([])

useEffect(() => {
  setSortedItems([...items].sort((a, b) => a.name.localeCompare(b.name)))
}, [items])

// GOOD: Compute directly or useMemo
const sortedItems = useMemo(
  () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
  [items]
)
```

---

## Performance Optimization

### When to Use useMemo

```tsx
// DON'T: Simple operations
const fullName = useMemo(() => `${first} ${last}`, [first, last])  // Overkill

// DO: Expensive computations
const sortedData = useMemo(
  () => data.sort((a, b) => complexComparison(a, b)),
  [data]
)

// DO: Reference stability for child components
const chartOptions = useMemo(
  () => ({ responsive: true, scales: { ... } }),
  []
)
```

### When to Use useCallback

```tsx
// DON'T: Handlers that don't get passed down
const handleClick = useCallback(() => {
  doSomething()
}, [])
// If handleClick isn't passed to memoized children, useCallback is pointless

// DO: Handlers passed to memoized children
const handleDelete = useCallback((id: string) => {
  deleteItem(id)
}, [deleteItem])

<MemoizedList onDelete={handleDelete} />

// DO: Handlers in dependency arrays
const handleFetch = useCallback(() => {
  fetch(url)
}, [url])

useEffect(() => {
  handleFetch()
}, [handleFetch])
```

### React.memo

```tsx
// Use for components that:
// 1. Render often
// 2. Receive the same props usually
// 3. Are expensive to render

const ExpensiveList = memo(function ExpensiveList({ items }: Props) {
  return (
    <ul>
      {items.map(item => (
        <ExpensiveItem key={item.id} {...item} />
      ))}
    </ul>
  )
})
```

---

## React 19 Specific Patterns

### use() Hook

```tsx
// React 19: use() for promises in render
import { use } from 'react'

function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise)  // Suspends until resolved
  return <div>{user.name}</div>
}
```

### Actions (Server Actions in Next.js)

```tsx
// Form with Server Action
async function createItem(formData: FormData) {
  'use server'
  const name = formData.get('name')
  // Create item...
}

function CreateForm() {
  return (
    <form action={createItem}>
      <Input name="name" />
      <Button type="submit">Create</Button>
    </form>
  )
}
```

### useActionState (React 19)

```tsx
import { useActionState } from 'react'

function Form() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const result = await submitForm(formData)
      return result
    },
    null
  )

  return (
    <form action={formAction}>
      <Input name="email" />
      <Button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
      {state?.error && <p className="text-destructive">{state.error}</p>}
    </form>
  )
}
```

### useOptimistic (React 19)

```tsx
import { useOptimistic } from 'react'

function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  )

  async function addTodo(formData: FormData) {
    const newTodo = { id: crypto.randomUUID(), text: formData.get('text') }
    addOptimisticTodo(newTodo)  // Immediately show
    await createTodo(formData)   // Actually create
  }

  return (
    <form action={addTodo}>
      {/* ... */}
    </form>
  )
}
```

---

## Common Anti-Patterns

### Prop Drilling

```tsx
// BAD: Passing props through many layers
<App user={user} />
  <Layout user={user} />
    <Sidebar user={user} />
      <UserMenu user={user} />

// GOOD: Context for widely-used data
const UserContext = createContext<User | null>(null)

function App() {
  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  )
}

function UserMenu() {
  const user = useContext(UserContext)
  // ...
}
```

### Unnecessary State

```tsx
// BAD: State for URL params (Next.js handles this)
const [searchQuery, setSearchQuery] = useState(
  searchParams.get('q') || ''
)

// GOOD: Use URL directly
const searchQuery = searchParams.get('q') || ''
```

### Conditional Hooks

```tsx
// BAD: Hooks called conditionally
if (isLoggedIn) {
  const user = useUser()  // BREAKS RULES OF HOOKS
}

// GOOD: Always call, handle null
const user = useUser()  // Always called
if (!isLoggedIn || !user) return <Login />
```

---

## Testing Considerations

### Testable Component Structure

```tsx
// GOOD: Logic separated from UI
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)
  const increment = useCallback(() => setCount(c => c + 1), [])
  const decrement = useCallback(() => setCount(c => c - 1), [])
  return { count, increment, decrement }
}

function Counter() {
  const { count, increment, decrement } = useCounter()
  return (
    <div>
      <Button onClick={decrement}>-</Button>
      <span>{count}</span>
      <Button onClick={increment}>+</Button>
    </div>
  )
}

// Hook can be tested separately from component
```
