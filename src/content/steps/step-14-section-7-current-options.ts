// Step 14 · Section 7 current options
// Source: value-add-source-of-truth.md
// "Before image" is the placeholder text shown in each slot before real
// "before" photographs are added. Not a copy issue.

import type { Step } from '../types';

export const step14 = {
  step: 14,
  name: 'step-14-section-7-current-options',
  type: 'content',
  section: 7,
  prototype: {
    sectionLabel: 'Section 7 · What you would find today',
    headline: 'Nothing on the market is ready.',
    slots: [
      { caption: 'No furniture' },
      { caption: 'Before renovation' },
      { caption: 'Not ready to move in' },
    ],
    imagePlaceholder: 'Before image',
  },
  pdf: 'tbd',
} as const satisfies Step;
