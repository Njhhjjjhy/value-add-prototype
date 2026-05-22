'use client';

import { useEffect, useRef } from 'react';
import { step15 } from '@/content';
import { usePropertyMapHost } from '../../shared/PropertyMapHost';

const COPY = step15.prototype;

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  bg: '#F9F9F9',
  n950: '#25272C',
  n800: '#40444C',
  n600: '#5B616E',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const TILT_DURATION_MS = 2200;
const TILT_BREATH_MS = 350;
const SHEET_SETTLE_MS = 0;

const animate = (
  el: HTMLElement | null,
  kf: Keyframe[],
  opts: KeyframeAnimationOptions
) => {
  if (!el) return Promise.resolve();
  return el.animate(kf, { fill: 'forwards', ...opts }).finished;
};
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const READY_TIMEOUT_MS = 4000;

type Host = ReturnType<typeof usePropertyMapHost>;

const waitForMapReady = (host: Host, isCancelled: () => boolean) =>
  new Promise<void>((resolve) => {
    if (!host || host.isReady) {
      resolve();
      return;
    }
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      unsub();
      resolve();
    };
    const timer = setTimeout(finish, READY_TIMEOUT_MS);
    const unsub = host.subscribe((event) => {
      if (event.type === 'ready' || isCancelled()) finish();
    });
  });

const tiltKeyframes: Keyframe[] = [
  { transform: 'perspective(1200px) rotateX(0deg) translateY(0px)', opacity: 1, offset: 0 },
  { transform: 'perspective(1200px) rotateX(1.5deg) translateY(4px)', opacity: 1, offset: 0.06 },
  { transform: 'perspective(1200px) rotateX(3deg) translateY(10px)', opacity: 1, offset: 0.12 },
  { transform: 'perspective(1200px) rotateX(5.5deg) translateY(20px)', opacity: 1, offset: 0.18 },
  { transform: 'perspective(1200px) rotateX(8deg) translateY(34px)', opacity: 1, offset: 0.24 },
  { transform: 'perspective(1200px) rotateX(11.5deg) translateY(56px)', opacity: 1, offset: 0.30 },
  { transform: 'perspective(1200px) rotateX(15deg) translateY(84px)', opacity: 0.98, offset: 0.36 },
  { transform: 'perspective(1200px) rotateX(20deg) translateY(124px)', opacity: 0.95, offset: 0.42 },
  { transform: 'perspective(1200px) rotateX(26deg) translateY(180px)', opacity: 0.90, offset: 0.48 },
  { transform: 'perspective(1200px) rotateX(33deg) translateY(260px)', opacity: 0.82, offset: 0.54 },
  { transform: 'perspective(1200px) rotateX(40deg) translateY(360px)', opacity: 0.72, offset: 0.60 },
  { transform: 'perspective(1200px) rotateX(47deg) translateY(480px)', opacity: 0.58, offset: 0.66 },
  { transform: 'perspective(1200px) rotateX(54deg) translateY(620px)', opacity: 0.42, offset: 0.72 },
  { transform: 'perspective(1200px) rotateX(60deg) translateY(760px)', opacity: 0.28, offset: 0.78 },
  { transform: 'perspective(1200px) rotateX(65deg) translateY(900px)', opacity: 0.16, offset: 0.84 },
  { transform: 'perspective(1200px) rotateX(70deg) translateY(1040px)', opacity: 0.08, offset: 0.90 },
  { transform: 'perspective(1200px) rotateX(73deg) translateY(1120px)', opacity: 0.03, offset: 0.95 },
  { transform: 'perspective(1200px) rotateX(75deg) translateY(1200px)', opacity: 0, offset: 1 },
];

export default function Step11Section6Transition({ isActive, onComplete }: StepProps) {
  const propertyMapHost = usePropertyMapHost();

  const tiltRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!isActive) return;

    propertyMapHost?.setChromeless(true);

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cancelled = false;
    (async () => {
      if (!reduced) {
        await animate(tiltRef.current, tiltKeyframes, {
          duration: TILT_DURATION_MS,
          easing: 'linear',
        });
      } else if (tiltRef.current) {
        tiltRef.current.style.opacity = '0';
      }
      if (cancelled) return;
      await wait(TILT_BREATH_MS);
      if (cancelled) return;
      await waitForMapReady(propertyMapHost, () => cancelled);
      if (cancelled) return;
      await wait(SHEET_SETTLE_MS);
      if (cancelled) return;
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isActive, propertyMapHost, onComplete]);

  if (!isActive) return null;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: C.bg,
        overflow: 'hidden',
      }}
    >
      <div
        ref={tiltRef}
        style={{
          position: 'absolute',
          inset: 0,
          transformOrigin: '50% 0%',
          willChange: 'transform, opacity',
        }}
      >
        <GhostBridge />
      </div>
    </div>
  );
}

function GhostBridge() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding:
          'calc(96px + var(--safe-top)) var(--content-margin) calc(96px + var(--safe-bottom))',
      }}
    >
      <div style={{ width: '100%', maxWidth: 880 }}>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 13,
            fontWeight: 500,
            color: C.n600,
            letterSpacing: '0.18em',
            marginBottom: 28,
            textAlign: 'left',
          }}
        >
          {COPY.caption}
        </div>
        <div
          style={{
            borderRadius: 20,
            background: C.bg,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow:
              '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
            padding: '40px 44px',
            marginBottom: 20,
          }}
        >
          <div
            role="group"
            aria-label={COPY.stats[0].ariaLabel}
          >
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: 72,
                color: C.n950,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                textAlign: 'left',
              }}
            >
              {COPY.stats[0].value}
            </div>
            <div
              style={{
                fontFamily: FONT_BODY,
                fontSize: 18,
                color: C.n800,
                lineHeight: 1.6,
                marginTop: 16,
                textAlign: 'left',
              }}
            >
              {COPY.stats[0].body}
            </div>
          </div>
        </div>
        <div
          style={{
            borderRadius: 20,
            background: C.bg,
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow:
              '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
            padding: '28px 44px',
          }}
        >
          <div
            role="group"
            aria-label={COPY.stats[1].ariaLabel}
          >
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: 48,
                color: C.n950,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                textAlign: 'left',
              }}
            >
              {COPY.stats[1].value}
            </div>
            <div
              style={{
                fontFamily: FONT_BODY,
                fontSize: 17,
                color: C.n800,
                lineHeight: 1.6,
                marginTop: 12,
                textAlign: 'left',
              }}
            >
              {COPY.stats[1].body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
