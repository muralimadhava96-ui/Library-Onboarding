# Architecture and Data Flow

## System Flow

User -> Onboarding UI -> Store/State -> Recommendation Engine -> Open Library API -> Recommendation UI

## State Management

State is managed through a lightweight store in `src/store/onboarding-store.js` and persisted via `src/services/storage.js`.

Example state shape:

```json
{
  "interests": ["fiction", "history"],
  "reading_goal": "casual",
  "experience": "beginner"
}
```

Runtime onboarding state currently tracks:

- current step
- theme + contrast preferences
- subject options
- selected interests
- imported books
- recommendation loading/error status
- completion flag

## Data Lifecycle

1. Load subjects from Open Library.
2. Capture user selections in store.
3. Fetch recommendations from OL APIs.
4. Apply fallback recommendation logic when API data is incomplete.
5. Persist onboarding state for session continuity.
