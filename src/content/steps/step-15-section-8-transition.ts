// Step 15 · Section 8 transition — the investment
// Source: value-add-source-of-truth.md

import type { Step } from '../types';

export const step15 = {
  step: 15,
  name: 'step-15-section-8-transition',
  type: 'transition',
  section: 8,
  prototype: {
    caption: 'THE INVESTMENT',
    stats: [
      {
        value: '10 trillion yen',
        body: 'Total semiconductor investment committed to Kumamoto prefecture',
        ariaLabel:
          '10 trillion yen. Total semiconductor investment committed to Kumamoto prefecture.',
      },
      {
        value: '47,000 jobs',
        body: 'New positions projected by 2030',
        ariaLabel: '47,000 jobs. New positions projected by 2030.',
      },
    ],
  },
  pdf: 'not-applicable',
} as const satisfies Step;
