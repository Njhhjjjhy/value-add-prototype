import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   Step 11 — Section 6 transition (resolve panel)
   Bridges step 10 (pain points) into step 12 (persona).

   Canonical copy lives in src/content/steps/step-11-section-6-transition.ts:
     headline: "3 to 5 million yen"
     body:     "Estimated replacement cost per engineer who repatriates
                early due to family maladjustment."
     prompt:   "Tap to continue"

   The earlier "47,000 / engineers need a home / Now meet one." concept
   is retired and must not return — that copy contradicts canonical.

   Variants — same canonical content, different motion:
     A "descent"   — headline scales down from huge to settled
     B "focuspull" — background blurs out, headline sharpens
     C "cut"       — clean cross-fade, no tricks
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

// Canonical copy — must match src/content/steps/step-11-section-6-transition.ts
const HEADLINE = "3 to 5 million yen";
const BODY =
  "Estimated replacement cost per engineer who repatriates early due to family maladjustment.";
const TAP_PROMPT = "Tap to continue";

export default function Step11SectionSixTransition({ variant = "A" } = {}) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setKey((k) => k + 1), 5400);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      key={key}
      data-proto="step-11"
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
        @keyframes step11-fade-up {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes step11-descent {
          0%   { opacity: 0; transform: scale(1.45); letter-spacing: 0.02em; }
          60%  { opacity: 1; transform: scale(1.05); letter-spacing: -0.02em; }
          100% { opacity: 1; transform: scale(1); letter-spacing: -0.03em; }
        }
        @keyframes step11-focus-bg-out {
          0%   { filter: blur(0px); opacity: 1; }
          100% { filter: blur(14px); opacity: 0.45; }
        }
        @keyframes step11-focus-fg-in {
          0%   { opacity: 0; filter: blur(14px); transform: scale(1.04); }
          100% { opacity: 1; filter: blur(0px); transform: scale(1); }
        }
        @keyframes step11-cut-in {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

      {variant === "A" && <DescentVariant />}
      {variant === "B" && <FocusPullVariant />}
      {variant === "C" && <CutVariant />}

      {/* Tap to continue prompt — bottom center */}
      <TapPrompt delay={variant === "C" ? 1100 : 2300} />

      {/* Variant label */}
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

/* ── shared resolve panel ── */

function ResolvePanelInner({ headingStyle = {}, bodyStyle = {} }) {
  return (
    <div
      style={{
        background: C.bg,
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 28,
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
        padding: "56px 64px",
        width: "100%",
        maxWidth: 1080,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 72,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: C.heading,
          marginBottom: 28,
          ...headingStyle,
        }}
      >
        {HEADLINE}
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontWeight: 400,
          fontSize: 22,
          lineHeight: 1.5,
          color: C.body,
          maxWidth: "60ch",
          ...bodyStyle,
        }}
      >
        {BODY}
      </div>
    </div>
  );
}

/* ── tap-to-continue prompt — fades in once content has settled ── */

function TapPrompt({ delay = 2200 }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "calc(96px + var(--safe-bottom))",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 20,
        opacity: 0,
        animation:
          "step11-fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
        animationDelay: `${delay}ms`,
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 17,
          color: C.caption,
          letterSpacing: "0.02em",
          opacity: 0.72,
        }}
      >
        {TAP_PROMPT}
      </span>
    </div>
  );
}

/* ── variant A: descent — headline scales down from large to settled ── */

function DescentVariant() {
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
      }}
    >
      <ResolvePanelInner
        headingStyle={{
          opacity: 0,
          animation:
            "step11-descent 1000ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "300ms",
          transformOrigin: "left center",
        }}
        bodyStyle={{
          opacity: 0,
          animation:
            "step11-fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "1400ms",
        }}
      />
    </div>
  );
}

/* ── variant B: focuspull — backdrop blurs out, panel sharpens ── */

function FocusPullVariant() {
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
      }}
    >
      {/* Backdrop crowd of small dots, blurs away as panel comes into focus */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          animation:
            "step11-focus-bg-out 1200ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "500ms",
        }}
      >
        <CrowdDots />
      </div>

      {/* Foreground panel — pulls into focus */}
      <div
        style={{
          position: "relative",
          opacity: 0,
          animation:
            "step11-focus-fg-in 900ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "700ms",
        }}
      >
        <ResolvePanelInner />
      </div>
    </div>
  );
}

function CrowdDots() {
  // 80 small dots scattered pseudo-randomly. Deterministic seed for replay.
  const dots = [];
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 80; i++) {
    dots.push({
      x: rand() * 100,
      y: rand() * 100,
      r: 3 + rand() * 4,
      o: 0.25 + rand() * 0.35,
    });
  }
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0 }}
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r / 10}
          fill={C.sub}
          opacity={d.o}
        />
      ))}
    </svg>
  );
}

/* ── variant C: cut — clean fade, no tricks ── */

function CutVariant() {
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
      }}
    >
      <ResolvePanelInner
        headingStyle={{
          opacity: 0,
          animation: "step11-cut-in 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "300ms",
        }}
        bodyStyle={{
          opacity: 0,
          animation: "step11-cut-in 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "600ms",
        }}
      />
    </div>
  );
}

function labelFor(variant) {
  if (variant === "B") return "B · focuspull";
  if (variant === "C") return "C · cut";
  return "A · descent";
}
