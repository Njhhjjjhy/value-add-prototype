'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import NextButton from '@/components/shared/NextButton';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  heading: '#25272C',
  sub: '#383A42',
  body: '#40444C',
  caption: '#5B616E',
  disabled: '#8E8F8F',
  amber: '#FBB931',
  amber50: '#FFFBEC',
  hairline: '#EDEEF1',
  bg: '#F9F9F9',
};

const EASE = {
  gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  settle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function reducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

const GHOST_ROWS: Array<{ label: string; value: string; highlight?: boolean }> = [
  { label: 'Post-tax IRR', value: '18.4%', highlight: true },
  { label: 'Equity multiple', value: '2.1x' },
  { label: 'Cash-on-cash (yr 3)', value: '8.7%' },
  { label: 'Payback period', value: '5.2 yrs' },
  { label: 'Exit cap rate', value: '4.8%' },
  { label: 'Net operating income', value: '48.2M JPY' },
];

function GhostFinancials({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        position: 'absolute',
        top: 'calc(96px + var(--safe-top))',
        bottom: 'calc(96px + var(--safe-bottom))',
        left: 'var(--content-margin)',
        right: 'var(--content-margin)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3,
      }}
    >
      <div style={{ width: '100%', maxWidth: 880 }}>
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 32,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: C.heading,
              marginBottom: 8,
            }}
          >
            Financial projections
          </div>
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 15,
              lineHeight: 1.6,
              fontWeight: 500,
              color: C.caption,
            }}
          >
            Base scenario, 7-year hold
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            background: C.bg,
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: 20,
            boxShadow:
              '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
            overflow: 'hidden',
          }}
        >
          {GHOST_ROWS.map((row, i) => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 32px',
                borderBottom:
                  i < GHOST_ROWS.length - 1
                    ? `1px solid ${C.hairline}`
                    : 'none',
                background: row.highlight ? C.amber50 : 'transparent',
              }}
            >
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 15,
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  color: C.caption,
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 600,
                  fontSize: row.highlight ? 32 : 22,
                  color: C.heading,
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: row.highlight ? '-0.02em' : '-0.01em',
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResolvePanel({
  panelRef,
}: {
  panelRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      ref={panelRef}
      style={{
        position: 'relative',
        background: C.bg,
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 28,
        boxShadow:
          '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        padding: '48px 56px',
        opacity: 0,
        transform: 'scale(0.95) translateY(12px)',
      }}
    >
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 13,
          fontWeight: 500,
          color: C.caption,
          letterSpacing: '0.18em',
          marginBottom: 20,
        }}
      >
        SECTION 9
      </div>
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontSize: 32,
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: C.heading,
          marginBottom: 16,
        }}
      >
        Every investment carries risk.
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 18,
          lineHeight: 1.6,
          color: C.body,
        }}
      >
        Here is how this one is structured to mitigate them.
      </div>
      <div
        style={{
          width: 72,
          height: 3,
          background: C.amber,
          borderRadius: 2,
          marginTop: 32,
          boxShadow: '0 0 12px rgba(251,185,49,0.4)',
        }}
      />
    </div>
  );
}

export default function Step17Section9Transition({
  isActive,
  onComplete,
}: StepProps) {
  const ghostRef = useRef<HTMLDivElement>(null);
  const resolveRef = useRef<HTMLDivElement>(null);

  const [showNext, setShowNext] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const ghost = ghostRef.current;
    const resolve = resolveRef.current;

    let cancelled = false;

    const run = async () => {
      if (reducedMotion()) {
        if (ghost) ghost.style.opacity = '0';
        if (resolve) {
          resolve.style.opacity = '1';
          resolve.style.transform = 'scale(1) translateY(0)';
        }
        if (!cancelled) setShowNext(true);
        return;
      }

      if (ghost) {
        try {
          await ghost.animate(
            [
              { opacity: 1, transform: 'scale(1) translateY(0)' },
              {
                opacity: 0.5,
                transform: 'scale(0.94) translateY(-12px)',
                offset: 0.5,
              },
              {
                opacity: 0.15,
                transform: 'scale(0.88) translateY(-22px)',
                offset: 0.8,
              },
              { opacity: 0, transform: 'scale(0.85) translateY(-28px)' },
            ],
            { duration: 1100, easing: EASE.gentle, fill: 'forwards' }
          ).finished;
        } catch {
          /* cancelled */
        }
      }
      if (cancelled) return;

      await wait(500);
      if (cancelled) return;

      if (resolve) {
        try {
          await resolve.animate(
            [
              { opacity: 0, transform: 'scale(0.95) translateY(12px)' },
              {
                opacity: 0.6,
                transform: 'scale(0.98) translateY(4px)',
                offset: 0.5,
              },
              { opacity: 1, transform: 'scale(1) translateY(0)' },
            ],
            { duration: 700, easing: EASE.settle, fill: 'forwards' }
          ).finished;
        } catch {
          /* cancelled */
        }
      }
      if (cancelled) return;

      await wait(400);
      if (cancelled) return;
      setShowNext(true);
    };

    run();

    return () => {
      cancelled = true;
      [ghost, resolve].forEach((node) => {
        node?.getAnimations().forEach((a) => a.cancel());
      });
    };
  }, [isActive]);

  const advance = useCallback(() => {
    if (exiting) return;
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => setExiting(true), EXIT_DELAY_MS);
  }, [exiting]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => onComplete(), EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [exiting, onComplete]);

  useEffect(
    () => () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    },
    []
  );

  if (!isActive) return null;

  return (
    <div
      data-step-17
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(0.97)' : 'scale(1)',
        transition: `opacity ${EXIT_DURATION_MS}ms ${EASE.smooth}, transform ${EXIT_DURATION_MS}ms ${EASE.smooth}`,
        overflow: 'hidden',
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-step-17] *,
          [data-step-17] *::before,
          [data-step-17] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>

      <GhostFinancials containerRef={ghostRef} />

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 'var(--content-margin)',
          right: 'var(--content-margin)',
          transform: 'translateY(-50%)',
          zIndex: 6,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{ width: '100%', maxWidth: 880 }}>
          <ResolvePanel panelRef={resolveRef} />
        </div>
      </div>

      <NextButton onClick={advance} visible={showNext && !exiting} />
    </div>
  );
}
