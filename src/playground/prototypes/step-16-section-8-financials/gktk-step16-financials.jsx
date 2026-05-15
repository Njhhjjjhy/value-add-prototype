import { useState, useRef, useEffect, useCallback } from "react";

/* ───────────────────────────────────────────────────────
   step-16 section 8 financials — iPad Pro 13 M4
   Two variants:
   A "the beacon"   — giant IRR hero with secondary metric cards
   C "the ledger"   — clean tabular layout, IRR row highlighted
   ─────────────────────────────────────────────────────── */

const DATA = {
  bull:   { 3:{ip:18.29,ipo:14.89,ep:1.62,epo:1.50,rp:1624447742,rpo:1496935513}, 4:{ip:15.06,ipo:12.31,ep:1.70,epo:1.56,rp:1700303136,rpo:1557301236}, 5:{ip:13.16,ipo:10.77,ep:1.78,epo:1.62,rp:1776285098,rpo:1617767681}, 6:{ip:11.90,ipo:9.76,ep:1.85,epo:1.68,rp:1853120274,rpo:1678913114} },
  normal: { 3:{ip:14.77,ipo:12.00,ep:1.50,epo:1.40,rp:1496447742,rpo:1395073113}, 4:{ip:12.15,ipo:9.91,ep:1.56,epo:1.44,rp:1556303136,rpo:1442706036}, 5:{ip:10.60,ipo:8.66,ep:1.62,epo:1.49,rp:1616285098,rpo:1490439681}, 6:{ip:9.57,ipo:7.84,ep:1.68,epo:1.54,rp:1677120274,rpo:1538852314} },
  bear:   { 3:{ip:11.14,ipo:9.03,ep:1.37,epo:1.29,rp:1368447742,rpo:1293210713}, 4:{ip:9.16,ipo:7.45,ep:1.41,epo:1.33,rp:1412303136,rpo:1328110836}, 5:{ip:7.97,ipo:6.50,ep:1.46,epo:1.36,rp:1456285098,rpo:1363111681}, 6:{ip:7.18,ipo:5.87,ep:1.50,epo:1.40,rp:1501120274,rpo:1398791514} },
};

const fmtIrr = v => `${v.toFixed(2)}%`;
const fmtEm  = v => `${v.toFixed(2)}x`;
const fmtYen = v => `¥${(v / 1e9).toFixed(2)}B`;

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

const EASE = {
  gentle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  settle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  sharp:  "cubic-bezier(0.4, 0, 0.2, 1)",
};

