import { useState, useRef, useCallback } from "react";

/* ───────────────────────────────────────────────────────
   step-15 section-8 transition — iPad Pro 13 M4
   Three-beat transition into the financials section:
   Beat 1 — software-feature chips snap onto a grid
   Beat 2 — chips collapse into a single amber datum point
   Beat 3 — heading "The investment case." resolves in
   Single variant.
   ─────────────────────────────────────────────────────── */

const EASE = {
  gentle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  settle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  disabled: "#8E8F8F",
  amber: "#FBB931",
  bg: "#F9F9F9",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const FEATURES = [
  "Property secretary",
  "Medical navigation",
  "Education support",
  "Admin support",
  "Mental wellness",
  "Cultural program",
];

export default function Step15TransitionV4() {
  const headingRef = useRef(null);
  const elemRefs = useRef([]);
  const datumRef = useRef(null);
  const [phase, setPhase] = useState("ready");
  const [showTap, setShowTap] = useState(false);
  const running = useRef(false);

  const isLandscape = orientation === "landscape";

  // iPad-scaled spread of the chip cluster.
  // Beat 1 snaps the chips into a tighter grid; values are tuned for the
  // larger canvas so the collapse to centre still reads cleanly.
  const spreadX = isLandscape ? 180 : 140;
  const spreadY = isLandscape ? 140 : 110;

  const play = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    setPhase("playing");
    const elems = elemRefs.current.filter(Boolean);
    const datum = datumRef.current;
    const h = headingRef.current;

    // Beat 1: snap to grid
    for (let i = 0; i < elems.length; i++) {
      elems[i].animate(
        [
          { transform: "translateX(0) translateY(0) scale(1)", borderRadius: "12px" },
          {
            transform: `translateX(${(i % 3 - 1) * spreadX}px) translateY(${
              Math.floor(i / 3) * spreadY - spreadY / 2
            }px) scale(0.7)`,
            borderRadius: "4px",
          },
        ],
        { duration: 400, delay: i * 60, easing: EASE.smooth, fill: "forwards" }
      );
    }
    await new Promise((r) => setTimeout(r, 600));

    // Beat 2: compress to center
    for (const el of elems) {
      el.animate(
        [{ opacity: 1 }, { transform: "translateX(0) translateY(0) scale(0.1)", opacity: 0 }],
        { duration: 350, easing: EASE.gentle, fill: "forwards" }
      );
    }
    if (datum) {
      await datum.animate(
        [
          { opacity: 0, transform: "translate(-50%,-50%) scale(0)" },
          { opacity: 1, transform: "translate(-50%,-50%) scale(1)" },
        ],
        { duration: 300, easing: EASE.spring, fill: "forwards" }
      ).finished;
      await new Promise((r) => setTimeout(r, 200));
      datum.animate(
        [
          { opacity: 1, transform: "translate(-50%,-50%) scale(1)" },
          { opacity: 0, transform: "translate(-50%,-50%) scale(3)" },
        ],
        { duration: 400, easing: EASE.gentle, fill: "forwards" }
      );
    }
    await new Promise((r) => setTimeout(r, 400));

    // Beat 3: resolve text
    if (h) {
      await h.animate(
        [
          { opacity: 0, transform: "translateY(12px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 500, easing: EASE.settle, fill: "forwards" }
      ).finished;
    }
    await new Promise((r) => setTimeout(r, 600));
    setShowTap(true);
  }, [spreadX, spreadY]);

  const reset = () => {
    running.current = false;
    setPhase("ready");
    setShowTap(false);
    [...elemRefs.current, datumRef.current, headingRef.current].forEach((r) =>
      r?.getAnimations().forEach((a) => a.cancel())
    );
  };

  return (
    <div
      data-proto="step-15"
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        fontFamily: FONT_BODY,
      }}
      onClick={phase === "ready" ? play : reset}
      role="button"
      tabIndex={0}
      aria-label={phase === "ready" ? "Tap to play transition" : "Reset"}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (phase === "ready") play();
          else reset();
        }
      }}
    >
      <style>{`
        @keyframes tapPulse {
          0%, 100% { opacity: .6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-15"] *,
          [data-proto="step-15"] *::before,
          [data-proto="step-15"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>

      {/* Software-feature chips — Beat 1 stage.
          Centered cluster; the orchestrating animations translate each chip
          from this neutral position out to its grid slot. */}
      <div
        style={{
          position: "absolute",
          top: "calc(120px + var(--safe-top))",
          left: "var(--content-margin)",
          right: "var(--content-margin)",
          bottom: "calc(120px + var(--safe-bottom))",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          zIndex: 5,
        }}
      >
        {FEATURES.map((s, i) => (
          <div
            key={i}
            ref={(el) => (elemRefs.current[i] = el)}
            style={{
              background: C.bg,
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow:
                "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
              borderRadius: 12,
              padding: "12px 24px",
              fontFamily: FONT_BODY,
              fontSize: 17,
              fontWeight: 500,
              color: C.body,
              letterSpacing: 0,
              minHeight: 44,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Beat 2 — amber datum point */}
      <div
        ref={datumRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%) scale(0)",
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: C.amber,
          boxShadow: "0 0 24px rgba(251,185,49,0.45)",
          zIndex: 10,
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* Beat 3 — resolved heading */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 var(--content-margin)",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <div
          ref={headingRef}
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 48,
            color: C.heading,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            opacity: 0,
            textAlign: "left",
            maxWidth: 880,
            margin: 0,
          }}
        >
          The investment case.
        </div>
      </div>

      {/* Tap-to-continue caption after the sequence resolves */}
      <div
        aria-live="polite"
        style={{
          position: "absolute",
          bottom: "calc(72px + var(--safe-bottom))",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          zIndex: 30,
          opacity: showTap ? 1 : 0,
          transition: "opacity 0.4s",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 13,
            color: C.disabled,
            letterSpacing: "0.015em",
          }}
        >
          Tap to continue
        </div>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: C.amber,
            animation: "tapPulse 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Idle hint before the user starts the sequence */}
      {phase === "ready" && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(72px + var(--safe-bottom))",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: 25,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              color: C.disabled,
              letterSpacing: "0.015em",
            }}
          >
            Tap to play transition
          </div>
        </div>
      )}
    </div>
  );
}
