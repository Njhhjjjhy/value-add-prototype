'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { step10 } from '@/content';

const { physical: PHYSICAL_PAIN_POINTS, mental: MENTAL_PAIN_POINTS, groupLabels: GROUP_LABELS, personaStat: PERSONA_STAT, headline: HEADLINE } = step10.prototype;
type PainPoint = { id: string; label: string; summary: string };

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
  borderStrong: 'rgba(0,0,0,0.08)',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const STAGGER = 0.1;
const GROUP_PAUSE = 0.35;
const ITEM_DURATION = 0.45;

let easesRegistered = false;
function ensureEases() {
  if (easesRegistered) return;
  try {
    gsap.registerPlugin(CustomEase);
    if (!CustomEase.get?.('painPointSettle')) {
      CustomEase.create('painPointSettle', '0.22, 1, 0.36, 1');
    }
    if (!CustomEase.get?.('painPointGentle')) {
      CustomEase.create('painPointGentle', '0.23, 0.86, 0.39, 0.96');
    }
  } catch {
    /* CustomEase unavailable — runtime falls back to power2.out */
  }
  easesRegistered = true;
}

export default function Step10Section5PainPoints({ isActive, onComplete }: StepProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!isActive || !rootRef.current) return;

    ensureEases();

    const settle = CustomEase.get?.('painPointSettle') ? 'painPointSettle' : 'power2.out';
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const physicalEls = Array.from(
      rootRef.current.querySelectorAll<HTMLElement>('[data-pain-group="physical"]')
    );
    const mentalEls = Array.from(
      rootRef.current.querySelectorAll<HTMLElement>('[data-pain-group="mental"]')
    );
    const bridgeEl = rootRef.current.querySelector<HTMLElement>('[data-pain-bridge]');

    const initialTargets = [...physicalEls, ...mentalEls, ...(bridgeEl ? [bridgeEl] : [])];
    gsap.set(initialTargets, {
      visibility: 'hidden',
      opacity: 0,
      y: 16,
    });

    if (reduce) {
      // Reduced motion: reveal everything instantly, no stagger
      gsap.set(initialTargets, {
        visibility: 'visible',
        opacity: 1,
        y: 0,
      });
      return;
    }

    const tl = gsap.timeline();
    tl.to(physicalEls, {
      visibility: 'visible',
      opacity: 1,
      y: 0,
      duration: ITEM_DURATION,
      ease: settle,
      stagger: STAGGER,
    });
    tl.to({}, { duration: GROUP_PAUSE });
    tl.to(mentalEls, {
      visibility: 'visible',
      opacity: 1,
      y: 0,
      duration: ITEM_DURATION,
      ease: settle,
      stagger: STAGGER,
    });
    if (bridgeEl) {
      tl.to(
        bridgeEl,
        {
          visibility: 'visible',
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: settle,
        },
        '+=0.2'
      );
    }

    timelineRef.current = tl;

    return () => {
      tl.kill();
      timelineRef.current = null;
    };
  }, [isActive]);

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
      <div ref={rootRef} className="max-w-[1280px]">
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
          {HEADLINE}
        </h1>

        <div
          className="grid gap-12"
          style={{ gridTemplateColumns: '1fr 1px 1fr' }}
        >
          <PainGroup label={GROUP_LABELS.physical} items={PHYSICAL_PAIN_POINTS} group="physical" />
          <div
            aria-hidden
            style={{
              alignSelf: 'stretch',
              background: 'rgba(0,0,0,0.06)',
              width: 1,
            }}
          />
          <PainGroup label={GROUP_LABELS.mental} items={MENTAL_PAIN_POINTS} group="mental" />
        </div>

        <div
          data-pain-bridge
          style={{
            marginTop: 32,
            padding: '24px 28px',
            background: C.bg,
            border: `1px solid ${C.borderStrong}`,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'baseline',
            gap: 24,
            flexWrap: 'wrap',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
            visibility: 'hidden',
          }}
        >
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 40,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: C.heading,
              whiteSpace: 'nowrap',
            }}
          >
            {PERSONA_STAT.value}
          </div>
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 17,
              lineHeight: 1.5,
              color: C.body,
              flex: 1,
              minWidth: 360,
            }}
          >
            {PERSONA_STAT.label}
          </div>
        </div>
      </div>
    </button>
  );
}

type GroupProps = {
  label: string;
  items: readonly PainPoint[];
  group: 'physical' | 'mental';
};

function PainGroup({ label, items, group }: GroupProps) {
  return (
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
        {label}
      </div>
      <ul className="space-y-6">
        {items.map((p) => (
          <li
            key={p.id}
            data-pain-id={p.id}
            data-pain-group={group}
            style={{
              background: C.bg,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: 20,
              boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
              visibility: 'hidden',
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
            <div style={{ fontSize: 15, color: C.body, lineHeight: 1.6 }}>{p.summary}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
