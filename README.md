# Focus Habit

Habit tracker built with React + TypeScript + Vite.

It lets you create custom habits, mark daily completions, browse progress on a calendar, and recover/sync data with a short code.

## Features

- Custom habits (name + color)
- Daily completion tracking
- Calendar view with logged-day indicators
- Recovery code flow for restoring/syncing data
- Local cache fallback per recovery code

## Tech stack

- React 19
- TypeScript (strict mode)
- Vite
- React Query
- Supabase
- Tailwind CSS 4
- Vitest + Testing Library

## Quick start

1. Install dependencies:

```bash
npm ci
```

2. Create `.env` (or copy from `.env.example`) with:

```bash
VITE_SUPABASE_CO=...
VITE_SUPABASE_ANON=...
# optional
VITE_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=...
```

3. Start dev server:

```bash
npm run dev
```

## Architecture at a glance

Codebase is organized by clear boundaries:

- `src/views`, `src/layouts`: route composition
- `src/components`: reusable/presentational UI
- `src/hooks`: view-model and UI logic
- `src/providers`: app-level orchestration/context
- `src/entities`: domain data hooks + contracts
- `src/lib`: integration layer (Supabase, QueryClient)
- `src/utils`: pure helpers

Data flow:

1. UI event in component
2. Hook transforms UI intent
3. Provider action runs mutation/query
4. Entity hook calls Supabase client
5. React Query cache invalidates and refetches
6. Provider syncs latest data into localStorage cache per recovery code

More detail:

- [Architecture](./docs/ARCHITECTURE.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)

## Scripts

| Command                | Description                            |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Start dev server                       |
| `npm run build`        | Type-check and production build        |
| `npm run preview`      | Preview production build               |
| `npm run test`         | Run test suite                         |
| `npm run test:watch`   | Run tests in watch mode                |
| `npm run lint`         | Run ESLint                             |
| `npm run format`       | Format code with Prettier              |
| `npm run format:check` | Validate formatting with Prettier      |
| `npm run depcheck`     | Check for unused dependencies          |
| `npm run lint:all`     | Lint + format check + dependency check |

## Quality gates

- Type safety: `tsconfig` strict checks
- Linting/formatting: ESLint + Prettier
- Unit/integration tests: Vitest + Testing Library
- CI workflow: lint, test, build, deploy
