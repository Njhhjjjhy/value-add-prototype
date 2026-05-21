// Step 19 · Section 10 transition — the investment case
// Source: value-add-source-of-truth.md

import type { Step } from '../types';

export const step19 = {
  step: 19,
  name: 'step-19-section-10-transition',
  type: 'transition',
  section: 10,
  prototype: {
    serviceRowGhosts: [
      'Property secretary',
      'Medical navigation',
      'Education support',
      'Admin support',
      'Mental wellness',
      'Cultural program',
    ],
    headline: 'The investment case.',
    nextAriaLabel: 'Continue to next step',
  },
  pdf: 'not-applicable',
} as const satisfies Step;
