// Step 8 · Section 4 parallel hook
// Source: value-add-source-of-truth.md
// The closing whisper "We'll come back to this." is set up here and paid
// off at Step 25 ("We said we'd come back to this."). Do not break this
// callback.

import type { Step } from '../types';

export const step8 = {
  step: 8,
  name: 'step-8-section-4-parallel-hook',
  type: 'content',
  section: 4,
  prototype: {
    sectionLabel: 'Section 4 · The macro thesis',
    headline: "You've seen this movie before.",
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
    divider: 'Same fab · Same pattern · 20 years apart',
    closingWhisper: "We'll come back to this.",
  },
  pdf: 'tbd',
} as const satisfies Step;
