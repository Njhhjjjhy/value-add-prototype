'use client';

import { useState } from 'react';
import { step26 } from '@/content';

const COPY = step26.prototype;

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
  amber: '#FBB931',
  border: 'rgba(0,0,0,0.06)',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

type Phase = 'hsinchu' | 'kumamoto';

type Period = {
  header: string;
  title: string;
  detail: string;
  callout?: string;
};

type TimelineEntry = {
  readonly years: string | null;
  readonly title: string | null;
  readonly detail: string;
  readonly isCallout?: boolean;
};

function buildPeriods(timeline: readonly TimelineEntry[]): Period[] {
  const out: Period[] = [];
  for (const t of timeline) {
    if (t.isCallout) {
      if (out.length > 0) {
        const callout = t.detail.startsWith('→ ')
          ? t.detail.slice(2)
          : t.detail;
        out[out.length - 1] = { ...out[out.length - 1], callout };
      }
    } else if (t.years && t.title) {
      out.push({ header: t.years, title: t.title, detail: t.detail });
    }
  }
  return out;
}

const HSINCHU_PERIODS: Period[] = buildPeriods(COPY.hsinchu.timeline);
const KUMAMOTO_PERIODS: Period[] = buildPeriods(COPY.kumamoto.timeline);

export default function Step26Section13ParallelTimeline({ onComplete }: StepProps) {
  const [phase, setPhase] = useState<Phase>('hsinchu');

  const handleTap = () => {
    if (phase === 'hsinchu') {
      setPhase('kumamoto');
    } else {
      onComplete();
    }
  };

  const renderPeriods = (periods: Period[]) => (
    <ul style={{ marginBottom: 48, listStyle: 'none', padding: 0 }}>
      {periods.map((p, i) => (
        <li
          key={p.header}
          style={{
            paddingTop: i === 0 ? 0 : 20,
            paddingBottom: 20,
            borderTop: i === 0 ? 'none' : `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: '0.01em',
              color: C.caption,
              marginBottom: 4,
            }}
          >
            {p.header}
          </div>
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 22,
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              color: C.sub,
              marginBottom: 6,
            }}
          >
            {p.title}
          </div>
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 15,
              lineHeight: 1.6,
              color: C.body,
              maxWidth: 880,
            }}
          >
            {p.detail}
          </div>
          {p.callout && (
            <div
              style={{
                marginTop: 8,
                fontFamily: FONT_BODY,
                fontSize: 15,
                lineHeight: 1.5,
                fontWeight: 600,
                color: C.heading,
              }}
            >
              {'→ '}
              {p.callout}
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <button
      type="button"
      onClick={handleTap}
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
          {COPY.sectionLabel}
        </div>

        {phase === 'hsinchu' ? (
          <>
            <h1
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: 48,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: C.heading,
                marginBottom: 8,
              }}
            >
              {COPY.hsinchu.headline}
            </h1>
            <div style={{ fontSize: 15, color: C.caption, marginBottom: 4 }}>
              {COPY.hsinchu.caption}
            </div>
            <div
              style={{
                display: 'inline-block',
                padding: '4px 10px',
                background: 'rgba(25,182,78,0.12)',
                color: '#0D8A3A',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 9999,
                marginTop: 8,
                marginBottom: 48,
              }}
            >
              {COPY.hsinchu.badge}
            </div>

            {renderPeriods(HSINCHU_PERIODS)}

            <div className="grid grid-cols-2 gap-6">
              <div
                style={{
                  background: C.bg,
                  border: `1px solid ${C.border}`,
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
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
                  {COPY.hsinchu.metrics[0].stat}
                </div>
                <div style={{ fontSize: 15, color: C.body, marginBottom: 4 }}>
                  {COPY.hsinchu.metrics[0].label}
                </div>
                <div style={{ fontSize: 13, color: C.caption }}>
                  {COPY.hsinchu.metrics[0].sub}
                </div>
              </div>
              <div
                style={{
                  background: C.bg,
                  border: `1px solid ${C.border}`,
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
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
                  {COPY.hsinchu.metrics[1].stat}
                </div>
                <div style={{ fontSize: 15, color: C.body, marginBottom: 4 }}>
                  {COPY.hsinchu.metrics[1].label}
                </div>
                <div style={{ fontSize: 13, color: C.caption }}>
                  {COPY.hsinchu.metrics[1].sub}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: 48,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: C.heading,
                marginBottom: 8,
              }}
            >
              {COPY.kumamoto.headline}
            </h1>
            <div style={{ fontSize: 15, color: C.caption, marginBottom: 4 }}>
              {COPY.kumamoto.caption}
            </div>
            <div
              style={{
                display: 'inline-block',
                padding: '4px 10px',
                background: 'rgba(251,185,49,0.16)',
                color: '#8C5E00',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 9999,
                marginTop: 8,
                marginBottom: 48,
              }}
            >
              {COPY.kumamoto.badge}
            </div>

            {renderPeriods(KUMAMOTO_PERIODS)}

            <div className="grid grid-cols-2 gap-6" style={{ marginBottom: 32 }}>
              <div
                style={{
                  background: C.bg,
                  border: `1px solid ${C.border}`,
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
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
                  {COPY.kumamoto.metrics[0].stat}
                </div>
                <div style={{ fontSize: 15, color: C.body, marginBottom: 4 }}>
                  {COPY.kumamoto.metrics[0].label}
                </div>
                <div style={{ fontSize: 13, color: C.caption }}>
                  {COPY.kumamoto.metrics[0].sub}
                </div>
              </div>
              <div
                style={{
                  background: C.bg,
                  border: `1px solid ${C.border}`,
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
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
                  {COPY.kumamoto.metrics[1].stat}
                </div>
                <div style={{ fontSize: 15, color: C.body, marginBottom: 4 }}>
                  {COPY.kumamoto.metrics[1].label}
                </div>
                <div style={{ fontSize: 13, color: C.caption }}>
                  {COPY.kumamoto.metrics[1].sub}
                </div>
              </div>
            </div>

            <p
              style={{
                fontStyle: 'italic',
                fontSize: 17,
                lineHeight: 1.65,
                color: C.body,
                maxWidth: 880,
              }}
            >
              {COPY.closingLine}
            </p>
          </>
        )}
      </div>
    </button>
  );
}
