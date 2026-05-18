import { useState, useEffect, useRef, useCallback } from "react";

/* ───────────────────────────────────────────────────────
   step-5 section-3 transition — iPad Pro 13 M4
   Bridge → map handoff. Four variants:
   A "the gravity well" — particles collapse to a focal point
   C "the shutter"      — top + bottom bands close, seam, reopen
   D "the approach"     — radial streak warp (default)
   E "the recede"       — bridge recedes in z-depth, map appears
   ─────────────────────────────────────────────────────── */

const C = {
  bg: "#F9F9F9",
  n100: "#EDEEF1",
  n200: "#D8DBDF",
  n400: "#8E8F8F",
  n600: "#5B616E",
  n800: "#40444C",
  n900: "#383A42",
  n950: "#25272C",
  amber: "#FBB931",
  amber100: "#FEF2C9",
  orange: "#FF9424",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const GENTLE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const SETTLE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

const an = (el, kf, opts) => {
  if (!el) return Promise.resolve();
  return el.animate(kf, opts).finished;
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ─────────── shared chrome ─────────── */

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

const GlowDot = ({ size = 8, style = {} }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: C.amber,
      ...style,
    }}
  />
);

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
      <GlowDot size={8} />
      <span
        style={{
          fontFamily: FONT_BODY,
          fontWeight: 500,
          fontSize: 15,
          color: C.n600,
        }}
      >
        Tap to continue
      </span>
    </div>
  );
}

/* ─────────── ghost bridge (iPad-scaled outgoing content) ─────────── */

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
      <div
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <GlassPanel
          level={2}
          style={{
            padding: "40px 44px",
            flex: "1 1 520px",
            minWidth: 360,
          }}
        >
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 500,
              color: C.n600,
              margin: "0 0 16px",
              letterSpacing: "0.18em",
            }}
          >
            SEMICONDUCTOR INVESTMENT CORRIDOR
          </p>
          <p
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 96,
              color: C.n950,
              margin: "0 0 8px",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            10T
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 17,
              fontWeight: 500,
              color: C.n600,
              margin: 0,
            }}
          >
            yen in confirmed investment
          </p>
        </GlassPanel>
        <GlassPanel
          level={1}
          style={{
            padding: "32px 36px",
            flex: "1 1 360px",
            minWidth: 280,
            alignSelf: "flex-start",
          }}
        >
          <p
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 56,
              color: C.n950,
              margin: "0 0 8px",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            47,000
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 15,
              fontWeight: 500,
              color: C.n600,
              margin: 0,
            }}
          >
            new jobs projected by 2027
          </p>
        </GlassPanel>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 880,
        }}
      >
        {[
          "TSMC / JASM fab complex",
          "Sony semiconductor expansion",
          "Government infrastructure program",
        ].map((t, i) => (
          <GlassPanel
            key={i}
            level={1}
            borderRadius={12}
            style={{
              padding: "20px 28px",
              opacity: 0.78 - i * 0.08,
            }}
          >
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 17,
                fontWeight: 500,
                color: C.n800,
                margin: 0,
              }}
            >
              {t}
            </p>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}

