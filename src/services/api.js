const API_BASE_URL = 'https://openlibrary.org';

const FALLBACK_SUBJECTS = ['Sci-Fi', 'Fantasy', 'History', 'Romance', 'Philosophy', 'Tech', 'Mystery', 'Biography', 'Horror'];

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

function toSubjectSlug(value) {
  return value
    .toLowerCase()
    .replaceAll('&', ' and ')
    .replaceAll(/[^a-z0-9]+/g, '_')
    .replaceAll(/^_+|_+$/g, '');
}

function normalizeAuthor(authors) {
  if (!Array.isArray(authors) || !authors.length) {
    return 'Unknown';
  }

  const first = authors[0];
  if (typeof first === 'string') {
    return first;
  }

  return first?.name || 'Unknown';
}

function normalizeOpenLibraryWork(work, fallbackSubject = '') {
  const id = work?.key?.replace('/works/', '') || work?.cover_edition_key || '';
  const title = work?.title || 'Untitled';
  const author = normalizeAuthor(work?.authors);
  const subjects = fallbackSubject ? [fallbackSubject] : [];

  return { id, title, author, subjects };
}

async function safeFetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

function dedupeBooks(items, importedTitles) {
  const seen = new Set();
  return items.filter((book) => {
    const key = (book.title || '').toLowerCase();
    if (!key || seen.has(key) || importedTitles.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function fallbackRecommendations(preferences, importedBooks, limit) {
  const importedTitles = new Set(importedBooks.map((book) => (book.title || '').toLowerCase()).filter(Boolean));
  const preferredSubjects = new Set(preferences);

  const ranked = CATALOG.filter((book) => !importedTitles.has(book.title.toLowerCase()))
    .map((book) => ({
      ...book,
      score: book.subjects.reduce((acc, subject) => (preferredSubjects.has(subject) ? acc + 1 : acc), 0)
    }))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  return ranked.slice(0, limit).map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    subjects: [...book.subjects]
  }));
}

export async function fetchSubjects({ limit = 12 } = {}) {
  const url = `${API_BASE_URL}/subjects.json?limit=${limit}`;

  try {
    const data = await safeFetchJson(url);
    const names = Array.isArray(data?.subjects)
      ? data.subjects.map((subject) => subject?.name).filter((name) => typeof name === 'string' && name.length > 0)
      : [];

    if (!names.length) {
      throw new Error('No subjects returned');
    }

    return names.slice(0, limit);
  } catch (_error) {
    return FALLBACK_SUBJECTS.slice(0, limit);
  }
}

async function fetchSubjectWorks(subject, limit = 8) {
  const slug = toSubjectSlug(subject);
  const url = `${API_BASE_URL}/subjects/${slug}.json?limit=${limit}&details=true`;
  const data = await safeFetchJson(url);
  const works = Array.isArray(data?.works) ? data.works : [];
  return works.map((work) => normalizeOpenLibraryWork(work, subject));
}

async function fetchSearchBooks(query, limit = 8) {
  return fetchBooks(query, limit);
}

export async function fetchBooks(query, limit = 10) {
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `${API_BASE_URL}/search.json?q=${encodedQuery}&limit=${limit}`;
    const data = await safeFetchJson(url);
    const docs = Array.isArray(data?.docs) ? data.docs : [];

    const books = docs.map((item) => ({
      id: item?.key?.replace('/works/', '') || item?.cover_edition_key || '',
      title: item?.title || 'Untitled',
      author: Array.isArray(item?.author_name) && item.author_name.length ? item.author_name[0] : 'Unknown',
      subjects: []
    }));

    if (!books.length) {
      throw new Error('No books returned');
    }

    return books.slice(0, limit);
  } catch (_error) {
    return CATALOG.slice(0, limit).map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      subjects: [...book.subjects]
    }));
  }
}

export async function fetchPopularBooks(limit = 6) {
  try {
    const popular = await fetchSubjectWorks('fiction', Math.max(limit, 8));
    return popular.slice(0, limit);
  } catch (_error) {
    return CATALOG.slice(0, limit).map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      subjects: [...book.subjects]
    }));
  }
}

export async function fetchBookDetails(workId) {
  if (!workId) {
    throw new Error('workId is required');
  }

  try {
    const data = await safeFetchJson(`${API_BASE_URL}/works/${workId}.json`);
    return {
      id: workId,
      title: data?.title || 'Unknown title',
      author: 'Unknown',
      subjects: Array.isArray(data?.subjects) ? data.subjects.slice(0, 3) : [],
      source: API_BASE_URL
    };
  } catch (_error) {
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
}

export async function fetchRecommendations({ preferences = [], importedBooks = [], limit = 6 } = {}) {
  const importedTitles = new Set(importedBooks.map((book) => (book.title || '').toLowerCase()).filter(Boolean));

  if (!preferences.length) {
    const items = await fetchBooks('popular', limit);
    return { preferences, limit, items: dedupeBooks(items, importedTitles).slice(0, limit) };
  }

  try {
    const subjectCalls = preferences.slice(0, 3).map((subject) => fetchSubjectWorks(subject, Math.max(limit, 6)));
    const subjectResults = await Promise.all(subjectCalls);
    const merged = subjectResults.flat();

    let items = dedupeBooks(merged, importedTitles).slice(0, limit);

    if (items.length < limit) {
      const searchExtras = await fetchSearchBooks(preferences.join(' '), limit);
      items = dedupeBooks([...items, ...searchExtras], importedTitles).slice(0, limit);
    }

    if (items.length < limit) {
      const popular = await fetchPopularBooks(limit);
      items = dedupeBooks([...items, ...popular], importedTitles).slice(0, limit);
    }

    return { preferences, limit, items };
  } catch (_error) {
    return {
      preferences,
      limit,
      items: fallbackRecommendations(preferences, importedBooks, limit)
    };
  }
}
