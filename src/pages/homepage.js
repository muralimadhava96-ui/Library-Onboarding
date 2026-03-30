import { html } from 'lit';
import '../components/ol-book-card.js';
import '../components/ol-button.js';

function pickDisplayBooks(state) {
  if (state.recommendations.length) {
    return state.recommendations;
  }

  if (state.importedBooks.length) {
    return state.importedBooks;
  }

  return [];
}

export const Homepage = ({ state, onRestart }) => {
  const books = pickDisplayBooks(state);

  return html`
  <section class="page">
    <h2>Home</h2>
    <p>Onboarding complete. Preferences selected: ${state.preferences.length}.</p>
    <p>Imported books: ${state.importedBooks.length}. Recommendations: ${state.recommendations.length}.</p>
    <div class="book-grid">
      ${books.length
        ? books.map(
            (book) => html`<ol-book-card .title=${book.title} .author=${book.author || 'Unknown'}></ol-book-card>`
          )
        : html`<p>No books to display yet.</p>`}
    </div>
    <div class="page-actions">
      <ol-button label="Restart onboarding" @button-click=${onRestart}></ol-button>
    </div>
  </section>
`;
};
