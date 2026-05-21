// Step 24 · Section 12 exit strategy
// Source: value-add-source-of-truth.md
// Verified by Riaan on 2026-05-21 as the correct version. The OLD "Two paths
// + CapitaLand REIT ROFR + built-in optionality" content in
// src/data/exitStrategy.ts is retired and is NOT migrated.

import type { Step } from '../types';

export const step24 = {
  step: 24,
  name: 'step-24-section-12-exit-strategy',
  type: 'content',
  section: 12,
  prototype: {
    sectionLabel: 'Section 12 · Exit strategy',
    headline: 'One door.',
    subheadline: 'Sell to other buyers with the master lease in place.',
    body: "Kumamoto's housing demand is structural, not cyclical. The same engineer migration that drove Hsinchu for two decades is just starting here. When the time comes to exit, the buyers are there: owner-occupiers, yield investors, or institutional vehicles taking on a portfolio with a stable lease already attached.",
  },
  pdf: 'tbd',
} as const satisfies Step;
