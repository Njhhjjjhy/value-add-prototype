'use client';

import { useState } from 'react';

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

const HSINCHU_PERIODS: Period[] = [
  {
    header: '2004 – 2006',
    title: 'TSMC 12-inch fab expansion',
    detail:
      'Engineer population surpassed 100,000; inbound migration accelerated across Hsinchu County',
  },
  {
    header: '2007 – 2009',
    title: 'Acute residential supply gap',
    detail:
      'Zhubei land prices rose over 60% in 3 years; senior engineers housed in hotels for lack of alternatives',
  },
  {
    header: '2010 – 2012',
    title: 'Institutional developers enter',
    detail:
      'Far Glory, Cathay Real Estate begin land acquisition; early movers had already locked the best sites',
  },
  {
    header: '2013 – 2018',
    title: 'Market maturity · rental premium locks in',
    detail:
      "Premium apartments sustain 2–3× rental premium; Zhubei established as Taiwan's benchmark tech cluster",
  },
];

const KUMAMOTO_PERIODS: Period[] = [
  {
    header: '2024 – 2025',
    title: 'JASM Fab 1 opens · Taiwanese engineers arrive',
    detail:
      '3,000–5,000 TSMC-dispatched engineers relocating; Kikuyo-cho land prices already up 40–80%',
    callout: 'Now: residential supply gap, no premium developer has entered',
  },
  {
    header: '2026 – 2028',
    title: 'Fab 2 confirmed · supply chain clusters form',
    detail:
      'Tier-2 suppliers land nearby; engineer families settle long-term, driving demand for family housing',
  },
  {
    header: '2029 – 2032',
    title: 'Developer competition · land price peak',
    detail:
      'Major Japanese developers enter; early-mover land cost advantage becomes unreplicable',
  },
  {
    header: '2033 – 2035',
    title: 'J-REIT exit window opens',
    detail:
      'Portfolio reaches REIT threshold; institutional acquisition or listed-vehicle exit',
  },
];

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
          Section 13 · Parallel timeline
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
              Hsinchu Science Park
            </h1>
            <div style={{ fontSize: 15, color: C.caption, marginBottom: 4 }}>
              Zhubei · Hsinchu Corridor
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
              2005 — 2018 · Verified outcome
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
                  +180%
                </div>
                <div style={{ fontSize: 15, color: C.body, marginBottom: 4 }}>
                  Zhubei premium rent growth
                </div>
                <div style={{ fontSize: 13, color: C.caption }}>
                  2006–2015 cumulative
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
                  +60%
                </div>
                <div style={{ fontSize: 15, color: C.body, marginBottom: 4 }}>
                  Zhubei land price appreciation
                </div>
                <div style={{ fontSize: 13, color: C.caption }}>
                  2007–2010 · 3-year window
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
              Kumamoto Semiconductor Corridor
            </h1>
            <div style={{ fontSize: 15, color: C.caption, marginBottom: 4 }}>
              Kikuyo · Ozu · Kumamoto City
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
              2024 — 2035 · In progress
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
                  +40–80%
                </div>
                <div style={{ fontSize: 15, color: C.body, marginBottom: 4 }}>
                  Kikuyo-cho land appreciation
                </div>
                <div style={{ fontSize: 13, color: C.caption }}>
                  2022–2024
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
                  0
                </div>
                <div style={{ fontSize: 15, color: C.body, marginBottom: 4 }}>
                  Existing Taiwan-grade premium residential supply in market
                </div>
                <div style={{ fontSize: 13, color: C.caption }}>
                  MoreHarvest
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
              Entering in 2025 is the equivalent of acquiring land in Zhubei in 2007.
              We bring what no developer brought to Hsinchu then: an AI-native platform
              — Moha — that turns every asset into a data-generating node, compounding
              both NOI and proprietary intelligence across the portfolio.
            </p>
          </>
        )}
      </div>
    </button>
  );
}
