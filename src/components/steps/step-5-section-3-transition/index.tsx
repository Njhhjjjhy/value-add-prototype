'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { step5 } from '@/content';

const COPY = step5.prototype;

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

const COLLAPSE_DURATION_MS = 3800;
const GHOST_FADE_MS = 1200;
const COMPLETE_DELAY_MS = 200;
const PARTICLE_COUNT = 500;

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
            {COPY.ghost.caption}
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
            {COPY.ghost.stats[0].value}
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
            {COPY.ghost.stats[0].label}
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
            {COPY.ghost.stats[1].value}
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
            {COPY.ghost.stats[1].label}
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
        {COPY.ghost.body.map((t, i) => (
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
        {COPY.continuePrompt}
      </span>
    </div>
  );
}

interface Particle {
  origX: number;
  origY: number;
  size: number;
  speed: number;
  brightness: number;
  isAmber: boolean;
}

export default function Step5Section3Transition({ isActive, onComplete }: StepProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[] | null>(null);
  const completed = useRef(false);
  const [phase, setPhase] = useState<'ready' | 'collapsing' | 'done'>('ready');

  useEffect(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 100 + Math.random() * 700;
      particles.push({
        origX: Math.cos(angle) * dist,
        origY: Math.sin(angle) * dist,
        size: 1.5 + Math.random() * 3.5,
        speed: 0.3 + Math.random() * 0.7,
        brightness: 0.2 + Math.random() * 0.5,
        isAmber: Math.random() < 0.25,
      });
    }
    particlesRef.current = particles;
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

  const startCollapse = useCallback(() => {
    if (phase !== 'ready') return;
    setPhase('collapsing');

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H * 0.45;
    const particles = particlesRef.current ?? [];
    const start = performance.now();

    const draw = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / COLLAPSE_DURATION_MS, 1);
      ctx.clearRect(0, 0, W, H);

      let collapse: number;
      if (t < 0.15) {
        collapse = (t / 0.15) * 0.05;
      } else if (t < 0.55) {
        collapse = 0.05 + ((t - 0.15) / 0.4) * 0.55;
      } else if (t < 0.82) {
        collapse = 0.6 + ((t - 0.55) / 0.27) * 0.35;
      } else {
        collapse = 0.95 + ((t - 0.82) / 0.18) * 0.05;
      }

      // Echo rings — only during the active collapse phase
      if (t > 0.1 && t < 0.85) {
        const distT = (t - 0.1) / 0.75;
        for (let r = 0; r < 5; r++) {
          const radius = (1 - distT * 0.7) * (160 + r * 120);
          const alpha = Math.sin(distT * Math.PI) * 0.06 * (1 - r / 5);
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(237,238,241,${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      for (const p of particles) {
        const pull = collapse * p.speed;
        const px = p.origX * (1 - pull);
        const py = p.origY * (1 - pull);
        const sx = cx + px;
        const sy = cy + py;

        if (collapse > 0.2) {
          const tx = cx + px * (1 + collapse * 0.08);
          const ty = cy + py * (1 + collapse * 0.08);
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(tx, ty);
          ctx.strokeStyle = p.isAmber
            ? `rgba(251,185,49,${p.brightness * 0.3 * Math.min(collapse, 0.8)})`
            : `rgba(138,143,154,${p.brightness * 0.3 * Math.min(collapse, 0.8)})`;
          ctx.lineWidth = p.size * 0.5;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, p.size * (1 - collapse * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = p.isAmber
          ? `rgba(251,185,49,${p.brightness * (1 - collapse * 0.5)})`
          : `rgba(169,169,175,${p.brightness * (1 - collapse * 0.5)})`;
        ctx.fill();
      }

      if (t > 0.82) {
        const flashAlpha = ((t - 0.82) / 0.18) ** 2;
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
      onClick={phase === 'ready' ? startCollapse : undefined}
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

      {(phase === 'ready' || phase === 'collapsing') && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: phase === 'collapsing' ? 0 : 1,
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
