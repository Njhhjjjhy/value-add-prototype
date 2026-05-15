import { useState, useRef, useEffect } from "react";

/* ───────────────────────────────────────────────────────
   step-11 section-6 transition — iPad Pro 13 M4
   The investment card recedes, then the map reveals.
   Two variants:
   B "the tilt"     — card tilts forward on its top edge and falls away
   C "the corridor" — card recedes straight back into depth
   ─────────────────────────────────────────────────────── */

const C = {
  bg: "#F9F9F9",
  amber: "#FBB931",
  n950: "#25272C",
  n900: "#383A42",
  n800: "#40444C",
  n600: "#5B616E",
  n200: "#D8DBDF",
  n100: "#EDEEF1",
};

const EASING = {
  gentle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  settle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const Panel = ({ level = 1, children, style = {} }) => {
  const levels = {
    1: {
      background: C.bg,
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
    },
    2: {
      background: C.bg,
      border: "1px solid rgba(0,0,0,0.08)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
    },
  };
  return (
    <div style={{ borderRadius: 20, ...levels[level], ...style }}>
      {children}
    </div>
  );
};

/* The card that recedes. Centered, max-width, iPad-tuned padding. */
const GhostBridge = ({ containerRef }) => (
  <div
    ref={containerRef}
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding:
        "calc(96px + var(--safe-top)) var(--content-margin) calc(96px + var(--safe-bottom))",
    }}
  >
    <div style={{ width: "100%", maxWidth: 880 }}>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 13,
          fontWeight: 500,
          color: C.n600,
          letterSpacing: "0.18em",
          marginBottom: 28,
          textAlign: "left",
        }}
      >
        THE INVESTMENT
      </div>
      <Panel level={2} style={{ padding: "40px 44px", marginBottom: 20 }}>
        <div
          role="group"
          aria-label="10 trillion yen. Total semiconductor investment committed to Kumamoto prefecture."
        >
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 72,
              color: C.n950,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              textAlign: "left",
            }}
          >
            10 trillion yen
          </div>
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 18,
              color: C.n800,
              lineHeight: 1.6,
              marginTop: 16,
              textAlign: "left",
            }}
          >
            Total semiconductor investment committed to Kumamoto prefecture
          </div>
        </div>
      </Panel>
      <Panel level={1} style={{ padding: "28px 44px" }}>
        <div
          role="group"
          aria-label="47,000 jobs. New positions projected by 2030."
        >
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 48,
              color: C.n950,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              textAlign: "left",
            }}
          >
            47,000 jobs
          </div>
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 17,
              color: C.n800,
              lineHeight: 1.6,
              marginTop: 12,
              textAlign: "left",
            }}
          >
            New positions projected by 2030
          </div>
        </div>
      </Panel>
    </div>
  </div>
);

/* Map SVG redrawn at iPad aspect (use preserveAspectRatio to fill both orientations). */
const MapSVG = () => (
  <svg
    viewBox="0 0 1366 1024"
    preserveAspectRatio="xMidYMid slice"
    style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
  >
    {/* horizontal contour lines */}
    {[120, 220, 330, 440, 560, 680, 800, 920].map((y, i) => (
      <path
        key={i}
        d={`M0 ${y} Q340 ${y - 30 + i * 8} 680 ${y + 18 - i * 4} Q1020 ${y + 6 + i * 5} 1366 ${y - 12}`}
        stroke="rgba(255,255,255,0.06)"
        fill="none"
        strokeWidth="1.5"
      />
    ))}
    {/* vertical roads */}
    <line x1="280" y1="0" x2="340" y2="1024" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />
    <line x1="860" y1="0" x2="900" y2="1024" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
    {/* horizontal roads */}
    <line x1="0" y1="500" x2="1366" y2="468" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />
    <line x1="0" y1="720" x2="1366" y2="740" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
    {/* highlight region (Kumamoto cluster) */}
    <rect
      x="500"
      y="320"
      width="360"
      height="360"
      rx="8"
      fill="rgba(251,185,49,0.12)"
      stroke="rgba(251,185,49,0.30)"
      strokeWidth="1.5"
    />
    {/* pins */}
    {[
      [600, 420],
      [720, 460],
      [780, 540],
      [620, 600],
      [700, 640],
    ].map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="14" fill="rgba(251,185,49,0.18)" />
        <circle cx={x} cy={y} r="6" fill={C.amber} opacity="0.92" />
      </g>
    ))}
  </svg>
);

const MapDestination = ({ containerRef }) => (
  <div
    ref={containerRef}
    style={{
      position: "absolute",
      inset: 0,
      background: "#1a1e2a",
      opacity: 0,
      visibility: "hidden",
    }}
  >
    <MapSVG />
  </div>
);

