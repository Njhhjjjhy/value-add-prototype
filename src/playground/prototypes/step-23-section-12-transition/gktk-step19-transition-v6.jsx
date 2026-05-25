import { useState, useRef, useCallback } from "react";

/* ───────────────────────────────────────────────────────
   step-19 section-10 transition — iPad Pro 13 M4
   Risk-factor cards clear away, then the next-section seal
   "Exit strategy" settles into view.
   Variants:
   A "the lift"   — cards rise up and fade out, last in first
   B "the settle" — cards drift down into a stacked pile, then fade
   ─────────────────────────────────────────────────────── */

const C = {
  bg: "#F9F9F9",
  n950: "#25272C",
  n900: "#383A42",
  n800: "#40444C",
  n600: "#5B616E",
  amber: "#FBB931",
};

const F = {
  h: '"REM", system-ui, sans-serif',
  b: '"Noto Sans JP", system-ui, sans-serif',
};

const E = {
  gentle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  settle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

const an = (el, kf, opts) => {
  if (!el) return Promise.resolve();
  return el.animate(kf, { fill: "forwards", ...opts }).finished;
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const Glass = ({ children, style = {}, panelRef, level = 1 }) => {
  const s =
    level === 1
      ? {
          bdr: "1px solid rgba(0,0,0,0.06)",
          sh: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
          rad: 20,
        }
      : {
          bdr: "1px solid rgba(0,0,0,0.08)",
          sh: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
          rad: 28,
        };
  return (
    <div
      ref={panelRef}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: s.rad,
        background: C.bg,
        border: s.bdr,
        boxShadow: s.sh,
        ...style,
      }}
    >
      <div style={{ position: "relative", zIndex: 3 }}>{children}</div>
    </div>
  );
};

const FAQ_GHOST = [
  "Liquidity and exit (exit liquidity)",
  "Demand concentration",
  "Infrastructure timing",
  "Tenant concentration",
  "Renovation and cost control (execution risk)",
];

const GhostFaq = ({ containerRef, cardRefs }) => (
  <div
    ref={containerRef}
    style={{
      position: "absolute",
      top: "calc(96px + var(--safe-top))",
      bottom: "calc(120px + var(--safe-bottom))",
      left: "var(--content-margin)",
      right: "var(--content-margin)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      zIndex: 3,
    }}
  >
    <div style={{ width: "100%", maxWidth: 880 }}>
      <div
        style={{
          fontFamily: F.b,
          fontWeight: 500,
          fontSize: 13,
          letterSpacing: "0.01em",
          color: C.n600,
          marginBottom: 24,
        }}
      >
        Risk factors
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {FAQ_GHOST.map((q, i) => (
          <Glass
            key={i}
            level={1}
            panelRef={(el) => {
              if (cardRefs) cardRefs.current[i] = el;
            }}
            style={{ padding: "20px 24px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  flex: 1,
                  fontFamily: F.b,
                  fontWeight: 500,
                  fontSize: 17,
                  lineHeight: 1.45,
                  color: C.n950,
                }}
              >
                {q}
              </div>
              <div style={{ fontSize: 18, color: C.n600, flexShrink: 0 }}>
                &#9662;
              </div>
            </div>
          </Glass>
        ))}
      </div>
    </div>
  </div>
);

const ResolveContent = ({ resolveRef }) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "var(--content-margin)",
      right: "var(--content-margin)",
      transform: "translateY(-50%)",
      display: "flex",
      justifyContent: "center",
      zIndex: 6,
    }}
  >
    <Glass
      level={2}
      panelRef={resolveRef}
      style={{
        padding: "48px 56px",
        opacity: 0,
        width: "100%",
        maxWidth: 720,
      }}
    >
      <div style={{ position: "relative", zIndex: 4 }}>
        <div
          style={{
            fontFamily: F.b,
            fontWeight: 500,
            fontSize: 13,
            letterSpacing: "0.18em",
            color: C.n600,
            marginBottom: 16,
            textTransform: "none",
          }}
        >
          Section 12
        </div>
        <div
          style={{
            fontFamily: F.h,
            fontWeight: 600,
            fontSize: 48,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: C.n950,
          }}
        >
          Exit strategy
        </div>
        <div
          style={{
            width: 64,
            height: 3,
            background: C.amber,
            borderRadius: 2,
            marginTop: 28,
            boxShadow: "0 0 12px rgba(251,185,49,0.4)",
          }}
        />
      </div>
    </Glass>
  </div>
);

const TapPrompt = ({ visible, label = "Tap to continue" }) => (
  <div
    aria-live="polite"
    style={{
      position: "absolute",
      bottom: "calc(48px + var(--safe-bottom))",
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      zIndex: 10,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(8px)",
      transition: `opacity 500ms ${E.smooth}, transform 500ms ${E.smooth}`,
      pointerEvents: "none",
    }}
  >
    <span
      style={{
        fontFamily: F.b,
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: "0.01em",
        color: C.n600,
      }}
    >
      {label}
    </span>
  </div>
);

