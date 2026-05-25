// Step 8 · Section 4 parallel hook
// Source: value-add-source-of-truth.md
//
// QA round 1 trim: the section label, headline, divider, and closing
// whisper ("We'll come back to this.") were removed at the product owner's
// request. The previous callback to Step 25 ("We said we'd come back to
// this.") is therefore broken until product restores either side.

import type { Step } from '../types';

export const step8 = {
  step: 8,
  name: 'step-8-section-4-parallel-hook',
  type: 'content',
  section: 4,
  prototype: {
    left: {
      imageCaption: 'Hsinchu Science Park · 2005',
      body: "TSMC's 12-inch fab opens.",
      stat: '+120%',
      statCaption: 'Baoshan property prices, 3 years following',
    },
    right: {
      badge: 'Now',
      imageCaption: 'JASM Kumamoto · 2025',
      body: 'JASM Fab 1 opens.',
      stat: '+33%',
      statCaption: 'Ozu Town land prices, year-over-year · #1 in Japan',
    },
  },
  pdf: 'tbd',
} as const satisfies Step;
