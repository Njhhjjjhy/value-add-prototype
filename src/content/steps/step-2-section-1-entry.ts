// Step 2 · Section 1 entry — Why Kumamoto, why now?
// Source: value-add-source-of-truth.md
// Step 2 has no body paragraph. The COVID/¥10T/47,000 content lives on
// Step 4 as animated counters.

import type { Step } from '../types';

export const step2 = {
  step: 2,
  name: 'step-2-section-1-entry',
  type: 'content',
  section: 1,
  prototype: {
    headline: { line1: 'Why Kumamoto,', line2: 'Why Now?' },
    subheadline: "Japan's fastest-rising property market",
    chips: [
      { label: 'Serviced apartments' },
      { label: 'TSMC / JASM hub' },
      { label: 'Taiwanese engineers' },
      { label: '12-15% IRR', emphasis: true },
    ],
    holdPrompt: { ariaLabel: 'Hold to enter' },
  },
  pdf: 'tbd',
} as const satisfies Step;
