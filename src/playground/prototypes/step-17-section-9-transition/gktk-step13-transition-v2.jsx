import { useRef, useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   step-13 section-7 transition — iPad Pro 13 M4
   Two variants:
     B "the lift" — ghost map tilts away from camera
     D "the push" — ghost map recedes into perspective
   Both resolve into a centered panel naming the next section
   and a "Tap to continue" prompt.
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

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const EASING = {
  settle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
};

const MapSVG = () => (
  <svg
    viewBox="0 0 1366 1024"
    preserveAspectRatio="xMidYMid slice"
    style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
  >
    {/* Latitudinal contour lines */}
    {[140, 260, 380, 500, 620, 740, 860].map((y, i) => (
      <path
        key={`lat-${i}`}
        d={`M0 ${y} Q340 ${y - 30 + i * 10} 683 ${y + 16 - i * 5} Q1024 ${y + 8 + i * 7} 1366 ${y - 12}`}
        stroke="rgba(255,255,255,0.06)"
        fill="none"
        strokeWidth="1.5"
      />
    ))}
    {/* Longitudinal lines */}
    <line x1="280" y1="0" x2="340" y2="1024" stroke="rgba(255,255,255,0.10)" strokeWidth="1.8" />
    <line x1="820" y1="0" x2="880" y2="1024" stroke="rgba(255,255,255,0.07)" strokeWidth="1.2" />
    <line x1="0" y1="520" x2="1366" y2="480" stroke="rgba(255,255,255,0.10)" strokeWidth="1.8" />
    <line x1="0" y1="720" x2="1366" y2="740" stroke="rgba(255,255,255,0.07)" strokeWidth="1.2" />

    {/* Active region rectangle */}
    <rect
      x="468"
      y="328"
      width="430"
      height="368"
      rx="8"
      fill="rgba(251,185,49,0.12)"
      stroke="rgba(251,185,49,0.32)"
      strokeWidth="1.5"
    />

    {/* Site pins */}
    {[
      [598, 420],
      [720, 480],
      [800, 560],
      [630, 620],
      [760, 640],
    ].map(([x, y], i) => (
      <circle key={`pin-${i}`} cx={x} cy={y} r="6" fill={C.amber} opacity="0.85" />
    ))}

    {/* Vignette */}
    <defs>
      <radialGradient id="mapVig13" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.42)" />
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="1366" height="1024" fill="url(#mapVig13)" />
  </svg>
);

const GhostMap = () => (
  <div style={{ position: "absolute", inset: 0, background: "#1a1e2a" }}>
    <MapSVG />
  </div>
);

const ResolvePanel = ({ containerRef, headingRef, bodyRef }) => (
  <div
    ref={containerRef}
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding:
        "calc(96px + var(--safe-top)) var(--content-margin) calc(160px + var(--safe-bottom))",
      opacity: 0,
      visibility: "hidden",
      zIndex: 10,
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 880,
        background: C.bg,
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
        borderRadius: 20,
        padding: "40px 48px",
      }}
    >
      <div
        ref={headingRef}
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 22,
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          color: C.n950,
          textAlign: "left",
          opacity: 0,
        }}
      >
        step-14-section-7-product-software
      </div>
      <div
        ref={bodyRef}
        style={{
          fontFamily: FONT_BODY,
          fontSize: 17,
          lineHeight: 1.6,
          color: C.n800,
          marginTop: 12,
          textAlign: "left",
          opacity: 0,
        }}
      >
        Next section
      </div>
    </div>
  </div>
);

const TapPrompt = ({ containerRef }) => (
  <div
    ref={containerRef}
    aria-live="polite"
    style={{
      position: "absolute",
      bottom: "calc(72px + var(--safe-bottom))",
      left: 0,
      right: 0,
      textAlign: "center",
      opacity: 0,
      visibility: "hidden",
      zIndex: 11,
    }}
  >
    <div
      style={{
        fontFamily: FONT_BODY,
        fontSize: 15,
        color: C.n600,
        letterSpacing: "0.02em",
      }}
    >
      Tap to continue
    </div>
  </div>
);

const revealResolve = async (resolve, heading, body, prompt) => {
  resolve.style.visibility = "visible";
  await resolve.animate(
    [
      { opacity: 0, transform: "translateY(36px) scale(0.97)" },
      { opacity: 0.4, transform: "translateY(16px) scale(0.985)", offset: 0.4 },
      { opacity: 1, transform: "translateY(0) scale(1)" },
    ],
    { duration: 750, easing: EASING.settle, fill: "forwards" }
  ).finished;

  await new Promise((r) => setTimeout(r, 200));
  await heading.animate(
    [
      { opacity: 0, transform: "translateY(12px) scale(0.96)" },
      { opacity: 0.6, transform: "translateY(4px) scale(0.985)", offset: 0.5 },
      { opacity: 1, transform: "translateY(0) scale(1)" },
    ],
    { duration: 600, easing: EASING.settle, fill: "forwards" }
  ).finished;

  await new Promise((r) => setTimeout(r, 150));
  await body.animate(
    [
      { opacity: 0, transform: "translateY(8px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 450, easing: EASING.settle, fill: "forwards" }
  ).finished;

  await new Promise((r) => setTimeout(r, 300));
  prompt.style.visibility = "visible";
  prompt.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 400,
    fill: "forwards",
  });
};

