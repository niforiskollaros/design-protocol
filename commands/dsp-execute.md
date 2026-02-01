---
name: dsp-execute
description: Generate working implementation from DSP phase outputs. After UX phase creates interactive wireframe; after UI phase creates polished React + Tailwind + shadcn components.
---

# /dsp:execute — Generate Implementation

You are generating a working implementation from DSP workflow outputs. This command auto-detects the current phase and generates appropriate code.

## Execution Modes

| Current State | Mode | Output |
|---------------|------|--------|
| UX complete, UI not started | **Wireframe** | Interactive prototype with minimal styling |
| UI complete | **Polished** | Production-ready React + Tailwind + shadcn |

## Workflow

### Step 1: Detect Current Phase

Read `.design/config.json`:

```javascript
const { workflow } = config;
const uxComplete = workflow.phases_completed.includes('ux');
const uiComplete = workflow.phases_completed.includes('ui');

if (uiComplete) {
  mode = 'polished';
} else if (uxComplete) {
  mode = 'wireframe';
} else {
  error('Run /ux first to generate UX decisions');
}
```

### Step 2: Load Phase Context

**For Wireframe mode, load:**
- `.design/phases/DISCOVERY.md` — Requirements, user context
- `.design/phases/UX-DECISIONS.md` — Components, states, interactions

**For Polished mode, also load:**
- `.design/phases/UI-SPEC.md` — Design tokens, visual specs, Tailwind classes

### Step 3: Extract Component Specifications

From UX-DECISIONS.md, extract:
- Component names and hierarchy
- State definitions (default, hover, focus, loading, error, success, etc.)
- Interaction behaviors (onClick, onChange, validation)
- Accessibility requirements (keyboard nav, ARIA)

From UI-SPEC.md (polished mode), also extract:
- Design tokens (colors, spacing, typography)
- Tailwind classes for each component/state
- Animation specifications
- shadcn/ui component mappings

### Step 4: Generate Component Structure

**Output location:** `src/components/{feature-name}/`

**Naming convention:**
- Feature folder: kebab-case (e.g., `team-invite-modal`)
- Component files: kebab-case (e.g., `email-input.tsx`)
- Component names: PascalCase (e.g., `EmailInput`)

**Standard structure:**
```
src/components/{feature-name}/
├── index.ts                    # Barrel export
├── {feature-name}.tsx          # Main container component
├── {sub-component-1}.tsx       # Sub-component
├── {sub-component-2}.tsx       # Sub-component
├── types.ts                    # TypeScript interfaces (if complex)
└── use-{feature-name}.ts       # Custom hook (if needed)
```

### Step 5: Generate Code

#### Wireframe Mode

Generate functional React components with:

**Styling approach:**
- Minimal inline styles or basic Tailwind (borders, padding only)
- Gray color palette (`bg-gray-100`, `border-gray-300`)
- No shadows, no gradients, no animations
- Clear visual structure without polish

**Functionality:**
- All states working (useState, useEffect)
- All interactions functional (onClick, onChange, onSubmit)
- Validation logic implemented
- Keyboard navigation working
- Console.log for actions that would hit API

**Example wireframe component:**
```tsx
'use client';

import { useState } from 'react';

interface EmailInputProps {
  onAdd: (email: string) => void;
  disabled?: boolean;
}

export function EmailInput({ onAdd, disabled }: EmailInputProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validate = (email: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return isValid ? null : 'Invalid email format';
  };

  const handleSubmit = () => {
    const validationError = validate(value);
    if (validationError) {
      setError(validationError);
      return;
    }
    onAdd(value);
    setValue('');
    setError(null);
  };

  return (
    <div className="space-y-1">
      <div className="flex gap-2">
        <input
          type="email"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          disabled={disabled}
          placeholder="Enter email address"
          className="flex-1 px-3 py-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !value}
          className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
        >
          Add
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
```

#### Polished Mode

Generate production-ready components with:

**Styling approach:**
- Full Tailwind classes from UI-SPEC.md
- Design tokens applied (colors, spacing, typography)
- All visual states styled (hover, focus, active, disabled)
- Animations and transitions per spec
- Responsive behavior

**shadcn/ui integration:**
- Use shadcn components where specified
- Import from `@/components/ui/`
- Extend with custom styling via className

**Example polished component:**
```tsx
'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailInputProps {
  onAdd: (email: string) => void;
  disabled?: boolean;
}

export function EmailInput({ onAdd, disabled }: EmailInputProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const validate = useCallback((email: string) => {
    if (!email) {
      setIsValid(false);
      return null;
    }
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsValid(valid);
    return valid ? null : 'Please enter a valid email address';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    // Debounced validation would go here in production
    const validationError = validate(newValue);
    setError(validationError);
  };

  const handleSubmit = () => {
    const validationError = validate(value);
    if (validationError) {
      setError(validationError);
      return;
    }
    onAdd(value);
    setValue('');
    setError(null);
    setIsValid(false);
  };

  return (
    <div className="space-y-1">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="email"
            value={value}
            onChange={handleChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            disabled={disabled}
            placeholder="Enter email address"
            className={cn(
              'h-11 pr-10',
              error && 'border-destructive bg-destructive/10',
              isValid && 'border-green-500'
            )}
            aria-invalid={!!error}
            aria-describedby={error ? 'email-error' : undefined}
          />
          {isValid && (
            <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
          )}
        </div>
        <Button
          onClick={handleSubmit}
          disabled={disabled || !value || !!error}
          variant="outline"
        >
          Add
        </Button>
      </div>
      {error && (
        <p id="email-error" className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}
```

