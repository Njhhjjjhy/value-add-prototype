'use client';

import { step7 } from '@/content';

const COPY = step7.prototype;

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  bg: '#F9F9F9',
  heading: '#25272C',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

export default function Step7Section4Transition({ isActive, onComplete }: StepProps) {
  return (
    <button
      type="button"
      onClick={onComplete}
      className="absolute inset-0 w-full h-full text-left"
      style={{
        background: C.bg,
        fontFamily: FONT_BODY,
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes step7-fade-up {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-step7-anim] {
            animation-duration: 1ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>

      {isActive && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 'var(--content-margin)',
            paddingRight: 'var(--content-margin)',
          }}
        >
          <h1
            data-step7-anim
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 96,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: C.heading,
              margin: 0,
              maxWidth: 1120,
              opacity: 0,
              animation: 'step7-fade-up 800ms cubic-bezier(0.22, 1, 0.36, 1) both',
              animationDelay: '300ms',
            }}
          >
            {COPY.headline}
          </h1>
        </div>
      )}
    </button>
  );
}
