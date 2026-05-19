'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const C = {
  heading: '#25272C',
  sub: '#383A42',
  body: '#40444C',
  caption: '#5B616E',
  amber: '#FBB931',
  bg: '#F9F9F9',
  hairline: 'rgba(0,0,0,0.08)',
  hairlineSoft: 'rgba(0,0,0,0.06)',
};

const SECTION = {
  eyebrow: 'Section 6 · Demand',
  headline: 'Who lives here.',
  persona: {
    title: 'The semiconductor engineer',
    subtitle: 'JASM / TSMC supply chain · rotational deployment',
  },
  constraints: [
    {
      label: 'Proximity',
      body: '10-minute drive to the fab. Non-negotiable for shift-based and emergency call-ins.',
    },
    {
      label: 'Stay length',
      body: 'Short business stays to mid- and long-term assignments. Months, not nights.',
    },
    {
      label: 'Group size',
      body: 'Small teams of 3 to 4. Travel together, work together, prefer to live together.',
    },
    {
      label: 'Logistics',
      body: 'Multiple cars per household. Parking is a hard requirement, not a perk.',
    },
  ],
  closing:
    'A hotel room is a compromise. A studio apartment is a compromise. A 4LDK shared home is the format this tenant has been waiting for.',
};

const ENTER_DELAY_MS = 80;
const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

function ConstraintRow({
  index,
  label,
  body,
  mounted,
  delay,
}: {
  index: number;
  label: string;
  body: string;
  mounted: boolean;
  delay: number;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '32px 1fr',
        columnGap: 20,
        paddingTop: index === 0 ? 0 : 22,
        paddingBottom: 22,
        borderBottom: index === 3 ? 'none' : `1px solid ${C.hairlineSoft}`,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(8px)',
        transition: `opacity 500ms cubic-bezier(0,0,0.2,1) ${delay}ms, transform 500ms cubic-bezier(0,0,0.2,1) ${delay}ms`,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          fontWeight: 500,
          color: C.caption,
          letterSpacing: '0.06em',
          paddingTop: 4,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div>
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 18,
            fontWeight: 600,
            color: C.heading,
            margin: 0,
            lineHeight: 1.25,
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            color: C.body,
            margin: '6px 0 0',
            lineHeight: 1.55,
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

export default function Step8Section4Persona({ isActive, onComplete }: StepProps) {
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const mountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) {
      setMounted(false);
      setExiting(false);
      return;
    }
    mountTimer.current = setTimeout(() => setMounted(true), ENTER_DELAY_MS);
    return () => {
      if (mountTimer.current) clearTimeout(mountTimer.current);
    };
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

  if (!isActive) return null;

  return (
    <div
      data-step-8
      onClick={advance}
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(0.97)' : 'scale(1)',
        transition: `opacity ${EXIT_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${EXIT_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: 'var(--safe-top) var(--content-margin) var(--safe-bottom)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1fr)',
          columnGap: 64,
          alignItems: 'stretch',
        }}
      >
        {/* ── Left: hero column ── */}
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 32,
            paddingBottom: 32,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: 500,
                color: C.caption,
                letterSpacing: '0.14em',
                margin: 0,
                opacity: mounted ? 1 : 0,
                transition: 'opacity 500ms cubic-bezier(0,0,0.2,1) 50ms',
              }}
            >
              {SECTION.eyebrow}
            </p>
            <div
              style={{
                width: 32,
                height: 2,
                background: C.amber,
                marginTop: 18,
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left center',
                transition:
                  'opacity 400ms cubic-bezier(0,0,0.2,1) 150ms, transform 500ms cubic-bezier(0,0,0.2,1) 150ms',
              }}
            />
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 72,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                fontWeight: 600,
                color: C.heading,
                margin: '26px 0 0',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                transition:
                  'opacity 600ms cubic-bezier(0,0,0.2,1) 200ms, transform 600ms cubic-bezier(0,0,0.2,1) 200ms',
              }}
            >
              {SECTION.headline}
            </h1>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              lineHeight: 1.55,
              color: C.sub,
              fontStyle: 'italic',
              margin: 0,
              maxWidth: 480,
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(8px)',
              transition:
                'opacity 600ms cubic-bezier(0,0,0.2,1) 900ms, transform 600ms cubic-bezier(0,0,0.2,1) 900ms',
            }}
          >
            {SECTION.closing}
          </p>
        </section>

        {/* ── Right: dossier card with persona portrait ── */}
        <section
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              background: C.bg,
              border: `1px solid ${C.hairline}`,
              borderRadius: 20,
              boxShadow:
                '0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
              overflow: 'hidden',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.985)',
              transition:
                'opacity 700ms cubic-bezier(0,0,0.2,1) 250ms, transform 700ms cubic-bezier(0,0,0.2,1) 250ms',
            }}
          >
            {/* Portrait */}
            <div
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
                background: '#EDEEF1',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/playground/3d/persona-front-base.png"
                alt="The semiconductor engineer — JASM / TSMC supply chain"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 30%',
                  display: 'block',
                }}
              />
            </div>

            {/* Dossier body */}
            <div style={{ padding: '28px 36px 32px' }}>
              {/* Persona header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  paddingBottom: 22,
                  borderBottom: `1px solid ${C.hairlineSoft}`,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: C.amber,
                    marginTop: 14,
                    flexShrink: 0,
                    boxShadow: '0 0 12px rgba(251,185,49,0.6)',
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13,
                      fontWeight: 500,
                      color: C.caption,
                      letterSpacing: '0.12em',
                      margin: 0,
                    }}
                  >
                    TENANT PROFILE
                  </p>
                  <h2
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 28,
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                      fontWeight: 600,
                      color: C.heading,
                      margin: '6px 0 4px',
                    }}
                  >
                    {SECTION.persona.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 15,
                      color: C.sub,
                      margin: 0,
                      lineHeight: 1.45,
                    }}
                  >
                    {SECTION.persona.subtitle}
                  </p>
                </div>
              </div>

              {/* Constraints */}
              <div style={{ paddingTop: 8 }}>
                {SECTION.constraints.map((c, i) => (
                  <ConstraintRow
                    key={c.label}
                    index={i}
                    label={c.label}
                    body={c.body}
                    mounted={mounted}
                    delay={400 + i * 100}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
