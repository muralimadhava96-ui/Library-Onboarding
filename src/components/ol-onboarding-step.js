import { LitElement, html, css } from 'lit';

export class OlOnboardingStep extends LitElement {
  static properties = {
    step: { type: Number },
    total: { type: Number }
  };

  constructor() {
    super();
    this.step = 1;
    this.total = 1;
  }

  static styles = css`
    p {
      margin: 0 0 8px;
      color: #64748b;
      font-weight: 600;
      font-size: 14px;
    }
  `;

  render() {
    return html`<p aria-live="polite">Step ${this.step} of ${this.total}</p>`;
  }
}

customElements.define('ol-onboarding-step', OlOnboardingStep);
