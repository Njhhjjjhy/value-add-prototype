// Step 1 · Opening transition
// Source: value-add-source-of-truth.md

import type { Step } from '../types';

export const step1 = {
  step: 1,
  name: 'step-1-opening-transition',
  type: 'transition',
  section: null,
  prototype: {
    altText: 'MoreHarvest',
    headline: 'Enter MoreHarvest world',
    holdCaption: 'Hold to enter',
    ariaLabel: 'Hold to enter MoreHarvest world',
  },
  pdf: 'not-applicable',
} as const satisfies Step;
