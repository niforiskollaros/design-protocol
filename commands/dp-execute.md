---
name: dp-execute
description: Generate working implementation from DP phase outputs. After UX phase creates interactive wireframe; after UI phase creates polished React + Tailwind + shadcn components.
---

# /dp:execute — Generate Implementation

You are generating a working implementation from DP workflow outputs. This command auto-detects the current phase and generates appropriate code.

## Execution Modes

| Current State | Mode | Output |
|---------------|------|--------|
| UX complete, UI not started | **Wireframe** | Interactive prototype with minimal styling |
| UI complete | **Polished** | Production-ready React + Tailwind + shadcn |

## Workflow

### Step 1: Detect Current Phase

Read `.design/config.json` and validate before proceeding:

**Validate:** Ensure the file is valid JSON and has `workflow.phases_completed` (array). If config is missing or corrupted, show:
```
⚠ Cannot read .design/config.json — run /dp:start to initialize or /dp:progress to repair.
```

Then determine execution mode:

```javascript
const { workflow } = config;
const uxComplete = workflow.phases_completed.includes('ux');
const uiComplete = workflow.phases_completed.includes('ui');

if (uiComplete) {
  mode = 'polished';
} else if (uxComplete) {
  mode = 'wireframe';
} else {
  error('Run /dp:ux first to generate UX decisions');
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

### Step 4: Detect Project Structure

Before generating code, detect the user's project setup. Do NOT assume any specific framework or directory structure.

**Detect component directory:**
1. Check for existing component directories in this order:
   - `src/components/` — Most common (Next.js, Vite, CRA)
   - `app/components/` — Remix, some Next.js setups
   - `components/` — Root-level components
   - Any directory already containing `.tsx` or `.jsx` files
2. If none found, ask the user: "Where should I put the generated components?"

**Detect framework:**
1. Read `package.json` to identify:
   - **Next.js** — Has `next` in dependencies → uses App Router (`src/app/`) or Pages Router (`pages/`)
   - **Remix** — Has `@remix-run/react` → uses `app/routes/`
   - **Vite/CRA** — Has `vite` or `react-scripts` → no file-based routing
   - **Other** — Ask the user about their setup
2. Check for `next.config.*`, `vite.config.*`, `remix.config.*` to confirm

**Detect dev server:**
1. Read `package.json` scripts for the dev command (`dev`, `start`, `serve`)
2. Check common ports: 3000, 5173, 8080, 4321
3. Do NOT assume port 3000

**Detect shadcn/ui (polished mode):**
1. Check for `components.json` (shadcn config file)
2. Check for `@/components/ui/` directory
3. If not found, warn: "shadcn/ui not detected. Install it first, or I can generate without it."

Store detected values for use in generation:
```
componentDir: [detected path]
framework: [next-app | next-pages | remix | vite | unknown]
devCommand: [detected command]
devPort: [detected port]
hasShadcn: [true | false]
```

### Step 5: Generate Component Structure

**Output location:** `{componentDir}/{feature-name}/`

**Naming convention:**
- Feature folder: kebab-case (e.g., `team-invite-modal`)
- Component files: kebab-case (e.g., `email-input.tsx`)
- Component names: PascalCase (e.g., `EmailInput`)

**Standard structure:**
```
{componentDir}/{feature-name}/
├── index.ts                    # Barrel export
├── {feature-name}.tsx          # Main container component
├── {sub-component-1}.tsx       # Sub-component
├── {sub-component-2}.tsx       # Sub-component
├── types.ts                    # TypeScript interfaces (if complex)
└── use-{feature-name}.ts       # Custom hook (if needed)
```

### Step 6: Generate Code

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

### Step 7: Generate Preview Page

Create a preview page to view the component in browser. The location and format depend on the detected framework:

**Next.js (App Router):** `src/app/preview/{feature-name}/page.tsx` or `app/preview/{feature-name}/page.tsx`
**Next.js (Pages Router):** `pages/preview/{feature-name}.tsx`
**Remix:** `app/routes/preview.{feature-name}.tsx`
**Vite/CRA/Other:** `src/pages/preview-{feature-name}.tsx` (add route manually)

**Structure (adapt imports to detected componentDir):**
```tsx
import { {MainComponent} } from '{relative-import-to-component}';

