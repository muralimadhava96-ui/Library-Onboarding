const API_BASE_URL = 'https://openlibrary.org';

export async function fetchBookDetails(workId) {
  if (!workId) {
    throw new Error('workId is required');
  }

  return {
    id: workId,
    title: 'Stubbed book',
    source: API_BASE_URL
  };
}

export async function fetchRecommendations({ preferences = [], limit = 10 } = {}) {
  return {
    preferences,
    limit,
    items: []
  };
}
