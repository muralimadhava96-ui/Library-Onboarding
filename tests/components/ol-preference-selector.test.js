import { expect, fixture } from '@open-wc/testing';
import '../../src/components/ol-preference-selector.js';

describe('ol-preference-selector', () => {
  it('emits preferences-selected event', async () => {
    const el = await fixture('<ol-preference-selector></ol-preference-selector>');
    let fired = false;

    el.addEventListener('preferences-selected', () => {
      fired = true;
    });

    el.selectPreference('Sci-Fi');

    expect(fired).to.be.true;
  });
});
