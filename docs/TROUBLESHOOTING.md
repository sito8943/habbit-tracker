# Troubleshooting

## Missing env vars at startup

Symptom:

- App throws `Missing required environment variable...`

Fix:

1. Ensure `.env` exists in project root.
2. Define:
   - `VITE_SUPABASE_CO`
   - `VITE_SUPABASE_ANON`
3. Restart dev server after updating env values.

## Data does not match expected recovery code

Symptom:

- Errors while toggling logs or restoring data with a code.

Fix:

1. Verify the active code shown in the recovery modal.
2. Ensure the same code was used when habits/logs were created.
3. If migrating devices, use `Already have Code` in the recovery modal and apply the original code.

## Tests are failing locally

Baseline command:

- `npm run test`

Useful scoped commands:

- `npm run test -- src/App.test.tsx`
- `npm run test -- src/views/Home.test.tsx`

Checklist:

1. Run `npm ci` to avoid dependency drift.
2. Confirm Node version from `.nvmrc`.
3. Clear stale state and rerun tests: `npm run test`.

## Deploy path issues on GitHub Pages

Symptom:

- App loads blank screen or broken assets in Pages.

Fix:

1. Build using repository base path:
   - `npm run build -- --base=/<repo-name>/`
2. Ensure `dist/404.html` is copied from `dist/index.html` for SPA fallback.
3. Verify deploy workflow completed successfully.
