# Integration Context

## Open Library Connection Points

This onboarding flow is designed to connect directly to Open Library data domains:

- `/people` system
  - identify logged-in user profile context
  - apply saved onboarding preferences after signup
- `/subjects`
  - load interests for first-time personalization
- `/trending`
  - provide fallback recommendations when preferences are empty

## Data Sources

- Subjects: `https://openlibrary.org/subjects.json`
- Search: `https://openlibrary.org/search.json?q={query}`
- Trending/fallback candidate source: `https://openlibrary.org/trending/daily.json` (future integration target)

## Mock API Structure (Backend Contract)

- `GET /api/user/preferences`
  - returns current onboarding preferences
- `POST /api/onboarding`
  - persists onboarding answers
- `GET /api/recommendations`
  - returns recommendation cards based on preferences/history

## Current vs Future

Current prototype persistence:

- localStorage

Future production persistence:

- user-bound backend preference storage + recommendation endpoint composition