/* ── flat surface (panel) ── */
const Panel = ({ level = 1, children, style = {} }) => {
  const l2 = level === 2;
  return (
    <div
      style={{
        position: "relative",
        background: C.bg,
        border: l2 ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(0,0,0,0.06)",
        boxShadow: l2
          ? "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)"
          : "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        borderRadius: 20,
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* ── scenario tabs ── */
const ScenarioTabs = ({ scenario, set }) => (
  <div
    style={{
      display: "inline-flex",
      gap: 8,
      padding: 6,
      borderRadius: 14,
      background: "rgba(0,0,0,0.03)",
      border: "1px solid rgba(0,0,0,0.05)",
    }}
  >
    {["bull", "normal", "bear"].map((s) => (
      <button
        className="step-16-tab"
        key={s}
        onClick={() => set(s)}
        style={{
          padding: "14px 28px",
          minHeight: 56,
          borderRadius: 10,
          border: "none",
          background: scenario === s ? C.bg : "transparent",
          color: scenario === s ? C.heading : C.disabled,
          fontFamily: FONT_BODY,
          fontSize: 15,
          fontWeight: scenario === s ? 600 : 500,
          letterSpacing: 0,
          boxShadow:
            scenario === s ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
          transition: `all 0.25s ${EASE.smooth}`,
        }}
      >
        {s.charAt(0).toUpperCase() + s.slice(1)}
      </button>
    ))}
  </div>
);

/* ── interactive year slider ── */
const YearSlider = ({ year, set }) => {
  const years = [3, 4, 5, 6];
  const idx = years.indexOf(year);
  const pct = (idx / (years.length - 1)) * 100;
  const trackRef = useRef(null);
  const dragging = useRef(false);

  const resolve = (e) => {
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = (clientX - rect.left) / rect.width;
    set(years[Math.max(0, Math.min(years.length - 1, Math.round(x * (years.length - 1))))]);
  };

  const onDown = (e) => { dragging.current = true; resolve(e); };
  const onMove = (e) => { if (dragging.current) resolve(e); };
  const onUp = () => { dragging.current = false; };

  useEffect(() => {
    const up = () => { dragging.current = false; };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, []);

  const onKey = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); if (idx > 0) set(years[idx - 1]); }
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); if (idx < years.length - 1) set(years[idx + 1]); }
    else if (e.key === "Home") { e.preventDefault(); set(years[0]); }
    else if (e.key === "End") { e.preventDefault(); set(years[years.length - 1]); }
  };

  return (
    <div style={{ padding: "0 8px" }}>
      <div
        ref={trackRef}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onTouchStart={onDown}
        onTouchMove={onMove}
        onTouchEnd={onUp}
        role="slider"
        tabIndex={0}
        onKeyDown={onKey}
        aria-label="Holding period, years"
        aria-valuemin={years[0]}
        aria-valuemax={years[years.length - 1]}
        aria-valuenow={year}
        aria-valuetext={`${year} years`}
        style={{
          position: "relative",
          height: 64,
          touchAction: "none",
          userSelect: "none",
          outline: "none",
        }}
      >
        {/* track */}
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 0,
            right: 0,
            height: 6,
            borderRadius: 3,
            background: "rgba(0,0,0,0.06)",
          }}
        />
        {/* fill */}
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 0,
            width: `${pct}%`,
            height: 6,
            borderRadius: 3,
            background: `linear-gradient(90deg, ${C.amber} 0%, rgba(251,185,49,0.6) 100%)`,
            boxShadow: "0 0 8px rgba(251,185,49,0.25)",
            transition: `width 0.25s ${EASE.smooth}`,
          }}
        />
        {/* thumb */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: `${pct}%`,
            transform: "translateX(-50%)",
            width: 32,
            height: 32,
            borderRadius: 16,
            background: C.amber,
            border: "4px solid #FFFFFF",
            boxShadow:
              "0 2px 12px rgba(251,185,49,0.4), 0 1px 4px rgba(0,0,0,0.1)",
            transition: `left 0.25s ${EASE.smooth}`,
          }}
        />
        {/* ticks */}
        {years.map((y, i) => (
          <div
            key={y}
            style={{
              position: "absolute",
              top: 48,
              left: `${(i / (years.length - 1)) * 100}%`,
              transform: "translateX(-50%)",
              fontFamily: FONT_BODY,
              fontSize: 15,
              fontWeight: year === y ? 600 : 400,
              color: year === y ? C.heading : C.disabled,
              transition: `all 0.25s ${EASE.smooth}`,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {y}Y
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── animated value display ── */
const AnimVal = ({ value, size = 56, color = C.heading, weight = 600 }) => {
  const ref = useRef(null);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value && ref.current) {
      ref.current.animate(
        [
          { opacity: 0.3, transform: "translateY(4px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 200, easing: EASE.sharp, fill: "forwards" }
      );
      prev.current = value;
    }
  }, [value]);
  return (
    <div
      ref={ref}
      style={{
        fontFamily: FONT_HEADING,
        fontWeight: weight,
        fontSize: size,
        color,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {value}
    </div>
  );
};

/* ── bear case reveal ── */
const BearReveal = ({ scenario, data }) => {
  const [shown, setShown] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (scenario === "bear" && !shown) {
      setShown(true);
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 4500);
      return () => clearTimeout(t);
    }
  }, [scenario, shown]);
  if (!visible) return null;
  return (
    <div
      style={{
        padding: "16px 20px",
        borderRadius: 14,
        background: "rgba(251,185,49,0.08)",
        border: "1px solid rgba(251,185,49,0.18)",
        fontFamily: FONT_BODY,
        fontSize: 15,
        color: C.body,
        lineHeight: 1.5,
        animation: "bearFade 4.5s ease-in-out forwards",
      }}
    >
      The bear case still returns {fmtIrr(data.ipo)} IRR post-tax. That is not
      a hedge, that is the floor.
    </div>
  );
};

/* ── deal terms drawer ── */
const DealTerms = ({ expanded, set }) => (
  <div>
    <button
      className="step-16-deal"
      onClick={() => set(!expanded)}
      style={{
        background: "none",
        border: "none",
        fontFamily: FONT_BODY,
        fontSize: 15,
        fontWeight: 500,
        color: C.caption,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 0",
        minHeight: 44,
      }}
    >
      <span
        style={{
          transform: expanded ? "rotate(90deg)" : "rotate(0)",
          transition: `transform 0.25s ${EASE.smooth}`,
          display: "inline-block",
          fontSize: 10,
        }}
      >
        ▶
      </span>
      Fund terms and structure
    </button>
    {expanded && (
      <Panel level={1} style={{ padding: "8px 24px", borderRadius: 16, marginTop: 8 }}>
        {[
          ["Total project", "¥2B (50/50 debt-equity)"],
          ["Tax rate", "20.42% (GK-TK pass-through)"],
          ["Fund size", "USD 30M (min 6M)"],
          ["Target yield", "8-11% p.a. over 5 years"],
          ["Hurdle rate", "7% p.a."],
        ].map(([k, v], i, arr) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 0",
              borderBottom:
                i < arr.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
            }}
          >
            <span style={{ fontFamily: FONT_BODY, fontSize: 15, color: C.caption }}>
              {k}
            </span>
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 15,
                color: C.heading,
                fontWeight: 500,
                fontVariantNumeric: "tabular-nums",
                textAlign: "right",
              }}
            >
              {v}
            </span>
          </div>
        ))}
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 13,
            color: C.disabled,
            marginTop: 4,
            paddingBottom: 14,
          }}
        >
          Indicative. Subject to final investor agreement.
        </div>
      </Panel>
    )}
  </div>
);

