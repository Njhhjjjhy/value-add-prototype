// Step 28 · Download PDF
// Source: value-add-source-of-truth.md
// Terminal step. The button action opens /pdf in the same tab. No step 29.

import type { Step } from '../types';

export const step28 = {
  step: 28,
  name: 'step-28-download-pdf',
  type: 'content',
  section: null,
  prototype: {
    headline: 'The full picture.',
    body: 'The memo behind everything you just saw. Per-unit underwriting, comparables, exit analysis, and the parallel timeline in detail.',
    button: 'Download PDF',
  },
  pdf: 'not-applicable',
} as const satisfies Step;
