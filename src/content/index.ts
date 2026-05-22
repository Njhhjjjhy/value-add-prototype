// Barrel export. Import any step's copy from '@/content'.
// Example: import { step20 } from '@/content';

export * from './types';
export { cast } from './cast';
export { citations } from './citations';
export { pdfChrome } from './pdf-chrome';

export { step1 } from './steps/step-1-opening-transition';
export { step2 } from './steps/step-2-section-1-entry';
export { step3 } from './steps/step-3-section-2-transition';
export { step4 } from './steps/step-4-section-2-bridge';
export { step5 } from './steps/step-5-section-3-transition';
export { step6 } from './steps/step-6-section-3-map';
export { step7 } from './steps/step-7-section-4-transition';
export { step8 } from './steps/step-8-section-4-parallel-hook';
export { step9 } from './steps/step-9-section-5-transition';
export { step10 } from './steps/step-10-section-5-pain-points';
export { step11 } from './steps/step-11-section-6-transition';
export { step12 } from './steps/step-12-section-6-persona';
export { step13 } from './steps/step-13-section-7-transition';
export { step14 } from './steps/step-14-section-7-current-options';
export { step15 } from './steps/step-15-section-8-transition';
export { step16 } from './steps/step-16-section-8-product-hardware';
export { step17 } from './steps/step-17-section-9-transition';
export { step18 } from './steps/step-18-section-9-product-software';
export { step19 } from './steps/step-19-section-10-transition';
export { step20 } from './steps/step-20-section-10-financials';
export { step21 } from './steps/step-21-section-11-transition';
export { step22 } from './steps/step-22-section-11-risk-factors';
export { step23 } from './steps/step-23-section-12-transition';
export { step24 } from './steps/step-24-section-12-exit-strategy';
export { step25 } from './steps/step-25-section-13-transition';
export { step26 } from './steps/step-26-section-13-parallel-timeline';
export { step27 } from './steps/step-27-pdf-transition';
export { step28 } from './steps/step-28-download-pdf';

import { step1 } from './steps/step-1-opening-transition';
import { step2 } from './steps/step-2-section-1-entry';
import { step3 } from './steps/step-3-section-2-transition';
import { step4 } from './steps/step-4-section-2-bridge';
import { step5 } from './steps/step-5-section-3-transition';
import { step6 } from './steps/step-6-section-3-map';
import { step7 } from './steps/step-7-section-4-transition';
import { step8 } from './steps/step-8-section-4-parallel-hook';
import { step9 } from './steps/step-9-section-5-transition';
import { step10 } from './steps/step-10-section-5-pain-points';
import { step11 } from './steps/step-11-section-6-transition';
import { step12 } from './steps/step-12-section-6-persona';
import { step13 } from './steps/step-13-section-7-transition';
import { step14 } from './steps/step-14-section-7-current-options';
import { step15 } from './steps/step-15-section-8-transition';
import { step16 } from './steps/step-16-section-8-product-hardware';
import { step17 } from './steps/step-17-section-9-transition';
import { step18 } from './steps/step-18-section-9-product-software';
import { step19 } from './steps/step-19-section-10-transition';
import { step20 } from './steps/step-20-section-10-financials';
import { step21 } from './steps/step-21-section-11-transition';
import { step22 } from './steps/step-22-section-11-risk-factors';
import { step23 } from './steps/step-23-section-12-transition';
import { step24 } from './steps/step-24-section-12-exit-strategy';
import { step25 } from './steps/step-25-section-13-transition';
import { step26 } from './steps/step-26-section-13-parallel-timeline';
import { step27 } from './steps/step-27-pdf-transition';
import { step28 } from './steps/step-28-download-pdf';

export const allSteps = [
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  step7,
  step8,
  step9,
  step10,
  step11,
  step12,
  step13,
  step14,
  step15,
  step16,
  step17,
  step18,
  step19,
  step20,
  step21,
  step22,
  step23,
  step24,
  step25,
  step26,
  step27,
  step28,
] as const;
