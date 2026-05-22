'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import BackButton from '@/components/shared/BackButton';
import NextButton from '@/components/shared/NextButton';
import { step22 } from '@/content';

const COPY = step22.prototype;

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  bg: '#F9F9F9',
  amber: '#FBB931',
  n950: '#25272C',
  n800: '#40444C',
  n600: '#5B616E',
  n200: '#D8DBDF',
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
  settle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

type Stat = { value: string; label: string; sub: string };
const STATS: Stat[] = COPY.beat2.stats.map((s) => ({
  value: s.stat,
  label: s.label,
  sub: s.sub,
}));

type TimelineEntry = { y: string; t: string; d: string };
const TIMELINE: TimelineEntry[] = COPY.beat3.timeline.map((t) => ({
  y: t.year,
  t: t.title,
  d: t.detail,
}));

type RiskEntry = { name: string; risk: string; hedges: readonly string[] };
const RISKS: RiskEntry[] = COPY.beat5.risks.map((r) => ({
  name: r.name,
  risk: r.risk,
  hedges: r.hedges,
}));

const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animate = (
  el: Element | null | undefined,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions
): Promise<void> => {
  if (!el) return Promise.resolve();
  return new Promise((resolve) => {
    const a = el.animate(keyframes, { fill: 'forwards', ...options });
    a.finished.then(() => resolve()).catch(() => resolve());
  });
};

function useLandscape() {
  const [landscape, setLandscape] = useState(true);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(orientation: landscape)');
    const update = () => setLandscape(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return landscape;
}

function BeatShell({
  refEl,
  visible,
  children,
}: {
  refEl: React.Ref<HTMLDivElement>;
  visible: boolean;
  children: ReactNode;
}) {
  return (
    <div
      ref={refEl}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: visible ? 5 : 1,
        visibility: visible ? 'visible' : 'hidden',
        opacity: 0,
      }}
    >
      {children}
    </div>
  );
}

function BeatLabel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        fontSize: 15,
        color: C.n600,
        letterSpacing: '0.04em',
        marginBottom: 28,
      }}
    >
      {children}
    </div>
  );
}

function Beat1Thesis({ landscape }: { landscape: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding:
          'calc(120px + var(--safe-top)) var(--content-margin) calc(120px + var(--safe-bottom))',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize: 15,
          color: C.n600,
          letterSpacing: '0.04em',
          marginBottom: 32,
        }}
      >
        {COPY.beat1.caption}
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
          fontSize: landscape ? 64 : 56,
          lineHeight: 1.1,
          color: C.n950,
          letterSpacing: '-0.025em',
          maxWidth: landscape ? 1100 : 880,
          margin: 0,
        }}
      >
        {COPY.beat1.headline}
      </h2>
    </div>
  );
}

