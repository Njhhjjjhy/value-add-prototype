// Step 7 · Section 4 transition
// Source: value-add-source-of-truth.md

import type { Step } from '../types';

export const step7 = {
  step: 7,
  name: 'step-7-section-4-transition',
  type: 'transition',
  section: 4,
  prototype: {
    headline: "You've seen this movie before.",
  },
  pdf: 'not-applicable',
} as const satisfies Step;
