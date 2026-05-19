import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   step-22 download pdf — v3 "Reveal"
   Large display "Thank you." with a generous subtitle and
   an oversized amber CTA. Anchored to the upper-middle
   third per iPadOS HIG, biased upward. Cinematic, lots
   of breathing room. Matches the "Reveal" transition.
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

export default function Step22DownloadPdfReveal() {
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
            "calc(160px + var(--safe-top)) var(--content-margin) var(--safe-bottom)",
          background: C.bg,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: 880,
          }}
        >
          {/* Amber accent line */}
          <div
            style={{
              width: mounted ? 48 : 0,
              height: 2,
              background: C.amber,
              borderRadius: 2,
              boxShadow: "0 0 12px rgba(251,185,49,0.4)",
              transition: "width 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 80ms",
            }}
          />

          {/* Display heading */}
          <h1
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 600,
              color: C.heading,
              margin: "32px 0 0",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 700ms cubic-bezier(0,0,0.2,1) 200ms, transform 700ms cubic-bezier(0,0,0.2,1) 200ms",
            }}
          >
            Thank you.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 22,
              lineHeight: 1.45,
              color: C.sub,
              fontWeight: 400,
              margin: "20px 0 0",
              maxWidth: 720,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(10px)",
              transition:
                "opacity 700ms cubic-bezier(0,0,0.2,1) 380ms, transform 700ms cubic-bezier(0,0,0.2,1) 380ms",
            }}
          >
            Take the memo with you. Ten sections, one document, for the flight
            home.
          </p>

          {/* CTA */}
          <div
            style={{
              marginTop: 56,
              display: "flex",
              alignItems: "center",
              gap: 22,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(10px)",
              transition:
                "opacity 700ms cubic-bezier(0,0,0.2,1) 580ms, transform 700ms cubic-bezier(0,0,0.2,1) 580ms",
            }}
          >
            <button
              type="button"
              onPointerDown={() => setPressing(true)}
              onPointerUp={() => setPressing(false)}
              onPointerLeave={() => setPressing(false)}
              onPointerCancel={() => setPressing(false)}
              onClick={(e) => {
                e.preventDefault();
                // eslint-disable-next-line no-console
                console.log("[prototype] would navigate to /pdf");
              }}
              style={{
                fontFamily: FONT_BODY,
                fontSize: 18,
                fontWeight: 600,
                color: C.heading,
                background: pressing ? C.amberPressed : C.amber,
                border: "none",
                borderRadius: 9999,
                padding: "0 40px",
                height: 60,
                minWidth: 280,
                boxShadow: pressing
                  ? "0 1px 4px rgba(0,0,0,0.10)"
                  : "0 4px 20px rgba(251,185,49,0.40), 0 1px 3px rgba(0,0,0,0.08)",
                transform: pressing ? "scale(0.98)" : "scale(1)",
                transition:
                  "transform 160ms cubic-bezier(0.4, 0, 0.2, 1), background 160ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 160ms cubic-bezier(0.4, 0, 0.2, 1)",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                userSelect: "none",
                WebkitUserSelect: "none",
              }}
            >
              Download PDF
            </button>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 13,
                fontWeight: 500,
                color: C.caption,
                letterSpacing: "0.04em",
                margin: 0,
              }}
            >
              Investment memo · opens in this tab
            </p>
          </div>
        </div>
      </div>
  );
}
