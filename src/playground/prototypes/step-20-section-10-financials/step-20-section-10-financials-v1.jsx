/* ───────────────────────────────────────────────────────
   Step 20 — Section 10 financials (canonical underwriting)

   Self-contained playground rebuild that mirrors production
   at src/components/steps/step-20-section-10-financials/index.tsx.

   Canonical copy is hardcoded here (matches src/content/steps/
   step-20-section-10-financials.ts verbatim). The retired
   ¥2B / Bull-Normal-Bear / year-slider / deal-terms UI is gone.

   Internal vertical scroll on the body is the documented
   exception for financials (see CLAUDE.md "Interaction rules").
   ─────────────────────────────────────────────────────── */

const C = {
  bg: "#F9F9F9",
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  party: "#5B616E",
  border: "rgba(0,0,0,0.06)",
  rowDivider: "rgba(0,0,0,0.04)",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

/* ── canonical copy (mirrors src/content/steps/step-20-section-10-financials.ts) ── */

const SECTION_LABEL = "Section 10 · Underwriting";
const HEADLINE = "The numbers.";

const DEVELOPMENT = [
  {
    label: "Initial capital",
    value: "¥35,000,000",
    note: "Land, building, renovation, furniture, appliances and related costs",
    party: "J Estate Co. Ltd.",
  },
];

const RETURNS = [
  { label: "1 unit per year", value: "5.00%" },
  { label: "1.5 units per year", value: "7.50%" },
  { label: "2 units per year", value: "10.00%" },
];

const RENTAL = [
  { label: "Rent (high) · ¥190,000 / month", value: "5.00%" },
  { label: "Rent (average) · ¥160,000 / month", value: "4.21%" },
];

const SALES_GROUPS = [
  {
    heading: "Revenue",
    rows: [
      {
        label: "Sale price",
        value: "¥45,600,000",
        note: "Consumption tax included",
      },
    ],
  },
  {
    heading: "Costs",
    rows: [
      {
        label: "Guaranteed investor interest income",
        value: "¥1,750,000",
        note: "5% per annum",
      },
      {
        label: "Agency commission",
        value: "¥1,368,000",
        note: "3% of sale price, excl. consumption tax",
        party: "MasterHouse Real Estate",
      },
      {
        label: "Travel expenses — sales team",
        value: "¥300,000",
        note: "3 trips (property introduction, contract signing, handover) · ¥100,000 per trip",
        party: "J Estate Co. Ltd.",
      },
      {
        label: "Travel expenses — MoreHarvest",
        value: "¥120,000",
        note: "1 trip (property introduction) · flights and hotel",
        party: "MoreHarvest",
      },
      {
        label: "Entertainment — sales team",
        value: "¥150,000",
        note: "Sales-related hospitality",
        party: "J Estate Co. Ltd.",
      },
      {
        label: "Entertainment — MoreHarvest",
        value: "¥150,000",
        note: "Sales-related hospitality",
        party: "MoreHarvest",
      },
      {
        label: "Sales-related expenses",
        value: "¥800,000",
        note: "Leasing agent fees, advertising, transportation and other actual costs",
        party: "J Estate Co. Ltd.",
      },
      {
        label: "Sales support — Taiwan",
        value: "¥456,000",
        note: "Briefings and backend data system · 1% of sale price",
        party: "MoreHarvest",
      },
      {
        label: "Sales support — Japan",
        value: "¥501,600",
        note: "Kumamoto-side property tours and briefings · 1% of sale price",
        party: "J Estate Co. Ltd.",
      },
    ],
  },
  {
    heading: "Net result",
    rows: [
      {
        label: "Profit (pre-tax)",
        value: "¥5,004,400",
        emphasis: "subtotal",
      },
      {
        label: "Corporate tax",
        value: "¥1,751,540",
        note: "Japan corporate tax",
      },
      {
        label: "Property warranty",
        value: "¥1,368,000",
        note: "10-year property warranty · 3% of base price",
        party: "J Estate Co. Ltd.",
      },
      {
        label: "Net profit",
        value: "¥1,884,860",
        note: "Shared between J Estate Co. Ltd. and MoreHarvest",
        emphasis: "total",
      },
    ],
  },
];

const IRR_PARAGRAPHS = [
  "This strategy focuses on acquiring existing properties for renovation, with a typical construction period of 1 to 2 months. Sales can be initiated during the renovation phase, effectively shortening capital deployment time.",
  "Compared to ground-up development projects, the investment cycle is significantly shorter. Under normal conditions, two full cycles (acquisition, renovation, sale) can be completed within a year, enhancing capital efficiency.",
  "Overall, this is a short-cycle, lower-risk, and high-efficiency investment model.",
];

/* ── row + section primitives ── */

function RowItem({ row, showDivider }) {
  const valueSize =
    row.emphasis === "total" ? 28 : row.emphasis === "subtotal" ? 22 : 18;
  const labelWeight = row.emphasis ? 600 : 400;
  const labelColor = row.emphasis === "total" ? C.heading : C.body;

  return (
    <li
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 16,
        paddingTop: showDivider ? 12 : 0,
        borderTop: showDivider ? `1px solid ${C.rowDivider}` : "none",
        listStyle: "none",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: labelWeight,
            color: labelColor,
          }}
        >
          {row.label}
        </div>
        {row.note || row.party ? (
          <div
            style={{
              fontSize: 13,
              color: C.caption,
              marginTop: 2,
              lineHeight: 1.45,
            }}
          >
            {row.note}
            {row.note && row.party ? " · " : ""}
            {row.party ? (
              <span style={{ color: C.party }}>{row.party}</span>
            ) : null}
          </div>
        ) : null}
      </div>
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: valueSize,
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          color: C.heading,
          whiteSpace: "nowrap",
        }}
      >
        {row.value}
      </div>
    </li>
  );
}

