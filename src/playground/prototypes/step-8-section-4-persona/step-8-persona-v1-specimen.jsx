import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   step-8 persona — v1 "Specimen"
   Editorial dossier on iPad Pro 13 landscape.
   Left half: section eyebrow, hero headline, italic closing.
   Right half: persona dossier card + four constraint rows.
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
  constraints: [
    {
      label: "Proximity",
      body: "10-minute drive to the fab. Non-negotiable for shift-based and emergency call-ins.",
    },
    {
      label: "Stay length",
      body: "Short business stays to mid- and long-term assignments. Months, not nights.",
    },
    {
      label: "Group size",
      body: "Small teams of 3 to 4. Travel together, work together, prefer to live together.",
    },
    {
      label: "Logistics",
      body: "Multiple cars per household. Parking is a hard requirement, not a perk.",
    },
  ],
  closing:
    "A hotel room is a compromise. A studio apartment is a compromise. A 4LDK shared home is the format this tenant has been waiting for.",
};

/* ───────── Constraint row ───────── */
const ConstraintRow = ({ index, label, body, mounted, delay }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "32px 1fr",
      columnGap: 20,
      paddingTop: index === 0 ? 0 : 22,
      paddingBottom: 22,
      borderBottom: index === 3 ? "none" : `1px solid ${C.hairlineSoft}`,
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(8px)",
      transition: `opacity 500ms cubic-bezier(0,0,0.2,1) ${delay}ms, transform 500ms cubic-bezier(0,0,0.2,1) ${delay}ms`,
    }}
  >
    <span
      style={{
        fontFamily: FONT_BODY,
        fontSize: 12,
        fontWeight: 500,
        color: C.caption,
        letterSpacing: "0.06em",
        textTransform: "none",
        paddingTop: 4,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
    <div>
      <p
        style={{
          fontFamily: FONT_HEADING,
          fontSize: 18,
          fontWeight: 600,
          color: C.heading,
          margin: 0,
          lineHeight: 1.25,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 16,
          color: C.body,
          margin: "6px 0 0",
          lineHeight: 1.55,
        }}
      >
        {body}
      </p>
    </div>
  </div>
);

export default function Step8PersonaSpecimen() {
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
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1fr)",
          columnGap: 64,
          alignItems: "stretch",
          background: C.bg,
        }}
      >
        {/* ── Left half: hero ── */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: 32,
            paddingBottom: 32,
          }}
        >
          <div>
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
            <div
              style={{
                width: 32,
                height: 2,
                background: C.amber,
                marginTop: 18,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left center",
                transition:
                  "opacity 400ms cubic-bezier(0,0,0.2,1) 150ms, transform 500ms cubic-bezier(0,0,0.2,1) 150ms",
              }}
            />
            <h1
              style={{
                fontFamily: FONT_HEADING,
                fontSize: 72,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                fontWeight: 600,
                color: C.heading,
                margin: "26px 0 0",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                transition:
                  "opacity 600ms cubic-bezier(0,0,0.2,1) 200ms, transform 600ms cubic-bezier(0,0,0.2,1) 200ms",
              }}
            >
              {SECTION_4.headline}
            </h1>
          </div>

          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 18,
              lineHeight: 1.55,
              color: C.sub,
              fontStyle: "italic",
              margin: 0,
              maxWidth: 480,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(8px)",
              transition:
                "opacity 600ms cubic-bezier(0,0,0.2,1) 900ms, transform 600ms cubic-bezier(0,0,0.2,1) 900ms",
            }}
          >
            {SECTION_4.closing}
          </p>
        </section>

        {/* ── Right half: dossier ── */}
        <section
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              background: C.bg,
              border: `1px solid ${C.hairline}`,
              borderRadius: 20,
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
              padding: "32px 36px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0) scale(1)" : "translateY(16px) scale(0.985)",
              transition:
                "opacity 700ms cubic-bezier(0,0,0.2,1) 250ms, transform 700ms cubic-bezier(0,0,0.2,1) 250ms",
            }}
          >
            {/* Persona card header */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                paddingBottom: 24,
                borderBottom: `1px solid ${C.hairlineSoft}`,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: C.amber,
                  marginTop: 14,
                  flexShrink: 0,
                  boxShadow: "0 0 12px rgba(251,185,49,0.6)",
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 11,
                    fontWeight: 500,
                    color: C.caption,
                    letterSpacing: "0.12em",
                    margin: 0,
                  }}
                >
                  TENANT PROFILE
                </p>
                <h2
                  style={{
                    fontFamily: FONT_HEADING,
                    fontSize: 28,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    fontWeight: 600,
                    color: C.heading,
                    margin: "6px 0 4px",
                  }}
                >
                  {SECTION_4.persona.title}
                </h2>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 14,
                    color: C.sub,
                    margin: 0,
                    lineHeight: 1.45,
                  }}
                >
                  {SECTION_4.persona.subtitle}
                </p>
              </div>
            </div>

            {/* Constraint rows */}
            <div style={{ paddingTop: 8 }}>
              {SECTION_4.constraints.map((c, i) => (
                <ConstraintRow
                  key={c.label}
                  index={i}
                  label={c.label}
                  body={c.body}
                  mounted={mounted}
                  delay={400 + i * 100}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
  );
}
