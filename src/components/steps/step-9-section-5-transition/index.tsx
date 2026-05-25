'use client';

import { step9 } from '@/content';

const COPY = step9.prototype;

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  bg: '#F9F9F9',
  heading: '#25272C',
  body: '#40444C',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

// Production motion uses variant B (slide-stack) from the playground — the
// quietest and most consistent option with step 7's title card.
export default function Step9Section5Transition({ isActive, onComplete }: StepProps) {
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
        @keyframes step9-fade-up {
          0%   { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-step9-anim] {
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
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: 'var(--content-margin)',
            paddingRight: 'var(--content-margin)',
            gap: 24,
            maxWidth: 1120,
          }}
        >
          <h1
            data-step9-anim
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 120,
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
              color: C.heading,
              margin: 0,
              opacity: 0,
              animation: 'step9-fade-up 800ms cubic-bezier(0.22, 1, 0.36, 1) both',
              animationDelay: '200ms',
            }}
          >
            {COPY.headline}
          </h1>
          <p
            data-step9-anim
            style={{
              fontFamily: FONT_BODY,
              fontSize: 22,
              lineHeight: 1.45,
              color: C.body,
              margin: 0,
              maxWidth: 760,
              opacity: 0,
              animation: 'step9-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
              animationDelay: '700ms',
            }}
          >
            {COPY.subheading}
          </p>
        </div>
      )}
    </button>
  );
}
