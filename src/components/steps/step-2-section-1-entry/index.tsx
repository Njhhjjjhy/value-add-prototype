'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { step2 } from '@/content';

const COPY = step2.prototype;

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const AMBER = '#FBB931';
const N = {
  950: '#25272C',
  900: '#383A42',
  800: '#40444C',
  600: '#5B616E',
};

const HOLD_DURATION = 800;
const RING_SIZE = 72;
const RING_R = 33;
const RING_C = RING_SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * RING_R;

const ENTER_DELAY_MS = 80;
const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

function Logo({ id, size }: { id: string; size: number }) {
  const h = size * (24 / 56);
  return (
    <svg width={size} height={h} viewBox="0 0 56 24" fill="none">
      <path
        d="M11.4499 0.0119694C15.6113 -0.0472805 18.8225 1.72909 21.2495 5.09096C24.5588 9.67532 27.9048 14.2327 31.2296 18.8058C32.4795 20.5248 32.5275 21.4623 31.4681 22.8832C30.431 24.2744 28.131 24.409 27.0638 23.0429C25.3525 20.8525 23.7371 18.5861 22.0689 16.3612C19.9435 13.5269 17.8404 10.6743 15.6611 7.88283C14.2228 6.04046 12.2237 5.62871 10.0574 6.14771C8.0471 6.62921 6.79123 7.98483 6.03273 9.92507C5.13493 12.2227 6.2764 15.1016 8.03892 16.4186C10.0269 17.9039 12.7964 17.9332 14.8814 16.4992C15.9014 15.7976 16.5373 14.7911 16.9745 13.6657C17.2078 13.0653 17.3827 12.9502 17.7846 13.5153C18.6887 14.7862 19.5828 16.0661 20.5326 17.3017C21.0003 17.9103 21.0081 18.4106 20.5542 19.0181C18.1052 22.2963 14.8907 23.9403 10.7865 23.7367C4.09413 23.4037 -0.687161 17.2882 0.0809956 10.2449C0.601025 5.47683 4.73117 1.07584 8.72833 0.275594C9.62613 0.0959692 10.5295 -0.0424055 11.4499 0.0119694V0.0119694Z"
        fill={`url(#p0_${id})`}
      />
      <path
        d="M38.6392 10.6906C37.536 9.15947 36.4132 7.61222 35.3059 6.05372C35.1116 5.78035 35.3036 5.52947 35.4622 5.29923C37.4294 2.44923 40.0638 0.693108 43.5472 0.412984C48.5926 0.00685967 52.3175 2.17098 54.645 6.60572C57.5427 12.1272 55.6505 19.0474 50.3146 22.3118C45.3844 25.3279 38.5382 23.9134 34.9136 18.7992C31.6426 14.1841 28.281 9.63422 24.9699 5.0476C23.7738 3.39085 23.7233 2.53998 24.6742 1.21773C25.6582 -0.15064 28.0515 -0.25039 29.0618 1.09736C32.1433 5.20735 35.187 9.34584 38.2496 13.4705C38.8513 14.2808 39.4583 15.0875 40.082 15.8802C42.2 18.5731 45.8651 18.9582 48.3185 16.7543C51.0208 14.327 51.2043 10.5335 48.7404 8.0431C45.6819 4.95198 40.6306 6.01285 39.0374 10.0778C38.9631 10.2676 38.9981 10.5185 38.6392 10.691V10.6906Z"
        fill={`url(#p1_${id})`}
      />
      <defs>
        <linearGradient
          id={`p0_${id}`}
          x1="32.2182"
          y1="-2.02546e-06"
          x2="-2.35867"
          y2="4.09781"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FBB931" />
          <stop offset="1" stopColor="#FF8660" />
        </linearGradient>
        <linearGradient
          id={`p1_${id}`}
          x1="55.9996"
          y1="0.137327"
          x2="21.6733"
          y2="4.21983"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FBB931" />
          <stop offset="1" stopColor="#FF8660" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Step2Section1Entry({ isActive, onComplete }: StepProps) {
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const holdStart = useRef<number | null>(null);
  const holdRaf = useRef<number | null>(null);
  const holdConfirmed = useRef(false);
  const mountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitDelayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) {
      setMounted(false);
      setExiting(false);
      setHoldProgress(0);
      setHolding(false);
      holdStart.current = null;
      holdConfirmed.current = false;
      return;
    }
    mountTimer.current = setTimeout(() => setMounted(true), ENTER_DELAY_MS);
    return () => {
      if (mountTimer.current) clearTimeout(mountTimer.current);
    };
  }, [isActive]);

  const triggerAdvance = useCallback(() => {
    if (exiting) return;
    if (exitDelayTimer.current) clearTimeout(exitDelayTimer.current);
    exitDelayTimer.current = setTimeout(() => setExiting(true), EXIT_DELAY_MS);
  }, [exiting]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => onComplete(), EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [exiting, onComplete]);

  useEffect(() => {
    return () => {
      if (holdRaf.current) cancelAnimationFrame(holdRaf.current);
      if (exitDelayTimer.current) clearTimeout(exitDelayTimer.current);
    };
  }, []);

  const animateHold = useCallback(() => {
    if (!holdStart.current) return;
    const elapsed = Date.now() - holdStart.current;
    const p = Math.min(elapsed / HOLD_DURATION, 1);
    setHoldProgress(p);
    if (p >= 1 && !holdConfirmed.current) {
      holdConfirmed.current = true;
      triggerAdvance();
      return;
    }
    if (p < 1) holdRaf.current = requestAnimationFrame(animateHold);
  }, [triggerAdvance]);

  const onHoldStart = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      if (exiting || holdConfirmed.current) return;
      holdConfirmed.current = false;
      holdStart.current = Date.now();
      setHolding(true);
      holdRaf.current = requestAnimationFrame(animateHold);
    },
    [exiting, animateHold],
  );

  const onHoldEnd = useCallback(() => {
    holdStart.current = null;
    setHolding(false);
    if (holdRaf.current) cancelAnimationFrame(holdRaf.current);
    if (!holdConfirmed.current) setHoldProgress(0);
  }, []);

  if (!isActive) return null;

  const dashOffset = CIRCUMFERENCE * (1 - holdProgress);

  return (
    <div
      data-step-2
      style={{
        position: 'absolute',
        inset: 0,
        background: '#F9F9F9',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(0.97)' : 'scale(1)',
        transition: `opacity ${EXIT_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${EXIT_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <style>{`
        [data-step-2] .entry-h1 {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 72px;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: ${N[950]};
          margin: 0 0 16px 0;
        }
        [data-step-2] .entry-sub {
          font-family: var(--font-body);
          font-size: 22px;
          font-weight: 400;
          color: ${N[900]};
          line-height: 1.5;
          margin: 0;
        }
        [data-step-2] .fact-chip {
          display: inline-block;
          padding: 10px 22px;
          border-radius: 9999px;
          background: #F9F9F9;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          color: ${N[600]};
          letter-spacing: 0.01em;
          line-height: 1.4;
        }
        [data-step-2] .fact-chip.bold {
          font-weight: 600;
          color: ${N[950]};
        }
        @keyframes step2FadeRise {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes step2ChipRise {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-step-2] *,
          [data-step-2] *::before,
          [data-step-2] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>

      {/* Logo top-left */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(96px + var(--safe-top))',
          left: 'var(--content-margin)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(8px)',
          transition:
            'opacity 500ms cubic-bezier(0,0,0.2,1) 50ms, transform 500ms cubic-bezier(0,0,0.2,1) 50ms',
        }}
      >
        <Logo id="step2-warmth" size={80} />
      </div>

      {/* Bottom-anchored copy block + chips */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(180px + var(--safe-bottom))',
          left: 'var(--content-margin)',
          right: 'var(--content-margin)',
          maxWidth: 1040,
        }}
      >
        <h1
          className="entry-h1"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
            transition:
              'opacity 600ms cubic-bezier(0,0,0.2,1) 150ms, transform 600ms cubic-bezier(0,0,0.2,1) 150ms',
          }}
        >
          {COPY.headline.line1}
          <br />
          {COPY.headline.line2}
        </h1>
        <p
          className="entry-sub"
          style={{
            marginBottom: 32,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            transition:
              'opacity 600ms cubic-bezier(0,0,0.2,1) 320ms, transform 600ms cubic-bezier(0,0,0.2,1) 320ms',
          }}
        >
          {COPY.subheadline}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {COPY.chips.map((chip, i) => (
            <span
              key={chip.label}
              className={`fact-chip${'emphasis' in chip && chip.emphasis ? ' bold' : ''}`}
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 500ms cubic-bezier(0,0,0.2,1) ${480 + i * 80}ms, transform 500ms cubic-bezier(0,0,0.2,1) ${480 + i * 80}ms`,
              }}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>

      {/* Hold-to-confirm button, bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(72px + var(--safe-bottom))',
          right: 'var(--content-margin)',
          zIndex: 10,
          width: RING_SIZE,
          height: RING_SIZE,
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1)' : 'scale(0.94)',
          transition:
            'opacity 500ms cubic-bezier(0,0,0.2,1) 800ms, transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) 800ms',
        }}
        onPointerDown={onHoldStart}
        onPointerUp={onHoldEnd}
        onPointerLeave={onHoldEnd}
        onPointerCancel={onHoldEnd}
        role="button"
        aria-label={COPY.holdPrompt.ariaLabel}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: '#F9F9F9',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: holding
              ? '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)'
              : '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
            transition: 'box-shadow 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
        <svg
          style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
          width={RING_SIZE}
          height={RING_SIZE}
        >
          <circle
            cx={RING_C}
            cy={RING_C}
            r={RING_R}
            fill="none"
            stroke={AMBER}
            strokeWidth="3"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{
              transition: holding
                ? 'none'
                : 'stroke-dashoffset 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
        </svg>
        <svg
          style={{
            position: 'absolute',
            top: (RING_SIZE - 28) / 2,
            left: (RING_SIZE - 28) / 2,
          }}
          width="28"
          height="28"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M7 4l6 6-6 6"
            stroke={N[950]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
