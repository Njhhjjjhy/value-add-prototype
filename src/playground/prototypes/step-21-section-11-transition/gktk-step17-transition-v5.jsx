import { useState, useRef, useEffect } from "react";

/* ───────────────────────────────────────────────────────
   step-21 section-11 transition — iPad Pro 13 M4
   Hand-off from Section 10 (Financials) → Section 11 (Risk).

   The legacy "Financial projections" ghost block (post-tax IRR
   18.4%, equity multiple 2.1x, cash-on-cash 8.7%, payback 5.2
   yrs, exit cap 4.8%, NOI 48.2M JPY) used to fade out before the
   resolve panel mounted. That block is retired per
   src/content/steps/step-21-section-11-transition.ts. It is NOT
   migrated and must not return.

   The resolve panel now mounts directly with a settle-in animation.

   Two variants:
     recede   — resolve panel rises in and settles.
     shutter  — amber-lined bands sweep in from top/bottom, hold
                a beat, then open to reveal the resolve panel.
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  disabled: "#8E8F8F",
  amber: "#FBB931",
  amber50: "#FFFBEC",
  amber100: "#FEF2C9",
  hairline: "#EDEEF1",
  bg: "#F9F9F9",
};

const EASING = {
  gentle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  settle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  sharp: "cubic-bezier(0.4, 0, 0.2, 1)",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const an = (el, keyframes, options) => {
  if (!el) return Promise.resolve();
  return el.animate(keyframes, { fill: "forwards", ...options }).finished;
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ───────────────────────────────────────────────────────
   Resolve panel — incoming section 11 anchor
   ─────────────────────────────────────────────────────── */
const ResolvePanel = ({ panelRef, style }) => (
  <div
    ref={panelRef}
    style={{
      position: "relative",
      background: C.bg,
      border: "1px solid rgba(0,0,0,0.08)",
      borderRadius: 28,
      boxShadow:
        "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
      padding: "48px 56px",
      ...style,
    }}
  >
    <div
      style={{
        fontFamily: FONT_BODY,
        fontSize: 13,
        fontWeight: 500,
        color: C.caption,
        letterSpacing: "0.18em",
        marginBottom: 20,
      }}
    >
      Section 11
    </div>
    <div
      style={{
        fontFamily: FONT_HEADING,
        fontSize: 32,
        fontWeight: 600,
        lineHeight: 1.15,
        letterSpacing: "-0.02em",
        color: C.heading,
        marginBottom: 16,
      }}
    >
      Every investment carries risk.
    </div>
    <div
      style={{
        fontFamily: FONT_BODY,
        fontSize: 18,
        lineHeight: 1.6,
        color: C.body,
      }}
    >
      Here is how this one is structured to mitigate them.
    </div>
    <div
      style={{
        width: 72,
        height: 3,
        background: C.amber,
        borderRadius: 2,
        marginTop: 32,
        boxShadow: "0 0 12px rgba(251,185,49,0.4)",
      }}
    />
  </div>
);

/* ───────────────────────────────────────────────────────
   Tap prompt — bottom caption
   ─────────────────────────────────────────────────────── */
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
      zIndex: 20,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(8px)",
      transition: `opacity 500ms ${EASING.smooth}, transform 500ms ${EASING.smooth}`,
      pointerEvents: "none",
    }}
  >
    <span
      style={{
        fontFamily: FONT_BODY,
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "0.01em",
        color: C.caption,
      }}
    >
      {label}
    </span>
  </div>
);

/* ───────────────────────────────────────────────────────
   Variant: recede
   Resolve panel settles directly into view.
   ─────────────────────────────────────────────────────── */
