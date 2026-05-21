// Step 9 · Section 5 transition
// Source: value-add-source-of-truth.md

import type { Step } from '../types';

export const step9 = {
  step: 9,
  name: 'step-9-section-5-transition',
  type: 'transition',
  section: 5,
  prototype: {
    sectionLabel: 'SECTION 5',
    headline: 'Pain points',
    body: 'What semiconductor families actually face in Kumamoto.',
    caption: 'Physical · Mental',
  },
  pdf: 'not-applicable',
} as const satisfies Step;
