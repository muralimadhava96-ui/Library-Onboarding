# Selected-Level Proposal Draft

## Project Title

Open Library Personalized Onboarding Flow

## Problem

Current onboarding does not personalize discovery early, which can increase drop-off and reduce first-session engagement.

## Goals

1. Build a low-friction onboarding flow for new users.
2. Connect user preferences to real Open Library recommendation APIs.
3. Provide resilient fallback logic for cold start and API failure.
4. Prepare integration path into Open Library templates.

## Scope Implemented in This Repo

- End-to-end onboarding flow:
  - Welcome -> Preferences -> Import -> Recommendations -> Home
- Dynamic subjects from Open Library
- Recommendation engine with fallback hierarchy
- Persisted onboarding state
- Test coverage for core service and components

## Technical Design

Data flow:

1. Load subjects from `subjects.json`.
2. Capture preferences and imported titles.
3. Query subject/search APIs for recommendations.
4. Filter/dedupe books.
5. Render recommendations and persist state.

Fallback hierarchy:

1. Subject endpoint results
2. Search endpoint results
3. Popular books fallback
4. Local static fallback catalog

## Integration Plan into Open Library

Candidate integration touchpoints:

- `openlibrary/templates/account/register.html`
- `openlibrary/templates/home/index.html`
- Frontend initialization script for authenticated users

Migration path:

1. Port components to OL frontend conventions.
2. Replace local storage with server-side user preference persistence.
3. Add metrics around onboarding completion and CTR on recommendations.

## Impact

- Reduced onboarding abandonment.
- Improved discovery relevance for first-time users.
- Better activation and repeat engagement.

## Timeline (Draft)

Week 1-2:

- Finalize integration contract with mentors
- Port onboarding shell into OL template environment

Week 3-5:

- Hook real API responses to production UX
- Add telemetry and fallback handling

Week 6-8:

- A/B evaluation and iteration
- Accessibility and performance pass

Week 9-10:

- Documentation, tests, and merge-ready PR

## Deliverables

- Production-ready onboarding flow
- API-backed recommendations with fallback
- Integration documentation
- Tests and QA checklist
