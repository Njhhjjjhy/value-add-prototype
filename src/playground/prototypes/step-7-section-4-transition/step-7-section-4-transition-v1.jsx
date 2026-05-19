import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   Step 7 — Section 4 transition (parallel hook transition IN)
   Bridges step 6 (map) into step 8 (parallel hook content).
   Locked headline: "You've seen this movie before."
   Source: docs/value-add-prototype-flow-feedback.md §3.

   Variants — same content, different reveal:
     A "titlecard" — film-title fade-up, centered
     B "shutter"   — two halves wipe in from opposite sides
     C "timeline"  — horizontal year line draws 2005 → 2025
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  disabled: "#8E8F8F",
  amber: "#FBB931",
  bg: "#F9F9F9",
  band: "#EDEEF1",
  rule: "rgba(0,0,0,0.10)",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const HEADLINE = "You've seen this movie before.";
const EYEBROW = "SECTION 4";

export default function Step7SectionFourTransition({ variant = "A" } = {}) {
  const [key, setKey] = useState(0);

  // Replay loop for review
  useEffect(() => {
    const id = setInterval(() => setKey((k) => k + 1), 5400);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      key={key}
      data-proto="step-7"
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
        @keyframes step7-fade-up {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes step7-rule-grow {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes step7-wipe-left {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        @keyframes step7-wipe-right {
          0%   { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        @keyframes step7-fade-in {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes step7-line-grow {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes step7-dot-pop {
          0%   { opacity: 0; transform: scale(0.4); }
          70%  { opacity: 1; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {variant === "A" && <TitlecardVariant />}
      {variant === "B" && <ShutterVariant />}
      {variant === "C" && <TimelineVariant />}

      {/* Variant label (debug, top right) */}
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

/* ── variant A: titlecard ── */

function TitlecardVariant() {
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
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: 0,
          animation: "step7-fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "200ms",
        }}
      >
        <div
          style={{
            width: 48,
            height: 1,
            background: C.amber,
            transformOrigin: "left center",
            animation: "step7-rule-grow 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
            animationDelay: "300ms",
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
          margin: "32px 0 0 0",
          maxWidth: 1120,
          opacity: 0,
          animation: "step7-fade-up 800ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "500ms",
        }}
      >
        {HEADLINE}
      </h1>
    </div>
  );
}

/* ── variant B: shutter — two halves wipe in ── */

function ShutterVariant() {
  return (
    <>
      {/* Left band slides in from the left */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          background: C.band,
          transformOrigin: "left center",
          animation:
            "step7-wipe-left 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      />
      {/* Right band slides in from the right */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          background: C.bg,
          transformOrigin: "right center",
          animation:
            "step7-wipe-right 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      />
      {/* Hairline divider between halves */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          bottom: "20%",
          left: "50%",
          width: 1,
          background: C.rule,
          transformOrigin: "center top",
          opacity: 0,
          animation: "step7-fade-in 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "750ms",
        }}
      />
      {/* Content sits above the bands */}
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
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: 0,
            animation: "step7-fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
            animationDelay: "900ms",
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
        <h1
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 80,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: C.heading,
            margin: "24px 0 0 0",
            textAlign: "center",
            maxWidth: 1080,
            opacity: 0,
            animation: "step7-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
            animationDelay: "1100ms",
          }}
        >
          {HEADLINE}
        </h1>
      </div>
    </>
  );
}

/* ── variant C: timeline — year line draws from 2005 to 2025 ── */

function TimelineVariant() {
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
        gap: 48,
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: 0,
          animation: "step7-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "200ms",
        }}
      >
        <div
          style={{
            width: 48,
            height: 1,
            background: C.amber,
            transformOrigin: "left center",
            animation: "step7-rule-grow 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
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

      {/* Year track */}
      <div
        style={{
          position: "relative",
          height: 80,
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Horizontal line */}
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
              "step7-line-grow 900ms cubic-bezier(0.22, 1, 0.36, 1) both",
            animationDelay: "400ms",
          }}
        />
        {/* 2005 anchor */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            opacity: 0,
            animation:
              "step7-dot-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
            animationDelay: "500ms",
          }}
        >
          <span
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 22,
              color: C.sub,
            }}
          >
            2005
          </span>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: C.heading,
              marginTop: 18,
            }}
          />
        </div>
        {/* 2025 anchor */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            opacity: 0,
            animation:
              "step7-dot-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
            animationDelay: "1200ms",
          }}
        >
          <span
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 22,
              color: C.heading,
            }}
          >
            2025
          </span>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: C.amber,
              marginTop: 18,
              boxShadow: "0 0 0 4px rgba(251,185,49,0.18)",
            }}
          />
        </div>
      </div>

      {/* Headline */}
      <h1
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 80,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: C.heading,
          margin: 0,
          maxWidth: 1120,
          opacity: 0,
          animation: "step7-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "1500ms",
        }}
      >
        {HEADLINE}
      </h1>
    </div>
  );
}

function labelFor(variant) {
  if (variant === "B") return "B · shutter";
  if (variant === "C") return "C · timeline";
  return "A · titlecard";
}
