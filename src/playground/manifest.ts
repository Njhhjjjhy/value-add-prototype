import type { ComponentType } from "react";
import dynamic from "next/dynamic";

export type PrototypeVariant = {
  /** URL-safe id passed to the prototype via ?variant=<id>. */
  id: string;
  /** Chip label shown in the playground header. */
  label: string;
};

/* ───────────────────────────────────────────────────────
   Playground manifest
   Single source of truth for every step's status and
   the prototype files stored in its drawer.

   When a new prototype is added, register it here with
   its exact original filename and a dynamic import.
   ─────────────────────────────────────────────────────── */

export type StepStatus =
  | "locked"
  | "blocked"
  | "in-progress";

export type PrototypeFile = {
  /** Original filename, kept exactly as authored. */
  filename: string;
  /** "jsx" renders as a mounted React component. "html" iframes a static file in /public. */
  kind: "jsx" | "html";
  /** Only for kind === "jsx". Lazy component loader. May accept a `variant` prop. */
  // reason: `any` is intentional. Every prototype file is fully self-contained
  // per the playground isolation rule (CLAUDE.md), so they each have different
  // internal prop shapes (variant ids, component signatures). The manifest
  // treats them as opaque components; a shared generic type would force them
  // to share a contract, breaking the isolation.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: ComponentType<any>;
  /** Only for kind === "html". Absolute URL path under /public. */
  publicPath?: string;
  /**
   * Optional variant list. When present the playground renders chips in its
   * header and passes the selected id to the prototype via ?variant=<id>.
   * The prototype is responsible for reading the prop and rendering the
   * matching variant. Internal chips inside the prototype should be removed.
   */
  variants?: PrototypeVariant[];
  /**
   * True for prototypes that were designed at iPhone dimensions (393×852)
   * and still draw their own iPhone shell internally. The playground preview
   * will render a clean "pending iPad adaptation" placeholder for these
   * instead of loading the iPhone-framed content. Remove this flag once a
   * prototype has been redesigned at iPad Pro 13 dimensions.
   */
  iphoneEra?: boolean;
};

export type StepDrawer = {
  index: number;
  id: string;
  label: string;
  status: StepStatus;
  prototypes: PrototypeFile[];
};

const Step1OpeningTransition = dynamic(
  () =>
    import(
      "./prototypes/step-1-opening-transition/step-1-opening-transition.jsx"
    ),
  { ssr: false }
);

const Step2EntryTransitions = dynamic(
  () =>
    import(
      "./prototypes/step-2-section-1-entry/gktk-entry-transitions-5.jsx"
    ),
  { ssr: false }
);

const Step3Transition = dynamic(
  () =>
    import(
      "./prototypes/step-3-section-2-transition/gktk-step3-transition-v1.jsx"
    ),
  { ssr: false }
);

const Step4Bridge = dynamic(
  () =>
    import(
      "./prototypes/step-4-section-2-bridge/gktk-bridge-v11.jsx"
    ),
  { ssr: false }
);

const Step5Transition = dynamic(
  () =>
    import(
      "./prototypes/step-5-section-3-transition/gktk-step5-transition-v3.jsx"
    ),
  { ssr: false }
);

const Step7Transition = dynamic(
  () =>
    import(
      "./prototypes/step-11-section-6-transition/gktk-step7-transition-v6.jsx"
    ),
  { ssr: false }
);

const Step11Section6TransitionV1 = dynamic(
  () =>
    import(
      "./prototypes/step-11-section-6-transition/step-11-section-6-transition-v1.jsx"
    ),
  { ssr: false }
);

const Step9Transition = dynamic(
  () =>
    import(
      "./prototypes/step-13-section-7-transition/gktk-step9-transition-v6.jsx"
    ),
  { ssr: false }
);

const Step14CurrentOptionsV1 = dynamic(
  () =>
    import(
      "./prototypes/step-14-section-7-current-options/step-14-section-7-current-options-v1.jsx"
    ),
  { ssr: false }
);

