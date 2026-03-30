import { LitElement, html, css } from 'lit';

export class OlButton extends LitElement {
  static properties = {
    label: { type: String },
    primary: { type: Boolean },
    disabled: { type: Boolean }
  };

  constructor() {
    super();
    this.label = 'Button';
    this.primary = false;
    this.disabled = false;
  }

  static styles = css`
    button {
      padding: 12px 24px;
      border-radius: 8px;
      border: none;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    button.primary {
      background-color: #2c7be5;
      color: #fff;
    }

    button.secondary {
      background-color: #fff;
      border: 1px solid #2c7be5;
      color: #2c7be5;
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;

  handleClick() {
    this.dispatchEvent(
      new CustomEvent('button-click', {
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      <button
        class="${this.primary ? 'primary' : 'secondary'}"
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        ${this.label}
      </button>
    `;
  }
}

customElements.define('ol-button', OlButton);
