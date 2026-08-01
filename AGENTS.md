# Project Guidelines

## Code Style

- TypeScript strict mode; no `any`, no non-null assertions (`!`) unless unavoidable
- Formatting and linting are enforced by Prettier and ESLint (`standard-with-typescript`); run `npm run format` and `npm run lint` before committing
- Prefer named exports for components; use default export only for page-level components
- Use functional components with hooks; no class components

## Architecture

The project follows a **layered architecture** (think of it as a lightweight frontend equivalent of Domain-Driven Design):

```
pages/        ← route-level components; orchestrate data and layout
components/   ← reusable UI pieces; receive data via props
contexts/     ← shared cross-cutting state (React Context)
services/     ← pure functions; all Spotify API communication lives here
theme/        ← design tokens; no logic
```

**Dependency rules** — layers may only import from layers below them:

- `pages` → `components`, `contexts`, `services`
- `components` → `services` (types only), `theme`
- `services` → no internal imports
- A `component` must never import from `pages`

Keep API knowledge inside `services/`. Pages and components should not construct URLs or call `fetch` directly.

## Security

- **Never hardcode secrets or tokens.** API keys and client IDs must come from environment variables (`import.meta.env.VITE_*`), not source code (treat existing hardcoded values as tech debt)
- Tokens received from Spotify are short-lived; avoid persisting the raw access token beyond the current session (plan to migrate away from any existing persistence)
- If using `localStorage` for user data, never include the raw token in the stored value
- Embedded Spotify iframes use `loading="lazy"` and explicit `allow` attributes; do not widen the `allow` list
- Do not render user-controlled strings as raw HTML (`dangerouslySetInnerHTML`)
- Keep dependencies up to date; run `npm audit` periodically