const Step11Transition = dynamic(
  () =>
    import(
      "./prototypes/step-15-section-8-transition/gktk-step11-transition-v2.jsx"
    ),
  { ssr: false }
);

const Step13Transition = dynamic(
  () =>
    import(
      "./prototypes/step-17-section-9-transition/gktk-step13-transition-v2.jsx"
    ),
  { ssr: false }
);

const Step14ProductSoftware = dynamic(
  () =>
    import(
      "./prototypes/step-18-section-9-product-software/gktk-step14-product-software-v3.jsx"
    ),
  { ssr: false }
);

const Step15Transition = dynamic(
  () =>
    import(
      "./prototypes/step-19-section-10-transition/gktk-step15-transition.jsx"
    ),
  { ssr: false }
);

const Step15TransitionV2 = dynamic(
  () =>
    import(
      "./prototypes/step-19-section-10-transition/gktk-step15-transition-v2.jsx"
    ),
  { ssr: false }
);

const Step20FinancialsV1 = dynamic(
  () =>
    import(
      "./prototypes/step-20-section-10-financials/step-20-section-10-financials-v1.jsx"
    ),
  { ssr: false }
);

const Step17Transition = dynamic(
  () =>
    import(
      "./prototypes/step-21-section-11-transition/gktk-step17-transition-v5.jsx"
    ),
  { ssr: false }
);

const Step19Transition = dynamic(
  () =>
    import(
      "./prototypes/step-23-section-12-transition/gktk-step19-transition-v6.jsx"
    ),
  { ssr: false }
);

const Step24ExitStrategyV1 = dynamic(
  () =>
    import(
      "./prototypes/step-24-section-12-exit-strategy/step-24-section-12-exit-strategy-v1.jsx"
    ),
  { ssr: false }
);

const Step18RiskFactors = dynamic(
  () =>
    import(
      "./prototypes/step-22-section-11-risk-factors/gktk-step18-risk-factors-v8.jsx"
    ),
  { ssr: false }
);

const Step8PersonaSpecimen = dynamic(
  () =>
    import(
      "./prototypes/step-12-section-6-persona/step-8-persona-v1-specimen.jsx"
    ),
  { ssr: false }
);

const Step8PersonaDay = dynamic(
  () =>
    import(
      "./prototypes/step-12-section-6-persona/step-8-persona-v2-day.jsx"
    ),
  { ssr: false }
);

const Step8PersonaGrid = dynamic(
  () =>
    import(
      "./prototypes/step-12-section-6-persona/step-8-persona-v3-grid.jsx"
    ),
  { ssr: false }
);

const Step21PdfTransitionThreshold = dynamic(
  () =>
    import(
      "./prototypes/step-27-pdf-transition/step-21-pdf-transition-v1-threshold.jsx"
    ),
  { ssr: false }
);

const Step21PdfTransitionMemo = dynamic(
  () =>
    import(
      "./prototypes/step-27-pdf-transition/step-21-pdf-transition-v2-memo.jsx"
    ),
  { ssr: false }
);

const Step21PdfTransitionReveal = dynamic(
  () =>
    import(
      "./prototypes/step-27-pdf-transition/step-21-pdf-transition-v3-reveal.jsx"
    ),
  { ssr: false }
);

const Step22DownloadPdfThreshold = dynamic(
  () =>
    import(
      "./prototypes/step-28-download-pdf/step-22-download-pdf-v1-threshold.jsx"
    ),
  { ssr: false }
);

const Step22DownloadPdfMemo = dynamic(
  () =>
    import(
      "./prototypes/step-28-download-pdf/step-22-download-pdf-v2-memo.jsx"
    ),
  { ssr: false }
);

const Step22DownloadPdfReveal = dynamic(
  () =>
    import(
      "./prototypes/step-28-download-pdf/step-22-download-pdf-v3-reveal.jsx"
    ),
  { ssr: false }
);

