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
  party: '#5B616E',
  border: 'rgba(0,0,0,0.06)',
  rowDivider: 'rgba(0,0,0,0.04)',
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

type Row = {
  label: string;
  value: string;
  note?: string;
  party?: string;
  emphasis?: 'subtotal' | 'total';
};

type Group = { heading?: string; rows: Row[] };

const DEVELOPMENT: Row[] = [
  {
    label: 'Initial capital',
    value: '¥35,000,000',
    note: 'Land, building, renovation, furniture, appliances and related costs',
    party: 'J Estate Co. Ltd.',
  },
];

const SALES_GROUPS: Group[] = [
  {
    heading: 'Revenue',
    rows: [
      {
        label: 'Sale price',
        value: '¥45,600,000',
        note: 'Consumption tax included',
      },
    ],
  },
  {
    heading: 'Costs',
    rows: [
      {
        label: 'Guaranteed investor interest income',
        value: '¥1,750,000',
        note: '5% per annum',
      },
      {
        label: 'Agency commission',
        value: '¥1,368,000',
        note: '3% of sale price, excl. consumption tax',
        party: 'MasterHouse Real Estate',
      },
      {
        label: 'Travel expenses — sales team',
        value: '¥300,000',
        note: '3 trips (property introduction, contract signing, handover) · ¥100,000 per trip',
        party: 'J Estate Co. Ltd.',
      },
      {
        label: 'Travel expenses — MoreHarvest',
        value: '¥120,000',
        note: '1 trip (property introduction) · flights and hotel',
        party: 'MoreHarvest',
      },
      {
        label: 'Entertainment — sales team',
        value: '¥150,000',
        note: 'Sales-related hospitality',
        party: 'J Estate Co. Ltd.',
      },
      {
        label: 'Entertainment — MoreHarvest',
        value: '¥150,000',
        note: 'Sales-related hospitality',
        party: 'MoreHarvest',
      },
      {
        label: 'Sales-related expenses',
        value: '¥800,000',
        note: 'Leasing agent fees, advertising, transportation and other actual costs',
        party: 'J Estate Co. Ltd.',
      },
      {
        label: 'Sales support — Taiwan',
        value: '¥456,000',
        note: 'Briefings and backend data system · 1% of sale price',
        party: 'MoreHarvest',
      },
      {
        label: 'Sales support — Japan',
        value: '¥501,600',
        note: 'Kumamoto-side property tours and briefings · 1% of sale price',
        party: 'J Estate Co. Ltd.',
      },
    ],
  },
  {
    heading: 'Net result',
    rows: [
      {
        label: 'Profit (pre-tax)',
        value: '¥5,004,400',
        emphasis: 'subtotal',
      },
      {
        label: 'Corporate tax',
        value: '¥1,751,540',
        note: 'Japan corporate tax',
      },
      {
        label: 'Property warranty',
        value: '¥1,368,000',
        note: '10-year property warranty · 3% of base price',
        party: 'J Estate Co. Ltd.',
      },
      {
        label: 'Net profit',
        value: '¥1,884,860',
        note: 'Shared between J Estate Co. Ltd. and MoreHarvest',
        emphasis: 'total',
      },
    ],
  },
];

const RETURNS: Row[] = [
  { label: '1 unit per year', value: '5.00%' },
  { label: '1.5 units per year', value: '7.50%' },
  { label: '2 units per year', value: '10.00%' },
];

const RENTAL: Row[] = [
  { label: 'Rent (high) · ¥190,000 / month', value: '5.00%' },
  { label: 'Rent (average) · ¥160,000 / month', value: '4.21%' },
];

const IRR_PARAGRAPHS = [
  'This strategy focuses on acquiring existing properties for renovation, with a typical construction period of 1 to 2 months. Sales can be initiated during the renovation phase, effectively shortening capital deployment time.',
  'Compared to ground-up development projects, the investment cycle is significantly shorter. Under normal conditions, two full cycles (acquisition, renovation, sale) can be completed within a year, enhancing capital efficiency.',
  'Overall, this is a short-cycle, lower-risk, and high-efficiency investment model.',
];

function RowItem({
  row,
  showDivider,
}: {
  row: Row;
  showDivider: boolean;
}) {
  const valueSize =
    row.emphasis === 'total' ? 28 : row.emphasis === 'subtotal' ? 22 : 18;
  const labelWeight = row.emphasis ? 600 : 400;
  const labelColor = row.emphasis === 'total' ? C.heading : C.body;

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 16,
        paddingTop: showDivider ? 12 : 0,
        borderTop: showDivider ? `1px solid ${C.rowDivider}` : 'none',
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
            {row.note && row.party ? ' · ' : ''}
            {row.party ? <span style={{ color: C.party }}>{row.party}</span> : null}
          </div>
        ) : null}
      </div>
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: valueSize,
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
          color: row.emphasis === 'total' ? C.heading : C.heading,
          whiteSpace: 'nowrap',
        }}
      >
        {row.value}
      </div>
    </li>
  );
}

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
          <RowItem key={row.label} row={row} showDivider={i > 0} />
        ))}
      </ul>
    </div>
  );
}

function GroupedSection({
  title,
  groups,
}: {
  title: string;
  groups: Group[];
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
          marginBottom: 20,
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {groups.map((group) => (
          <div key={group.heading ?? 'rows'}>
            {group.heading ? (
              <div
                style={{
                  fontSize: 13,
                  letterSpacing: '0.01em',
                  color: C.caption,
                  textTransform: 'none',
                  marginBottom: 10,
                }}
              >
                {group.heading}
              </div>
            ) : null}
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            marginBottom: 24,
          }}
        >
          <Section title="Development phase" rows={DEVELOPMENT} />
          <Section title="Return on investment" rows={RETURNS} />
          <Section title="Rental yield" rows={RENTAL} />
        </div>

        <div style={{ marginBottom: 48 }}>
          <GroupedSection title="Sales phase" groups={SALES_GROUPS} />
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
