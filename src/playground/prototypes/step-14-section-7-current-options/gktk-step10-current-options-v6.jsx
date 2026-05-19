import { useCallback, useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   step-10 section 5 current options — iPad Pro 13 M4
   Two variants:
   B "the stack"   — vertical stack of choice panels
   D "the divide"  — side-by-side split, two large panels
   Tap a panel to open its DetailView; tap Back to return.
   ─────────────────────────────────────────────────────── */

const C = {
  bg: "#F9F9F9",
  n200: "#D8DBDF",
  n400: "#8E8F8F",
  n600: "#5B616E",
  n800: "#40444C",
  n900: "#383A42",
  n950: "#25272C",
  amber: "#FBB931",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const EASE_SMOOTH = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

function GlassPanel({ level = 1, borderRadius = 20, children, style = {}, ...props }) {
  const isL2 = level === 2;
  return (
    <div
      style={{
        position: "relative",
        borderRadius,
        background: C.bg,
        border: `1px solid rgba(0,0,0,${isL2 ? 0.08 : 0.06})`,
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

/* ── data ── */
const DATA = [
  {
    label: "Market proof",
    heading: "42 units. Fully reserved before completion.",
    body: "Former municipal Kusunoki public housing site, Kita-ku, Kumamoto City. D&D General Group developed 4 buildings, 3 stories each. 42 units, all 3LDK, family-oriented. All units bulk-leased by JASM (TSMC subsidiary). Move-in from August 2023.",
    takeaway: "The B2B bulk-lease model works. Demand is proven.",
    stat: "42",
    statLabel: "units reserved",
  },
  {
    label: "Closest competitor",
    heading: "Formosa Hills: hardware without software",
    body: "14-story building, 65 units, all 3LDK (70 to 80 sqm). 80% Taiwanese business guests. From 20,000 yen per night with long-term lease options. Services: bilingual property management, mail handling, meeting facilities, airport transfers.",
    verdicts: [
      "What DoMo offers: a roof, basic bilingual admin, and parking.",
      "What DoMo does not offer: medical navigation, mental health support, education integration, spouse career support, data-driven HR dashboards, or any of the ‘software’ that keeps families stable and engineers productive.",
      "Their model is accommodation. Ours is retention infrastructure.",
    ],
    stat: "65",
    statLabel: "units, no software",
  },
];

/* ───────────────────────────────────────────────────────
   SHARED: detail view (iPad)
   ─────────────────────────────────────────────────────── */
function DetailView({ index, onBack, orientation }) {
  const d = DATA[index];
  const [phase, setPhase] = useState(0);
  const [vCount, setVCount] = useState(0);

  useEffect(() => {
    setPhase(0);
    setVCount(0);
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase(1)));
  }, [index]);

  useEffect(() => {
    if (d.verdicts && phase === 1) {
      const timers = d.verdicts.map((_, i) =>
        setTimeout(() => setVCount(i + 1), 500 + i * 600)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [phase, d.verdicts]);

  const isLandscape = orientation === "landscape";
  const maxBodyWidth = isLandscape ? 760 : 680;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        paddingTop: "calc(96px + var(--safe-top))",
        paddingBottom: "calc(64px + var(--safe-bottom))",
        paddingLeft: "var(--content-margin)",
        paddingRight: "var(--content-margin)",
        perspective: "1200px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: FONT_BODY,
          fontSize: 15,
          fontWeight: 500,
          color: C.n600,
          padding: "12px 4px",
          marginBottom: 24,
          minHeight: 44,
          alignSelf: "flex-start",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.n600} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div
        style={{
          opacity: phase ? 1 : 0,
          transform: phase ? "translateZ(0) scale(1)" : "translateZ(-60px) scale(0.85)",
          transition: `all 0.7s ${EASE_SMOOTH}`,
          marginBottom: 28,
          willChange: "transform, opacity",
        }}
      >
        <span
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 144,
            lineHeight: 1,
            color: C.n950,
            letterSpacing: "-0.03em",
            display: "block",
          }}
        >
          {d.stat}
        </span>
        <span
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 500,
            fontSize: 17,
            color: C.n600,
            display: "block",
            marginTop: 8,
            letterSpacing: "0.01em",
          }}
        >
          {d.statLabel}
        </span>
      </div>

      <span
        style={{
          fontFamily: FONT_BODY,
          fontWeight: 500,
          fontSize: 13,
          color: C.n600,
          letterSpacing: "0.04em",
          textTransform: "none",
          display: "block",
          marginBottom: 10,
          opacity: phase ? 1 : 0,
          transition: `opacity 0.4s ${EASE_SMOOTH} 0.1s`,
        }}
      >
        {d.label}
      </span>

      <h2
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 32,
          lineHeight: 1.15,
          color: C.n950,
          letterSpacing: "-0.02em",
          margin: "0 0 20px 0",
          maxWidth: maxBodyWidth,
          opacity: phase ? 1 : 0,
          transform: phase ? "translateY(0)" : "translateY(10px)",
          transition: `all 0.5s ${EASE_SMOOTH} 0.15s`,
        }}
      >
        {d.heading}
      </h2>

      <p
        style={{
          fontFamily: FONT_BODY,
          fontWeight: 400,
          fontSize: 17,
          lineHeight: 1.65,
          color: C.n800,
          margin: "0 0 32px 0",
          maxWidth: maxBodyWidth,
          opacity: phase ? 1 : 0,
          transition: `opacity 0.5s ${EASE_SMOOTH} 0.25s`,
        }}
      >
        {d.body}
      </p>

      {d.takeaway && (
        <GlassPanel
          level={2}
          borderRadius={16}
          style={{
            padding: "24px 28px",
            maxWidth: maxBodyWidth,
            opacity: phase ? 1 : 0,
            transform: phase ? "translateY(0) translateZ(10px)" : "translateY(20px) translateZ(-30px)",
            transition: `all 0.6s ${EASE_SMOOTH} 0.35s`,
          }}
        >
          <p
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 600,
              fontSize: 18,
              color: C.n950,
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {d.takeaway}
          </p>
        </GlassPanel>
      )}

      {d.verdicts && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            perspective: "800px",
            maxWidth: maxBodyWidth,
          }}
        >
          {d.verdicts.map((v, i) => {
            const isLast = i === d.verdicts.length - 1;
            return (
              <GlassPanel
                key={i}
                level={isLast ? 2 : 1}
                borderRadius={16}
                style={{
                  padding: "22px 26px",
                  opacity: i < vCount ? 1 : 0,
                  transform:
                    i < vCount
                      ? "translateY(0) translateZ(0) scale(1)"
                      : "translateY(24px) translateZ(-50px) scale(0.93)",
                  transition: `all 0.7s ${EASE_SMOOTH}`,
                }}
              >
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontWeight: isLast ? 600 : 400,
                    fontSize: isLast ? 18 : 17,
                    color: isLast ? C.n950 : C.n800,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {v}
                </p>
              </GlassPanel>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────────────────────────────────
   VARIANT B: the stack (iPad)
   ─────────────────────────────────────────────────────── */
function ChoiceB({ onSelectDetail, orientation }) {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  const isLandscape = orientation === "landscape";
  const maxWidth = isLandscape ? 1040 : 880;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        paddingTop: "calc(96px + var(--safe-top))",
        paddingBottom: "calc(64px + var(--safe-bottom))",
        paddingLeft: "var(--content-margin)",
        paddingRight: "var(--content-margin)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        perspective: "1200px",
      }}
    >
      <div style={{ width: "100%", maxWidth, alignSelf: "flex-start" }}>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 500,
            fontSize: 15,
            color: C.n600,
            marginBottom: 32,
            letterSpacing: "0.01em",
            opacity: entered ? 1 : 0,
            transition: `opacity 0.5s ${EASE_SMOOTH} 0.2s`,
          }}
        >
          Choose a path to explore.
        </p>

        {DATA.map((d, i) => (
          <GlassPanel
            key={i}
            level={1}
            borderRadius={24}
            style={{
              padding: "32px 36px",
              marginBottom: i === 0 ? 20 : 0,
              minHeight: 168,
              display: "flex",
              alignItems: "center",
              opacity: entered ? 1 : 0,
              transform: entered
                ? "translateY(0) translateZ(0)"
                : "translateY(40px) translateZ(-60px)",
              transition: `opacity 0.5s ${EASE_SMOOTH} ${300 + i * 150}ms, transform 0.7s ${EASE_SMOOTH} ${300 + i * 150}ms`,
              willChange: "transform, opacity",
            }}
            onClick={() => onSelectDetail(i)}
            role="button"
            tabIndex={0}
            aria-label={d.heading || d.label || `Option ${i + 1}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectDetail(i);
              }
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 32,
                width: "100%",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: FONT_BODY,
                    fontWeight: 500,
                    fontSize: 13,
                    color: C.n600,
                    letterSpacing: "0.04em",
                    display: "block",
                    marginBottom: 10,
                  }}
                >
                  {d.label}
                </span>
                <span
                  style={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 600,
                    fontSize: 28,
                    color: C.n950,
                    letterSpacing: "-0.015em",
                    lineHeight: 1.25,
                    display: "block",
                  }}
                >
                  {d.heading}
                </span>
              </div>
              <span
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 600,
                  fontSize: 72,
                  color: C.n200,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  flexShrink: 0,
                }}
              >
                {d.stat}
              </span>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────
   VARIANT D: the divide (iPad)
   ─────────────────────────────────────────────────────── */
function ChoiceD({ onSelectDetail, orientation }) {
  const [entered, setEntered] = useState(false);
  const [hoveredSide, setHoveredSide] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  const isLandscape = orientation === "landscape";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        paddingTop: "calc(96px + var(--safe-top))",
        paddingBottom: "calc(48px + var(--safe-bottom))",
        paddingLeft: "var(--content-margin)",
        paddingRight: "var(--content-margin)",
      }}
    >
      <div
        style={{
          opacity: entered ? 1 : 0,
          transition: `opacity 0.5s ${EASE_SMOOTH} 0.15s`,
          marginBottom: 28,
        }}
      >
        <p
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 500,
            fontSize: 15,
            color: C.n600,
            letterSpacing: "0.01em",
            margin: 0,
          }}
        >
          Choose a path.
        </p>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: isLandscape ? "row" : "column",
          gap: isLandscape ? 24 : 20,
          minHeight: 0,
        }}
      >
        {DATA.map((d, i) => {
          const isHovered = hoveredSide === i;
          return (
            <div
              key={i}
              onClick={() => onSelectDetail(i)}
              role="button"
              tabIndex={0}
              aria-label={`Option ${i + 1}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectDetail(i);
                }
              }}
              onMouseEnter={() => setHoveredSide(i)}
              onMouseLeave={() => setHoveredSide(null)}
              style={{
                flex: 1,
                position: "relative",
                borderRadius: 28,
                overflow: "hidden",
                opacity: entered ? 1 : 0,
                transform: entered
                  ? "translateY(0) scale(1)"
                  : `translate${isLandscape ? "X" : "Y"}(${i === 0 ? -20 : 20}px) scale(0.95)`,
                transition: `opacity 0.6s ${EASE_SMOOTH} ${250 + i * 120}ms, transform 0.8s ${EASE_SMOOTH} ${250 + i * 120}ms`,
                willChange: "transform, opacity",
                minHeight: isLandscape ? 0 : 280,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 28,
                  background: C.bg,
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: isHovered
                    ? "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)"
                    : "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                  transition: `box-shadow 0.3s ${EASE_SMOOTH}`,
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "44px 40px 36px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: FONT_HEADING,
                      fontWeight: 600,
                      fontSize: 144,
                      lineHeight: 1,
                      color: C.n950,
                      letterSpacing: "-0.02em",
                      display: "block",
                      opacity: entered ? 1 : 0,
                      transform: entered ? "translateY(0)" : "translateY(12px)",
                      transition: `all 0.6s ${EASE_SMOOTH} ${450 + i * 100}ms`,
                    }}
                  >
                    {d.stat}
                  </span>
                </div>

                <div>
                  <span
                    style={{
                      fontFamily: FONT_BODY,
                      fontWeight: 500,
                      fontSize: 13,
                      color: C.n600,
                      letterSpacing: "0.04em",
                      display: "block",
                      marginBottom: 8,
                      opacity: entered ? 1 : 0,
                      transition: `opacity 0.5s ${EASE_SMOOTH} ${550 + i * 100}ms`,
                    }}
                  >
                    {d.label}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT_HEADING,
                      fontWeight: 600,
                      fontSize: 24,
                      color: C.n950,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.25,
                      display: "block",
                      marginBottom: 20,
                      maxWidth: 520,
                      opacity: entered ? 1 : 0,
                      transition: `opacity 0.5s ${EASE_SMOOTH} ${600 + i * 100}ms`,
                    }}
                  >
                    {d.heading}
                  </span>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      minHeight: 44,
                      opacity: entered ? 1 : 0,
                      transition: `opacity 0.5s ${EASE_SMOOTH} ${700 + i * 100}ms`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 15,
                        fontWeight: 500,
                        color: C.n600,
                      }}
                    >
                      Explore
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={i === 0 ? C.amber : C.n600}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── entry ── */
const CHOICE_BY_VARIANT = { B: ChoiceB, D: ChoiceD };

export default function Step10CurrentOptionsPlayground({
  variant = "B",
  orientation = "landscape",
} = {}) {
  const Choice = CHOICE_BY_VARIANT[variant] ?? ChoiceB;
  const [phase, setPhase] = useState("choice");
  const [selected, setSelected] = useState(null);
  const [detailKey, setDetailKey] = useState(0);

  useEffect(() => {
    // reset when variant changes
    setPhase("choice");
    setSelected(null);
  }, [variant]);

  const selectDetail = useCallback((i) => {
    setSelected(i);
    setDetailKey((k) => k + 1);
    setPhase("detail");
  }, []);
  const back = useCallback(() => {
    setSelected(null);
    setPhase("choice");
  }, []);

  return (
    <div
      data-proto="step-10"
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
      }}
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
      `}</style>
      {phase === "choice" && (
        <Choice onSelectDetail={selectDetail} orientation={orientation} />
      )}
      {phase === "detail" && selected !== null && (
        <DetailView
          key={detailKey}
          index={selected}
          onBack={back}
          orientation={orientation}
        />
      )}
    </div>
  );
}
