'use client';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

export default function Step9Section5Transition({ onComplete }: StepProps) {
  return (
    <button
      type="button"
      onClick={onComplete}
      className="absolute inset-0 w-full h-full flex items-center justify-center text-left"
      style={{ background: '#F9F9F9', fontFamily: FONT_BODY }}
    >
      <span style={{ fontSize: 13, letterSpacing: '0.01em', color: '#5B616E' }}>
        Section 5 · transition
      </span>
    </button>
  );
}
