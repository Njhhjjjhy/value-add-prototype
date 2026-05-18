import { useState, useEffect, useRef, useCallback } from "react";

/* ───────────────────────────────────────────────────────
   step-4 section-2 bridge — iPad Pro 13 M4
   Three variants:
   A "counters"   — 10 trillion → 47,000 → amber line conclusion
   F "typewriter" — counters + typewriter caption + bar conclusion
   G "carousel"   — four-slide pager (context → invest → workforce → thesis)
   Trigger layer: tap chevron after bridge completes. Fires amber screen.
   ─────────────────────────────────────────────────────── */

const AMBER = "#FBB931";
const NEUTRAL_950 = "#25272C";
const NEUTRAL_800 = "#40444C";
const NEUTRAL_600 = "#5B616E";
const NEUTRAL_200 = "#D8DBDF";
const BASE_BG = "#F9F9F9";

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

// ─── flat panel ───
function Glass({ children, level = 2, z = 30, rx = 0, ry = 0, style = {} }) {
  const L2 = level === 2;
  return (
    <div style={{
      position: "relative",
      transform: `translateZ(${z}px) rotateX(${rx}deg) rotateY(${ry}deg)`,
      transformStyle: "preserve-3d",
      background: BASE_BG,
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: L2
        ? `0 ${8 + z * 0.2}px ${32 + z}px rgba(0,0,0,${0.10 + z * 0.001}), 0 2px 8px rgba(0,0,0,0.06)`
        : `0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)`,
      borderRadius: 20, overflow: "hidden",
      transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      ...style,
    }}>
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

function DNum({ children, arrived = false, z = 50, style = {} }) {
  return (
    <div style={{
      transform: `translateZ(${arrived ? z : z - 20}px) scale(${arrived ? 1 : 0.88})`,
      transformStyle: "preserve-3d",
      transition: "transform 0.65s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      opacity: arrived ? 1 : 0,
      position: "relative",
    }}>
      <span style={{
        display: "inline-block",
        fontFamily: FONT_HEADING,
        fontWeight: 600,
        fontSize: 56,
        lineHeight: 1.0,
        letterSpacing: "-0.02em",
        color: NEUTRAL_950,
        ...style,
      }}>{children}</span>
    </div>
  );
}

function Cap({ children, vis = false, delay = 0, z = 10, style = {} }) {
  return (
    <div style={{
      transform: `translateZ(${z}px) translateY(${vis ? 0 : 5}px)`,
      transformStyle: "preserve-3d",
      opacity: vis ? 1 : 0,
      transition: `opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
    }}>
      <p style={{
        fontFamily: FONT_BODY,
        fontWeight: 400,
        fontSize: 17,
        lineHeight: 1.6,
        color: NEUTRAL_600,
        letterSpacing: "0.015em",
        margin: 0,
        ...style,
      }}>{children}</p>
    </div>
  );
}

function ALine({ progress = 1, width = "100%", z = 15, style = {} }) {
  return (
    <div style={{ transform: `translateZ(${z}px)`, ...style }}>
      <svg width={width} height="3" viewBox="0 0 200 3" preserveAspectRatio="none" style={{ display: "block" }}>
        <defs>
          <linearGradient id="al" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={AMBER} stopOpacity="0" />
            <stop offset="15%" stopColor={AMBER} stopOpacity="0.85" />
            <stop offset="85%" stopColor={AMBER} stopOpacity="0.85" />
            <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0.5" width={200 * progress} height="2" rx="1" fill="url(#al)" />
      </svg>
    </div>
  );
}

function ZLayer({ z = 0, children, style = {} }) {
  return <div style={{ transform: `translateZ(${z}px)`, transformStyle: "preserve-3d", ...style }}>{children}</div>;
}

// ───────────────────────────────────────────────────────────
// AMBER DESTINATION SCREEN
// ───────────────────────────────────────────────────────────
function AmberScreen({ visible }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 50,
      background: `linear-gradient(135deg, ${AMBER}, #FF9424)`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(100%)",
      transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      display: "flex", flexDirection: "column", alignItems: "flex-start",
      justifyContent: "center",
      padding: "calc(96px + var(--safe-top)) var(--content-margin) calc(96px + var(--safe-bottom))",
    }}>
      <p style={{
        fontFamily: FONT_HEADING, fontWeight: 600, fontSize: 48, color: "#fff",
        lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 16,
      }}>
        Enter Kumamoto
      </p>
      <p style={{
        fontFamily: FONT_BODY, fontSize: 17, color: "#F9F9F9", lineHeight: 1.6, margin: 0,
      }}>
        Trigger fired successfully. This is where the next section begins.
      </p>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// TRIGGER — tap chevron (iPad-sized)
// ───────────────────────────────────────────────────────────
function TriggerTap({ visible, onFire }) {
  return (
    <div style={{
      position: "absolute",
      bottom: "calc(48px + var(--safe-bottom))",
      right: "var(--content-margin)",
      zIndex: 35,
      opacity: visible ? 1 : 0,
      transform: `scale(${visible ? 1 : 0.6})`,
      transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
      pointerEvents: visible ? "auto" : "none",
    }}>
      <div
        onClick={() => onFire?.()}
        role="button"
        aria-label="Enter Kumamoto"
        style={{
          width: 72, height: 72, borderRadius: 20,
          position: "relative", overflow: "hidden",
          background: BASE_BG,
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center",
          userSelect: "none",
          touchAction: "manipulation",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 18 18" fill="none">
          <path d="M6.5 3.5L12 9L6.5 14.5" stroke={NEUTRAL_800} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// BRIDGE VARIANTS
// ───────────────────────────────────────────────────────────

function BridgeA({ playing, onDone }) {
  const [count10, setCount10] = useState(0);
  const [count47, setCount47] = useState(0);
  const [beat, setBeat] = useState(0);
  const [lineP, setLineP] = useState(0);
  const raf = useRef(null);
  const fired = useRef(false);

  useEffect(() => {
    if (!playing) {
      setCount10(0); setCount47(0); setBeat(0); setLineP(0); fired.current = false;
      return;
    }
    let s = null;
    const a = ts => {
      if (!s) s = ts;
      const e = ts - s;
      if (e < 1200) {
        setCount10(Math.round(easeOutCubic(Math.min(1, e / 1000)) * 10));
        if (e > 200) setBeat(1);
      } else if (e < 1600) {
        setCount10(10); setBeat(1);
      } else if (e < 2800) {
        setBeat(2);
        setCount47(Math.round(easeOutCubic(Math.min(1, (e - 1600) / 1000)) * 47000));
      } else if (e < 3200) {
        setCount47(47000); setBeat(3);
      } else {
        setBeat(4);
        setLineP(easeOutCubic(Math.min(1, (e - 3200) / 600)));
        if (e > 3900 && !fired.current) { fired.current = true; onDone(); }
        if (e > 4200) return;
      }
      raf.current = requestAnimationFrame(a);
    };
    raf.current = requestAnimationFrame(a);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, onDone]);

  return (
    <div style={{
      position: "absolute", inset: 0,
      padding: "calc(96px + var(--safe-top)) var(--content-margin) calc(160px + var(--safe-bottom))",
      display: "flex", flexDirection: "column", gap: 32,
      justifyContent: "center",
      perspective: "1200px",
      perspectiveOrigin: "50% 45%",
      transformStyle: "preserve-3d",
    }}>
      <div style={{ width: "100%", maxWidth: 880, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>
        <Glass level={2} z={40} rx={1.2} ry={-0.5} style={{ padding: 32 }}>
          <div role="group" aria-live="polite" aria-label={`${count10} trillion yen. Japan is rebuilding its chip industry.`}>
            <DNum arrived={beat >= 1} z={55}>{count10 > 0 ? `${count10}` : "0"}</DNum>
            <Cap vis={beat >= 1} delay={0.2} z={12} style={{ marginTop: 12 }}>trillion yen. Japan is rebuilding its chip industry.</Cap>
          </div>
        </Glass>
        <Glass level={2} z={25} rx={0.8} ry={0.4} style={{ padding: 32, opacity: beat >= 2 ? 1 : 0 }}>
          <div role="group" aria-live="polite" aria-label={`${count47.toLocaleString()} jobs being created. Kumamoto is set to attract waves of high-income engineers.`}>
            <DNum arrived={beat >= 3} z={50}>{count47.toLocaleString()}</DNum>
            <Cap vis={beat >= 3} delay={0.15} z={10} style={{ marginTop: 12 }}>jobs being created. Kumamoto is set to attract waves of high-income engineers.</Cap>
          </div>
        </Glass>
        <ZLayer z={10}>
          <div style={{
            opacity: beat >= 4 ? 1 : 0,
            transform: beat >= 4 ? "translateY(0)" : "translateY(14px)",
            transition: "all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            paddingLeft: 4,
          }}>
            <ALine progress={lineP} width="60%" z={5} />
            <Cap vis={beat >= 4} delay={0.3} z={5} style={{ marginTop: 16 }}>
              High-income engineers are arriving. Housing demand will follow.
            </Cap>
          </div>
        </ZLayer>
      </div>
    </div>
  );
}

function TD({ target, rolling, duration = 1000, delay = 0 }) {
  const [d, setD] = useState(0);
  const r = useRef(null);
  useEffect(() => {
    if (!rolling) { setD(0); return; }
    let s = null;
    const rp = Math.random() * 80;
    const a = ts => {
      if (!s) s = ts;
      const e = ts - s - delay;
      if (e < 0) { r.current = requestAnimationFrame(a); return; }
      const t = Math.min(1, e / duration);
      if (t < 0.65) setD(Math.floor((Math.sin(e * 0.035 + rp) + 1) * 5) % 10);
      else if (t < 0.85) setD(Math.floor(Math.random() * 10));
      else setD(target);
      if (t < 1) r.current = requestAnimationFrame(a);
      else setD(target);
    };
    r.current = requestAnimationFrame(a);
    return () => cancelAnimationFrame(r.current);
  }, [rolling, target, duration, delay]);
  return <span style={{
    display: "inline-block",
    fontFamily: FONT_HEADING,
    fontWeight: 600,
    fontVariantNumeric: "tabular-nums",
    minWidth: "0.62em",
    textAlign: "center",
  }}>{d}</span>;
}

function TN({ value, rolling, db = 0 }) {
  return (
    <span>
      {String(value).split("").map((c, i) =>
        c === ","
          ? <span key={i} style={{ fontFamily: FONT_HEADING, fontWeight: 600 }}>,</span>
          : <TD key={i} target={parseInt(c)} rolling={rolling} duration={900 + i * 80} delay={db + i * 55} />
      )}
    </span>
  );
}

function TW({ text, active, speed = 28, delay = 0 }) {
  const [ch, setCh] = useState(0);
  useEffect(() => {
    if (!active) { setCh(0); return; }
    let to, i = 0;
    const sd = setTimeout(() => {
      const fn = () => {
        if (i <= text.length) { setCh(i); i++; to = setTimeout(fn, speed); }
      };
      fn();
    }, delay);
    return () => { clearTimeout(sd); clearTimeout(to); };
  }, [active, text, speed, delay]);
  return (
    <span>
      {text.slice(0, ch)}
      {ch < text.length && active && (
        <span style={{
          display: "inline-block",
          width: 2,
          height: "1em",
          background: AMBER,
          marginLeft: 1,
          animation: "cursorBlink 0.5s step-end infinite",
          verticalAlign: "text-bottom",
        }} />
      )}
    </span>
  );
}

function BridgeF({ playing, onDone }) {
  const [beat, setBeat] = useState(0);
  const [barP, setBarP] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    if (!playing) { setBeat(0); setBarP(0); fired.current = false; return; }
    const ts = [
      setTimeout(() => setBeat(1), 100),
      setTimeout(() => setBeat(2), 1400),
      setTimeout(() => setBeat(3), 1800),
      setTimeout(() => setBeat(4), 3200),
      setTimeout(() => setBeat(5), 3600),
    ];
    let r, s = null;
    const a = t => {
      if (!s) s = t;
      const e = t - s;
      if (e > 3600) {
        setBarP(easeOutCubic(Math.min(1, (e - 3600) / 500)));
        if (e > 4200 && !fired.current) { fired.current = true; onDone(); }
      }
      if (e < 4500) r = requestAnimationFrame(a);
    };
    r = requestAnimationFrame(a);
    return () => { ts.forEach(clearTimeout); cancelAnimationFrame(r); };
  }, [playing, onDone]);

  return (
    <div style={{
      position: "absolute", inset: 0,
      padding: "calc(96px + var(--safe-top)) var(--content-margin) calc(160px + var(--safe-bottom))",
      display: "flex", flexDirection: "column", gap: 32,
      justifyContent: "center",
      perspective: "1200px",
      perspectiveOrigin: "50% 45%",
      transformStyle: "preserve-3d",
    }}>
      <div style={{ width: "100%", maxWidth: 880, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>
        <Glass level={2} z={45} rx={1} ry={-0.3} style={{ padding: 32, opacity: beat >= 1 ? 1 : 0 }}>
          <div role="group" aria-live="polite" aria-label="10 trillion yen committed to semiconductor sovereignty.">
            <DNum arrived={beat >= 2} z={60}><TN value="10" rolling={beat >= 1} /></DNum>
            <Cap vis={beat >= 2} delay={0.1} z={15} style={{ marginTop: 12 }}>
              <TW text="trillion yen committed to semiconductor sovereignty." active={beat >= 2} delay={200} />
            </Cap>
          </div>
        </Glass>
        <Glass level={2} z={30} rx={0.6} ry={0.5} style={{ padding: 32, opacity: beat >= 3 ? 1 : 0 }}>
          <div role="group" aria-live="polite" aria-label="47,000 new jobs. The largest workforce migration in decades.">
            <DNum arrived={beat >= 4} z={50}><TN value="47,000" rolling={beat >= 3} /></DNum>
            <Cap vis={beat >= 4} delay={0.1} z={10} style={{ marginTop: 12 }}>
              <TW text="new jobs. The largest workforce migration in decades." active={beat >= 4} delay={200} />
            </Cap>
          </div>
        </Glass>
        <ZLayer z={12}>
          <div style={{
            opacity: beat >= 5 ? 1 : 0,
            transition: "opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            paddingLeft: 4,
          }}>
            <div style={{
              width: "100%", height: 3, background: NEUTRAL_200, borderRadius: 2, overflow: "hidden",
            }}>
              <div style={{
                width: `${barP * 100}%`, height: "100%",
                background: `linear-gradient(90deg, transparent, ${AMBER})`,
                borderRadius: 2,
              }} />
            </div>
            <Cap vis={beat >= 5} delay={0.3} z={5} style={{ marginTop: 16 }}>
              Kumamoto is set to attract waves of high-income engineers.
            </Cap>
          </div>
        </ZLayer>
      </div>
    </div>
  );
}

function BridgeG({ playing, onDone }) {
  const [as, setAs] = useState(-1);
  const fired = useRef(false);
  const slides = [
    { number: null, text: "The COVID-era chip shortage exposed a hard truth.", label: "context" },
    { number: "10", suffix: " trillion", text: "Japan is rebuilding its chip industry.", label: "investment" },
    { number: "47,000", suffix: "", text: "Jobs being created in Kumamoto alone.", label: "workforce" },
    { number: null, text: "High-income engineers need housing. That is the opportunity.", label: "thesis" },
  ];

  useEffect(() => {
    if (!playing) { setAs(-1); fired.current = false; return; }
    const ts = [
      setTimeout(() => setAs(0), 200),
      setTimeout(() => setAs(1), 1800),
      setTimeout(() => setAs(2), 3400),
      setTimeout(() => {
        setAs(3);
        if (!fired.current) { fired.current = true; setTimeout(() => onDone(), 800); }
      }, 5000),
    ];
    return () => ts.forEach(clearTimeout);
  }, [playing, onDone]);

  return (
    <div style={{
      position: "absolute", inset: 0,
      padding: "calc(96px + var(--safe-top)) var(--content-margin) calc(160px + var(--safe-bottom))",
      display: "flex", flexDirection: "column",
      justifyContent: "center",
      perspective: "1200px",
      perspectiveOrigin: "50% 45%",
      transformStyle: "preserve-3d",
    }}>
      <div style={{ width: "100%", maxWidth: 880, margin: "0 auto" }}>
        <ZLayer z={20} style={{ marginBottom: 28, paddingLeft: 4 }}>
          <div style={{ display: "flex", gap: 10 }}>
            {slides.map((_, i) => (
              <div key={i} style={{
                width: as === i ? 32 : 8,
                height: 8,
                borderRadius: 4,
                background: as >= i ? AMBER : NEUTRAL_200,
                transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              }} />
            ))}
          </div>
        </ZLayer>
        <div style={{ position: "relative", minHeight: 280, transformStyle: "preserve-3d" }}>
          {slides.map((sl, i) => {
            const act = as === i;
            const past = as > i;
            return (
              <div key={i} style={{
                position: "absolute", inset: 0,
                transform: `translateZ(${act ? 45 : past ? -10 : 20}px) rotateX(${act ? 0.8 : past ? -2 : 2}deg) scale(${act ? 1 : 0.88})`,
                opacity: act ? 1 : 0,
                transition: "all 0.65s cubic-bezier(0.34,1.56,0.64,1)",
                pointerEvents: act ? "auto" : "none",
                transformStyle: "preserve-3d",
              }}>
                <Glass level={2} z={0} rx={0} style={{ padding: 36 }}>
                  <ZLayer z={20}>
                    <div style={{
                      display: "inline-block",
                      padding: "6px 14px",
                      borderRadius: 10,
                      background: "#EDEEF1",
                      border: "1px solid rgba(0,0,0,0.06)",
                      marginBottom: 20,
                    }}>
                      <span style={{
                        fontFamily: FONT_BODY,
                        fontSize: 13,
                        fontWeight: 500,
                        color: NEUTRAL_600,
                        letterSpacing: "0.02em",
                      }}>{sl.label}</span>
                    </div>
                  </ZLayer>
                  <div role="group" aria-live="polite" aria-label={sl.number ? `${sl.number}${sl.suffix || ""}. ${sl.text}` : sl.text}>
                    {sl.number && (
                      <DNum arrived={act} z={40}>
                        {sl.number}
                        {sl.suffix && (
                          <span style={{
                            fontFamily: FONT_HEADING,
                            fontWeight: 600,
                            fontSize: 32,
                            color: NEUTRAL_800,
                            marginLeft: 8,
                          }}>{sl.suffix}</span>
                        )}
                      </DNum>
                    )}
                    <Cap vis={act} delay={0.2} z={8} style={{ marginTop: 12 }}>{sl.text}</Cap>
                  </div>
                </Glass>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// MAIN
// ───────────────────────────────────────────────────────────
const BRIDGE_BY_VARIANT = { A: BridgeA, F: BridgeF, G: BridgeG };

export default function App({ variant = "A", orientation = "landscape" } = {}) {
  const Comp = BRIDGE_BY_VARIANT[variant] ?? BridgeA;

  const [playing, setPlaying] = useState(false);
  const [animKey] = useState(0);
  const [animDone, setAnimDone] = useState(false);
  const [transitioned, setTransitioned] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPlaying(true), 400);
    return () => clearTimeout(t);
  }, []);

  const handleDone = useCallback(() => setAnimDone(true), []);
  const handleFire = useCallback(() => setTransitioned(true), []);

  return (
    <div
      data-proto="step-4"
      data-orientation={orientation}
      style={{
        position: "absolute",
        inset: 0,
        background: BASE_BG,
        fontFamily: FONT_BODY,
      }}
    >
      <style>{`
        @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-4"] *,
          [data-proto="step-4"] *::before,
          [data-proto="step-4"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>

      {/* bridge content */}
      <Comp key={`${variant}-${animKey}`} playing={playing} onDone={handleDone} />

      {/* trigger layer */}
      <TriggerTap key={`t-${animKey}`} visible={animDone && !transitioned} onFire={handleFire} />

      {/* amber destination */}
      <AmberScreen visible={transitioned} />
    </div>
  );
}
