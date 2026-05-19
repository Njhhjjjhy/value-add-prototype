'use client';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  bg: '#F9F9F9',
  heading: '#25272C',
  sub: '#383A42',
  caption: '#5B616E',
  disabled: '#8E8F8F',
  amber: '#FBB931',
  rule: 'rgba(0,0,0,0.10)',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const HEADLINE = "You've seen this movie before.";

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
        @keyframes step7-rule-grow {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes step7-line-grow {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes step7-dot-pop {
          0%   { opacity: 0; transform: scale(0.4); }
          70%  { opacity: 1; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
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
            gap: 48,
          }}
        >
          <div
            data-step7-anim
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              opacity: 0,
              animation: 'step7-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both',
              animationDelay: '200ms',
            }}
          >
            <div
              data-step7-anim
              style={{
                width: 48,
                height: 1,
                background: C.amber,
                transformOrigin: 'left center',
                animation: 'step7-rule-grow 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
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
              SECTION 4
            </span>
          </div>

          <div style={{ position: 'relative', height: 80, display: 'flex', alignItems: 'center' }}>
            <div
              data-step7-anim
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '50%',
                height: 1,
                background: C.rule,
                transformOrigin: 'left center',
                animation: 'step7-line-grow 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
                animationDelay: '400ms',
              }}
            />
            <div
              data-step7-anim
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                opacity: 0,
                animation: 'step7-dot-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) both',
                animationDelay: '500ms',
              }}
            >
              <span
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 600,
                  fontSize: 22,
                  color: C.sub,
                }}
              >
                2005
              </span>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: C.heading,
                  marginTop: 18,
                }}
              />
            </div>
            <div
              data-step7-anim
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                opacity: 0,
                animation: 'step7-dot-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) both',
                animationDelay: '1200ms',
              }}
            >
              <span
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 600,
                  fontSize: 22,
                  color: C.heading,
                }}
              >
                2025
              </span>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: C.amber,
                  marginTop: 18,
                  boxShadow: '0 0 0 4px rgba(251,185,49,0.18)',
                }}
              />
            </div>
          </div>

          <h1
            data-step7-anim
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 80,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: C.heading,
              margin: 0,
              maxWidth: 1120,
              opacity: 0,
              animation: 'step7-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
              animationDelay: '1500ms',
            }}
          >
            {HEADLINE}
          </h1>
        </div>
      )}
    </button>
  );
}