### Step 6: Generate Preview Page

Create a preview page to view the component in browser:

**Location:** `src/app/preview/{feature-name}/page.tsx`

**Structure:**
```tsx
import { {MainComponent} } from '@/components/{feature-name}';

export default function Preview{FeatureName}Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{Feature Name} Preview</h1>
        <p className="text-gray-600 mb-8">
          {Wireframe | Polished} implementation from DSP workflow
        </p>

        {/* Trigger button to open modal, or inline component */}
        <{MainComponent} />
      </div>
    </div>
  );
}
```

### Step 7: Open in Browser

Use Playwright to open the preview:

```typescript
// Open browser to preview page
await mcp__playwright__browser_navigate({
  url: 'http://localhost:3000/preview/{feature-name}'
});

// Take snapshot to verify rendering
await mcp__playwright__browser_snapshot({});
```

**If dev server not running:**
1. Check if Next.js dev server is running on port 3000
2. If not, inform user: "Start dev server with `npm run dev` to preview"
3. Provide the preview URL for manual access

### Step 8: Update State

Update `.design/STATE.md`:
```markdown
### Last Activity
- **Date:** [timestamp]
- **Action:** Generated {wireframe|polished} implementation
- **Mode:** {Wireframe|Polished}
- **Components:** {count} files generated
- **Preview:** src/app/preview/{feature-name}/page.tsx
```

Update `.design/config.json`:
```json
{
  "workflow": {
    "executions": {
      "wireframe": {
        "completed": true,
        "timestamp": "...",
        "files": [...]
      },
      "polished": {
        "completed": true,
        "timestamp": "...",
        "files": [...]
      }
    }
  }
}
```

---

## Component Generation Guidelines

### TypeScript

- All components use TypeScript
- Define interfaces for props
- Use proper event types (`React.ChangeEvent<HTMLInputElement>`)
- Export types that consumers might need

### React Patterns

- Use `'use client'` directive for interactive components
- Prefer controlled components
- Use `useCallback` for handlers passed to children (polished mode)
- Implement proper cleanup in useEffect

### Accessibility

- All inputs have labels (visible or sr-only)
- Error messages linked via `aria-describedby`
- Focus management in modals
- Keyboard navigation (Tab, Enter, Escape)
- ARIA attributes for dynamic content

### State Management

- Local state with useState for component-specific state
- Props for data that comes from parent
- Callbacks for actions that affect parent

---

## Error Handling

| Scenario | Response |
|----------|----------|
| No UX phase complete | "Run /ux first to define components and interactions" |
| Missing UX-DECISIONS.md | "UX-DECISIONS.md not found. Run /ux to generate it." |
| Missing UI-SPEC.md (polished) | "UI-SPEC.md not found. Run /ui first, or use wireframe mode." |
| src/ directory doesn't exist | Create it, or ask user for preferred location |
| Component files already exist | Ask: "Overwrite existing files?" with diff preview |
| shadcn not installed (polished) | Warn and offer to generate without shadcn, or provide install command |

---

## Output Summary

After execution, display:

```
═══════════════════════════════════════════════════════════════════════════════
DSP EXECUTE: {Feature Name} — {Wireframe|Polished}
═══════════════════════════════════════════════════════════════════════════════

Generated {N} components:

src/components/{feature-name}/
├── index.ts                 ✓ created
├── {feature-name}.tsx       ✓ created (main component)
├── {component-1}.tsx        ✓ created
├── {component-2}.tsx        ✓ created
└── ...

Preview page:
└── src/app/preview/{feature-name}/page.tsx  ✓ created

NEXT STEPS
────────────────────────────────────────────────────────────────────────────────
{If wireframe}
→ Run `npm run dev` and visit http://localhost:3000/preview/{feature-name}
→ Test interactions and validate UX flow
→ When satisfied, run /ui to design visual specs
→ Then /dsp:execute again for polished implementation

{If polished}
→ Run `npm run dev` and visit http://localhost:3000/preview/{feature-name}
→ Verify visual design matches UI-SPEC.md
→ When satisfied, run /design-engineer for code review
→ Then /dsp:verify to complete workflow

═══════════════════════════════════════════════════════════════════════════════
```

---

## Execution Checklist

Before generating, verify:

- [ ] UX-DECISIONS.md has component list with states
- [ ] Each component has defined interactions
- [ ] Accessibility requirements are specified
- [ ] (Polished) UI-SPEC.md has Tailwind classes
- [ ] (Polished) Design tokens are defined
- [ ] (Polished) shadcn component mappings exist

After generating, verify:

- [ ] All components render without errors
- [ ] All states are implemented
- [ ] Interactions work as specified
- [ ] Keyboard navigation functional
- [ ] (Polished) Visual design matches spec
- [ ] (Polished) Animations are smooth
