# Architecture

This project follows a layered frontend architecture focused on separating UI, state orchestration, and remote data access.

## Layer map

- `src/views` and `src/layouts`
  - Route-level screens and layout composition.
  - No direct data fetching.
- `src/components`
  - Reusable and presentational UI components.
  - Receive data/handlers via props or dedicated hooks.
- `src/hooks`
  - UI and view-model hooks (`useHomeView`, `useHabitForm`, `useHabitList`).
  - Keeps components lean and testable.
- `src/providers`
  - App-wide contexts and orchestration (`HabitsProvider`, `SyncCodeProvider`, `SupabaseProvider`).
  - Bridges UI-level intent and data mutations/queries.
- `src/entities`
  - Domain data contracts and data-access hooks.
  - Encapsulates React Query query/mutation definitions and Supabase client usage.
- `src/lib`
  - Integration infrastructure (Supabase client, QueryClient, typed DB schema).
- `src/utils`
  - Pure utility functions and cache helpers.

## Runtime data flow

1. User action starts in a UI component (`HabitForm`, `HabitList`, `Calendar`).
2. Component delegates to a local hook (`useHabitForm`, `useHabitList`, `useCalendarView`).
3. Hook calls context actions from `HabitsProvider`.
4. Provider triggers entity mutations/queries (`useCreateHabitMutation`, `useToggleLogMutation`, etc.).
5. Entity hooks call Supabase clients through `SupabaseManager`.
6. React Query cache invalidation refreshes query state.
7. Provider mirrors query results to localStorage cache namespaced by sync code.

## State strategy

- Server/remote state: React Query.
- Cross-view app state: React Context (`HabitsContext`, `SyncCodeContext`).
- UI-local ephemeral state: component hooks.
- Persistence fallback/bootstrapping: localStorage cache per sync code.

## Design decisions

- Soft deletes for habits/logs (`deleted_at`) to preserve history and avoid hard data loss.
- Query keys include sync code, ensuring isolation by recovery code context.
- Supabase access hidden behind typed clients to avoid query details leaking into UI code.
- Context providers accept injectable dependencies (`manager`, `queryClient`) for testability.
