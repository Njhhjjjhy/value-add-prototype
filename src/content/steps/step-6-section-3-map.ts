// Step 6 · Section 3 map
// Source: value-add-source-of-truth.md
// All visible UI within this step is provided by the external map iframe at
// public/playground/prototypes/step-6-section-3-map/map-prototype-v1/index.html.
// The copy inside the iframe is owned by the sibling `map-prototype` project
// and has not yet been inventoried into this source-of-truth file. A
// separate inventory pass is required to complete this entry.

import type { Step } from '../types';

export const step6 = {
  step: 6,
  name: 'step-6-section-3-map',
  type: 'content',
  section: 3,
  prototype: {
    iframeTitle: 'Kumamoto map',
  },
  pdf: 'tbd',
  // PDF-reserved copy for the market-context page. Not part of the on-screen
  // iframe spec. Migrated verbatim from src/data/mapSteps.ts and the inline
  // stats previously hardcoded in src/components/pdf/pages/market-context.tsx
  // so the PDF wiring can read from a single source. Move into the `pdf`
  // track above when the source of truth canonicalizes this content.
  pdfReserved: {
    sectionTitle: 'Kumamoto semiconductor corridor',
    sectionSubtitle: 'Four pillars of the investment thesis',
    pillars: [
      {
        id: 1,
        title: 'Government support',
        body: "Japan's 10 trillion+ yen semiconductor subsidy program, backed by METI and Kumamoto prefecture, is funding infrastructure across the corridor, including roads, water systems, and power grid expansion.",
      },
      {
        id: 2,
        title: 'Corporate investment',
        body: 'TSMC, Sony, Tokyo Electron, ASML, and 44+ supply chain companies have committed to Kumamoto. This is not a single-company bet. It is an ecosystem.',
      },
      {
        id: 3,
        title: 'Science park and grand airport',
        body: 'Kumamoto is building a dedicated science park zone and expanding its airport. The long-term vision: a self-sustaining semiconductor ecosystem, not just a factory town.',
      },
      {
        id: 4,
        title: 'Future outlook',
        body: '47,000+ new jobs. Population growth accelerating. Rental demand forecasts rising for decades. This is where the real estate opportunity begins.',
      },
    ],
    stats: [
      { value: '47,000+', label: 'New jobs being created in the corridor' },
      { value: '10T+ yen', label: 'Government semiconductor subsidy program' },
      { value: '44+', label: 'Supply chain companies committed to Kumamoto' },
      { value: '12-15%', label: 'Target IRR over 4-5 years' },
    ],
  },
} as const satisfies Step;
