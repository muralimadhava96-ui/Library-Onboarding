import { LitElement, html, css } from 'lit';

export class OlRecommendationPreview extends LitElement {
  static properties = {
    recommendations: { type: Array },
    loading: { type: Boolean },
    error: { type: String }
  };

  constructor() {
    super();
    this.recommendations = [];
    this.loading = false;
    this.error = '';
  }

  static styles = css`
    .state {
      padding: 12px;
      border-radius: 8px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      margin-bottom: 8px;
    }

    ul {
      margin: 0;
      padding-left: 20px;
    }

    .book-author {
      color: #64748b;
      font-size: 14px;
    }
  `;

  renderState() {
    if (this.loading) {
      return html`<div class="state">Loading recommendations...</div>`;
    }

    if (this.error) {
      return html`<div class="state">Unable to load recommendations: ${this.error}</div>`;
    }

    if (!this.recommendations.length) {
      return html`<div class="state">No recommendations yet. Import books or select more preferences.</div>`;
    }

    return null;
  }

  render() {
    return html`
      <div aria-live="polite">
        <p>Recommended books</p>
        ${this.renderState()}
        ${this.recommendations.length
          ? html`
              <ul>
                ${this.recommendations.map(
                  (book) => html`<li>${book.title} <span class="book-author">by ${book.author || 'Unknown'}</span></li>`
                )}
              </ul>
            `
          : null}
      </div>
    `;
  }
}

customElements.define('ol-recommendation-preview', OlRecommendationPreview);
