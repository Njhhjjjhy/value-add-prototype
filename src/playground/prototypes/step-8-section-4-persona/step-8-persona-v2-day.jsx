import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   step-8 persona — v2 "Day"
   Horizontal narrative timeline on iPad Pro 13 landscape.
   Top band: eyebrow + headline + persona pill.
   Middle: 4 stops on a horizontal rail, each tying one
   constraint to a moment in the engineer's pattern.
   Bottom band: italic closing line.
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  amber: "#FBB931",
  bg: "#F9F9F9",
  hairline: "rgba(0,0,0,0.08)",
  hairlineSoft: "rgba(0,0,0,0.06)",
  rail: "rgba(0,0,0,0.12)",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const SECTION_4 = {
  eyebrow: "Section 04 · Demand",
  headline: "Who lives here.",
  persona: {
    title: "The semiconductor engineer",
    subtitle: "JASM / TSMC supply chain · rotational deployment",
  },
  stops: [
    {
      moment: "WHERE",
      label: "Proximity",
      body:
        "10-minute drive to the fab. Non-negotiable for shift-based and emergency call-ins.",
    },
    {
      moment: "HOW LONG",
      label: "Stay length",
      body:
        "Short business stays to mid- and long-term assignments. Months, not nights.",
    },
    {
      moment: "WITH WHOM",
      label: "Group size",
      body:
        "Small teams of 3 to 4. Travel together, work together, prefer to live together.",
    },
    {
      moment: "WITH WHAT",
      label: "Logistics",
      body:
        "Multiple cars per household. Parking is a hard requirement, not a perk.",
    },
  ],
  closing:
    "A hotel room is a compromise. A studio apartment is a compromise. A 4LDK shared home is the format this tenant has been waiting for.",
};

/* ───────── A single stop on the timeline ───────── */
const Stop = ({ moment, label, body, mounted, delay, isLast }) => (
  <div
    style={{
      flex: 1,
      position: "relative",
      paddingTop: 36,
      paddingRight: isLast ? 0 : 24,
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(12px)",
      transition: `opacity 600ms cubic-bezier(0,0,0.2,1) ${delay}ms, transform 600ms cubic-bezier(0,0,0.2,1) ${delay}ms`,
    }}
  >
    {/* Tick on the rail */}
    <div
      style={{
        position: "absolute",
        top: -6,
        left: 0,
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: C.bg,
        border: `2px solid ${C.heading}`,
        zIndex: 2,
      }}
    />
    {/* Moment label */}
    <p
      style={{
        fontFamily: FONT_BODY,
        fontSize: 11,
        fontWeight: 600,
        color: C.amber,
        letterSpacing: "0.16em",
        margin: 0,
      }}
    >
      {moment}
    </p>
    {/* Constraint name */}
    <h3
      style={{
        fontFamily: FONT_HEADING,
        fontSize: 24,
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
        fontWeight: 600,
        color: C.heading,
        margin: "10px 0 12px",
      }}
    >
      {label}
    </h3>
    {/* Constraint body */}
    <p
      style={{
        fontFamily: FONT_BODY,
        fontSize: 15,
        color: C.body,
        margin: 0,
        lineHeight: 1.55,
        maxWidth: 260,
      }}
    >
      {body}
    </p>
  </div>
);

export default function Step8PersonaDay() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "var(--safe-top) var(--content-margin) var(--safe-bottom)",
          display: "flex",
          flexDirection: "column",
          background: C.bg,
        }}
      >
        {/* ── Top band: hero ── */}
        <header
          style={{
            paddingTop: 32,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 12,
                fontWeight: 500,
                color: C.caption,
                letterSpacing: "0.14em",
                margin: 0,
                opacity: mounted ? 1 : 0,
                transition: "opacity 500ms cubic-bezier(0,0,0.2,1) 50ms",
              }}
            >
              {SECTION_4.eyebrow}
            </p>
            <h1
              style={{
                fontFamily: FONT_HEADING,
                fontSize: 64,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                fontWeight: 600,
                color: C.heading,
                margin: "14px 0 0",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(10px)",
                transition:
                  "opacity 600ms cubic-bezier(0,0,0.2,1) 150ms, transform 600ms cubic-bezier(0,0,0.2,1) 150ms",
              }}
            >
              {SECTION_4.headline}
            </h1>
          </div>
          {/* Persona pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 22px 14px 14px",
              background: C.bg,
              border: `1px solid ${C.hairline}`,
              borderRadius: 9999,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              flexShrink: 0,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(8px)",
              transition:
                "opacity 600ms cubic-bezier(0,0,0.2,1) 300ms, transform 600ms cubic-bezier(0,0,0.2,1) 300ms",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: C.amber,
                boxShadow: "0 0 16px rgba(251,185,49,0.5)",
                flexShrink: 0,
              }}
            />
            <div>
              <p
                style={{
                  fontFamily: FONT_HEADING,
                  fontSize: 16,
                  fontWeight: 600,
                  color: C.heading,
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {SECTION_4.persona.title}
              </p>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 12,
                  color: C.caption,
                  margin: "2px 0 0",
                  lineHeight: 1.3,
                }}
              >
                {SECTION_4.persona.subtitle}
              </p>
            </div>
          </div>
        </header>

        {/* ── Middle: the rail ── */}
        <section
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          <div style={{ position: "relative", width: "100%" }}>
            {/* Rail */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: C.rail,
                borderRadius: 2,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left center",
                transition:
                  "opacity 500ms cubic-bezier(0,0,0.2,1) 250ms, transform 900ms cubic-bezier(0,0,0.2,1) 250ms",
              }}
            />
            {/* Amber traveler — left animates against the rail's
                width directly so the dot lands at the rightmost tick. */}
            <div
              style={{
                position: "absolute",
                top: -5,
                left: mounted ? "calc(100% - 12px)" : "0px",
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: C.amber,
                boxShadow: "0 0 18px rgba(251,185,49,0.7)",
                opacity: mounted ? 1 : 0,
                transition:
                  "opacity 400ms cubic-bezier(0,0,0.2,1) 600ms, left 1800ms cubic-bezier(0.45,0,0.55,1) 600ms",
                zIndex: 3,
              }}
            />
            {/* Stops */}
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {SECTION_4.stops.map((s, i) => (
                <Stop
                  key={s.label}
                  moment={s.moment}
                  label={s.label}
                  body={s.body}
                  mounted={mounted}
                  delay={500 + i * 140}
                  isLast={i === SECTION_4.stops.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom band: closing ── */}
        <footer
          style={{
            paddingBottom: 32,
            borderTop: `1px solid ${C.hairlineSoft}`,
            paddingTop: 22,
          }}
        >
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 17,
              lineHeight: 1.55,
              color: C.sub,
              fontStyle: "italic",
              margin: 0,
              maxWidth: 920,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(6px)",
              transition:
                "opacity 600ms cubic-bezier(0,0,0.2,1) 1100ms, transform 600ms cubic-bezier(0,0,0.2,1) 1100ms",
            }}
          >
            {SECTION_4.closing}
          </p>
        </footer>
      </div>
  );
}
