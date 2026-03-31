# Open Library Integration Notes

This document maps the onboarding prototype to practical Open Library integration points.

## 1. Proposed Integration Surface

Target areas to integrate onboarding:

- Account registration flow:
  - `openlibrary/templates/account/register.html`
- Landing/home experience for signed-in users:
  - `openlibrary/templates/home/index.html`
- Frontend initialization bundle:
  - Attach onboarding bootstrap only for users without onboarding completion state.

## 2. API Contracts Used by Prototype

Subject catalog:

- `GET https://openlibrary.org/subjects.json?limit={n}`

Subject recommendations:

- `GET https://openlibrary.org/subjects/{subject}.json?limit={n}&details=true`

Search recommendations:

- `GET https://openlibrary.org/search.json?q={query}&limit={n}`

Book detail:

- `GET https://openlibrary.org/works/{workId}.json`

## 3. Migration Path from Prototype to OL Codebase

1. Move `src/components/*` into OL frontend component convention.
2. Port onboarding pages into template fragments or existing frontend framework mount points.
3. Replace local storage persistence with authenticated user preference storage.
4. Keep current fallback strategy for resilience during API failures.

## 4. Backend/Storage Upgrade Path

Current:

- `localStorage` with `ol-onboarding-state` key.

Next:

- Persist preferences to user account metadata or dedicated onboarding table.
- Add server-side flag for onboarding completion.
- Serve recommendations server-side when available for SEO/performance.

## 5. Review Readiness Checklist

- [x] UI flow complete end-to-end
- [x] API integration layer implemented
- [x] Cold-start and fallback logic implemented
- [x] File/component responsibilities documented
- [x] Prototype assets provided in `docs/wireframes`