function Section({ title, rows }) {
  return (
    <div
      style={{
        background: C.bg,
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        padding: 24,
        boxShadow:
          "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 22,
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          color: C.heading,
          marginBottom: 16,
        }}
      >
        {title}
      </div>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          margin: 0,
          padding: 0,
        }}
      >
        {rows.map((row, i) => (
          <RowItem key={row.label} row={row} showDivider={i > 0} />
        ))}
      </ul>
    </div>
  );
}

function GroupedSection({ title, groups }) {
  return (
    <div
      style={{
        background: C.bg,
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        padding: 24,
        boxShadow:
          "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 22,
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          color: C.heading,
          marginBottom: 20,
        }}
      >
        {title}
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: 24 }}
      >
        {groups.map((group) => (
          <div key={group.heading ?? "rows"}>
            {group.heading ? (
              <div
                style={{
                  fontSize: 13,
                  letterSpacing: "0.01em",
                  color: C.caption,
                  textTransform: "none",
                  marginBottom: 10,
                }}
              >
                {group.heading}
              </div>
            ) : null}
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                margin: 0,
                padding: 0,
              }}
            >
              {group.rows.map((row, i) => (
                <RowItem key={row.label} row={row} showDivider={i > 0} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── prototype root ── */

export default function Step20SectionTenFinancials({
  variant = "A",
  orientation = "landscape",
} = {}) {
  // Mirrors production: a single full-bleed scroll surface. The playground
  // viewer sizes the iframe to iPad Pro 13 M4 (1366×1024 landscape or
  // 1024×1366 portrait), so this root just fills inset:0 of that frame.
  void variant;
  void orientation;

  return (
    <div
      data-proto="step-20"
      data-variant={variant}
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        paddingTop: "calc(110px + var(--safe-top))",
        paddingBottom: "calc(64px + var(--safe-bottom))",
        paddingLeft: "var(--content-margin)",
        paddingRight: "var(--content-margin)",
        fontFamily: FONT_BODY,
        textAlign: "left",
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
          {SECTION_LABEL}
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
            margin: "0 0 32px 0",
          }}
        >
          {HEADLINE}
        </h1>

        {/* Three-up: Development / Returns / Rental yield */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 24,
            marginBottom: 24,
          }}
        >
          <Section title="Development phase" rows={DEVELOPMENT} />
          <Section title="Return on investment" rows={RETURNS} />
          <Section title="Rental yield" rows={RENTAL} />
        </div>

        {/* Sales phase (Revenue / Costs / Net result) */}
        <div style={{ marginBottom: 48 }}>
          <GroupedSection title="Sales phase" groups={SALES_GROUPS} />
        </div>

        {/* IRR closing paragraphs */}
        <div
          style={{
            maxWidth: 880,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {IRR_PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: C.body,
                margin: 0,
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
