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
  pdfReserved: {
    executiveSummary: {
      heading: 'Why Kumamoto, why now?',
      subheading: "Japan's fastest-rising property market",
      bodyShort:
        "High-yield serviced apartments in Kumamoto's TSMC / JASM semiconductor hub, housing Taiwanese engineers, targeting 12-15% IRR in 4-5 years.",
      bodyLong:
        'The COVID-era chip shortage exposed a hard truth: semiconductor security is national security. Now, Japan is investing over 10 trillion yen to rebuild its chip industry. With over 47,000 jobs being created, Kumamoto is set to attract waves of high-income engineers, fueling real estate growth for decades.',
      stats: [
        { value: '10T+ yen', label: 'Government semiconductor subsidy' },
        { value: '47,000+', label: 'New jobs in the corridor' },
        { value: '12-15%', label: 'Target IRR' },
      ],
    },
  },
} as const satisfies Step;
