import { useState, useRef, useCallback } from "react";

/* ───────────────────────────────────────────────────────
   step-18 section-9 risk-factors v8 — iPad Pro 13 M4
   5 beats, 2 variants:
   A "the crescendo"  — fade + scale entrances
   D "the parallax"   — perspective Z-translate entrances
   ─────────────────────────────────────────────────────── */

const C = {
  bg: "#F9F9F9",
  n200: "#D8DBDF",
  n950: "#25272C",
  n900: "#383A42",
  n800: "#40444C",
  n600: "#5B616E",
  amber: "#FBB931",
};
const F = {
  h: "'REM', system-ui, sans-serif",
  b: "'Noto Sans JP', system-ui, sans-serif",
};
const E = {
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  gentle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  settle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
};

const THESIS =
  "Entering in 2025 is the equivalent of acquiring land in Zhubei in 2007.";
const THESIS_2 =
  "We bring what no developer brought to Hsinchu then: Moha Intel, an AI-native platform that turns every asset into a data-generating node, compounding both NOI and proprietary market intelligence across the portfolio.";

const STATS = [
  { value: "1.7x", label: "Land prices since 2020", sub: "Prefecture-wide" },
  { value: "33.3%", label: "Annual gain, #1 in Japan", sub: "Site 1, 2024" },
  { value: "$20B+", label: "Combined fab investment", sub: "JASM Fab 1 and Fab 2" },
  { value: "4T", label: "Yen economic impact", sub: "10-year estimate" },
  { value: "44", label: "Companies drawn", sub: "By TSMC to Kumamoto" },
  { value: "~2x", label: "Zhubei 5-year growth", sub: "Hsinchu precedent" },
];

const TL = [
  {
    y: "2024-2025",
    t: "Fab 1 opens",
    d: "Engineers arrive. Supply gap. No premium developer.",
  },
  {
    y: "2026-2028",
    t: "Fab 2 operational",
    d: "Supply chain clusters. Investment exceeds $20B.",
  },
  {
    y: "2029-2032",
    t: "Developer competition",
    d: "Major developers enter. Early-mover advantage locks.",
  },
  {
    y: "2033-2035",
    t: "Exit window",
    d: "REIT threshold. Institutional acquisition.",
  },
];

const FAQ = [
  {
    q: "What if TSMC slows down or pulls out?",
    a: "44+ companies independently committed. Ecosystem is self-sustaining. 5 to 10 year master leases protect income.",
  },
  {
    q: "JPY volatility and rising rates?",
    a: "All debt is local JPY, natural currency hedge. Rent escalation clauses offset rate increases.",
  },
  {
    q: "Construction over budget or delayed?",
    a: "Fixed-price contracts with penalty clauses. Chateau Life, 20 years Kumamoto experience. Modular construction.",
  },
  {
    q: "How is GK-TK structure tax-efficient?",
    a: "Profits pass through as fees, not dividends. Effective rate: 20.42% versus 30%+ standard corporate.",
  },
  {
    q: "What stops major hotel chains?",
    a: "Semiconductor-specific service layer. First-mover tenant relationships. Lower cost basis than hotel conversions.",
  },
  {
    q: "What governance rights do TK investors have?",
    a: "Veto rights on asset sales, refinancing, major capex, business plan changes. CapitaLand co-investment as firewall.",
  },
];

/* ── Surface helper ── */
const Glass = ({
  level = 1,
  children,
  style = {},
  r,
  onClick,
  role,
  tabIndex,
  ariaLabel,
  onKeyDown,
}) => {
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
      ref={r}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: s.rad,
        background: "#F9F9F9",
        border: s.bdr,
        boxShadow: s.sh,
        ...style,
      }}
    >
      <div style={{ position: "relative", zIndex: 3 }}>{children}</div>
    </div>
  );
};

const Bg = () => (
  <div style={{ position: "absolute", inset: 0, zIndex: 0, background: C.bg }} />
);