const Lift = ({ playing, onDone }) => {
  const mapWrapRef = useRef(null);
  const resolveRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const promptRef = useRef(null);

  useEffect(() => {
    if (!playing) return;
    const mapWrap = mapWrapRef.current;
    const resolve = resolveRef.current;
    const heading = headingRef.current;
    const body = bodyRef.current;
    const prompt = promptRef.current;
    if (!mapWrap || !resolve || !heading || !body || !prompt) return;

    const run = async () => {
      await mapWrap.animate(
        [
          { transform: "perspective(1400px) rotateX(0deg)", opacity: 1, offset: 0 },
          { transform: "perspective(1400px) rotateX(-1deg)", opacity: 1, offset: 0.05 },
          { transform: "perspective(1400px) rotateX(-2.5deg)", opacity: 1, offset: 0.1 },
          { transform: "perspective(1400px) rotateX(-4.5deg)", opacity: 1, offset: 0.16 },
          { transform: "perspective(1400px) rotateX(-7deg)", opacity: 1, offset: 0.22 },
          { transform: "perspective(1400px) rotateX(-10deg)", opacity: 0.98, offset: 0.28 },
          { transform: "perspective(1400px) rotateX(-14deg)", opacity: 0.96, offset: 0.34 },
          { transform: "perspective(1400px) rotateX(-19deg)", opacity: 0.93, offset: 0.4 },
          { transform: "perspective(1400px) rotateX(-25deg)", opacity: 0.88, offset: 0.46 },
          { transform: "perspective(1400px) rotateX(-32deg)", opacity: 0.8, offset: 0.52 },
          { transform: "perspective(1400px) rotateX(-40deg)", opacity: 0.7, offset: 0.58 },
          { transform: "perspective(1400px) rotateX(-49deg)", opacity: 0.56, offset: 0.64 },
          { transform: "perspective(1400px) rotateX(-58deg)", opacity: 0.4, offset: 0.7 },
          { transform: "perspective(1400px) rotateX(-66deg)", opacity: 0.26, offset: 0.77 },
          { transform: "perspective(1400px) rotateX(-74deg)", opacity: 0.14, offset: 0.84 },
          { transform: "perspective(1400px) rotateX(-81deg)", opacity: 0.06, offset: 0.92 },
          { transform: "perspective(1400px) rotateX(-88deg)", opacity: 0, offset: 1 },
        ],
        { duration: 2000, easing: "linear", fill: "forwards" }
      ).finished;

      await new Promise((r) => setTimeout(r, 500));
      await revealResolve(resolve, heading, body, prompt);
      onDone();
    };
    run();
  }, [playing]);

  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: C.bg }} />
      <div
        ref={mapWrapRef}
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: "50% 100%",
          zIndex: 5,
        }}
      >
        <GhostMap />
      </div>
      <ResolvePanel
        containerRef={resolveRef}
        headingRef={headingRef}
        bodyRef={bodyRef}
      />
      <TapPrompt containerRef={promptRef} />
    </>
  );
};