/* ─────────── map destination ─────────── */

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
    <div
      ref={mapRef}
      style={{ position: "absolute", inset: 0, opacity: animate ? 0 : 1 }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#1C1E22",
          overflow: "hidden",
        }}
      >
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
            x="480"
            y="340"
            width="420"
            height="340"
            rx="14"
            fill="rgba(251,185,49,0.08)"
            stroke="rgba(251,185,49,0.25)"
            strokeWidth="1.5"
          />
          {[
            { x: 580, y: 420, active: true },
            { x: 760, y: 480, active: false },
            { x: 680, y: 560, active: false },
            { x: 830, y: 450, active: true },
            { x: 610, y: 520, active: false },
          ].map((p, i) => (
            <g key={`p${i}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r={p.active ? 9 : 6}
                fill={p.active ? C.amber : C.orange}
                opacity={p.active ? 0.9 : 0.5}
              />
              {p.active && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={20}
                  fill="none"
                  stroke={C.amber}
                  strokeWidth="1.5"
                  opacity="0.3"
                />
              )}
            </g>
          ))}
          <defs>
            <pattern id="mapGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="rgba(255,255,255,0.02)"
                strokeWidth="0.5"
              />
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

/* ─────────── variant A: gravity well ─────────── */

function GravityWellTransition({ onComplete }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [phase, setPhase] = useState("ready");
  const particlesRef = useRef(null);

  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 500; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 100 + Math.random() * 700;
      particles.push({
        origX: Math.cos(angle) * dist,
        origY: Math.sin(angle) * dist,
        size: 1.5 + Math.random() * 3.5,
        speed: 0.3 + Math.random() * 0.7,
        brightness: 0.2 + Math.random() * 0.5,
        isAmber: Math.random() < 0.25,
      });
    }
    particlesRef.current = particles;
  }, []);

  const startCollapse = useCallback(() => {
    if (phase !== "ready") return;
    setPhase("collapsing");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width,
      H = canvas.height;
    const cx = W / 2,
      cy = H * 0.45;
    const particles = particlesRef.current;
    const duration = 3800;
    const start = performance.now();

    const draw = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      ctx.clearRect(0, 0, W, H);

      let collapse;
      if (t < 0.15) collapse = (t / 0.15) * 0.05;
      else if (t < 0.55) collapse = 0.05 + ((t - 0.15) / 0.4) * 0.55;
      else if (t < 0.82) collapse = 0.6 + ((t - 0.55) / 0.27) * 0.35;
      else collapse = 0.95 + ((t - 0.82) / 0.18) * 0.05;

      if (t > 0.1 && t < 0.85) {
        const distT = (t - 0.1) / 0.75;
        for (let r = 0; r < 5; r++) {
          const radius = (1 - distT * 0.7) * (160 + r * 120);
          const alpha = Math.sin(distT * Math.PI) * 0.06 * (1 - r / 5);
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(237,238,241,${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      for (const p of particles) {
        const pull = collapse * p.speed;
        const px = p.origX * (1 - pull);
        const py = p.origY * (1 - pull);
        const sx = cx + px,
          sy = cy + py;

        if (collapse > 0.2) {
          const tx = cx + px * (1 + collapse * 0.08);
          const ty = cy + py * (1 + collapse * 0.08);
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(tx, ty);
          ctx.strokeStyle = p.isAmber
            ? `rgba(251,185,49,${p.brightness * 0.3 * Math.min(collapse, 0.8)})`
            : `rgba(138,143,154,${p.brightness * 0.3 * Math.min(collapse, 0.8)})`;
          ctx.lineWidth = p.size * 0.5;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, p.size * (1 - collapse * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = p.isAmber
          ? `rgba(251,185,49,${p.brightness * (1 - collapse * 0.5)})`
          : `rgba(169,169,175,${p.brightness * (1 - collapse * 0.5)})`;
        ctx.fill();
      }

      /* central glow removed per flat-design mandate (no radial gradients) */

      if (t > 0.82) {
        const flashAlpha = ((t - 0.82) / 0.18) ** 2;
        ctx.fillStyle = `rgba(249,249,249,${flashAlpha * 0.95})`;
        ctx.fillRect(0, 0, W, H);
      }

      if (t < 1) animRef.current = requestAnimationFrame(draw);
      else {
        setPhase("done");
      }
    };
    animRef.current = requestAnimationFrame(draw);
  }, [phase]);

  useEffect(
    () => () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    },
    []
  );

  return (
    <div
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      onClick={phase === "ready" ? startCollapse : undefined}
      role="button"
      tabIndex={0}
    >
      {(phase === "ready" || phase === "collapsing") && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: phase === "collapsing" ? 0 : 1,
            transition: "opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <GhostBridge />
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={1366}
        height={1024}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
      {phase === "ready" && <ReadyPrompt />}
      {phase === "done" && <MapDestination onReplay={onComplete} />}
    </div>
  );
}

/* ─────────── variant C: shutter ─────────── */

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
      { duration: 600, easing: GENTLE, fill: "forwards" }
    );

    await wait(200);

    an(
      topBandRef.current,
      [{ transform: "translateY(-100%)" }, { transform: "translateY(0%)" }],
      { duration: 750, easing: SETTLE, fill: "forwards" }
    );
    await an(
      botBandRef.current,
      [{ transform: "translateY(100%)" }, { transform: "translateY(0%)" }],
      { duration: 750, easing: SETTLE, fill: "forwards" }
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
      { duration: 500, easing: "ease-in-out", fill: "forwards" }
    );

    await wait(150);

    setPhase("opening");
    an(
      topBandRef.current,
      [{ transform: "translateY(0%)" }, { transform: "translateY(-100%)" }],
      { duration: 650, easing: SETTLE, fill: "forwards" }
    );
    await an(
      botBandRef.current,
      [{ transform: "translateY(0%)" }, { transform: "translateY(100%)" }],
      { duration: 650, easing: SETTLE, fill: "forwards" }
    );

    await wait(200);
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

/* ─────────── variant D: approach (warp streaks) ─────────── */

function ApproachTransition({ onComplete }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [phase, setPhase] = useState("ready");
  const linesRef = useRef(null);

  useEffect(() => {
    const lines = [];
    for (let i = 0; i < 700; i++) {
      lines.push({
        angle: Math.random() * Math.PI * 2,
        baseDist: 40 + Math.random() * 160,
        speedMult: 0.5 + Math.random() * 1.5,
        maxDist: 600 + Math.random() * 800,
        isAmber: Math.random() < 0.35,
        brightness: 0.4 + Math.random() * 0.6,
        thickness: 0.8 + Math.random() * 2.0,
      });
    }
    linesRef.current = lines;
  }, []);

  const startWarp = useCallback(() => {
    if (phase !== "ready") return;
    setPhase("warping");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width,
      H = canvas.height;
    const cx = W / 2,
      cy = H * 0.42;
    const lines = linesRef.current;
    const duration = 4000;
    const start = performance.now();

    const draw = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      ctx.clearRect(0, 0, W, H);

      let accel, lineAlpha;
      if (t < 0.2) {
        const p = t / 0.2;
        accel = p * 0.03;
        lineAlpha = p * 0.15;
      } else if (t < 0.4) {
        const p = (t - 0.2) / 0.2;
        accel = 0.03 + p * 0.07;
        lineAlpha = 0.15 + p * 0.15;
      } else if (t < 0.6) {
        const p = (t - 0.4) / 0.2;
        accel = 0.1 + p * 0.25;
        lineAlpha = 0.3 + p * 0.2;
      } else if (t < 0.78) {
        const p = (t - 0.6) / 0.18;
        accel = 0.35 + p * 0.35;
        lineAlpha = 0.5 + p * 0.25;
      } else if (t < 0.9) {
        const p = (t - 0.78) / 0.12;
        accel = 0.7 + p * 0.3;
        lineAlpha = 0.75 + p * 0.25;
      } else {
        accel = 1.0;
        lineAlpha = 1.0;
      }

      const coolMix = Math.min(t * 1.2, 1);

      /* vignette removed per flat-design mandate (no radial gradients) */

      for (const line of lines) {
        const dist = line.baseDist + accel * line.speedMult * line.maxDist;
        const len = 4 + accel * line.speedMult * 120;
        const x1 = cx + Math.cos(line.angle) * dist;
        const y1 = cy + Math.sin(line.angle) * dist;
        const x2 = cx + Math.cos(line.angle) * (dist - len);
        const y2 = cy + Math.sin(line.angle) * (dist - len);

        let r, g, b;
        if (line.isAmber) {
          r = Math.round(251 - coolMix * 82);
          g = Math.round(185 - coolMix * 16);
          b = Math.round(49 + coolMix * 120);
        } else {
          r = Math.round(169 - coolMix * 20);
          g = Math.round(169 - coolMix * 15);
          b = Math.round(169 + coolMix * 10);
        }

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha * line.brightness * 0.6})`;
        ctx.lineWidth = line.thickness;
        ctx.stroke();
      }

      /* center glow removed per flat-design mandate (no radial gradients) */

      if (t > 0.9) {
        const flashAlpha = ((t - 0.9) / 0.1) ** 3;
        ctx.fillStyle = `rgba(249,249,249,${flashAlpha * 0.95})`;
        ctx.fillRect(0, 0, W, H);
      }

      if (t < 1) animRef.current = requestAnimationFrame(draw);
      else setPhase("done");
    };
    animRef.current = requestAnimationFrame(draw);
  }, [phase]);

  useEffect(
    () => () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    },
    []
  );

  return (
    <div
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      onClick={phase === "ready" ? startWarp : undefined}
      role="button"
      tabIndex={0}
    >
      {(phase === "ready" || phase === "warping") && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: phase === "warping" ? 0 : 1,
            transition: "opacity 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <GhostBridge />
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={1366}
        height={1024}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
      {phase === "ready" && <ReadyPrompt />}
      {phase === "done" && <MapDestination onReplay={onComplete} />}
    </div>
  );
}