const TapPrompt = ({ containerRef }) => (
  <div
    ref={containerRef}
    aria-live="polite"
    style={{
      position: "absolute",
      bottom: "calc(64px + var(--safe-bottom))",
      left: 0,
      right: 0,
      textAlign: "center",
      opacity: 0,
      visibility: "hidden",
    }}
  >
    <div
      style={{
        fontFamily: FONT_BODY,
        fontSize: 15,
        color: "#F9F9F9",
        letterSpacing: "0.04em",
      }}
    >
      Tap to continue
    </div>
  </div>
);

const revealMap = async (map, prompt) => {
  map.style.visibility = "visible";
  await map.animate(
    [
      { opacity: 0, transform: "scale(1.03)" },
      { opacity: 0.3, transform: "scale(1.02)", offset: 0.3 },
      { opacity: 0.7, transform: "scale(1.005)", offset: 0.65 },
      { opacity: 1, transform: "scale(1)" },
    ],
    { duration: 700, easing: EASING.settle, fill: "forwards" }
  ).finished;
  await new Promise((r) => setTimeout(r, 200));
  prompt.style.visibility = "visible";
  prompt.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 400,
    fill: "forwards",
  });
};

/* Variant B — the tilt. Card tilts forward on its top edge and falls away.
   iPad-tuned translateY scaled up to clear the larger viewport. */
const Tilt = ({ playing, onDone }) => {
  const ghostRef = useRef(null);
  const perspRef = useRef(null);
  const mapRef = useRef(null);
  const promptRef = useRef(null);

  useEffect(() => {
    if (!playing) return;
    const persp = perspRef.current;
    const map = mapRef.current;
    const prompt = promptRef.current;
    if (!persp || !map || !prompt) return;

    const run = async () => {
      await persp.animate(
        [
          { transform: "perspective(1200px) rotateX(0deg) translateY(0px)", opacity: 1, offset: 0 },
          { transform: "perspective(1200px) rotateX(1.5deg) translateY(4px)", opacity: 1, offset: 0.06 },
          { transform: "perspective(1200px) rotateX(3deg) translateY(10px)", opacity: 1, offset: 0.12 },
          { transform: "perspective(1200px) rotateX(5.5deg) translateY(20px)", opacity: 1, offset: 0.18 },
          { transform: "perspective(1200px) rotateX(8deg) translateY(34px)", opacity: 1, offset: 0.24 },
          { transform: "perspective(1200px) rotateX(11.5deg) translateY(56px)", opacity: 1, offset: 0.30 },
          { transform: "perspective(1200px) rotateX(15deg) translateY(84px)", opacity: 0.98, offset: 0.36 },
          { transform: "perspective(1200px) rotateX(20deg) translateY(124px)", opacity: 0.95, offset: 0.42 },
          { transform: "perspective(1200px) rotateX(26deg) translateY(180px)", opacity: 0.90, offset: 0.48 },
          { transform: "perspective(1200px) rotateX(33deg) translateY(260px)", opacity: 0.82, offset: 0.54 },
          { transform: "perspective(1200px) rotateX(40deg) translateY(360px)", opacity: 0.72, offset: 0.60 },
          { transform: "perspective(1200px) rotateX(47deg) translateY(480px)", opacity: 0.58, offset: 0.66 },
          { transform: "perspective(1200px) rotateX(54deg) translateY(620px)", opacity: 0.42, offset: 0.72 },
          { transform: "perspective(1200px) rotateX(60deg) translateY(760px)", opacity: 0.28, offset: 0.78 },
          { transform: "perspective(1200px) rotateX(65deg) translateY(900px)", opacity: 0.16, offset: 0.84 },
          { transform: "perspective(1200px) rotateX(70deg) translateY(1040px)", opacity: 0.08, offset: 0.90 },
          { transform: "perspective(1200px) rotateX(73deg) translateY(1120px)", opacity: 0.03, offset: 0.95 },
          { transform: "perspective(1200px) rotateX(75deg) translateY(1200px)", opacity: 0, offset: 1 },
        ],
        { duration: 2200, easing: "linear", fill: "forwards" }
      ).finished;

      await new Promise((r) => setTimeout(r, 350));
      await revealMap(map, prompt);
      onDone();
    };
    run();
  }, [playing]);

  return (
    <>
      <div
        ref={perspRef}
        style={{ position: "absolute", inset: 0, transformOrigin: "50% 0%" }}
      >
        <GhostBridge containerRef={ghostRef} />
      </div>
      <MapDestination containerRef={mapRef} />
      <TapPrompt containerRef={promptRef} />
    </>
  );
};

