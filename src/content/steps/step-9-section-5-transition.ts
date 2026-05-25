// Step 9 · Section 5 transition
// Source: value-add-source-of-truth.md
//
// QA round 1: stripped to just heading + subheading. The previous section
// label, body line, and Physical · Mental caption/dot pager were removed.

import type { Step } from '../types';

export const step9 = {
  step: 9,
  name: 'step-9-section-5-transition',
  type: 'transition',
  section: 5,
  prototype: {
    headline: 'Pain points',
    subheading: 'What semiconductor families actually face in Kumamoto.',
  },
  pdf: 'not-applicable',
} as const satisfies Step;
