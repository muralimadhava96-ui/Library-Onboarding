# Library-Onboarding

Onboarding UX prototype for Open Library with integration context, state/data flow, personalization logic, and accessibility-first design.

## Open Library Integration

This project is designed to integrate into the Open Library frontend.

### Integration Context

- `/people` system: user profile context and preference ownership
- `/subjects`: interest discovery and onboarding options
- `/trending`: fallback recommendation source

### APIs Used

- Subjects API: `https://openlibrary.org/subjects.json`
- Search API: `https://openlibrary.org/search.json?q={query}`

### Mock Backend API Structure

- `GET /api/user/preferences`
- `POST /api/onboarding`
- `GET /api/recommendations`

## System Architecture

![Architecture Diagram](assets/architecture-diagram.png)

### Target Files (Open Library)

- account/register page
- homepage recommendation section

Detailed notes:

- [`docs/integration.md`](docs/integration.md)

## Architecture

User -> Onboarding UI -> Preference Engine -> Open Library API -> Recommendation UI

Detailed architecture and state flow:

- [`docs/architecture.md`](docs/architecture.md)

## State Handling / Data Flow

Store-driven onboarding state tracks progression, selected preferences, imported books, and recommendations.

Example state:

```json
{
  "interests": ["fiction", "history"],
  "reading_goal": "casual",
  "experience": "beginner"
}
```

## Real API Call

Implemented in [`src/services/api.js`](src/services/api.js):

```js
async function fetchBooks(query) {
  const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
  const data = await res.json();
  return data.docs.slice(0, 10);
}
```

## Smart Personalization Feature

Implemented intelligence:

```js
function generateRecommendations(user) {
  if (user.interests.includes('history')) {
    return ['Sapiens', 'Guns, Germs, and Steel'];
  }
}
```

Cold-start fallback:

```js
if (state.preferences.length === 0) {
  return fetchBooks('popular');
}
```

## Component Architecture

Reusable component mindset (conceptual mapping):

- OnboardingFlow.vue -> [`src/main.js`](src/main.js)
- InterestSelector.jsx / GenreSelector.vue -> [`src/components/ol-preference-selector.js`](src/components/ol-preference-selector.js)
- RecommendationCard.jsx / BookCard.vue -> [`src/components/ol-book-card.js`](src/components/ol-book-card.js)
- ProgressIndicator.jsx / ProgressBar.vue -> [`src/components/ol-onboarding-step.js`](src/components/ol-onboarding-step.js)
- RecommendationEngine.js -> [`src/services/api.js`](src/services/api.js)

## Accessibility Features

- Keyboard navigation for preference chips
- ARIA labels on key controls
- Screen reader updates via `aria-live`
- Dark mode toggle
- High contrast mode toggle

## UX Decisions

Rationale for step-based onboarding, progressive disclosure, and low-friction flow:

- [`docs/ux-decisions.md`](docs/ux-decisions.md)

## Design to Frontend Mapping

| Figma Component | Frontend Equivalent |
|----------------|--------------------|
| Button         | Reusable UI Button |
| Chip           | Filter Component   |
| Book Card      | Book Display Card  |
| Progress Bar   | Step Indicator     |


## Impact

- Improves onboarding experience
- Increases user engagement
- Enables personalized recommendations
- Provides reusable UI components

## GSoC Mapping

This prototype directly supports:

- Open Library onboarding redesign
- Recommendation system UI
- User personalization flows

## Future Work

- Connect with Open Library Subjects API at production scale
- Expand personalized recommendation engine
- Integrate user reading history and backend persistence
- Add progressive enhancement for server-rendered templates

## Mentor Hooks

This implementation emphasizes:

- scalability
- modular design
- accessibility
- progressive enhancement

## Live Demo

https://your-demo-link.vercel.app

## Prototype Assets

- Wireframes/screenshots: [`docs/wireframes`](docs/wireframes)

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
