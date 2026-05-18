import { useState, useRef, useCallback } from "react";

/* ───────────────────────────────────────────────────────
   step-20 section-10 exit strategy — iPad Pro 13 M4
   Two variants:
   A "the reveal"  — heading, guide line, cards materialize one by one
   C "the depth"   — cards enter with CSS 3D; stat is hero metric
   Both end on a Beat 2 CTA: "Download PDF"
   ─────────────────────────────────────────────────────── */

/* ─── approved content only (reduced from wireframe) ─── */
const EXIT_PATHS = [
  {
    id: "reit",
    name: "CapitaLand REIT injection",
    stat: "2 to 3%",
    statLabel: "ROFR discount",
    body: "Contractual right of first refusal. Pre-negotiated exit pipeline.",
  },
  {
    id: "market",
    name: "Open market sale",
    stat: "Master lease",
    statLabel: "in place at sale",
    body: "De-risked acquisition. Premium valuation from stable industrial demand.",
  },
];

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

/* ─── easing ─── */
const EASE = {
  gentle: "cubic-bezier(0.4, 0, 0.2, 1)",
  settle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
};

const an = (el, keyframes, options) => {
  if (!el) return Promise.resolve();
  return el.animate(keyframes, { fill: "forwards", ...options }).finished;
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ─── flat panel (was GlassPanel; specular + inner glow removed per flat-design mandate) ─── */
const GlassPanel = ({ children, level = 1, style = {}, innerRef }) => {
  const levels = {
    1: {
      background: C.bg,
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
    },
    2: {
      background: C.bg,
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
    },
  };
  return (
    <div
      ref={innerRef}
      style={{
        borderRadius: 20,
        position: "relative",
        overflow: "hidden",
        ...levels[level],
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const TapPrompt = ({ innerRef, label = "Tap to continue" }) => (
  <div
    ref={innerRef}
    aria-live="polite"
    style={{
      position: "absolute",
      bottom: "calc(48px + var(--safe-bottom))",
      left: 0,
      right: 0,
      textAlign: "center",
      opacity: 0,
      zIndex: 50,
    }}
  >
    <span
      style={{
        fontFamily: FONT_BODY,
        fontSize: 13,
        color: C.caption,
        letterSpacing: 0.3,
      }}
    >
      {label}
    </span>
  </div>
);

/* ─── shared beat 2 ─── */
const Beat2Content = ({ ctaRef }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      paddingLeft: "var(--content-margin)",
      paddingRight: "var(--content-margin)",
    }}
  >
    <div ref={ctaRef} style={{ opacity: 0, width: "100%", maxWidth: 480 }}>
      <button
        className="step-20-cta"
        style={{
          background: C.amber,
          border: "none",
          borderRadius: 12,
          padding: "22px 0",
          width: "100%",
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 22,
          color: C.heading,
          minHeight: 72,
        }}
      >
        Download PDF
      </button>
    </div>
  </div>
);

const playBeat2Anim = async (running, ctaRef) => {
  await wait(200);
  await an(
    ctaRef.current,
    [
      { opacity: 0, transform: "translateY(10px) scale(0.96)" },
      { opacity: 0.6, transform: "translateY(3px) scale(0.99)" },
      { opacity: 1, transform: "translateY(0) scale(1)" },
    ],
    { duration: 550, easing: EASE.settle }
  );
  running.current = false;
};

/* ───────────────────────────────────────────────
   A: THE REVEAL
   Heading, guide line, cards materialize one by one.
   ─────────────────────────────────────────────── */

const VariantA = ({ orientation }) => {
  const [beat, setBeat] = useState(0);
  const running = useRef(false);
  const headRef = useRef(null);
  const subRef = useRef(null);
  const guideRef = useRef(null);
  const cardRefs = useRef([]);
  const tapRef = useRef(null);
  const ctaRef = useRef(null);
  const isLandscape = orientation === "landscape";

  const playBeat1 = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    setBeat(1);
    await an(
      headRef.current,
      [
        { opacity: 0, transform: "translateY(16px)" },
        { opacity: 0.5, transform: "translateY(5px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 550, easing: EASE.settle }
    );
    await wait(120);
    await an(
      subRef.current,
      [
        { opacity: 0, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 400, easing: EASE.settle }
    );
    await wait(250);
    await an(
      guideRef.current,
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 450, easing: EASE.settle }
    );
    await wait(350);
    await an(
      cardRefs.current[0],
      [
        { opacity: 0, transform: "translateY(30px) scale(0.96)" },
        { opacity: 0.4, transform: "translateY(14px) scale(0.98)" },
        { opacity: 0.8, transform: "translateY(4px) scale(0.99)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ],
      { duration: 650, easing: EASE.settle }
    );
    await wait(250);
    await an(
      cardRefs.current[1],
      [
        { opacity: 0, transform: "translateY(30px) scale(0.96)" },
        { opacity: 0.4, transform: "translateY(14px) scale(0.98)" },
        { opacity: 0.8, transform: "translateY(4px) scale(0.99)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ],
      { duration: 650, easing: EASE.settle }
    );
    await wait(350);
    await an(
      tapRef.current,
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 400, easing: EASE.smooth }
    );
    running.current = false;
  }, []);

  const handleTap = () => {
    if (running.current) return;
    if (beat === 0) playBeat1();
    else if (beat === 1) {
      running.current = true;
      setBeat(2);
      playBeat2Anim(running, ctaRef);
    }
  };

  return (
    <>
      <div
        onClick={handleTap}
        role="button"
        tabIndex={0}
        aria-label="Continue"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleTap();
          }
        }}
        style={{ position: "absolute", inset: 0, zIndex: 60 }}
      />
      <div
        style={{
          position: "absolute",
          top: "calc(96px + var(--safe-top))",
          bottom: "calc(96px + var(--safe-bottom))",
          left: "var(--content-margin)",
          right: "var(--content-margin)",
          display: beat <= 1 ? "flex" : "none",
          flexDirection: "column",
          maxWidth: 1120,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      >
        <div ref={headRef} style={{ opacity: 0, marginBottom: 12 }}>
          <span
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 48,
              color: C.heading,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            Exit strategy
          </span>
        </div>
        <div ref={subRef} style={{ opacity: 0, marginBottom: 32 }}>
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 18,
              color: C.body,
              lineHeight: 1.6,
            }}
          >
            Two structured paths to liquidity, plus built-in asset flexibility.
          </span>
        </div>
        <div ref={guideRef} style={{ opacity: 0, marginBottom: 40 }}>
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 18,
              color: C.body,
              fontStyle: "italic",
              lineHeight: 1.6,
            }}
          >
            Two doors. One is already unlocked.
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isLandscape ? "1fr 1fr" : "1fr",
            gap: isLandscape ? 32 : 20,
          }}
        >
          {EXIT_PATHS.map((ep, i) => (
            <div
              key={ep.id}
              ref={(el) => (cardRefs.current[i] = el)}
              style={{ opacity: 0 }}
            >
              <GlassPanel level={2} style={{ padding: "32px 32px" }}>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div
                    style={{
                      fontFamily: FONT_HEADING,
                      fontWeight: 600,
                      fontSize: 22,
                      color: C.heading,
                      marginBottom: 20,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {ep.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      background: "#EDEEF1",
                      borderRadius: 12,
                      padding: "16px 20px",
                      marginBottom: 20,
                      gap: 16,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT_HEADING,
                        fontWeight: 600,
                        fontSize: 32,
                        color: C.heading,
                        lineHeight: 1.15,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {ep.stat}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 15,
                        color: C.caption,
                        textAlign: "right",
                      }}
                    >
                      {ep.statLabel}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 17,
                      color: C.body,
                      lineHeight: 1.6,
                    }}
                  >
                    {ep.body}
                  </div>
                </div>
              </GlassPanel>
            </div>
          ))}
        </div>
        <TapPrompt innerRef={tapRef} />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: beat === 2 ? "block" : "none",
        }}
      >
        <Beat2Content ctaRef={ctaRef} />
      </div>
      {beat === 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 40,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 17,
              color: C.caption,
            }}
          >
            Tap to play
          </span>
        </div>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setBeat(0);
          running.current = false;
        }}
        style={{
          position: "absolute",
          bottom: "calc(16px + var(--safe-bottom))",
          right: "calc(20px + var(--safe-right))",
          zIndex: 70,
          background: "rgba(0,0,0,0.04)",
          border: "none",
          borderRadius: 8,
          padding: "8px 14px",
          fontFamily: FONT_BODY,
          fontSize: 13,
          color: C.caption,
        }}
      >
        Reset
      </button>
    </>
  );
};

