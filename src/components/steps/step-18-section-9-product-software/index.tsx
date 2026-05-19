'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import NextButton from '@/components/shared/NextButton';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  amber: '#FBB931',
  bg: '#F9F9F9',
  n950: '#25272C',
  n800: '#40444C',
  n600: '#5B616E',
  n100: '#EDEEF1',
};

const CARD = {
  bg: '#1A1A1E',
  panel: '#26262B',
  border: 'rgba(255,255,255,0.08)',
  textPrimary: '#F2F2F4',
  textSecondary: '#A8AAB0',
  textMuted: '#7B7E86',
};

const EASE_SETTLE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

const TIERS = [
  {
    year: 'Year 1',
    name: 'Landing',
    tag: 'Included',
    items: 'Property secretary. Admin accompaniment. Maintenance.',
  },
  {
    year: 'Year 2',
    name: 'Family',
    tag: 'Add-on',
    items: 'Medical navigation. Education support. Community events.',
  },
  {
    year: 'Year 3+',
    name: 'Wellness',
    tag: 'Premium',
    items: 'Mental health. Health management. Golf, onsen, culture.',
  },
];

type Notification = {
  from: string;
  msg: string;
  time: string;
};

type Year = {
  label: string;
  sub: string;
  tag: string;
  notifications: Notification[];
};

const YEAR_1: Year = {
  label: 'Year 1',
  sub: 'Landing',
  tag: 'Included',
  notifications: [
    {
      from: 'Lin Wei-Chen',
      msg: 'Your SoftBank appointment is confirmed for Thursday, 2:00 PM. I will meet you at the entrance.',
      time: '9:41 AM',
    },
    {
      from: 'Maintenance',
      msg: 'Delta AC unit in 4F serviced. Everything is running normally.',
      time: '2:15 PM',
    },
    {
      from: 'MoreHarvest',
      msg: 'Your residence guide is ready. Available in Chinese and Japanese.',
      time: '10:00 AM',
    },
  ],
};

const YEAR_2: Year = {
  label: 'Year 2',
  sub: 'Family',
  tag: 'Add-on',
  notifications: [
    {
      from: 'Medical nav',
      msg: 'Dr. Tanaka appointment confirmed. Chinese interpreter arranged for 10:30 AM.',
      time: '8:20 AM',
    },
    {
      from: 'Education',
      msg: 'KIS school bus: Monday pickup at Building A, 7:45 AM. Driver is Mr. Oda.',
      time: '7:00 PM',
    },
    {
      from: 'Community',
      msg: 'Lunar New Year dinner at the residents lounge, January 25. RSVP open.',
      time: '3:30 PM',
    },
  ],
};

const YEAR_3: Year = {
  label: 'Year 3+',
  sub: 'Wellness',
  tag: 'Premium',
  notifications: [
    {
      from: 'Wellness',
      msg: 'Your wellness check-in is Tuesday at 3:00 PM. Counselor Chen is available in Chinese.',
      time: '11:00 AM',
    },
    {
      from: 'Concierge',
      msg: 'Golf reservation confirmed. Aso Grand Vrio, Saturday 7:30 AM. Shuttle arranged.',
      time: '6:45 PM',
    },
    {
      from: 'Culture',
      msg: 'New: Kumamoto pottery workshop series. 4 sessions starting March 8.',
      time: '9:15 AM',
    },
  ],
};

const ALL_YEARS: Year[] = [YEAR_1, YEAR_2, YEAR_3];

type FlatNotif = Notification & {
  yearIdx: number;
  yearLabel: string;
  yearSub: string;
  tag: string;
  key: string;
};

type GroupedItem =
  | {
      type: 'year';
      label: string;
      sub: string;
      tag: string;
      yearIdx: number;
      key: string;
    }
  | ({ type: 'notif'; key: string } & FlatNotif);

const useNotifEntrance = (ref: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.style.opacity = '1';
      return;
    }
    el.animate(
      [
        { opacity: 0, transform: 'translateY(24px) scale(0.98)' },
        {
          opacity: 0.4,
          transform: 'translateY(12px) scale(0.99)',
          offset: 0.35,
        },
        {
          opacity: 0.85,
          transform: 'translateY(4px) scale(0.998)',
          offset: 0.7,
        },
        { opacity: 1, transform: 'translateY(0) scale(1)' },
      ],
      { duration: 600, easing: EASE_SETTLE, fill: 'forwards' }
    );
  }, [ref]);
};

