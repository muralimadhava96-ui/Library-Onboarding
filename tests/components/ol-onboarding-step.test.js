import { expect, fixture } from '@open-wc/testing';
import '../../src/components/ol-onboarding-step.js';

describe('ol-onboarding-step', () => {
  it('renders current step and total', async () => {
    const el = await fixture('<ol-onboarding-step step="2" total="3"></ol-onboarding-step>');
    expect(el.shadowRoot.textContent).to.contain('Step 2 of 3');
  });
});
