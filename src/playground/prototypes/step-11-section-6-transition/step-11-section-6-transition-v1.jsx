import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   Step 11 — Section 6 transition (persona transition IN)
   Bridges step 10 (pain points content) into step 12 (persona content).
   Mood shift: from "8 problems for the group" to "now meet one person".

   Variants — same content, different motion:
     A "descent"   — wide → narrow scale-down, like a camera dropping toward a face
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

const EYEBROW = "SECTION 6";
const STAT = "47,000";
const STAT_LABEL = "engineers need a home";
const SUBHEAD = "Now meet one.";

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
        @keyframes step11-rule-grow {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes step11-descent {
          0%   { opacity: 0; transform: scale(2.4); letter-spacing: 0.1em; }
          60%  { opacity: 1; transform: scale(1.1); letter-spacing: -0.02em; }
          100% { opacity: 1; transform: scale(1); letter-spacing: -0.025em; }
        }
        @keyframes step11-descent-bg {
          0%   { opacity: 0; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
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
        @keyframes step11-dot-pop {
          0%   { opacity: 0; transform: scale(0.4); }
          70%  { opacity: 1; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {variant === "A" && <DescentVariant />}
      {variant === "B" && <FocusPullVariant />}
      {variant === "C" && <CutVariant />}

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

/* ── shared eyebrow ── */

function Eyebrow({ delay = 200 }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        opacity: 0,
        animation: "step11-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
        animationDelay: `${delay}ms`,
      }}
    >
      <div
        style={{
          width: 48,
          height: 1,
          background: C.amber,
          transformOrigin: "left center",
          animation: "step11-rule-grow 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: `${delay + 60}ms`,
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
  );
}

/* ── variant A: descent — number scales down from huge to settled ── */

function DescentVariant() {
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
      <Eyebrow delay={150} />
      {/* Huge number that descends */}
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 168,
          lineHeight: 1,
          color: C.heading,
          margin: 0,
          opacity: 0,
          animation: "step11-descent 1000ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "400ms",
          transformOrigin: "left center",
        }}
      >
        {STAT}
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 22,
          lineHeight: 1.4,
          color: C.body,
          opacity: 0,
          animation: "step11-fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "1350ms",
        }}
      >
        {STAT_LABEL}
      </div>
      {/* Subhead — appears after the descent settles */}
      <div
        style={{
          fontFamily: FONT_BODY,
          fontStyle: "italic",
          fontSize: 22,
          color: C.caption,
          marginTop: 16,
          opacity: 0,
          animation:
            "step11-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "1700ms",
        }}
      >
        {SUBHEAD}
      </div>
    </div>
  );
}

/* ── variant B: focuspull — backdrop blurs out, headline sharpens ── */

function FocusPullVariant() {
  // The "backdrop" is a soft amber halo + scattered tiny dots representing
  // the crowd (47,000). Focuspull blurs the crowd, sharpens the headline.
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
        gap: 28,
      }}
    >
      {/* Backdrop crowd of small dots */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          animation:
            "step11-focus-bg-out 1200ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "600ms",
        }}
      >
        <CrowdDots />
      </div>

      {/* Foreground content — pulls into focus */}
      <div
        style={{
          position: "relative",
          opacity: 0,
          animation:
            "step11-focus-fg-in 900ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "800ms",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <Eyebrow delay={0} />
        <div>
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 88,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: C.heading,
            }}
          >
            {STAT}{" "}
            <span style={{ color: C.sub, fontSize: 56 }}>{STAT_LABEL}.</span>
          </div>
        </div>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontStyle: "italic",
            fontSize: 22,
            color: C.caption,
          }}
        >
          {SUBHEAD}
        </div>
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
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: "var(--content-margin)",
        paddingRight: "var(--content-margin)",
        gap: 28,
      }}
    >
      <div
        style={{
          opacity: 0,
          animation: "step11-cut-in 400ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "300ms",
        }}
      >
        <Eyebrow delay={0} />
      </div>
      <h1
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 88,
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          color: C.heading,
          margin: "16px 0 0 0",
          maxWidth: 1080,
          opacity: 0,
          animation: "step11-cut-in 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "450ms",
        }}
      >
        {STAT} {STAT_LABEL}.
      </h1>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontStyle: "italic",
          fontSize: 22,
          color: C.caption,
          marginTop: 16,
          opacity: 0,
          animation: "step11-cut-in 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
          animationDelay: "700ms",
        }}
      >
        {SUBHEAD}
      </div>
    </div>
  );
}

function labelFor(variant) {
  if (variant === "B") return "B · focuspull";
  if (variant === "C") return "C · cut";
  return "A · descent";
}
