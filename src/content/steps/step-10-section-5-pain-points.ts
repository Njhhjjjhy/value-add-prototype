// Step 10 · Section 5 pain points
// Source: value-add-source-of-truth.md
//
// The 8 pain points are the authoritative spec from
// docs/gktk-value-add-prototype-pain-points.md (4 physical, then 4 mental).
// Each carries an `expanded` paragraph, a `cause` line, and a `companies`
// list. The on-screen prototype renders id/label/summary only; the PDF
// target-tenant page reads the full expanded/cause/companies fields.

import type { Step } from '../types';

const physical = [
  {
    id: 'traffic-congestion',
    label: 'Traffic congestion',
    summary: '1 to 3 hours per day lost to traffic.',
    cause:
      'Fab locations are remote, but workers live wherever they can find housing.',
    expanded:
      'Senior managers commuting from Kumamoto City to the fab corridor face up to 3 hours daily. Land prices within the JASM corridor have surged 40 to 80%, pushing workers further from their worksite.',
    companies: ['Topco', 'Marketech', 'Wholetech'],
  },
  {
    id: 'no-chinese-support',
    label: 'No Chinese-speaking support',
    summary: 'All-Japanese admin, no language support for daily life.',
    cause:
      'Relocated engineers are foreign nationals in an all-Japanese system.',
    expanded:
      'Expatriates face Japanese-only property management, requiring 2 to 3 weeks to activate utilities, gas, and internet. Budgets of 200,000 to 300,000 yen find almost no furnished options with Chinese-language support.',
    companies: ['JASM', 'ASE', 'Elan Microelectronics'],
  },
  {
    id: 'administrative-burden',
    label: 'Administrative burden',
    summary: 'Furniture, appliances, registration, waste disposal.',
    cause:
      'Short-term assignments mean constant move-in, move-out cycles for HR.',
    expanded:
      'HR departments must handle guarantor requirements, waste disposal procedures, furniture procurement, utility setup, and resident registration. The Japanese rental market is unfriendly to foreign nationals and nothing is turnkey.',
    companies: ['UIS', 'G2C Alliance'],
  },
  {
    id: 'housing-quality-anxiety',
    label: 'Housing quality anxiety',
    summary: 'Water quality, volcanic ash, and no property management buffer.',
    cause:
      'Standard Japanese rentals were not designed for foreign family occupancy.',
    expanded:
      'Dependents commonly report anxiety about water quality (skin issues) and Mt. Aso volcanic ash cleanup. No professional property management buffer means frequent daily-life disputes including garbage sorting and noise.',
    companies: ['G2C Alliance'],
  },
] as const;

const mental = [
  {
    id: 'limited-medical-access',
    label: 'Limited medical access',
    summary: 'No interpreter for emergencies, prenatal care, or vaccinations.',
    cause:
      'Semiconductor work schedules leave no room for navigating a foreign healthcare system.',
    expanded:
      'There are almost no Chinese-speaking medical services in the Kumamoto corridor. Families face emergencies without an interpreter, prenatal checkups with no language support, and childhood vaccination schedules they cannot navigate alone.',
    companies: ['Topco', 'MA-tek'],
  },
  {
    id: 'mental-health-strain',
    label: 'Mental health strain',
    summary: 'No counseling access, no psychiatrist referrals in Chinese.',
    cause:
      'High-pressure fab work combined with family instability creates compounding stress.',
    expanded:
      'Engineers report compounding stress from demanding fab schedules and family adjustment issues. There are no Chinese-language mental health services in Kumamoto. Spouses experiencing isolation have no professional support system available.',
    companies: ['JASM', 'MA-tek', 'LCY'],
  },
  {
    id: 'education-gaps',
    label: "Children's education gaps",
    summary: 'KIS slots limited, curriculum alignment is a major concern.',
    cause:
      "Assignments last 2 to 5 years, but children cannot fall behind in Taiwan's curriculum.",
    expanded:
      "Families worry their children cannot keep up with Japanese schools or will not be able to reintegrate into Taiwan's curriculum upon return. Kumamoto International School slots are extremely limited in 2026. No dedicated school buses serve the corridor.",
    companies: ['Topco', 'MA-tek', 'LCY'],
  },
  {
    id: 'kumamoto-lifestyle',
    label: 'Adapting to Kumamoto lifestyle',
    summary: 'Culture shock, daily friction, and social isolation.',
    cause:
      'Engineers and families are uprooted to a rural Japanese city with no transition support.',
    expanded:
      'Dependents living in standard Japanese housing lack social interaction and Chinese-language support. Highly educated spouses without a social life often pressure employees to repatriate early.',
    companies: ['JASM', 'MA-tek', 'LCY', 'G2C Alliance'],
  },
] as const;

export const step10 = {
  step: 10,
  name: 'step-10-section-5-pain-points',
  type: 'content',
  section: 5,
  prototype: {
    sectionLabel: 'Section 5 · Pain points',
    headline: 'What semiconductor families actually face in Kumamoto.',
    groupLabels: { physical: 'Physical strain', mental: 'Mental strain' },
    physical: physical.map(({ id, label, summary }) => ({
      id,
      label,
      summary,
    })),
    mental: mental.map(({ id, label, summary }) => ({ id, label, summary })),
    personaStat: {
      value: '3 to 5 million yen',
      label:
        'estimated replacement cost per engineer who repatriates early due to family maladjustment.',
    },
  },
  pdf: { physical, mental },
} as const satisfies Step;
