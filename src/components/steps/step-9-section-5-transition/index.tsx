'use client';

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
  disabled: '#8E8F8F',
  amber: '#FBB931',
  dot: '#C9CDD4',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const DOT_COUNT = 8;

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
          0%   { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes step9-rule-grow {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes step9-dot-rise {
          0%   { opacity: 0; transform: translateY(8px); }
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
        <>
          <div
            style={{
              position: 'absolute',
              top: 'calc(160px + var(--safe-top))',
              left: 'var(--content-margin)',
              right: 'var(--content-margin)',
              maxWidth: 1120,
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            <div
              data-step9-anim
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                opacity: 0,
                animation: 'step9-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both',
                animationDelay: '200ms',
              }}
            >
              <div
                data-step9-anim
                style={{
                  width: 48,
                  height: 1,
                  background: C.amber,
                  transformOrigin: 'left center',
                  animation: 'step9-rule-grow 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
                  animationDelay: '260ms',
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
                SECTION 5
              </span>
            </div>

            <h1
              data-step9-anim
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: 96,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: C.heading,
                margin: 0,
                opacity: 0,
                animation: 'step9-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
                animationDelay: '420ms',
              }}
            >
              Pain points
            </h1>

            <p
              data-step9-anim
              style={{
                fontSize: 22,
                lineHeight: 1.4,
                color: C.body,
                margin: 0,
                maxWidth: 760,
                opacity: 0,
                animation: 'step9-fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
                animationDelay: '680ms',
              }}
            >
              What semiconductor families actually face in Kumamoto.
            </p>
          </div>

          <div
            style={{
              position: 'absolute',
              left: 'var(--content-margin)',
              bottom: 'calc(120px + var(--safe-bottom))',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <div
              data-step9-anim
              style={{
                fontSize: 13,
                letterSpacing: '0.12em',
                color: C.disabled,
                opacity: 0,
                animation: 'step9-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both',
                animationDelay: '1400ms',
              }}
            >
              Physical · Mental
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {Array.from({ length: DOT_COUNT }).map((_, i) => (
                <div
                  key={i}
                  data-step9-anim
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: i < 4 ? C.body : C.dot,
                    opacity: 0,
                    animation: 'step9-dot-rise 400ms cubic-bezier(0.22, 1, 0.36, 1) both',
                    animationDelay: `${1500 + i * 80}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </button>
  );
}
