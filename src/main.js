import { html, render } from 'lit';
import './app.css';
import './components/ol-button.js';
import './components/ol-onboarding-step.js';
import './components/ol-preference-selector.js';
import './components/ol-import-dialog.js';
import './components/ol-recommendation-preview.js';
import './components/ol-book-card.js';
import { onboardingStore } from './store/onboarding-store.js';
import { WelcomePage } from './pages/welcome-page.js';
import { PreferencesPage } from './pages/preferences-page.js';
import { ImportBooksPage } from './pages/import-books-page.js';
import { RecommendationsPage } from './pages/recommendations-page.js';
import { Homepage } from './pages/homepage.js';

const root = document.getElementById('app');

const pages = [WelcomePage, PreferencesPage, ImportBooksPage, RecommendationsPage, Homepage];

function renderApp() {
  const state = onboardingStore.getState();
  const currentPage = pages[state.currentStep];

  const goNext = () => onboardingStore.setState({ currentStep: Math.min(state.currentStep + 1, pages.length - 1) });
  const goBack = () => onboardingStore.setState({ currentStep: Math.max(state.currentStep - 1, 0) });

  render(
    html`
      <main class="app-shell">
        ${currentPage({
          state,
          onNext: goNext,
          onBack: goBack,
          onSelectPreferences: (preferences) => onboardingStore.setState({ preferences }),
          onImportBooks: (books) => onboardingStore.setState({ importedBooks: books })
        })}
      </main>
    `,
    root
  );
}

onboardingStore.subscribe(renderApp);
renderApp();
