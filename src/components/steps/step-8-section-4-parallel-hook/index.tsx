'use client';

import { step8 } from '@/content';

const COPY = step8.prototype;

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
        paddingTop: 'calc(96px + var(--safe-top))',
        paddingBottom: 'calc(96px + var(--safe-bottom))',
        paddingLeft: 'var(--content-margin)',
        paddingRight: 'var(--content-margin)',
        fontFamily: FONT_BODY,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="grid grid-cols-2 gap-6 w-full"
        style={{ maxWidth: 1200 }}
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
            {COPY.left.imageCaption}
          </div>
          <div style={{ fontSize: 17, color: C.body, marginBottom: 24 }}>
            {COPY.left.body}
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
            {COPY.left.stat}
          </div>
          <div style={{ fontSize: 13, color: C.caption }}>
            {COPY.left.statCaption}
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
            {COPY.right.badge}
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
            {COPY.right.imageCaption}
          </div>
          <div style={{ fontSize: 17, color: C.body, marginBottom: 24 }}>
            {COPY.right.body}
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
            {COPY.right.stat}
          </div>
          <div style={{ fontSize: 13, color: C.caption }}>
            {COPY.right.statCaption}
          </div>
        </div>
      </div>
    </button>
  );
}