/* ── intro transition (services condense into a single datum) ── */
const IntroTransition = ({ onComplete }) => {
  const elemRefs = useRef([]);
  const datumRef = useRef(null);
  const resolveRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const elems = elemRefs.current.filter(Boolean);
      const datum = datumRef.current;
      const h = resolveRef.current;
      if (!h) return;
      await new Promise((r) => setTimeout(r, 400));

      for (let i = 0; i < elems.length; i++) {
        elems[i].animate(
          [
            { transform: "translateX(0) translateY(0) scale(1)", borderRadius: "16px" },
            {
              transform: `translateX(${(i % 3 - 1) * 120}px) translateY(${Math.floor(i / 3) * 80 - 40}px) scale(0.55)`,
              borderRadius: "6px",
            },
          ],
          { duration: 400, delay: i * 60, easing: EASE.smooth, fill: "forwards" }
        );
      }
      await new Promise((r) => setTimeout(r, 600));
      if (cancelled) return;

      for (const el of elems) {
        el.animate(
          [
            { opacity: 1 },
            { transform: "translateX(0) translateY(0) scale(0.08)", opacity: 0 },
          ],
          { duration: 320, easing: EASE.gentle, fill: "forwards" }
        );
      }
      if (datum) {
        await datum.animate(
          [
            { opacity: 0, transform: "translate(-50%,-50%) scale(0)" },
            { opacity: 1, transform: "translate(-50%,-50%) scale(1)" },
          ],
          { duration: 280, easing: EASE.spring, fill: "forwards" }
        ).finished;
        await new Promise((r) => setTimeout(r, 180));
        datum.animate(
          [
            { opacity: 1, transform: "translate(-50%,-50%) scale(1)" },
            { opacity: 0, transform: "translate(-50%,-50%) scale(3.4)" },
          ],
          { duration: 380, easing: EASE.gentle, fill: "forwards" }
        );
      }
      await new Promise((r) => setTimeout(r, 380));
      if (cancelled) return;

      await h.animate(
        [
          { opacity: 0, transform: "translateY(16px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 500, easing: EASE.settle, fill: "forwards" }
      ).finished;
      await new Promise((r) => setTimeout(r, 1200));
      if (cancelled) return;

      if (containerRef.current) {
        await containerRef.current.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 380, easing: EASE.gentle, fill: "forwards" }
        ).finished;
      }
      if (!cancelled) onComplete();
    };
    run();
    return () => { cancelled = true; };
  }, [onComplete]);

  const services = [
    "Property secretary",
    "Medical navigation",
    "Education support",
    "Admin support",
    "Mental wellness",
    "Cultural program",
  ];

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, zIndex: 50, background: C.bg }}
    >
      {/* service chips grid, centered */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, auto)",
            gap: 16,
            justifyItems: "center",
          }}
        >
          {services.map((s, i) => (
            <div
              key={i}
              ref={(el) => (elemRefs.current[i] = el)}
              style={{
                background: C.bg,
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                borderRadius: 16,
                padding: "18px 28px",
                fontFamily: FONT_BODY,
                fontSize: 17,
                color: C.body,
                whiteSpace: "nowrap",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* single datum dot */}
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
          boxShadow: "0 0 24px rgba(251,185,49,0.5)",
          zIndex: 10,
          opacity: 0,
        }}
      />

      {/* resolve text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 var(--content-margin)",
          zIndex: 20,
        }}
      >
        <div
          ref={resolveRef}
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
          }}
        >
          The investment case.
        </div>
      </div>
    </div>
  );
};

const WithIntro = ({ children }) => {
  const [introPlayed, setIntroPlayed] = useState(false);
  const contentRef = useRef(null);
  const handleComplete = useCallback(() => {
    setIntroPlayed(true);
    setTimeout(() => {
      contentRef.current?.animate(
        [
          { opacity: 0, transform: "translateY(24px) scale(0.98)" },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        { duration: 500, easing: EASE.settle, fill: "forwards" }
      );
    }, 50);
  }, []);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {!introPlayed && <IntroTransition onComplete={handleComplete} />}
      <div
        ref={contentRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: introPlayed ? undefined : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   VARIANT A: THE BEACON
   Giant IRR hero, secondary metrics below as two cards.
   iPad landscape: hero left, controls + secondary stack right.
   ───────────────────────────────────────────────────────── */
const VariantA = ({ orientation = "landscape" }) => {
  const [scenario, setScenario] = useState("normal");
  const [year, setYear] = useState(5);
  const [expanded, setExpanded] = useState(false);
  const d = DATA[scenario][year];
  const isLandscape = orientation === "landscape";

  return (
    <WithIntro>
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding:
            "calc(96px + var(--safe-top)) var(--content-margin) calc(56px + var(--safe-bottom))",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          boxSizing: "border-box",
        }}
      >
        {/* header */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 500,
              color: C.caption,
              letterSpacing: "0.18em",
            }}
          >
            SECTION 8
          </div>
          <h1
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 48,
              color: C.heading,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Return projections
          </h1>
        </div>

        {/* controls row */}
        <div
          style={{
            display: "flex",
            flexDirection: isLandscape ? "row" : "column",
            alignItems: isLandscape ? "center" : "stretch",
            gap: 32,
          }}
        >
          <ScenarioTabs scenario={scenario} set={setScenario} />
          <div style={{ flex: 1, maxWidth: isLandscape ? 520 : "100%" }}>
            <YearSlider year={year} set={setYear} />
          </div>
        </div>

        {/* main grid: hero IRR left, secondary stack right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isLandscape ? "1.4fr 1fr" : "1fr",
            gap: 24,
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* hero IRR panel */}
          <Panel level={2} style={{ padding: "44px 44px", borderRadius: 28 }}>
            <div
              role="group"
              aria-label={`Estimated IRR pre-tax: ${fmtIrr(d.ip)}. ${fmtIrr(d.ipo)} post-tax.`}
              style={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 15,
                  fontWeight: 500,
                  color: C.caption,
                  letterSpacing: "0.04em",
                  textTransform: "none",
                  marginBottom: 16,
                }}
              >
                Estimated IRR (pre-tax)
              </div>
              <AnimVal value={fmtIrr(d.ip)} size={144} />
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 17,
                  color: C.caption,
                  marginTop: 16,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {fmtIrr(d.ipo)} post-tax
              </div>
              {/* magnitude bar */}
              <div
                style={{
                  marginTop: 32,
                  height: 6,
                  borderRadius: 3,
                  width: `${Math.min((d.ip / 20) * 100, 100)}%`,
                  background: `linear-gradient(90deg, ${C.amber} 0%, rgba(251,185,49,0.3) 100%)`,
                  transition: `width 0.4s ${EASE.smooth}`,
                  boxShadow: "0 0 12px rgba(251,185,49,0.3)",
                }}
              />
              <div style={{ flex: 1 }} />
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 13,
                  color: C.disabled,
                  marginTop: 16,
                  lineHeight: 1.5,
                }}
              >
                Based on 1 billion yen equity in a 2 billion yen project.
              </div>
            </div>
          </Panel>

          {/* secondary metrics stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Panel level={1} style={{ padding: "28px 32px", borderRadius: 20, flex: 1 }}>
              <div
                role="group"
                aria-label={`Equity multiple: ${fmtEm(d.ep)}. ${fmtEm(d.epo)} post-tax.`}
              >
                <div
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 15,
                    fontWeight: 500,
                    color: C.caption,
                    marginBottom: 12,
                  }}
                >
                  Equity multiple
                </div>
                <AnimVal value={fmtEm(d.ep)} size={56} />
                <div
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 15,
                    color: C.disabled,
                    marginTop: 8,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {fmtEm(d.epo)} post-tax
                </div>
              </div>
            </Panel>

            <Panel level={1} style={{ padding: "28px 32px", borderRadius: 20, flex: 1 }}>
              <div
                role="group"
                aria-label={`Total return: ${fmtYen(d.rp)} JPY. ${fmtYen(d.rpo)} post-tax.`}
              >
                <div
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 15,
                    fontWeight: 500,
                    color: C.caption,
                    marginBottom: 12,
                  }}
                >
                  Total return
                </div>
                <AnimVal value={fmtYen(d.rp)} size={56} />
                <div
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 15,
                    color: C.disabled,
                    marginTop: 8,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {fmtYen(d.rpo)} post-tax
                </div>
              </div>
            </Panel>
          </div>
        </div>

        <BearReveal scenario={scenario} data={d} />
        <DealTerms expanded={expanded} set={setExpanded} />
      </div>
    </WithIntro>
  );
};

/* ─────────────────────────────────────────────────────────
   VARIANT C: THE LEDGER
   Clean tabular layout. IRR row highlighted in amber.
   ───────────────────────────────────────────────────────── */
const VariantC = ({ orientation = "landscape" }) => {
  const [scenario, setScenario] = useState("normal");
  const [year, setYear] = useState(5);
  const [expanded, setExpanded] = useState(false);
  const d = DATA[scenario][year];
  const isLandscape = orientation === "landscape";

  const rows = [
    { label: "Estimated IRR", pre: fmtIrr(d.ip), post: fmtIrr(d.ipo), hero: true },
    { label: "Equity multiple", pre: fmtEm(d.ep), post: fmtEm(d.epo), hero: false },
    { label: "Total return", pre: fmtYen(d.rp), post: fmtYen(d.rpo), hero: false },
  ];

  return (
    <WithIntro>
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding:
            "calc(96px + var(--safe-top)) var(--content-margin) calc(56px + var(--safe-bottom))",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          boxSizing: "border-box",
        }}
      >
        {/* header */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 500,
              color: C.caption,
              letterSpacing: "0.18em",
            }}
          >
            SECTION 8
          </div>
          <h1
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 48,
              color: C.heading,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Return projections
          </h1>
        </div>

        {/* controls */}
        <div
          style={{
            display: "flex",
            flexDirection: isLandscape ? "row" : "column",
            alignItems: isLandscape ? "center" : "stretch",
            gap: 32,
          }}
        >
          <ScenarioTabs scenario={scenario} set={setScenario} />
          <div style={{ flex: 1, maxWidth: isLandscape ? 520 : "100%" }}>
            <YearSlider year={year} set={setYear} />
          </div>
        </div>

        {/* ledger table */}
        <Panel level={2} style={{ borderRadius: 24, padding: "8px 0" }}>
          {/* table header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "20px 32px 16px",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                flex: 1,
                fontFamily: FONT_BODY,
                fontSize: 13,
                fontWeight: 500,
                color: C.disabled,
                letterSpacing: "0.08em",
                textTransform: "none",
              }}
            >
              Metric
            </div>
            <div
              style={{
                width: 200,
                textAlign: "right",
                fontFamily: FONT_BODY,
                fontSize: 13,
                fontWeight: 500,
                color: C.disabled,
                letterSpacing: "0.08em",
              }}
            >
              Pre-tax
            </div>
            <div
              style={{
                width: 200,
                textAlign: "right",
                fontFamily: FONT_BODY,
                fontSize: 13,
                fontWeight: 500,
                color: C.disabled,
                letterSpacing: "0.08em",
              }}
            >
              Post-tax
            </div>
          </div>

          {/* rows */}
          {rows.map((r, i) => (
            <div
              key={i}
              role="group"
              aria-label={`${r.label}: ${r.pre} pre-tax, ${r.post} post-tax.`}
              style={{
                display: "flex",
                alignItems: "center",
                padding: r.hero ? "32px 32px" : "24px 32px",
                minHeight: r.hero ? 96 : 64,
                background: r.hero ? "rgba(251,185,49,0.07)" : "transparent",
                borderBottom:
                  i < rows.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                transition: `background 0.25s ${EASE.smooth}`,
              }}
            >
              <div
                style={{
                  flex: 1,
                  fontFamily: FONT_BODY,
                  fontSize: r.hero ? 22 : 17,
                  color: r.hero ? C.heading : C.body,
                  fontWeight: r.hero ? 600 : 500,
                  letterSpacing: r.hero ? "-0.01em" : 0,
                }}
              >
                {r.label}
              </div>
              <div
                style={{
                  width: 200,
                  textAlign: "right",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <AnimVal value={r.pre} size={r.hero ? 56 : 22} />
              </div>
              <div
                style={{
                  width: 200,
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                  fontFamily: FONT_BODY,
                  fontSize: r.hero ? 18 : 17,
                  fontWeight: r.hero ? 500 : 400,
                  color: r.hero ? C.body : C.caption,
                }}
              >
                {r.post}
              </div>
            </div>
          ))}
        </Panel>

        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 15,
            color: C.disabled,
            lineHeight: 1.5,
          }}
        >
          Based on 1 billion yen equity in a 2 billion yen project.
        </div>

        <BearReveal scenario={scenario} data={d} />
        <DealTerms expanded={expanded} set={setExpanded} />
      </div>
    </WithIntro>
  );
};

export default function Step16FinancialsV3({ variant = "A", orientation = "landscape" } = {}) {
  const resolved = variant === "C" ? "C" : "A";
  const Comp = { A: VariantA, C: VariantC }[resolved];
  return (
    <div
      data-proto="step-16"
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        fontFamily: FONT_BODY,
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-16"] *,
          [data-proto="step-16"] *::before,
          [data-proto="step-16"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
        .step-16-tab { transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1), background 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94), color 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .step-16-tab:active { transform: scale(0.97); }
        .step-16-deal { transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1); }
        .step-16-deal:active { transform: scale(0.98); }
        @keyframes bearFade {
          0%   { opacity: 0; transform: translateY(8px); }
          8%   { opacity: 1; transform: translateY(0); }
          88%  { opacity: 1; }
          100% { opacity: 0; }
        }
        [data-proto="step-16"] ::-webkit-scrollbar { display: none; }
        [data-proto="step-16"] * { scrollbar-width: none; }
      `}</style>
      <Comp key={resolved} orientation={orientation} />
    </div>
  );
}
