// Step 25 · Section 13 transition — the callback
// Source: value-add-source-of-truth.md
// The callback "We said we'd come back to this." pays off the setup on
// Step 8 ("We'll come back to this."). Do not break.

import type { Step } from '../types';

export const step25 = {
  step: 25,
  name: 'step-25-section-13-transition',
  type: 'transition',
  section: 13,
  prototype: {
    callback: "We said we'd come back to this.",
    sectionLabel: 'SECTION 13',
    headline: 'Parallel timeline',
  },
  pdf: 'not-applicable',
} as const satisfies Step;
