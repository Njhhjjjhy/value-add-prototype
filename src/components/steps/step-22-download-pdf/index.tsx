'use client';

import { useEffect, useState } from 'react';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const C = {
  heading: '#25272C',
  bg: '#F9F9F9',
  amber: '#FBB931',
  amberPressed: '#E79B00',
};

const MOUNT_DELAY_MS = 80;

export default function Step22DownloadPdf({ isActive, onComplete }: StepProps) {
  const [mounted, setMounted] = useState(false);
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setMounted(false);
      return;
    }
    const t = setTimeout(() => setMounted(true), MOUNT_DELAY_MS);
    return () => clearTimeout(t);
  }, [isActive]);

  if (!isActive) return null;

  const handleClick = () => {
    onComplete();
    window.location.assign('/pdf');
  };

  return (
    <div
      data-step-22
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        padding: 'var(--safe-top) var(--content-margin) var(--safe-bottom)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button
        type="button"
        onPointerDown={() => setPressing(true)}
        onPointerUp={() => setPressing(false)}
        onPointerLeave={() => setPressing(false)}
        onPointerCancel={() => setPressing(false)}
        onClick={handleClick}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 17,
          fontWeight: 600,
          color: C.heading,
          background: pressing ? C.amberPressed : C.amber,
          border: 'none',
          borderRadius: 9999,
          padding: '0 36px',
          height: 56,
          minWidth: 240,
          boxShadow: pressing
            ? '0 1px 4px rgba(0,0,0,0.10)'
            : '0 2px 12px rgba(251,185,49,0.35), 0 1px 3px rgba(0,0,0,0.08)',
          transform: pressing ? 'scale(0.98)' : mounted ? 'scale(1)' : 'scale(0.97)',
          opacity: mounted ? 1 : 0,
          transition:
            'transform 160ms cubic-bezier(0.4, 0, 0.2, 1), background 160ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 160ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms cubic-bezier(0,0,0.2,1) 220ms',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        Download PDF
      </button>
    </div>
  );
}
