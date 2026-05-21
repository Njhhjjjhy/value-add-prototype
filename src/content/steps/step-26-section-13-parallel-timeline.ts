// Step 26 · Section 13 parallel timeline
// Source: value-add-source-of-truth.md
// Heals cleanup item #7: the prototype closing is JUST the core callback
// line. The longer Moha Intel sentence moves to the PDF (`pdfMohaIntelLine`
// below) — this is the only place that sentence is canonical for the PDF.
//
// The callback line intentionally repeats on Step 22 beat 1 and Step 26
// closing — that repetition is the payoff for Step 8's setup.

import type { Step } from '../types';

export const step26 = {
  step: 26,
  name: 'step-26-section-13-parallel-timeline',
  type: 'content',
  section: 13,
  prototype: {
    sectionLabel: 'Section 13 · Parallel timeline',
    hsinchu: {
      headline: 'Hsinchu Science Park',
      caption: 'Zhubei · Hsinchu Corridor',
      badge: '2005 — 2018 · Verified outcome',
      timeline: [
        {
          years: '2004 – 2006',
          title: 'TSMC 12-inch fab expansion',
          detail:
            'Engineer population surpassed 100,000; inbound migration accelerated across Hsinchu County',
        },
        {
          years: '2007 – 2009',
          title: 'Acute residential supply gap',
          detail:
            'Zhubei land prices rose over 60% in 3 years; senior engineers housed in hotels for lack of alternatives',
        },
        {
          years: '2010 – 2012',
          title: 'Institutional developers enter',
          detail:
            'Far Glory, Cathay Real Estate begin land acquisition; early movers had already locked the best sites',
        },
        {
          years: '2013 – 2018',
          title: 'Market maturity · rental premium locks in',
          detail:
            "Premium apartments sustain 2-3x rental premium; Zhubei established as Taiwan's benchmark tech cluster",
        },
      ],
      metrics: [
        {
          stat: '+180%',
          label: 'Zhubei premium rent growth',
          sub: '2006-2015 cumulative',
        },
        {
          stat: '+60%',
          label: 'Zhubei land price appreciation',
          sub: '2007-2010 · 3-year window',
        },
      ],
    },
    kumamoto: {
      headline: 'Kumamoto Semiconductor Corridor',
      caption: 'Kikuyo · Ozu · Kumamoto City',
      badge: '2024 — 2035 · In progress',
      timeline: [
        {
          years: '2024 – 2025',
          title: 'JASM Fab 1 opens · Taiwanese engineers arrive',
          detail:
            '3,000-5,000 TSMC-dispatched engineers relocating; Kikuyo-cho land prices already up 40-80%',
        },
        {
          years: null,
          title: null,
          detail:
            '→ Now: residential supply gap, no premium developer has entered',
          isCallout: true,
        },
        {
          years: '2026 – 2028',
          title: 'Fab 2 confirmed · supply chain clusters form',
          detail:
            'Tier-2 suppliers land nearby; engineer families settle long-term, driving demand for family housing',
        },
        {
          years: '2029 – 2032',
          title: 'Developer competition · land price peak',
          detail:
            'Major Japanese developers enter; early-mover land cost advantage becomes unreplicable',
        },
        {
          years: '2033 – 2035',
          title: 'J-REIT exit window opens',
          detail:
            'Portfolio reaches REIT threshold; institutional acquisition or listed-vehicle exit',
        },
      ],
      metrics: [
        {
          stat: '+40-80%',
          label: 'Kikuyo-cho land appreciation',
          sub: '2022-2024',
        },
        {
          stat: '0',
          label: 'Existing Taiwan-grade premium residential supply in market',
          sub: 'MoreHarvest',
        },
      ],
    },
    closingLine:
      'Entering in 2025 is the equivalent of acquiring land in Zhubei in 2007.',
  },
  pdf: 'tbd',
  // PDF-reserved closing addendum. Per source of truth note (lines 773-777)
  // the longer Moha Intel sentence is NOT shown on screen but IS part of the
  // PDF closing. Phase 4 PDF wiring reads from here. Move into the `pdf`
  // track above when the source of truth is updated.
  pdfReserved: {
    // Word order matches Step 22 Beat 4 (source of truth line 613) for
    // cross-step consistency. The source of truth uses em-dashes in the
    // Step 26 note variant (line 775) — those are normalized to commas
    // here to comply with the CLAUDE.md "No emdashes" copy rule.
    mohaIntelLine:
      'We bring what no developer brought to Hsinchu then: Moha Intel, an AI-native platform that turns every asset into a data-generating node, compounding both NOI and proprietary market intelligence across the portfolio.',
  },
} as const satisfies Step;
