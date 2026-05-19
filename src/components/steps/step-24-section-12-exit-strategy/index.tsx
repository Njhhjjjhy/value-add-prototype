'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

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
  amber: '#FBB931',
  bg: '#F9F9F9',
};

const EXIT_PATHS = [
  {
    id: 'reit',
    name: 'CapitaLand REIT injection',
    stat: '2 to 3%',
    statLabel: 'ROFR discount',
    body: 'Contractual right of first refusal. Pre-negotiated exit pipeline.',
  },
  {
    id: 'market',
    name: 'Open market sale',
    stat: 'Master lease',
    statLabel: 'in place at sale',
    body: 'De-risked acquisition. Premium valuation from stable industrial demand.',
  },
];

const EASE_SETTLE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
const EASE_SMOOTH = 'cubic-bezier(0.4, 0, 0.2, 1)';

const ENTER_DELAY_MS = 80;

// Sequential reveal schedule (mirrors playground timings)
const T_HEAD = 0;
const T_SUB = T_HEAD + 550 + 120;
const T_GUIDE = T_SUB + 400 + 250;
const T_CARD_0 = T_GUIDE + 450 + 350;
const T_CARD_1 = T_CARD_0 + 650 + 250;
const T_TAP = T_CARD_1 + 650 + 350;
const REVEAL_TOTAL_MS = T_TAP + 400;

export default function Step20Section10ExitStrategy({
  isActive,
  onComplete,
}: StepProps) {
  const [mounted, setMounted] = useState(false);
  const [beat, setBeat] = useState<0 | 1 | 2>(0);
  const [revealDone, setRevealDone] = useState(false);
  const mountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ctaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLandscape, setIsLandscape] = useState(true);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setMounted(false);
      setBeat(0);
      setRevealDone(false);
      setCtaVisible(false);
      return;
    }
    mountTimer.current = setTimeout(() => {
      setMounted(true);
      setBeat(1);
      revealTimer.current = setTimeout(() => setRevealDone(true), REVEAL_TOTAL_MS);
    }, ENTER_DELAY_MS);
    return () => {
      if (mountTimer.current) clearTimeout(mountTimer.current);
      if (revealTimer.current) clearTimeout(revealTimer.current);
    };
  }, [isActive]);

  useEffect(() => {
    const update = () =>
      setIsLandscape(window.matchMedia('(orientation: landscape)').matches);
    update();
    const mq = window.matchMedia('(orientation: landscape)');
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (beat !== 2) return;
    ctaTimer.current = setTimeout(() => setCtaVisible(true), 200);
    return () => {
      if (ctaTimer.current) clearTimeout(ctaTimer.current);
    };
  }, [beat]);

  const handleTap = useCallback(() => {
    if (beat !== 1) return;
    if (!revealDone) return;
    setBeat(2);
  }, [beat, revealDone]);

  const handleCtaClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onComplete();
    },
    [onComplete]
  );

  if (!isActive) return null;

  const showReveal = beat <= 1;

  return (
    <div
      data-step-20
      onClick={handleTap}
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        fontFamily: 'var(--font-body)',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-step-20] *,
          [data-step-20] *::before,
          [data-step-20] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
        .step-20-cta { transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1); }
        .step-20-cta:active { transform: scale(0.98); }
      `}</style>

      {/* Beat 1: reveal */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(96px + var(--safe-top))',
          bottom: 'calc(96px + var(--safe-bottom))',
          left: 'var(--content-margin)',
          right: 'var(--content-margin)',
          display: showReveal ? 'flex' : 'none',
          flexDirection: 'column',
          maxWidth: 1120,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
        }}
      >
        <div
          style={{
            marginBottom: 12,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: `opacity 550ms ${EASE_SETTLE} ${T_HEAD}ms, transform 550ms ${EASE_SETTLE} ${T_HEAD}ms`,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: 48,
              color: C.heading,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
            }}
          >
            Exit strategy
          </span>
        </div>

        <div
          style={{
            marginBottom: 32,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity 400ms ${EASE_SETTLE} ${T_SUB}ms, transform 400ms ${EASE_SETTLE} ${T_SUB}ms`,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              color: C.body,
              lineHeight: 1.6,
            }}
          >
            Two structured paths to liquidity, plus built-in asset flexibility.
          </span>
        </div>

        <div
          style={{
            marginBottom: 40,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(8px)',
            transition: `opacity 450ms ${EASE_SETTLE} ${T_GUIDE}ms, transform 450ms ${EASE_SETTLE} ${T_GUIDE}ms`,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              color: C.body,
              fontStyle: 'italic',
              lineHeight: 1.6,
            }}
          >
            Two doors. One is already unlocked.
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isLandscape ? '1fr 1fr' : '1fr',
            gap: isLandscape ? 32 : 20,
          }}
        >
          {EXIT_PATHS.map((ep, i) => {
            const delay = i === 0 ? T_CARD_0 : T_CARD_1;
            return (
              <div
                key={ep.id}
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted
                    ? 'translateY(0) scale(1)'
                    : 'translateY(30px) scale(0.96)',
                  transition: `opacity 650ms ${EASE_SETTLE} ${delay}ms, transform 650ms ${EASE_SETTLE} ${delay}ms`,
                }}
              >
                <div
                  style={{
                    background: C.bg,
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow:
                      '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
                    borderRadius: 20,
                    padding: '32px 32px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                        fontSize: 22,
                        color: C.heading,
                        marginBottom: 20,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {ep.name}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        background: '#EDEEF1',
                        borderRadius: 12,
                        padding: '16px 20px',
                        marginBottom: 20,
                        gap: 16,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 600,
                          fontSize: 32,
                          color: C.heading,
                          lineHeight: 1.15,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {ep.stat}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 15,
                          color: C.caption,
                          textAlign: 'right',
                        }}
                      >
                        {ep.statLabel}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 17,
                        color: C.body,
                        lineHeight: 1.6,
                      }}
                    >
                      {ep.body}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          aria-live="polite"
          style={{
            position: 'absolute',
            bottom: 'calc(48px + var(--safe-bottom))',
            left: 0,
            right: 0,
            textAlign: 'center',
            opacity: revealDone ? 1 : 0,
            transition: `opacity 400ms ${EASE_SMOOTH}`,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: C.caption,
              letterSpacing: 0.3,
            }}
          >
            Tap to continue
          </span>
        </div>
      </div>

      {/* Beat 2: CTA */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: beat === 2 ? 'block' : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            paddingLeft: 'var(--content-margin)',
            paddingRight: 'var(--content-margin)',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 480,
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible
                ? 'translateY(0) scale(1)'
                : 'translateY(10px) scale(0.96)',
              transition: `opacity 550ms ${EASE_SETTLE}, transform 550ms ${EASE_SETTLE}`,
            }}
          >
            <button
              type="button"
              className="step-20-cta"
              onClick={handleCtaClick}
              style={{
                background: C.amber,
                border: 'none',
                borderRadius: 12,
                padding: '22px 0',
                width: '100%',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: 22,
                color: C.heading,
                minHeight: 72,
                cursor: 'pointer',
              }}
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
