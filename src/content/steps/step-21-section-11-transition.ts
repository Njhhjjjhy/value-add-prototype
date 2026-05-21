// Step 21 · Section 11 transition — ghost financials and resolve
// Source: value-add-source-of-truth.md
// Heals cleanup item #4: the OLD "Financial projections" ghost block
// (18.4% IRR, 2.1x multiple, 8.7% cash-on-cash, 5.2 yrs payback, 4.8% exit
// cap rate, 48.2M JPY NOI) is placeholder decoration and is NOT migrated.

import type { Step } from '../types';

export const step21 = {
  step: 21,
  name: 'step-21-section-11-transition',
  type: 'transition',
  section: 11,
  prototype: {
    resolve: {
      sectionLabel: 'Section 11',
      headline: 'Every investment carries risk.',
      body: 'Here is how this one is structured to mitigate them.',
    },
    nextAriaLabel: 'Continue to next step',
  },
  pdf: 'not-applicable',
} as const satisfies Step;