function DarkStatusBar() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 18,
        left: 32,
        right: 32,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 30,
        color: CARD.textPrimary,
        fontSize: 13,
        fontWeight: 600,
        fontFamily: 'var(--font-body)',
      }}
    >
      <span>9:41</span>
      <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 13 }}>5G</span>
        <svg width="18" height="13" viewBox="0 0 16 12">
          <rect x="0" y="4" width="3" height="8" rx="0.5" fill="currentColor" />
          <rect
            x="4.5"
            y="2.5"
            width="3"
            height="9.5"
            rx="0.5"
            fill="currentColor"
          />
          <rect
            x="9"
            y="0.5"
            width="3"
            height="11.5"
            rx="0.5"
            fill="currentColor"
          />
          <rect x="13" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
        </svg>
      </span>
    </div>
  );
}

function DeviceScreenCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        width: 480,
        height: 820,
        maxHeight: '100%',
        borderRadius: 36,
        background: CARD.bg,
        border: `1px solid ${CARD.border}`,
        boxShadow:
          '0 32px 80px rgba(0,0,0,0.35), 0 12px 32px rgba(0,0,0,0.20)',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

function NotifCard({ from, msg, time }: Notification) {
  const ref = useRef<HTMLDivElement>(null);
  useNotifEntrance(ref);
  return (
    <div ref={ref} style={{ opacity: 0 }}>
      <div
        style={{
          padding: '12px 14px',
          borderRadius: 14,
          background: CARD.panel,
          border: `1px solid ${CARD.border}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 4,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 15,
              color: CARD.textPrimary,
            }}
          >
            {from}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: CARD.textMuted,
            }}
          >
            {time}
          </span>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: CARD.textSecondary,
            margin: 0,
            lineHeight: 1.55,
          }}
        >
          {msg}
        </p>
      </div>
    </div>
  );
}

function YearHeader({
  label,
  sub,
  tag,
}: {
  label: string;
  sub: string;
  tag: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useNotifEntrance(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 4px 4px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
          fontSize: 15,
          color: CARD.textPrimary,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: CARD.textMuted,
        }}
      >
        {sub}
      </span>
      <span
        style={{
          marginLeft: 'auto',
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: CARD.textPrimary,
          background: 'rgba(255,255,255,0.10)',
          borderRadius: 8,
          padding: '4px 10px',
          fontWeight: 500,
        }}
      >
        {tag}
      </span>
    </div>
  );
}

function LockScreen({
  active,
  onAllShown,
}: {
  active: boolean;
  onAllShown: () => void;
}) {
  const [items, setItems] = useState<FlatNotif[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      setItems([]);
      return;
    }
    const flat: FlatNotif[] = ALL_YEARS.flatMap((y, yi) =>
      y.notifications.map((n, ni) => ({
        ...n,
        yearIdx: yi,
        yearLabel: y.label,
        yearSub: y.sub,
        tag: y.tag,
        key: `${yi}-${ni}`,
      }))
    );
    let idx = 0;
    const show = () => {
      if (idx >= flat.length) {
        onAllShown();
        return;
      }
      const next = flat[idx];
      setItems((prev) => [...prev, next]);
      idx++;
      timerRef.current = setTimeout(show, 1400);
    };
    timerRef.current = setTimeout(show, 700);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, onAllShown]);

  const grouped: GroupedItem[] = [];
  let lastYi = -1;
  items.forEach((n) => {
    if (n.yearIdx !== lastYi) {
      grouped.push({
        type: 'year',
        label: n.yearLabel,
        sub: n.yearSub,
        tag: n.tag,
        yearIdx: n.yearIdx,
        key: `y${n.yearIdx}`,
      });
      lastYi = n.yearIdx;
    }
    grouped.push({ type: 'notif', ...n });
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: active ? 1 : 0,
        transition: 'opacity 400ms',
      }}
    >
      <DarkStatusBar />
      <div style={{ position: 'absolute', top: 64, left: 28, right: 28 }}>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: 22,
            color: CARD.textPrimary,
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          Software-defined real estate
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: CARD.textSecondary,
            margin: '6px 0 0',
            lineHeight: 1.45,
          }}
        >
          What your phone looks like as a MoreHarvest resident.
        </p>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 140,
          left: 16,
          right: 16,
          bottom: 24,
          overflow: 'hidden',
        }}
      >
        {grouped.map((item) => (
          <div
            key={item.key}
            style={{ marginBottom: item.type === 'year' ? 4 : 10 }}
          >
            {item.type === 'year' ? (
              <YearHeader label={item.label} sub={item.sub} tag={item.tag} />
            ) : (
              <NotifCard from={item.from} msg={item.msg} time={item.time} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function IntroColumn({ onContinue }: { onContinue: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        maxWidth: 540,
        width: '100%',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          fontWeight: 500,
          color: C.n600,
          letterSpacing: '0.18em',
        }}
      >
        Section 9 · Product, software
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
          fontSize: 48,
          color: C.n950,
          margin: 0,
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
        }}
      >
        Software-defined real estate
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 18,
          color: C.n800,
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        Taiwanese staff solve all problems, from daily logistics to language
        barriers. Nothing affects expected quality of life.
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          marginTop: 8,
        }}
      >
        {TIERS.map((tier, i) => (
          <div
            key={i}
            style={{
              padding: '16px 18px',
              borderRadius: 12,
              background: C.bg,
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow:
                '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: 6,
              }}
            >
              <div
                style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    fontSize: 17,
                    color: C.n950,
                  }}
                >
                  {tier.year}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    color: C.n600,
                  }}
                >
                  {tier.name}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: C.n800,
                  background: C.n100,
                  borderRadius: 8,
                  padding: '4px 10px',
                }}
              >
                {tier.tag}
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                color: C.n800,
                margin: 0,
                lineHeight: 1.55,
              }}
            >
              {tier.items}
            </p>
          </div>
        ))}
      </div>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          color: C.n600,
          margin: 0,
          lineHeight: 1.55,
        }}
      >
        The software layer keeps growing. New modules pushed without modifying
        buildings.
      </p>

      <button
        type="button"
        className="step-14-cta"
        onClick={onContinue}
        style={{
          alignSelf: 'flex-start',
          padding: '18px 32px',
          minHeight: 56,
          borderRadius: 12,
          border: 'none',
          background: C.amber,
          color: C.n950,
          fontFamily: 'var(--font-heading)',
          fontSize: 17,
          fontWeight: 600,
          marginTop: 8,
        }}
      >
        See it in action
      </button>
    </div>
  );
}

export default function Step14Section7ProductSoftware({
  isActive,
  onComplete,
}: StepProps) {
  const [screen, setScreen] = useState<'intro' | 'demo'>('intro');
  const [allShown, setAllShown] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) {
      setScreen('intro');
      setAllShown(false);
      setExiting(false);
    }
  }, [isActive]);

  const advance = useCallback(() => {
    if (exiting) return;
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => setExiting(true), EXIT_DELAY_MS);
  }, [exiting]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => onComplete(), EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [exiting, onComplete]);

  useEffect(() => {
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, []);

  const handleAllShown = useCallback(() => setAllShown(true), []);

  if (!isActive) return null;

  return (
    <div
      data-step-14
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(0.97)' : 'scale(1)',
        transition: `opacity ${EXIT_DURATION_MS}ms ${EASE_SETTLE}, transform ${EXIT_DURATION_MS}ms ${EASE_SETTLE}`,
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-step-14] *,
          [data-step-14] *::before,
          [data-step-14] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
        .step-14-cta { transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1); }
        .step-14-cta:active { transform: scale(0.97); }
      `}</style>

      <div
        style={{
          position: 'absolute',
          top: 'calc(96px + var(--safe-top))',
          bottom: 'calc(64px + var(--safe-bottom))',
          left: 'var(--content-margin)',
          right: 'var(--content-margin)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 64,
        }}
      >
        <div
          style={{
            flex: '1 1 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: 600,
            width: '100%',
          }}
        >
          <IntroColumn onContinue={() => setScreen('demo')} />
        </div>

        <div
          style={{
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
        >
          <DeviceScreenCard>
            {screen === 'intro' && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 32,
                }}
              >
                <DarkStatusBar />
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    color: CARD.textMuted,
                    textAlign: 'center',
                    lineHeight: 1.5,
                  }}
                >
                  Tap &ldquo;See it in action&rdquo; to begin
                </div>
              </div>
            )}
            {screen === 'demo' && (
              <LockScreen active={true} onAllShown={handleAllShown} />
            )}
          </DeviceScreenCard>
        </div>
      </div>

      <NextButton
        onClick={advance}
        visible={screen === 'demo' && allShown && !exiting}
      />
    </div>
  );
}
