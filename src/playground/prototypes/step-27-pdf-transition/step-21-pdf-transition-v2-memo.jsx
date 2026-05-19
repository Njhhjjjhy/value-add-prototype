import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   step-21 pdf transition — v2 "Memo"
   "MEMO / FOR THE INVESTOR" stamps in at top-left, with
   a hairline drawing beneath. Like the cover page of a
   document being readied. Formal, document-aesthetic.
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  amber: "#FBB931",
  bg: "#F9F9F9",
  hairline: "rgba(0,0,0,0.12)",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';

export default function Step21PdfTransitionMemo() {
  const [phase, setPhase] = useState("idle");
  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("memo"), 80);
    const t2 = window.setTimeout(() => setPhase("subtitle"), 80 + 250);
    const t3 = window.setTimeout(() => setPhase("line"), 80 + 250 + 250);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  const showMemo = phase !== "idle";
  const showSubtitle = phase === "subtitle" || phase === "line";
  const showLine = phase === "line";

  return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding:
            "calc(100px + var(--safe-top)) var(--content-margin) var(--safe-bottom)",
          background: C.bg,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 14,
              fontWeight: 600,
              color: C.heading,
              letterSpacing: "0.20em",
              margin: 0,
              opacity: showMemo ? 1 : 0,
              transform: showMemo ? "translateY(0)" : "translateY(8px)",
              transition:
                "opacity 500ms cubic-bezier(0,0,0.2,1), transform 500ms cubic-bezier(0,0,0.2,1)",
            }}
          >
            MEMO
          </p>
          <p
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 14,
              fontWeight: 500,
              color: C.sub,
              letterSpacing: "0.20em",
              margin: 0,
              opacity: showSubtitle ? 1 : 0,
              transform: showSubtitle ? "translateY(0)" : "translateY(8px)",
              transition:
                "opacity 500ms cubic-bezier(0,0,0.2,1), transform 500ms cubic-bezier(0,0,0.2,1)",
            }}
          >
            FOR THE INVESTOR
          </p>
          <div
            style={{
              marginTop: 18,
              width: showLine ? 540 : 0,
              height: 1,
              background: C.hairline,
              transition: "width 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
          {/* Amber accent dot at the end of the line */}
          <div
            style={{
              marginTop: -7,
              marginLeft: showLine ? 534 : -6,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: C.amber,
              opacity: showLine ? 1 : 0,
              boxShadow: "0 0 10px rgba(251,185,49,0.6)",
              transition:
                "opacity 400ms cubic-bezier(0,0,0.2,1) 700ms, margin-left 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
        </div>
      </div>
  );
}
