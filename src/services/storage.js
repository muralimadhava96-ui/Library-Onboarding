const STORAGE_KEY = 'ol-onboarding-state';

export function saveOnboardingState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_error) {
    // Ignore storage issues in constrained environments.
  }
}

export function loadOnboardingState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_error) {
    return null;
  }
}

export function clearOnboardingState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (_error) {
    // Ignore storage issues in constrained environments.
  }
}
