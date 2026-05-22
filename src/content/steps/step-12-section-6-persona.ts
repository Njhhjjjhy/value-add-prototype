// Step 12 · Section 6 persona
// Source: value-add-source-of-truth.md
// Meeting 1 explicitly required pain points before persona. The deck order
// (Step 10 → Step 11 → Step 12) preserves that.

import type { Step } from '../types';

export const step12 = {
  step: 12,
  name: 'step-12-section-6-persona',
  type: 'content',
  section: 6,
  prototype: {
    sectionLabel: 'Section 6 · Demand',
    headline: 'Who lives here.',
    personaAlt: 'The semiconductor engineer — JASM / TSMC supply chain',
    sectionSubtitle: 'TENANT PROFILE',
    personaTitle: 'The semiconductor engineer',
    personaSubtitle: 'JASM / TSMC supply chain · rotational deployment',
    constraints: [
      {
        index: '01',
        label: 'Proximity',
        body: '10-minute drive to the fab. Non-negotiable for shift-based and emergency call-ins.',
      },
      {
        index: '02',
        label: 'Stay length',
        body: 'Short business stays to mid- and long-term assignments. Months, not nights.',
      },
      {
        index: '03',
        label: 'Group size',
        body: 'Small teams of 3 to 4. Travel together, work together, prefer to live together.',
      },
      {
        index: '04',
        label: 'Logistics',
        body: 'Multiple cars per household. Parking is a hard requirement, not a perk.',
      },
    ],
    closingLine:
      'A hotel room is a compromise. A studio apartment is a compromise. A 4LDK shared home is the format this tenant has been waiting for.',
  },
  // The on-screen prototype shows the constraint cards above. The PDF
  // target-tenant page 1 reads the three persona copy blocks below.
  pdf: {
    personaHeading: '47,000 engineers need a home',
    personaConcept:
      "Semiconductor companies need housing solutions for relocated staff. An ideal solution goes beyond location and must be fully move-in ready. Our property management team includes Taiwanese staff, effectively reducing language barriers and day-to-day friction. We tailor our services to engineers' working schedules, helping them quickly adapt to living abroad.",
    personaMessage:
      'Tenants are employees from semiconductor companies on short- to long-term assignments. They need to settle in quickly and need move-in-ready accommodations to adapt to a new environment. This includes fully furnished units, reliable property management, and local support to minimize inconveniences caused by language and cultural differences. An ideal home allows them to focus on work without being distracted by day-to-day matters.',
  },
} as const satisfies Step;
