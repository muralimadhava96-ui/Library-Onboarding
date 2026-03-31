import { html, render } from 'lit';
import './app.css';
import './components/ol-button.js';
import './components/ol-onboarding-step.js';
import './components/ol-preference-selector.js';
import './components/ol-import-dialog.js';
import './components/ol-recommendation-preview.js';
import './components/ol-book-card.js';
import { fetchRecommendations, fetchSubjects } from './services/api.js';
import { clearOnboardingState, loadOnboardingState, saveOnboardingState } from './services/storage.js';
import { onboardingStore } from './store/onboarding-store.js';
import { WelcomePage } from './pages/welcome-page.js';
import { PreferencesPage } from './pages/preferences-page.js';
import { ImportBooksPage } from './pages/import-books-page.js';
import { RecommendationsPage } from './pages/recommendations-page.js';
import { Homepage } from './pages/homepage.js';

const root = document.getElementById('app');
const pages = [WelcomePage, PreferencesPage, ImportBooksPage, RecommendationsPage, Homepage];

let recommendationKey = '';
let subjectsLoaded = false;

function applyAppearance(state) {
  document.documentElement.dataset.theme = state.theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.contrast = state.highContrast ? 'high' : 'normal';
}

function getRecommendationKey(state) {
  return JSON.stringify({
    preferences: [...state.preferences].sort(),
    imported: state.importedBooks.map((book) => book.title).sort()
  });
}

async function refreshRecommendations() {
  const state = onboardingStore.getState();
  const key = getRecommendationKey(state);

  if (!state.preferences.length && !state.importedBooks.length) {
    onboardingStore.setState({ recommendations: [], recommendationsError: '', recommendationsLoading: false });
    recommendationKey = key;
    return;
  }

  if (state.recommendationsLoading) {
    return;
  }

  recommendationKey = key;
  onboardingStore.setState({ recommendationsLoading: true, recommendationsError: '' });

  try {
    const response = await fetchRecommendations({
      preferences: state.preferences,
      importedBooks: state.importedBooks,
      limit: 6
    });
    onboardingStore.setState({ recommendations: response.items, recommendationsLoading: false });
  } catch (error) {
    onboardingStore.setState({
      recommendationsError: error instanceof Error ? error.message : 'Unable to load recommendations.',
      recommendationsLoading: false
    });
  }
}

async function loadSubjectsIfNeeded() {
  const state = onboardingStore.getState();

  if (subjectsLoaded || state.subjectsLoading || state.subjects.length) {
    subjectsLoaded = true;
    return;
  }

  onboardingStore.setState({ subjectsLoading: true, subjectsError: '' });

  try {
    const subjects = await fetchSubjects({ limit: 12 });
    onboardingStore.setState({ subjects, subjectsLoading: false });
    subjectsLoaded = true;
  } catch (error) {
    onboardingStore.setState({
      subjectsLoading: false,
      subjectsError: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

function hydrateFromStorage() {
  const persisted = loadOnboardingState();
  if (!persisted || typeof persisted !== 'object') {
    return;
  }

  onboardingStore.setState({
    currentStep: Number.isInteger(persisted.currentStep) ? Math.max(0, Math.min(persisted.currentStep, pages.length - 1)) : 0,
    theme: persisted.theme === 'dark' ? 'dark' : 'light',
    highContrast: Boolean(persisted.highContrast),
    subjects: Array.isArray(persisted.subjects) ? persisted.subjects : [],
    preferences: Array.isArray(persisted.preferences) ? persisted.preferences : [],
    importedBooks: Array.isArray(persisted.importedBooks) ? persisted.importedBooks : [],
    recommendations: Array.isArray(persisted.recommendations) ? persisted.recommendations : [],
    onboardingComplete: Boolean(persisted.onboardingComplete)
  });
  subjectsLoaded = Array.isArray(persisted.subjects) && persisted.subjects.length > 0;
}

function renderApp() {
  const state = onboardingStore.getState();
  const currentPage = pages[state.currentStep] ?? WelcomePage;
  applyAppearance(state);

  const goNext = () => onboardingStore.setState({ currentStep: Math.min(state.currentStep + 1, pages.length - 1) });
  const goBack = () => onboardingStore.setState({ currentStep: Math.max(state.currentStep - 1, 0) });
  const toggleTheme = () => onboardingStore.setState({ theme: state.theme === 'dark' ? 'light' : 'dark' });
  const toggleContrast = () => onboardingStore.setState({ highContrast: !state.highContrast });

  if (state.currentStep === 1 && !state.subjects.length && !state.subjectsLoading) {
    loadSubjectsIfNeeded();
  }

  if (state.currentStep === 3 && !state.recommendationsLoading) {
    const nextKey = getRecommendationKey(state);
    if (nextKey !== recommendationKey) {
      refreshRecommendations();
    }
  }

  render(
    html`
      <main class="app-shell">
        <div class="app-toolbar" aria-label="Display settings">
          <button class="toolbar-button" @click=${toggleTheme} aria-label="Toggle dark mode">
            ${state.theme === 'dark' ? 'Use light mode' : 'Use dark mode'}
          </button>
          <button class="toolbar-button" @click=${toggleContrast} aria-label="Toggle high contrast mode">
            ${state.highContrast ? 'Use normal contrast' : 'Use high contrast'}
          </button>
        </div>
        ${currentPage({
          state,
          onNext: goNext,
          onBack: goBack,
          onSelectPreferences: (preferences) =>
            onboardingStore.setState({
              preferences,
              recommendations: [],
              recommendationsError: ''
            }),
          onImportBooks: (books) =>
            onboardingStore.setState({
              importedBooks: books,
              recommendations: [],
              recommendationsError: ''
            }),
          onRefreshRecommendations: refreshRecommendations,
          onComplete: () => onboardingStore.setState({ onboardingComplete: true }),
          onRestart: () => {
            recommendationKey = '';
            subjectsLoaded = false;
            clearOnboardingState();
            onboardingStore.reset();
          }
        })}
      </main>
    `,
    root
  );
}

onboardingStore.subscribe((state) => {
  saveOnboardingState({
    currentStep: state.currentStep,
    theme: state.theme,
    highContrast: state.highContrast,
    subjects: state.subjects,
    preferences: state.preferences,
    importedBooks: state.importedBooks,
    recommendations: state.recommendations,
    onboardingComplete: state.onboardingComplete
  });
  renderApp();
});

hydrateFromStorage();
renderApp();
