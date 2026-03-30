import { LitElement, html, css } from 'lit';

export class OlBookCard extends LitElement {
  static properties = {
    title: { type: String },
    author: { type: String }
  };

  constructor() {
    super();
    this.title = 'Book Title';
    this.author = 'Author Name';
  }

  static styles = css`
    .card {
      width: 160px;
      min-height: 240px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 8px;
      text-align: center;
      display: grid;
      place-content: center;
      gap: 8px;
    }

    .title {
      font-weight: 600;
    }

    .author {
      color: #64748b;
      font-size: 14px;
    }
  `;

  render() {
    return html`
      <div class="card">
        <div class="title">${this.title}</div>
        <div class="author">${this.author}</div>
      </div>
    `;
  }
}

customElements.define('ol-book-card', OlBookCard);