export default function Preview{FeatureName}Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{Feature Name} Preview</h1>
        <p className="text-gray-600 mb-8">
          {Wireframe | Polished} implementation from DP workflow
        </p>

        {/* Trigger button to open modal, or inline component */}
        <{MainComponent} />
      </div>
    </div>
  );
}
```

### Step 7.5: Validate Generated Code (validator → fix → repeat)

Before previewing or declaring success, verify the generated code actually compiles and lints. Do NOT skip this — generated code that type-errors or breaks the build is not "done".

1. **Detect available checks** from `package.json` scripts and config, in this order:
   - Type check: `tsc --noEmit` (if TypeScript) or a `typecheck`/`type-check` script
   - Lint: an `eslint` / `lint` script (run scoped to the generated directory when possible)
   - Build: only if fast and the project expects it (skip for large apps)
2. **Run the checks** against the generated files.
3. **If any check fails:** read the errors, fix the generated files, and **re-run the checks**. Repeat until clean or until 3 attempts have failed.
4. **If still failing after 3 attempts:** stop, report the specific remaining errors to the user, and do NOT mark the execution complete in Step 9.
5. **If no type/lint tooling exists:** state that explicitly ("No typecheck/lint configured — generated code was not statically verified") so the user knows verification was skipped rather than passed.

Only proceed to preview and state update once checks pass (or are genuinely unavailable).

### Step 8: Open in Browser

Use Playwright to open the preview:

```typescript
// Open browser to preview page using detected port
await mcp__playwright__browser_navigate({
  url: 'http://localhost:{devPort}/preview/{feature-name}'
});

// Take snapshot to verify rendering
await mcp__playwright__browser_snapshot({});
```

**If dev server not running:**
1. Check if a dev server is running on the detected port
2. If not, inform user: "Start dev server with `{devCommand}` to preview"
3. Provide the preview URL for manual access

### Step 9: Update State

Only run this step if Step 7.5 validation passed (or no tooling was available). If validation failed after 3 attempts, leave the execution marked incomplete and report the errors instead.

Update `.design/STATE.md`:
```markdown
### Last Activity
- **Date:** [timestamp]
- **Action:** Generated {wireframe|polished} implementation
- **Mode:** {Wireframe|Polished}
- **Components:** {count} files generated
- **Preview:** {preview-page-path}
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
| No UX phase complete | "Run /dp:ux first to define components and interactions" |
| Missing UX-DECISIONS.md | "UX-DECISIONS.md not found. Run /dp:ux to generate it." |
| Missing UI-SPEC.md (polished) | "UI-SPEC.md not found. Run /dp:ui first, or use wireframe mode." |
| Component directory not found | Ask user for preferred location (see Step 4 detection) |
| Component files already exist | Ask: "Overwrite existing files?" with diff preview |
| shadcn not installed (polished) | Warn and offer to generate without shadcn, or provide install command |

---

## Output Summary

After execution, display:

```
═══════════════════════════════════════════════════════════════════════════════
DP EXECUTE: {Feature Name} — {Wireframe|Polished}
═══════════════════════════════════════════════════════════════════════════════

Generated {N} components:

{componentDir}/{feature-name}/
├── index.ts                 ✓ created
├── {feature-name}.tsx       ✓ created (main component)
├── {component-1}.tsx        ✓ created
├── {component-2}.tsx        ✓ created
└── ...

Preview page:
└── {preview-page-path}  ✓ created

NEXT STEPS
────────────────────────────────────────────────────────────────────────────────
{If wireframe}
→ Run `{devCommand}` and visit http://localhost:{devPort}/preview/{feature-name}
→ Test interactions and validate UX flow
→ When satisfied, run /dp:ui to design visual specs
→ Then /dp:execute again for polished implementation

{If polished}
→ Run `{devCommand}` and visit http://localhost:{devPort}/preview/{feature-name}
→ Verify visual design matches UI-SPEC.md
→ When satisfied, run /dp:eng_review for code review
→ Then /dp:verify to complete workflow

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

---

## Workflow Navigation

| | |
|---|---|
| **This command** | `/dp:execute` — Generate implementation |
| **Wireframe mode** | Runs after `/dp:ux` (Phase 2) → next: `/dp:ui` (Phase 3) |
| **Polished mode** | Runs after `/dp:ui` (Phase 3) → next: `/dp:eng_review` (Phase 4) |
| **Related** | `/dp:progress` — Check which mode will run |
| | `/dp:back` — Return to previous phase if output needs changes |
