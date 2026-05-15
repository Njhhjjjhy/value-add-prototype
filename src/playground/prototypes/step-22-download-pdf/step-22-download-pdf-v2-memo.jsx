import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   step-22 download pdf — v2 "Memo"
   Document-cover aesthetic: an elevated card centered on
   screen with eyebrow, title, subtitle, divider, and the
   amber CTA inside the card. Reads like a real investment
   memo cover ready to be picked up.
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  amber: "#FBB931",
  amberPressed: "#E79B00",
  bg: "#F9F9F9",
  hairline: "rgba(0,0,0,0.08)",
  hairlineSoft: "rgba(0,0,0,0.06)",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

export default function Step22DownloadPdfMemo() {
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
          padding: "var(--safe-top) var(--content-margin) var(--safe-bottom)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: C.bg,
        }}
      >
        <div
          style={{
            width: 560,
            background: C.bg,
            border: `1px solid ${C.hairline}`,
            borderRadius: 20,
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
            padding: "40px 44px 36px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0) scale(1)" : "translateY(20px) scale(0.985)",
            transition:
              "opacity 700ms cubic-bezier(0,0,0.2,1) 80ms, transform 700ms cubic-bezier(0,0,0.2,1) 80ms",
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 13,
              fontWeight: 600,
              color: C.caption,
              letterSpacing: "0.18em",
              margin: 0,
            }}
          >
            INVESTMENT MEMO
          </p>

          {/* Title */}
          <h2
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 36,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              fontWeight: 600,
              color: C.heading,
              margin: "12px 0 0",
            }}
          >
            Take the memo.
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 17,
              lineHeight: 1.5,
              color: C.body,
              margin: "12px 0 0",
              maxWidth: 420,
            }}
          >
            Ten sections, one document. Designed for offline review on the
            flight home.
          </p>

          {/* Hairline divider */}
          <div
            style={{
              marginTop: 28,
              marginBottom: 28,
              height: 1,
              background: C.hairlineSoft,
            }}
          />

          {/* CTA + meta row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
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
                fontSize: 16,
                fontWeight: 600,
                color: C.heading,
                background: pressing ? C.amberPressed : C.amber,
                border: "none",
                borderRadius: 9999,
                padding: "0 28px",
                height: 52,
                minWidth: 200,
                boxShadow: pressing
                  ? "0 1px 4px rgba(0,0,0,0.10)"
                  : "0 2px 12px rgba(251,185,49,0.35), 0 1px 3px rgba(0,0,0,0.08)",
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

            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 13,
                  color: C.caption,
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                PDF · iPad-optimized
              </p>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 13,
                  color: C.caption,
                  margin: "2px 0 0",
                  lineHeight: 1.4,
                }}
              >
                Opens in this tab
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
