import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   Step 9 — Section 5 transition (iPad Pro 13 M4)
   Minimal title card: heading + subheading only.

   Three motion proposals — same layout, different reveal:
     A "type-in"        — heading types word-by-word, subheading fades in
     B "slide-stack"    — heading slides up, subheading slides up after
     C "scale-reveal"   — heading scales from 0.96 + fade, subheading rises
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  bg: "#F9F9F9",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const HEADLINE = "Pain points";
const SUBHEADING = "What semiconductor families actually face in Kumamoto.";

export default function Step9SectionFiveTransition({ variant = "A" } = {}) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setKey((k) => k + 1), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      key={key}
      data-proto="step-9"
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
        @keyframes step9-fade-up {
          0%   { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes step9-fade-in {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes step9-scale-in {
          0%   { opacity: 0; transform: scale(0.96); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes step9-rise {
          0%   { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-9"] * {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>

      {variant === "A" && <TypeInVariant />}
      {variant === "B" && <SlideStackVariant />}
      {variant === "C" && <ScaleRevealVariant />}
    </div>
  );
}

function StageFrame({ children }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: "var(--content-margin)",
        paddingRight: "var(--content-margin)",
        gap: 24,
        maxWidth: 1120,
      }}
    >
      {children}
    </div>
  );
}

/* ── A: type-in — words appear one at a time ── */
function TypeInVariant() {
  const words = HEADLINE.split(" ");
  return (
    <StageFrame>
      <h1
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 120,
          lineHeight: 1.0,
          letterSpacing: "-0.035em",
          color: C.heading,
          margin: 0,
          display: "flex",
          gap: "0.32em",
        }}
      >
        {words.map((w, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: 0,
              animation: "step9-rise 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
              animationDelay: `${200 + i * 180}ms`,
            }}
          >
            {w}
          </span>
        ))}
      </h1>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 22,
          lineHeight: 1.45,
          color: C.body,
          margin: 0,
          maxWidth: 760,
          opacity: 0,
          animation: "step9-fade-in 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: `${200 + words.length * 180 + 200}ms`,
        }}
      >
        {SUBHEADING}
      </p>
    </StageFrame>
  );
}

/* ── B: slide-stack — heading then subheading slide up ── */
function SlideStackVariant() {
  return (
    <StageFrame>
      <h1
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 120,
          lineHeight: 1.0,
          letterSpacing: "-0.035em",
          color: C.heading,
          margin: 0,
          opacity: 0,
          animation: "step9-fade-up 800ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "200ms",
        }}
      >
        {HEADLINE}
      </h1>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 22,
          lineHeight: 1.45,
          color: C.body,
          margin: 0,
          maxWidth: 760,
          opacity: 0,
          animation: "step9-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "700ms",
        }}
      >
        {SUBHEADING}
      </p>
    </StageFrame>
  );
}

/* ── C: scale-reveal — heading scales from 0.96, subheading rises ── */
function ScaleRevealVariant() {
  return (
    <StageFrame>
      <h1
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 120,
          lineHeight: 1.0,
          letterSpacing: "-0.035em",
          color: C.heading,
          margin: 0,
          opacity: 0,
          transformOrigin: "left center",
          animation: "step9-scale-in 900ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "200ms",
        }}
      >
        {HEADLINE}
      </h1>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 22,
          lineHeight: 1.45,
          color: C.body,
          margin: 0,
          maxWidth: 760,
          opacity: 0,
          animation: "step9-rise 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "900ms",
        }}
      >
        {SUBHEADING}
      </p>
    </StageFrame>
  );
}
