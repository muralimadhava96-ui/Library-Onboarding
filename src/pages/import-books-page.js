import { html } from 'lit';
import '../components/ol-onboarding-step.js';
import '../components/ol-import-dialog.js';
import '../components/ol-button.js';

export const ImportBooksPage = ({ state, onBack, onNext, onImportBooks }) => html`
  <section class="page">
    <ol-onboarding-step .step=${3} .total=${5}></ol-onboarding-step>
    <h2>Import your books</h2>
    <p>Import at least one title to continue.</p>
    <ol-import-dialog
      .importedCount=${state.importedBooks.length}
      @books-imported=${(event) => onImportBooks(event.detail)}
    ></ol-import-dialog>
    <p>Imported titles: ${state.importedBooks.length}</p>
    <div class="page-actions">
      <ol-button label="Back" @button-click=${onBack}></ol-button>
      <ol-button
        label="Continue"
        primary
        .disabled=${state.importedBooks.length === 0}
        @button-click=${onNext}
      ></ol-button>
    </div>
  </section>
`;
