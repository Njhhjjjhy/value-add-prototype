'use client';

import { useEffect, useRef } from 'react';
import { step17 } from '@/content';
import { usePropertyMapHost } from '../../shared/PropertyMapHost';

const COPY = step17.prototype;

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

const LIFT_DURATION_MS = 2000;
const LIFT_TO_RESOLVE_PAUSE_MS = 500;
const RESOLVE_DURATION_MS = 750;
const RESOLVE_TO_HEADING_PAUSE_MS = 200;
const HEADING_DURATION_MS = 600;
const HEADING_TO_BODY_PAUSE_MS = 150;
const BODY_DURATION_MS = 450;
const BODY_TO_PROMPT_PAUSE_MS = 300;
const PROMPT_DURATION_MS = 400;

const TOTAL_DURATION_MS =
  LIFT_DURATION_MS +
  LIFT_TO_RESOLVE_PAUSE_MS +
  RESOLVE_DURATION_MS +
  RESOLVE_TO_HEADING_PAUSE_MS +
  HEADING_DURATION_MS +
  HEADING_TO_BODY_PAUSE_MS +
  BODY_DURATION_MS +
  BODY_TO_PROMPT_PAUSE_MS +
  PROMPT_DURATION_MS;

const RESOLVE_DELAY_MS = LIFT_DURATION_MS + LIFT_TO_RESOLVE_PAUSE_MS;
const HEADING_DELAY_MS =
  RESOLVE_DELAY_MS + RESOLVE_DURATION_MS + RESOLVE_TO_HEADING_PAUSE_MS;
const BODY_DELAY_MS =
  HEADING_DELAY_MS + HEADING_DURATION_MS + HEADING_TO_BODY_PAUSE_MS;
const PROMPT_DELAY_MS =
  BODY_DELAY_MS + BODY_DURATION_MS + BODY_TO_PROMPT_PAUSE_MS;

export default function Step13Section7Transition({
  isActive,
  onComplete,
}: StepProps) {
  const propertyMapHost = usePropertyMapHost();
  const completedRef = useRef(false);

  useEffect(() => {
    if (!isActive) return;

    const wrapper = propertyMapHost?.getWrapper();
    let cancelled = false;
    let completeTimer: ReturnType<typeof setTimeout> | null = null;

    if (wrapper) {
      wrapper.style.zIndex = '5';
      wrapper.style.pointerEvents = 'none';
      wrapper.style.transformOrigin = '50% 100%';
      wrapper.style.willChange = 'transform, opacity';
      wrapper.style.animation = `step13Lift ${LIFT_DURATION_MS}ms linear forwards`;
    }

    const finishOnce = () => {
      if (completedRef.current || cancelled) return;
      completedRef.current = true;
      onComplete();
    };

    completeTimer = setTimeout(finishOnce, TOTAL_DURATION_MS);

    return () => {
      cancelled = true;
      if (completeTimer) clearTimeout(completeTimer);
      if (wrapper) {
        wrapper.style.animation = '';
        wrapper.style.transform = '';
        wrapper.style.opacity = '';
        wrapper.style.zIndex = '';
        wrapper.style.pointerEvents = '';
        wrapper.style.transformOrigin = '';
        wrapper.style.willChange = '';
      }
    };
  }, [isActive, propertyMapHost, onComplete]);

  if (!isActive) return null;

  return (
    <div
      data-step-13
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes step13Lift {
          0%   { transform: perspective(1400px) rotateX(0deg);    opacity: 1; }
          5%   { transform: perspective(1400px) rotateX(-1deg);   opacity: 1; }
          10%  { transform: perspective(1400px) rotateX(-2.5deg); opacity: 1; }
          16%  { transform: perspective(1400px) rotateX(-4.5deg); opacity: 1; }
          22%  { transform: perspective(1400px) rotateX(-7deg);   opacity: 1; }
          28%  { transform: perspective(1400px) rotateX(-10deg);  opacity: 0.98; }
          34%  { transform: perspective(1400px) rotateX(-14deg);  opacity: 0.96; }
          40%  { transform: perspective(1400px) rotateX(-19deg);  opacity: 0.93; }
          46%  { transform: perspective(1400px) rotateX(-25deg);  opacity: 0.88; }
          52%  { transform: perspective(1400px) rotateX(-32deg);  opacity: 0.80; }
          58%  { transform: perspective(1400px) rotateX(-40deg);  opacity: 0.70; }
          64%  { transform: perspective(1400px) rotateX(-49deg);  opacity: 0.56; }
          70%  { transform: perspective(1400px) rotateX(-58deg);  opacity: 0.40; }
          77%  { transform: perspective(1400px) rotateX(-66deg);  opacity: 0.26; }
          84%  { transform: perspective(1400px) rotateX(-74deg);  opacity: 0.14; }
          92%  { transform: perspective(1400px) rotateX(-81deg);  opacity: 0.06; }
          100% { transform: perspective(1400px) rotateX(-88deg);  opacity: 0; }
        }
        @keyframes step13ResolveIn {
          0%   { opacity: 0;   transform: translateY(36px) scale(0.97); }
          40%  { opacity: 0.4; transform: translateY(16px) scale(0.985); }
          100% { opacity: 1;   transform: translateY(0)    scale(1); }
        }
        @keyframes step13HeadingIn {
          0%   { opacity: 0;   transform: translateY(12px) scale(0.96); }
          50%  { opacity: 0.6; transform: translateY(4px)  scale(0.985); }
          100% { opacity: 1;   transform: translateY(0)    scale(1); }
        }
        @keyframes step13BodyIn {
          0%   { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes step13PromptIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        [data-step-13] .step13-resolve {
          opacity: 0;
          animation: step13ResolveIn ${RESOLVE_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${RESOLVE_DELAY_MS}ms forwards;
        }
        [data-step-13] .step13-heading {
          opacity: 0;
          animation: step13HeadingIn ${HEADING_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${HEADING_DELAY_MS}ms forwards;
        }
        [data-step-13] .step13-body {
          opacity: 0;
          animation: step13BodyIn ${BODY_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${BODY_DELAY_MS}ms forwards;
        }
        [data-step-13] .step13-prompt {
          opacity: 0;
          animation: step13PromptIn ${PROMPT_DURATION_MS}ms linear ${PROMPT_DELAY_MS}ms forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          [data-step-13] *,
          [data-step-13] *::before,
          [data-step-13] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>

      <div
        className="step13-resolve"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding:
            'calc(96px + var(--safe-top)) var(--content-margin) calc(160px + var(--safe-bottom))',
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 880,
            background: C.bg,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow:
              '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
            borderRadius: 20,
            padding: '40px 48px',
          }}
        >
          <div
            className="step13-heading"
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 500,
              fontSize: 13,
              color: C.n600,
              letterSpacing: '0.18em',
              marginBottom: 16,
              textAlign: 'left',
            }}
          >
            {COPY.sectionLabel}
          </div>
          <div
            className="step13-body"
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 32,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: C.n950,
              textAlign: 'left',
            }}
          >
            {COPY.headline}
          </div>
        </div>
      </div>

      <div
        className="step13-prompt"
        aria-live="polite"
        style={{
          position: 'absolute',
          bottom: 'calc(72px + var(--safe-bottom))',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 11,
        }}
      >
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 15,
            color: C.n600,
            letterSpacing: '0.02em',
          }}
        >
          {COPY.continuePrompt}
        </div>
      </div>
    </div>
  );
}
