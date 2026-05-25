/* ───────────────────────────────────────────────────────
   Step 24 — Section 12 exit strategy (content)
   Canonical (verified by Riaan 2026-05-21):
     headline:    "One door."
     subheadline: "Sell to other buyers with the master lease in place."
     body:        Kumamoto structural demand paragraph.

   Mirrors the production component at
   src/components/steps/step-24-section-12-exit-strategy/index.tsx
   exactly: layout, type sizes, color, easing, durations.

   No CTA. No 2-card grid. No stat tiles. No Download PDF.
   Single full-viewport statement, left-aligned.

   Self-contained: no imports from src/components or src/content.
   Wraps content in the iPad Pro 13 M4 canvas via absolute fill
   on #F9F9F9, respecting --safe-top, --content-margin, --safe-bottom.
   ─────────────────────────────────────────────────────── */

const C = {
  bg: "#F9F9F9",
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const COPY = {
  sectionLabel: "Section 12 · Exit strategy",
  headline: "One door.",
  subheadline: "Sell to other buyers with the master lease in place.",
  body:
    "Kumamoto's housing demand is structural, not cyclical. The same engineer migration that drove Hsinchu for two decades is just starting here. When the time comes to exit, the buyers are there: owner-occupiers, yield investors, or institutional vehicles taking on a portfolio with a stable lease already attached.",
};

// ease-spring per design system
const EASE_SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

export default function Step24SectionTwelveExitStrategy({
  variant = "A",
  orientation = "landscape",
} = {}) {
  // variant + orientation kept in the signature for playground parity;
  // this step is a single statement, so neither alters the layout beyond
  // what CSS orientation queries on --content-margin already provide.
  void variant;
  void orientation;

  return (
    <div
      data-proto="step-24"
      data-variant={variant}
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        overflow: "hidden",
        fontFamily: FONT_BODY,
      }}
    >
      <style>{`
        @keyframes step24-fade-up {
          0%   { opacity: 0; transform: translateY(24px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          paddingTop: "calc(110px + var(--safe-top))",
          paddingBottom: "calc(64px + var(--safe-bottom))",
          paddingLeft: "var(--content-margin)",
          paddingRight: "var(--content-margin)",
          textAlign: "left",
        }}
      >
        <div style={{ maxWidth: 1280 }}>
          {/* Section label */}
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              letterSpacing: "0.01em",
              color: C.caption,
              marginBottom: 16,
              opacity: 0,
              animation: `step24-fade-up 350ms ${EASE_SPRING} both`,
              animationDelay: "0ms",
            }}
          >
            {COPY.sectionLabel}
          </div>

          {/* Headline — display 72 / 1.05 / -0.03em */}
          <h1
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: C.heading,
              margin: 0,
              marginBottom: 24,
              opacity: 0,
              animation: `step24-fade-up 350ms ${EASE_SPRING} both`,
              animationDelay: "100ms",
            }}
          >
            {COPY.headline}
          </h1>

          {/* Subheadline — heading-2 32 / 1.15 / -0.02em */}
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 32,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: C.sub,
              marginBottom: 48,
              maxWidth: 880,
              opacity: 0,
              animation: `step24-fade-up 350ms ${EASE_SPRING} both`,
              animationDelay: "200ms",
            }}
          >
            {COPY.subheadline}
          </div>

          {/* Body — body-lg 18 / 1.6 */}
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 18,
              lineHeight: 1.6,
              color: C.body,
              maxWidth: 880,
              margin: 0,
              opacity: 0,
              animation: `step24-fade-up 350ms ${EASE_SPRING} both`,
              animationDelay: "300ms",
            }}
          >
            {COPY.body}
          </p>
        </div>
      </div>
    </div>
  );
}