function Beat2Stats({
  tileRefs,
  landscape,
}: {
  tileRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
  landscape: boolean;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        padding:
          'calc(96px + var(--safe-top)) var(--content-margin) calc(96px + var(--safe-bottom))',
      }}
    >
      <BeatLabel>{COPY.beat2.captionLabel}</BeatLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: landscape ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
          gap: landscape ? 24 : 20,
          flex: 1,
          alignContent: 'center',
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            style={{
              ...PANEL_LEVEL_1,
              borderRadius: 20,
              padding: landscape ? '32px 28px' : '28px 24px',
              opacity: 0,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: landscape ? 56 : 48,
                lineHeight: 1,
                color: C.n950,
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.02em',
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                lineHeight: 1.4,
                color: C.n800,
                marginTop: 16,
                fontWeight: 500,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                lineHeight: 1.5,
                color: C.n600,
                marginTop: 6,
              }}
            >
              {s.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type TlRow = {
  dot: HTMLDivElement | null;
  line: HTMLDivElement | null;
  text: HTMLDivElement | null;
};

function Beat3Timeline({
  rowRefs,
  landscape,
}: {
  rowRefs: React.MutableRefObject<TlRow[]>;
  landscape: boolean;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        padding:
          'calc(96px + var(--safe-top)) var(--content-margin) calc(96px + var(--safe-bottom))',
      }}
    >
      <BeatLabel>{COPY.beat3.captionLabel}</BeatLabel>
      <div
        style={{
          ...PANEL_LEVEL_1,
          borderRadius: 20,
          padding: landscape ? '48px 56px' : '40px 36px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {TIMELINE.map((t, i) => {
            const isLast = i === TIMELINE.length - 1;
            const dotSize = i === 0 ? 20 : 14;
            return (
              <div key={t.y} style={{ display: 'flex', gap: 28 }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                    width: 28,
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: dotSize,
                      height: dotSize,
                      flexShrink: 0,
                    }}
                  >
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 9999,
                        border: `2px solid ${C.n200}`,
                        opacity: 0.4,
                      }}
                    />
                    <div
                      ref={(el) => {
                        if (!rowRefs.current[i])
                          rowRefs.current[i] = { dot: null, line: null, text: null };
                        rowRefs.current[i].dot = el;
                      }}
                      aria-hidden
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 9999,
                        background: C.amber,
                        transform: 'scale(0)',
                      }}
                    />
                  </div>
                  {!isLast && (
                    <div
                      style={{
                        width: 2,
                        flex: 1,
                        minHeight: landscape ? 48 : 40,
                        marginTop: 6,
                        position: 'relative',
                        borderRadius: 1,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: C.n200,
                          opacity: 0.25,
                        }}
                      />
                      <div
                        ref={(el) => {
                          if (!rowRefs.current[i])
                            rowRefs.current[i] = {
                              dot: null,
                              line: null,
                              text: null,
                            };
                          rowRefs.current[i].line = el;
                        }}
                        aria-hidden
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: C.amber,
                          transformOrigin: 'top',
                          transform: 'scaleY(0)',
                        }}
                      />
                    </div>
                  )}
                </div>
                <div
                  ref={(el) => {
                    if (!rowRefs.current[i])
                      rowRefs.current[i] = { dot: null, line: null, text: null };
                    rowRefs.current[i].text = el;
                  }}
                  style={{
                    paddingBottom: isLast ? 0 : landscape ? 36 : 30,
                    opacity: 0,
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      fontSize: 15,
                      color: C.n600,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {t.y}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      fontSize: landscape ? 28 : 24,
                      lineHeight: 1.2,
                      color: C.n950,
                      marginTop: 6,
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {t.t}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 17,
                      lineHeight: 1.55,
                      color: C.n800,
                      marginTop: 8,
                      maxWidth: landscape ? 760 : 620,
                    }}
                  >
                    {t.d}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Beat4MohaIntel({ landscape }: { landscape: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding:
          'calc(120px + var(--safe-top)) var(--content-margin) calc(120px + var(--safe-bottom))',
      }}
    >
      <div
        style={{
          ...PANEL_LEVEL_2,
          borderRadius: 28,
          padding: landscape ? '64px 72px' : '52px 44px',
          maxWidth: landscape ? 1080 : 880,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: landscape ? 40 : 32,
            lineHeight: 1.2,
            color: C.n950,
            marginBottom: 24,
            letterSpacing: '-0.02em',
          }}
        >
          {COPY.beat4.heading}
        </div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: landscape ? 22 : 18,
            lineHeight: 1.6,
            color: C.n800,
            fontWeight: 400,
            margin: 0,
          }}
        >
          {COPY.beat4.body}
        </p>
      </div>
    </div>
  );
}

