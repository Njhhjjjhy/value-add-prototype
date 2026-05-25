import { useState, useEffect, useRef, useCallback } from "react";

/* ───────────────────────────────────────────────────────
   step-5 section-3 transition — iPad Pro 13 M4
   Variant A "the shutter" — bridge → map handoff.
   Top + bottom bands close, seam flashes amber, bands
   reopen onto the map destination.
   Durations slowed 25% per QA round 1 (original × 1.25).
   ─────────────────────────────────────────────────────── */

const C = {
  bg: "#F9F9F9",
  n100: "#EDEEF1",
  n200: "#D8DBDF",
  n600: "#5B616E",
  n800: "#40444C",
  n950: "#25272C",
  amber: "#FBB931",
  orange: "#FF9424",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const GENTLE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const SETTLE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

const T = {
  ghostFade: 750,
  preBandsWait: 250,
  bandsClose: 938,
  seamFlash: 625,
  postSeamWait: 188,
  bandsOpen: 813,
  finalWait: 250,
};

const an = (el, kf, opts) => {
  if (!el) return Promise.resolve();
  return el.animate(kf, opts).finished;
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function GlassPanel({ level = 1, borderRadius = 20, children, style = {}, innerRef, ...props }) {
  const isL2 = level === 2;
  return (
    <div
      ref={innerRef}
      style={{
        position: "relative",
        borderRadius,
        background: "#F9F9F9",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: isL2
          ? "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)"
          : "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        overflow: "hidden",
        ...style,
      }}
      {...props}
    >
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

function ReadyPrompt() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "calc(64px + var(--safe-bottom))",
        left: "var(--content-margin)",
        right: "var(--content-margin)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        zIndex: 10,
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.amber }} />
      <span style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 15, color: C.n600 }}>
        Tap to continue
      </span>
    </div>
  );
}

