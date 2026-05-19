'use client';

import {
  PHYSICAL_PAIN_POINTS,
  MENTAL_PAIN_POINTS,
} from '@/data/painPoints';

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
  border: 'rgba(0,0,0,0.06)',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

export default function Step10Section5PainPoints({ onComplete }: StepProps) {
  return (
    <button
      type="button"
      onClick={onComplete}
      className="absolute inset-0 w-full h-full text-left overflow-y-auto"
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
          Section 5 · Pain points
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
          Why engineers do not stay.
        </h1>

        <div className="grid grid-cols-2 gap-12">
          <div>
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: 22,
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
                color: C.heading,
                marginBottom: 24,
              }}
            >
              Physical
            </div>
            <ul className="space-y-6">
              {PHYSICAL_PAIN_POINTS.map((p) => (
                <li
                  key={p.id}
                  style={{
                    background: C.bg,
                    border: `1px solid ${C.border}`,
                    borderRadius: 12,
                    padding: 20,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT_HEADING,
                      fontWeight: 600,
                      fontSize: 17,
                      color: C.heading,
                      marginBottom: 8,
                    }}
                  >
                    {p.label}
                  </div>
                  <div style={{ fontSize: 15, color: C.body, lineHeight: 1.6 }}>
                    {p.summary}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: 22,
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
                color: C.heading,
                marginBottom: 24,
              }}
            >
              Mental
            </div>
            <ul className="space-y-6">
              {MENTAL_PAIN_POINTS.map((p) => (
                <li
                  key={p.id}
                  style={{
                    background: C.bg,
                    border: `1px solid ${C.border}`,
                    borderRadius: 12,
                    padding: 20,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT_HEADING,
                      fontWeight: 600,
                      fontSize: 17,
                      color: C.heading,
                      marginBottom: 8,
                    }}
                  >
                    {p.label}
                  </div>
                  <div style={{ fontSize: 15, color: C.body, lineHeight: 1.6 }}>
                    {p.summary}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </button>
  );
}
