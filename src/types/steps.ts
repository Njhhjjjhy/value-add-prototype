export type StepType = 'transition' | 'content';

export interface StepConfig {
  id: number;
  name: string;
  type: StepType;
  section?: number;
  label: string;
}

export const STEPS: StepConfig[] = [
  { id: 1,  name: 'step-1-opening-transition',                  type: 'transition', section: undefined, label: 'Opening' },
  { id: 2,  name: 'step-2-section-1-entry',                     type: 'content',    section: 1,         label: 'Entry' },
  { id: 3,  name: 'step-3-section-2-transition',                type: 'transition', section: 2,         label: 'Bridge transition' },
  { id: 4,  name: 'step-4-section-2-bridge',                    type: 'content',    section: 2,         label: 'Bridge' },
  { id: 5,  name: 'step-5-section-3-transition',                type: 'transition', section: 3,         label: 'Map transition' },
  { id: 6,  name: 'step-6-section-3-map',                       type: 'content',    section: 3,         label: 'Map' },
  { id: 7,  name: 'step-7-section-4-transition',                type: 'transition', section: 4,         label: 'Parallel hook transition' },
  { id: 8,  name: 'step-8-section-4-parallel-hook',             type: 'content',    section: 4,         label: 'Parallel hook' },
  { id: 9,  name: 'step-9-section-5-transition',                type: 'transition', section: 5,         label: 'Pain points transition' },
  { id: 10, name: 'step-10-section-5-pain-points',              type: 'content',    section: 5,         label: 'Pain points' },
  { id: 11, name: 'step-11-section-6-transition',               type: 'transition', section: 6,         label: 'Persona transition' },
  { id: 12, name: 'step-12-section-6-persona',                  type: 'content',    section: 6,         label: 'Persona' },
  { id: 13, name: 'step-13-section-7-transition',               type: 'transition', section: 7,         label: 'Current options transition' },
  { id: 14, name: 'step-14-section-7-current-options',          type: 'content',    section: 7,         label: 'Current options' },
  { id: 15, name: 'step-15-section-8-transition',               type: 'transition', section: 8,         label: 'Product hardware transition' },
  { id: 16, name: 'step-16-section-8-product-hardware',         type: 'content',    section: 8,         label: 'Product hardware' },
  { id: 17, name: 'step-17-section-9-transition',               type: 'transition', section: 9,         label: 'Product software transition' },
  { id: 18, name: 'step-18-section-9-product-software',         type: 'content',    section: 9,         label: 'Product software' },
  { id: 19, name: 'step-19-section-10-transition',              type: 'transition', section: 10,        label: 'Financials transition' },
  { id: 20, name: 'step-20-section-10-financials',              type: 'content',    section: 10,        label: 'Financials' },
  { id: 21, name: 'step-21-section-11-transition',              type: 'transition', section: 11,        label: 'Risk factors transition' },
  { id: 22, name: 'step-22-section-11-risk-factors',            type: 'content',    section: 11,        label: 'Risk factors' },
  { id: 23, name: 'step-23-section-12-transition',              type: 'transition', section: 12,        label: 'Exit strategy transition' },
  { id: 24, name: 'step-24-section-12-exit-strategy',           type: 'content',    section: 12,        label: 'Exit strategy' },
  { id: 25, name: 'step-25-section-13-transition',              type: 'transition', section: 13,        label: 'Parallel timeline transition' },
  { id: 26, name: 'step-26-section-13-parallel-timeline',       type: 'content',    section: 13,        label: 'Parallel timeline' },
  { id: 27, name: 'step-27-pdf-transition',                     type: 'transition', section: undefined, label: 'PDF transition' },
  { id: 28, name: 'step-28-download-pdf',                       type: 'content',    section: undefined, label: 'Download PDF' },
];
