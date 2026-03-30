# openlibrary-onboarding

Lit + Vite onboarding prototype for an Open Library-style flow.

## What is included

- Component scaffolds with working placeholder interactions
- Page flow across welcome -> preferences -> import -> recommendations -> home
- Store + localStorage persistence wiring
- Service/util modules ready for real API integration
- Unit test scaffolds for components and services
- Dockerfile and baseline lint/stylelint setup

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.
The onboarding state persists in local storage between refreshes.

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
- `npm run lint:css` - run Stylelint
- `npm run test` - run web test runner tests

If tests fail on first run due missing browser binaries, run `npx playwright install`.

## Suggested next work

1. Wire API calls in `src/services/api.js`.
2. Replace stub UI in page components with final UX.
3. Add CSS polish and responsive design refinements.
4. Expand tests for user flows and store transitions.
