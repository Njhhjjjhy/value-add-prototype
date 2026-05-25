import { useState, useRef, useCallback, useEffect } from "react";

/* ───────────────────────────────────────────────────────
   step-2 section-1 entry — iPad Pro 13 M4
   Variant A "the warmth" — chip cluster, logo top-left.
   Hold-to-confirm enters the bridge paragraph via sweep band.
   Tap bridge to reset.
   ─────────────────────────────────────────────────────── */

const AMBER = "#FBB931";
const N = {
  950: "#25272C",
  900: "#383A42",
  800: "#40444C",
  600: "#5B616E",
  dis: "#8E8F8F",
};
const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const HOLD_DURATION = 800;
const RING_SIZE = 72;
const RING_R = 33;
const RING_C = RING_SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * RING_R;
const SWEEP_DURATION = 700;

function Logo({ id, size }) {
  const h = size * (24 / 56);
  return (
    <svg width={size} height={h} viewBox="0 0 56 24" fill="none">
      <path d="M11.4499 0.0119694C15.6113 -0.0472805 18.8225 1.72909 21.2495 5.09096C24.5588 9.67532 27.9048 14.2327 31.2296 18.8058C32.4795 20.5248 32.5275 21.4623 31.4681 22.8832C30.431 24.2744 28.131 24.409 27.0638 23.0429C25.3525 20.8525 23.7371 18.5861 22.0689 16.3612C19.9435 13.5269 17.8404 10.6743 15.6611 7.88283C14.2228 6.04046 12.2237 5.62871 10.0574 6.14771C8.0471 6.62921 6.79123 7.98483 6.03273 9.92507C5.13493 12.2227 6.2764 15.1016 8.03892 16.4186C10.0269 17.9039 12.7964 17.9332 14.8814 16.4992C15.9014 15.7976 16.5373 14.7911 16.9745 13.6657C17.2078 13.0653 17.3827 12.9502 17.7846 13.5153C18.6887 14.7862 19.5828 16.0661 20.5326 17.3017C21.0003 17.9103 21.0081 18.4106 20.5542 19.0181C18.1052 22.2963 14.8907 23.9403 10.7865 23.7367C4.09413 23.4037 -0.687161 17.2882 0.0809956 10.2449C0.601025 5.47683 4.73117 1.07584 8.72833 0.275594C9.62613 0.0959692 10.5295 -0.0424055 11.4499 0.0119694V0.0119694Z" fill={`url(#p0_${id})`} />
      <path d="M38.6392 10.6906C37.536 9.15947 36.4132 7.61222 35.3059 6.05372C35.1116 5.78035 35.3036 5.52947 35.4622 5.29923C37.4294 2.44923 40.0638 0.693108 43.5472 0.412984C48.5926 0.00685967 52.3175 2.17098 54.645 6.60572C57.5427 12.1272 55.6505 19.0474 50.3146 22.3118C45.3844 25.3279 38.5382 23.9134 34.9136 18.7992C31.6426 14.1841 28.281 9.63422 24.9699 5.0476C23.7738 3.39085 23.7233 2.53998 24.6742 1.21773C25.6582 -0.15064 28.0515 -0.25039 29.0618 1.09736C32.1433 5.20735 35.187 9.34584 38.2496 13.4705C38.8513 14.2808 39.4583 15.0875 40.082 15.8802C42.2 18.5731 45.8651 18.9582 48.3185 16.7543C51.0208 14.327 51.2043 10.5335 48.7404 8.0431C45.6819 4.95198 40.6306 6.01285 39.0374 10.0778C38.9631 10.2676 38.9981 10.5185 38.6392 10.691V10.6906Z" fill={`url(#p1_${id})`} />
      <defs>
        <linearGradient id={`p0_${id}`} x1="32.2182" y1="-2.02546e-06" x2="-2.35867" y2="4.09781" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBB931" /><stop offset="1" stopColor="#FF8660" />
        </linearGradient>
        <linearGradient id={`p1_${id}`} x1="55.9996" y1="0.137327" x2="21.6733" y2="4.21983" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBB931" /><stop offset="1" stopColor="#FF8660" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function EntryWarmth() {
  return (
    <>
      <div className="entry-logo"><Logo id="warmth" size={80} /></div>
      <div
        style={{
          position: "absolute",
          bottom: "calc(180px + var(--safe-bottom))",
          left: "var(--content-margin)",
          right: "var(--content-margin)",
          maxWidth: 1040,
        }}
      >
        <h1 className="entry-h1">Why Kumamoto,<br />Why Now?</h1>
        <p className="entry-sub" style={{ marginBottom: 32 }}>{"Japan's fastest-rising property market"}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <span className="fact-chip">Serviced apartments</span>
          <span className="fact-chip">TSMC / JASM hub</span>
          <span className="fact-chip">Taiwanese engineers</span>
          <span className="fact-chip bold">12-15% IRR</span>
        </div>
      </div>
    </>
  );
}

function BridgeContent() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 var(--content-margin)",
        background: "#F9F9F9",
      }}
    >
      <div className="entry-logo"><Logo id="bridge" size={80} /></div>
      <div style={{ maxWidth: 880 }}>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 22,
            fontWeight: 400,
            color: N[800],
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          The COVID-era chip shortage exposed a hard truth: semiconductor security is national security. Now, Japan is investing over 10 trillion yen to rebuild its chip industry.
        </p>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 18,
            fontWeight: 400,
            color: N[600],
            lineHeight: 1.65,
            marginTop: 24,
          }}
        >
          With over 47,000 jobs being created, Kumamoto is set to attract waves of high-income engineers, fueling real estate growth for decades.
        </p>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 13,
            color: N.dis,
            marginTop: 36,
            letterSpacing: "0.01em",
          }}
        >
          Tap anywhere to reset
        </p>
      </div>
    </div>
  );
}

