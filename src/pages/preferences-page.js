import { html } from 'lit';
import '../components/ol-onboarding-step.js';
import '../components/ol-preference-selector.js';
import '../components/ol-button.js';

export const PreferencesPage = ({ state, onBack, onNext, onSelectPreferences }) => html`
  <section class="page">
    <ol-onboarding-step .step=${2} .total=${5}></ol-onboarding-step>
    <h2>Choose your interests</h2>
    ${state.subjectsLoading ? html`<p>Loading interests from Open Library...</p>` : null}
    ${state.subjectsError ? html`<p>Unable to load subjects: ${state.subjectsError}</p>` : null}
    <p>Select at least one category to continue. Selected: ${state.preferences.length}</p>
    <ol-preference-selector
      .preferences=${state.preferences}
      .options=${state.subjects}
      @preferences-selected=${(event) => onSelectPreferences(event.detail)}
    ></ol-preference-selector>
    <div class="page-actions">
      <ol-button label="Back" @button-click=${onBack}></ol-button>
      <ol-button
        label="Continue"
        primary
        .disabled=${state.preferences.length === 0}
        @button-click=${onNext}
      ></ol-button>
    </div>
  </section>
`;
