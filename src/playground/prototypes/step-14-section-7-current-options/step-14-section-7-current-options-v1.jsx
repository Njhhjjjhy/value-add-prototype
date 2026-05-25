/* ───────────────────────────────────────────────────────
   Step 14 — Section 7 current options (iPad Pro 13 M4)
   Mirrors the production component at
     src/components/steps/step-14-section-7-current-options/index.tsx
   Copy is hardcoded verbatim from
     src/content/steps/step-14-section-7-current-options.ts
     (the .prototype.* fields)

   Layout: section label, h1 headline, 3-column image-grid
   with placeholder slots. Flat surfaces on #F9F9F9, thin
   border + subtle shadow per the locked surface scale.
   Single variant — no variant chips needed.
   ─────────────────────────────────────────────────────── */

const C = {
  bg: "#F9F9F9",
  heading: "#25272C",
  body: "#40444C",
  caption: "#5B616E",
  border: "rgba(0,0,0,0.06)",
  imageFill: "#EDEDED",
  imageFillTint: "#E4E4E4",
  placeholderText: "#9A9DA4",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const SLOTS = [
  { caption: "No furniture" },
  { caption: "Before renovation" },
  { caption: "Not ready to move in" },
];

export default function Step14SectionSevenCurrentOptions({
  variant = "A",
  orientation = "landscape",
} = {}) {
  // variant + orientation are accepted to match the playground signature
  // but this prototype has a single variant and adapts via CSS only.
  void variant;
  void orientation;

  return (
    <div
      data-proto="step-14"
      data-variant="A"
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        fontFamily: FONT_BODY,
        paddingTop: "calc(110px + var(--safe-top))",
        paddingBottom: "calc(64px + var(--safe-bottom))",
        paddingLeft: "var(--content-margin)",
        paddingRight: "var(--content-margin)",
        textAlign: "left",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280 }}>
        {/* Section label */}
        <div
          style={{
            fontSize: 13,
            letterSpacing: "0.01em",
            color: C.caption,
            marginBottom: 16,
          }}
        >
          Section 7 · What you would find today
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 48,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: C.heading,
            margin: "0 0 48px 0",
          }}
        >
          Nothing on the market is ready.
        </h1>

        {/* 3-slot image grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 24,
          }}
        >
          {SLOTS.map((s) => (
            <div
              key={s.caption}
              style={{
                background: C.bg,
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                overflow: "hidden",
                boxShadow:
                  "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              {/* Image placeholder */}
              <div
                style={{
                  aspectRatio: "4 / 3",
                  background: `linear-gradient(135deg, ${C.imageFill} 0%, ${C.imageFillTint} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.015em",
                    color: C.placeholderText,
                    fontWeight: 500,
                  }}
                >
                  Before image
                </div>
              </div>

              {/* Caption */}
              <div
                style={{
                  padding: 20,
                  fontFamily: FONT_HEADING,
                  fontWeight: 600,
                  fontSize: 17,
                  color: C.heading,
                }}
              >
                {s.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
