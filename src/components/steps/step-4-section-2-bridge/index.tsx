'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const AMBER = '#FBB931';
const NEUTRAL_950 = '#25272C';
const NEUTRAL_600 = '#5B616E';
const BASE_BG = '#F9F9F9';

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const ENTER_DELAY_MS = 400;
const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function Glass({
  children,
  z = 30,
  rx = 0,
  ry = 0,
  style = {},
}: {
  children: React.ReactNode;
  z?: number;
  rx?: number;
  ry?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: 'relative',
        transform: `translateZ(${z}px) rotateX(${rx}deg) rotateY(${ry}deg)`,
        transformStyle: 'preserve-3d',
        background: BASE_BG,
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: `0 ${8 + z * 0.2}px ${32 + z}px rgba(0,0,0,${0.10 + z * 0.001}), 0 2px 8px rgba(0,0,0,0.06)`,
        borderRadius: 20,
        overflow: 'hidden',
        transition:
          'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        ...style,
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

function DNum({
  children,
  arrived = false,
  z = 50,
  style = {},
}: {
  children: React.ReactNode;
  arrived?: boolean;
  z?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        transform: `translateZ(${arrived ? z : z - 20}px) scale(${arrived ? 1 : 0.88})`,
        transformStyle: 'preserve-3d',
        transition:
          'transform 0.65s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        opacity: arrived ? 1 : 0,
        position: 'relative',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 56,
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          color: NEUTRAL_950,
          ...style,
        }}
      >
        {children}
      </span>
    </div>
  );
}

function Cap({
  children,
  vis = false,
  delay = 0,
  z = 10,
  style = {},
}: {
  children: React.ReactNode;
  vis?: boolean;
  delay?: number;
  z?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        transform: `translateZ(${z}px) translateY(${vis ? 0 : 5}px)`,
        transformStyle: 'preserve-3d',
        opacity: vis ? 1 : 0,
        transition: `opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
      }}
    >
      <p
        style={{
          fontFamily: FONT_BODY,
          fontWeight: 400,
          fontSize: 17,
          lineHeight: 1.6,
          color: NEUTRAL_600,
          letterSpacing: '0.015em',
          margin: 0,
          ...style,
        }}
      >
        {children}
      </p>
    </div>
  );
}

function ALine({
  progress = 1,
  width = '100%',
  z = 15,
  style = {},
}: {
  progress?: number;
  width?: string;
  z?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ transform: `translateZ(${z}px)`, ...style }}>
      <svg width={width} height="3" viewBox="0 0 200 3" preserveAspectRatio="none" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="step4-amber-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={AMBER} stopOpacity="0" />
            <stop offset="15%" stopColor={AMBER} stopOpacity="0.85" />
            <stop offset="85%" stopColor={AMBER} stopOpacity="0.85" />
            <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0.5" width={200 * progress} height="2" rx="1" fill="url(#step4-amber-line)" />
      </svg>
    </div>
  );
}

function ZLayer({
  z = 0,
  children,
  style = {},
}: {
  z?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ transform: `translateZ(${z}px)`, transformStyle: 'preserve-3d', ...style }}>
      {children}
    </div>
  );
}

export default function Step4Section2Bridge({ isActive, onComplete }: StepProps) {
  const [playing, setPlaying] = useState(false);
  const [count10, setCount10] = useState(0);
  const [count47, setCount47] = useState(0);
  const [beat, setBeat] = useState(0);
  const [lineP, setLineP] = useState(0);
  const [bridgeDone, setBridgeDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const raf = useRef<number | null>(null);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) {
      setPlaying(false);
      setCount10(0);
      setCount47(0);
      setBeat(0);
      setLineP(0);
      setBridgeDone(false);
      setExiting(false);
      return;
    }
    enterTimer.current = setTimeout(() => setPlaying(true), ENTER_DELAY_MS);
    return () => {
      if (enterTimer.current) clearTimeout(enterTimer.current);
    };
  }, [isActive]);

  useEffect(() => {
    if (!playing) return;
    let start: number | null = null;
    let finished = false;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const e = ts - start;
      if (e < 1200) {
        setCount10(Math.round(easeOutCubic(Math.min(1, e / 1000)) * 10));
        if (e > 200) setBeat(1);
      } else if (e < 1600) {
        setCount10(10);
        setBeat(1);
      } else if (e < 2800) {
        setBeat(2);
        setCount47(Math.round(easeOutCubic(Math.min(1, (e - 1600) / 1000)) * 47000));
      } else if (e < 3200) {
        setCount47(47000);
        setBeat(3);
      } else {
        setBeat(4);
        setLineP(easeOutCubic(Math.min(1, (e - 3200) / 600)));
        if (e > 3900 && !finished) {
          finished = true;
          setBridgeDone(true);
        }
        if (e > 4200) return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [playing]);

  const advance = useCallback(() => {
    if (!bridgeDone || exiting) return;
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => setExiting(true), EXIT_DELAY_MS);
  }, [bridgeDone, exiting]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => onComplete(), EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [exiting, onComplete]);

  useEffect(() => {
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
      if (enterTimer.current) clearTimeout(enterTimer.current);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!isActive) return null;

  return (
    <div
      data-step-4
      onClick={advance}
      style={{
        position: 'absolute',
        inset: 0,
        background: BASE_BG,
        fontFamily: FONT_BODY,
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(0.97)' : 'scale(1)',
        transition: `opacity ${EXIT_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${EXIT_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        cursor: bridgeDone ? 'pointer' : 'default',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding:
            'calc(96px + var(--safe-top)) var(--content-margin) calc(160px + var(--safe-bottom))',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          justifyContent: 'center',
          perspective: '1200px',
          perspectiveOrigin: '50% 45%',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 880,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
          }}
        >
          <Glass z={40} rx={1.2} ry={-0.5} style={{ padding: 32 }}>
            <div
              role="group"
              aria-live="polite"
              aria-label={`${count10} trillion yen. Japan is rebuilding its chip industry.`}
            >
              <DNum arrived={beat >= 1} z={55}>
                {count10 > 0 ? `${count10}` : '0'}
              </DNum>
              <Cap vis={beat >= 1} delay={0.2} z={12} style={{ marginTop: 12 }}>
                trillion yen. Japan is rebuilding its chip industry.
              </Cap>
            </div>
          </Glass>
          <Glass z={25} rx={0.8} ry={0.4} style={{ padding: 32, opacity: beat >= 2 ? 1 : 0 }}>
            <div
              role="group"
              aria-live="polite"
              aria-label={`${count47.toLocaleString()} jobs being created. Kumamoto is set to attract waves of high-income engineers.`}
            >
              <DNum arrived={beat >= 3} z={50}>
                {count47.toLocaleString()}
              </DNum>
              <Cap vis={beat >= 3} delay={0.15} z={10} style={{ marginTop: 12 }}>
                jobs being created. Kumamoto is set to attract waves of high-income engineers.
              </Cap>
            </div>
          </Glass>
          <ZLayer z={10}>
            <div
              style={{
                opacity: beat >= 4 ? 1 : 0,
                transform: beat >= 4 ? 'translateY(0)' : 'translateY(14px)',
                transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                paddingLeft: 4,
              }}
            >
              <ALine progress={lineP} width="60%" z={5} />
              <Cap vis={beat >= 4} delay={0.3} z={5} style={{ marginTop: 16 }}>
                High-income engineers are arriving. Housing demand will follow.
              </Cap>
            </div>
          </ZLayer>
        </div>
      </div>
    </div>
  );
}
