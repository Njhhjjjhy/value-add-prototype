// Step 16 · Section 8 product hardware
// Source: value-add-source-of-truth.md
// All visible UI within this step is provided by the external property-map
// iframe at
// public/playground/prototypes/step-12-section-6-product-hardware/map-prototype-v1/index.html.
// (The folder still uses the old "step-12" segment because the map-prototype
// sync workflow points at that path. See CLAUDE.md "Map embed sync".)
// The iframe copy lives in the sibling `map-prototype` project and has not
// yet been inventoried into this source-of-truth file. A separate inventory
// pass is required to complete this entry.

import type { Step } from '../types';

export const step16 = {
  step: 16,
  name: 'step-16-section-8-product-hardware',
  type: 'content',
  section: 8,
  prototype: {
    iframeTitle: 'Kumamoto property map',
  },
  pdf: 'tbd',
  // PDF-reserved copy for the product-hardware page. Not part of the
  // on-screen iframe spec. Migrated from src/data/productSpecs.ts
  // (HARDWARE_SPECS / INVESTMENT_PROPERTIES / VIRTUAL_TOUR_ROOMS) with one
  // canonical-name correction: the stale "Site 1...Site 5" list is replaced
  // by the single canonical property "Ozu-1" per CLAUDE.md. Move into the
  // `pdf` track above when the source of truth canonicalizes this content.
  pdfReserved: {
    hardwareSpecs: [
      { label: 'Target location', value: 'JASM corridor, within 15 min of fab' },
      { label: 'Total units', value: '100 units' },
      { label: 'Site size', value: 'Approximately 1,000 tsubo' },
      { label: 'Unit type', value: '3LDK, family-oriented' },
      { label: 'Air quality', value: 'Hanke HEPA filtration system' },
      { label: 'Water', value: 'Soft water plumbing throughout' },
      { label: 'EV charging', value: 'Delta EV charging stations' },
      { label: 'Lease model', value: 'B2B bulk lease to semiconductor companies' },
    ],
    investmentProperties: ['Ozu-1'],
    virtualTourRooms: [
      { id: 1, name: 'Building exterior', note: null },
      { id: 2, name: 'Lobby / common area', note: null },
      { id: 3, name: 'Living room', note: 'Hanke HEPA air filtration system' },
      { id: 4, name: 'Kitchen', note: null },
      { id: 5, name: 'Bedroom', note: null },
      { id: 6, name: 'Bathroom', note: 'Soft water plumbing throughout' },
    ],
  },
} as const satisfies Step;
