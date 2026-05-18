'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMapHost } from '../../shared/MapHost';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  bg: '#F9F9F9',
  heading: '#25272C',
  body: '#40444C',
  caption: '#5B616E',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const GENTLE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
const EXIT_DURATION_MS = 350;

const animate = (
  el: HTMLElement | null,
  kf: Keyframe[],
  opts: KeyframeAnimationOptions
) => {
  if (!el) return Promise.resolve();
  return el.animate(kf, { fill: 'forwards', ...opts }).finished;
};
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export default function Step7Section4Transition({
  isActive,
  onComplete,
}: StepProps) {
  const mapHost = useMapHost();
  const [phase, setPhase] = useState<'descending' | 'resolve' | 'exiting'>(
    'descending'
  );
  const completedRef = useRef(false);

  const flashRef = useRef<HTMLDivElement>(null);
  const resolveRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const tapRef = useRef<HTMLDivElement>(null);

  const handleTap = useCallback(() => {
    setPhase((p) => (p === 'resolve' ? 'exiting' : p));
  }, []);

  // Run the descent against the shared MapHost, flash to white,
  // then reveal the resolve panel ("3 to 5 million yen") and wait
  // for a tap to continue.
  useEffect(() => {
    if (!isActive || !mapHost) return;
    mapHost.setChromeless(true);

    let cancelled = false;
    (async () => {
      if (!mapHost.isReady) await wait(200);
      if (cancelled) return;
      await mapHost.runDescent();
      if (cancelled) return;

      const flash = flashRef.current;
      if (flash) {
        await animate(
          flash,
          [
            { opacity: 0 },
            { opacity: 0.7, offset: 0.35 },
            { opacity: 0.9, offset: 0.6 },
            { opacity: 0 },
          ],
          { duration: 800, easing: GENTLE }
        );
      }
      if (cancelled) return;
      await wait(500);
      if (cancelled) return;

      const res = resolveRef.current;
      const h = headingRef.current;
      const b = bodyRef.current;
      const tap = tapRef.current;

      await animate(
        res,
        [
          { opacity: 0, transform: 'translateY(30px) scale(0.97)' },
          { opacity: 0.4, transform: 'translateY(15px) scale(0.985)' },
          { opacity: 1, transform: 'translateY(0) scale(1)' },
        ],
        { duration: 700, easing: GENTLE }
      );
      if (cancelled) return;
      await wait(200);

      await animate(
        h,
        [
          { opacity: 0, transform: 'translateY(12px) scale(0.94)' },
          { opacity: 0.6, transform: 'translateY(5px) scale(0.98)' },
          { opacity: 1, transform: 'translateY(0) scale(1)' },
        ],
        { duration: 600, easing: GENTLE }
      );
      if (cancelled) return;
      await wait(150);

      await animate(
        b,
        [
          { opacity: 0, transform: 'translateY(8px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 450, easing: GENTLE }
      );
      if (cancelled) return;
      await wait(300);

      if (tap) {
        animate(
          tap,
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 400, easing: GENTLE }
        );
      }

      if (!cancelled) {
        setPhase((p) => (p === 'descending' ? 'resolve' : p));
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, mapHost]);

  useEffect(() => {
    if (phase !== 'exiting') return;
    const t = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  useEffect(() => {
    return () => {
      mapHost?.resetScene();
      mapHost?.setChromeless(false);
    };
  }, [mapHost]);

  if (!isActive) return null;

  return (
    <div
      data-step-7
      onClick={phase === 'resolve' ? handleTap : undefined}
      role={phase === 'resolve' ? 'button' : undefined}
      tabIndex={phase === 'resolve' ? 0 : undefined}
      aria-label={phase === 'resolve' ? 'Continue' : undefined}
      onKeyDown={(e) => {
        if (phase !== 'resolve') return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTap();
        }
      }}
      className="relative w-full h-full"
      style={{
        background: 'transparent',
        opacity: phase === 'exiting' ? 0 : 1,
        transform: phase === 'exiting' ? 'scale(0.97)' : 'scale(1)',
        transition: `opacity ${EXIT_DURATION_MS}ms ${GENTLE}, transform ${EXIT_DURATION_MS}ms ${GENTLE}`,
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-step-7] *,
          [data-step-7] *::before,
          [data-step-7] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>

      <div
        ref={flashRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          opacity: 0,
          background: C.bg,
          pointerEvents: 'none',
        }}
      />

      <div
        ref={resolveRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 12,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding:
            'var(--safe-top) var(--content-margin) var(--safe-bottom)',
          opacity: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: C.bg,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: 1080,
            margin: '0 auto',
          }}
        >
          <div
            style={{
              background: '#F9F9F9',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 28,
              position: 'relative',
              overflow: 'hidden',
              boxShadow:
                '0 8px 32px rgba(0,0,0,0.10),0 2px 8px rgba(0,0,0,0.06)',
              padding: '56px 64px',
            }}
          >
            <div
              ref={headingRef}
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: 72,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: C.heading,
                marginBottom: 28,
                opacity: 0,
              }}
            >
              3 to 5 million yen
            </div>
            <div
              ref={bodyRef}
              style={{
                fontFamily: FONT_BODY,
                fontWeight: 400,
                fontSize: 22,
                lineHeight: 1.5,
                color: C.body,
                maxWidth: '60ch',
                opacity: 0,
              }}
            >
              Estimated replacement cost per engineer who repatriates early
              due to family maladjustment.
            </div>
          </div>
        </div>
      </div>

      <div
        ref={tapRef}
        style={{
          position: 'absolute',
          bottom: 'calc(96px + var(--safe-bottom))',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 20,
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 17,
            color: C.caption,
            letterSpacing: '0.02em',
            opacity: 0.72,
          }}
        >
          Tap to continue
        </div>
      </div>
    </div>
  );
}
