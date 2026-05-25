import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

/* ───────────────────────────────────────────────────────
   Step 10 — Section 5 pain points (content)
   Authoritative data: docs/gktk-value-add-prototype-pain-points.md
   8 pain points (4 physical, 4 mental). Locked copy, locked order.

   Variant A "grid" — 2 columns separated by a soft vertical divider.
   QA round 1 labels: "Physical strain" / "Mental strain".

   Animation per spec:
     - pre-mount all 8 with visibility: hidden (no conditional render)
     - GSAP timeline. settle ease (entrances), gentle ease (exits, unused here)
     - physical first (80–120ms stagger), 300ms+ pause, mental second (same)
     - GPU-safe: transform (y) + opacity only
   ─────────────────────────────────────────────────────── */

const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
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
  {
    id: "traffic-congestion",
    group: "physical",
    label: "Traffic congestion",
    summary: "1 to 3 hours per day lost to traffic.",
  },
  {
    id: "no-chinese-support",
    group: "physical",
    label: "No Chinese-speaking support",
    summary: "All-Japanese admin, no language support for daily life.",
  },
  {
    id: "administrative-burden",
    group: "physical",
    label: "Administrative burden",
    summary: "Furniture, appliances, registration, waste disposal.",
  },
  {
    id: "housing-quality-anxiety",
    group: "physical",
    label: "Housing quality anxiety",
    summary: "Water quality, volcanic ash, and no property management buffer.",
  },
  {
    id: "limited-medical-access",
    group: "mental",
    label: "Limited medical access",
    summary: "No interpreter for emergencies, prenatal care, or vaccinations.",
  },
  {
    id: "mental-health-strain",
    group: "mental",
    label: "Mental health strain",
    summary: "No counseling access, no psychiatrist referrals in Chinese.",
  },
  {
    id: "education-gaps",
    group: "mental",
    label: "Children's education gaps",
    summary: "KIS slots limited, curriculum alignment is a major concern.",
  },
  {
    id: "kumamoto-lifestyle",
    group: "mental",
    label: "Adapting to Kumamoto lifestyle",
    summary: "Culture shock, daily friction, and social isolation.",
  },
];

const PHYSICAL = PAIN_POINTS.filter((p) => p.group === "physical");
const MENTAL = PAIN_POINTS.filter((p) => p.group === "mental");
const STAGGER = 0.1;
const GROUP_PAUSE = 0.35;

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
    easesRegistered = true;
  }
}

export default function Step10SectionFivePainPoints() {
  const rootRef = useRef(null);

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

    tl.to(physicalEls, {
      visibility: "visible",
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: settle,
      stagger: STAGGER,
    });

    tl.to({}, { duration: GROUP_PAUSE });

    tl.to(mentalEls, {
      visibility: "visible",
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: settle,
      stagger: STAGGER,
    });

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

    const loop = setInterval(() => {
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
  }, []);

  return (
    <div
      ref={rootRef}
      data-proto="step-10"
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
      <Header />
      <GridVariant />
      <ClosingBridge />
    </div>
  );
}

function Header() {
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
        What semiconductor families actually face in Kumamoto.
      </h1>
    </div>
  );
}

function GridVariant() {
  return (
    <div
      style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 1px 1fr",
        gap: 32,
        minHeight: 0,
      }}
    >
      <GroupColumn label="Physical strain" items={PHYSICAL} />
      <div
        aria-hidden
        style={{
          alignSelf: "stretch",
          background: C.border,
          width: 1,
        }}
      />
      <GroupColumn label="Mental strain" items={MENTAL} />
    </div>
  );
}

function GroupColumn({ label, items }) {
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
          <GridCard key={p.id} point={p} />
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
