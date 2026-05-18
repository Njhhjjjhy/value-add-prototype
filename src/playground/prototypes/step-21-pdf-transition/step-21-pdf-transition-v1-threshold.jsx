import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   step-21 pdf transition — v1 "Threshold"
   A thin amber line draws across mid-screen while the
   phrase "End of presentation" fades in above it; both
   fade out together. Restrained, declarative, the
   visual cue that the pitch is wrapping up.
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  amber: "#FBB931",
  bg: "#F9F9F9",
  hairline: "rgba(0,0,0,0.08)",
};

const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

export default function Step21PdfTransitionThreshold() {
  // Phases: idle → drawing → hold → fading-out
  const [phase, setPhase] = useState("idle");
  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("drawing"), 80);
    const t2 = window.setTimeout(() => setPhase("hold"), 80 + 700);
    const t3 = window.setTimeout(() => setPhase("fading-out"), 80 + 700 + 250);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  const lineDrawn = phase === "drawing" || phase === "hold" || phase === "fading-out";
  const visible = phase !== "fading-out" && phase !== "idle";

  return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "var(--safe-top) var(--content-margin) var(--safe-bottom)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: C.bg,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            opacity: phase === "fading-out" ? 0 : 1,
            transition: "opacity 400ms cubic-bezier(0.4, 0, 1, 1)",
          }}
        >
          {/* Caption */}
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 500,
              color: C.caption,
              letterSpacing: "0.16em",
              margin: 0,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(6px)",
              transition:
                "opacity 500ms cubic-bezier(0,0,0.2,1) 80ms, transform 500ms cubic-bezier(0,0,0.2,1) 80ms",
            }}
          >
            END OF PRESENTATION
          </p>

          {/* Amber line — animates its width from 0 to 320px */}
          <div
            style={{
              width: lineDrawn ? 320 : 0,
              height: 2,
              background: C.amber,
              borderRadius: 2,
              boxShadow: lineDrawn ? "0 0 24px rgba(251,185,49,0.5)" : "none",
              transition:
                "width 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
        </div>
      </div>
  );
}