// New step placeholder drawers (Phase 1 scaffolds; Phase 2 will add real variants).
const Step7Section4TransitionPlaceholder = dynamic(
  () =>
    import(
      "./prototypes/step-7-section-4-transition/step-7-section-4-transition-v0-placeholder.jsx"
    ),
  { ssr: false }
);

const Step7Section4TransitionV1 = dynamic(
  () =>
    import(
      "./prototypes/step-7-section-4-transition/step-7-section-4-transition-v1.jsx"
    ),
  { ssr: false }
);

const Step8ParallelHookPlaceholder = dynamic(
  () =>
    import(
      "./prototypes/step-8-section-4-parallel-hook/step-8-section-4-parallel-hook-v0-placeholder.jsx"
    ),
  { ssr: false }
);

const Step8ParallelHookV1 = dynamic(
  () =>
    import(
      "./prototypes/step-8-section-4-parallel-hook/step-8-section-4-parallel-hook-v1.jsx"
    ),
  { ssr: false }
);

const Step9Section5TransitionPlaceholder = dynamic(
  () =>
    import(
      "./prototypes/step-9-section-5-transition/step-9-section-5-transition-v0-placeholder.jsx"
    ),
  { ssr: false }
);

const Step9Section5TransitionV1 = dynamic(
  () =>
    import(
      "./prototypes/step-9-section-5-transition/step-9-section-5-transition-v1.jsx"
    ),
  { ssr: false }
);

const Step10PainPointsPlaceholder = dynamic(
  () =>
    import(
      "./prototypes/step-10-section-5-pain-points/step-10-section-5-pain-points-v0-placeholder.jsx"
    ),
  { ssr: false }
);

const Step10PainPointsV1 = dynamic(
  () =>
    import(
      "./prototypes/step-10-section-5-pain-points/step-10-section-5-pain-points-v1.jsx"
    ),
  { ssr: false }
);

const Step25Section13TransitionPlaceholder = dynamic(
  () =>
    import(
      "./prototypes/step-25-section-13-transition/step-25-section-13-transition-v0-placeholder.jsx"
    ),
  { ssr: false }
);

const Step25Section13TransitionV1 = dynamic(
  () =>
    import(
      "./prototypes/step-25-section-13-transition/step-25-section-13-transition-v1.jsx"
    ),
  { ssr: false }
);

const Step26ParallelTimelinePlaceholder = dynamic(
  () =>
    import(
      "./prototypes/step-26-section-13-parallel-timeline/step-26-section-13-parallel-timeline-v0-placeholder.jsx"
    ),
  { ssr: false }
);

const Step26ParallelTimelineV1 = dynamic(
  () =>
    import(
      "./prototypes/step-26-section-13-parallel-timeline/step-26-section-13-parallel-timeline-v1.jsx"
    ),
  { ssr: false }
);

