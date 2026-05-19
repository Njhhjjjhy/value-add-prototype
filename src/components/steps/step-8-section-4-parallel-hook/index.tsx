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
  amber: '#FBB931',
  border: 'rgba(0,0,0,0.08)',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

export default function Step8Section4ParallelHook({ onComplete }: StepProps) {
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
      <div className="flex flex-col h-full max-w-[1280px]">
        <div
          style={{
            fontSize: 13,
            letterSpacing: '0.01em',
            color: C.caption,
            marginBottom: 16,
          }}
        >
          Section 4 · The macro thesis
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
          You&apos;ve seen this movie before.
        </h1>

        <div
          className="grid grid-cols-2 gap-6 flex-1"
          style={{ marginBottom: 32 }}
        >
          <div
            style={{
              background: C.bg,
              border: `1px solid ${C.border}`,
              borderRadius: 20,
              padding: 32,
              boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                aspectRatio: '16/10',
                background: '#EDEDED',
                borderRadius: 12,
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                color: C.caption,
              }}
            >
              Hsinchu Science Park · 2005
            </div>
            <div style={{ fontSize: 17, color: C.body, marginBottom: 24 }}>
              TSMC&apos;s 12-inch fab opens.
            </div>
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: 56,
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
                color: C.heading,
                marginBottom: 8,
              }}
            >
              +120%
            </div>
            <div style={{ fontSize: 13, color: C.caption }}>
              Baoshan property prices, 3 years following
            </div>
          </div>

          <div
            style={{
              background: C.bg,
              border: `1px solid ${C.border}`,
              borderRadius: 20,
              padding: 32,
              boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                padding: '4px 10px',
                background: C.amber,
                color: '#25272C',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 9999,
              }}
            >
              Now
            </div>
            <div
              style={{
                aspectRatio: '16/10',
                background: '#EDEDED',
                borderRadius: 12,
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                color: C.caption,
              }}
            >
              JASM Kumamoto · 2025
            </div>
            <div style={{ fontSize: 17, color: C.body, marginBottom: 24 }}>
              JASM Fab 1 opens.
            </div>
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: 56,
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
                color: C.heading,
                marginBottom: 8,
              }}
            >
              +33%
            </div>
            <div style={{ fontSize: 13, color: C.caption }}>
              Ozu Town land prices, year-over-year · #1 in Japan
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: 15,
            color: C.body,
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          Same fab · Same pattern · 20 years apart
        </div>

        <div
          style={{
            fontStyle: 'italic',
            fontSize: 17,
            color: C.caption,
            textAlign: 'center',
          }}
        >
          We&apos;ll come back to this.
        </div>
      </div>
    </button>
  );
}
