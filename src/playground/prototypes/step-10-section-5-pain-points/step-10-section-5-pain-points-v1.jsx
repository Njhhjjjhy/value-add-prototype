import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

/* ───────────────────────────────────────────────────────
   Step 10 — Section 5 pain points (content)
   Authoritative data: docs/gktk-value-add-prototype-pain-points.md
   8 pain points (4 physical, 4 mental). Locked copy, locked order.

   Variants:
     A "grid"             — 2 columns (physical / mental), 4 cards each
     B "narrative"        — single flowing column with cause + summary
     C "stacked-evidence" — compact evidence rows, label left / cause+summary right

   Animation per spec:
     - pre-mount all 8 with visibility: hidden (no conditional render)
     - GSAP timeline. settle ease (entrances), gentle ease (exits, unused here)
     - physical first (80–120ms stagger), 300ms pause, mental second (same)
     - GPU-safe: transform (y) + opacity only
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

const PAIN_POINTS = [
  // Physical — render first, in this order
  {
    id: "traffic-congestion",
    group: "physical",
    label: "Traffic congestion",
    cause: "Fab locations are remote, but workers live wherever they can find housing.",
    summary: "1 to 3 hours per day lost to traffic.",
    expanded:
      "Senior managers commuting from Kumamoto City to the fab corridor face up to 3 hours daily. Land prices within the JASM corridor have surged 40 to 80%, pushing workers further from their worksite.",
  },
  {
    id: "no-chinese-support",
    group: "physical",
    label: "No Chinese-speaking support",
    cause: "Relocated engineers are foreign nationals in an all-Japanese system.",
    summary: "All-Japanese admin, no language support for daily life.",
    expanded:
      "Expatriates face Japanese-only property management, requiring 2 to 3 weeks to activate utilities, gas, and internet. Budgets of 200,000 to 300,000 yen find almost no furnished options with Chinese-language support.",
  },
  {
    id: "administrative-burden",
    group: "physical",
    label: "Administrative burden",
    cause: "Short-term assignments mean constant move-in, move-out cycles for HR.",
    summary: "Furniture, appliances, registration, waste disposal.",
    expanded:
      "HR departments must handle guarantor requirements, waste disposal procedures, furniture procurement, utility setup, and resident registration. The Japanese rental market is unfriendly to foreign nationals and nothing is turnkey.",
  },
  {
    id: "housing-quality-anxiety",
    group: "physical",
    label: "Housing quality anxiety",
    cause: "Standard Japanese rentals were not designed for foreign family occupancy.",
    summary: "Water quality, volcanic ash, and no property management buffer.",
    expanded:
      "Dependents commonly report anxiety about water quality (skin issues) and Mt. Aso volcanic ash cleanup. No professional property management buffer means frequent daily-life disputes including garbage sorting and noise.",
  },
  // Mental — render second, in this order
  {
    id: "limited-medical-access",
    group: "mental",
    label: "Limited medical access",
    cause: "Semiconductor work schedules leave no room for navigating a foreign healthcare system.",
    summary: "No interpreter for emergencies, prenatal care, or vaccinations.",
    expanded:
      "There are almost no Chinese-speaking medical services in the Kumamoto corridor. Families face emergencies without an interpreter, prenatal checkups with no language support, and childhood vaccination schedules they cannot navigate alone.",
  },
  {
    id: "mental-health-strain",
    group: "mental",
    label: "Mental health strain",
    cause: "High-pressure fab work combined with family instability creates compounding stress.",
    summary: "No counseling access, no psychiatrist referrals in Chinese.",
    expanded:
      "Engineers report compounding stress from demanding fab schedules and family adjustment issues. There are no Chinese-language mental health services in Kumamoto. Spouses experiencing isolation have no professional support system available.",
  },
  {
    id: "education-gaps",
    group: "mental",
    label: "Children's education gaps",
    cause: "Assignments last 2 to 5 years, but children cannot fall behind in Taiwan's curriculum.",
    summary: "KIS slots limited, curriculum alignment is a major concern.",
    expanded:
      "Families worry their children cannot keep up with Japanese schools or will not be able to reintegrate into Taiwan's curriculum upon return. Kumamoto International School slots are extremely limited in 2026. No dedicated school buses serve the corridor.",
  },
  {
    id: "kumamoto-lifestyle",
    group: "mental",
    label: "Adapting to Kumamoto lifestyle",
    cause: "Engineers and families are uprooted to a rural Japanese city with no transition support.",
    summary: "Culture shock, daily friction, and social isolation.",
    expanded:
      "Dependents living in standard Japanese housing lack social interaction and Chinese-language support. Highly educated spouses without a social life often pressure employees to repatriate early.",
  },
];

const PHYSICAL = PAIN_POINTS.filter((p) => p.group === "physical");
const MENTAL = PAIN_POINTS.filter((p) => p.group === "mental");
const STAGGER = 0.1; // 100ms within the 80–120ms band
const GROUP_PAUSE = 0.35; // 350ms — comfortably above the 300ms minimum

// Closing bridge — Task 2 (docs/value-add-updates-20260515.md).
// Mirrors PERSONA_STAT in src/data/painPoints.ts. Inlined per playground isolation.
const BRIDGE_VALUE = "3 to 5 million yen";
const BRIDGE_LABEL = "estimated replacement cost per engineer who repatriates early due to family maladjustment.";

let easesRegistered = false;
function ensureEases() {
  if (easesRegistered) return;
  try {
    gsap.registerPlugin(CustomEase);
    if (!CustomEase.get("painPointSettle")) {
      CustomEase.create("painPointSettle", "0.22, 1, 0.36, 1");
    }
    if (!CustomEase.get("painPointGentle")) {
      CustomEase.create("painPointGentle", "0.23, 0.86, 0.39, 0.96");
    }
    easesRegistered = true;
  } catch {
    // CustomEase unavailable — fall back to power eases at runtime
    easesRegistered = true;
  }
}

export default function Step10SectionFivePainPoints({ variant = "A" } = {}) {
  const rootRef = useRef(null);
  const replayKey = useRef(0);

  useEffect(() => {
    ensureEases();
    if (!rootRef.current) return;

    const settle = CustomEase.get?.("painPointSettle") ? "painPointSettle" : "power2.out";

    const physicalEls = Array.from(
      rootRef.current.querySelectorAll('[data-pain-group="physical"]')
    );
    const mentalEls = Array.from(
      rootRef.current.querySelectorAll('[data-pain-group="mental"]')
    );

    // Set initial state on the actual elements (visibility hidden + offset)
    gsap.set([...physicalEls, ...mentalEls], {
      visibility: "hidden",
      opacity: 0,
      y: 16,
    });

    const bridgeEl = rootRef.current.querySelector('[data-pain-bridge]');
    if (bridgeEl) {
      gsap.set(bridgeEl, { visibility: "hidden", opacity: 0, y: 16 });
    }

    const tl = gsap.timeline();

    // Physical group reveal
    tl.to(physicalEls, {
      visibility: "visible",
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: settle,
      stagger: STAGGER,
    });

    // 350ms pause between groups
    tl.to({}, { duration: GROUP_PAUSE });

    // Mental group reveal
    tl.to(mentalEls, {
      visibility: "visible",
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: settle,
      stagger: STAGGER,
    });

    // Bridge reveal — after mental group completes
    if (bridgeEl) {
      tl.to(
        bridgeEl,
        {
          visibility: "visible",
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: settle,
        },
        "+=0.2"
      );
    }

    // Loop the prototype for review — wait, then fade out and replay
    const loop = setInterval(() => {
      replayKey.current += 1;
      const targets = [...physicalEls, ...mentalEls, ...(bridgeEl ? [bridgeEl] : [])];
      gsap.set(targets, {
        visibility: "hidden",
        opacity: 0,
        y: 16,
      });
      const reTl = gsap.timeline();
      reTl
        .to(physicalEls, {
          visibility: "visible",
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: settle,
          stagger: STAGGER,
        })
        .to({}, { duration: GROUP_PAUSE })
        .to(mentalEls, {
          visibility: "visible",
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: settle,
          stagger: STAGGER,
        });
      if (bridgeEl) {
        reTl.to(
          bridgeEl,
          {
            visibility: "visible",
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: settle,
          },
          "+=0.2"
        );
      }
    }, 9000);

    return () => {
      clearInterval(loop);
      tl.kill();
    };
  }, [variant]);

  return (
    <div
      ref={rootRef}
      data-proto="step-10"
      data-variant={variant}
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        overflow: "hidden",
        fontFamily: FONT_BODY,
        padding:
          "calc(96px + var(--safe-top)) var(--content-margin) calc(64px + var(--safe-bottom))",
        display: "flex",
        flexDirection: "column",
        gap: 40,
      }}
    >
      <Header variant={variant} />

      {variant === "A" && <GridVariant />}
      {variant === "B" && <NarrativeVariant />}
      {variant === "C" && <StackedEvidenceVariant />}

      <ClosingBridge />
    </div>
  );
}

/* ── closing bridge (Task 2 — quantifies the cost of the pain points) ── */

