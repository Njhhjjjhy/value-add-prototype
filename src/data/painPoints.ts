export type PainPoint = {
  id: string;
  group: 'physical' | 'mental';
  label: string;
  cause: string;
  summary: string;
  expanded: string;
  companies: string[];
};

export const PAIN_POINTS = [
  // Physical pain points — render first, in this order
  {
    id: 'traffic-congestion',
    group: 'physical' as const,
    label: 'Traffic congestion',
    cause: 'Fab locations are remote, but workers live wherever they can find housing.',
    summary: '1 to 3 hours per day lost to traffic.',
    expanded:
      'Senior managers commuting from Kumamoto City to the fab corridor face up to 3 hours daily. Land prices within the JASM corridor have surged 40 to 80%, pushing workers further from their worksite.',
    companies: ['Topco', 'Marketech', 'Wholetech'],
  },
  {
    id: 'no-chinese-support',
    group: 'physical' as const,
    label: 'No Chinese-speaking support',
    cause: 'Relocated engineers are foreign nationals in an all-Japanese system.',
    summary: 'All-Japanese admin, no language support for daily life.',
    expanded:
      'Expatriates face Japanese-only property management, requiring 2 to 3 weeks to activate utilities, gas, and internet. Budgets of 200,000 to 300,000 yen find almost no furnished options with Chinese-language support.',
    companies: ['JASM', 'ASE', 'Elan Microelectronics'],
  },
  {
    id: 'administrative-burden',
    group: 'physical' as const,
    label: 'Administrative burden',
    cause: 'Short-term assignments mean constant move-in, move-out cycles for HR.',
    summary: 'Furniture, appliances, registration, waste disposal.',
    expanded:
      'HR departments must handle guarantor requirements, waste disposal procedures, furniture procurement, utility setup, and resident registration. The Japanese rental market is unfriendly to foreign nationals and nothing is turnkey.',
    companies: ['UIS', 'G2C Alliance'],
  },
  {
    id: 'housing-quality-anxiety',
    group: 'physical' as const,
    label: 'Housing quality anxiety',
    cause: 'Standard Japanese rentals were not designed for foreign family occupancy.',
    summary: 'Water quality, volcanic ash, and no property management buffer.',
    expanded:
      'Dependents commonly report anxiety about water quality (skin issues) and Mt. Aso volcanic ash cleanup. No professional property management buffer means frequent daily-life disputes including garbage sorting and noise.',
    companies: ['G2C Alliance'],
  },

  // Mental pain points — render second, in this order
  {
    id: 'limited-medical-access',
    group: 'mental' as const,
    label: 'Limited medical access',
    cause: 'Semiconductor work schedules leave no room for navigating a foreign healthcare system.',
    summary: 'No interpreter for emergencies, prenatal care, or vaccinations.',
    expanded:
      'There are almost no Chinese-speaking medical services in the Kumamoto corridor. Families face emergencies without an interpreter, prenatal checkups with no language support, and childhood vaccination schedules they cannot navigate alone.',
    companies: ['Topco', 'MA-tek'],
  },
  {
    id: 'mental-health-strain',
    group: 'mental' as const,
    label: 'Mental health strain',
    cause: 'High-pressure fab work combined with family instability creates compounding stress.',
    summary: 'No counseling access, no psychiatrist referrals in Chinese.',
    expanded:
      'Engineers report compounding stress from demanding fab schedules and family adjustment issues. There are no Chinese-language mental health services in Kumamoto. Spouses experiencing isolation have no professional support system available.',
    companies: ['JASM', 'MA-tek', 'LCY'],
  },
  {
    id: 'education-gaps',
    group: 'mental' as const,
    label: "Children's education gaps",
    cause: "Assignments last 2 to 5 years, but children cannot fall behind in Taiwan's curriculum.",
    summary: 'KIS slots limited, curriculum alignment is a major concern.',
    expanded:
      "Families worry their children cannot keep up with Japanese schools or will not be able to reintegrate into Taiwan's curriculum upon return. Kumamoto International School slots are extremely limited in 2026. No dedicated school buses serve the corridor.",
    companies: ['Topco', 'MA-tek', 'LCY'],
  },
  {
    id: 'kumamoto-lifestyle',
    group: 'mental' as const,
    label: 'Adapting to Kumamoto lifestyle',
    cause: 'Engineers and families are uprooted to a rural Japanese city with no transition support.',
    summary: 'Culture shock, daily friction, and social isolation.',
    expanded:
      'Dependents living in standard Japanese housing lack social interaction and Chinese-language support. Highly educated spouses without a social life often pressure employees to repatriate early.',
    companies: ['JASM', 'MA-tek', 'LCY', 'G2C Alliance'],
  },
] satisfies PainPoint[];

export const PHYSICAL_PAIN_POINTS = PAIN_POINTS.filter((p) => p.group === 'physical');
export const MENTAL_PAIN_POINTS = PAIN_POINTS.filter((p) => p.group === 'mental');

export const GROUP_LABELS: Record<'physical' | 'mental', string> = {
  physical: 'Physical',
  mental: 'Mental',
};

// Persona constants used by the PDF target-tenant page. Not part of the
// pain-points authoritative spec but kept here for PDF dependency parity.
export const PERSONA_STAT = {
  value: '3 to 5 million yen',
  label: 'estimated replacement cost per engineer who repatriates early due to family maladjustment.',
};

export const PERSONA_HEADING = '47,000 engineers need a home';

export const PERSONA_CONCEPT =
  "Semiconductor companies need housing solutions for relocated staff. An ideal solution goes beyond location and must be fully move-in ready. Our property management team includes Taiwanese staff, effectively reducing language barriers and day-to-day friction. We tailor our services to engineers' working schedules, helping them quickly adapt to living abroad.";

export const PERSONA_MESSAGE =
  'Tenants are employees from semiconductor companies on short- to long-term assignments. They need to settle in quickly and need move-in-ready accommodations to adapt to a new environment. This includes fully furnished units, reliable property management, and local support to minimize inconveniences caused by language and cultural differences. An ideal home allows them to focus on work without being distracted by day-to-day matters.';
