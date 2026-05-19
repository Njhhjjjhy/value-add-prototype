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

const HSINCHU_PERIODS = [
  '2004 – 2006 · TSMC 12-inch fab expansion',
  '2007 – 2009 · Acute residential supply gap',
  '2010 – 2012 · Institutional developers enter',
  '2013 – 2018 · Market maturity, rental premium locks in',
];

const KUMAMOTO_PERIODS = [
  '2024 – 2025 · JASM Fab 1 opens, Taiwanese engineers arrive',
  '2026 – 2028 · Fab 2 confirmed, supply chain clusters form',
  '2029 – 2032 · Developer competition, land price peak',
  '2033 – 2035 · J-REIT exit window opens',
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

            <ul className="space-y-4" style={{ marginBottom: 48 }}>
              {HSINCHU_PERIODS.map((p) => (
                <li
                  key={p}
                  style={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 600,
                    fontSize: 22,
                    lineHeight: 1.25,
                    letterSpacing: '-0.01em',
                    color: C.sub,
                  }}
                >
                  {p}
                </li>
              ))}
            </ul>

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

            <ul className="space-y-4" style={{ marginBottom: 48 }}>
              {KUMAMOTO_PERIODS.map((p) => (
                <li
                  key={p}
                  style={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 600,
                    fontSize: 22,
                    lineHeight: 1.25,
                    letterSpacing: '-0.01em',
                    color: C.sub,
                  }}
                >
                  {p}
                </li>
              ))}
            </ul>

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
                  Existing Taiwan-grade premium
                </div>
                <div style={{ fontSize: 13, color: C.caption }}>
                  residential supply in market
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
