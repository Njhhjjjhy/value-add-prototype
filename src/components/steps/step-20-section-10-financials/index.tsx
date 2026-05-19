'use client';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  bg: '#F9F9F9',
  heading: '#25272C',
  sub: '#383A42',
  body: '#40444C',
  caption: '#5B616E',
  border: 'rgba(0,0,0,0.06)',
  rowDivider: 'rgba(0,0,0,0.04)',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

type Row = { label: string; value: string; note?: string };

const DEVELOPMENT: Row[] = [
  {
    label: 'Initial capital',
    value: '¥35,000,000',
    note: 'Land, building, renovation, furniture, appliances',
  },
];

const SALES: Row[] = [
  { label: 'Sale price', value: '¥45,600,000', note: 'Consumption tax included' },
  { label: 'Net profit (pre-tax)', value: '¥5,004,400' },
  {
    label: 'Net profit',
    value: '¥1,884,860',
    note: 'After Japan corporate tax and 10-year property warranty',
  },
];

const RETURNS: Row[] = [
  { label: '1 unit per year', value: '5.00%' },
  { label: '1.5 units per year', value: '7.50%' },
  { label: '2 units per year', value: '10.00%' },
];

const RENTAL: Row[] = [
  { label: 'Rent (high) · ¥190,000', value: '5.00%' },
  { label: 'Rent (average) · ¥160,000', value: '4.21%' },
];

const IRR_PARAGRAPHS = [
  'This strategy focuses on acquiring existing properties for renovation, with a typical construction period of 1 to 2 months. Sales can be initiated during the renovation phase, effectively shortening capital deployment time.',
  'Compared to ground-up development projects, the investment cycle is significantly shorter. Under normal conditions, two full cycles (acquisition, renovation, sale) can be completed within a year, enhancing capital efficiency.',
  'Overall, this is a short-cycle, lower-risk, and high-efficiency investment model.',
];

function Section({
  title,
  rows,
}: {
  title: string;
  rows: Row[];
}) {
  return (
    <div
      style={{
        background: C.bg,
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        padding: 24,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 22,
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
          color: C.heading,
          marginBottom: 16,
        }}
      >
        {title}
      </div>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rows.map((row, i) => (
          <li
            key={row.label}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: 16,
              paddingTop: i === 0 ? 0 : 12,
              borderTop:
                i === 0 ? 'none' : `1px solid ${C.rowDivider}`,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, color: C.body }}>{row.label}</div>
              {row.note ? (
                <div
                  style={{
                    fontSize: 13,
                    color: C.caption,
                    marginTop: 2,
                  }}
                >
                  {row.note}
                </div>
              ) : null}
            </div>
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: 22,
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
                color: C.heading,
                whiteSpace: 'nowrap',
              }}
            >
              {row.value}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Step20Section10Financials({ onComplete }: StepProps) {
  return (
    <button
      type="button"
      onClick={onComplete}
      className="absolute inset-0 w-full h-full text-left overflow-y-auto"
      style={{
        background: C.bg,
        paddingTop: 'calc(110px + var(--safe-top))',
        paddingBottom: 'calc(64px + var(--safe-bottom))',
        paddingLeft: 'var(--content-margin)',
        paddingRight: 'var(--content-margin)',
        fontFamily: FONT_BODY,
      }}
    >
      <div className="max-w-[1280px]">
        <div
          style={{
            fontSize: 13,
            letterSpacing: '0.01em',
            color: C.caption,
            marginBottom: 16,
          }}
        >
          Section 10 · Underwriting
        </div>

        <h1
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 48,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: C.heading,
            marginBottom: 32,
          }}
        >
          The numbers.
        </h1>

        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            marginBottom: 24,
          }}
        >
          <Section title="Development phase" rows={DEVELOPMENT} />
          <Section title="Sales phase" rows={SALES} />
        </div>

        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            marginBottom: 48,
          }}
        >
          <Section title="Return on investment" rows={RETURNS} />
          <Section title="Rental yield" rows={RENTAL} />
        </div>

        <div style={{ maxWidth: 880, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {IRR_PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: C.body,
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </button>
  );
}