const VariantRecede = () => {
  const resolveRef = useRef(null);
  const [showTap, setShowTap] = useState(false);
  const running = useRef(false);

  useEffect(() => {
    if (running.current) return;
    running.current = true;

    let cancelled = false;
    (async () => {
      await wait(150);
      if (cancelled) return;
      if (resolveRef.current) {
        await an(
          resolveRef.current,
          [
            { opacity: 0, transform: "scale(0.95) translateY(12px)" },
            {
              opacity: 0.6,
              transform: "scale(0.98) translateY(4px)",
              offset: 0.5,
            },
            { opacity: 1, transform: "scale(1) translateY(0)" },
          ],
          { duration: 700, easing: EASING.settle }
        );
      }
      if (cancelled) return;
      await wait(400);
      if (!cancelled) setShowTap(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
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
          pointerEvents: "none",
        }}
      >
        <div style={{ width: "100%", maxWidth: 880 }}>
          <ResolvePanel panelRef={resolveRef} style={{ opacity: 0 }} />
        </div>
      </div>

      <TapPrompt visible={showTap} />
    </div>
  );
};

/* ───────────────────────────────────────────────────────
   Variant: shutter
   Amber-lined bands sweep in, hold a beat, then open to
   reveal the resolve panel. (No outgoing financials to cover.)
   ─────────────────────────────────────────────────────── */
const VariantShutter = () => {
  const resolveRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const [showTap, setShowTap] = useState(false);
  const running = useRef(false);

  useEffect(() => {
    if (running.current) return;
    running.current = true;

    let cancelled = false;
    (async () => {
      await wait(30);
      if (cancelled) return;

      const t = topRef.current
        ? an(
            topRef.current,
            [
              { transform: "translateY(-100%)" },
              { transform: "translateY(0)" },
            ],
            { duration: 750, easing: EASING.gentle }
          )
        : Promise.resolve();
      const b = bottomRef.current
        ? an(
            bottomRef.current,
            [
              { transform: "translateY(100%)" },
              { transform: "translateY(0)" },
            ],
            { duration: 750, easing: EASING.gentle }
          )
        : Promise.resolve();
      await Promise.all([t, b]);
      if (cancelled) return;

      if (topRef.current) {
        an(
          topRef.current,
          [
            {
              boxShadow:
                "0 2px 0 rgba(251,185,49,0.6), 0 2px 24px rgba(251,185,49,0.2)",
            },
            {
              boxShadow:
                "0 2px 0 rgba(251,185,49,0.8), 0 2px 48px rgba(251,185,49,0.45)",
            },
            {
              boxShadow:
                "0 2px 0 rgba(251,185,49,0.6), 0 2px 24px rgba(251,185,49,0.2)",
            },
          ],
          { duration: 500, easing: EASING.smooth }
        );
      }
      if (bottomRef.current) {
        an(
          bottomRef.current,
          [
            {
              boxShadow:
                "0 -2px 0 rgba(251,185,49,0.6), 0 -2px 24px rgba(251,185,49,0.2)",
            },
            {
              boxShadow:
                "0 -2px 0 rgba(251,185,49,0.8), 0 -2px 48px rgba(251,185,49,0.45)",
            },
            {
              boxShadow:
                "0 -2px 0 rgba(251,185,49,0.6), 0 -2px 24px rgba(251,185,49,0.2)",
            },
          ],
          { duration: 500, easing: EASING.smooth }
        );
      }
      await wait(550);
      if (cancelled) return;

      const tOpen = topRef.current
        ? an(
            topRef.current,
            [
              { transform: "translateY(0)" },
              { transform: "translateY(-102%)" },
            ],
            { duration: 650, easing: EASING.gentle }
          )
        : Promise.resolve();
      const bOpen = bottomRef.current
        ? an(
            bottomRef.current,
            [
              { transform: "translateY(0)" },
              { transform: "translateY(102%)" },
            ],
            { duration: 650, easing: EASING.gentle }
          )
        : Promise.resolve();

      await wait(120);
      if (cancelled) return;
      if (resolveRef.current) {
        an(
          resolveRef.current,
          [
            { opacity: 0, transform: "scale(0.97)" },
            { opacity: 1, transform: "scale(1)" },
          ],
          { duration: 600, easing: EASING.settle }
        );
      }
      await Promise.all([tOpen, bOpen]);
      if (cancelled) return;

      await wait(400);
      if (!cancelled) setShowTap(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
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
          pointerEvents: "none",
        }}
      >
        <div style={{ width: "100%", maxWidth: 880 }}>
          <ResolvePanel
            panelRef={resolveRef}
            style={{ opacity: 0, transform: "scale(0.97)" }}
          />
        </div>
      </div>

      <div
        ref={topRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: `linear-gradient(180deg, ${C.hairline} 0%, ${C.bg} 80%)`,
          zIndex: 12,
          transform: "translateY(-100%)",
          boxShadow:
            "0 2px 0 rgba(251,185,49,0.6), 0 2px 24px rgba(251,185,49,0.2)",
        }}
      />
      <div
        ref={bottomRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: `linear-gradient(0deg, ${C.hairline} 0%, ${C.bg} 80%)`,
          zIndex: 12,
          transform: "translateY(100%)",
          boxShadow:
            "0 -2px 0 rgba(251,185,49,0.6), 0 -2px 24px rgba(251,185,49,0.2)",
        }}
      />

      <TapPrompt visible={showTap} />
    </div>
  );
};

const VARIANT_MAP = { recede: VariantRecede, shutter: VariantShutter };

export default function Step17TransitionV5({
  variant = "recede"
} = {}) {
  const resolved = VARIANT_MAP[variant] ? variant : "recede";
  const Comp = VARIANT_MAP[resolved];

  return (
    <div
      data-proto="step-17"
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-17"] *,
          [data-proto="step-17"] *::before,
          [data-proto="step-17"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>

      <Comp key={resolved} />
    </div>
  );
}
