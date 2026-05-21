// Step 22 · Section 11 risk factors
// Source: value-add-source-of-truth.md
// Heals cleanup item #5: Beat 5 is the new 5-risk framework (liquidity/exit,
// demand concentration, infrastructure timing, tenant concentration,
// renovation/execution). The OLD 6 FAQ Q&A pairs in
// src/components/steps/step-22-section-11-risk-factors/index.tsx are
// retired and NOT migrated here.

import type { Step } from '../types';

export const step22 = {
  step: 22,
  name: 'step-22-section-11-risk-factors',
  type: 'content',
  section: 11,
  prototype: {
    continueAriaLabel: 'Tap to continue',
    beat1: {
      caption: 'Kumamoto semiconductor corridor, 2024 to 2035',
      headline:
        'Entering in 2025 is the equivalent of acquiring land in Zhubei in 2007.',
    },
    beat2: {
      captionLabel: 'Key data points',
      stats: [
        { stat: '1.7x', label: 'Land prices since 2020', sub: 'Prefecture-wide' },
        { stat: '33.3%', label: 'Annual gain, #1 in Japan', sub: 'Site 1, 2024' },
        { stat: '$20B+', label: 'Combined fab investment', sub: 'JASM Fab 1 and Fab 2' },
        { stat: '4T', label: 'Yen economic impact', sub: '10-year estimate' },
        { stat: '44', label: 'Companies drawn', sub: 'By TSMC to Kumamoto' },
        { stat: '~2x', label: 'Zhubei 5-year growth', sub: 'Hsinchu precedent' },
      ],
    },
    beat3: {
      captionLabel: 'Strategic timing',
      timeline: [
        {
          year: '2024-2025',
          title: 'Fab 1 opens',
          detail: 'Engineers arrive. Supply gap. No premium developer.',
        },
        {
          year: '2026-2028',
          title: 'Fab 2 operational',
          detail: 'Supply chain clusters. Investment exceeds $20B.',
        },
        {
          year: '2029-2032',
          title: 'Developer competition',
          detail: 'Major developers enter. Early-mover advantage locks.',
        },
        {
          year: '2033-2035',
          title: 'Exit window',
          detail: 'REIT threshold. Institutional acquisition.',
        },
      ],
    },
    beat4: {
      heading: 'Moha Intel',
      body: 'We bring what no developer brought to Hsinchu then: Moha Intel, an AI-native platform that turns every asset into a data-generating node, compounding both NOI and proprietary market intelligence across the portfolio.',
    },
    beat5: {
      caption: 'Risk factors',
      risks: [
        {
          name: 'Liquidity and exit (exit liquidity)',
          risk: 'If market liquidity declines, the speed or price of sale may be affected.',
          hedges: [
            'Choose products with dual demand for "owner-occupier + investment" to expand the buyer pool.',
            'Keep the total price per unit within a market-acceptable range.',
            'Maintain stable leases to increase investor willingness to take over (yield play).',
          ],
        },
        {
          name: 'Demand concentration',
          risk: "If TSMC's expansion slows or the semiconductor cycle turns down, this may affect expat housing and supply chain accommodation demand.",
          hedges: [
            "Tenants are not limited to TSMC, but also include Japan's local supply chain and related industries (Sony, equipment manufacturers, etc.).",
            'Choose areas with established living amenities to ensure properties can fall back on the general Japanese rental market.',
            'Adopt convertible products (can shift from corporate dormitory to standard family rental).',
          ],
        },
        {
          name: 'Infrastructure timing',
          risk: 'If construction progress on the Daiku Airport and surrounding infrastructure is delayed, this may affect regional appeal and rental growth.',
          hedges: [
            'Only deploy in mature areas that already have basic living amenities.',
            'Build on "existing demand" rather than relying entirely on future expectations.',
            'Control holding costs and investment cycles to reduce time-based risk exposure.',
          ],
        },
        {
          name: 'Tenant concentration',
          risk: 'If overly reliant on corporate tenants or a single leaseholder, vacancy or negotiation pressure may arise.',
          hedges: [
            'Diversify across multiple small units (multiple supply chain firms) rather than a single enterprise.',
            'Maintain product versatility to serve both expat staff and general tenants simultaneously.',
            'Furnished single-family homes are currently a highly scarce property type in the area.',
          ],
        },
        {
          name: 'Renovation and cost control (execution risk)',
          risk: 'Cost overruns or schedule delays in renovation will affect IRR and turnover efficiency.',
          hedges: [
            'Control scope of work (avoid over-customisation).',
            'Adopt a short-cycle strategy (1-2 months) to reduce variables.',
          ],
        },
      ],
    },
    backAriaLabel: 'Go back',
    nextAriaLabel: 'Continue to next step',
  },
  pdf: 'tbd',
} as const satisfies Step;
