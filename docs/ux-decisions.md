# UX Decisions

## Why Step-Based Onboarding

- Keeps cognitive load low.
- Helps users complete onboarding quickly.
- Makes completion progress visible.

## Why Minimal Friction

- Users can continue after selecting a small set of preferences.
- Imported books can be quick sample mode or manual entry.
- Defaults and fallbacks prevent empty states.

## Why Progressive Disclosure

- Early steps ask only essential questions.
- Recommendation complexity appears only after intent is captured.
- Home view confirms personalized results post-onboarding.

## Accessibility Considerations

- Keyboard interaction for preference chips.
- ARIA labels on key interactive controls.
- `aria-live` announcements for step and recommendation updates.
- Theme and high-contrast toggles for readability.
