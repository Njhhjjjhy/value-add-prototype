import { useState, useRef, useCallback, useEffect } from "react";

/* ───────────────────────────────────────────────────────
   step-1 opening transition — iPad Pro 13 M4
   Hold-to-confirm splash. Five variants:
   A "the mark"     — favicon logo + heading + chevron button
   B "the seal"     — favicon-as-button (no separate logo)
   C "the pulse"    — seal + breathing halos
   D "the thread"   — heading top + vertical amber spine + seal
   E "the layered"  — editorial left-aligned + seal at bottom
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

export default function Step1OpeningTransition({ variant = "A" } = {}) {
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

  const isSeal = variant === "B" || variant === "C" || variant === "D" || variant === "E";
  const hasPulse = variant === "C";
  const hasThread = variant === "D";
  const hasLayered = variant === "E";

  // iPad-scaled button: chevron at 144px, favicon-as-button at 168px
  const ringSize = isSeal ? 168 : 144;
  const ringR = isSeal ? 80 : 68;
  const ringC = ringSize / 2;
  const circ = 2 * Math.PI * ringR;
  const sealFaviconSize = 132;

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
        @keyframes mh-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes mh-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes mh-halo {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.8); opacity: 0; }
        }
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

      {/* Step content — fades + scales down when hold completes */}
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
        {/* ── Variant E: editorial layered (top-left) ── */}
        {hasLayered && (
          <div
            style={{
              position: "absolute",
              top: "calc(160px + var(--safe-top))",
              left: "var(--content-margin)",
              right: "var(--content-margin)",
              maxWidth: 980,
            }}
          >
            <div
              style={{
                fontFamily: FONT_BODY,
                fontSize: 13,
                fontWeight: 500,
                color: C.caption,
                letterSpacing: "0.18em",
                marginBottom: 28,
              }}
            >
              ENTER
            </div>
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontSize: 128,
                fontWeight: 600,
                color: C.heading,
                letterSpacing: "-0.035em",
                lineHeight: 0.96,
              }}
            >
              MoreHarvest
            </div>
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontSize: 64,
                fontWeight: 600,
                color: C.sub,
                letterSpacing: "-0.02em",
                marginTop: 8,
                fontStyle: "italic",
              }}
            >
              world
            </div>
            <div
              style={{
                width: 96,
                height: 3,
                background: C.amber,
                borderRadius: 2,
                marginTop: 36,
                boxShadow: "0 0 16px rgba(251,185,49,0.4)",
              }}
            />
          </div>
        )}

        {/* ── Variant D: thread (heading top + amber spine) ── */}
        {hasThread && (
          <>
            <h1
              style={{
                position: "absolute",
                top: "calc(180px + var(--safe-top))",
                left: 0,
                right: 0,
                textAlign: "center",
                fontFamily: FONT_HEADING,
                fontSize: 32,
                fontWeight: 600,
                color: C.sub,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Enter MoreHarvest world
            </h1>
            <div
              style={{
                position: "absolute",
                top: "calc(260px + var(--safe-top))",
                bottom: "calc(280px + var(--safe-bottom))",
                left: "50%",
                width: 2,
                transform: "translateX(-1px)",
                background: C.amber,
                boxShadow: "0 0 12px rgba(251,185,49,0.4)",
              }}
            >
              {[0.2, 0.5, 0.8].map((t, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: `${t * 100}%`,
                    left: -10,
                    width: 22,
                    height: 2,
                    background: C.amber,
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* ── Variants A/B/C: centered logo (optional) + heading ── */}
        {!hasLayered && !hasThread && (
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
            {!isSeal && (
              <img
                src="/logos-and-icons/favicon.svg"
                alt="MoreHarvest"
                width={200}
                height={200}
                style={{ display: "block" }}
              />
            )}
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
        )}

        {/* ── Bottom cluster: hold-to-confirm button + caption ── */}
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
            {/* Pulse halos (variant C only, paused while pressing) */}
            {hasPulse && !pressing && (
              <>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    border: `3px solid ${C.amber}`,
                    animation: "mh-halo 2.8s ease-out infinite",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    border: `3px solid ${C.amber}`,
                    animation: "mh-halo 2.8s ease-out infinite",
                    animationDelay: "0.93s",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    border: `3px solid ${C.amber}`,
                    animation: "mh-halo 2.8s ease-out infinite",
                    animationDelay: "1.86s",
                    pointerEvents: "none",
                  }}
                />
              </>
            )}

            {isSeal ? (
              /* Favicon-as-button */
              <img
                src="/logos-and-icons/favicon.svg"
                alt="Enter MoreHarvest world"
                width={sealFaviconSize}
                height={sealFaviconSize}
                style={{
                  position: "absolute",
                  top: (ringSize - sealFaviconSize) / 2,
                  left: (ringSize - sealFaviconSize) / 2,
                  display: "block",
                  animation: hasPulse ? "mh-breathe 2.4s ease-in-out infinite" : undefined,
                }}
              />
            ) : (
              <>
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
              </>
            )}

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

            {/* Idle scout dot (variant C) */}
            {hasPulse && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  animation: "mh-orbit 4s linear infinite",
                  pointerEvents: "none",
                  opacity: pressing ? 0 : 1,
                  transition: "opacity 200ms ease",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: ringC - ringR - 4,
                    left: ringC - 4,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: C.amber,
                    boxShadow: "0 0 12px rgba(251,185,49,0.6)",
                  }}
                />
              </div>
            )}
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
