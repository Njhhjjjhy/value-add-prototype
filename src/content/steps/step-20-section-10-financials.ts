// Step 20 · Section 10 financials
// Source: value-add-source-of-truth.md
// These are the canonical underwriting numbers (5% / 7.5% / 10% IRR,
// ¥35M initial capital, ¥1.88M net profit). The OLD ¥2B / 50-50 / bull-
// normal-bear matrix in src/data/financials.ts is retired and must not be
// referenced. The OLD 18.4% / 2.1x / 8.7% ghost numbers on Step 21
// (cleanup item #4) are placeholder decoration and must not be migrated.

import type { Step } from '../types';

export const step20 = {
  step: 20,
  name: 'step-20-section-10-financials',
  type: 'content',
  section: 10,
  prototype: {
    sectionLabel: 'Section 10 · Underwriting',
    headline: 'The numbers.',
    development: [
      {
        row: 'Initial capital',
        value: '¥35,000,000',
        note: 'Land, building, renovation, furniture, appliances and related costs',
        party: 'J Estate Co. Ltd.',
      },
    ],
    returnOnInvestment: [
      { scenario: '1 unit per year', return: '5.00%' },
      { scenario: '1.5 units per year', return: '7.50%' },
      { scenario: '2 units per year', return: '10.00%' },
    ],
    rentalYield: [
      { scenario: 'Rent (high) · ¥190,000 / month', yield: '5.00%' },
      { scenario: 'Rent (average) · ¥160,000 / month', yield: '4.21%' },
    ],
    salesRevenue: [
      {
        row: 'Sale price',
        value: '¥45,600,000',
        note: 'Consumption tax included',
      },
    ],
    salesCosts: [
      {
        row: 'Guaranteed investor interest income',
        value: '¥1,750,000',
        note: '5% per annum',
        party: null,
      },
      {
        row: 'Agency commission',
        value: '¥1,368,000',
        note: '3% of sale price, excl. consumption tax',
        party: 'MasterHouse Real Estate',
      },
      {
        row: 'Travel expenses — sales team',
        value: '¥300,000',
        note: '3 trips (property introduction, contract signing, handover) · ¥100,000 per trip',
        party: 'J Estate Co. Ltd.',
      },
      {
        row: 'Travel expenses — MoreHarvest',
        value: '¥120,000',
        note: '1 trip (property introduction) · flights and hotel',
        party: 'MoreHarvest',
      },
      {
        row: 'Entertainment — sales team',
        value: '¥150,000',
        note: 'Sales-related hospitality',
        party: 'J Estate Co. Ltd.',
      },
      {
        row: 'Entertainment — MoreHarvest',
        value: '¥150,000',
        note: 'Sales-related hospitality',
        party: 'MoreHarvest',
      },
      {
        row: 'Sales-related expenses',
        value: '¥800,000',
        note: 'Leasing agent fees, advertising, transportation and other actual costs',
        party: 'J Estate Co. Ltd.',
      },
      {
        row: 'Sales support — Taiwan',
        value: '¥456,000',
        note: 'Briefings and backend data system · 1% of sale price',
        party: 'MoreHarvest',
      },
      {
        row: 'Sales support — Japan',
        value: '¥501,600',
        note: 'Kumamoto-side property tours and briefings · 1% of sale price',
        party: 'J Estate Co. Ltd.',
      },
    ],
    netResult: [
      { row: 'Profit (pre-tax)', value: '¥5,004,400', note: null, party: null },
      {
        row: 'Corporate tax',
        value: '¥1,751,540',
        note: 'Japan corporate tax',
        party: null,
      },
      {
        row: 'Property warranty',
        value: '¥1,368,000',
        note: '10-year property warranty · 3% of base price',
        party: 'J Estate Co. Ltd.',
      },
      {
        row: 'Net profit',
        value: '¥1,884,860',
        note: 'Shared between J Estate Co. Ltd. and MoreHarvest',
        party: null,
      },
    ],
    irrClosing: [
      'This strategy focuses on acquiring existing properties for renovation, with a typical construction period of 1 to 2 months. Sales can be initiated during the renovation phase, effectively shortening capital deployment time.',
      'Compared to ground-up development projects, the investment cycle is significantly shorter. Under normal conditions, two full cycles (acquisition, renovation, sale) can be completed within a year, enhancing capital efficiency.',
      'Overall, this is a short-cycle, lower-risk, and high-efficiency investment model.',
    ],
  },
  pdf: 'tbd',
} as const satisfies Step;
