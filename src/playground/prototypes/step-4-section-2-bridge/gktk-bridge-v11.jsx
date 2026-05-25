import { useState, useEffect, useRef, useCallback } from "react";

/* ───────────────────────────────────────────────────────
   step-4 section-2 bridge — iPad Pro 13 M4
   Variant A "the counter" — canonical 2-counter form:
   10 trillion → 47,000 → closing line.
   Amber line removed per QA round 1.
   Trigger layer: tap chevron after bridge completes. Fires amber screen.
   ─────────────────────────────────────────────────────── */

const AMBER = "#FBB931";
const NEUTRAL_950 = "#25272C";
const NEUTRAL_800 = "#40444C";
const NEUTRAL_600 = "#5B616E";
const BASE_BG = "#F9F9F9";

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

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

function ZLayer({ z = 0, children, style = {} }) {
  return <div style={{ transform: `translateZ(${z}px)`, transformStyle: "preserve-3d", ...style }}>{children}</div>;
}

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

function BridgeA({ playing, onDone }) {
  const [count10, setCount10] = useState(0);
  const [count47, setCount47] = useState(0);
  const [beat, setBeat] = useState(0);
  const raf = useRef(null);
  const fired = useRef(false);

  useEffect(() => {
    if (!playing) {
      setCount10(0); setCount47(0); setBeat(0); fired.current = false;
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
            <Cap vis={beat >= 4} delay={0.3} z={5} style={{ marginTop: 16 }}>
              High-income engineers are arriving. Housing demand will follow.
            </Cap>
          </div>
        </ZLayer>
      </div>
    </div>
  );
}

export default function App({ orientation = "landscape" } = {}) {
  const [playing, setPlaying] = useState(false);
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

      <BridgeA playing={playing} onDone={handleDone} />
      <TriggerTap visible={animDone && !transitioned} onFire={handleFire} />
      <AmberScreen visible={transitioned} />
    </div>
  );
}
