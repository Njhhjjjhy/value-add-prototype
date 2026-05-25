'use client';

import { useEffect, useRef } from 'react';
import { step3 } from '@/content';

const COPY = step3.prototype;

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  heading: '#25272C',
  sub: '#383A42',
  bg: '#F9F9F9',
  band: '#EDEEF1',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const ENTRY_HOLD_MS = 900;
const SWEEP_DURATION_MS = 875;
const TOTAL_DURATION_MS = ENTRY_HOLD_MS + SWEEP_DURATION_MS;

function Logo({ id = 'step3', size = 96 }: { id?: string; size?: number }) {
  const h = size * (24 / 56);
  return (
    <svg width={size} height={h} viewBox="0 0 56 24" fill="none">
      <path
        d="M11.4499 0.012C15.6113 -0.047 18.8225 1.729 21.2495 5.091C24.5588 9.675 27.9048 14.233 31.2296 18.806C32.4795 20.525 32.5275 21.462 31.4681 22.883C30.431 24.274 28.131 24.409 27.0638 23.043C25.3525 20.853 23.7371 18.586 22.0689 16.361C19.9435 13.527 17.8404 10.674 15.6611 7.883C14.2228 6.04 12.2237 5.629 10.0574 6.148C8.0471 6.629 6.791 7.985 6.033 9.925C5.135 12.223 6.276 15.102 8.039 16.419C10.027 17.904 12.796 17.933 14.881 16.499C15.901 15.798 16.537 14.791 16.975 13.666C17.208 13.065 17.383 12.95 17.785 13.515C18.689 14.786 19.583 16.066 20.533 17.302C21 17.91 21.008 18.411 20.554 19.018C18.105 22.296 14.891 23.94 10.787 23.737C4.094 23.404 -0.687 17.288 0.081 10.245C0.601 5.477 4.731 1.076 8.728 0.276C9.626 0.096 10.529 -0.042 11.45 0.012Z"
        fill={`url(#p0_${id})`}
      />
      <path
        d="M38.639 10.691C37.536 9.159 36.413 7.612 35.306 6.054C35.112 5.78 35.304 5.529 35.462 5.299C37.429 2.449 40.064 0.693 43.547 0.413C48.593 0.007 52.318 2.171 54.645 6.606C57.543 12.127 55.651 19.047 50.315 22.312C45.384 25.328 38.538 23.913 34.914 18.799C31.643 14.184 28.281 9.634 24.97 5.048C23.774 3.391 23.723 2.54 24.674 1.218C25.658 -0.151 28.052 -0.25 29.062 1.097C32.143 5.207 35.187 9.346 38.25 13.471C38.851 14.281 39.458 15.088 40.082 15.88C42.2 18.573 45.865 18.958 48.319 16.754C51.021 14.327 51.204 10.534 48.74 8.043C45.682 4.952 40.631 6.013 39.037 10.078C38.963 10.268 38.998 10.519 38.639 10.691Z"
        fill={`url(#p1_${id})`}
      />
      <defs>
        <linearGradient
          id={`p0_${id}`}
          x1="32"
          y1="0"
          x2="-2"
          y2="4"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FBB931" />
          <stop offset="1" stopColor="#FF8660" />
        </linearGradient>
        <linearGradient
          id={`p1_${id}`}
          x1="56"
          y1="0"
          x2="22"
          y2="4"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FBB931" />
          <stop offset="1" stopColor="#FF8660" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Step3Section2Transition({ isActive, onComplete }: StepProps) {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const exitingRef = useRef<HTMLDivElement | null>(null);
  const bandRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    if (exitingRef.current) exitingRef.current.style.animation = 'none';
    if (bandRef.current) bandRef.current.style.animation = 'none';

    timers.current = [
      setTimeout(() => {
        if (exitingRef.current) {
          exitingRef.current.style.animation = `step3SweepOut ${SWEEP_DURATION_MS}ms ease-in-out forwards`;
        }
        if (bandRef.current) {
          bandRef.current.style.animation = `step3SweepBand ${SWEEP_DURATION_MS}ms ease-in-out forwards`;
        }
      }, ENTRY_HOLD_MS),
      setTimeout(() => onComplete(), TOTAL_DURATION_MS),
    ];

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div
      data-step-3
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes step3SweepOut {
          0% { clip-path: inset(0 0 0 0); }
          100% { clip-path: inset(0 0 0 100%); }
        }
        @keyframes step3SweepBand {
          0% { clip-path: inset(0 100% 0 0); }
          45% { clip-path: inset(0 0 0 0); }
          55% { clip-path: inset(0 0 0 0); }
          100% { clip-path: inset(0 0 0 100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-step-3] *,
          [data-step-3] *::before,
          [data-step-3] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>

      <div
        ref={exitingRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 'calc(96px + var(--safe-top))',
            left: 'var(--content-margin)',
          }}
        >
          <Logo />
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(200px + var(--safe-bottom))',
            left: 'var(--content-margin)',
            right: 'var(--content-margin)',
            maxWidth: 1120,
          }}
        >
          <h1
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 96,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: C.heading,
              margin: '0 0 24px 0',
            }}
          >
            {COPY.headline.line1}
            <br />
            {COPY.headline.line2}
          </h1>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 22,
              lineHeight: 1.4,
              color: C.sub,
              margin: 0,
            }}
          >
            {COPY.subheadline}
          </p>
        </div>
      </div>

      <div
        ref={bandRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 6,
          background: C.band,
          clipPath: 'inset(0 100% 0 0)',
        }}
      />
    </div>
  );
}