const Dots = ({ total, current }) => (
  <div
    style={{
      position: "absolute",
      bottom: "calc(40px + var(--safe-bottom))",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: 10,
      zIndex: 80,
    }}
  >
    {Array.from({ length: total }, (_, i) => (
      <div
        key={i}
        style={{
          width: i === current ? 14 : 9,
          height: i === current ? 14 : 9,
          borderRadius: 9999,
          background: i === current ? C.amber : C.n200,
          transition: "all 200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />
    ))}
  </div>
);

const an = (el, kf, opts) => {
  if (!el) return Promise.resolve();
  return el.animate(kf, { fill: "forwards", ...opts }).finished;
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const Beat = ({ children, r, visible }) => (
  <div
    ref={r}
    style={{
      position: "absolute",
      inset: 0,
      zIndex: visible ? 5 : 1,
      visibility: visible ? "visible" : "hidden",
      opacity: 0,
    }}
  >
    {children}
  </div>
);

/* ── B1: thesis hero ── */
const B1 = ({ landscape }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding:
        "calc(120px + var(--safe-top)) var(--content-margin) calc(120px + var(--safe-bottom))",
    }}
  >
    <div
      style={{
        fontFamily: F.b,
        fontWeight: 500,
        fontSize: 15,
        color: C.n600,
        letterSpacing: "0.04em",
        marginBottom: 32,
        textTransform: "none",
      }}
    >
      Kumamoto semiconductor corridor, 2024 to 2035
    </div>
    <div
      style={{
        fontFamily: F.h,
        fontWeight: 600,
        fontSize: landscape ? 64 : 56,
        lineHeight: 1.1,
        color: C.n950,
        letterSpacing: "-0.025em",
        maxWidth: landscape ? 1100 : 880,
      }}
    >
      {THESIS}
    </div>
  </div>
);

/* ── B2: stats grid ── */
const B2 = ({ tiles, landscape }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      padding:
        "calc(96px + var(--safe-top)) var(--content-margin) calc(96px + var(--safe-bottom))",
    }}
  >
    <div
      style={{
        fontFamily: F.b,
        fontWeight: 500,
        fontSize: 15,
        color: C.n600,
        letterSpacing: "0.04em",
        marginBottom: 28,
      }}
    >
      Key data points
    </div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: landscape ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
        gap: landscape ? 24 : 20,
        flex: 1,
        alignContent: "center",
      }}
    >
      {STATS.map((s, i) => (
        <Glass
          key={i}
          level={1}
          r={(el) => {
            if (tiles) tiles.current[i] = el;
          }}
          style={{
            padding: landscape ? "32px 28px" : "28px 24px",
            opacity: 0,
          }}
        >
          <div
            style={{
              fontFamily: F.h,
              fontWeight: 600,
              fontSize: landscape ? 56 : 48,
              lineHeight: 1,
              color: C.n950,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.02em",
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontFamily: F.b,
              fontSize: 17,
              lineHeight: 1.4,
              color: C.n800,
              marginTop: 16,
              fontWeight: 500,
            }}
          >
            {s.label}
          </div>
          <div
            style={{
              fontFamily: F.b,
              fontSize: 15,
              lineHeight: 1.5,
              color: C.n600,
              marginTop: 6,
            }}
          >
            {s.sub}
          </div>
        </Glass>
      ))}
    </div>
  </div>
);

