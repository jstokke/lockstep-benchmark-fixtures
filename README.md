# LockStep Benchmark Fixtures

Reproducible coding tasks for validating [LockStep](https://github.com/jstokke/lockstep)'s token efficiency hypothesis.

## Overview

This repository contains seed projects designed to measure whether LockStep's enforced workflow (Research → Plan → Critique → Execute → Verify) reduces total token consumption compared to unconstrained agentic loops.

## Setup

Clone this repository as a **sibling** to the lockstep repo:

```bash
cd /path/to/projects
git clone https://github.com/jstokke/lockstep.git
git clone https://github.com/jstokke/lockstep-benchmark-fixtures.git

# Directory structure:
# projects/
# ├── lockstep/
# └── lockstep-benchmark-fixtures/
```

## Directory Structure

```
lockstep-benchmark-fixtures/
├── contact-app/     # Tasks 1 & 3: React hook migration + Typo fix
├── utils-app/       # Task 2A: Misleading comment (email validation)
├── fetch-app/       # Task 4: React 19 use() hook promise caching
└── README.md
```

---

## Task Specifications

### Task 1: Externally-Resolved — React Hook Migration

**Fixture**: `contact-app/`

**User Prompt**:
> "The ContactForm component uses useFormState but it's deprecated in React 19. Migrate it to useActionState. The form should still work correctly."

**What It Tests**: Agent must read React 19 documentation to discover the correct API. Without docs, agents may guess incorrectly.

**Expected Changes**:
- Change import from `react-dom` to `react`
- Change hook from `useFormState` to `useActionState`
- Adjust for 3-element return tuple (state, formAction, isPending)

**Verification**:
```bash
cd contact-app
npm install
npm run typecheck
npm run build
```

**Pre-Registered Assertions**:
- Import source is `'react'` (not `'react-dom'`)
- Hook name is `useActionState` (not `useFormState`)
- Return tuple has 3 elements

---

### Task 2A: Repo-Context-Dependent — Misleading Comment

**Fixture**: `utils-app/`

**User Prompt**:
> "The validateEmail function in utils.ts is rejecting valid emails with plus signs (like user+tag@example.com). Fix the validation logic."

**What It Tests**: Agent must read the actual code, not trust the misleading comment. The comment claims plus signs are blocked "for security reasons," but the real reason (legacy payment processor integration) is gone.

**The Trap**: Agents that trust comments over code will fail or hesitate.

**Expected Changes**:
- Modify regex to allow `+` character in email local part
- Optionally update or remove misleading comment

**Verification**:
```bash
cd utils-app
npm install
npm run typecheck
npm test  # Enable the skipped test after fix
```

**Pre-Registered Assertions**:
- `validateEmail('user+tag@example.com')` returns `true`
- Regex includes `+` in allowed characters

---

### Task 3: Trivial — Typo Fix (Negative Control)

**Fixture**: `contact-app/` (same as Task 1)

**User Prompt**:
> "The error message in ContactForm.tsx says 'Eror submitting form'. Fix the typo."

**What It Tests**: LockStep overhead should **hurt** token efficiency here. This is a negative control—if LockStep still wins, that's surprising evidence.

**Expected Changes**:
- Change `'Eror'` to `'Error'` in `src/actions.ts` line 18

**Verification**:
```bash
grep -r "Eror" src/  # Should find nothing after fix
```

---

### Task 4: Externally-Resolved (Hard) — React 19 use() Hook Promise Caching

**Fixture**: `fetch-app/`

**Difficulty**: 8/10

**User Prompt**:
> "The UserProfile component sometimes causes infinite loading or crashes with 'Maximum update depth exceeded'. It uses React 19's use() hook to fetch user data. Debug and fix the issue."

**What It Tests**: Agent must read React 19 documentation for the `use()` hook to understand that promises passed to `use()` in a Client Component must be cached or created outside the component. Without reading the docs, the agent will likely:
1. Try adding `useEffect` or `useState` (wrong approach)
2. Try wrapping in `useMemo` without understanding why
3. Miss the subtle issue that a new promise is created on every render

**The Trap**: The bug is non-obvious because:
- The component looks correct at first glance
- The error message ("Maximum update depth") doesn't directly mention promises
- Agents with outdated knowledge of React may not know about `use()` caveats
- The fix requires understanding Suspense internals

**Key Documentation Insight** (from React docs):
> "A Promise passed to use in a Client Component must be created outside the component and cached, or use a framework or library that caches promises for you."

**Expected Changes**:
- Cache the promise using a Map, WeakMap, or external cache
- OR create the promise at module level / in parent component
- OR use `React.cache()` (Server Components only) or a library like SWR/TanStack Query

**Example Fix** (one of several valid approaches):
```typescript
// Create a cache outside the component
const promiseCache = new Map<string, Promise<User>>();

function getCachedUserPromise(userId: string): Promise<User> {
  if (!promiseCache.has(userId)) {
    promiseCache.set(userId, fetchUser(userId));
  }
  return promiseCache.get(userId)!;
}

export function UserProfile({ userId }: UserProfileProps) {
  const userPromise = getCachedUserPromise(userId);
  const user = use(userPromise);
  // ...
}
```

**Verification**:
```bash
cd fetch-app
npm install
npm run typecheck
npm run build
npm test  # Enable the skipped test after fix
```

**Pre-Registered Assertions**:
- Promise is not created inside the component's render function
- Component renders without infinite loop
- Same `userId` prop returns same promise instance

---

## Running the Benchmark

### Pre-Run Setup

```bash
# Copy fixture to isolated location (no "lockstep" in path)
cd /path/to/projects
cp -r lockstep-benchmark-fixtures/contact-app ./contact-app
cd contact-app

# Fresh install
rm -rf node_modules package-lock.json
npm install

# Verify baseline builds
npm run typecheck
```

### Post-Run Cleanup

```bash
cd /path/to/projects
rm -rf contact-app
```

### Trial Structure

Run 3 trials per condition with randomized ordering:

| Trial | Order |
|-------|-------|
| 1 | Traditional → LockStep |
| 2 | LockStep → Traditional |
| 3 | Traditional → LockStep |

---

## Task Classification

| Class | Definition | LockStep Advantage Source |
|-------|------------|---------------------------|
| **Externally-Resolved** | Correct answer requires external documentation | Research phase forces doc reading |
| **Repo-Context-Dependent** | Known concept, but answer depends on repo-local context | Disciplined reading, critique catches assumptions |
| **Trivial** | Simple fix requiring no research | Overhead cost (negative control) |

### Class Migration Note

Task 1 (React migration) is expected to migrate from Externally-Resolved to Repo-Context-Dependent over time as model priors improve. Results are interpreted accordingly.

---

## Metrics to Collect

| Metric | Source |
|--------|--------|
| Total Input Tokens | API `usage.prompt_tokens` |
| Total Output Tokens | API `usage.completion_tokens` |
| Tool Call Count | Logged per session |
| Research Phase Tokens | Per-phase breakdown |
| Critique Rejection Count | Plan iterations before approval |

---

## Related

- [LockStep](https://github.com/jstokke/lockstep) — The enforcement harness
- [LockStep Architecture](https://github.com/jstokke/lockstep/blob/main/lockstep_architecture.md) — Technical deep dive
