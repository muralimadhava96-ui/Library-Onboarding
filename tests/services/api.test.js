import { expect } from '@open-wc/testing';
import '../../src/services/api.js';
import { fetchBookDetails, fetchRecommendations, fetchSubjects } from '../../src/services/api.js';

describe('api service', () => {
  it('returns stubbed details for work id', async () => {
    const result = await fetchBookDetails('OL123W');
    expect(result.id).to.equal('OL123W');
  });

  it('returns recommendation items', async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      throw new Error('offline');
    };

    let result;
    try {
      result = await fetchRecommendations({
        preferences: ['Sci-Fi'],
        importedBooks: [{ title: 'Dune' }],
        limit: 3
      });
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(result.items).to.have.lengthOf(3);
    expect(result.items.map((book) => book.title)).to.not.include('Dune');
  });

  it('returns subjects for onboarding step', async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      throw new Error('offline');
    };

    let subjects;
    try {
      subjects = await fetchSubjects({ limit: 5 });
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(subjects).to.be.an('array');
    expect(subjects.length).to.be.greaterThan(0);
  });
});
