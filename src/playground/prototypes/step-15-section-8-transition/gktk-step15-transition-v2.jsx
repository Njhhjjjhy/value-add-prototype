import { useRef, useEffect } from "react";

/* ───────────────────────────────────────────────────────
   step-15 section-8 transition — iPad Pro 13 M4
   "Ledger" — services tally → fades → heading resolves.
   Single variant: A "the ledger".
   ─────────────────────────────────────────────────────── */

const C = {
  bg: "#F9F9F9",
  amber: "#FBB931",
  n950: "#25272C",
  n800: "#40444C",
  n600: "#5B616E",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const EASE = {
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

const SERVICES = [
  "Property secretary",
  "Medical navigation",
  "Education support",
  "Admin support",
  "Mental wellness",
  "Cultural program",
];

const HEADING = "The investment case.";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Step15TransitionV2({
  variant = "A",
  orientation = "landscape",
} = {}) {
  void variant;
  const isLandscape = orientation === "landscape";

  const rowRefs = useRef([]);
  const dotRefs = useRef([]);
  const ledgerRuleRef = useRef(null);
  const headingRef = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean);
    const dots = dotRefs.current.filter(Boolean);
    const rule = ledgerRuleRef.current;
    const h = headingRef.current;
    const under = underlineRef.current;
    let cancelled = false;

    (async () => {
      // 1. rows fade and slide in
      rows.forEach((el, i) => {
        el.animate(
          [
            { opacity: 0, transform: "translateY(8px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 320, delay: i * 80, easing: EASE.smooth, fill: "forwards" }
        );
      });
      await wait(320 + (rows.length - 1) * 80 + 60);
      if (cancelled) return;

      // 2. amber tally rule draws beneath rows
      if (rule) {
        rule.animate(
          [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
          { duration: 480, easing: EASE.smooth, fill: "forwards" }
        );
      }
      await wait(420);
      if (cancelled) return;

      // 3. dots pulse and settle
      dots.forEach((d, i) => {
        d.animate(
          [
            { transform: "scale(1)", opacity: 1 },
            { transform: "scale(1.6)", opacity: 1, offset: 0.5 },
            { transform: "scale(1)", opacity: 1 },
          ],
          { duration: 420, delay: i * 40, easing: EASE.spring, fill: "forwards" }
        );
      });
      await wait(420 + (dots.length - 1) * 40);
      if (cancelled) return;

      // 4. hold — everything sits fully formed so the rows can be read
      await wait(1800);
      if (cancelled) return;

      // 5. fade ledger out
      rows.forEach((el) =>
        el.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 520,
          easing: EASE.smooth,
          fill: "forwards",
        })
      );
      if (rule)
        rule.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 520,
          easing: EASE.smooth,
          fill: "forwards",
        });
      await wait(440);
      if (cancelled) return;

      // 6. heading fades in, underline draws
      if (h) {
        try {
          await h.animate(
            [
              { opacity: 0, transform: "translateY(8px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 480, easing: EASE.smooth, fill: "forwards" }
          ).finished;
        } catch {
          /* cancelled */
        }
      }
      if (cancelled) return;
      if (under) {
        under.animate(
          [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
          { duration: 520, easing: EASE.smooth, fill: "forwards" }
        );
      }
    })();

    return () => {
      cancelled = true;
      [...rows, ...dots, rule, h, under].forEach((n) =>
        n?.getAnimations().forEach((a) => a.cancel())
      );
    };
  }, []);

  // iPad-tuned scale: rows are large readable type, underline rule sits
  // generously below the list, heading resolves centered.
  const rowFontSize = 22; // heading-3 — readable from across a table
  const rowGap = 18;
  const dotSize = 10;
  const listMaxWidth = isLandscape ? 880 : 720;

  return (
    <div
      data-proto="step-15"
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        fontFamily: FONT_BODY,
        overflow: "hidden",
      }}
    >
      <style>{`
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

      {/* Ledger list — centered horizontally, anchored to upper-middle vertically */}
      <div
        style={{
          position: "absolute",
          top: "calc(200px + var(--safe-top))",
          left: "var(--content-margin)",
          right: "var(--content-margin)",
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: listMaxWidth,
            display: "flex",
            flexDirection: "column",
            gap: rowGap,
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={i}
              ref={(el) => (rowRefs.current[i] = el)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: 0,
                fontFamily: FONT_BODY,
                fontSize: rowFontSize,
                lineHeight: 1.3,
                color: C.n800,
                fontWeight: 400,
              }}
            >
              <span style={{ whiteSpace: "nowrap" }}>{s}</span>
              <span
                aria-hidden
                style={{
                  flex: 1,
                  height: 1,
                  background:
                    "repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 3px, transparent 3px 9px)",
                }}
              />
              <span
                ref={(el) => (dotRefs.current[i] = el)}
                style={{
                  width: dotSize,
                  height: dotSize,
                  borderRadius: "50%",
                  background: C.amber,
                  flex: "none",
                  boxShadow: "0 0 12px rgba(251,185,49,0.35)",
                }}
              />
            </div>
          ))}

          {/* Amber tally rule beneath the list */}
          <div
            ref={ledgerRuleRef}
            style={{
              marginTop: 12,
              height: 2,
              background: C.amber,
              borderRadius: 1,
              transformOrigin: "left center",
              transform: "scaleX(0)",
              boxShadow: "0 0 16px rgba(251,185,49,0.4)",
            }}
          />
        </div>
      </div>

      {/* Heading + underline — centered in viewport, resolves after ledger fades */}
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
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          <h1
            ref={headingRef}
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: isLandscape ? 72 : 56,
              lineHeight: 1.05,
              color: C.n950,
              letterSpacing: "-0.03em",
              whiteSpace: "nowrap",
              margin: 0,
              opacity: 0,
              textAlign: "left",
            }}
          >
            {HEADING}
          </h1>
          <div
            ref={underlineRef}
            style={{
              width: "100%",
              height: 3,
              background: C.amber,
              borderRadius: 2,
              marginTop: 20,
              transformOrigin: "left center",
              transform: "scaleX(0)",
              boxShadow: "0 0 16px rgba(251,185,49,0.4)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
