import { LitElement, html, css } from 'lit';

export class OlImportDialog extends LitElement {
  static properties = {
    importedCount: { type: Number }
  };

  constructor() {
    super();
    this.importedCount = 0;
  }

  static styles = css`
    .stub {
      padding: 20px;
      border: 1px dashed #cbd5e1;
      border-radius: 12px;
      background: #f8fafc;
    }
  `;

  simulateImport() {
    this.importedCount = 5;
    this.dispatchEvent(
      new CustomEvent('books-imported', {
        detail: [
          { title: 'Dune' },
          { title: 'Pride and Prejudice' },
          { title: 'Sapiens' },
          { title: 'Clean Code' },
          { title: 'The Hobbit' }
        ],
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      <div class="stub">
        <p>Import your books here (stub)</p>
        <button @click=${this.simulateImport}>Simulate import</button>
        <p>Imported: ${this.importedCount}</p>
      </div>
    `;
  }
}

customElements.define('ol-import-dialog', OlImportDialog);
