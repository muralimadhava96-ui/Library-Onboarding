import { html } from 'lit';
import '../components/ol-book-card.js';

const demoBooks = [
  { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin' },
  { title: 'The Pragmatic Programmer', author: 'Hunt and Thomas' },
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman' }
];

export const Homepage = ({ state }) => html`
  <section class="page">
    <h2>Home</h2>
    <p>Onboarding complete. Preferences selected: ${state.preferences.length || 0}.</p>
    <div class="book-grid">
      ${demoBooks.map(
        (book) => html`<ol-book-card .title=${book.title} .author=${book.author}></ol-book-card>`
      )}
    </div>
  </section>
`;
