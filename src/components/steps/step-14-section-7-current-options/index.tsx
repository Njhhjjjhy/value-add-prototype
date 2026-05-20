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
  border: 'rgba(0,0,0,0.06)',
  imageFill: '#EDEDED',
  imageFillTint: '#E4E4E4',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const SLOTS: { caption: string }[] = [
  { caption: 'No furniture' },
  { caption: 'Before renovation' },
  { caption: 'Not ready to move in' },
];

export default function Step14Section7CurrentOptions({ onComplete }: StepProps) {
  return (
    <button
      type="button"
      onClick={onComplete}
      className="absolute inset-0 w-full h-full text-left"
      style={{
        background: C.bg,
        paddingTop: 'calc(110px + var(--safe-top))',
        paddingBottom: 'calc(64px + var(--safe-bottom))',
        paddingLeft: 'var(--content-margin)',
        paddingRight: 'var(--content-margin)',
        fontFamily: FONT_BODY,
      }}
    >
      <div className="max-w-[1280px]">
        <div
          style={{
            fontSize: 13,
            letterSpacing: '0.01em',
            color: C.caption,
            marginBottom: 16,
          }}
        >
          Section 7 · What you would find today
        </div>

        <h1
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 48,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: C.heading,
            marginBottom: 48,
          }}
        >
          Nothing on the market is ready.
        </h1>

        <div className="grid grid-cols-3 gap-6">
          {SLOTS.map((s) => (
            <div
              key={s.caption}
              style={{
                background: C.bg,
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  aspectRatio: '4/3',
                  background: `linear-gradient(135deg, ${C.imageFill} 0%, ${C.imageFillTint} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    letterSpacing: '0.015em',
                    color: '#9A9DA4',
                    fontWeight: 500,
                  }}
                >
                  Before image
                </div>
              </div>
              <div
                style={{
                  padding: 20,
                  fontFamily: FONT_HEADING,
                  fontWeight: 600,
                  fontSize: 17,
                  color: C.heading,
                }}
              >
                {s.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}
