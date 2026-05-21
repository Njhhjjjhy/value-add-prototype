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
} as const satisfies Step;