/* ── B3: timeline ── */
const B3 = ({ nodes, landscape }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      padding:
        "calc(96px + var(--safe-top)) var(--content-margin) calc(96px + var(--safe-bottom))",
    }}
  >
    <div
      style={{
        fontFamily: F.b,
        fontWeight: 500,
        fontSize: 15,
        color: C.n600,
        letterSpacing: "0.04em",
        marginBottom: 28,
      }}
    >
      Strategic timing
    </div>
    <Glass
      level={1}
      style={{
        padding: landscape ? "48px 56px" : "40px 36px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {TL.map((t, i) => (
          <div
            key={i}
            ref={(el) => {
              if (nodes) nodes.current[i] = el;
            }}
            style={{ display: "flex", gap: 28 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
                width: 28,
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: i === 0 ? 20 : 14,
                  height: i === 0 ? 20 : 14,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 9999,
                    border: "2px solid " + C.n200,
                    opacity: 0.4,
                  }}
                />
                <div
                  className={"tl-dot-" + i}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 9999,
                    background: C.amber,
                    transform: "scale(0)",
                  }}
                />
              </div>
              {i < TL.length - 1 && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: landscape ? 48 : 40,
                    marginTop: 6,
                    position: "relative",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: C.n200,
                      opacity: 0.25,
                    }}
                  />
                  <div
                    className={"tl-line-" + i}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: C.amber,
                      transformOrigin: "top",
                      transform: "scaleY(0)",
                    }}
                  />
                </div>
              )}
            </div>
            <div
              style={{
                paddingBottom: i < TL.length - 1 ? (landscape ? 36 : 30) : 0,
                opacity: 0,
                flex: 1,
              }}
              className={"tl-text-" + i}
            >
              <div
                style={{
                  fontFamily: F.b,
                  fontWeight: 500,
                  fontSize: 15,
                  color: C.n600,
                  letterSpacing: "0.02em",
                }}
              >
                {t.y}
              </div>
              <div
                style={{
                  fontFamily: F.h,
                  fontWeight: 600,
                  fontSize: landscape ? 28 : 24,
                  lineHeight: 1.2,
                  color: C.n950,
                  marginTop: 6,
                  letterSpacing: "-0.015em",
                }}
              >
                {t.t}
              </div>
              <div
                style={{
                  fontFamily: F.b,
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: C.n800,
                  marginTop: 8,
                  maxWidth: landscape ? 760 : 620,
                }}
              >
                {t.d}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Glass>
  </div>
);

/* ── B4: Moha Intel callout ── */
const B4 = ({ landscape }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding:
        "calc(120px + var(--safe-top)) var(--content-margin) calc(120px + var(--safe-bottom))",
    }}
  >
    <Glass
      level={2}
      style={{
        padding: landscape ? "64px 72px" : "52px 44px",
        maxWidth: landscape ? 1080 : 880,
      }}
    >
      <div
        style={{
          fontFamily: F.h,
          fontWeight: 600,
          fontSize: landscape ? 40 : 32,
          lineHeight: 1.2,
          color: C.n950,
          marginBottom: 24,
          letterSpacing: "-0.02em",
        }}
      >
        Moha Intel
      </div>
      <div
        style={{
          fontFamily: F.b,
          fontSize: landscape ? 22 : 18,
          lineHeight: 1.6,
          color: C.n800,
          fontWeight: 400,
        }}
      >
        {THESIS_2}
      </div>
    </Glass>
  </div>
);

/* ── B5: FAQ / risk-factors accordion ── */
const B5 = ({ openFaq, setOpenFaq, landscape }) => {
  // Landscape: 2-column for breathing room. Portrait: single column.
  const columns = landscape ? 2 : 1;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding:
          "calc(88px + var(--safe-top)) var(--content-margin) calc(96px + var(--safe-bottom))",
      }}
    >
      <div
        style={{
          fontFamily: F.b,
          fontWeight: 500,
          fontSize: 15,
          color: C.n600,
          letterSpacing: "0.04em",
          marginBottom: 24,
        }}
      >
        Risk factors
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          columnGap: landscape ? 24 : 0,
          rowGap: landscape ? 14 : 12,
          flex: 1,
          alignContent: "start",
        }}
      >
        {FAQ.map((f, i) => (
          <Glass
            key={i}
            level={1}
            onClick={(e) => {
              e.stopPropagation();
              setOpenFaq(openFaq === i ? -1 : i);
            }}
            role="button"
            tabIndex={0}
            ariaLabel={f.q}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                setOpenFaq(openFaq === i ? -1 : i);
              }
            }}
            style={{ padding: landscape ? "22px 28px" : "20px 24px" }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: F.b,
                    fontWeight: 500,
                    fontSize: 17,
                    lineHeight: 1.4,
                    color: C.n950,
                  }}
                >
                  {f.q}
                </div>
                <div
                  style={{
                    maxHeight: openFaq === i ? 240 : 0,
                    overflow: "hidden",
                    transition:
                      "max-height 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    opacity: openFaq === i ? 1 : 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: F.b,
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: C.n800,
                      marginTop: 12,
                    }}
                  >
                    {f.a}
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: C.n600,
                  flexShrink: 0,
                  transform:
                    openFaq === i ? "rotate(180deg)" : "rotate(0)",
                  transition:
                    "transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  lineHeight: 1.2,
                }}
              >
                &#9662;
              </div>
            </div>
          </Glass>
        ))}
      </div>
    </div>
  );
};

