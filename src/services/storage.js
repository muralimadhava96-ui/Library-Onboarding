const STORAGE_KEY = 'ol-onboarding-state';

export function saveOnboardingState(state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadOnboardingState() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearOnboardingState() {
  window.localStorage.removeItem(STORAGE_KEY);
}
