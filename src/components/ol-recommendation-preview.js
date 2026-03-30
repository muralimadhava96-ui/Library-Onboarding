import { LitElement, html, css } from 'lit';

export class OlRecommendationPreview extends LitElement {
  static properties = {
    recommendations: { type: Array }
  };

  constructor() {
    super();
    this.recommendations = ['Project Hail Mary', 'The Name of the Wind', 'Atomic Habits'];
  }

  static styles = css`
    ul {
      margin: 0;
      padding-left: 20px;
    }
  `;

  render() {
    return html`
      <div>
        <p>Recommended books will appear here</p>
        <ul>
          ${this.recommendations.map((title) => html`<li>${title}</li> `)}
        </ul>
      </div>
    `;
  }
}

customElements.define('ol-recommendation-preview', OlRecommendationPreview);