const Push = ({ playing, onDone }) => {
  const mapWrapRef = useRef(null);
  const resolveRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const promptRef = useRef(null);

  useEffect(() => {
    if (!playing) return;
    const mapWrap = mapWrapRef.current;
    const resolve = resolveRef.current;
    const heading = headingRef.current;
    const body = bodyRef.current;
    const prompt = promptRef.current;
    if (!mapWrap || !resolve || !heading || !body || !prompt) return;

    const run = async () => {
      await mapWrap.animate(
        [
          { transform: "perspective(1100px) translateZ(0px) rotateX(0deg) scale(1)", opacity: 1, offset: 0 },
          { transform: "perspective(1100px) translateZ(-6px) rotateX(0.2deg) scale(0.998)", opacity: 1, offset: 0.05 },
          { transform: "perspective(1100px) translateZ(-16px) rotateX(0.5deg) scale(0.995)", opacity: 1, offset: 0.1 },
          { transform: "perspective(1100px) translateZ(-32px) rotateX(0.9deg) scale(0.99)", opacity: 1, offset: 0.16 },
          { transform: "perspective(1100px) translateZ(-54px) rotateX(1.5deg) scale(0.982)", opacity: 0.98, offset: 0.22 },
          { transform: "perspective(1100px) translateZ(-82px) rotateX(2.2deg) scale(0.972)", opacity: 0.96, offset: 0.28 },
          { transform: "perspective(1100px) translateZ(-118px) rotateX(3.1deg) scale(0.958)", opacity: 0.92, offset: 0.34 },
          { transform: "perspective(1100px) translateZ(-165px) rotateX(4.2deg) scale(0.94)", opacity: 0.86, offset: 0.4 },
          { transform: "perspective(1100px) translateZ(-220px) rotateX(5.4deg) scale(0.918)", opacity: 0.78, offset: 0.46 },
          { transform: "perspective(1100px) translateZ(-285px) rotateX(6.8deg) scale(0.892)", opacity: 0.68, offset: 0.52 },
          { transform: "perspective(1100px) translateZ(-355px) rotateX(8.2deg) scale(0.862)", opacity: 0.56, offset: 0.58 },
          { transform: "perspective(1100px) translateZ(-430px) rotateX(9.6deg) scale(0.828)", opacity: 0.44, offset: 0.64 },
          { transform: "perspective(1100px) translateZ(-510px) rotateX(10.8deg) scale(0.79)", opacity: 0.32, offset: 0.7 },
          { transform: "perspective(1100px) translateZ(-590px) rotateX(12deg) scale(0.748)", opacity: 0.22, offset: 0.76 },
          { transform: "perspective(1100px) translateZ(-660px) rotateX(13deg) scale(0.7)", opacity: 0.14, offset: 0.82 },
          { transform: "perspective(1100px) translateZ(-720px) rotateX(13.8deg) scale(0.66)", opacity: 0.07, offset: 0.88 },
          { transform: "perspective(1100px) translateZ(-775px) rotateX(14.5deg) scale(0.62)", opacity: 0.02, offset: 0.94 },
          { transform: "perspective(1100px) translateZ(-820px) rotateX(15deg) scale(0.58)", opacity: 0, offset: 1 },
        ],
        { duration: 2200, easing: "linear", fill: "forwards" }
      ).finished;

      await new Promise((r) => setTimeout(r, 500));

      resolve.style.visibility = "visible";
      await resolve.animate(
        [
          { opacity: 0, transform: "perspective(1100px) translateZ(-200px) rotateX(-2deg)" },
          { opacity: 0.1, transform: "perspective(1100px) translateZ(-150px) rotateX(-1.6deg)", offset: 0.15 },
          { opacity: 0.25, transform: "perspective(1100px) translateZ(-100px) rotateX(-1.1deg)", offset: 0.3 },
          { opacity: 0.45, transform: "perspective(1100px) translateZ(-60px) rotateX(-0.7deg)", offset: 0.48 },
          { opacity: 0.65, transform: "perspective(1100px) translateZ(-30px) rotateX(-0.35deg)", offset: 0.65 },
          { opacity: 0.85, transform: "perspective(1100px) translateZ(-10px) rotateX(-0.1deg)", offset: 0.82 },
          { opacity: 1, transform: "perspective(1100px) translateZ(0px) rotateX(0deg)" },
        ],
        { duration: 950, easing: EASING.settle, fill: "forwards" }
      ).finished;

      await new Promise((r) => setTimeout(r, 200));
      await heading.animate(
        [
          { opacity: 0, transform: "translateY(12px) scale(0.96)" },
          { opacity: 0.6, transform: "translateY(4px) scale(0.985)", offset: 0.5 },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        { duration: 600, easing: EASING.settle, fill: "forwards" }
      ).finished;

      await new Promise((r) => setTimeout(r, 150));
      await body.animate(
        [
          { opacity: 0, transform: "translateY(8px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 450, easing: EASING.settle, fill: "forwards" }
      ).finished;

      await new Promise((r) => setTimeout(r, 300));
      prompt.style.visibility = "visible";
      prompt.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 400,
        fill: "forwards",
      });
      onDone();
    };
    run();
  }, [playing]);

  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: C.bg }} />
      <div
        ref={mapWrapRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          transformOrigin: "50% 55%",
        }}
      >
        <GhostMap />
      </div>
      <ResolvePanel
        containerRef={resolveRef}
        headingRef={headingRef}
        bodyRef={bodyRef}
      />
      <TapPrompt containerRef={promptRef} />
    </>
  );
};

const VARIANTS = [
  { id: "B", label: "B: the lift", Component: Lift },
  { id: "D", label: "D: the push", Component: Push },
];

export default function Step13TransitionV2({
  variant = "B",
  orientation = "landscape",
} = {}) {
  void orientation;
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
      data-proto="step-13"
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
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-13"] *,
          [data-proto="step-13"] *::before,
          [data-proto="step-13"] *::after {
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