/* Variant C — the corridor. Card recedes straight back into depth. */
const Corridor = ({ playing, onDone }) => {
  const ghostRef = useRef(null);
  const wrapRef = useRef(null);
  const mapRef = useRef(null);
  const promptRef = useRef(null);

  useEffect(() => {
    if (!playing) return;
    const wrap = wrapRef.current;
    const map = mapRef.current;
    const prompt = promptRef.current;
    if (!wrap || !map || !prompt) return;

    const run = async () => {
      await wrap.animate(
        [
          { transform: "perspective(1600px) translateZ(0px) scaleX(1) scaleY(1)", opacity: 1, offset: 0 },
          { transform: "perspective(1600px) translateZ(-10px) scaleX(0.995) scaleY(0.998)", opacity: 1, offset: 0.05 },
          { transform: "perspective(1600px) translateZ(-24px) scaleX(0.985) scaleY(0.994)", opacity: 1, offset: 0.10 },
          { transform: "perspective(1600px) translateZ(-48px) scaleX(0.97) scaleY(0.988)", opacity: 1, offset: 0.16 },
          { transform: "perspective(1600px) translateZ(-80px) scaleX(0.95) scaleY(0.98)", opacity: 0.98, offset: 0.22 },
          { transform: "perspective(1600px) translateZ(-124px) scaleX(0.92) scaleY(0.97)", opacity: 0.96, offset: 0.28 },
          { transform: "perspective(1600px) translateZ(-180px) scaleX(0.88) scaleY(0.955)", opacity: 0.92, offset: 0.34 },
          { transform: "perspective(1600px) translateZ(-250px) scaleX(0.83) scaleY(0.94)", opacity: 0.86, offset: 0.40 },
          { transform: "perspective(1600px) translateZ(-330px) scaleX(0.77) scaleY(0.92)", opacity: 0.78, offset: 0.46 },
          { transform: "perspective(1600px) translateZ(-420px) scaleX(0.70) scaleY(0.895)", opacity: 0.68, offset: 0.52 },
          { transform: "perspective(1600px) translateZ(-520px) scaleX(0.62) scaleY(0.86)", opacity: 0.56, offset: 0.58 },
          { transform: "perspective(1600px) translateZ(-630px) scaleX(0.53) scaleY(0.82)", opacity: 0.44, offset: 0.64 },
          { transform: "perspective(1600px) translateZ(-740px) scaleX(0.44) scaleY(0.77)", opacity: 0.32, offset: 0.70 },
          { transform: "perspective(1600px) translateZ(-840px) scaleX(0.35) scaleY(0.71)", opacity: 0.22, offset: 0.76 },
          { transform: "perspective(1600px) translateZ(-930px) scaleX(0.27) scaleY(0.64)", opacity: 0.14, offset: 0.82 },
          { transform: "perspective(1600px) translateZ(-1010px) scaleX(0.19) scaleY(0.56)", opacity: 0.08, offset: 0.88 },
          { transform: "perspective(1600px) translateZ(-1080px) scaleX(0.12) scaleY(0.46)", opacity: 0.03, offset: 0.94 },
          { transform: "perspective(1600px) translateZ(-1140px) scaleX(0.06) scaleY(0.36)", opacity: 0, offset: 1 },
        ],
        { duration: 2400, easing: "linear", fill: "forwards" }
      ).finished;

      await new Promise((r) => setTimeout(r, 350));
      await revealMap(map, prompt);
      onDone();
    };
    run();
  }, [playing]);

  return (
    <>
      <div
        ref={wrapRef}
        style={{ position: "absolute", inset: 0, transformOrigin: "50% 50%" }}
      >
        <GhostBridge containerRef={ghostRef} />
      </div>
      <MapDestination containerRef={mapRef} />
      <TapPrompt containerRef={promptRef} />
    </>
  );
};

const VARIANTS = [
  { id: "B", label: "B: the tilt", Component: Tilt },
  { id: "C", label: "C: the corridor", Component: Corridor },
];

export default function Step11TransitionV2({
  variant = "B"
} = {}) {
  const resolved = VARIANTS.find((v) => v.id === variant) ? variant : "B";
  const [done, setDone] = useState(false);
  const [key, setKey] = useState(0);
  const current = VARIANTS.find((v) => v.id === resolved);

  const replay = () => {
    if (!done) return;
    setDone(false);
    setKey((k) => k + 1);
  };

  return (
    <div
      data-proto="step-11"
      onClick={replay}
      role="button"
      tabIndex={0}
      aria-label="Replay"
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && done) {
          e.preventDefault();
          replay();
        }
      }}
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        fontFamily: FONT_BODY,
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-11"] *,
          [data-proto="step-11"] *::before,
          [data-proto="step-11"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
      <div
        key={`${resolved}-${key}`}
        style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      >
        {current && (
          <current.Component playing={true} onDone={() => setDone(true)} />
        )}
      </div>
    </div>
  );
}