function GhostBridge() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding:
          "calc(96px + var(--safe-top)) var(--content-margin) calc(64px + var(--safe-bottom))",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <GlassPanel
          level={2}
          style={{ padding: "40px 44px", flex: "1 1 520px", minWidth: 360 }}
        >
          <p style={{
            fontFamily: FONT_BODY, fontSize: 13, fontWeight: 500, color: C.n600,
            margin: "0 0 16px", letterSpacing: "0.18em",
          }}>
            SEMICONDUCTOR INVESTMENT CORRIDOR
          </p>
          <p style={{
            fontFamily: FONT_HEADING, fontWeight: 600, fontSize: 96, color: C.n950,
            margin: "0 0 8px", letterSpacing: "-0.03em", lineHeight: 1,
          }}>
            10T
          </p>
          <p style={{
            fontFamily: FONT_BODY, fontSize: 17, fontWeight: 500, color: C.n600, margin: 0,
          }}>
            yen in confirmed investment
          </p>
        </GlassPanel>
        <GlassPanel
          level={1}
          style={{ padding: "32px 36px", flex: "1 1 360px", minWidth: 280, alignSelf: "flex-start" }}
        >
          <p style={{
            fontFamily: FONT_HEADING, fontWeight: 600, fontSize: 56, color: C.n950,
            margin: "0 0 8px", letterSpacing: "-0.02em", lineHeight: 1,
          }}>
            47,000
          </p>
          <p style={{
            fontFamily: FONT_BODY, fontSize: 15, fontWeight: 500, color: C.n600, margin: 0,
          }}>
            new jobs projected by 2030
          </p>
        </GlassPanel>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        {[
          "TSMC / JASM fab complex",
          "Sony semiconductor expansion",
          "Government infrastructure program",
        ].map((t, i) => (
          <GlassPanel
            key={i}
            level={1}
            borderRadius={12}
            style={{ padding: "20px 28px", opacity: 0.78 - i * 0.08 }}
          >
            <p style={{ fontFamily: FONT_BODY, fontSize: 17, fontWeight: 500, color: C.n800, margin: 0 }}>
              {t}
            </p>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}

function MapDestination({ onReplay, animate = true }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (animate && mapRef.current) {
      mapRef.current.animate(
        [
          { opacity: 0, transform: "scale(1.02)" },
          { opacity: 0.5, transform: "scale(1.01)" },
          { opacity: 0.9, transform: "scale(1.005)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: 600, easing: SETTLE, fill: "forwards" }
      );
    }
  }, [animate]);

  return (
    <div ref={mapRef} style={{ position: "absolute", inset: 0, opacity: animate ? 0 : 1 }}>
      <div style={{ position: "absolute", inset: 0, background: "#1C1E22", overflow: "hidden" }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1366 1024"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", inset: 0 }}
        >
          {[200, 320, 440, 560, 680, 800, 920].map((y, i) => (
            <path
              key={`c${i}`}
              d={`M0 ${y} Q340 ${y - 30 - i * 8} 683 ${y - 14 + (i % 2) * 24} Q1020 ${y + 14 - i * 5} 1366 ${y - 8}`}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1.5"
              fill="none"
            />
          ))}
          <line x1="220" y1="0" x2="440" y2="1024" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="720" y1="0" x2="940" y2="1024" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="0" y1="440" x2="1366" y2="480" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="0" y1="640" x2="1366" y2="590" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <rect
            x="480" y="340" width="420" height="340" rx="14"
            fill="rgba(251,185,49,0.08)" stroke="rgba(251,185,49,0.25)" strokeWidth="1.5"
          />
          {[
            { x: 580, y: 420, active: true },
            { x: 760, y: 480, active: false },
            { x: 680, y: 560, active: false },
            { x: 830, y: 450, active: true },
            { x: 610, y: 520, active: false },
          ].map((p, i) => (
            <g key={`p${i}`}>
              <circle cx={p.x} cy={p.y} r={p.active ? 9 : 6} fill={p.active ? C.amber : C.orange} opacity={p.active ? 0.9 : 0.5} />
              {p.active && (
                <circle cx={p.x} cy={p.y} r={20} fill="none" stroke={C.amber} strokeWidth="1.5" opacity="0.3" />
              )}
            </g>
          ))}
          <defs>
            <pattern id="mapGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="1366" height="1024" fill="url(#mapGrid)" />
        </svg>
      </div>

      <button
        onClick={onReplay}
        style={{
          position: "absolute",
          top: "calc(40px + var(--safe-top))",
          right: "var(--content-margin)",
          zIndex: 200,
          background: "#F9F9F9",
          border: "1px solid rgba(0,0,0,0.06)",
          borderRadius: 12,
          padding: "14px 22px",
          minHeight: 48,
          fontFamily: FONT_BODY,
          fontSize: 15,
          fontWeight: 500,
          color: C.n950,
          boxShadow: "0 2px 12px rgba(0,0,0,0.20)",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "manipulation",
        }}
      >
        Replay
      </button>
    </div>
  );
}

function ShutterTransition({ onComplete }) {
  const [phase, setPhase] = useState("ready");
  const ghostRef = useRef(null);
  const topBandRef = useRef(null);
  const botBandRef = useRef(null);
  const seamRef = useRef(null);

  const startShutter = useCallback(async () => {
    if (phase !== "ready") return;
    setPhase("closing");

    await an(
      ghostRef.current,
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0.6, transform: "scale(0.99)" },
        { opacity: 0.3, transform: "scale(0.98)" },
        { opacity: 0, transform: "scale(0.96)" },
      ],
      { duration: T.ghostFade, easing: GENTLE, fill: "forwards" }
    );

    await wait(T.preBandsWait);

    an(
      topBandRef.current,
      [{ transform: "translateY(-100%)" }, { transform: "translateY(0%)" }],
      { duration: T.bandsClose, easing: SETTLE, fill: "forwards" }
    );
    await an(
      botBandRef.current,
      [{ transform: "translateY(100%)" }, { transform: "translateY(0%)" }],
      { duration: T.bandsClose, easing: SETTLE, fill: "forwards" }
    );

    await an(
      seamRef.current,
      [
        { opacity: 0 },
        { opacity: 0.6 },
        { opacity: 0.8 },
        { opacity: 0.6 },
        { opacity: 0 },
      ],
      { duration: T.seamFlash, easing: "ease-in-out", fill: "forwards" }
    );

    await wait(T.postSeamWait);

    setPhase("opening");
    an(
      topBandRef.current,
      [{ transform: "translateY(0%)" }, { transform: "translateY(-100%)" }],
      { duration: T.bandsOpen, easing: SETTLE, fill: "forwards" }
    );
    await an(
      botBandRef.current,
      [{ transform: "translateY(0%)" }, { transform: "translateY(100%)" }],
      { duration: T.bandsOpen, easing: SETTLE, fill: "forwards" }
    );

    await wait(T.finalWait);
    setPhase("done");
  }, [phase]);

  return (
    <div
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      onClick={phase === "ready" ? startShutter : undefined}
      role="button"
      tabIndex={0}
    >
      <div ref={ghostRef} style={{ position: "absolute", inset: 0 }}>
        <GhostBridge />
      </div>

      <div
        ref={topBandRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: C.n100,
          transform: "translateY(-100%)",
          zIndex: 20,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      />

      <div
        ref={botBandRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: C.n100,
          transform: "translateY(100%)",
          zIndex: 20,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        }}
      />

      <div
        ref={seamRef}
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 3,
          transform: "translateY(-50%)",
          background: C.amber,
          opacity: 0,
          zIndex: 25,
        }}
      />

      {phase === "ready" && <ReadyPrompt />}
      {phase === "done" && <MapDestination onReplay={onComplete} />}
    </div>
  );
}

export default function Step5TransitionV3({ orientation = "landscape" } = {}) {
  const [flowKey, setFlowKey] = useState(0);
  void orientation;

  return (
    <div
      data-proto="step-5"
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        fontFamily: FONT_BODY,
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-5"] *,
          [data-proto="step-5"] *::before,
          [data-proto="step-5"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
      <ShutterTransition key={flowKey} onComplete={() => setFlowKey((k) => k + 1)} />
    </div>
  );
}
