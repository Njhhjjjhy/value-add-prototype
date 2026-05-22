'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import NextButton from '@/components/shared/NextButton';
import { step21 } from '@/content';

const COPY = step21.prototype;

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  heading: '#25272C',
  body: '#40444C',
  caption: '#5B616E',
  amber: '#FBB931',
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
        {COPY.resolve.sectionLabel}
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
        {COPY.resolve.headline}
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 18,
          lineHeight: 1.6,
          color: C.body,
        }}
      >
        {COPY.resolve.body}
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
  const resolveRef = useRef<HTMLDivElement>(null);

  const [showNext, setShowNext] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const resolve = resolveRef.current;

    let cancelled = false;

    const run = async () => {
      if (reducedMotion()) {
        if (resolve) {
          resolve.style.opacity = '1';
          resolve.style.transform = 'scale(1) translateY(0)';
        }
        if (!cancelled) setShowNext(true);
        return;
      }

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
      resolve?.getAnimations().forEach((a) => a.cancel());
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
