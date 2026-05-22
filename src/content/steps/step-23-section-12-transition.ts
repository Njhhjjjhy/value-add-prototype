// Step 23 · Section 12 transition — risk to exit
// Source: value-add-source-of-truth.md
// Heals cleanup item #6: the ghost echoes are now the 5-risk framework
// names from Step 22 (matching the new beat 5 content), replacing the
// retired 6-FAQ ghost echoes.

import type { Step } from '../types';

export const step23 = {
  step: 23,
  name: 'step-23-section-12-transition',
  type: 'transition',
  section: 12,
  prototype: {
    continueAriaLabel: 'Tap to continue',
    sectionGhostCaption: 'Risk factors',
    riskGhosts: [
      'Liquidity and exit (exit liquidity)',
      'Demand concentration',
      'Infrastructure timing',
      'Tenant concentration',
      'Renovation and cost control (execution risk)',
    ],
    resolve: {
      sectionLabel: 'Section 12',
      headline: 'Exit strategy',
    },
    continuePrompt: 'Tap to continue',
  },
  pdf: 'not-applicable',
} as const satisfies Step;
