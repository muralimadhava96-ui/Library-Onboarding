import { html } from 'lit';
import '../components/ol-onboarding-step.js';
import '../components/ol-button.js';

export const WelcomePage = ({ onNext }) => html`
  <section class="page">
    <ol-onboarding-step .step=${1} .total=${5}></ol-onboarding-step>
    <h1>Welcome to Open Library</h1>
    <p>Set your preferences and import your books to personalize recommendations.</p>
    <div class="page-actions">
      <ol-button label="Start onboarding" primary @button-click=${onNext}></ol-button>
    </div>
  </section>
`;
