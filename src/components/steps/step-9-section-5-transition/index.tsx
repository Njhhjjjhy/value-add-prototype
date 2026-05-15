'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  heading: '#25272C',
  disabled: '#8E8F8F',
  amber: '#FBB931',
  bg: '#F9F9F9',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

export default function Step9Section5Transition({ isActive, onComplete }: StepProps) {
  const [beat, setBeat] = useState(0);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) return;
    const t1 = setTimeout(() => setBeat(1), 300);
    const t2 = setTimeout(() => setBeat(2), 900);
    const t3 = setTimeout(() => setBeat(3), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isActive]);

  const advance = useCallback(() => {
    if (exiting) return;
    if (beat < 3) return;
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => setExiting(true), EXIT_DELAY_MS);
  }, [exiting, beat]);

  useEffect(() => {
    if (!exiting) return;
    const timer = setTimeout(() => onComplete(), EXIT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [exiting, onComplete]);

  useEffect(() => {
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      advance();
    }
  };

  if (!isActive) return null;

  return (
    <div
      data-step-9
      role="button"
      tabIndex={0}
      aria-label="Tap to continue"
      onClick={advance}
      onKeyDown={handleKeyDown}
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation',
        outline: 'none',
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-step-9] *,
          [data-step-9] *::before,
          [data-step-9] *::after {
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
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'scale(0.97)' : 'scale(1)',
          transition:
            'opacity 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 'calc(110px + var(--safe-top))',
            bottom: 'calc(160px + var(--safe-bottom))',
            left: 'var(--content-margin)',
            right: 'var(--content-margin)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h1
            aria-live="polite"
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 72,
              lineHeight: 1.05,
              color: C.heading,
              letterSpacing: '-0.03em',
              margin: 0,
              maxWidth: 1080,
              opacity: beat >= 1 ? 1 : 0,
              transform: beat >= 1 ? 'translateY(0)' : 'translateY(24px)',
              transition:
                'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            So what does a real solution look like?
          </h1>
        </div>

        <div
          aria-live="polite"
          style={{
            position: 'absolute',
            bottom: 'calc(72px + var(--safe-bottom))',
            left: 'var(--content-margin)',
            right: 'var(--content-margin)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            opacity: beat >= 3 ? 1 : 0,
            transition: 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: C.amber,
            }}
          />
          <span
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: '0.015em',
              color: C.disabled,
            }}
          >
            Tap to continue
          </span>
        </div>
      </div>
    </div>
  );
}
