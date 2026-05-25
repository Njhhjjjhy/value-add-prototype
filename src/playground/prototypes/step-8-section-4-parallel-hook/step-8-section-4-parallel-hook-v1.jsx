import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   Step 8 — Section 4 parallel hook
   Variant A "mockup-mirror" — side-by-side cards, full color.
   QA round 1: header (eyebrow + headline), bridge line, and
   closing whisper all removed. Just the two cards remain.
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  body: "#40444C",
  caption: "#5B616E",
  amber: "#FBB931",
  bg: "#F9F9F9",
  panel: "#F9F9F9",
  border: "rgba(0,0,0,0.06)",
  borderStrong: "rgba(0,0,0,0.08)",
  imgWarm: "linear-gradient(135deg, #E9D9B8 0%, #C7A876 50%, #8E7547 100%)",
  imgCool: "linear-gradient(135deg, #C9D3DA 0%, #8FA0AE 50%, #5B6B78 100%)",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const COPY = {
  left: {
    imageCaption: "Hsinchu Science Park · 2005",
    body: "TSMC's 12-inch fab opens.",
    stat: "+120%",
    statCaption: "Baoshan property prices, 3 years following",
  },
  right: {
    imageCaption: "JASM Kumamoto · 2025",
    body: "JASM Fab 1 opens.",
    stat: "+33%",
    statCaption: "Ozu Town land prices, year-over-year · #1 in Japan",
    badge: "Now",
  },
};

export default function Step8SectionFourParallelHook() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setKey((k) => k + 1), 9000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      key={key}
      data-proto="step-8"
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        overflow: "hidden",
        fontFamily: FONT_BODY,
        padding:
          "calc(96px + var(--safe-top)) var(--content-margin) calc(96px + var(--safe-bottom))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        @keyframes step8-fade-up {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes step8-count {
          0%   { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
        }}
      >
        <ParallelCard side="left" data={COPY.left} delay={300} />
        <ParallelCard side="right" data={COPY.right} delay={550} />
      </div>
    </div>
  );
}

function ParallelCard({ side, data, delay }) {
  const isNow = side === "right";
  const imageBg = isNow ? C.imgCool : C.imgWarm;

  return (
    <div
      style={{
        background: C.panel,
        border: `1px solid ${isNow ? C.borderStrong : C.border}`,
        borderRadius: 20,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        position: "relative",
        boxShadow: isNow
          ? "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)"
          : "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        opacity: 0,
        animation: "step8-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
        animationDelay: `${delay}ms`,
      }}
    >
      {isNow && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: C.amber,
            color: C.heading,
            fontFamily: FONT_BODY,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.06em",
            padding: "4px 10px",
            borderRadius: 999,
          }}
        >
          {data.badge}
        </div>
      )}

      <div
        style={{
          background: imageBg,
          borderRadius: 12,
          aspectRatio: "16 / 10",
          display: "flex",
          alignItems: "flex-end",
          padding: 16,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontFamily: FONT_BODY,
            color: "rgba(255,255,255,0.92)",
            letterSpacing: "0.04em",
            textShadow: "0 1px 2px rgba(0,0,0,0.4)",
          }}
        >
          {data.imageCaption}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 17,
            lineHeight: 1.5,
            color: C.body,
          }}
        >
          {data.body}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 12,
            marginTop: 4,
            opacity: 0,
            animation: "step8-count 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
            animationDelay: `${delay + 600}ms`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 72,
              lineHeight: 1,
              letterSpacing: "-0.025em",
              color: isNow ? C.amber : C.heading,
            }}
          >
            {data.stat}
          </span>
        </div>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 13,
            lineHeight: 1.45,
            color: C.caption,
          }}
        >
          {data.statCaption}
        </div>
      </div>
    </div>
  );
}
