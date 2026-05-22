// PDF-only "book parts" that are not tied to any of the 28 deck steps:
// the cover page, the back page, and the 9 section-divider tab pages.
// These live here so that every piece of user-visible copy in the project
// resolves to src/content/. See value-add-source-of-truth.md → "PDF book parts".

export const pdfChrome = {
  cover: {
    // Rendered with line breaks in cover.tsx. Each entry is one visible line.
    headlineLines: [
      'Kumamoto',
      'semiconductor corridor',
      'serviced apartments.',
    ],
  },
  backPage: {
    companyName: 'MoreHarvest',
    email: 'Hello@moreharvest.com',
    website: 'www.moreharvest.com',
    disclaimer: 'Confidential. For qualified investors only.',
  },
  sectionDividers: [
    { number: '01', title: 'Executive summary' },
    { number: '02', title: 'Market context' },
    { number: '03', title: 'Target tenant' },
    { number: '04', title: 'Current options' },
    { number: '05', title: 'Product: hardware' },
    { number: '06', title: 'Product: software' },
    { number: '07', title: 'Financial projections' },
    { number: '08', title: 'Risk factors' },
    { number: '09', title: 'Exit strategy' },
  ],
} as const;

export type PdfChrome = typeof pdfChrome;
