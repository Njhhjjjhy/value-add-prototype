import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   Step 9 — Section 5 transition (pain points transition IN)
   Bridges step 8 (parallel hook) into step 10 (pain points).
   Same content reveal across all three variants — motion is the variable.
   Variants:
     A "gravity"  — heading falls in and settles with a soft overshoot
     B "fade"     — calm crossfade + 16px upward translate
     C "slide"    — horizontal page-turn from the left
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  disabled: "#8E8F8F",
  amber: "#FBB931",
  bg: "#F9F9F9",
  dot: "#C9CDD4",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

// 8 dot preview at the bottom — telegraphs "8 things coming"
const DOT_COUNT = 8;

export default function Step9SectionFiveTransition({ variant = "A" } = {}) {
  const [key, setKey] = useState(0);

  // Replay loop so the prototype is reviewable repeatedly without a full remount.
  useEffect(() => {
    const id = setInterval(() => setKey((k) => k + 1), 4800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      key={key}
      data-proto="step-9"
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
        @keyframes step9-gravity-eyebrow {
          0%   { opacity: 0; transform: translateY(-32px); }
          60%  { opacity: 1; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes step9-gravity-heading {
          0%   { opacity: 0; transform: translateY(-120px); }
          55%  { opacity: 1; transform: translateY(14px); }
          78%  { transform: translateY(-4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes step9-gravity-sub {
          0%   { opacity: 0; transform: translateY(-48px); }
          65%  { opacity: 0.92; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes step9-fade-up {
          0%   { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes step9-slide-in {
          0%   { opacity: 0; transform: translateX(-72px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes step9-dot-rise {
          0%   { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes step9-rule-grow {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>

      {/* Content stack */}
      <div
        style={{
          position: "absolute",
          top: "calc(160px + var(--safe-top))",
          left: "var(--content-margin)",
          right: "var(--content-margin)",
          maxWidth: 1120,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            ...eyebrowMotion(variant),
          }}
        >
          <div
            style={{
              width: 48,
              height: 1,
              background: C.amber,
              transformOrigin: "left center",
              animation: "step9-rule-grow 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
              animationDelay: "100ms",
            }}
          />
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.18em",
              color: C.caption,
            }}
          >
            SECTION 5
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 96,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: C.heading,
            margin: 0,
            ...headingMotion(variant),
          }}
        >
          Pain points
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 22,
            lineHeight: 1.4,
            color: C.body,
            margin: 0,
            maxWidth: 760,
            ...subheadMotion(variant),
          }}
        >
          What semiconductor families actually face in Kumamoto.
        </p>
      </div>

      {/* 8-dot preview — telegraphs 4 physical + 4 mental */}
      <div
        style={{
          position: "absolute",
          left: "var(--content-margin)",
          bottom: "calc(120px + var(--safe-bottom))",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 13,
            letterSpacing: "0.12em",
            color: C.disabled,
            opacity: 0,
            animation: "step9-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
            animationDelay: "1400ms",
          }}
        >
          Physical · Mental
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {Array.from({ length: DOT_COUNT }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: i < 4 ? C.body : C.dot,
                opacity: 0,
                animation: "step9-dot-rise 400ms cubic-bezier(0.22, 1, 0.36, 1) both",
                animationDelay: `${1500 + i * 80}ms`,
              }}
            />
          ))}
        </div>
      </div>

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

/* ── per-variant motion presets ── */

function eyebrowMotion(variant) {
  if (variant === "A") {
    return {
      opacity: 0,
      animation:
        "step9-gravity-eyebrow 700ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
      animationDelay: "150ms",
    };
  }
  if (variant === "C") {
    return {
      opacity: 0,
      animation: "step9-slide-in 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
      animationDelay: "100ms",
    };
  }
  // B — fade
  return {
    opacity: 0,
    animation: "step9-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
    animationDelay: "200ms",
  };
}

function headingMotion(variant) {
  if (variant === "A") {
    return {
      opacity: 0,
      animation:
        "step9-gravity-heading 950ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
      animationDelay: "300ms",
    };
  }
  if (variant === "C") {
    return {
      opacity: 0,
      animation: "step9-slide-in 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
      animationDelay: "260ms",
    };
  }
  return {
    opacity: 0,
    animation: "step9-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
    animationDelay: "420ms",
  };
}

function subheadMotion(variant) {
  if (variant === "A") {
    return {
      opacity: 0,
      animation:
        "step9-gravity-sub 800ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
      animationDelay: "560ms",
    };
  }
  if (variant === "C") {
    return {
      opacity: 0,
      animation: "step9-slide-in 650ms cubic-bezier(0.22, 1, 0.36, 1) both",
      animationDelay: "440ms",
    };
  }
  return {
    opacity: 0,
    animation: "step9-fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
    animationDelay: "680ms",
  };
}

function labelFor(variant) {
  if (variant === "A") return "A · gravity";
  if (variant === "C") return "C · slide";
  return "B · fade";
}
