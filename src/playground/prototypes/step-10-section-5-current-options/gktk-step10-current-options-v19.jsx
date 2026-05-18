import { useState, useRef, useEffect, useCallback } from "react";

/* ───────────────────────────────────────────────────────
   step-10 section 5 — current options — iPad Pro 13 M4
   Four-beat narrative leading to the "MoreHarvest solves all five" reveal.
   Variants differ only in the row-arrival animation on the transform beat:
   A "the flip"     — quick per-row stagger after X→amber swap
   B "the cascade"  — slower pure fade per row
   C "the card"     — fade + small upward translate per row
   D "the sweep"    — left-to-right sweep, escalating duration
   Both orientations supported via the orientation prop.
   ─────────────────────────────────────────────────────── */

const C = {
  bg: "#F9F9F9",
  n950: "#25272C",
  n900: "#383A42",
  n800: "#40444C",
  n600: "#5B616E",
  n400: "#8E8F8F",
  n200: "#D8DBDF",
  n100: "#EDEEF1",
  amber: "#FBB931",
  pBg: "#F9F9F9",
  pBd: "rgba(0,0,0,0.06)",
  pSh: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
  eBd: "rgba(0,0,0,0.08)",
  eSh: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
};
const F = { h: "'REM', system-ui, sans-serif", b: "'Noto Sans JP', system-ui, sans-serif" };
const E = { s: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" };
const GAPS = [
  "Medical navigation",
  "Mental health support",
  "Education integration",
  "Spouse career support",
  "Operational friction",
];
const VARIANTS = [
  { id: "A", label: "A: the flip" },
  { id: "B", label: "B: the cascade" },
  { id: "C", label: "C: the card" },
  { id: "D", label: "D: the sweep" },
];

// ─── primitives ──────────────────────────────────────────────────────────────

function Panel({ children, style, elev, innerRef }) {
  const surface = elev
    ? { background: C.bg, border: `1px solid ${C.eBd}`, boxShadow: C.eSh }
    : { background: C.bg, border: `1px solid ${C.pBd}`, boxShadow: C.pSh };
  return (
    <div
      ref={innerRef}
      style={{
        borderRadius: 20,
        position: "relative",
        overflow: "hidden",
        ...surface,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Img({ label, innerRef, style }) {
  return (
    <div
      ref={innerRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 16,
        background: C.n100,
        border: `1px dashed ${C.n200}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: F.b,
          fontSize: 13,
          color: C.n400,
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function animate(el, kf, o) {
  if (!el) return Promise.resolve();
  return el.animate(kf, { fill: "forwards", ...o }).finished;
}
function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function Dots({ b, t }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "calc(36px + var(--safe-bottom))",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 10,
        zIndex: 41,
      }}
    >
      {Array.from({ length: t }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === b ? 10 : 7,
            height: i === b ? 10 : 7,
            borderRadius: 9999,
            background: i === b ? C.n800 : C.n200,
            transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      ))}
    </div>
  );
}

function XMark() {
  return (
    <span
      style={{
        fontFamily: F.b,
        fontSize: 18,
        fontWeight: 600,
        color: C.n400,
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        borderRadius: 8,
        background: C.n100,
        flexShrink: 0,
      }}
    >
      {"✕"}
    </span>
  );
}

function AmberDot({ size = 14 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 9999,
        background: C.amber,
        flexShrink: 0,
        boxShadow: "0 0 12px rgba(251,185,49,0.45)",
      }}
    />
  );
}

function TapHint({ onTap, label = "Tap to continue" }) {
  return (
    <div
      className="step-10-tap"
      onClick={onTap}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onTap(e);
        }
      }}
      style={{
        position: "absolute",
        bottom: "calc(72px + var(--safe-bottom))",
        left: 0,
        right: 0,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 40,
      }}
    >
      <span style={{ fontFamily: F.b, fontSize: 13, color: C.n400, letterSpacing: "0.02em" }}>
        {label}
      </span>
    </div>
  );
}

// ─── CTA button ──────────────────────────────────────────────────────────────

function CtaButton({ innerRef }) {
  return (
    <div ref={innerRef} style={{ opacity: 0, alignSelf: "flex-start" }}>
      <button
        className="step-10-cta"
        style={{
          minWidth: 280,
          padding: "20px 36px",
          borderRadius: 14,
          border: "none",
          background: C.amber,
          fontFamily: F.h,
          fontSize: 18,
          fontWeight: 600,
          color: C.n950,
          letterSpacing: "-0.01em",
          boxShadow: "0 4px 18px rgba(251,185,49,0.28)",
        }}
      >
        View Moha Map
      </button>
    </div>
  );
}

// ─── shared beat animations ──────────────────────────────────────────────────

async function animB0($) {
  if ($.q) $.q.style.opacity = "0";
  await animate(
    $.q,
    [
      { opacity: 0, transform: "scale(1.02)" },
      { opacity: 1, transform: "scale(1)" },
    ],
    { duration: 800, easing: E.s }
  );
}

async function animB1($) {
  ["1l", "1i", "1s", "1h", "1b", "1p"].forEach((k) => {
    if ($[k]) $[k].style.opacity = "0";
  });
  await animate($["1l"], [{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: E.s });
  await animate(
    $["1i"],
    [
      { opacity: 0, transform: "scale(0.97)" },
      { opacity: 1, transform: "scale(1)" },
    ],
    { duration: 550, easing: E.s }
  );
  await wait(100);
  await animate(
    $["1s"],
    [
      { opacity: 0, transform: "translateY(10px) scale(0.92)" },
      { opacity: 1, transform: "translateY(0) scale(1)" },
    ],
    { duration: 500, easing: E.s }
  );
  await wait(150);
  await animate($["1h"], [{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: E.s });
  await animate($["1b"], [{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: E.s });
  await wait(250);
  await animate(
    $["1p"],
    [
      { opacity: 0, transform: "translateY(8px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 500, easing: E.s }
  );
}

async function animB2($) {
  ["2l", "2h", "2i", "2s", "2t"].forEach((k) => {
    if ($[k]) $[k].style.opacity = "0";
  });
  await animate($["2l"], [{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: E.s });
  await animate(
    $["2h"],
    [
      { opacity: 0, transform: "translateY(6px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 450, easing: E.s }
  );
  await animate(
    $["2i"],
    [
      { opacity: 0, transform: "scale(0.97)" },
      { opacity: 1, transform: "scale(1)" },
    ],
    { duration: 600, easing: E.s }
  );
  await wait(100);
  await animate(
    $["2s"],
    [
      { opacity: 0, transform: "translateY(12px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 450, easing: E.s }
  );
  await wait(100);
  await animate(
    $["2t"],
    [
      { opacity: 0, transform: "translateY(8px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 500, easing: E.s }
  );
}

// ─── shared beat renders (iPad layouts) ──────────────────────────────────────

function renderB0(s, isLandscape) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding:
          "calc(96px + var(--safe-top)) var(--content-margin) calc(140px + var(--safe-bottom))",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 1080 }}>
        <span
          style={{
            display: "block",
            fontFamily: F.b,
            fontSize: 13,
            fontWeight: 500,
            color: C.n600,
            letterSpacing: "0.18em",
            marginBottom: 28,
          }}
        >
          SECTION 5
        </span>
        <h1
          ref={s("q")}
          style={{
            opacity: 0,
            fontFamily: F.h,
            fontSize: isLandscape ? 72 : 56,
            fontWeight: 600,
            color: C.n950,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          What are the current options?
        </h1>
      </div>
    </div>
  );
}

function renderB1(s, isLandscape) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding:
          "calc(96px + var(--safe-top)) var(--content-margin) calc(140px + var(--safe-bottom))",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span
        ref={s("1l")}
        style={{
          opacity: 0,
          fontFamily: F.b,
          fontSize: 13,
          fontWeight: 500,
          color: C.n600,
          letterSpacing: "0.18em",
          display: "block",
          marginBottom: 24,
        }}
      >
        MARKET PROOF
      </span>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isLandscape ? "1.15fr 1fr" : "1fr",
          gap: isLandscape ? 56 : 40,
          alignItems: "center",
          flex: 1,
        }}
      >
        {/* Image + 42 units badge */}
        <div style={{ position: "relative" }}>
          <div style={{ width: "100%", aspectRatio: isLandscape ? "4 / 3" : "16 / 9" }}>
            <Img label="Kusunoki apartment complex" innerRef={s("1i")} style={{ opacity: 0 }} />
          </div>
          <div
            ref={s("1s")}
            style={{
              opacity: 0,
              position: "absolute",
              bottom: -28,
              right: 24,
            }}
          >
            <Panel
              elev
              style={{
                padding: "16px 28px",
                borderRadius: 16,
                display: "flex",
                alignItems: "baseline",
                gap: 10,
              }}
            >
              <span
                style={{
                  fontFamily: F.h,
                  fontSize: 72,
                  fontWeight: 600,
                  color: C.n950,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                42
              </span>
              <span style={{ fontFamily: F.b, fontSize: 17, fontWeight: 500, color: C.n600 }}>
                units
              </span>
            </Panel>
          </div>
        </div>

        {/* Right column: heading + caption + insight panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p
            ref={s("1h")}
            style={{
              opacity: 0,
              fontFamily: F.h,
              fontSize: 32,
              fontWeight: 600,
              color: C.n950,
              margin: 0,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Fully reserved before completion.
          </p>
          <p
            ref={s("1b")}
            style={{
              opacity: 0,
              fontFamily: F.b,
              fontSize: 17,
              color: C.n600,
              margin: 0,
              lineHeight: 1.65,
            }}
          >
            Kusunoki complex. Bulk-leased by JASM.
          </p>
          <div ref={s("1p")} style={{ opacity: 0, marginTop: 12 }}>
            <Panel elev style={{ padding: "24px 28px" }}>
              <p
                style={{
                  fontFamily: F.h,
                  fontSize: 22,
                  fontWeight: 600,
                  color: C.n950,
                  margin: 0,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                }}
              >
                The B2B bulk-lease model works. Demand is proven.
              </p>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderB2(s, isLandscape) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding:
          "calc(96px + var(--safe-top)) var(--content-margin) calc(140px + var(--safe-bottom))",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span
        ref={s("2l")}
        style={{
          opacity: 0,
          fontFamily: F.b,
          fontSize: 13,
          fontWeight: 500,
          color: C.n600,
          letterSpacing: "0.18em",
          display: "block",
          marginBottom: 16,
        }}
      >
        CLOSEST COMPETITOR
      </span>
      <h2
        ref={s("2h")}
        style={{
          opacity: 0,
          fontFamily: F.h,
          fontSize: isLandscape ? 48 : 36,
          fontWeight: 600,
          color: C.n950,
          margin: "0 0 36px",
          lineHeight: 1.1,
          letterSpacing: "-0.025em",
          maxWidth: 980,
        }}
      >
        Current options: housing without solutions
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isLandscape ? "1.2fr 1fr" : "1fr",
          gap: isLandscape ? 56 : 40,
          alignItems: "center",
          flex: 1,
        }}
      >
        {/* Image + metric pair */}
        <div style={{ position: "relative" }}>
          <div style={{ width: "100%", aspectRatio: isLandscape ? "4 / 3" : "16 / 9" }}>
            <Img label="Formosa Hills" innerRef={s("2i")} style={{ opacity: 0 }} />
          </div>
          <div
            ref={s("2s")}
            style={{
              opacity: 0,
              position: "absolute",
              bottom: -28,
              left: 24,
              right: 24,
              display: "flex",
              gap: 16,
            }}
          >
            <Panel elev style={{ padding: "16px 24px", flex: 1, borderRadius: 16 }}>
              <span
                style={{
                  fontFamily: F.h,
                  fontSize: 48,
                  fontWeight: 600,
                  color: C.n950,
                  display: "block",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                }}
              >
                65
              </span>
              <span style={{ fontFamily: F.b, fontSize: 15, color: C.n600, fontWeight: 500 }}>
                units
              </span>
            </Panel>
            <Panel elev style={{ padding: "16px 24px", flex: 1, borderRadius: 16 }}>
              <span
                style={{
                  fontFamily: F.h,
                  fontSize: 48,
                  fontWeight: 600,
                  color: C.n950,
                  display: "block",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                }}
              >
                80%
              </span>
              <span style={{ fontFamily: F.b, fontSize: 15, color: C.n600, fontWeight: 500 }}>
                Taiwanese guests
              </span>
            </Panel>
          </div>
        </div>

        {/* Right column: closing insight */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div ref={s("2t")} style={{ opacity: 0, width: "100%" }}>
            <Panel elev style={{ padding: "28px 32px" }}>
              <p
                style={{
                  fontFamily: F.h,
                  fontSize: 22,
                  fontWeight: 600,
                  color: C.n950,
                  margin: 0,
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                Bilingual management, mail handling, meeting facilities.
              </p>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── the transform beat (shared across variants) ─────────────────────────────

function TransformBeat({ solved, onSolve, s, ctaRef, isLandscape }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding:
          "calc(96px + var(--safe-top)) var(--content-margin) calc(140px + var(--safe-bottom))",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isLandscape ? "1fr 1.25fr" : "1fr",
          gap: isLandscape ? 64 : 32,
          alignItems: "center",
          flex: 1,
        }}
      >
        {/* Left: image swap + heading swap */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div ref={s("imgWrap")} style={{ position: "relative", width: "100%" }}>
            <div style={{ width: "100%", aspectRatio: "4 / 3" }}>
              {!solved && (
                <Img
                  label="Formosa Hills"
                  style={{ opacity: 0.3, filter: "grayscale(0.6)" }}
                />
              )}
              {solved && <Img label="MoreHarvest residence" style={{ opacity: 1 }} />}
            </div>
          </div>

          {/* heading: unsolved by default, solved fades in */}
          <div aria-live="polite" style={{ position: "relative", minHeight: 56 }}>
            <p
              ref={s("thOld")}
              style={{
                fontFamily: F.b,
                fontSize: 13,
                fontWeight: 500,
                color: C.n600,
                margin: 0,
                letterSpacing: "0.18em",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              WHAT THEY DO NOT SOLVE
            </p>
            <p
              ref={s("thNew")}
              style={{
                opacity: 0,
                fontFamily: F.h,
                fontSize: isLandscape ? 48 : 36,
                fontWeight: 600,
                color: C.n950,
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              MoreHarvest solves all five.
            </p>
          </div>
        </div>

        {/* Right: gap rows */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {GAPS.map((g, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "20px 0",
                borderBottom: i < GAPS.length - 1 ? `1px solid ${C.n100}` : "none",
                position: "relative",
              }}
            >
              {/* indicator slot — fixed width so X and dot share the same column */}
              <div
                style={{
                  position: "relative",
                  width: 32,
                  height: 32,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  ref={s(`x${i}`)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <XMark />
                </div>
                <div
                  ref={s(`a${i}`)}
                  style={{
                    opacity: 0,
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AmberDot size={14} />
                </div>
              </div>
              <span
                ref={s(`r${i}`)}
                style={{
                  fontFamily: F.h,
                  fontSize: 22,
                  fontWeight: 600,
                  color: C.n950,
                  letterSpacing: "-0.01em",
                }}
              >
                {g}
              </span>
            </div>
          ))}

          {/* CTA — hidden until solved */}
          <div style={{ marginTop: 32 }}>
            <CtaButton innerRef={ctaRef} />
          </div>
        </div>
      </div>

      {/* tap to transform — only when unsolved */}
      {!solved && <TapHint onTap={onSolve} />}
    </div>
  );
}

// ─── shared slow transform animation ─────────────────────────────────────────

async function slowTransform($, setSolved) {
  await animate($["thOld"], [{ opacity: 1 }, { opacity: 0 }], { duration: 400, easing: E.s });
  await wait(300);
  await animate(
    $["thNew"],
    [
      { opacity: 0, transform: "translateY(6px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 600, easing: E.s }
  );
  await wait(400);
  for (let i = 0; i < GAPS.length; i++) {
    animate($[`x${i}`], [{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: E.s });
    await wait(200);
    await animate(
      $[`a${i}`],
      [
        { opacity: 0, transform: "scale(0.5)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      { duration: 400, easing: E.s }
    );
    await wait(350);
  }
  setSolved(true);
  await wait(400);
  if ($["4cta"])
    await animate(
      $["4cta"],
      [
        { opacity: 0, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 400, easing: E.s }
    );
}

// ─── variant shells ──────────────────────────────────────────────────────────

function makeVariant(rowEntrance) {
  return function VariantShell({ playing, isLandscape }) {
    const [beat, setBeat] = useState(0);
    const [solved, setSolved] = useState(false);
    const r = useRef({});
    const s = (k) => (el) => {
      r.current[k] = el;
    };

    const advanceBeat = useCallback(() => {
      if (beat < 3) setBeat((b) => b + 1);
    }, [beat]);

    const handleSolve = useCallback(async () => {
      await slowTransform(r.current, setSolved);
    }, []);

    useEffect(() => {
      if (!playing) return;
      const $ = r.current;
      (async () => {
        if (beat === 0) await animB0($);
        if (beat === 1) await animB1($);
        if (beat === 2) await animB2($);
        if (beat === 3 && !solved) {
          GAPS.forEach((_, i) => {
            if ($[`r${i}`]) $[`r${i}`].style.opacity = "0";
          });
          if ($.thOld) $.thOld.style.opacity = "0";
          await animate($.thOld, [{ opacity: 0 }, { opacity: 1 }], { duration: 350, easing: E.s });
          await wait(rowEntrance.lead);
          for (let i = 0; i < GAPS.length; i++) {
            await animate($[`r${i}`], rowEntrance.kf(i), {
              duration: rowEntrance.dur(i),
              easing: E.s,
            });
            await wait(rowEntrance.gap(i));
          }
        }
      })();
    }, [playing, beat, solved]);

    if (!playing) return null;
    return (
      <>
        <Dots b={Math.min(beat, 3)} t={4} />
        {beat < 3 && <TapHint onTap={advanceBeat} />}
        {beat === 0 && renderB0(s, isLandscape)}
        {beat === 1 && renderB1(s, isLandscape)}
        {beat === 2 && renderB2(s, isLandscape)}
        {beat === 3 && (
          <TransformBeat
            solved={solved}
            onSolve={handleSolve}
            s={s}
            ctaRef={(el) => {
              r.current["4cta"] = el;
            }}
            isLandscape={isLandscape}
          />
        )}
      </>
    );
  };
}

const VA = makeVariant({
  lead: 150,
  kf: () => [
    { opacity: 0, transform: "translateX(-8px)" },
    { opacity: 1, transform: "translateX(0)" },
  ],
  dur: () => 280,
  gap: () => 140,
});

const VB = makeVariant({
  lead: 200,
  kf: () => [{ opacity: 0 }, { opacity: 1 }],
  dur: () => 350,
  gap: () => 200,
});

const VC = makeVariant({
  lead: 200,
  kf: () => [
    { opacity: 0, transform: "translateY(6px)" },
    { opacity: 1, transform: "translateY(0)" },
  ],
  dur: () => 300,
  gap: () => 160,
});

const VD = makeVariant({
  lead: 250,
  kf: () => [
    { opacity: 0, transform: "translateX(-12px)" },
    { opacity: 1, transform: "translateX(0)" },
  ],
  dur: (i) => 280 + i * 20,
  gap: (i) => 180 + i * 30,
});

// ─── main ────────────────────────────────────────────────────────────────────

const MAP = { A: VA, B: VB, C: VC, D: VD };
export { VARIANTS };

export default function Step10V19({ variant = "A", orientation = "landscape" } = {}) {
  const v = variant && MAP[variant] ? variant : "A";
  const Comp = MAP[v];
  const isLandscape = orientation !== "portrait";

  return (
    <div
      data-proto="step-10"
      style={{ position: "absolute", inset: 0, background: C.bg, fontFamily: F.b }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-10"] *,
          [data-proto="step-10"] *::before,
          [data-proto="step-10"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
        .step-10-cta { transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1); }
        .step-10-cta:active { transform: scale(0.97); }
        .step-10-tap { transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1); }
        .step-10-tap:active { transform: scale(0.98); }
      `}</style>
      <Comp key={v} playing={true} isLandscape={isLandscape} />
    </div>
  );
}
