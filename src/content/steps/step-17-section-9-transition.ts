// Step 17 · Section 9 transition
// Source: value-add-source-of-truth.md

import type { Step } from '../types';

export const step17 = {
  step: 17,
  name: 'step-17-section-9-transition',
  type: 'transition',
  section: 9,
  prototype: {
    sectionLabel: 'Section 9 · Product, software',
    headline: 'Software-defined real estate',
    continuePrompt: 'Tap to continue',
  },
  pdf: 'not-applicable',
} as const satisfies Step;
