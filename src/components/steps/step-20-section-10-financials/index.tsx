'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from 'react';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  bg: '#F9F9F9',
  amber: '#FBB931',
  heading: '#25272C',
  sub: '#383A42',
  body: '#40444C',
  caption: '#5B616E',
  disabled: '#8E8F8F',
};

const PANEL_LEVEL_1 = {
  background: C.bg,
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
} as const;

const PANEL_LEVEL_2 = {
  background: C.bg,
  border: '1px solid rgba(0,0,0,0.08)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
} as const;

const EASE = {
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

const SCENARIOS = ['bull', 'normal', 'bear'] as const;
type Scenario = (typeof SCENARIOS)[number];

const YEARS = [3, 4, 5, 6] as const;
type Year = (typeof YEARS)[number];

type Row = {
  ip: number;
  ipo: number;
  ep: number;
  epo: number;
  rp: number;
  rpo: number;
};

const DATA: Record<Scenario, Record<Year, Row>> = {
  bull: {
    3: { ip: 18.29, ipo: 14.89, ep: 1.62, epo: 1.5, rp: 1624447742, rpo: 1496935513 },
    4: { ip: 15.06, ipo: 12.31, ep: 1.7, epo: 1.56, rp: 1700303136, rpo: 1557301236 },
    5: { ip: 13.16, ipo: 10.77, ep: 1.78, epo: 1.62, rp: 1776285098, rpo: 1617767681 },
    6: { ip: 11.9, ipo: 9.76, ep: 1.85, epo: 1.68, rp: 1853120274, rpo: 1678913114 },
  },
  normal: {
    3: { ip: 14.77, ipo: 12.0, ep: 1.5, epo: 1.4, rp: 1496447742, rpo: 1395073113 },
    4: { ip: 12.15, ipo: 9.91, ep: 1.56, epo: 1.44, rp: 1556303136, rpo: 1442706036 },
    5: { ip: 10.6, ipo: 8.66, ep: 1.62, epo: 1.49, rp: 1616285098, rpo: 1490439681 },
    6: { ip: 9.57, ipo: 7.84, ep: 1.68, epo: 1.54, rp: 1677120274, rpo: 1538852314 },
  },
  bear: {
    3: { ip: 11.14, ipo: 9.03, ep: 1.37, epo: 1.29, rp: 1368447742, rpo: 1293210713 },
    4: { ip: 9.16, ipo: 7.45, ep: 1.41, epo: 1.33, rp: 1412303136, rpo: 1328110836 },
    5: { ip: 7.97, ipo: 6.5, ep: 1.46, epo: 1.36, rp: 1456285098, rpo: 1363111681 },
    6: { ip: 7.18, ipo: 5.87, ep: 1.5, epo: 1.4, rp: 1501120274, rpo: 1398791514 },
  },
};

const fmtIrr = (v: number) => `${v.toFixed(2)}%`;
const fmtEm = (v: number) => `${v.toFixed(2)}x`;
const fmtYen = (v: number) => `¥${(v / 1e9).toFixed(2)}B`;

const DEAL_ROWS: Array<[string, string]> = [
  ['Total project', '¥2B (50/50 debt-equity)'],
  ['Tax rate', '20.42% (GK-TK pass-through)'],
  ['Fund size', 'USD 30M (min 6M)'],
  ['Target yield', '8-11% p.a. over 5 years'],
  ['Hurdle rate', '7% p.a.'],
];

const ENTER_DELAY_MS = 80;
const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

function reducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function ScenarioTabs({
  scenario,
  onChange,
}: {
  scenario: Scenario;
  onChange: (s: Scenario) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Scenario"
      style={{
        display: 'inline-flex',
        gap: 8,
        padding: 6,
        borderRadius: 14,
        background: 'rgba(0,0,0,0.03)',
        border: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      {SCENARIOS.map((s) => {
        const active = scenario === s;
        return (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={(e) => {
              e.stopPropagation();
              onChange(s);
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              e.currentTarget.style.transform = 'scale(0.97)';
            }}
            onPointerUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onPointerLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onPointerCancel={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            style={{
              padding: '14px 28px',
              minHeight: 56,
              borderRadius: 10,
              border: 'none',
              background: active ? C.bg : 'transparent',
              color: active ? C.heading : C.disabled,
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              fontWeight: active ? 600 : 500,
              boxShadow: active ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: `transform 120ms ${EASE.sharp}, background 250ms ${EASE.smooth}, color 250ms ${EASE.smooth}, box-shadow 250ms ${EASE.smooth}`,
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        );
      })}
    </div>
  );
}

function YearSlider({
  year,
  onChange,
}: {
  year: Year;
  onChange: (y: Year) => void;
}) {
  const idx = YEARS.indexOf(year);
  const pct = (idx / (YEARS.length - 1)) * 100;
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const resolve = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      if (rect.width <= 0) return;
      const x = (clientX - rect.left) / rect.width;
      const i = Math.max(
        0,
        Math.min(YEARS.length - 1, Math.round(x * (YEARS.length - 1)))
      );
      onChange(YEARS[i]);
    },
    [onChange]
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dragging.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
    resolve(e.clientX);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    resolve(e.clientX);
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
  };

  const onKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (idx > 0) onChange(YEARS[idx - 1]);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx < YEARS.length - 1) onChange(YEARS[idx + 1]);
    } else if (e.key === 'Home') {
      e.preventDefault();
      onChange(YEARS[0]);
    } else if (e.key === 'End') {
      e.preventDefault();
      onChange(YEARS[YEARS.length - 1]);
    }
  };

  return (
    <div style={{ padding: '0 8px' }} onClick={(e) => e.stopPropagation()}>
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label="Holding period, years"
        aria-valuemin={YEARS[0]}
        aria-valuemax={YEARS[YEARS.length - 1]}
        aria-valuenow={year}
        aria-valuetext={`${year} years`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKey}
        style={{
          position: 'relative',
          height: 64,
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          outline: 'none',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 26,
            left: 0,
            right: 0,
            height: 6,
            borderRadius: 3,
            background: 'rgba(0,0,0,0.06)',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 26,
            left: 0,
            width: `${pct}%`,
            height: 6,
            borderRadius: 3,
            background:
              'linear-gradient(90deg, #FBB931 0%, rgba(251,185,49,0.6) 100%)',
            boxShadow: '0 0 8px rgba(251,185,49,0.25)',
            transition: `width 250ms ${EASE.smooth}`,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 14,
            left: `${pct}%`,
            transform: 'translateX(-50%)',
            width: 32,
            height: 32,
            borderRadius: 16,
            background: C.amber,
            border: '4px solid #FFFFFF',
            boxShadow:
              '0 2px 12px rgba(251,185,49,0.4), 0 1px 4px rgba(0,0,0,0.1)',
            transition: `left 250ms ${EASE.smooth}`,
          }}
        />
        {YEARS.map((y, i) => {
          const active = year === y;
          return (
            <div
              key={y}
              aria-hidden
              style={{
                position: 'absolute',
                top: 48,
                left: `${(i / (YEARS.length - 1)) * 100}%`,
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                fontWeight: active ? 600 : 400,
                color: active ? C.heading : C.disabled,
                transition: `color 250ms ${EASE.smooth}, font-weight 250ms ${EASE.smooth}`,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {y}Y
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AnimVal({
  value,
  size,
  color = C.heading,
  weight = 600,
}: {
  value: string;
  size: number;
  color?: string;
  weight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current === value) return;
    prev.current = value;
    const el = ref.current;
    if (!el || reducedMotion()) return;
    el.animate(
      [
        { opacity: 0.3, transform: 'translateY(4px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 200, easing: EASE.sharp, fill: 'forwards' }
    );
  }, [value]);
  return (
    <div
      ref={ref}
      style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: weight,
        fontSize: size,
        color,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {value}
    </div>
  );
}

function BearReveal({
  scenario,
  postIrr,
}: {
  scenario: Scenario;
  postIrr: number;
}) {
  const [shown, setShown] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scenario !== 'bear' || shown) return;
    setShown(true);
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 4500);
    return () => clearTimeout(t);
  }, [scenario, shown]);

  useEffect(() => {
    const el = ref.current;
    if (!visible || !el) return;
    if (reducedMotion()) {
      el.style.opacity = '1';
      return;
    }
    el.animate(
      [
        { opacity: 0, transform: 'translateY(8px)', offset: 0 },
        { opacity: 1, transform: 'translateY(0)', offset: 0.08 },
        { opacity: 1, transform: 'translateY(0)', offset: 0.88 },
        { opacity: 0, transform: 'translateY(0)', offset: 1 },
      ],
      { duration: 4500, easing: 'ease-in-out', fill: 'forwards' }
    );
  }, [visible]);

  if (!visible) return null;
  return (
    <div
      ref={ref}
      role="status"
      style={{
        padding: '16px 20px',
        borderRadius: 14,
        background: 'rgba(251,185,49,0.08)',
        border: '1px solid rgba(251,185,49,0.18)',
        fontFamily: 'var(--font-body)',
        fontSize: 15,
        color: C.body,
        lineHeight: 1.5,
        opacity: 0,
      }}
    >
      The bear case still returns {fmtIrr(postIrr)} IRR post-tax. That is not a
      hedge, that is the floor.
    </div>
  );
}

function DealTerms({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        onPointerDown={(e) => {
          e.stopPropagation();
          e.currentTarget.style.transform = 'scale(0.98)';
        }}
        onPointerUp={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        onPointerLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        onPointerCancel={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        style={{
          background: 'none',
          border: 'none',
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          fontWeight: 500,
          color: C.caption,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 0',
          minHeight: 44,
          transition: `transform 120ms ${EASE.sharp}`,
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span
          aria-hidden
          style={{
            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: `transform 250ms ${EASE.smooth}`,
            display: 'inline-block',
            fontSize: 10,
          }}
        >
          ▶
        </span>
        Fund terms and structure
      </button>
      {expanded && (
        <div
          style={{
            ...PANEL_LEVEL_1,
            padding: '8px 24px',
            borderRadius: 16,
            marginTop: 8,
          }}
        >
          {DEAL_ROWS.map(([k, v], i) => (
            <div
              key={k}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 0',
                borderBottom:
                  i < DEAL_ROWS.length - 1
                    ? '1px solid rgba(0,0,0,0.05)'
                    : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  color: C.caption,
                }}
              >
                {k}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  color: C.heading,
                  fontWeight: 500,
                  fontVariantNumeric: 'tabular-nums',
                  textAlign: 'right',
                }}
              >
                {v}
              </span>
            </div>
          ))}
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: C.disabled,
              marginTop: 4,
              paddingBottom: 14,
            }}
          >
            Indicative. Subject to final investor agreement.
          </div>
        </div>
      )}
    </div>
  );
}

export default function Step16Section8Financials({
  isActive,
  onComplete,
}: StepProps) {
  const [mounted, setMounted] = useState(false);
  const [scenario, setScenario] = useState<Scenario>('normal');
  const [year, setYear] = useState<Year>(5);
  const [expanded, setExpanded] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const mountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const d = DATA[scenario][year];

  useEffect(() => {
    if (!isActive) {
      setMounted(false);
      setScenario('normal');
      setYear(5);
      setExpanded(false);
      setExiting(false);
      setHasInteracted(false);
      return;
    }
    mountTimer.current = setTimeout(() => setMounted(true), ENTER_DELAY_MS);
    return () => {
      if (mountTimer.current) clearTimeout(mountTimer.current);
    };
  }, [isActive]);

  useEffect(() => {
    if (!mounted) return;
    const el = contentRef.current;
    if (!el) return;
    if (reducedMotion()) {
      el.style.opacity = '1';
      return;
    }
    el.animate(
      [
        { opacity: 0, transform: 'translateY(24px) scale(0.98)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' },
      ],
      { duration: 500, easing: EASE.smooth, fill: 'forwards' }
    );
  }, [mounted]);

  const handleScenarioChange = useCallback((s: Scenario) => {
    setHasInteracted(true);
    setScenario(s);
  }, []);

  const handleYearChange = useCallback((y: Year) => {
    setHasInteracted(true);
    setYear(y);
  }, []);

  const advance = useCallback(() => {
    if (exiting) return;
    if (!hasInteracted) {
      setHasInteracted(true);
      return;
    }
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => setExiting(true), EXIT_DELAY_MS);
  }, [exiting, hasInteracted]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => onComplete(), EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [exiting, onComplete]);

  useEffect(
    () => () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    },
    []
  );

  if (!isActive) return null;

  const heroBarPct = Math.min((d.ip / 20) * 100, 100);

  return (
    <div
      data-step-16
      onClick={advance}
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(0.97)' : 'scale(1)',
        transition: `opacity ${EXIT_DURATION_MS}ms ${EASE.smooth}, transform ${EXIT_DURATION_MS}ms ${EASE.smooth}`,
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-step-16] *,
          [data-step-16] *::before,
          [data-step-16] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
        [data-step-16] ::-webkit-scrollbar { display: none; }
        [data-step-16] * { scrollbar-width: none; }
      `}</style>
      <div
        ref={contentRef}
        style={{
          position: 'absolute',
          inset: 0,
          padding:
            'calc(96px + var(--safe-top)) var(--content-margin) calc(56px + var(--safe-bottom))',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          boxSizing: 'border-box',
          opacity: 0,
        }}
      >
        {/* header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 500,
              color: C.caption,
              letterSpacing: '0.18em',
            }}
          >
            Section 10
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: 48,
              color: C.heading,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Return projections
          </h1>
        </div>

        {/* controls row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 32,
            flexWrap: 'wrap',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <ScenarioTabs scenario={scenario} onChange={handleScenarioChange} />
          <div style={{ flex: 1, minWidth: 280, maxWidth: 520 }}>
            <YearSlider year={year} onChange={handleYearChange} />
          </div>
        </div>

        {/* main grid: hero IRR left, secondary stack right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 24,
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* hero IRR panel */}
          <div
            style={{
              ...PANEL_LEVEL_2,
              padding: '44px 44px',
              borderRadius: 28,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              role="group"
              aria-label={`Estimated IRR pre-tax: ${fmtIrr(d.ip)}. ${fmtIrr(
                d.ipo
              )} post-tax.`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: C.caption,
                  letterSpacing: '0.04em',
                  marginBottom: 16,
                }}
              >
                Estimated IRR (pre-tax)
              </div>
              <AnimVal value={fmtIrr(d.ip)} size={144} />
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 17,
                  color: C.caption,
                  marginTop: 16,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {fmtIrr(d.ipo)} post-tax
              </div>
              <div
                aria-hidden
                style={{
                  marginTop: 32,
                  height: 6,
                  borderRadius: 3,
                  width: `${heroBarPct}%`,
                  background:
                    'linear-gradient(90deg, #FBB931 0%, rgba(251,185,49,0.3) 100%)',
                  transition: `width 400ms ${EASE.smooth}`,
                  boxShadow: '0 0 12px rgba(251,185,49,0.3)',
                }}
              />
              <div style={{ flex: 1 }} />
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: C.disabled,
                  marginTop: 16,
                  lineHeight: 1.5,
                }}
              >
                Based on 1 billion yen equity in a 2 billion yen project.
              </div>
            </div>
          </div>

          {/* secondary metrics stack */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div
              style={{
                ...PANEL_LEVEL_1,
                padding: '28px 32px',
                borderRadius: 20,
                flex: 1,
                overflow: 'hidden',
              }}
            >
              <div
                role="group"
                aria-label={`Equity multiple: ${fmtEm(d.ep)}. ${fmtEm(
                  d.epo
                )} post-tax.`}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    fontWeight: 500,
                    color: C.caption,
                    marginBottom: 12,
                  }}
                >
                  Equity multiple
                </div>
                <AnimVal value={fmtEm(d.ep)} size={56} />
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    color: C.disabled,
                    marginTop: 8,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {fmtEm(d.epo)} post-tax
                </div>
              </div>
            </div>

            <div
              style={{
                ...PANEL_LEVEL_1,
                padding: '28px 32px',
                borderRadius: 20,
                flex: 1,
                overflow: 'hidden',
              }}
            >
              <div
                role="group"
                aria-label={`Total return: ${fmtYen(d.rp)} JPY. ${fmtYen(
                  d.rpo
                )} post-tax.`}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    fontWeight: 500,
                    color: C.caption,
                    marginBottom: 12,
                  }}
                >
                  Total return
                </div>
                <AnimVal value={fmtYen(d.rp)} size={56} />
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    color: C.disabled,
                    marginTop: 8,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {fmtYen(d.rpo)} post-tax
                </div>
              </div>
            </div>
          </div>
        </div>

        <BearReveal scenario={scenario} postIrr={d.ipo} />
        <DealTerms
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
        />
      </div>
    </div>
  );
}
