// Step 5 · Section 3 transition (ghost bridge)
// Source: value-add-source-of-truth.md
// Heals cleanup item #1: "47,000 new jobs projected by 2030" (was 2027 in
// src/components/steps/step-5-section-3-transition/index.tsx line 154).

import type { Step } from '../types';

export const step5 = {
  step: 5,
  name: 'step-5-section-3-transition',
  type: 'transition',
  section: 3,
  prototype: {
    ghost: {
      caption: 'SEMICONDUCTOR INVESTMENT CORRIDOR',
      stats: [
        { value: '10T', label: 'yen in confirmed investment' },
        { value: '47,000', label: 'new jobs projected by 2030' },
      ],
      body: [
        'TSMC / JASM fab complex',
        'Sony semiconductor expansion',
        'Government infrastructure program',
      ],
    },
    continuePrompt: 'Tap to continue',
  },
  pdf: 'not-applicable',
} as const satisfies Step;
