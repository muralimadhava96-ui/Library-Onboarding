import { expect, fixture } from '@open-wc/testing';
import '../../src/components/ol-import-dialog.js';

describe('ol-import-dialog', () => {
  it('emits books-imported from sample action', async () => {
    const el = await fixture('<ol-import-dialog></ol-import-dialog>');
    let imported = null;

    el.addEventListener('books-imported', (event) => {
      imported = event.detail;
    });

    el.useSample();

    expect(imported).to.be.an('array');
    expect(imported.length).to.be.greaterThan(0);
  });
});
