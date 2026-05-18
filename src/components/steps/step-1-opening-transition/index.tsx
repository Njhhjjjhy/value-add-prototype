'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  sub: '#383A42',
  caption: '#5B616E',
  heading: '#25272C',
  amber: '#FBB931',
  bg: '#F9F9F9',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const HOLD_DURATION_MS = 1200;
const DECAY_DURATION_MS = 400;
const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

const RING_SIZE = 144;
const RING_RADIUS = 68;
const RING_CENTER = RING_SIZE / 2;
const RING_CIRC = 2 * Math.PI * RING_RADIUS;

export default function Step1OpeningTransition({ isActive, onComplete }: StepProps) {
  const [progress, setProgress] = useState(0);
  const [pressing, setPressing] = useState(false);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const raf = useRef<number | null>(null);
  const startT = useRef<number | null>(null);
  const prog = useRef(0);

  const startPress = useCallback(() => {
    if (done) return;
    setPressing(true);
    startT.current = performance.now() - (prog.current / 100) * HOLD_DURATION_MS;
    const tick = (now: number) => {
      if (startT.current == null) return;
      const p = Math.min((now - startT.current) / HOLD_DURATION_MS, 1);
      prog.current = p * 100;
      setProgress(p * 100);
      if (p >= 1) {
        setDone(true);
        setTimeout(() => setExiting(true), EXIT_DELAY_MS);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [done]);

  const endPress = useCallback(() => {
    setPressing(false);
    if (raf.current) cancelAnimationFrame(raf.current);
    if (done) return;
    const sp = prog.current;
    const t0 = performance.now();
    const decay = (now: number) => {
      const p = Math.max(sp - ((now - t0) / DECAY_DURATION_MS) * sp, 0);
      prog.current = p;
      setProgress(p);
      if (p > 0.1) {
        raf.current = requestAnimationFrame(decay);
      } else {
        prog.current = 0;
        setProgress(0);
      }
    };
    raf.current = requestAnimationFrame(decay);
  }, [done]);

  useEffect(() => {
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const timer = setTimeout(() => onComplete(), EXIT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [exiting, onComplete]);

  if (!isActive) return null;

  return (
    <div
      data-step-1
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-step-1] *,
          [data-step-1] *::before,
          [data-step-1] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: C.bg,
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'scale(0.97)' : 'scale(1)',
          transition:
            'opacity 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Centered: 200px favicon mark + heading underneath */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding:
              'var(--safe-top) var(--content-margin) calc(280px + var(--safe-bottom))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos-and-icons/favicon.svg"
            alt="MoreHarvest"
            width={200}
            height={200}
            style={{ display: 'block' }}
          />
          <h1
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 32,
              fontWeight: 600,
              color: C.sub,
              letterSpacing: '-0.02em',
              margin: 0,
              textAlign: 'center',
            }}
          >
            Enter MoreHarvest world
          </h1>
        </div>

        {/* Bottom cluster: chevron hold-to-confirm button + caption */}
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(96px + var(--safe-bottom))',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            onMouseDown={startPress}
            onMouseUp={endPress}
            onMouseLeave={endPress}
            onTouchStart={(e) => {
              e.preventDefault();
              startPress();
            }}
            onTouchEnd={endPress}
            onTouchCancel={endPress}
            role="button"
            aria-label="Hold to enter MoreHarvest world"
            style={{
              position: 'relative',
              width: RING_SIZE,
              height: RING_SIZE,
              transform: pressing ? 'scale(0.94)' : 'scale(1)',
              transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              touchAction: 'none',
            }}
          >
            {/* Glass circle background */}
            <div
              style={{
                position: 'absolute',
                inset: 6,
                borderRadius: '50%',
                background: C.bg,
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
              }}
            />

            {/* Chevron icon */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width={36} height={36} viewBox="0 0 20 20" fill="none">
                <path
                  d="M7.5 4L13.5 10L7.5 16"
                  stroke={C.heading}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Progress ring */}
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: RING_SIZE,
                height: RING_SIZE,
                transform: 'rotate(-90deg)',
                pointerEvents: 'none',
              }}
            >
              <circle
                cx={RING_CENTER}
                cy={RING_CENTER}
                r={RING_RADIUS}
                fill="none"
                stroke="rgba(0,0,0,0.06)"
                strokeWidth={4}
              />
              <circle
                cx={RING_CENTER}
                cy={RING_CENTER}
                r={RING_RADIUS}
                fill="none"
                stroke={C.amber}
                strokeWidth={4}
                strokeDasharray={RING_CIRC}
                strokeDashoffset={RING_CIRC - (progress / 100) * RING_CIRC}
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 17,
              fontWeight: 400,
              color: C.caption,
              opacity: 0.72,
              margin: '28px 0 0',
              letterSpacing: '0.02em',
            }}
          >
            Hold to enter
          </p>
        </div>
      </div>
    </div>
  );
}
