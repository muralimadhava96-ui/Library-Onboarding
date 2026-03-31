# Library-Onboarding

Onboarding UX prototype for Open Library with real API integration and mentor-style implementation notes.

## Open Library Integration

This project is designed to integrate into the Open Library frontend.

### APIs Used

- Subjects API: `https://openlibrary.org/subjects.json`
- Search API: `https://openlibrary.org/search.json?q={query}`

### Integration Plan

- Onboarding flow will be added after user signup.
- Preferences are stored temporarily in `localStorage`.
- Future: persist preferences via backend account storage.

### Target Files (Open Library)

- account/register page
- homepage recommendation section

## Architecture

User -> Onboarding UI -> Preference Engine -> Open Library API -> Recommendation UI

## Components

- OnboardingFlow.vue (conceptual mapping: [`src/main.js`](src/main.js))
- GenreSelector.vue (conceptual mapping: [`src/components/ol-preference-selector.js`](src/components/ol-preference-selector.js))
- BookCard.vue (conceptual mapping: [`src/components/ol-book-card.js`](src/components/ol-book-card.js))
- RecommendationEngine.js (implemented in [`src/services/api.js`](src/services/api.js))
- ProgressBar.vue (conceptual mapping: [`src/components/ol-onboarding-step.js`](src/components/ol-onboarding-step.js))

## Impact

- Improves onboarding experience
- Increases user engagement
- Enables personalized recommendations
- Provides reusable UI components

## State Handling

State is managed in [`src/store/onboarding-store.js`](src/store/onboarding-store.js) with this shape:

```js
const state = {
  preferences: [],
  currentStep: 1,
  recommendations: []
};
```

The running implementation also tracks imported books, loading states, and completion flags.

## Real API Call Example

Implemented in [`src/services/api.js`](src/services/api.js):

```js
async function fetchBooks(query) {
  const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
  const data = await res.json();
  return data.docs.slice(0, 10);
}
```

## Smart Feature

Implemented logic:

```js
if (state.preferences.length === 0) {
  return fetchBooks('popular');
}
```

This supports cold-start recommendations for first-time users.

## Live Demo

https://your-demo-link.vercel.app

## Local Run

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
npm run test
```

## Additional Docs

- Integration mapping details: [`docs/openlibrary-integration.md`](docs/openlibrary-integration.md)
- Proposal draft: [`docs/selected-level-proposal.md`](docs/selected-level-proposal.md)
- Prototype wireframes: [`docs/wireframes`](docs/wireframes)
