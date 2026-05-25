import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   Step 7 — Section 4 transition (parallel hook transition IN)
   Variant A "titlecard" — film-title fade-up, left-aligned.
   Section eyebrow + amber rule + debug label removed per QA round 1.
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  bg: "#F9F9F9",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const HEADLINE = "You've seen this movie before.";

export default function Step7SectionFourTransition() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setKey((k) => k + 1), 5400);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      key={key}
      data-proto="step-7"
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        overflow: "hidden",
        fontFamily: FONT_BODY,
      }}
    >
      <style>{`
        @keyframes step7-fade-up {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-7"] * {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>

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
        }}
      >
        <h1
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 96,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: C.heading,
            margin: 0,
            maxWidth: 1120,
            opacity: 0,
            animation: "step7-fade-up 800ms cubic-bezier(0.22, 1, 0.36, 1) both",
            animationDelay: "300ms",
          }}
        >
          {HEADLINE}
        </h1>
      </div>
    </div>
  );
}
