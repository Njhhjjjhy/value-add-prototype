// Step 13 · Section 7 transition
// Source: value-add-source-of-truth.md

import type { Step } from '../types';

export const step13 = {
  step: 13,
  name: 'step-13-section-7-transition',
  type: 'transition',
  section: 7,
  prototype: {
    headline: 'So what does a real solution look like?',
    continuePrompt: 'Tap to continue',
    continueAriaLabel: 'Tap to continue',
  },
  pdf: 'not-applicable',
} as const satisfies Step;
