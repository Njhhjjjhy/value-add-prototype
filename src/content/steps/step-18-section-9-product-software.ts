// Step 18 · Section 9 product software
// Source: value-add-source-of-truth.md
// "Software-defined real estate" intentionally repeats on the deck headline
// and the device lock-screen heading — the device mirrors the deck. Both
// strings are written literally below.

import type { Step } from '../types';

export const step18 = {
  step: 18,
  name: 'step-18-section-9-product-software',
  type: 'content',
  section: 9,
  prototype: {
    deck: {
      sectionLabel: 'Section 9 · Product, software',
      headline: 'Software-defined real estate',
      leadBody:
        'Taiwanese staff solve all problems, from daily logistics to language barriers. Nothing affects expected quality of life.',
      tiers: [
        {
          year: 'Year 1',
          name: 'Landing',
          tag: 'Included',
          items: 'Property secretary. Admin accompaniment. Maintenance.',
        },
        {
          year: 'Year 2',
          name: 'Family',
          tag: 'Add-on',
          items:
            'Medical navigation. Education support. Community events.',
        },
        {
          year: 'Year 3+',
          name: 'Wellness',
          tag: 'Premium',
          items: 'Mental health. Health management. Golf, onsen, culture.',
        },
      ],
      closingBody:
        'The software layer keeps growing. New modules pushed without modifying buildings.',
      button: 'See it in action',
    },
    device: {
      statusBar: { time: '9:41', signal: '5G' },
      introBody: 'Tap "See it in action" to begin',
      lockScreen: {
        heading: 'Software-defined real estate',
        body: 'What your phone looks like as a MoreHarvest resident.',
      },
      years: [
        {
          label: 'Year 1',
          sub: 'Landing',
          tag: 'Included',
          notifications: [
            {
              from: 'Lin Wei-Chen',
              message:
                'Your SoftBank appointment is confirmed for Thursday, 2:00 PM. I will meet you at the entrance.',
              time: '9:41 AM',
            },
            {
              from: 'Maintenance',
              message:
                'Delta AC unit in 4F serviced. Everything is running normally.',
              time: '2:15 PM',
            },
            {
              from: 'MoreHarvest',
              message:
                'Your residence guide is ready. Available in Chinese and Japanese.',
              time: '10:00 AM',
            },
          ],
        },
        {
          label: 'Year 2',
          sub: 'Family',
          tag: 'Add-on',
          notifications: [
            {
              from: 'Medical nav',
              message:
                'Dr. Tanaka appointment confirmed. Chinese interpreter arranged for 10:30 AM.',
              time: '8:20 AM',
            },
            {
              from: 'Education',
              message:
                'KIS school bus: Monday pickup at Building A, 7:45 AM. Driver is Mr. Oda.',
              time: '7:00 PM',
            },
            {
              from: 'Community',
              message:
                'Lunar New Year dinner at the residents lounge, January 25. RSVP open.',
              time: '3:30 PM',
            },
          ],
        },
        {
          label: 'Year 3+',
          sub: 'Wellness',
          tag: 'Premium',
          notifications: [
            {
              from: 'Wellness',
              message:
                'Your wellness check-in is Tuesday at 3:00 PM. Counselor Chen is available in Chinese.',
              time: '11:00 AM',
            },
            {
              from: 'Concierge',
              message:
                'Golf reservation confirmed. Aso Grand Vrio, Saturday 7:30 AM. Shuttle arranged.',
              time: '6:45 PM',
            },
            {
              from: 'Culture',
              message:
                'New: Kumamoto pottery workshop series. 4 sessions starting March 8.',
              time: '9:15 AM',
            },
          ],
        },
      ],
    },
    nextAriaLabel: 'Continue to next step',
  },
  pdf: 'tbd',
  // PDF-reserved copy for the product-software page. The on-screen
  // prototype.deck.tiers above is a compressed format (one `items` string per
  // tier); the PDF needs the full granular services list plus the
  // vaccination-scenario phone frames. Migrated verbatim from
  // src/data/productSpecs.ts (SERVICE_TIERS / PHONE_FRAMES). Move into the
  // `pdf` track above when the source of truth canonicalizes this content.
  pdfReserved: {
    serviceTiers: [
      {
        year: 'Year 1',
        label: 'Essential landing services',
        pricing: 'Included in base fees',
        services: [
          'Chinese-speaking property secretary',
          'Administrative accompaniment (bank, phone, registration)',
          'Hardware maintenance (Hanke, Delta)',
        ],
      },
      {
        year: 'Year 2',
        label: 'Family stability services',
        pricing: 'Subscription add-on',
        services: [
          'Medical navigation (24/7 Chinese-language booking, accompanied interpretation)',
          'Education support (KIS school bus, after-school tutoring)',
          'Spouse community events',
        ],
      },
      {
        year: 'Year 3+',
        label: 'Lifestyle and wellness services',
        pricing: 'Premium membership',
        services: [
          'Mental wellness (counseling, psychiatry referrals in Chinese)',
          'Health management (environmental data, nutritionist)',
          'Golf and onsen concierge',
          'Deep Kumamoto cultural experiences',
        ],
      },
      {
        year: 'Beyond',
        label: 'Continuous upgrades',
        pricing: '',
        services: [
          'Digital platform pushes new service modules without modifying buildings',
          'Roadmap expands based on tenant feedback and operational data',
        ],
      },
    ],
    phoneFrames: [
      { id: 1, type: 'notification', content: "Reminder: your child's vaccination appointment is tomorrow at 9:00 AM." },
      { id: 2, type: 'chat', content: 'Hi! I will accompany you tomorrow. I have confirmed the appointment with Dr. Tanaka at the clinic. I will meet you in the lobby at 8:30.' },
      { id: 3, type: 'card', content: "Translation card: child's medical history (Japanese translation prepared by secretary)." },
      { id: 4, type: 'chat', content: 'Dr. Tanaka says everything looks great. Next appointment is in 3 months. I will remind you then.' },
      { id: 5, type: 'final', content: 'One scenario. Zero friction. That is SDRE.' },
    ],
  },
} as const satisfies Step;