function ClosingBridge() {
  return (
    <div
      data-pain-bridge
      style={{
        marginTop: 8,
        padding: "20px 24px",
        background: C.panel,
        border: `1px solid ${C.borderStrong}`,
        borderRadius: 12,
        display: "flex",
        alignItems: "baseline",
        gap: 20,
        flexWrap: "wrap",
        visibility: "hidden",
      }}
    >
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 36,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: C.heading,
          whiteSpace: "nowrap",
        }}
      >
        {BRIDGE_VALUE}
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 15,
          lineHeight: 1.5,
          color: C.body,
          flex: 1,
          minWidth: 320,
        }}
      >
        {BRIDGE_LABEL}
      </div>
    </div>
  );
}

/* ── shared header ── */

function Header({ variant }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
          SECTION 5
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <h1
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 56,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: C.heading,
            margin: 0,
          }}
        >
          What semiconductor families face in Kumamoto
        </h1>
        <span
          style={{
            fontSize: 13,
            color: C.disabled,
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
          }}
        >
          {labelFor(variant)}
        </span>
      </div>
    </div>
  );
}

/* ── variant A: grid (2 columns × 4 rows) ── */

function GridVariant() {
  return (
    <div
      style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 32,
        minHeight: 0,
      }}
    >
      <GroupColumn label="Physical" items={PHYSICAL} compact={false} />
      <GroupColumn label="Mental" items={MENTAL} compact={false} />
    </div>
  );
}

