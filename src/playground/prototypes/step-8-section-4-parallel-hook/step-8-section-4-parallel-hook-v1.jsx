import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   Step 8 — Section 4 parallel hook (content)
   Locked copy per docs/value-add-prototype-flow-feedback.md §3.
   "We'll come back to this." closer is locked across all variants.

   Variants — same locked copy, different layout treatment:
     A "mockup-mirror" — side-by-side cards, full color (matches the mockup)
     B "bw"            — side-by-side cards, B&W image treatment per stakeholder note
     C "stacked"       — vertical stacking (Hsinchu top, Kumamoto bottom)
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  disabled: "#8E8F8F",
  amber: "#FBB931",
  bg: "#F9F9F9",
  panel: "#F9F9F9",
  border: "rgba(0,0,0,0.06)",
  borderStrong: "rgba(0,0,0,0.08)",
  rule: "rgba(0,0,0,0.10)",
  imgWarm: "linear-gradient(135deg, #E9D9B8 0%, #C7A876 50%, #8E7547 100%)",
  imgCool: "linear-gradient(135deg, #C9D3DA 0%, #8FA0AE 50%, #5B6B78 100%)",
  imgBw: "linear-gradient(135deg, #D9D9D9 0%, #9E9E9E 50%, #595959 100%)",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

// Locked copy — do not edit
const COPY = {
  eyebrow: "SECTION 4",
  headline: "You've seen this movie before.",
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
  bridge: "Same fab · Same pattern · 20 years apart",
  closer: "We'll come back to this.",
};

export default function Step8SectionFourParallelHook({ variant = "A" } = {}) {
  const [key, setKey] = useState(0);

  // Replay so reviewer can re-watch the reveal
  useEffect(() => {
    const id = setInterval(() => setKey((k) => k + 1), 9000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      key={key}
      data-proto="step-8"
      data-variant={variant}
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        overflow: "hidden",
        fontFamily: FONT_BODY,
        padding:
          "calc(96px + var(--safe-top)) var(--content-margin) calc(64px + var(--safe-bottom))",
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      <style>{`
        @keyframes step8-fade-up {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes step8-rule-grow {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes step8-count {
          0%   { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Header variant={variant} />
      {variant === "C" ? <StackedLayout /> : <SideBySideLayout bw={variant === "B"} />}
      <BridgeAndCloser />
    </div>
  );
}

/* ── shared header (eyebrow + headline) ── */

function Header({ variant }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: 0,
          animation: "step8-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "100ms",
        }}
      >
        <div
          style={{
            width: 48,
            height: 1,
            background: C.amber,
            transformOrigin: "left center",
            animation: "step8-rule-grow 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
            animationDelay: "150ms",
          }}
        />
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.18em",
            color: C.caption,
          }}
        >
          {COPY.eyebrow}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <h1
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 56,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: C.heading,
            margin: 0,
            opacity: 0,
            animation: "step8-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
            animationDelay: "300ms",
          }}
        >
          {COPY.headline}
        </h1>
        <span
          style={{
            fontSize: 13,
            color: C.disabled,
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
          }}
        >
          {labelFor(variant)}
        </span>
      </div>
    </div>
  );
}

/* ── side-by-side (variants A and B) ── */

function SideBySideLayout({ bw }) {
  return (
    <div
      style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 40,
        minHeight: 0,
      }}
    >
      <ParallelCard side="left" data={COPY.left} bw={bw} delay={500} />
      <ParallelCard side="right" data={COPY.right} bw={bw} delay={750} />
    </div>
  );
}

/* ── vertical stacked (variant C) ── */

function StackedLayout() {
  return (
    <div
      style={{
        flex: 1,
        display: "grid",
        gridTemplateRows: "1fr 1fr",
        gap: 24,
        minHeight: 0,
      }}
    >
      <ParallelCard side="left" data={COPY.left} bw={false} delay={500} compact />
      <ParallelCard side="right" data={COPY.right} bw={false} delay={750} compact />
    </div>
  );
}

/* ── single card ── */

function ParallelCard({ side, data, bw, delay, compact = false }) {
  const isNow = side === "right";
  const imageBg = bw ? C.imgBw : isNow ? C.imgCool : C.imgWarm;

  return (
    <div
      style={{
        background: C.panel,
        border: `1px solid ${isNow ? C.borderStrong : C.border}`,
        borderRadius: 20,
        padding: 28,
        display: compact ? "grid" : "flex",
        gridTemplateColumns: compact ? "1fr 1.2fr" : undefined,
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
      {/* "Now" badge on the right card */}
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

      {/* Image placeholder */}
      <div
        style={{
          background: imageBg,
          borderRadius: 12,
          aspectRatio: compact ? undefined : "16 / 10",
          minHeight: compact ? 200 : 0,
          display: "flex",
          alignItems: "flex-end",
          padding: 16,
          filter: bw ? "grayscale(1) contrast(1.05)" : "none",
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

      {/* Card body */}
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

/* ── bridge line + closer ── */

function BridgeAndCloser() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        opacity: 0,
        animation: "step8-fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
        animationDelay: "1600ms",
      }}
    >
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 17,
          letterSpacing: "0.04em",
          color: C.sub,
        }}
      >
        {COPY.bridge}
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontStyle: "italic",
          fontSize: 18,
          color: C.caption,
          opacity: 0,
          animation: "step8-fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "2100ms",
        }}
      >
        {COPY.closer}
      </div>
    </div>
  );
}

function labelFor(variant) {
  if (variant === "B") return "B · B&W treatment";
  if (variant === "C") return "C · stacked";
  return "A · mockup mirror";
}
