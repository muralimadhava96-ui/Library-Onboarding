import { html } from 'lit';
import '../components/ol-onboarding-step.js';
import '../components/ol-recommendation-preview.js';
import '../components/ol-button.js';

export const RecommendationsPage = ({ onBack, onNext }) => html`
  <section class="page">
    <ol-onboarding-step .step=${4} .total=${5}></ol-onboarding-step>
    <h2>Preview recommendations</h2>
    <ol-recommendation-preview></ol-recommendation-preview>
    <div class="page-actions">
      <ol-button label="Back" @button-click=${onBack}></ol-button>
      <ol-button label="Finish" primary @button-click=${onNext}></ol-button>
    </div>
  </section>
`;
