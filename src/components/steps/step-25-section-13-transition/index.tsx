'use client';

import { step25 } from '@/content';

const COPY = step25.prototype;

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  bg: '#F9F9F9',
  heading: '#25272C',
  caption: '#5B616E',
  amber: '#FBB931',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const CALLBACK = COPY.callback;
const HEADLINE = COPY.headline;

export default function Step25Section13Transition({ isActive, onComplete }: StepProps) {
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
        @keyframes step25-fade-up {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes step25-fade-out {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes step25-rule-grow {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-step25-anim] {
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
            gap: 32,
          }}
        >
          <div
            data-step25-anim
            style={{
              fontStyle: 'italic',
              fontSize: 28,
              color: C.caption,
              opacity: 0,
              animation: `step25-fade-up 800ms cubic-bezier(0.22, 1, 0.36, 1) both,
                          step25-fade-out 500ms cubic-bezier(0.22, 1, 0.36, 1) 2400ms both`,
            }}
          >
            {CALLBACK}
          </div>

          <div
            data-step25-anim
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              opacity: 0,
              animation: 'step25-fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
              animationDelay: '2900ms',
            }}
          >
            <div
              data-step25-anim
              style={{
                width: 48,
                height: 1,
                background: C.amber,
                transformOrigin: 'left center',
                animation: 'step25-rule-grow 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
                animationDelay: '2960ms',
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.18em',
                color: C.caption,
              }}
            >
              {COPY.sectionLabel}
            </span>
          </div>

          <h1
            data-step25-anim
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 96,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: C.heading,
              margin: 0,
              opacity: 0,
              animation: 'step25-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
              animationDelay: '3100ms',
            }}
          >
            {HEADLINE}
          </h1>
        </div>
      )}
    </button>
  );
}
