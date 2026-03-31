import { LitElement, html, css } from 'lit';

const SAMPLE_BOOKS = ['Dune', 'The Hobbit', 'Sapiens', 'Pride and Prejudice', 'Atomic Habits'];

function uniqueByTitle(books) {
  const seen = new Set();
  return books.filter((book) => {
    const key = book.title.toLowerCase();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

export class OlImportDialog extends LitElement {
  static properties = {
    importedCount: { type: Number },
    draft: { type: String }
  };

  constructor() {
    super();
    this.importedCount = 0;
    this.draft = '';
  }

  static styles = css`
    .panel {
      padding: 20px;
      border: 1px dashed #cbd5e1;
      border-radius: 12px;
      background: #f8fafc;
    }

    textarea {
      width: 100%;
      min-height: 120px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 10px;
      margin-top: 8px;
      font: inherit;
      resize: vertical;
    }

    .actions {
      margin-top: 12px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    button {
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid #94a3b8;
      background: #fff;
      cursor: pointer;
    }
  `;

  updateDraft(event) {
    this.draft = event.target.value;
  }

  parseBooks(raw) {
    return uniqueByTitle(
      raw
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((title) => ({ title }))
    );
  }

  importFromDraft() {
    const books = this.parseBooks(this.draft);
    this.importedCount = books.length;
    this.dispatchImported(books);
  }

  useSample() {
    this.draft = SAMPLE_BOOKS.join('\n');
    this.importFromDraft();
  }

  dispatchImported(books) {
    this.dispatchEvent(
      new CustomEvent('books-imported', {
        detail: books,
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      <div class="panel">
        <p>Paste one book title per line.</p>
        <textarea
          .value=${this.draft}
          @input=${this.updateDraft}
          aria-label="Book titles input"
          placeholder="Dune&#10;The Hobbit&#10;Sapiens"
        ></textarea>
        <div class="actions">
          <button aria-label="Import book list" @click=${this.importFromDraft}>Import list</button>
          <button aria-label="Use sample books" @click=${this.useSample}>Use sample books</button>
        </div>
        <p>Imported: ${this.importedCount}</p>
      </div>
    `;
  }
}

customElements.define('ol-import-dialog', OlImportDialog);
