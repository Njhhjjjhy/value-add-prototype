// Step 23 · Section 12 transition — risk to exit
// Source: value-add-source-of-truth.md
// The FAQ ghost lines below are the current canonical state in the source
// of truth. They echo Step 22's OLD 6-FAQ list. Once Step 22 is migrated to
// the new 5-risk framework (cleanup item #5), Step 23's ghost echoes need
// to be replaced with ghosts of the new 5-risk framework, or dropped. This
// is cleanup item #6 — tracked, will be revisited after Phase 5.

import type { Step } from '../types';

export const step23 = {
  step: 23,
  name: 'step-23-section-12-transition',
  type: 'transition',
  section: 12,
  prototype: {
    continueAriaLabel: 'Tap to continue',
    sectionGhostCaption: 'Risk factors',
    faqGhosts: [
      'What if TSMC slows down or pulls out?',
      'JPY volatility and rising rates?',
      'Construction over budget or delayed?',
      'How is GK-TK structure tax-efficient?',
      'What stops major hotel chains?',
      'What governance rights do TK investors have?',
    ],
    resolve: {
      sectionLabel: 'Section 12',
      headline: 'Exit strategy',
    },
    continuePrompt: 'Tap to continue',
  },
  pdf: 'not-applicable',
} as const satisfies Step;