function Beat5Risks({
  openIdx,
  setOpenIdx,
  landscape,
}: {
  openIdx: number;
  setOpenIdx: (n: number) => void;
  landscape: boolean;
}) {
  const columns = landscape ? 2 : 1;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        padding:
          'calc(88px + var(--safe-top)) var(--content-margin) calc(96px + var(--safe-bottom))',
      }}
    >
      <BeatLabel>{COPY.beat5.caption}</BeatLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          columnGap: landscape ? 24 : 0,
          rowGap: landscape ? 14 : 12,
          flex: 1,
          alignContent: 'start',
        }}
      >
        {RISKS.map((r, i) => {
          const open = openIdx === i;
          const toggle = () => setOpenIdx(open ? -1 : i);
          return (
            <div
              key={r.name}
              role="button"
              tabIndex={0}
              aria-expanded={open}
              aria-label={r.name}
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  toggle();
                }
              }}
              style={{
                ...PANEL_LEVEL_1,
                borderRadius: 20,
                padding: landscape ? '22px 28px' : '20px 24px',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      fontSize: 17,
                      lineHeight: 1.4,
                      color: C.n950,
                    }}
                  >
                    {r.name}
                  </div>
                  <div
                    style={{
                      maxHeight: open ? 360 : 0,
                      overflow: 'hidden',
                      transition: `max-height 320ms ${EASE.smooth}, opacity 320ms ${EASE.smooth}`,
                      opacity: open ? 1 : 0,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: C.n800,
                        marginTop: 12,
                      }}
                    >
                      {r.risk}
                    </div>
                    <ul
                      style={{
                        margin: '10px 0 0',
                        padding: 0,
                        listStyle: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                      }}
                    >
                      {r.hedges.map((h, hi) => (
                        <li
                          key={hi}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 15,
                            lineHeight: 1.55,
                            color: C.n800,
                            paddingLeft: 14,
                            position: 'relative',
                          }}
                        >
                          <span
                            aria-hidden
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: 8,
                              width: 6,
                              height: 2,
                              background: C.amber,
                              borderRadius: 1,
                            }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div
                  aria-hidden
                  style={{
                    fontSize: 18,
                    color: C.n600,
                    flexShrink: 0,
                    transform: open ? 'rotate(180deg)' : 'rotate(0)',
                    transition: `transform 300ms ${EASE.smooth}`,
                    lineHeight: 1.2,
                  }}
                >
                  ▾
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Step18Section9RiskFactors({
  isActive,
  onComplete,
  onBack,
}: StepProps) {
  const landscape = useLandscape();
  const [beat, setBeat] = useState(0);
  const [openRisk, setOpenRisk] = useState(-1);
  const [exiting, setExiting] = useState(false);

  const busy = useRef(false);
  const beatRefs = useRef<Array<HTMLDivElement | null>>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tlRowRefs = useRef<TlRow[]>([
    { dot: null, line: null, text: null },
    { dot: null, line: null, text: null },
    { dot: null, line: null, text: null },
    { dot: null, line: null, text: null },
  ]);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelledRef = useRef(false);

  const enterBeat = useCallback(async (n: number) => {
    if (cancelledRef.current) return;
    const target = beatRefs.current[n - 1];
    if (!target) return;

    if (reducedMotion()) {
      target.style.opacity = '1';
      target.style.transform = 'none';
      tileRefs.current.forEach((el) => {
        if (el) el.style.opacity = '1';
      });
      tlRowRefs.current.forEach((r) => {
        if (r.dot) r.dot.style.transform = 'scale(1)';
        if (r.line) r.line.style.transform = 'scaleY(1)';
        if (r.text) r.text.style.opacity = '1';
      });
      return;
    }

    if (n === 1) {
      await animate(
        target,
        [
          { opacity: 0, transform: 'scale(1.06)' },
          { opacity: 0.4, transform: 'scale(1.04)', offset: 0.4 },
          { opacity: 0.8, transform: 'scale(1.01)', offset: 0.8 },
          { opacity: 1, transform: 'scale(1)' },
        ],
        { duration: 1000, easing: EASE.settle }
      );
    } else if (n === 2) {
      await animate(
        target,
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 200, easing: EASE.smooth }
      );
      for (let i = 0; i < STATS.length; i++) {
        if (cancelledRef.current) return;
        animate(
          tileRefs.current[i],
          [
            { opacity: 0, transform: 'translateY(20px) scale(0.97)' },
            { opacity: 1, transform: 'translateY(0) scale(1)' },
          ],
          { duration: 400, easing: EASE.spring }
        );
        if (i < STATS.length - 1) await wait(120);
      }
      await wait(400 - 120);
    } else if (n === 3) {
      await animate(
        target,
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 200, easing: EASE.smooth }
      );
      for (let i = 0; i < TIMELINE.length; i++) {
        if (cancelledRef.current) return;
        const r = tlRowRefs.current[i];
        if (r.dot) {
          animate(
            r.dot,
            [
              { transform: 'scale(0)' },
              { transform: 'scale(1.4)', offset: 0.6 },
              { transform: 'scale(1)' },
            ],
            { duration: 350, easing: EASE.spring }
          );
        }
        if (r.text) {
          animate(
            r.text,
            [
              { opacity: 0, transform: 'translateX(-12px)' },
              { opacity: 1, transform: 'translateX(0)' },
            ],
            { duration: 350, easing: EASE.settle }
          );
        }
        await wait(300);
        if (cancelledRef.current) return;
        if (r.line) {
          await animate(
            r.line,
            [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }],
            { duration: 320, easing: EASE.settle }
          );
        }
        await wait(40);
      }
    } else if (n === 4) {
      await animate(
        target,
        [
          { opacity: 0, transform: 'translateY(20px) scale(0.97)' },
          { opacity: 1, transform: 'translateY(0) scale(1)' },
        ],
        { duration: 450, easing: EASE.spring }
      );
    } else if (n === 5) {
      await animate(
        target,
        [
          { opacity: 0, transform: 'translateY(16px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 400, easing: EASE.spring }
      );
    }
  }, []);

  const exitBeat = useCallback(async (n: number) => {
    const target = beatRefs.current[n - 1];
    if (!target) return;
    if (reducedMotion()) {
      target.style.opacity = '0';
      return;
    }
    await animate(
      target,
      [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0.5, transform: 'scale(0.98)', offset: 0.5 },
        { opacity: 0, transform: 'scale(0.96)' },
      ],
      { duration: 300, easing: EASE.gentle }
    );
  }, []);

  useEffect(() => {
    if (!isActive) {
      cancelledRef.current = true;
      busy.current = false;
      setBeat(0);
      setOpenRisk(-1);
      setExiting(false);
      return;
    }
    cancelledRef.current = false;
    busy.current = true;
    setBeat(1);
    enterBeat(1).then(() => {
      busy.current = false;
    });
    return () => {
      cancelledRef.current = true;
    };
  }, [isActive, enterBeat]);

  const advanceBeat = useCallback(async () => {
    if (busy.current) return;
    if (beat < 1 || beat >= 5) return;
    busy.current = true;
    const current = beat;
    const next = current + 1;
    await exitBeat(current);
    if (cancelledRef.current) {
      busy.current = false;
      return;
    }
    await wait(200);
    if (cancelledRef.current) {
      busy.current = false;
      return;
    }
    setBeat(next);
    await enterBeat(next);
    busy.current = false;
  }, [beat, enterBeat, exitBeat]);

  const reverseBeat = useCallback(async () => {
    if (busy.current) return;
    if (beat <= 1) {
      if (onBack) onBack();
      return;
    }
    busy.current = true;
    setOpenRisk(-1);
    const current = beat;
    const prev = current - 1;
    await exitBeat(current);
    if (cancelledRef.current) {
      busy.current = false;
      return;
    }
    await wait(200);
    if (cancelledRef.current) {
      busy.current = false;
      return;
    }
    setBeat(prev);
    await enterBeat(prev);
    busy.current = false;
  }, [beat, enterBeat, exitBeat, onBack]);

  const advanceStep = useCallback(() => {
    if (exiting) return;
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => setExiting(true), EXIT_DELAY_MS);
  }, [exiting]);

  const onForward = useCallback(() => {
    if (beat < 5) advanceBeat();
    else advanceStep();
  }, [beat, advanceBeat, advanceStep]);

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

  return (
    <div
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
      role={beat < 5 ? 'button' : undefined}
      tabIndex={beat < 5 ? 0 : -1}
      aria-label={beat < 5 ? COPY.continueAriaLabel : undefined}
      onClick={() => {
        if (beat < 5) advanceBeat();
      }}
      onKeyDown={(e) => {
        if (beat < 5 && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          advanceBeat();
        }
      }}
    >
      <BeatShell
        refEl={(el) => {
          beatRefs.current[0] = el;
        }}
        visible={beat === 1}
      >
        <Beat1Thesis landscape={landscape} />
      </BeatShell>
      <BeatShell
        refEl={(el) => {
          beatRefs.current[1] = el;
        }}
        visible={beat === 2}
      >
        <Beat2Stats tileRefs={tileRefs} landscape={landscape} />
      </BeatShell>
      <BeatShell
        refEl={(el) => {
          beatRefs.current[2] = el;
        }}
        visible={beat === 3}
      >
        <Beat3Timeline rowRefs={tlRowRefs} landscape={landscape} />
      </BeatShell>
      <BeatShell
        refEl={(el) => {
          beatRefs.current[3] = el;
        }}
        visible={beat === 4}
      >
        <Beat4MohaIntel landscape={landscape} />
      </BeatShell>
      <BeatShell
        refEl={(el) => {
          beatRefs.current[4] = el;
        }}
        visible={beat === 5}
      >
        <Beat5Risks
          openIdx={openRisk}
          setOpenIdx={setOpenRisk}
          landscape={landscape}
        />
      </BeatShell>

      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 'calc(40px + var(--safe-bottom))',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 80,
          pointerEvents: 'none',
          opacity: beat >= 1 && !exiting ? 1 : 0,
          transition: `opacity 250ms ${EASE.smooth}`,
        }}
      >
        {Array.from({ length: 5 }, (_, i) => {
          const active = i === beat - 1;
          return (
            <div
              key={i}
              style={{
                width: active ? 14 : 9,
                height: active ? 14 : 9,
                borderRadius: 9999,
                background: active ? C.amber : C.n200,
                transition: `width 200ms ${EASE.spring}, height 200ms ${EASE.spring}, background 200ms ${EASE.smooth}`,
              }}
            />
          );
        })}
      </div>

      <BackButton onClick={reverseBeat} visible={beat >= 1 && !exiting} />
      <NextButton onClick={onForward} visible={beat >= 1 && !exiting} />
    </div>
  );
}
