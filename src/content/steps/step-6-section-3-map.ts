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
} as const satisfies Step;
