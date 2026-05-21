// Step 4 · Section 2 bridge — the numbers
// Source: value-add-source-of-truth.md
// Two animated counters. The ariaLabelTemplate strings contain the
// literal ${...} syntax shown in the source of truth; the component is
// responsible for interpolating its own count state at runtime.

import type { Step } from '../types';

export const step4 = {
  step: 4,
  name: 'step-4-section-2-bridge',
  type: 'content',
  section: 2,
  prototype: {
    counters: [
      {
        from: 0,
        to: 10,
        finalValue: '10',
        bodySuffix: 'trillion yen. Japan is rebuilding its chip industry.',
        ariaLabelTemplate:
          '${count10} trillion yen. Japan is rebuilding its chip industry.',
        ariaLabelFinal:
          '10 trillion yen. Japan is rebuilding its chip industry.',
      },
      {
        from: 0,
        to: 47000,
        finalValue: '47,000',
        bodySuffix:
          'jobs being created. Kumamoto is set to attract waves of high-income engineers.',
        ariaLabelTemplate:
          '${count47.toLocaleString()} jobs being created. Kumamoto is set to attract waves of high-income engineers.',
        ariaLabelFinal:
          '47,000 jobs being created. Kumamoto is set to attract waves of high-income engineers.',
      },
    ],
    closingBody:
      'High-income engineers are arriving. Housing demand will follow.',
  },
  pdf: 'tbd',
} as const satisfies Step;