export default function GKTKEntryTransitions() {
  const [phase, setPhase] = useState("entry");
  const [holdProgress, setHoldProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const holdStart = useRef(null);
  const holdRaf = useRef(null);
  const holdConfirmed = useRef(false);
  const transTimer = useRef(null);

  const resetToEntry = useCallback(() => {
    if (transTimer.current) clearTimeout(transTimer.current);
    holdStart.current = null;
    holdConfirmed.current = false;
    setHoldProgress(0);
    setHolding(false);
    setPhase("entry");
  }, []);

  const startTransition = useCallback(() => {
    setPhase("transitioning");
    transTimer.current = setTimeout(() => setPhase("bridge"), SWEEP_DURATION);
  }, []);

  const animateHold = useCallback(() => {
    if (!holdStart.current) return;
    const elapsed = Date.now() - holdStart.current;
    const p = Math.min(elapsed / HOLD_DURATION, 1);
    setHoldProgress(p);
    if (p >= 1 && !holdConfirmed.current) {
      holdConfirmed.current = true;
      startTransition();
      return;
    }
    if (p < 1) holdRaf.current = requestAnimationFrame(animateHold);
  }, [startTransition]);

  const onHoldStart = useCallback(
    (e) => {
      e.preventDefault();
      if (phase !== "entry") return;
      holdConfirmed.current = false;
      holdStart.current = Date.now();
      setHolding(true);
      holdRaf.current = requestAnimationFrame(animateHold);
    },
    [phase, animateHold],
  );

  const onHoldEnd = useCallback(() => {
    holdStart.current = null;
    setHolding(false);
    if (holdRaf.current) cancelAnimationFrame(holdRaf.current);
    if (!holdConfirmed.current) setHoldProgress(0);
  }, []);

  useEffect(
    () => () => {
      if (holdRaf.current) cancelAnimationFrame(holdRaf.current);
      if (transTimer.current) clearTimeout(transTimer.current);
    },
    [],
  );

  const dashOffset = CIRCUMFERENCE * (1 - holdProgress);

  return (
    <div
      data-proto="step-2"
      style={{
        position: "absolute",
        inset: 0,
        background: "#F9F9F9",
        fontFamily: FONT_BODY,
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-2"] *,
          [data-proto="step-2"] *::before,
          [data-proto="step-2"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }

        [data-proto="step-2"] .entry-logo {
          position: absolute;
          top: calc(96px + var(--safe-top));
          left: var(--content-margin);
        }
        [data-proto="step-2"] .entry-h1 {
          font-family: ${FONT_HEADING};
          font-weight: 600;
          font-size: 72px;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: ${N[950]};
          margin: 0 0 16px 0;
        }
        [data-proto="step-2"] .entry-sub {
          font-family: ${FONT_BODY};
          font-size: 22px;
          font-weight: 400;
          color: ${N[900]};
          line-height: 1.5;
          margin: 0;
        }
        [data-proto="step-2"] .fact-chip {
          display: inline-block;
          padding: 10px 22px;
          border-radius: 9999px;
          background: #F9F9F9;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
          font-family: ${FONT_BODY};
          font-size: 15px;
          font-weight: 500;
          color: ${N[600]};
          letter-spacing: 0.01em;
          line-height: 1.4;
        }
        [data-proto="step-2"] .fact-chip.bold {
          font-weight: 600;
          color: ${N[950]};
        }

        @keyframes sweepOut { 0% { clip-path: inset(0 0 0 0); } 100% { clip-path: inset(0 0 0 100%); } }
        @keyframes sweepIn { from { clip-path: inset(0 100% 0 0); opacity: 0.8; } to { clip-path: inset(0 0 0 0); opacity: 1; } }
        @keyframes sweepBand { 0% { clip-path: inset(0 100% 0 0); } 45% { clip-path: inset(0 0 0 0); } 55% { clip-path: inset(0 0 0 0); } 100% { clip-path: inset(0 0 0 100%); } }
      `}</style>

      <div style={{ position: "absolute", inset: 0 }}>
        {phase === "entry" && (
          <div style={{ position: "absolute", inset: 0 }}>
            <EntryWarmth />
          </div>
        )}
        {phase === "transitioning" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              animation: `sweepOut ${SWEEP_DURATION}ms ease-in-out forwards`,
            }}
          >
            <EntryWarmth />
          </div>
        )}
        {phase === "bridge" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              animation: `sweepIn 0.5s ease-out forwards`,
            }}
            onClick={resetToEntry}
            role="button"
            tabIndex={0}
            aria-label="Reset"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                resetToEntry();
              }
            }}
          >
            <BridgeContent />
          </div>
        )}
      </div>

      {phase === "entry" && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(72px + var(--safe-bottom))",
            right: "var(--content-margin)",
            zIndex: 10,
            width: RING_SIZE,
            height: RING_SIZE,
            touchAction: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
          onPointerDown={onHoldStart}
          onPointerUp={onHoldEnd}
          onPointerLeave={onHoldEnd}
          onPointerCancel={onHoldEnd}
          role="button"
          aria-label="Hold to enter"
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#F9F9F9",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: holding
                ? "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)"
                : "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
              transition: "box-shadow 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
          <svg
            style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
            width={RING_SIZE}
            height={RING_SIZE}
          >
            <circle
              cx={RING_C}
              cy={RING_C}
              r={RING_R}
              fill="none"
              stroke={AMBER}
              strokeWidth="3"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              style={{
                transition: holding
                  ? "none"
                  : "stroke-dashoffset 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            />
          </svg>
          <svg
            style={{
              position: "absolute",
              top: (RING_SIZE - 28) / 2,
              left: (RING_SIZE - 28) / 2,
            }}
            width="28"
            height="28"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M7 4l6 6-6 6"
              stroke={N[950]}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {phase === "transitioning" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            background: "#EDEEF1",
            animation: `sweepBand ${SWEEP_DURATION}ms ease-in-out forwards`,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
