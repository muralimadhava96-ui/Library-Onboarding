import { expect, fixture } from '@open-wc/testing';
import '../../src/components/ol-book-card.js';

describe('ol-book-card', () => {
  it('renders provided title', async () => {
    const el = await fixture('<ol-book-card title="Dune"></ol-book-card>');
    expect(el.shadowRoot.textContent).to.contain('Dune');
  });
});
