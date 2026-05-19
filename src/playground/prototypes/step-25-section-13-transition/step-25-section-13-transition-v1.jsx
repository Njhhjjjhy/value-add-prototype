import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   Step 25 — Section 13 transition (parallel timeline transition IN)
   Bridges step 24 (exit strategy) into step 26 (parallel timeline content).
   Direct callback to step 8's locked closer "We'll come back to this."

   Variants — same callback, different reveal:
     A "callback" — quiet whisper, italic line resolves to section heading
     B "sweep"    — horizontal sweep reveals a bare 2005–2035 axis
     C "anchor"   — two year anchors drop into place with a thud
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  disabled: "#8E8F8F",
  amber: "#FBB931",
  bg: "#F9F9F9",
  rule: "rgba(0,0,0,0.10)",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const CALLBACK = "We said we'd come back to this.";
const EYEBROW = "SECTION 13";
const HEADLINE = "Parallel timeline";

export default function Step25SectionThirteenTransition({ variant = "A" } = {}) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setKey((k) => k + 1), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      key={key}
      data-proto="step-25"
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
        @keyframes step25-fade-up {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes step25-fade-out {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes step25-rule-grow {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes step25-sweep-line {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes step25-anchor-drop {
          0%   { opacity: 0; transform: translateY(-40px) scale(0.6); }
          70%  { opacity: 1; transform: translateY(4px) scale(1.1); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {variant === "A" && <CallbackVariant />}
      {variant === "B" && <SweepVariant />}
      {variant === "C" && <AnchorVariant />}

      <div
        style={{
          position: "absolute",
          top: "calc(56px + var(--safe-top))",
          right: "var(--content-margin)",
          fontFamily: FONT_BODY,
          fontSize: 13,
          color: C.disabled,
          letterSpacing: "0.06em",
        }}
      >
        {labelFor(variant)}
      </div>
    </div>
  );
}

/* ── variant A: callback — whisper resolves to heading ── */

function CallbackVariant() {
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
        gap: 32,
      }}
    >
      {/* Whisper first */}
      <div
        style={{
          fontFamily: FONT_BODY,
          fontStyle: "italic",
          fontSize: 28,
          color: C.caption,
          opacity: 0,
          animation: `step25-fade-up 800ms cubic-bezier(0.22, 1, 0.36, 1) both,
                      step25-fade-out 500ms cubic-bezier(0.22, 1, 0.36, 1) 2400ms both`,
        }}
      >
        {CALLBACK}
      </div>
      {/* Then the section heading */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: 0,
          animation: "step25-fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "2900ms",
        }}
      >
        <div
          style={{
            width: 48,
            height: 1,
            background: C.amber,
            transformOrigin: "left center",
            animation: "step25-rule-grow 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
            animationDelay: "2960ms",
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
          {EYEBROW}
        </span>
      </div>
      <h1
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 96,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: C.heading,
          margin: 0,
          opacity: 0,
          animation: "step25-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "3100ms",
        }}
      >
        {HEADLINE}
      </h1>
    </div>
  );
}

/* ── variant B: sweep — bare year axis sweeps in ── */

function SweepVariant() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: "var(--content-margin)",
        paddingRight: "var(--content-margin)",
        gap: 56,
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: 0,
          animation: "step25-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "200ms",
        }}
      >
        <div
          style={{
            width: 48,
            height: 1,
            background: C.amber,
            transformOrigin: "left center",
            animation:
              "step25-rule-grow 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
            animationDelay: "260ms",
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
          {EYEBROW}
        </span>
      </div>
      {/* Headline */}
      <h1
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 96,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: C.heading,
          margin: 0,
          opacity: 0,
          animation: "step25-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "400ms",
        }}
      >
        {HEADLINE}
      </h1>
      {/* Year axis sweep */}
      <div
        style={{
          position: "relative",
          marginTop: 32,
          height: 60,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: 1,
            background: C.rule,
            transformOrigin: "left center",
            animation:
              "step25-sweep-line 1200ms cubic-bezier(0.22, 1, 0.36, 1) both",
            animationDelay: "900ms",
          }}
        />
        {[2005, 2015, 2025, 2035].map((y, i) => (
          <div
            key={y}
            style={{
              position: "absolute",
              left: `${(i / 3) * 100}%`,
              top: 0,
              transform: "translateX(-50%)",
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 18,
              color: y === 2025 ? C.heading : C.caption,
              opacity: 0,
              animation:
                "step25-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
              animationDelay: `${1400 + i * 120}ms`,
            }}
          >
            {y}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── variant C: anchor — two year anchors drop into place ── */

function AnchorVariant() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "var(--content-margin)",
        paddingRight: "var(--content-margin)",
        gap: 40,
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: 0,
          animation: "step25-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "200ms",
        }}
      >
        <div style={{ width: 48, height: 1, background: C.amber }} />
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.18em",
            color: C.caption,
          }}
        >
          {EYEBROW}
        </span>
        <div style={{ width: 48, height: 1, background: C.amber }} />
      </div>
      {/* Two anchors side by side */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: 64,
          alignItems: "center",
          width: "100%",
          maxWidth: 960,
        }}
      >
        <Anchor label="Hsinchu" year="2005" tone="muted" delay={500} />
        <div
          style={{
            fontFamily: FONT_HEADING,
            fontSize: 32,
            color: C.disabled,
            opacity: 0,
            animation: "step25-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
            animationDelay: "1100ms",
          }}
        >
          →
        </div>
        <Anchor label="Kumamoto" year="2025" tone="now" delay={1300} />
      </div>
      {/* Headline */}
      <h1
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 56,
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          color: C.heading,
          margin: "16px 0 0 0",
          textAlign: "center",
          opacity: 0,
          animation: "step25-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "2000ms",
        }}
      >
        {HEADLINE}
      </h1>
    </div>
  );
}

function Anchor({ label, year, tone, delay }) {
  const isNow = tone === "now";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        opacity: 0,
        animation:
          "step25-anchor-drop 700ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
        animationDelay: `${delay}ms`,
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 999,
          background: isNow ? C.amber : C.sub,
          boxShadow: isNow ? "0 0 0 6px rgba(251,185,49,0.16)" : "none",
        }}
      />
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 32,
          color: isNow ? C.heading : C.sub,
          marginTop: 4,
        }}
      >
        {year}
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 15,
          color: C.caption,
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function labelFor(variant) {
  if (variant === "B") return "B · sweep";
  if (variant === "C") return "C · anchor";
  return "A · callback";
}