/* ─────────── variant E: recede ─────────── */

function RecedeTransition({ onComplete }) {
  const [phase, setPhase] = useState("ready");
  const ghostRef = useRef(null);

  const startRecede = useCallback(async () => {
    if (phase !== "ready") return;
    setPhase("receding");

    await an(
      ghostRef.current,
      [
        { transform: "scale(1) translateZ(0px)", opacity: 1 },
        { transform: "scale(0.92) translateZ(-60px)", opacity: 0.7 },
        { transform: "scale(0.78) translateZ(-150px)", opacity: 0.35 },
        { transform: "scale(0.6) translateZ(-280px)", opacity: 0 },
      ],
      { duration: 1100, easing: GENTLE, fill: "forwards" }
    );

    await wait(500);
    setPhase("done");
  }, [phase]);

  return (
    <div
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      onClick={phase === "ready" ? startRecede : undefined}
      role="button"
      tabIndex={0}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: "1400px",
          perspectiveOrigin: "50% 45%",
        }}
      >
        <div
          ref={ghostRef}
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            transformOrigin: "50% 45%",
          }}
        >
          <GhostBridge />
        </div>
      </div>
      {phase === "ready" && <ReadyPrompt />}
      {phase === "done" && <MapDestination onReplay={onComplete} />}
    </div>
  );
}

/* ─────────── variants + root ─────────── */

const VARIANTS = [
  { key: "A", label: "A: the gravity well", Component: GravityWellTransition },
  { key: "C", label: "C: the shutter", Component: ShutterTransition },
  { key: "D", label: "D: the approach", Component: ApproachTransition },
  { key: "E", label: "E: the recede", Component: RecedeTransition },
];

export default function Step5TransitionV3({ variant, orientation = "landscape" } = {}) {
  const resolved = VARIANTS.find((v) => v.key === variant) ? variant : "D";
  const [flowKey, setFlowKey] = useState(0);
  const current = VARIANTS.find((v) => v.key === resolved);

  // Orientation is consumed by the playground viewer (it swaps the iPad
  // shell dimensions); the prototype itself fills inset:0 so it adapts
  // automatically. Kept here so the prop signature matches every step.
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
      <current.Component
        key={`${resolved}-${flowKey}`}
        onComplete={() => setFlowKey((k) => k + 1)}
      />
    </div>
  );
}
