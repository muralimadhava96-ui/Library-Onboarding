export function buildSolrQuery(preferences = []) {
  if (!preferences.length) {
    return '*:*';
  }

  return preferences.map((value) => `subject:${value}`).join(' OR ');
}

export function parseSolrResponse(response = {}) {
  return response.docs ?? [];
}
