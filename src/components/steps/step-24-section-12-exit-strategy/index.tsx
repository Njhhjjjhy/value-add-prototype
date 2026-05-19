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
  body: '#40444C',
  caption: '#5B616E',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

export default function Step24Section12ExitStrategy({ onComplete }: StepProps) {
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
          Section 12 · Exit strategy
        </div>

        <h1
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 72,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: C.heading,
            marginBottom: 24,
          }}
        >
          One door.
        </h1>

        <div
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 32,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: C.sub,
            marginBottom: 48,
            maxWidth: 880,
          }}
        >
          Sell to other buyers with the master lease in place.
        </div>

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.6,
            color: C.body,
            maxWidth: 880,
          }}
        >
          Kumamoto&apos;s housing demand is structural, not cyclical. The same
          engineer migration that drove Hsinchu for two decades is just
          starting here. When the time comes to exit, the buyers are there:
          owner-occupiers, yield investors, or institutional vehicles taking
          on a portfolio with a stable lease already attached.
        </p>
      </div>
    </button>
  );
}
