'use client';

import { useEffect, useRef } from 'react';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const C = {
  bg: '#F9F9F9',
  curtain: '#25272C',
  amber: '#FBB931',
};

const SWEEP_IN_MS = 600;
const HOLD_MS = 250;
const SWEEP_OUT_MS = 500;
const TOTAL_MS = SWEEP_IN_MS + HOLD_MS + SWEEP_OUT_MS;

export default function Step21PdfTransition({ isActive, onComplete }: StepProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (!isActive) return;
    if (fired.current) return;
    fired.current = true;
    const t = setTimeout(() => onComplete(), TOTAL_MS);
    return () => clearTimeout(t);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div
      data-step-21
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes step21CurtainSweep {
          0%   { left: -100%; }
          ${((SWEEP_IN_MS / TOTAL_MS) * 100).toFixed(2)}% { left: 0%; }
          ${(((SWEEP_IN_MS + HOLD_MS) / TOTAL_MS) * 100).toFixed(2)}% { left: 0%; }
          100% { left: 100%; }
        }
        @keyframes step21AmberEdge {
          0%, ${((SWEEP_IN_MS / TOTAL_MS) * 100).toFixed(2)}% { opacity: 0; }
          ${(((SWEEP_IN_MS + 80) / TOTAL_MS) * 100).toFixed(2)}%, ${(((SWEEP_IN_MS + HOLD_MS) / TOTAL_MS) * 100).toFixed(2)}% { opacity: 1; }
          100% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-step-21] * {
            animation: none !important;
          }
        }
      `}</style>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: C.curtain,
          animation: `step21CurtainSweep ${TOTAL_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 2,
            height: '100%',
            background: C.amber,
            boxShadow: '0 0 24px rgba(251,185,49,0.5)',
            opacity: 0,
            animation: `step21AmberEdge ${TOTAL_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
          }}
        />
      </div>
    </div>
  );
}
