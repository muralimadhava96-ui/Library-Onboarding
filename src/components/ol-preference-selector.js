import { LitElement, html, css } from 'lit';

const OPTIONS = ['Sci-Fi', 'Fantasy', 'History', 'Romance', 'Philosophy', 'Tech', 'Mystery', 'Biography', 'Horror'];

export class OlPreferenceSelector extends LitElement {
  static properties = {
    preferences: { type: Array },
    options: { type: Array }
  };

  constructor() {
    super();
    this.preferences = [];
    this.options = [];
  }

  selectPreference(pref) {
    const isSelected = this.preferences.includes(pref);
    this.preferences = isSelected
      ? this.preferences.filter((item) => item !== pref)
      : [...this.preferences, pref];

    this.dispatchEvent(
      new CustomEvent('preferences-selected', {
        detail: [...this.preferences],
        bubbles: true,
        composed: true
      })
    );
  }

  handleKeydown(event, pref) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectPreference(pref);
    }
  }

  static styles = css`
    .chip {
      display: inline-block;
      padding: 12px 16px;
      margin: 8px;
      border-radius: 999px;
      border: 1px solid #e5e7eb;
      cursor: pointer;
      user-select: none;
    }

    .selected {
      background-color: #2c7be5;
      color: #fff;
      border-color: #2c7be5;
    }
  `;

  render() {
    const options = this.options.length ? this.options : OPTIONS;

    return html`
      <div>
        ${options.map(
          (opt) => html`
            <div
              class="chip ${this.preferences.includes(opt) ? 'selected' : ''}"
              role="button"
              tabindex="0"
              aria-pressed="${this.preferences.includes(opt)}"
              aria-label="Toggle ${opt} preference"
              @click=${() => this.selectPreference(opt)}
              @keydown=${(event) => this.handleKeydown(event, opt)}
            >
              ${opt}
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define('ol-preference-selector', OlPreferenceSelector);