/* ───────────────────────────────────────────────
   C: THE DEPTH
   Cards enter with CSS 3D. Stat is hero metric.
   ─────────────────────────────────────────────── */

const VariantC = ({ orientation }) => {
  const [beat, setBeat] = useState(0);
  const running = useRef(false);
  const headRef = useRef(null);
  const subRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const tapRef = useRef(null);
  const ctaRef = useRef(null);
  const isLandscape = orientation === "landscape";

  const playBeat1 = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    setBeat(1);
    await an(
      headRef.current,
      [
        { opacity: 0, transform: "translateY(14px)" },
        { opacity: 0.6, transform: "translateY(4px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 500, easing: EASE.settle }
    );
    await wait(100);
    await an(
      subRef.current,
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 400, easing: EASE.settle }
    );
    await wait(350);
    await an(
      card1Ref.current,
      [
        {
          opacity: 0,
          transform:
            "perspective(1200px) translateZ(-80px) rotateX(6deg) translateY(28px)",
        },
        {
          opacity: 0.5,
          transform:
            "perspective(1200px) translateZ(-28px) rotateX(2deg) translateY(10px)",
        },
        {
          opacity: 1,
          transform:
            "perspective(1200px) translateZ(0) rotateX(0deg) translateY(0)",
        },
      ],
      { duration: 700, easing: EASE.settle }
    );
    await wait(300);
    await an(
      card2Ref.current,
      [
        {
          opacity: 0,
          transform:
            "perspective(1200px) translateZ(-80px) rotateX(6deg) translateY(28px)",
        },
        {
          opacity: 0.5,
          transform:
            "perspective(1200px) translateZ(-28px) rotateX(2deg) translateY(10px)",
        },
        {
          opacity: 1,
          transform:
            "perspective(1200px) translateZ(0) rotateX(0deg) translateY(0)",
        },
      ],
      { duration: 700, easing: EASE.settle }
    );
    await wait(350);
    await an(
      tapRef.current,
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 400, easing: EASE.smooth }
    );
    running.current = false;
  }, []);

  const handleTap = () => {
    if (running.current) return;
    if (beat === 0) playBeat1();
    else if (beat === 1) {
      running.current = true;
      setBeat(2);
      playBeat2Anim(running, ctaRef);
    }
  };

  const renderCard = (ep, ref) => (
    <div ref={ref} style={{ opacity: 0 }}>
      <GlassPanel level={2} style={{ padding: "36px 32px" }}>
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              color: C.caption,
              marginBottom: 8,
              letterSpacing: "0.04em",
              textTransform: "none",
            }}
          >
            {ep.statLabel}
          </div>
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 56,
              color: C.heading,
              marginBottom: 16,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}
          >
            {ep.stat}
          </div>
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 22,
              color: C.heading,
              marginBottom: 12,
              letterSpacing: "-0.01em",
            }}
          >
            {ep.name}
          </div>
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 17,
              color: C.body,
              lineHeight: 1.6,
            }}
          >
            {ep.body}
          </div>
        </div>
      </GlassPanel>
    </div>
  );

  return (
    <>
      <div
        onClick={handleTap}
        role="button"
        tabIndex={0}
        aria-label="Continue"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleTap();
          }
        }}
        style={{ position: "absolute", inset: 0, zIndex: 60 }}
      />
      <div
        style={{
          position: "absolute",
          top: "calc(96px + var(--safe-top))",
          bottom: "calc(96px + var(--safe-bottom))",
          left: "var(--content-margin)",
          right: "var(--content-margin)",
          display: beat <= 1 ? "flex" : "none",
          flexDirection: "column",
          maxWidth: 1120,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      >
        <div ref={headRef} style={{ opacity: 0, marginBottom: 12 }}>
          <span
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 48,
              color: C.heading,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            Exit strategy
          </span>
        </div>
        <div ref={subRef} style={{ opacity: 0, marginBottom: 40 }}>
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 18,
              color: C.body,
              lineHeight: 1.6,
            }}
          >
            Two structured paths to liquidity, plus built-in asset flexibility.
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isLandscape ? "1fr 1fr" : "1fr",
            gap: isLandscape ? 32 : 24,
          }}
        >
          {renderCard(EXIT_PATHS[0], card1Ref)}
          {renderCard(EXIT_PATHS[1], card2Ref)}
        </div>
        <TapPrompt innerRef={tapRef} />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: beat === 2 ? "block" : "none",
        }}
      >
        <Beat2Content ctaRef={ctaRef} />
      </div>
      {beat === 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 40,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 17,
              color: C.caption,
            }}
          >
            Tap to play
          </span>
        </div>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setBeat(0);
          running.current = false;
        }}
        style={{
          position: "absolute",
          bottom: "calc(16px + var(--safe-bottom))",
          right: "calc(20px + var(--safe-right))",
          zIndex: 70,
          background: "rgba(0,0,0,0.04)",
          border: "none",
          borderRadius: 8,
          padding: "8px 14px",
          fontFamily: FONT_BODY,
          fontSize: 13,
          color: C.caption,
        }}
      >
        Reset
      </button>
    </>
  );
};

/* ─── main ─── */
const VARIANTS = [
  { id: "A", label: "A: the reveal", component: VariantA },
  { id: "C", label: "C: the depth", component: VariantC },
];

export default function Step20ExitStrategy({
  variant = "A",
  orientation = "landscape",
} = {}) {
  const resolved = VARIANTS.find((v) => v.id === variant) ? variant : "A";
  const ActiveComponent =
    VARIANTS.find((v) => v.id === resolved)?.component || VariantA;
  return (
    <div
      data-proto="step-20"
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        fontFamily: FONT_BODY,
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-20"] *,
          [data-proto="step-20"] *::before,
          [data-proto="step-20"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
        .step-20-cta { transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1); }
        .step-20-cta:active { transform: scale(0.98); }
      `}</style>
      <ActiveComponent key={resolved} orientation={orientation} />
    </div>
  );
}
