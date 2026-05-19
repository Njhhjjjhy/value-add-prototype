import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   step-9 section-5 transition — iPad Pro 13 M4
   Cinematic question reveal. Single variant.
   beat 0: blank/breathe (300ms)
   beat 1: question fades in
   beat 2: (reserved / no-op)
   beat 3: tap prompt appears, viewport becomes tappable
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  disabled: "#8E8F8F",
  amber: "#FBB931",
  bg: "#F9F9F9",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

export default function Step9Transition({
  variant = "A",
  orientation = "landscape",
} = {}) {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setBeat(1), 300);
    const t2 = setTimeout(() => setBeat(2), 900);
    const t3 = setTimeout(() => setBeat(3), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Keep the variant/orientation props referenced for future iterations.
  void variant;
  void orientation;

  return (
    <div
      data-proto="step-9"
      role="button"
      tabIndex={0}
      aria-label="Tap to continue"
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "manipulation",
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-9"] *,
          [data-proto="step-9"] *::before,
          [data-proto="step-9"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>

      {/* The question — centered editorial reveal */}
      <div
        style={{
          position: "absolute",
          top: "calc(110px + var(--safe-top))",
          bottom: "calc(160px + var(--safe-bottom))",
          left: "var(--content-margin)",
          right: "var(--content-margin)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1
          aria-live="polite"
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 72,
            lineHeight: 1.05,
            color: C.heading,
            letterSpacing: "-0.03em",
            margin: 0,
            maxWidth: 1080,
            opacity: beat >= 1 ? 1 : 0,
            transform: beat >= 1 ? "translateY(0)" : "translateY(24px)",
            transition:
              "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          So what does a real solution look like?
        </h1>
      </div>

      {/* Tap prompt */}
      <div
        aria-live="polite"
        style={{
          position: "absolute",
          bottom: "calc(72px + var(--safe-bottom))",
          left: "var(--content-margin)",
          right: "var(--content-margin)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: beat >= 3 ? 1 : 0,
          transition: "opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: C.amber,
          }}
        />
        <span
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 500,
            fontSize: 13,
            letterSpacing: "0.015em",
            color: C.disabled,
          }}
        >
          Tap to continue
        </span>
      </div>
    </div>
  );
}