function GroupColumn({ label, items, compact }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, minHeight: 0 }}>
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: "-0.01em",
          color: C.sub,
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "repeat(4, 1fr)",
          gap: 12,
          flex: 1,
          minHeight: 0,
        }}
      >
        {items.map((p) => (
          <GridCard key={p.id} point={p} compact={compact} />
        ))}
      </div>
    </div>
  );
}

function GridCard({ point }) {
  return (
    <div
      data-pain-id={point.id}
      data-pain-group={point.group}
      style={{
        background: C.panel,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)",
      }}
    >
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 20,
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          color: C.heading,
        }}
      >
        {point.label}
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 15,
          lineHeight: 1.5,
          color: C.body,
        }}
      >
        {point.summary}
      </div>
    </div>
  );
}

/* ── variant B: narrative (single flowing column) ── */

function NarrativeVariant() {
  return (
    <div
      style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 56,
        minHeight: 0,
      }}
    >
      <NarrativeColumn label="Physical" items={PHYSICAL} />
      <NarrativeColumn label="Mental" items={MENTAL} />
    </div>
  );
}

function NarrativeColumn({ label, items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, minHeight: 0 }}>
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: "-0.01em",
          color: C.sub,
          paddingBottom: 8,
          borderBottom: `1px solid ${C.rule}`,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
        {items.map((p) => (
          <NarrativeEntry key={p.id} point={p} />
        ))}
      </div>
    </div>
  );
}

function NarrativeEntry({ point }) {
  return (
    <div
      data-pain-id={point.id}
      data-pain-group={point.group}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        paddingBottom: 14,
        borderBottom: `1px solid rgba(0,0,0,0.04)`,
      }}
    >
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          color: C.heading,
        }}
      >
        {point.label}
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 13,
          lineHeight: 1.45,
          color: C.caption,
          fontStyle: "italic",
        }}
      >
        {point.cause}
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 15,
          lineHeight: 1.5,
          color: C.body,
          marginTop: 2,
        }}
      >
        {point.summary}
      </div>
    </div>
  );
}

/* ── variant C: stacked evidence (compact rows: label / cause / summary) ── */

function StackedEvidenceVariant() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 28,
        minHeight: 0,
      }}
    >
      <EvidenceBlock label="Physical" items={PHYSICAL} />
      <EvidenceBlock label="Mental" items={MENTAL} />
    </div>
  );
}

function EvidenceBlock({ label, items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: "-0.01em",
            color: C.sub,
          }}
        >
          {label}
        </div>
        <div style={{ flex: 1, height: 1, background: C.rule }} />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
        }}
      >
        {items.map((p) => (
          <EvidenceRow key={p.id} point={p} />
        ))}
      </div>
    </div>
  );
}

function EvidenceRow({ point }) {
  return (
    <div
      data-pain-id={point.id}
      data-pain-group={point.group}
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        gap: 20,
        background: C.panel,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: "16px 20px",
        alignItems: "start",
      }}
    >
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 16,
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          color: C.heading,
        }}
      >
        {point.label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 13,
            lineHeight: 1.4,
            color: C.caption,
          }}
        >
          {point.cause}
        </div>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 14,
            lineHeight: 1.45,
            color: C.body,
          }}
        >
          {point.summary}
        </div>
      </div>
    </div>
  );
}

function labelFor(variant) {
  if (variant === "B") return "B · narrative";
  if (variant === "C") return "C · stacked evidence";
  return "A · grid";
}
