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
} as const satisfies Step;
