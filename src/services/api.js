const API_BASE_URL = 'https://openlibrary.org';

const CATALOG = [
  { id: 'OL1W', title: 'Dune', author: 'Frank Herbert', subjects: ['Sci-Fi'] },
  { id: 'OL2W', title: 'Neuromancer', author: 'William Gibson', subjects: ['Sci-Fi', 'Tech'] },
  { id: 'OL3W', title: 'The Hobbit', author: 'J.R.R. Tolkien', subjects: ['Fantasy'] },
  { id: 'OL4W', title: 'The Name of the Wind', author: 'Patrick Rothfuss', subjects: ['Fantasy'] },
  { id: 'OL5W', title: 'Sapiens', author: 'Yuval Noah Harari', subjects: ['History', 'Biography'] },
  { id: 'OL6W', title: 'Atomic Habits', author: 'James Clear', subjects: ['Philosophy', 'Tech'] },
  { id: 'OL7W', title: 'Gone Girl', author: 'Gillian Flynn', subjects: ['Mystery'] },
  { id: 'OL8W', title: 'Pride and Prejudice', author: 'Jane Austen', subjects: ['Romance'] },
  { id: 'OL9W', title: 'Dracula', author: 'Bram Stoker', subjects: ['Horror'] }
];

function wait(durationMs = 120) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, durationMs);
  });
}

export async function fetchBookDetails(workId) {
  if (!workId) {
    throw new Error('workId is required');
  }

  await wait(80);

  const match = CATALOG.find((book) => book.id === workId);
  return (
    match ?? {
      id: workId,
      title: 'Unknown title',
      author: 'Unknown author',
      subjects: [],
      source: API_BASE_URL
    }
  );
}

export async function fetchRecommendations({ preferences = [], importedBooks = [], limit = 6 } = {}) {
  await wait(150);

  const importedTitles = new Set(importedBooks.map((book) => (book.title ?? '').toLowerCase()).filter(Boolean));
  const preferredSubjects = new Set(preferences);

  const ranked = CATALOG.filter((book) => !importedTitles.has(book.title.toLowerCase()))
    .map((book) => ({
      ...book,
      score: book.subjects.reduce((acc, subject) => (preferredSubjects.has(subject) ? acc + 1 : acc), 0)
    }))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  const items = ranked.slice(0, limit).map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    subjects: [...book.subjects]
  }));

  return {
    preferences,
    limit,
    items
  };
}
