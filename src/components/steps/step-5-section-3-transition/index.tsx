'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { step5 } from '@/content';

const COPY = step5.prototype;

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  bg: '#F9F9F9',
  n100: '#EDEEF1',
  n600: '#5B616E',
  n800: '#40444C',
  n950: '#25272C',
  amber: '#FBB931',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const GENTLE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
const SETTLE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

// Shutter timings, slowed 25% per QA round 1 (original × 1.25).
const GHOST_FADE_MS = 750;
const PRE_BANDS_WAIT_MS = 250;
const BANDS_CLOSE_MS = 938;
const SEAM_FLASH_MS = 625;
const HANDOFF_DELAY_MS = 150;

function GlassPanel({
  level = 1,
  borderRadius = 20,
  children,
  style = {},
}: {
  level?: 1 | 2;
  borderRadius?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const isL2 = level === 2;
  return (
    <div
      style={{
        position: 'relative',
        borderRadius,
        background: '#F9F9F9',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: isL2
          ? '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)'
          : '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

function GhostBridge() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding:
          'calc(96px + var(--safe-top)) var(--content-margin) calc(64px + var(--safe-bottom))',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <GlassPanel
          level={2}
          style={{
            padding: '40px 44px',
            flex: '1 1 520px',
            minWidth: 360,
          }}
        >
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 500,
              color: C.n600,
              margin: '0 0 16px',
              letterSpacing: '0.18em',
            }}
          >
            {COPY.ghost.caption}
          </p>
          <p
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 96,
              color: C.n950,
              margin: '0 0 8px',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            {COPY.ghost.stats[0].value}
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 17,
              fontWeight: 500,
              color: C.n600,
              margin: 0,
            }}
          >
            {COPY.ghost.stats[0].label}
          </p>
        </GlassPanel>
        <GlassPanel
          level={1}
          style={{
            padding: '32px 36px',
            flex: '1 1 360px',
            minWidth: 280,
            alignSelf: 'flex-start',
          }}
        >
          <p
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 56,
              color: C.n950,
              margin: '0 0 8px',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            {COPY.ghost.stats[1].value}
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 15,
              fontWeight: 500,
              color: C.n600,
              margin: 0,
            }}
          >
            {COPY.ghost.stats[1].label}
          </p>
        </GlassPanel>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          maxWidth: 880,
        }}
      >
        {COPY.ghost.body.map((t, i) => (
          <GlassPanel
            key={i}
            level={1}
            borderRadius={12}
            style={{
              padding: '20px 28px',
              opacity: 0.78 - i * 0.08,
            }}
          >
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 17,
                fontWeight: 500,
                color: C.n800,
                margin: 0,
              }}
            >
              {t}
            </p>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}

function ReadyPrompt() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 'calc(64px + var(--safe-bottom))',
        left: 'var(--content-margin)',
        right: 'var(--content-margin)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: C.amber,
        }}
      />
      <span
        style={{
          fontFamily: FONT_BODY,
          fontWeight: 500,
          fontSize: 15,
          color: C.n600,
        }}
      >
        {COPY.continuePrompt}
      </span>
    </div>
  );
}

const animateEl = (
  el: HTMLElement | null,
  kf: Keyframe[] | PropertyIndexedKeyframes,
  opts: KeyframeAnimationOptions,
) => {
  if (!el) return Promise.resolve();
  return el.animate(kf, opts).finished;
};
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export default function Step5Section3Transition({ isActive, onComplete }: StepProps) {
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const topBandRef = useRef<HTMLDivElement | null>(null);
  const botBandRef = useRef<HTMLDivElement | null>(null);
  const seamRef = useRef<HTMLDivElement | null>(null);
  const completed = useRef(false);
  const [phase, setPhase] = useState<'ready' | 'closing'>('ready');

  useEffect(() => {
    completed.current = false;
    setPhase('ready');
  }, [isActive]);

  const startShutter = useCallback(async () => {
    if (phase !== 'ready') return;
    setPhase('closing');

    await animateEl(
      ghostRef.current,
      [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0.6, transform: 'scale(0.99)' },
        { opacity: 0.3, transform: 'scale(0.98)' },
        { opacity: 0, transform: 'scale(0.96)' },
      ],
      { duration: GHOST_FADE_MS, easing: GENTLE, fill: 'forwards' },
    );

    await wait(PRE_BANDS_WAIT_MS);

    animateEl(
      topBandRef.current,
      [{ transform: 'translateY(-100%)' }, { transform: 'translateY(0%)' }],
      { duration: BANDS_CLOSE_MS, easing: SETTLE, fill: 'forwards' },
    );
    await animateEl(
      botBandRef.current,
      [{ transform: 'translateY(100%)' }, { transform: 'translateY(0%)' }],
      { duration: BANDS_CLOSE_MS, easing: SETTLE, fill: 'forwards' },
    );

    await animateEl(
      seamRef.current,
      [
        { opacity: 0 },
        { opacity: 0.6 },
        { opacity: 0.8 },
        { opacity: 0.6 },
        { opacity: 0 },
      ],
      { duration: SEAM_FLASH_MS, easing: 'ease-in-out', fill: 'forwards' },
    );

    await wait(HANDOFF_DELAY_MS);

    if (!completed.current) {
      completed.current = true;
      onComplete();
    }
  }, [phase, onComplete]);

  if (!isActive) return null;

  return (
    <div
      data-step-5
      onClick={phase === 'ready' ? startShutter : undefined}
      role="button"
      tabIndex={0}
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        overflow: 'hidden',
        fontFamily: FONT_BODY,
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-step-5] *,
          [data-step-5] *::before,
          [data-step-5] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>

      <div ref={ghostRef} style={{ position: 'absolute', inset: 0 }}>
        <GhostBridge />
      </div>

      <div
        ref={topBandRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: C.n100,
          transform: 'translateY(-100%)',
          zIndex: 20,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      />

      <div
        ref={botBandRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: C.n100,
          transform: 'translateY(100%)',
          zIndex: 20,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
        }}
      />

      <div
        ref={seamRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 3,
          transform: 'translateY(-50%)',
          background: C.amber,
          opacity: 0,
          zIndex: 25,
        }}
      />

      {phase === 'ready' && <ReadyPrompt />}
    </div>
  );
}