/* ── Animation helpers ── */
const stg = async (refs, count, kf, dur, easing, delay = 120) => {
  for (let i = 0; i < count; i++) {
    an(refs.current[i], kf, { duration: dur, easing });
    if (i < count - 1) await wait(delay);
  }
  await wait(dur - delay);
};

const tlAnim = async (refs) => {
  for (let i = 0; i < 4; i++) {
    const node = refs.current[i];
    if (!node) continue;
    const dot = node.querySelector(".tl-dot-" + i);
    const text = node.querySelector(".tl-text-" + i);
    const line = node.querySelector(".tl-line-" + i);
    if (dot)
      an(
        dot,
        [
          { transform: "scale(0)" },
          { transform: "scale(1.4)" },
          { transform: "scale(1)" },
        ],
        { duration: 350, easing: E.spring },
      );
    if (text)
      an(
        text,
        [
          { opacity: 0, transform: "translateX(-12px)" },
          { opacity: 1, transform: "translateX(0)" },
        ],
        { duration: 350, easing: E.settle },
      );
    await wait(300);
    if (line)
      await an(
        line,
        [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }],
        { duration: 320, easing: E.settle },
      );
    await wait(40);
  }
};

/* ── Variant factory ── */
const makeVariant = (enterFn, exitFn) =>
  function Variant({ landscape = true }) {
    const [beat, setBeat] = useState(0);
    const busy = useRef(false);
    const b = [useRef(), useRef(), useRef(), useRef(), useRef()];
    const tiles = useRef([]);
    const nodes = useRef([]);
    const [oF, sOF] = useState(-1);
    const go = useCallback(async () => {
      if (busy.current || beat >= 5) return;
      busy.current = true;
      const next = beat + 1;
      if (beat > 0) await exitFn(b[beat - 1].current);
      await wait(200);
      setBeat(next);
      await enterFn(next, b, tiles, nodes);
      busy.current = false;
    }, [beat]);
    return (
      <div
        style={{ position: "relative", width: "100%", height: "100%" }}
        onClick={go}
        role="button"
        tabIndex={0}
        aria-label="Tap to continue"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            go();
          }
        }}
      >
        <Bg />
        <Beat r={b[0]} visible={beat === 1}>
          <B1 landscape={landscape} />
        </Beat>
        <Beat r={b[1]} visible={beat === 2}>
          <B2 tiles={tiles} landscape={landscape} />
        </Beat>
        <Beat r={b[2]} visible={beat === 3}>
          <B3 nodes={nodes} landscape={landscape} />
        </Beat>
        <Beat r={b[3]} visible={beat === 4}>
          <B4 landscape={landscape} />
        </Beat>
        <Beat r={b[4]} visible={beat === 5}>
          <B5 openFaq={oF} setOpenFaq={sOF} landscape={landscape} />
        </Beat>
        {beat === 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 90,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: F.b,
                fontSize: 17,
                color: C.n600,
                background: "#F9F9F9",
                padding: "20px 40px",
                borderRadius: 9999,
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow:
                  "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              Tap to begin
            </div>
          </div>
        )}
        {beat > 0 && <Dots total={5} current={beat - 1} />}
      </div>
    );
  };

