// Step 3 · Section 2 transition
// Source: value-add-source-of-truth.md
// Headline and subheadline carry over from Step 2 visually; written
// literally here rather than imported so each step file stays self-contained.

import type { Step } from '../types';

export const step3 = {
  step: 3,
  name: 'step-3-section-2-transition',
  type: 'transition',
  section: 2,
  prototype: {
    headline: { line1: 'Why Kumamoto,', line2: 'Why Now?' },
    subheadline: "Japan's fastest-rising property market",
  },
  pdf: 'not-applicable',
} as const satisfies Step;