const VariantA = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const resolveRef = useRef(null);
  const [showTap, setShowTap] = useState(false);
  const [resolveVisible, setResolveVisible] = useState(false);
  const running = useRef(false);

  const run = useCallback(async () => {
    if (running.current) return;
    running.current = true;

    const label = containerRef.current?.firstChild?.firstChild;
    if (label) {
      an(
        label,
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 300, easing: E.gentle }
      );
    }
    await wait(200);

    for (let i = 4; i >= 0; i--) {
      const card = cardRefs.current[i];
      if (!card) continue;
      an(
        card,
        [
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0.6, transform: "translateY(-48px)", offset: 0.4 },
          { opacity: 0.2, transform: "translateY(-128px)", offset: 0.75 },
          { opacity: 0, transform: "translateY(-220px)" },
        ],
        { duration: 600, easing: E.gentle }
      );
      await wait(100);
    }
    await wait(400);

    await wait(400);

    setResolveVisible(true);
    await wait(30);
    if (resolveRef.current) {
      await an(
        resolveRef.current,
        [
          { opacity: 0, transform: "translateY(40px) scale(0.97)" },
          {
            opacity: 0.6,
            transform: "translateY(12px) scale(0.99)",
            offset: 0.5,
          },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        { duration: 650, easing: E.settle }
      );
    }

    await wait(400);
    setShowTap(true);
  }, []);

  return (
    <div
      style={{ position: "absolute", inset: 0 }}
      onClick={!running.current ? run : undefined}
      role="button"
      tabIndex={0}
      aria-label="Tap to continue"
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !running.current) {
          e.preventDefault();
          run();
        }
      }}
    >
      <GhostFaq containerRef={containerRef} cardRefs={cardRefs} />
      {resolveVisible && <ResolveContent resolveRef={resolveRef} />}
      <TapPrompt
        visible={!running.current && !resolveVisible}
        label="Tap to see transition"
      />
      <TapPrompt visible={showTap} />
    </div>
  );
};

const VariantB = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const resolveRef = useRef(null);
  const [showTap, setShowTap] = useState(false);
  const [resolveVisible, setResolveVisible] = useState(false);
  const running = useRef(false);

  const run = useCallback(async () => {
    if (running.current) return;
    running.current = true;

    const label = containerRef.current?.firstChild?.firstChild;
    if (label) {
      an(
        label,
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 300, easing: E.gentle }
      );
    }
    await wait(200);

    // Settle target near the bottom of the inner content column
    const baseY = 520;
    for (let i = 0; i < 5; i++) {
      const card = cardRefs.current[i];
      if (!card) continue;
      const rect = card.getBoundingClientRect();
      const parentRect = containerRef.current?.getBoundingClientRect();
      const currentY = rect.top - (parentRect?.top || 0);
      const targetOffset = baseY - currentY + i * 4;
      const scaleVal = 0.92 - i * 0.02;

      an(
        card,
        [
          { opacity: 1, transform: "translateY(0) scale(1)" },
          {
            opacity: 0.7,
            transform: `translateY(${targetOffset * 0.4}px) scale(${
              1 - (1 - scaleVal) * 0.4
            })`,
            offset: 0.4,
          },
          {
            opacity: 0.35,
            transform: `translateY(${targetOffset * 0.8}px) scale(${scaleVal})`,
            offset: 0.75,
          },
          {
            opacity: 0.1,
            transform: `translateY(${targetOffset}px) scale(${scaleVal - 0.05})`,
          },
        ],
        { duration: 800, easing: E.gentle }
      );
      await wait(80);
    }
    await wait(600);

    if (containerRef.current) {
      await an(
        containerRef.current,
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 400, easing: E.gentle }
      );
    }

    await wait(400);

    setResolveVisible(true);
    await wait(30);
    if (resolveRef.current) {
      await an(
        resolveRef.current,
        [
          { opacity: 0, transform: "translateY(30px) scale(0.96)" },
          {
            opacity: 0.5,
            transform: "translateY(10px) scale(0.98)",
            offset: 0.45,
          },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        { duration: 700, easing: E.settle }
      );
    }

    await wait(400);
    setShowTap(true);
  }, []);

  return (
    <div
      style={{ position: "absolute", inset: 0 }}
      onClick={!running.current ? run : undefined}
      role="button"
      tabIndex={0}
      aria-label="Tap to continue"
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !running.current) {
          e.preventDefault();
          run();
        }
      }}
    >
      <GhostFaq containerRef={containerRef} cardRefs={cardRefs} />
      {resolveVisible && <ResolveContent resolveRef={resolveRef} />}
      <TapPrompt
        visible={!running.current && !resolveVisible}
        label="Tap to see transition"
      />
      <TapPrompt visible={showTap} />
    </div>
  );
};

const VARIANTS = {
  A: { name: "A: the lift", c: VariantA },
  B: { name: "B: the settle", c: VariantB },
};

export default function Step19TransitionV6({
  variant = "A"
} = {}) {
  const resolved = VARIANTS[variant] ? variant : "A";
  const Cur = VARIANTS[resolved].c;

  return (
    <div
      data-proto="step-19"
      style={{ position: "absolute", inset: 0, background: C.bg }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-19"] *,
          [data-proto="step-19"] *::before,
          [data-proto="step-19"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
      <Cur key={resolved} />
    </div>
  );
}
