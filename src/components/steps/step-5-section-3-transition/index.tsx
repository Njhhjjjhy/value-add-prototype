'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  bg: '#F9F9F9',
  n600: '#5B616E',
  n800: '#40444C',
  n950: '#25272C',
  amber: '#FBB931',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const WARP_DURATION_MS = 4000;
const GHOST_FADE_MS = 1400;
const COMPLETE_DELAY_MS = 200;

function GlassPanel({
  level = 1,
  borderRadius = 20,
  children,
  style = {},
}: {
  level?: 1 | 2;
  borderRadius?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const isL2 = level === 2;
  return (
    <div
      style={{
        position: 'relative',
        borderRadius,
        background: '#F9F9F9',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: isL2
          ? '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)'
          : '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

function GhostBridge() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding:
          'calc(96px + var(--safe-top)) var(--content-margin) calc(64px + var(--safe-bottom))',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <GlassPanel
          level={2}
          style={{
            padding: '40px 44px',
            flex: '1 1 520px',
            minWidth: 360,
          }}
        >
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 500,
              color: C.n600,
              margin: '0 0 16px',
              letterSpacing: '0.18em',
            }}
          >
            SEMICONDUCTOR INVESTMENT CORRIDOR
          </p>
          <p
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 96,
              color: C.n950,
              margin: '0 0 8px',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            10T
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 17,
              fontWeight: 500,
              color: C.n600,
              margin: 0,
            }}
          >
            yen in confirmed investment
          </p>
        </GlassPanel>
        <GlassPanel
          level={1}
          style={{
            padding: '32px 36px',
            flex: '1 1 360px',
            minWidth: 280,
            alignSelf: 'flex-start',
          }}
        >
          <p
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 56,
              color: C.n950,
              margin: '0 0 8px',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            47,000
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 15,
              fontWeight: 500,
              color: C.n600,
              margin: 0,
            }}
          >
            new jobs projected by 2027
          </p>
        </GlassPanel>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          maxWidth: 880,
        }}
      >
        {[
          'TSMC / JASM fab complex',
          'Sony semiconductor expansion',
          'Government infrastructure program',
        ].map((t, i) => (
          <GlassPanel
            key={i}
            level={1}
            borderRadius={12}
            style={{
              padding: '20px 28px',
              opacity: 0.78 - i * 0.08,
            }}
          >
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 17,
                fontWeight: 500,
                color: C.n800,
                margin: 0,
              }}
            >
              {t}
            </p>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}

function ReadyPrompt() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 'calc(64px + var(--safe-bottom))',
        left: 'var(--content-margin)',
        right: 'var(--content-margin)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: C.amber,
        }}
      />
      <span
        style={{
          fontFamily: FONT_BODY,
          fontWeight: 500,
          fontSize: 15,
          color: C.n600,
        }}
      >
        Tap to continue
      </span>
    </div>
  );
}

interface WarpLine {
  angle: number;
  baseDist: number;
  speedMult: number;
  maxDist: number;
  isAmber: boolean;
  brightness: number;
  thickness: number;
}

export default function Step5Section3Transition({ isActive, onComplete }: StepProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const linesRef = useRef<WarpLine[] | null>(null);
  const completed = useRef(false);
  const [phase, setPhase] = useState<'ready' | 'warping' | 'done'>('ready');

  useEffect(() => {
    const lines: WarpLine[] = [];
    for (let i = 0; i < 700; i++) {
      lines.push({
        angle: Math.random() * Math.PI * 2,
        baseDist: 40 + Math.random() * 160,
        speedMult: 0.5 + Math.random() * 1.5,
        maxDist: 600 + Math.random() * 800,
        isAmber: Math.random() < 0.35,
        brightness: 0.4 + Math.random() * 0.6,
        thickness: 0.8 + Math.random() * 2.0,
      });
    }
    linesRef.current = lines;
  }, []);

  useEffect(() => {
    completed.current = false;
    setPhase('ready');
  }, [isActive]);

  useEffect(
    () => () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    },
    []
  );

  const startWarp = useCallback(() => {
    if (phase !== 'ready') return;
    setPhase('warping');

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H * 0.42;
    const lines = linesRef.current ?? [];
    const start = performance.now();

    const draw = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / WARP_DURATION_MS, 1);
      ctx.clearRect(0, 0, W, H);

      let accel: number;
      let lineAlpha: number;
      if (t < 0.2) {
        const p = t / 0.2;
        accel = p * 0.03;
        lineAlpha = p * 0.15;
      } else if (t < 0.4) {
        const p = (t - 0.2) / 0.2;
        accel = 0.03 + p * 0.07;
        lineAlpha = 0.15 + p * 0.15;
      } else if (t < 0.6) {
        const p = (t - 0.4) / 0.2;
        accel = 0.1 + p * 0.25;
        lineAlpha = 0.3 + p * 0.2;
      } else if (t < 0.78) {
        const p = (t - 0.6) / 0.18;
        accel = 0.35 + p * 0.35;
        lineAlpha = 0.5 + p * 0.25;
      } else if (t < 0.9) {
        const p = (t - 0.78) / 0.12;
        accel = 0.7 + p * 0.3;
        lineAlpha = 0.75 + p * 0.25;
      } else {
        accel = 1.0;
        lineAlpha = 1.0;
      }

      const coolMix = Math.min(t * 1.2, 1);

      for (const line of lines) {
        const dist = line.baseDist + accel * line.speedMult * line.maxDist;
        const len = 4 + accel * line.speedMult * 120;
        const x1 = cx + Math.cos(line.angle) * dist;
        const y1 = cy + Math.sin(line.angle) * dist;
        const x2 = cx + Math.cos(line.angle) * (dist - len);
        const y2 = cy + Math.sin(line.angle) * (dist - len);

        let r: number;
        let g: number;
        let b: number;
        if (line.isAmber) {
          r = Math.round(251 - coolMix * 82);
          g = Math.round(185 - coolMix * 16);
          b = Math.round(49 + coolMix * 120);
        } else {
          r = Math.round(169 - coolMix * 20);
          g = Math.round(169 - coolMix * 15);
          b = Math.round(169 + coolMix * 10);
        }

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha * line.brightness * 0.6})`;
        ctx.lineWidth = line.thickness;
        ctx.stroke();
      }

      if (t > 0.9) {
        const flashAlpha = ((t - 0.9) / 0.1) ** 3;
        ctx.fillStyle = `rgba(249,249,249,${flashAlpha * 0.95})`;
        ctx.fillRect(0, 0, W, H);
      }

      if (t < 1) {
        animRef.current = requestAnimationFrame(draw);
      } else {
        setPhase('done');
        if (!completed.current) {
          completed.current = true;
          setTimeout(() => onComplete(), COMPLETE_DELAY_MS);
        }
      }
    };
    animRef.current = requestAnimationFrame(draw);
  }, [phase, onComplete]);

  if (!isActive) return null;

  return (
    <div
      data-step-5
      onClick={phase === 'ready' ? startWarp : undefined}
      role="button"
      tabIndex={0}
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        overflow: 'hidden',
        fontFamily: FONT_BODY,
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-step-5] *,
          [data-step-5] *::before,
          [data-step-5] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>

      {(phase === 'ready' || phase === 'warping') && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: phase === 'warping' ? 0 : 1,
            transition: `opacity ${GHOST_FADE_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
          }}
        >
          <GhostBridge />
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={1366}
        height={1024}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {phase === 'ready' && <ReadyPrompt />}
    </div>
  );
}