const VariantA = makeVariant(
  async (n, b, t, nd) => {
    if (n === 1)
      await an(
        b[0].current,
        [
          { opacity: 0, transform: "scale(1.06)" },
          { opacity: 0.4, transform: "scale(1.04)" },
          { opacity: 0.8, transform: "scale(1.01)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: 1000, easing: E.settle },
      );
    else if (n === 2) {
      await an(
        b[1].current,
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 200, easing: E.smooth },
      );
      await stg(
        t,
        6,
        [
          { opacity: 0, transform: "translateY(20px) scale(0.97)" },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        400,
        E.spring,
        120,
      );
    } else if (n === 3) {
      await an(
        b[2].current,
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 200, easing: E.smooth },
      );
      await tlAnim(nd);
    } else if (n === 4)
      await an(
        b[3].current,
        [
          { opacity: 0, transform: "translateY(20px) scale(0.97)" },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        { duration: 450, easing: E.spring },
      );
    else if (n === 5)
      await an(
        b[4].current,
        [
          { opacity: 0, transform: "translateY(16px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 400, easing: E.spring },
      );
  },
  async (el) =>
    an(
      el,
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0.5, transform: "scale(0.98)" },
        { opacity: 0, transform: "scale(0.96)" },
      ],
      { duration: 300, easing: E.gentle },
    ),
);

const VariantD = makeVariant(
  async (n, b, t, nd) => {
    const pIn = [
      {
        opacity: 0,
        transform:
          "perspective(1200px) translateZ(-250px) rotateX(-2deg) rotateY(1.5deg)",
      },
      {
        opacity: 0.6,
        transform:
          "perspective(1200px) translateZ(-60px) rotateX(-0.5deg) rotateY(0.3deg)",
      },
      {
        opacity: 1,
        transform:
          "perspective(1200px) translateZ(0px) rotateX(0deg) rotateY(0deg)",
      },
    ];
    if (n === 1) await an(b[0].current, pIn, { duration: 900, easing: E.settle });
    else if (n === 2) {
      await an(b[1].current, pIn, { duration: 800, easing: E.settle });
      await stg(
        t,
        6,
        [
          { opacity: 0, transform: "translateZ(30px) scale(0.93)" },
          { opacity: 1, transform: "translateZ(0) scale(1)" },
        ],
        350,
        E.spring,
        100,
      );
    } else if (n === 3) {
      await an(b[2].current, pIn, { duration: 800, easing: E.settle });
      await tlAnim(nd);
    } else if (n === 4)
      await an(b[3].current, pIn, { duration: 800, easing: E.settle });
    else if (n === 5)
      await an(b[4].current, pIn, { duration: 700, easing: E.settle });
  },
  async (el) =>
    an(
      el,
      [
        {
          opacity: 1,
          transform:
            "perspective(1200px) translateZ(0px) rotateX(0deg) rotateY(0deg)",
        },
        {
          opacity: 0.4,
          transform:
            "perspective(1200px) translateZ(-150px) rotateX(3deg) rotateY(-2deg)",
        },
        {
          opacity: 0,
          transform:
            "perspective(1200px) translateZ(-350px) rotateX(6deg) rotateY(-3deg)",
        },
      ],
      { duration: 400, easing: E.gentle },
    ),
);

const VARIANTS = {
  A: { name: "A: the crescendo", c: VariantA },
  D: { name: "D: the parallax", c: VariantD },
};

export default function Step18RiskFactorsV8({
  variant = "A",
  orientation = "landscape",
} = {}) {
  const resolved = VARIANTS[variant] ? variant : "A";
  const Cur = VARIANTS[resolved].c;
  const landscape = orientation === "landscape";
  return (
    <div
      data-proto="step-18"
      style={{ position: "absolute", inset: 0, background: "#F9F9F9", fontFamily: F.b }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-18"] *,
          [data-proto="step-18"] *::before,
          [data-proto="step-18"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
      <Cur key={resolved} landscape={landscape} />
    </div>
  );
}
