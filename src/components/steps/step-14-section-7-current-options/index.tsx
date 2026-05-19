'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import NextButton from '@/components/shared/NextButton';
import BackButton from '@/components/shared/BackButton';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  bg: '#F9F9F9',
  n950: '#25272C',
  n900: '#383A42',
  n800: '#40444C',
  n600: '#5B616E',
  n400: '#8E8F8F',
  n200: '#D8DBDF',
  n100: '#EDEEF1',
  amber: '#FBB931',
  pBd: 'rgba(0,0,0,0.06)',
  pSh: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
  eBd: 'rgba(0,0,0,0.08)',
  eSh: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
};

const F = {
  h: 'var(--font-heading)',
  b: 'var(--font-body)',
};

const E = { s: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' };

const GAPS = [
  'Medical navigation',
  'Mental health support',
  'Education integration',
  'Spouse career support',
  'Operational friction',
];

const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

function Panel({
  children,
  style,
  elev,
}: {
  children: ReactNode;
  style?: CSSProperties;
  elev?: boolean;
}) {
  const surface: CSSProperties = elev
    ? { background: C.bg, border: `1px solid ${C.eBd}`, boxShadow: C.eSh }
    : { background: C.bg, border: `1px solid ${C.pBd}`, boxShadow: C.pSh };
  return (
    <div
      style={{
        borderRadius: 20,
        position: 'relative',
        overflow: 'hidden',
        ...surface,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Img({
  label,
  innerRef,
  style,
}: {
  label: string;
  innerRef?: (el: HTMLDivElement | null) => void;
  style?: CSSProperties;
}) {
  return (
    <div
      ref={innerRef}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 16,
        background: C.n100,
        border: `1px dashed ${C.n200}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: F.b,
          fontSize: 13,
          color: C.n400,
          fontWeight: 500,
          letterSpacing: '0.02em',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function an(el: HTMLElement | null, kf: Keyframe[], o: KeyframeAnimationOptions) {
  if (!el) return Promise.resolve();
  return el.animate(kf, { fill: 'forwards', ...o }).finished;
}
function w(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function Dots({ b, t }: { b: number; t: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 'calc(36px + var(--safe-bottom))',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 10,
        zIndex: 41,
      }}
    >
      {Array.from({ length: t }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === b ? 10 : 7,
            height: i === b ? 10 : 7,
            borderRadius: 9999,
            background: i === b ? C.n800 : C.n200,
            transition: `all 0.25s ${E.s}`,
          }}
        />
      ))}
    </div>
  );
}

function XMark() {
  return (
    <span
      style={{
        fontFamily: F.b,
        fontSize: 18,
        fontWeight: 600,
        color: C.n400,
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 8,
        background: C.n100,
        flexShrink: 0,
      }}
    >
      {'✕'}
    </span>
  );
}

function AmberDot({ size = 14 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 9999,
        background: C.amber,
        flexShrink: 0,
        boxShadow: '0 0 12px rgba(251,185,49,0.45)',
      }}
    />
  );
}

function CtaButton({
  innerRef,
  onClick,
}: {
  innerRef?: (el: HTMLDivElement | null) => void;
  onClick: () => void;
}) {
  return (
    <div ref={innerRef} style={{ opacity: 0, alignSelf: 'flex-start' }}>
      <button
        onClick={onClick}
        className="step-10-cta"
        style={{
          minWidth: 280,
          padding: '20px 36px',
          borderRadius: 14,
          border: 'none',
          background: C.amber,
          fontFamily: F.h,
          fontSize: 18,
          fontWeight: 600,
          color: C.n950,
          letterSpacing: '-0.01em',
          boxShadow: '0 4px 18px rgba(251,185,49,0.28)',
        }}
      >
        View Moha Map
      </button>
    </div>
  );
}

type RefMap = Record<string, HTMLElement | null>;
type RefSetter = (k: string) => (el: HTMLElement | null) => void;

async function animB0($: RefMap) {
  if ($.q) $.q.style.opacity = '0';
  await an(
    $.q,
    [
      { opacity: 0, transform: 'scale(1.02)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    { duration: 800, easing: E.s }
  );
}

async function animB1($: RefMap) {
  ['1l', '1i', '1s', '1h', '1b', '1p'].forEach((k) => {
    if ($[k]) $[k]!.style.opacity = '0';
  });
  await an($['1l'], [{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: E.s });
  await an(
    $['1i'],
    [
      { opacity: 0, transform: 'scale(0.97)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    { duration: 550, easing: E.s }
  );
  await w(100);
  await an(
    $['1s'],
    [
      { opacity: 0, transform: 'translateY(10px) scale(0.92)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' },
    ],
    { duration: 500, easing: E.s }
  );
  await w(150);
  await an($['1h'], [{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: E.s });
  await an($['1b'], [{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: E.s });
  await w(250);
  await an(
    $['1p'],
    [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 500, easing: E.s }
  );
}

async function animB2($: RefMap) {
  ['2l', '2h', '2i', '2s', '2t'].forEach((k) => {
    if ($[k]) $[k]!.style.opacity = '0';
  });
  await an($['2l'], [{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: E.s });
  await an(
    $['2h'],
    [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 450, easing: E.s }
  );
  await an(
    $['2i'],
    [
      { opacity: 0, transform: 'scale(0.97)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    { duration: 600, easing: E.s }
  );
  await w(100);
  await an(
    $['2s'],
    [
      { opacity: 0, transform: 'translateY(12px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 450, easing: E.s }
  );
  await w(100);
  await an(
    $['2t'],
    [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 500, easing: E.s }
  );
}

async function slowTransform($: RefMap, setSolved: (v: boolean) => void) {
  await an($['thOld'], [{ opacity: 1 }, { opacity: 0 }], { duration: 400, easing: E.s });
  await w(300);
  await an(
    $['thNew'],
    [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 600, easing: E.s }
  );
  await w(400);
  for (let i = 0; i < GAPS.length; i++) {
    void an($[`x${i}`], [{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: E.s });
    await w(200);
    await an(
      $[`a${i}`],
      [
        { opacity: 0, transform: 'scale(0.5)' },
        { opacity: 1, transform: 'scale(1)' },
      ],
      { duration: 400, easing: E.s }
    );
    await w(350);
  }
  setSolved(true);
  await w(400);
  if ($['4cta'])
    await an(
      $['4cta'],
      [
        { opacity: 0, transform: 'translateY(6px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 400, easing: E.s }
    );
}

function renderB0(s: RefSetter) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding:
          'calc(96px + var(--safe-top)) var(--content-margin) calc(140px + var(--safe-bottom))',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 1080 }}>
        <span
          style={{
            display: 'block',
            fontFamily: F.b,
            fontSize: 13,
            fontWeight: 500,
            color: C.n600,
            letterSpacing: '0.18em',
            marginBottom: 28,
          }}
        >
          SECTION 5
        </span>
        <h1
          ref={s('q') as (el: HTMLHeadingElement | null) => void}
          style={{
            opacity: 0,
            fontFamily: F.h,
            fontSize: 72,
            fontWeight: 600,
            color: C.n950,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          What are the current options?
        </h1>
      </div>
    </div>
  );
}

function renderB1(s: RefSetter) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding:
          'calc(96px + var(--safe-top)) var(--content-margin) calc(140px + var(--safe-bottom))',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span
        ref={s('1l') as (el: HTMLSpanElement | null) => void}
        style={{
          opacity: 0,
          fontFamily: F.b,
          fontSize: 13,
          fontWeight: 500,
          color: C.n600,
          letterSpacing: '0.18em',
          display: 'block',
          marginBottom: 24,
        }}
      >
        MARKET PROOF
      </span>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr',
          gap: 56,
          alignItems: 'center',
          flex: 1,
        }}
      >
        <div style={{ position: 'relative' }}>
          <div style={{ width: '100%', aspectRatio: '4 / 3' }}>
            <Img
              label="Kusunoki apartment complex"
              innerRef={s('1i') as (el: HTMLDivElement | null) => void}
              style={{ opacity: 0 }}
            />
          </div>
          <div
            ref={s('1s') as (el: HTMLDivElement | null) => void}
            style={{
              opacity: 0,
              position: 'absolute',
              bottom: -28,
              right: 24,
            }}
          >
            <Panel
              elev
              style={{
                padding: '16px 28px',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'baseline',
                gap: 10,
              }}
            >
              <span
                style={{
                  fontFamily: F.h,
                  fontSize: 72,
                  fontWeight: 600,
                  color: C.n950,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                42
              </span>
              <span
                style={{
                  fontFamily: F.b,
                  fontSize: 17,
                  fontWeight: 500,
                  color: C.n600,
                }}
              >
                units
              </span>
            </Panel>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <p
            ref={s('1h') as (el: HTMLParagraphElement | null) => void}
            style={{
              opacity: 0,
              fontFamily: F.h,
              fontSize: 32,
              fontWeight: 600,
              color: C.n950,
              margin: 0,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Fully reserved before completion.
          </p>
          <p
            ref={s('1b') as (el: HTMLParagraphElement | null) => void}
            style={{
              opacity: 0,
              fontFamily: F.b,
              fontSize: 17,
              color: C.n600,
              margin: 0,
              lineHeight: 1.65,
            }}
          >
            Kusunoki complex. Bulk-leased by JASM.
          </p>
          <div
            ref={s('1p') as (el: HTMLDivElement | null) => void}
            style={{ opacity: 0, marginTop: 12 }}
          >
            <Panel elev style={{ padding: '24px 28px' }}>
              <p
                style={{
                  fontFamily: F.h,
                  fontSize: 22,
                  fontWeight: 600,
                  color: C.n950,
                  margin: 0,
                  lineHeight: 1.25,
                  letterSpacing: '-0.01em',
                }}
              >
                The B2B bulk-lease model works. Demand is proven.
              </p>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderB2(s: RefSetter) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding:
          'calc(96px + var(--safe-top)) var(--content-margin) calc(140px + var(--safe-bottom))',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span
        ref={s('2l') as (el: HTMLSpanElement | null) => void}
        style={{
          opacity: 0,
          fontFamily: F.b,
          fontSize: 13,
          fontWeight: 500,
          color: C.n600,
          letterSpacing: '0.18em',
          display: 'block',
          marginBottom: 16,
        }}
      >
        CLOSEST COMPETITOR
      </span>
      <h2
        ref={s('2h') as (el: HTMLHeadingElement | null) => void}
        style={{
          opacity: 0,
          fontFamily: F.h,
          fontSize: 48,
          fontWeight: 600,
          color: C.n950,
          margin: '0 0 36px',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          maxWidth: 980,
        }}
      >
        Current options: housing without solutions
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 56,
          alignItems: 'center',
          flex: 1,
        }}
      >
        <div style={{ position: 'relative' }}>
          <div style={{ width: '100%', aspectRatio: '4 / 3' }}>
            <Img
              label="Formosa Hills"
              innerRef={s('2i') as (el: HTMLDivElement | null) => void}
              style={{ opacity: 0 }}
            />
          </div>
          <div
            ref={s('2s') as (el: HTMLDivElement | null) => void}
            style={{
              opacity: 0,
              position: 'absolute',
              bottom: -28,
              left: 24,
              right: 24,
              display: 'flex',
              gap: 16,
            }}
          >
            <Panel elev style={{ padding: '16px 24px', flex: 1, borderRadius: 16 }}>
              <span
                style={{
                  fontFamily: F.h,
                  fontSize: 48,
                  fontWeight: 600,
                  color: C.n950,
                  display: 'block',
                  lineHeight: 1,
                  letterSpacing: '-0.025em',
                }}
              >
                65
              </span>
              <span
                style={{
                  fontFamily: F.b,
                  fontSize: 15,
                  color: C.n600,
                  fontWeight: 500,
                }}
              >
                units
              </span>
            </Panel>
            <Panel elev style={{ padding: '16px 24px', flex: 1, borderRadius: 16 }}>
              <span
                style={{
                  fontFamily: F.h,
                  fontSize: 48,
                  fontWeight: 600,
                  color: C.n950,
                  display: 'block',
                  lineHeight: 1,
                  letterSpacing: '-0.025em',
                }}
              >
                80%
              </span>
              <span
                style={{
                  fontFamily: F.b,
                  fontSize: 15,
                  color: C.n600,
                  fontWeight: 500,
                }}
              >
                Taiwanese guests
              </span>
            </Panel>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            ref={s('2t') as (el: HTMLDivElement | null) => void}
            style={{ opacity: 0, width: '100%' }}
          >
            <Panel elev style={{ padding: '28px 32px' }}>
              <p
                style={{
                  fontFamily: F.h,
                  fontSize: 22,
                  fontWeight: 600,
                  color: C.n950,
                  margin: 0,
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                }}
              >
                Bilingual management, mail handling, meeting facilities.
              </p>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

function TransformBeat({
  solved,
  s,
  ctaRef,
  onCta,
}: {
  solved: boolean;
  s: RefSetter;
  ctaRef: (el: HTMLDivElement | null) => void;
  onCta: () => void;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding:
          'calc(96px + var(--safe-top)) var(--content-margin) calc(140px + var(--safe-bottom))',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.25fr',
          gap: 64,
          alignItems: 'center',
          flex: 1,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <div style={{ width: '100%', aspectRatio: '4 / 3' }}>
              {!solved && (
                <Img label="Formosa Hills" style={{ opacity: 0.3, filter: 'grayscale(0.6)' }} />
              )}
              {solved && <Img label="MoreHarvest residence" style={{ opacity: 1 }} />}
            </div>
          </div>

          <div aria-live="polite" style={{ position: 'relative', minHeight: 56 }}>
            <p
              ref={s('thOld') as (el: HTMLParagraphElement | null) => void}
              style={{
                fontFamily: F.b,
                fontSize: 13,
                fontWeight: 500,
                color: C.n600,
                margin: 0,
                letterSpacing: '0.18em',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              WHAT THEY DO NOT SOLVE
            </p>
            <p
              ref={s('thNew') as (el: HTMLParagraphElement | null) => void}
              style={{
                opacity: 0,
                fontFamily: F.h,
                fontSize: 48,
                fontWeight: 600,
                color: C.n950,
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              MoreHarvest solves all five.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {GAPS.map((g, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '20px 0',
                borderBottom: i < GAPS.length - 1 ? `1px solid ${C.n100}` : 'none',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 32,
                  height: 32,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  ref={s(`x${i}`) as (el: HTMLDivElement | null) => void}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <XMark />
                </div>
                <div
                  ref={s(`a${i}`) as (el: HTMLDivElement | null) => void}
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AmberDot size={14} />
                </div>
              </div>
              <span
                ref={s(`r${i}`) as (el: HTMLSpanElement | null) => void}
                style={{
                  fontFamily: F.h,
                  fontSize: 22,
                  fontWeight: 600,
                  color: C.n950,
                  letterSpacing: '-0.01em',
                }}
              >
                {g}
              </span>
            </div>
          ))}

          <div style={{ marginTop: 32 }}>
            <CtaButton innerRef={ctaRef} onClick={onCta} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Step10Section5CurrentOptions({
  isActive,
  onComplete,
  onBack,
}: StepProps) {
  const [beat, setBeat] = useState(0);
  const [solved, setSolved] = useState(false);
  const [transforming, setTransforming] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refs = useRef<RefMap>({});
  const s: RefSetter = (k) => (el) => {
    refs.current[k] = el;
  };

  useEffect(() => {
    if (!isActive) return;
    const $ = refs.current;
    let cancelled = false;
    (async () => {
      if (cancelled) return;
      if (beat === 0) await animB0($);
      else if (beat === 1) await animB1($);
      else if (beat === 2) await animB2($);
      else if (beat === 3 && !solved) {
        GAPS.forEach((_, i) => {
          if ($[`r${i}`]) $[`r${i}`]!.style.opacity = '0';
        });
        if ($.thOld) $.thOld.style.opacity = '0';
        if (cancelled) return;
        await an($.thOld, [{ opacity: 0 }, { opacity: 1 }], {
          duration: 350,
          easing: E.s,
        });
        // Variant A "the flip": fade + small leftward translate per row
        await w(150);
        for (let i = 0; i < GAPS.length; i++) {
          if (cancelled) return;
          await an(
            $[`r${i}`],
            [
              { opacity: 0, transform: 'translateX(-8px)' },
              { opacity: 1, transform: 'translateX(0)' },
            ],
            { duration: 280, easing: E.s }
          );
          await w(140);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isActive, beat, solved]);

  const beginExit = useCallback(() => {
    if (exiting) return;
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => setExiting(true), EXIT_DELAY_MS);
  }, [exiting]);

  const advance = useCallback(() => {
    if (exiting || transforming) return;
    if (beat < 3) {
      setBeat((b) => b + 1);
      return;
    }
    if (beat === 3 && !solved) {
      setTransforming(true);
      void slowTransform(refs.current, setSolved).finally(() => setTransforming(false));
      return;
    }
    beginExit();
  }, [beat, solved, exiting, transforming, beginExit]);

  const goBack = useCallback(() => {
    if (exiting || transforming) return;
    if (beat > 0) {
      if (beat === 3) setSolved(false);
      setBeat((b) => b - 1);
      return;
    }
    onBack?.();
  }, [beat, exiting, transforming, onBack]);

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
    <div className="relative w-full h-full" style={{ background: C.bg }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-step-10] *,
          [data-step-10] *::before,
          [data-step-10] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
        .step-10-cta { transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1); }
        .step-10-cta:active { transform: scale(0.97); }
      `}</style>
      <div
        data-step-10
        style={{
          position: 'absolute',
          inset: 0,
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'scale(0.97)' : 'scale(1)',
          transition: `opacity ${EXIT_DURATION_MS}ms ${E.s}, transform ${EXIT_DURATION_MS}ms ${E.s}`,
        }}
      >
        <Dots b={Math.min(beat, 3)} t={4} />

        {beat === 0 && renderB0(s)}
        {beat === 1 && renderB1(s)}
        {beat === 2 && renderB2(s)}
        {beat === 3 && (
          <TransformBeat
            solved={solved}
            s={s}
            ctaRef={(el) => {
              refs.current['4cta'] = el;
            }}
            onCta={beginExit}
          />
        )}

        <BackButton onClick={goBack} visible={!transforming} />
        <NextButton onClick={advance} visible={!transforming && !(beat === 3 && solved)} />
      </div>
    </div>
  );
}
