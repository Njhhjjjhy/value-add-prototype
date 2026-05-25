import { useState, useRef, useCallback, useEffect } from "react";

/* ───────────────────────────────────────────────────────
   step-1 opening transition — iPad Pro 13 M4
   Variant A "the mark" — favicon logo + heading + chevron hold-to-confirm
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  amber: "#FBB931",
  bg: "#F9F9F9",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

export default function Step1OpeningTransition() {
  const [blank, setBlank] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pressing, setPressing] = useState(false);
  const [done, setDone] = useState(false);
  const raf = useRef(null);
  const startT = useRef(null);
  const prog = useRef(0);
  const DUR = 1200;

  const startPress = useCallback(() => {
    if (done) return;
    setPressing(true);
    startT.current = performance.now() - (prog.current / 100) * DUR;
    const tick = (now) => {
      const p = Math.min((now - startT.current) / DUR, 1);
      prog.current = p * 100;
      setProgress(p * 100);
      if (p >= 1) {
        setDone(true);
        setTimeout(() => setBlank(true), 150);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [done]);

  const endPress = useCallback(() => {
    setPressing(false);
    if (raf.current) cancelAnimationFrame(raf.current);
    if (done) return;
    const sp = prog.current;
    const t0 = performance.now();
    const decay = (now) => {
      const p = Math.max(sp - ((now - t0) / 400) * sp, 0);
      prog.current = p;
      setProgress(p);
      if (p > 0.1) {
        raf.current = requestAnimationFrame(decay);
      } else {
        prog.current = 0;
        setProgress(0);
      }
    };
    raf.current = requestAnimationFrame(decay);
  }, [done]);

  useEffect(() => {
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const ringSize = 144;
  const ringR = 68;
  const ringC = ringSize / 2;
  const circ = 2 * Math.PI * ringR;

  return (
    <div
      data-proto="step-1"
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-1"] *,
          [data-proto="step-1"] *::before,
          [data-proto="step-1"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: C.bg,
          opacity: blank ? 0 : 1,
          transform: blank ? "scale(0.97)" : "scale(1)",
          transition:
            "opacity 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Centered: favicon + heading */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding:
              "var(--safe-top) var(--content-margin) calc(280px + var(--safe-bottom))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <img
            src="/logos-and-icons/favicon.svg"
            alt="MoreHarvest"
            width={200}
            height={200}
            style={{ display: "block" }}
          />
          <h1
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 32,
              fontWeight: 600,
              color: C.sub,
              letterSpacing: "-0.02em",
              margin: 0,
              textAlign: "center",
            }}
          >
            Enter MoreHarvest world
          </h1>
        </div>

        {/* Bottom cluster: hold-to-confirm button + caption */}
        <div
          style={{
            position: "absolute",
            bottom: "calc(96px + var(--safe-bottom))",
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            onMouseDown={startPress}
            onMouseUp={endPress}
            onMouseLeave={endPress}
            onTouchStart={(e) => {
              e.preventDefault();
              startPress();
            }}
            onTouchEnd={endPress}
            onTouchCancel={endPress}
            role="button"
            aria-label="Hold to enter MoreHarvest world"
            style={{
              position: "relative",
              width: ringSize,
              height: ringSize,
              transform: pressing ? "scale(0.94)" : "scale(1)",
              transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
              userSelect: "none",
              WebkitUserSelect: "none",
              touchAction: "none",
            }}
          >
            {/* Glass circle background */}
            <div
              style={{
                position: "absolute",
                inset: 6,
                borderRadius: "50%",
                background: C.bg,
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
              }}
            />
            {/* Chevron icon */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width={36} height={36} viewBox="0 0 20 20" fill="none">
                <path
                  d="M7.5 4L13.5 10L7.5 16"
                  stroke={C.heading}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Progress ring */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: ringSize,
                height: ringSize,
                transform: "rotate(-90deg)",
                pointerEvents: "none",
              }}
            >
              <circle
                cx={ringC}
                cy={ringC}
                r={ringR}
                fill="none"
                stroke="rgba(0,0,0,0.06)"
                strokeWidth={4}
              />
              <circle
                cx={ringC}
                cy={ringC}
                r={ringR}
                fill="none"
                stroke={C.amber}
                strokeWidth={4}
                strokeDasharray={circ}
                strokeDashoffset={circ - (progress / 100) * circ}
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 17,
              fontWeight: 400,
              color: C.caption,
              opacity: 0.72,
              marginTop: 28,
              letterSpacing: "0.02em",
            }}
          >
            Hold to enter
          </p>
        </div>
      </div>
    </div>
  );
}
