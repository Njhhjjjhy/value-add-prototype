// Step 11 · Section 6 transition (descent and resolve)
// Source: value-add-source-of-truth.md
// Vestigial ${count10} aria-label template literals (cleanup item #3) are
// not migrated here. They were already removed from the prototype code.

import type { Step } from '../types';

export const step11 = {
  step: 11,
  name: 'step-11-section-6-transition',
  type: 'transition',
  section: 6,
  prototype: {
    resolve: {
      headline: '3 to 5 million yen',
      body: 'Estimated replacement cost per engineer who repatriates early due to family maladjustment.',
    },
    continuePrompt: 'Tap to continue',
    continueAriaLabel: 'Continue',
  },
  pdf: 'not-applicable',
} as const satisfies Step;
