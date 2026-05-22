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
  // PDF-reserved copy for the current-options page. Not shown on screen.
  // Migrated verbatim from src/data/dealStructure.ts (CURRENT_OPTIONS).
  // Move into the `pdf` track above when the source of truth canonicalizes
  // this content.
  pdfReserved: {
    marketProof: {
      heading: '42 units. Fully reserved before completion.',
      body: 'Former municipal Kusunoki public housing site, Kita-ku, Kumamoto City. D&D General Group developed 4 buildings, 3 stories each. 42 units, all 3LDK, family-oriented. All units bulk-leased by JASM (TSMC subsidiary). Move-in from August 2023.',
      takeaway: 'The B2B bulk-lease model works. Demand is proven.',
    },
    closestCompetitor: {
      heading: 'Current options: housing without solutions.',
      body: '14-story building, 65 units, all 3LDK (70 to 80 sqm). 80% Taiwanese business guests. From 20,000 yen per night with long-term lease options. Services: bilingual property management, mail handling, meeting facilities, airport transfers.',
      gapAnalysis: 'What current options offer: a place to live, basic bilingual admin, and parking. What they do not solve: medical navigation, mental health support, education integration, spouse career support, or the operational friction that drives early repatriation. These are accommodations. They do not solve the problem. MoreHarvest is retention infrastructure.',
    },
  },
} as const satisfies Step;