export const STEPS: StepDrawer[] = [
  {
    index: 1,
    id: "step-1-opening-transition",
    label: "Opening transition",
    status: "locked",
    prototypes: [
      {
        filename: "step-1-opening-transition.jsx",
        kind: "jsx",
        component: Step1OpeningTransition,
        variants: [{ id: "A", label: "A: the mark" }],
      },
    ],
  },
  {
    index: 2,
    id: "step-2-section-1-entry",
    label: "Section 1 — entry",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-entry-transitions-5.jsx",
        kind: "jsx",
        component: Step2EntryTransitions,
        variants: [{ id: "A", label: "A: the warmth" }],
      },
    ],
  },
  {
    index: 3,
    id: "step-3-section-2-transition",
    label: "Section 2 — transition",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step3-transition-v1.jsx",
        kind: "jsx",
        component: Step3Transition,
        variants: [{ id: "1", label: "1: the sweep" }],
      },
    ],
  },
  {
    index: 4,
    id: "step-4-section-2-bridge",
    label: "Section 2 — bridge",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-bridge-v11.jsx",
        kind: "jsx",
        component: Step4Bridge,
        variants: [{ id: "A", label: "A: the counter" }],
      },
    ],
  },
  {
    index: 5,
    id: "step-5-section-3-transition",
    label: "Section 3 — transition",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step5-transition-v3.jsx",
        kind: "jsx",
        component: Step5Transition,
        variants: [{ id: "A", label: "A: the shutter" }],
      },
    ],
  },
  {
    index: 6,
    id: "step-6-section-3-map",
    label: "Section 3 — map",
    status: "locked",
    prototypes: [
      {
        filename: "map-prototype-v1.html",
        kind: "html",
        publicPath:
          "/playground/prototypes/step-6-section-3-map/map-prototype-v1/index.html?embed=1&host=valueadd&lang=en&steps=government-support,corporate-investment,transport-access&startStep=1",
      },
    ],
  },
  {
    index: 7,
    id: "step-7-section-4-transition",
    label: "Section 4 — transition",
    status: "in-progress",
    prototypes: [
      {
        filename: "step-7-section-4-transition-v1.jsx",
        kind: "jsx",
        component: Step7Section4TransitionV1,
        variants: [{ id: "A", label: "A: titlecard" }],
      },
      {
        filename: "step-7-section-4-transition-v0-placeholder.jsx",
        kind: "jsx",
        component: Step7Section4TransitionPlaceholder,
      },
    ],
  },
  {
    index: 8,
    id: "step-8-section-4-parallel-hook",
    label: "Section 4 — parallel hook",
    status: "in-progress",
    prototypes: [
      {
        filename: "step-8-section-4-parallel-hook-v1.jsx",
        kind: "jsx",
        component: Step8ParallelHookV1,
        variants: [{ id: "A", label: "A: mockup mirror" }],
      },
      {
        filename: "step-8-section-4-parallel-hook-v0-placeholder.jsx",
        kind: "jsx",
        component: Step8ParallelHookPlaceholder,
      },
    ],
  },
  {
    index: 9,
    id: "step-9-section-5-transition",
    label: "Section 5 — transition",
    status: "in-progress",
    prototypes: [
      {
        filename: "step-9-section-5-transition-v1.jsx",
        kind: "jsx",
        component: Step9Section5TransitionV1,
        variants: [
          { id: "A", label: "A: type-in" },
          { id: "B", label: "B: slide-stack" },
          { id: "C", label: "C: scale-reveal" },
        ],
      },
      {
        filename: "step-9-section-5-transition-v0-placeholder.jsx",
        kind: "jsx",
        component: Step9Section5TransitionPlaceholder,
      },
    ],
  },
  {
    index: 10,
    id: "step-10-section-5-pain-points",
    label: "Section 5 — pain points",
    status: "in-progress",
    prototypes: [
      {
        filename: "step-10-section-5-pain-points-v1.jsx",
        kind: "jsx",
        component: Step10PainPointsV1,
        variants: [{ id: "A", label: "A: grid" }],
      },
      {
        filename: "step-10-section-5-pain-points-v0-placeholder.jsx",
        kind: "jsx",
        component: Step10PainPointsPlaceholder,
      },
    ],
  },
  {
    index: 11,
    id: "step-11-section-6-transition",
    label: "Section 6 — transition",
    status: "in-progress",
    prototypes: [
      {
        filename: "step-11-section-6-transition-v1.jsx",
        kind: "jsx",
        component: Step11Section6TransitionV1,
        variants: [
          { id: "A", label: "A: descent" },
          { id: "B", label: "B: focuspull" },
          { id: "C", label: "C: cut" },
        ],
      },
      {
        filename: "gktk-step7-transition-v6.jsx",
        kind: "jsx",
        component: Step7Transition,
        variants: [
          { id: "B", label: "B: the descent" },
          { id: "D", label: "D: the warp" },
        ],
      },
    ],
  },
  {
    index: 12,
    id: "step-12-section-6-persona",
    label: "Section 6 — persona",
    status: "in-progress",
    prototypes: [
      {
        filename: "step-8-persona-v1-specimen.jsx",
        kind: "jsx",
        component: Step8PersonaSpecimen,
      },
      {
        filename: "step-8-persona-v2-day.jsx",
        kind: "jsx",
        component: Step8PersonaDay,
      },
      {
        filename: "step-8-persona-v3-grid.jsx",
        kind: "jsx",
        component: Step8PersonaGrid,
      },
    ],
  },
  {
    index: 13,
    id: "step-13-section-7-transition",
    label: "Section 7 — transition",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step9-transition-v6.jsx",
        kind: "jsx",
        component: Step9Transition,
      },
    ],
  },
  {
    index: 14,
    id: "step-14-section-7-current-options",
    label: "Section 7 — current options",
    status: "locked",
    prototypes: [
      {
        filename: "step-14-section-7-current-options-v1.jsx",
        kind: "jsx",
        component: Step14CurrentOptionsV1,
      },
    ],
  },
  {
    index: 15,
    id: "step-15-section-8-transition",
    label: "Section 8 — transition",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step11-transition-v2.jsx",
        kind: "jsx",
        component: Step11Transition,
        variants: [
          { id: "B", label: "B: the tilt" },
          { id: "C", label: "C: the corridor" },
        ],
      },
    ],
  },
  {
    index: 16,
    id: "step-16-section-8-product-hardware",
    label: "Section 8 — product hardware",
    status: "locked",
    prototypes: [
      {
        filename: "map-prototype-v1.html",
        kind: "html",
        publicPath:
          "/playground/prototypes/step-12-section-6-product-hardware/map-prototype-v1/index.html?embed=1&host=valueadd&lang=en&steps=properties&properties=ozu-1&startStep=1&v=102",
      },
    ],
  },
  {
    index: 17,
    id: "step-17-section-9-transition",
    label: "Section 9 — transition",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step13-transition-v2.jsx",
        kind: "jsx",
        component: Step13Transition,
        variants: [
          { id: "B", label: "B: the lift" },
          { id: "D", label: "D: the push" },
        ],
      },
    ],
  },
  {
    index: 18,
    id: "step-18-section-9-product-software",
    label: "Section 9 — product software",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step14-product-software-v3.jsx",
        kind: "jsx",
        component: Step14ProductSoftware,
        variants: [
          { id: "A", label: "A: the lock screen" },
          { id: "B", label: "B: the thread" },
        ],
      },
    ],
  },
  {
    index: 19,
    id: "step-19-section-10-transition",
    label: "Section 10 — transition",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step15-transition-v2.jsx",
        kind: "jsx",
        component: Step15TransitionV2,
      },
      {
        filename: "gktk-step15-transition.jsx",
        kind: "jsx",
        component: Step15Transition,
      },
    ],
  },
  {
    index: 20,
    id: "step-20-section-10-financials",
    label: "Section 10 — financials",
    status: "locked",
    prototypes: [
      {
        filename: "step-20-section-10-financials-v1.jsx",
        kind: "jsx",
        component: Step20FinancialsV1,
      },
    ],
  },
  {
    index: 21,
    id: "step-21-section-11-transition",
    label: "Section 11 — transition",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step17-transition-v5.jsx",
        kind: "jsx",
        component: Step17Transition,
        variants: [
          { id: "recede", label: "C: the recede" },
          { id: "shutter", label: "D: the shutter" },
        ],
      },
    ],
  },
  {
    index: 22,
    id: "step-22-section-11-risk-factors",
    label: "Section 11 — risk factors",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step18-risk-factors-v8.jsx",
        kind: "jsx",
        component: Step18RiskFactors,
        variants: [
          { id: "A", label: "A: the crescendo" },
          { id: "D", label: "D: the parallax" },
        ],
      },
    ],
  },
  {
    index: 23,
    id: "step-23-section-12-transition",
    label: "Section 12 — transition",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step19-transition-v6.jsx",
        kind: "jsx",
        component: Step19Transition,
        variants: [
          { id: "A", label: "A: the lift" },
          { id: "B", label: "B: the settle" },
        ],
      },
    ],
  },
  {
    index: 24,
    id: "step-24-section-12-exit-strategy",
    label: "Section 12 — exit strategy",
    status: "locked",
    prototypes: [
      {
        filename: "step-24-section-12-exit-strategy-v1.jsx",
        kind: "jsx",
        component: Step24ExitStrategyV1,
      },
    ],
  },
  {
    index: 25,
    id: "step-25-section-13-transition",
    label: "Section 13 — transition",
    status: "in-progress",
    prototypes: [
      {
        filename: "step-25-section-13-transition-v1.jsx",
        kind: "jsx",
        component: Step25Section13TransitionV1,
        variants: [
          { id: "A", label: "A: callback" },
          { id: "B", label: "B: sweep" },
          { id: "C", label: "C: anchor" },
        ],
      },
      {
        filename: "step-25-section-13-transition-v0-placeholder.jsx",
        kind: "jsx",
        component: Step25Section13TransitionPlaceholder,
      },
    ],
  },
  {
    index: 26,
    id: "step-26-section-13-parallel-timeline",
    label: "Section 13 — parallel timeline",
    status: "in-progress",
    prototypes: [
      {
        filename: "step-26-section-13-parallel-timeline-v1.jsx",
        kind: "jsx",
        component: Step26ParallelTimelineV1,
        variants: [
          { id: "A", label: "A: vertical rail" },
          { id: "B", label: "B: horizontal arc" },
          { id: "C", label: "C: card grid" },
        ],
      },
      {
        filename: "step-26-section-13-parallel-timeline-v0-placeholder.jsx",
        kind: "jsx",
        component: Step26ParallelTimelinePlaceholder,
      },
    ],
  },
  {
    index: 27,
    id: "step-27-pdf-transition",
    label: "PDF transition (handoff)",
    status: "in-progress",
    prototypes: [
      {
        filename: "step-21-pdf-transition-v1-threshold.jsx",
        kind: "jsx",
        component: Step21PdfTransitionThreshold,
      },
      {
        filename: "step-21-pdf-transition-v2-memo.jsx",
        kind: "jsx",
        component: Step21PdfTransitionMemo,
      },
      {
        filename: "step-21-pdf-transition-v3-reveal.jsx",
        kind: "jsx",
        component: Step21PdfTransitionReveal,
      },
    ],
  },
  {
    index: 28,
    id: "step-28-download-pdf",
    label: "Download PDF",
    status: "in-progress",
    prototypes: [
      {
        filename: "step-22-download-pdf-v1-threshold.jsx",
        kind: "jsx",
        component: Step22DownloadPdfThreshold,
      },
      {
        filename: "step-22-download-pdf-v2-memo.jsx",
        kind: "jsx",
        component: Step22DownloadPdfMemo,
      },
      {
        filename: "step-22-download-pdf-v3-reveal.jsx",
        kind: "jsx",
        component: Step22DownloadPdfReveal,
      },
    ],
  },
];

export function findStep(id: string): StepDrawer | undefined {
  return STEPS.find((s) => s.id === id);
}

export function findPrototype(
  stepId: string,
  filename: string
): PrototypeFile | undefined {
  return findStep(stepId)?.prototypes.find((p) => p.filename === filename);
}

export const STATUS_LABEL: Record<StepStatus, string> = {
  locked: "Locked",
  blocked: "Blocked",
  "in-progress": "In progress",
};

export const STATUS_COLOR: Record<
  StepStatus,
  { bg: string; fg: string; dot: string }
> = {
  locked: { bg: "rgba(25,182,78,0.12)", fg: "#0D8A3A", dot: "#19B64E" },
  blocked: { bg: "rgba(208,49,49,0.10)", fg: "#A3282A", dot: "#D03131" },
  "in-progress": { bg: "rgba(251,185,49,0.16)", fg: "#8C5E00", dot: "#FBB931" },
};
