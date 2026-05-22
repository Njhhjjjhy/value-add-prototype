'use client';

import { useEffect, useRef, useState } from 'react';
import { step23 } from '@/content';

const COPY = step23.prototype;

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  bg: '#F9F9F9',
  n950: '#25272C',
  n600: '#5B616E',
  amber: '#FBB931',
};

const F = {
  h: '"REM", system-ui, sans-serif',
  b: '"Noto Sans JP", system-ui, sans-serif',
};

const PANEL_LEVEL_1 = {
  background: C.bg,
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
  borderRadius: 20,
} as const;

const PANEL_LEVEL_2 = {
  background: C.bg,
  border: '1px solid rgba(0,0,0,0.08)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
  borderRadius: 28,
} as const;

const RISK_GHOST = COPY.riskGhosts;

const LABEL_FADE_MS = 300;
const PRE_CARDS_DELAY_MS = 200;
const CARD_DURATION_MS = 600;
const CARD_STAGGER_MS = 100;
const POST_CARDS_HOLD_MS = 800;
const PRE_RESOLVE_DELAY_MS = 0;
const RESOLVE_DURATION_MS = 650;
const TAP_PROMPT_DELAY_MS = 400;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Step19Section10Transition({
  isActive,
  onComplete,
}: StepProps) {
  const labelRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const resolveRef = useRef<HTMLDivElement | null>(null);

  const [resolveVisible, setResolveVisible] = useState(false);
  const [tapVisible, setTapVisible] = useState(false);
  const running = useRef(false);
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (!isActive) return;
    cancelledRef.current = false;

    const label = labelRef.current;
    const cards = cardRefs.current;

    const run = async () => {
      if (running.current) return;
      running.current = true;

      if (reducedMotion()) {
        if (label) label.style.opacity = '0';
        cards.forEach((c) => {
          if (c) c.style.opacity = '0';
        });
        setResolveVisible(true);
        await wait(30);
        if (cancelledRef.current) return;
        if (resolveRef.current) resolveRef.current.style.opacity = '1';
        setTapVisible(true);
        return;
      }

      if (label) {
        label.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          {
            duration: LABEL_FADE_MS,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards',
          }
        );
      }
      await wait(PRE_CARDS_DELAY_MS);
      if (cancelledRef.current) return;

      // Cards rise upward in reverse order (5 → 0), last in first out
      for (let i = RISK_GHOST.length - 1; i >= 0; i--) {
        const card = cards[i];
        if (!card) continue;
        card.animate(
          [
            { opacity: 1, transform: 'translateY(0)' },
            { opacity: 0.6, transform: 'translateY(-48px)', offset: 0.4 },
            { opacity: 0.2, transform: 'translateY(-128px)', offset: 0.75 },
            { opacity: 0, transform: 'translateY(-220px)' },
          ],
          {
            duration: CARD_DURATION_MS,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards',
          }
        );
        await wait(CARD_STAGGER_MS);
      }

      await wait(POST_CARDS_HOLD_MS);
      if (cancelledRef.current) return;

      await wait(PRE_RESOLVE_DELAY_MS);
      if (cancelledRef.current) return;

      setResolveVisible(true);
      await wait(30);
      if (cancelledRef.current) return;

      if (resolveRef.current) {
        resolveRef.current.animate(
          [
            { opacity: 0, transform: 'translateY(40px) scale(0.97)' },
            {
              opacity: 0.6,
              transform: 'translateY(12px) scale(0.99)',
              offset: 0.5,
            },
            { opacity: 1, transform: 'translateY(0) scale(1)' },
          ],
          {
            duration: RESOLVE_DURATION_MS,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards',
          }
        );
        await wait(RESOLVE_DURATION_MS);
      }
      if (cancelledRef.current) return;

      await wait(TAP_PROMPT_DELAY_MS);
      if (cancelledRef.current) return;
      setTapVisible(true);
    };

    run();

    return () => {
      cancelledRef.current = true;
      running.current = false;
      const nodes: Array<HTMLElement | null> = [
        label,
        resolveRef.current,
        ...cards,
      ];
      nodes.forEach((node) => {
        node?.getAnimations().forEach((a) => a.cancel());
      });
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      data-step-19
      onClick={tapVisible ? onComplete : undefined}
      role="button"
      tabIndex={0}
      aria-label={COPY.continueAriaLabel}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && tapVisible) {
          e.preventDefault();
          onComplete();
        }
      }}
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        overflow: 'hidden',
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-step-19] *,
          [data-step-19] *::before,
          [data-step-19] *::after {
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
          top: 'calc(96px + var(--safe-top))',
          bottom: 'calc(120px + var(--safe-bottom))',
          left: 'var(--content-margin)',
          right: 'var(--content-margin)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 3,
        }}
      >
        <div style={{ width: '100%', maxWidth: 880 }}>
          <div
            ref={labelRef}
            style={{
              fontFamily: F.b,
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: '0.01em',
              color: C.n600,
              marginBottom: 24,
            }}
          >
            {COPY.sectionGhostCaption}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {RISK_GHOST.map((q, i) => (
              <div
                key={q}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                style={{
                  ...PANEL_LEVEL_1,
                  padding: '20px 24px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div
                    style={{
                      flex: 1,
                      fontFamily: F.b,
                      fontWeight: 500,
                      fontSize: 17,
                      lineHeight: 1.45,
                      color: C.n950,
                    }}
                  >
                    {q}
                  </div>
                  <div
                    aria-hidden
                    style={{ fontSize: 18, color: C.n600, flexShrink: 0 }}
                  >
                    &#9662;
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {resolveVisible && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 'var(--content-margin)',
            right: 'var(--content-margin)',
            transform: 'translateY(-50%)',
            display: 'flex',
            justifyContent: 'center',
            zIndex: 6,
          }}
        >
          <div
            ref={resolveRef}
            style={{
              ...PANEL_LEVEL_2,
              padding: '48px 56px',
              opacity: 0,
              width: '100%',
              maxWidth: 720,
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'relative', zIndex: 4 }}>
              <div
                style={{
                  fontFamily: F.b,
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: '0.18em',
                  color: C.n600,
                  marginBottom: 16,
                }}
              >
                {COPY.resolve.sectionLabel}
              </div>
              <div
                style={{
                  fontFamily: F.h,
                  fontWeight: 600,
                  fontSize: 48,
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  color: C.n950,
                }}
              >
                {COPY.resolve.headline}
              </div>
              <div
                style={{
                  width: 64,
                  height: 3,
                  background: C.amber,
                  borderRadius: 2,
                  marginTop: 28,
                  boxShadow: '0 0 12px rgba(251,185,49,0.4)',
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div
        aria-live="polite"
        style={{
          position: 'absolute',
          bottom: 'calc(48px + var(--safe-bottom))',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 10,
          opacity: tapVisible ? 1 : 0,
          transform: tapVisible ? 'translateY(0)' : 'translateY(8px)',
          transition:
            'opacity 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: F.b,
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: '0.01em',
            color: C.n600,
          }}
        >
          {COPY.continuePrompt}
        </span>
      </div>
    </div>
  );
}
