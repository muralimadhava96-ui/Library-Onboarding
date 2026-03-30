import { expect } from '@open-wc/testing';
import '../../src/services/api.js';
import { fetchBookDetails, fetchRecommendations } from '../../src/services/api.js';

describe('api service', () => {
  it('returns stubbed details for work id', async () => {
    const result = await fetchBookDetails('OL123W');
    expect(result.id).to.equal('OL123W');
  });

  it('returns recommendation items', async () => {
    const result = await fetchRecommendations({
      preferences: ['Sci-Fi'],
      importedBooks: [{ title: 'Dune' }],
      limit: 3
    });

    expect(result.items).to.have.lengthOf(3);
    expect(result.items.map((book) => book.title)).to.not.include('Dune');
  });
});
