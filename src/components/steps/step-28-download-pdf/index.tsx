'use client';

import { useEffect, useState } from 'react';
import { step28 } from '@/content';

const COPY = step28.prototype;

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const C = {
  heading: '#25272C',
  body: '#40444C',
  bg: '#F9F9F9',
  amber: '#FBB931',
  amberPressed: '#E79B00',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const MOUNT_DELAY_MS = 80;
const EASE_ARRIVE = 'cubic-bezier(0,0,0.2,1)';

export default function Step22DownloadPdf({ isActive, onComplete }: StepProps) {
  const [mounted, setMounted] = useState(false);
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setMounted(false);
      return;
    }
    const t = setTimeout(() => setMounted(true), MOUNT_DELAY_MS);
    return () => clearTimeout(t);
  }, [isActive]);

  if (!isActive) return null;

  const handleClick = () => {
    onComplete();
    window.location.assign('/pdf');
  };

  return (
    <div
      data-step-22
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        padding:
          'calc(110px + var(--safe-top)) var(--content-margin) calc(64px + var(--safe-bottom))',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-step-22] *,
          [data-step-22] *::before,
          [data-step-22] *::after {
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
          maxWidth: 720,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(12px)',
          transition: `opacity 600ms ${EASE_ARRIVE}, transform 600ms ${EASE_ARRIVE}`,
        }}
      >
        <h1
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 48,
            color: C.heading,
            margin: 0,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
          }}
        >
          {COPY.headline}
        </h1>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 500,
            fontSize: 18,
            color: C.body,
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {COPY.body}
        </p>
      </div>

      <button
        type="button"
        onPointerDown={() => setPressing(true)}
        onPointerUp={() => setPressing(false)}
        onPointerLeave={() => setPressing(false)}
        onPointerCancel={() => setPressing(false)}
        onClick={handleClick}
        style={{
          fontFamily: FONT_BODY,
          fontSize: 17,
          fontWeight: 600,
          color: C.heading,
          background: pressing ? C.amberPressed : C.amber,
          border: 'none',
          borderRadius: 9999,
          padding: '0 36px',
          height: 56,
          minWidth: 240,
          boxShadow: pressing
            ? '0 1px 4px rgba(0,0,0,0.10)'
            : '0 2px 12px rgba(251,185,49,0.35), 0 1px 3px rgba(0,0,0,0.08)',
          transform: pressing ? 'scale(0.98)' : mounted ? 'scale(1)' : 'scale(0.97)',
          opacity: mounted ? 1 : 0,
          transition: `transform 160ms cubic-bezier(0.4, 0, 0.2, 1), background 160ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 160ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms ${EASE_ARRIVE} 280ms`,
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        {COPY.button}
      </button>
    </div>
  );
}
