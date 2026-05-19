import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   step-21 pdf transition — v3 "Reveal"
   A dark band sweeps in from the left, covers the screen,
   holds, then sweeps out to the right — a curtain pull
   that signals "the show is over, the document follows."
   Cinematic, slightly dramatic.
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  amber: "#FBB931",
  bg: "#F9F9F9",
  curtain: "#25272C",
};

const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

export default function Step21PdfTransitionReveal() {
  // Phases: idle → sweeping-in → hold → sweeping-out
  const [phase, setPhase] = useState("idle");
  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("sweeping-in"), 80);
    const t2 = window.setTimeout(() => setPhase("hold"), 80 + 600);
    const t3 = window.setTimeout(() => setPhase("sweeping-out"), 80 + 600 + 250);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  // The curtain band slides as one piece. Its left edge starts at -100%
  // (off-screen left), arrives at 0 (covering screen), then exits to 100%
  // (off-screen right).
  let curtainLeft = "-100%";
  if (phase === "sweeping-in" || phase === "hold") curtainLeft = "0%";
  if (phase === "sweeping-out") curtainLeft = "100%";

  return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: C.bg,
        }}
      >
        {/* Static "thank you" text underneath, revealed as the curtain leaves */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--safe-top) var(--content-margin) var(--safe-bottom)",
          }}
        >
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 500,
              color: C.caption,
              letterSpacing: "0.18em",
              margin: 0,
              opacity: phase === "sweeping-out" ? 1 : 0,
              transition: "opacity 500ms cubic-bezier(0,0,0.2,1) 200ms",
            }}
          >
            ONE MORE THING
          </p>
        </div>

        {/* The curtain */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: curtainLeft,
            width: "100%",
            height: "100%",
            background: C.curtain,
            transition:
              phase === "sweeping-in"
                ? "left 600ms cubic-bezier(0.4, 0, 1, 1)"
                : phase === "sweeping-out"
                ? "left 500ms cubic-bezier(0.0, 0.0, 0.2, 1)"
                : "none",
            zIndex: 2,
          }}
        >
          {/* Amber accent line down the trailing edge of the curtain */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 2,
              height: "100%",
              background: C.amber,
              boxShadow: "0 0 24px rgba(251,185,49,0.5)",
              opacity: phase === "sweeping-in" || phase === "hold" ? 1 : 0,
              transition: "opacity 200ms cubic-bezier(0,0,0.2,1)",
            }}
          />
        </div>
      </div>
  );
}
