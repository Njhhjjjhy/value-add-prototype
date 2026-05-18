import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────
   step-8 persona — v3 "Grid"
   Investor-mode: lead with the four hard demands.
   Top: eyebrow + headline + small persona pill.
   Center: 2x2 grid of constraint cards — the hero element.
   Bottom: italic closing line as a footer band.
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
      body:
        "10-minute drive to the fab. Non-negotiable for shift-based and emergency call-ins.",
      tag: "Distance",
    },
    {
      label: "Stay length",
      body:
        "Short business stays to mid- and long-term assignments. Months, not nights.",
      tag: "Duration",
    },
    {
      label: "Group size",
      body:
        "Small teams of 3 to 4. Travel together, work together, prefer to live together.",
      tag: "Cohort",
    },
    {
      label: "Logistics",
      body:
        "Multiple cars per household. Parking is a hard requirement, not a perk.",
      tag: "Infrastructure",
    },
  ],
  closing:
    "A hotel room is a compromise. A studio apartment is a compromise. A 4LDK shared home is the format this tenant has been waiting for.",
};

/* ───────── Single constraint card ───────── */
const ConstraintCard = ({ index, label, body, tag, mounted, delay }) => (
  <div
    style={{
      background: C.bg,
      border: `1px solid ${C.hairline}`,
      borderRadius: 20,
      boxShadow:
        "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
      padding: "28px 32px 30px",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      position: "relative",
      overflow: "hidden",
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0) scale(1)" : "translateY(12px) scale(0.985)",
      transition: `opacity 600ms cubic-bezier(0,0,0.2,1) ${delay}ms, transform 600ms cubic-bezier(0,0,0.2,1) ${delay}ms`,
    }}
  >
    {/* Top: number + tag */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <span
        style={{
          fontFamily: FONT_HEADING,
          fontSize: 14,
          fontWeight: 600,
          color: C.amber,
          letterSpacing: "0.05em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        0{index + 1}
      </span>
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 11,
          fontWeight: 500,
          color: C.caption,
          letterSpacing: "0.14em",
          padding: "4px 10px",
          border: `1px solid ${C.hairline}`,
          borderRadius: 9999,
        }}
      >
        {tag}
      </span>
    </div>

    {/* Label */}
    <h3
      style={{
        fontFamily: FONT_HEADING,
        fontSize: 26,
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
        fontWeight: 600,
        color: C.heading,
        margin: 0,
      }}
    >
      {label}
    </h3>

    {/* Body */}
    <p
      style={{
        fontFamily: FONT_BODY,
        fontSize: 15,
        lineHeight: 1.55,
        color: C.body,
        margin: 0,
      }}
    >
      {body}
    </p>
  </div>
);

export default function Step8PersonaGrid() {
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
        {/* ── Top band ── */}
        <header
          style={{
            paddingTop: 32,
            paddingBottom: 24,
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
                fontSize: 56,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                fontWeight: 600,
                color: C.heading,
                margin: "12px 0 0",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(10px)",
                transition:
                  "opacity 600ms cubic-bezier(0,0,0.2,1) 150ms, transform 600ms cubic-bezier(0,0,0.2,1) 150ms",
              }}
            >
              {SECTION_4.headline}
            </h1>
          </div>
          {/* Caption-style persona ID */}
          <div
            style={{
              maxWidth: 320,
              textAlign: "right",
              opacity: mounted ? 1 : 0,
              transition: "opacity 600ms cubic-bezier(0,0,0.2,1) 250ms",
            }}
          >
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 11,
                fontWeight: 500,
                color: C.caption,
                letterSpacing: "0.14em",
                margin: 0,
              }}
            >
              TENANT PROFILE
            </p>
            <p
              style={{
                fontFamily: FONT_HEADING,
                fontSize: 18,
                fontWeight: 600,
                color: C.heading,
                margin: "6px 0 0",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              {SECTION_4.persona.title}
            </p>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 13,
                color: C.sub,
                margin: "4px 0 0",
                lineHeight: 1.4,
              }}
            >
              {SECTION_4.persona.subtitle}
            </p>
          </div>
        </header>

        {/* ── Center: 2x2 grid ── */}
        <section
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 22,
            paddingBottom: 24,
          }}
        >
          {SECTION_4.constraints.map((c, i) => (
            <ConstraintCard
              key={c.label}
              index={i}
              label={c.label}
              body={c.body}
              tag={c.tag}
              mounted={mounted}
              delay={350 + i * 110}
            />
          ))}
        </section>

        {/* ── Bottom band: closing ── */}
        <footer
          style={{
            paddingBottom: 32,
            paddingTop: 22,
            borderTop: `1px solid ${C.hairlineSoft}`,
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 32,
              height: 2,
              background: C.amber,
              marginTop: 14,
              flexShrink: 0,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left center",
              transition:
                "opacity 400ms cubic-bezier(0,0,0.2,1) 1100ms, transform 500ms cubic-bezier(0,0,0.2,1) 1100ms",
            }}
          />
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 17,
              lineHeight: 1.55,
              color: C.sub,
              fontStyle: "italic",
              margin: 0,
              maxWidth: 1100,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(6px)",
              transition:
                "opacity 600ms cubic-bezier(0,0,0.2,1) 1150ms, transform 600ms cubic-bezier(0,0,0.2,1) 1150ms",
            }}
          >
            {SECTION_4.closing}
          </p>
        </footer>
      </div>
  );
}
