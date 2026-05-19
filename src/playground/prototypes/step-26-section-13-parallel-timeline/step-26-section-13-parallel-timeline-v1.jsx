import { useCallback, useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   Step 26 — Section 13 parallel timeline (content, two-phase)
   Locked copy per docs/step-20-section-10-exit-strategy-flow.md
   (file is mislabeled — it actually contains the parallel timeline content).

   Spec rule:  "Each timeline must be its own dedicated full-screen page.
                Do not combine on one slide."
   Phase 1 = Hsinchu (verified outcome). Phase 2 = Kumamoto (in progress).
   Tap advances Phase 1 → Phase 2. In the playground it loops back to Phase 1.

   Variants — same locked copy, different layout:
     A "vertical-rail"  — year markers down the left, era cards on the right
     B "horizontal-arc" — year axis along the bottom, content stacked above
     C "card-grid"      — 2×2 era cards plus stat callouts below
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  disabled: "#8E8F8F",
  amber: "#FBB931",
  bg: "#F9F9F9",
  panel: "#F9F9F9",
  border: "rgba(0,0,0,0.06)",
  borderStrong: "rgba(0,0,0,0.08)",
  rule: "rgba(0,0,0,0.10)",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

// Locked copy — verbatim from the spec doc
const PHASE_1 = {
  index: 1,
  title: "Hsinchu Science Park",
  subtitle: "Zhubei · Hsinchu Corridor",
  period: "2005 — 2018 · Verified outcome",
  tone: "past",
  eras: [
    {
      years: "2004 – 2006",
      label: "TSMC 12-inch fab expansion",
      body:
        "Engineer population surpassed 100,000; inbound migration accelerated across Hsinchu County",
    },
    {
      years: "2007 – 2009",
      label: "Acute residential supply gap",
      body:
        "Zhubei land prices rose over 60% in 3 years; senior engineers housed in hotels for lack of alternatives",
    },
    {
      years: "2010 – 2012",
      label: "Institutional developers enter",
      body:
        "Far Glory, Cathay Real Estate begin land acquisition; early movers had already locked the best sites",
    },
    {
      years: "2013 – 2018",
      label: "Market maturity · rental premium locks in",
      body:
        "Premium apartments sustain 2–3× rental premium; Zhubei established as Taiwan's benchmark tech cluster",
    },
  ],
  stats: [
    {
      value: "+180%",
      label: "Zhubei premium rent growth",
      caption: "2006–2015 cumulative",
    },
    {
      value: "+60%",
      label: "Zhubei land price appreciation",
      caption: "2007–2010 · 3-year window",
    },
  ],
};

const PHASE_2 = {
  index: 2,
  title: "Kumamoto Semiconductor Corridor",
  subtitle: "Kikuyo · Ozu · Kumamoto City",
  period: "2024 — 2035 · In progress",
  tone: "now",
  eras: [
    {
      years: "2024 – 2025",
      label: "JASM Fab 1 opens · Taiwanese engineers arrive",
      body:
        "3,000–5,000 TSMC-dispatched engineers relocating; Kikuyo-cho land prices already up 40–80%",
      now: "Now: residential supply gap, no premium developer has entered",
    },
    {
      years: "2026 – 2028",
      label: "Fab 2 confirmed · supply chain clusters form",
      body:
        "Tier-2 suppliers land nearby; engineer families settle long-term, driving demand for family housing",
    },
    {
      years: "2029 – 2032",
      label: "Developer competition · land price peak",
      body:
        "Major Japanese developers enter; early-mover land cost advantage becomes unreplicable",
    },
    {
      years: "2033 – 2035",
      label: "J-REIT exit window opens",
      body:
        "Portfolio reaches REIT threshold; institutional acquisition or listed-vehicle exit",
    },
  ],
  stats: [
    {
      value: "+40–80%",
      label: "Kikuyo-cho land appreciation",
      caption: "2022–2024",
    },
    {
      value: "0",
      label: "Existing Taiwan-grade premium residential supply in market",
      caption: "MoreHarvest",
    },
  ],
};

const PHASES = [PHASE_1, PHASE_2];

export default function Step26SectionThirteenParallelTimeline({ variant = "A" } = {}) {
  const [phaseIndex, setPhaseIndex] = useState(0);

  const advance = useCallback(() => {
    setPhaseIndex((p) => (p + 1) % PHASES.length);
  }, []);

  // Auto-advance every 9s for review (user can also tap)
  useEffect(() => {
    const id = setTimeout(advance, 9000);
    return () => clearTimeout(id);
  }, [phaseIndex, advance]);

  const phase = PHASES[phaseIndex];

  return (
    <div
      onClick={advance}
      data-proto="step-26"
      data-variant={variant}
      data-phase={phase.index}
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        overflow: "hidden",
        fontFamily: FONT_BODY,
        cursor: "pointer",
      }}
    >
      <style>{`
        @keyframes step26-fade-up {
          0%   { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes step26-fade-in {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* Re-mount on phase change to retrigger entrance animations */}
      <PhaseView key={`${variant}-${phase.index}`} phase={phase} variant={variant} />

      {/* Phase indicator (top right) */}
      <div
        style={{
          position: "absolute",
          top: "calc(56px + var(--safe-top))",
          right: "var(--content-margin)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontFamily: FONT_BODY,
          fontSize: 13,
          color: C.disabled,
          letterSpacing: "0.06em",
        }}
      >
        <span>Phase {phase.index} of 2</span>
        <span>·</span>
        <span>{labelFor(variant)}</span>
        <span>·</span>
        <span style={{ color: C.caption }}>tap to advance</span>
      </div>
    </div>
  );
}

function PhaseView({ phase, variant }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding:
          "calc(96px + var(--safe-top)) var(--content-margin) calc(64px + var(--safe-bottom))",
        display: "flex",
        flexDirection: "column",
        gap: 28,
        opacity: 0,
        animation: "step26-fade-in 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
      }}
    >
      <PhaseHeader phase={phase} />
      {variant === "A" && <VerticalRail phase={phase} />}
      {variant === "B" && <HorizontalArc phase={phase} />}
      {variant === "C" && <CardGrid phase={phase} />}
    </div>
  );
}

function PhaseHeader({ phase }) {
  const isNow = phase.tone === "now";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        opacity: 0,
        animation: "step26-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
        animationDelay: "100ms",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 48, height: 1, background: C.amber }} />
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.18em",
            color: C.caption,
          }}
        >
          SECTION 13 · PARALLEL TIMELINE
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <h1
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 48,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: C.heading,
            margin: 0,
          }}
        >
          {phase.title}
        </h1>
        <span
          style={{
            fontSize: 17,
            color: C.caption,
          }}
        >
          {phase.subtitle}
        </span>
      </div>
      <div
        style={{
          fontSize: 14,
          color: isNow ? C.heading : C.caption,
          letterSpacing: "0.04em",
          marginTop: 4,
        }}
      >
        {phase.period}
      </div>
    </div>
  );
}

/* ── variant A: vertical rail ── */

function VerticalRail({ phase }) {
  return (
    <div
      style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr",
        gap: 48,
        minHeight: 0,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
        {/* Vertical rail line */}
        <div
          style={{
            position: "absolute",
            left: 6,
            top: 6,
            bottom: 6,
            width: 1,
            background: C.rule,
          }}
        />
        {phase.eras.map((era, i) => (
          <div
            key={era.years}
            style={{
              display: "grid",
              gridTemplateColumns: "32px 1fr",
              gap: 16,
              opacity: 0,
              animation:
                "step26-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
              animationDelay: `${300 + i * 120}ms`,
            }}
          >
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: 999,
                background: phase.tone === "now" ? C.amber : C.sub,
                marginTop: 6,
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                paddingBottom: 8,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "0.06em",
                  color: C.caption,
                }}
              >
                {era.years}
              </div>
              <div
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 600,
                  fontSize: 18,
                  lineHeight: 1.25,
                  color: C.heading,
                }}
              >
                {era.label}
              </div>
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: C.body,
                }}
              >
                {era.body}
              </div>
              {era.now && (
                <div
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 13,
                    color: C.heading,
                    background: "rgba(251,185,49,0.18)",
                    padding: "6px 10px",
                    borderRadius: 8,
                    marginTop: 6,
                    alignSelf: "flex-start",
                    fontWeight: 500,
                  }}
                >
                  → {era.now}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Stats phase={phase} />
    </div>
  );
}

/* ── variant B: horizontal arc — years along bottom, content stacked above ── */

function HorizontalArc({ phase }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 32,
        minHeight: 0,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          alignItems: "stretch",
          minHeight: 0,
        }}
      >
        {phase.eras.map((era, i) => (
          <div
            key={era.years}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              padding: "16px 4px",
              opacity: 0,
              animation: "step26-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
              animationDelay: `${300 + i * 120}ms`,
            }}
          >
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: 16,
                lineHeight: 1.25,
                color: C.heading,
              }}
            >
              {era.label}
            </div>
            <div
              style={{
                fontFamily: FONT_BODY,
                fontSize: 13,
                lineHeight: 1.5,
                color: C.body,
              }}
            >
              {era.body}
            </div>
            {era.now && (
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 12,
                  color: C.heading,
                  background: "rgba(251,185,49,0.18)",
                  padding: "6px 8px",
                  borderRadius: 6,
                  marginTop: 4,
                  fontWeight: 500,
                }}
              >
                → {era.now}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Year axis */}
      <div style={{ position: "relative", height: 60 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 14,
            height: 1,
            background: C.rule,
          }}
        />
        {phase.eras.map((era, i) => {
          const left = `${(i / (phase.eras.length - 1)) * 100}%`;
          return (
            <div
              key={era.years}
              style={{
                position: "absolute",
                left,
                top: 0,
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                opacity: 0,
                animation:
                  "step26-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
                animationDelay: `${700 + i * 80}ms`,
              }}
            >
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 999,
                  background: phase.tone === "now" ? C.amber : C.sub,
                  marginTop: 8,
                }}
              />
              <div
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 600,
                  fontSize: 13,
                  color: C.caption,
                  letterSpacing: "0.04em",
                  marginTop: 6,
                }}
              >
                {era.years}
              </div>
            </div>
          );
        })}
      </div>
      {/* Stats inline */}
      <Stats phase={phase} inline />
    </div>
  );
}

/* ── variant C: card grid 2×2 + stat strip below ── */

function CardGrid({ phase }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        minHeight: 0,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 16,
          minHeight: 0,
        }}
      >
        {phase.eras.map((era, i) => (
          <div
            key={era.years}
            style={{
              background: C.panel,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: "18px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              opacity: 0,
              animation:
                "step26-fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
              animationDelay: `${300 + i * 120}ms`,
            }}
          >
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.06em",
                color: C.caption,
              }}
            >
              {era.years}
            </div>
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: 18,
                lineHeight: 1.25,
                color: C.heading,
              }}
            >
              {era.label}
            </div>
            <div
              style={{
                fontFamily: FONT_BODY,
                fontSize: 14,
                lineHeight: 1.5,
                color: C.body,
              }}
            >
              {era.body}
            </div>
            {era.now && (
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 12,
                  color: C.heading,
                  background: "rgba(251,185,49,0.18)",
                  padding: "6px 10px",
                  borderRadius: 8,
                  marginTop: 4,
                  alignSelf: "flex-start",
                  fontWeight: 500,
                }}
              >
                → {era.now}
              </div>
            )}
          </div>
        ))}
      </div>
      <Stats phase={phase} inline />
    </div>
  );
}

/* ── stat callouts ── */

function Stats({ phase, inline = false }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: inline ? "repeat(2, 1fr)" : "1fr",
        gap: 16,
        opacity: 0,
        animation: "step26-fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
        animationDelay: "900ms",
      }}
    >
      {phase.stats.map((s) => (
        <div
          key={s.value + s.label}
          style={{
            background: C.panel,
            border: `1px solid ${C.borderStrong}`,
            borderRadius: 12,
            padding: "18px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: 44,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: phase.tone === "now" ? C.amber : C.heading,
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 14,
              color: C.sub,
              marginTop: 4,
            }}
          >
            {s.label}
          </div>
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 12,
              color: C.caption,
            }}
          >
            {s.caption}
          </div>
        </div>
      ))}
    </div>
  );
}

function labelFor(variant) {
  if (variant === "B") return "B · horizontal arc";
  if (variant === "C") return "C · card grid";
  return "A · vertical rail";
}
