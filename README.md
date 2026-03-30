# openlibrary-onboarding

Starter Lit + Vite scaffold for an Open Library onboarding flow.

## What is included

- Component stubs for onboarding UI
- Page scaffolds for each onboarding step
- Service/store/util placeholders for integration
- Unit test stubs for components and services
- Dockerfile and baseline lint/stylelint setup

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

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
