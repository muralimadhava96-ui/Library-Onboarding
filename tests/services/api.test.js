import { expect } from '@open-wc/testing';
import '../../src/services/api.js';
import { fetchBookDetails } from '../../src/services/api.js';

describe('api service', () => {
  it('returns stubbed details for work id', async () => {
    const result = await fetchBookDetails('OL123W');
    expect(result.id).to.equal('OL123W');
  });
});
