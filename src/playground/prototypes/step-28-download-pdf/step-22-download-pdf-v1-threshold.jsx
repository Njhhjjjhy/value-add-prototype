import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   step-28 download pdf — v1 "Threshold"
   Restrained, declarative. Canonical headline + body sit
   above a single amber pill CTA. Quiet confidence.
   Matches the "Threshold" transition.
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  amber: "#FBB931",
  amberPressed: "#E79B00",
  bg: "#F9F9F9",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';
const EASE_ARRIVE = "cubic-bezier(0,0,0.2,1)";

export default function Step22DownloadPdfThreshold() {
  const [mounted, setMounted] = useState(false);
  const [pressing, setPressing] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding:
            "calc(110px + var(--safe-top)) var(--content-margin) calc(64px + var(--safe-bottom))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          background: C.bg,
        }}
      >
        {/* Headline + body */}
        <div
          style={{
            maxWidth: 720,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 600ms ${EASE_ARRIVE}, transform 600ms ${EASE_ARRIVE}`,
          }}
        >
          <h1
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 48,
              color: C.heading,
              margin: 0,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            The full picture.
          </h1>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 500,
              fontSize: 18,
              color: C.body,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            The memo behind everything you just saw. Per-unit underwriting, comparables, exit analysis, and the parallel timeline in detail.
          </p>
        </div>

        {/* Primary button */}
        <button
            type="button"
            onPointerDown={() => setPressing(true)}
            onPointerUp={() => setPressing(false)}
            onPointerLeave={() => setPressing(false)}
            onPointerCancel={() => setPressing(false)}
            onClick={(e) => {
              e.preventDefault();
              // In production this will navigate to /pdf.
              // Prototype no-op so the playground stays sandboxed.
              // eslint-disable-next-line no-console
              console.log("[prototype] would navigate to /pdf");
            }}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 17,
              fontWeight: 600,
              color: C.heading,
              background: pressing ? C.amberPressed : C.amber,
              border: "none",
              borderRadius: 9999,
              padding: "0 36px",
              height: 56,
              minWidth: 240,
              boxShadow: pressing
                ? "0 1px 4px rgba(0,0,0,0.10)"
                : "0 2px 12px rgba(251,185,49,0.35), 0 1px 3px rgba(0,0,0,0.08)",
              transform: pressing ? "scale(0.98)" : mounted ? "scale(1)" : "scale(0.97)",
              opacity: mounted ? 1 : 0,
              transition:
                "transform 160ms cubic-bezier(0.4, 0, 0.2, 1), background 160ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 160ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms cubic-bezier(0,0,0.2,1) 220ms",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
          >
            Download PDF
          </button>
      </div>
  );
}
