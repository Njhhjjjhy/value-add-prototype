import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PageHeader, PageFooter } from '../page-chrome';
import { shared, C } from '../page-styles';
import { step20 } from '@/content';

const p = step20.prototype;

const s = StyleSheet.create({
  ...shared,
  heading: { ...shared.heading, marginBottom: 4 },
  subheading: { fontFamily: 'Noto Sans JP', fontSize: 8, color: C.caption, marginBottom: 16 },

  threeCol: { flexDirection: 'row', gap: 16 },
  card: {
    flex: 1,
    backgroundColor: C.background,
    borderWidth: 0.5,
    borderColor: C.neutral100,
    borderRadius: 6,
    padding: 12,
  },
  cardTitle: {
    fontFamily: 'REM',
    fontWeight: 600,
    fontSize: 9,
    color: C.heading,
    marginBottom: 10,
  },
  miniRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 5,
    borderTopWidth: 0.5,
    borderTopColor: C.neutral100,
  },
  miniRowFirst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 5,
  },
  miniLabel: { fontFamily: 'Noto Sans JP', fontSize: 7, color: C.body, flex: 1, paddingRight: 6 },
  miniNote: { fontFamily: 'Noto Sans JP', fontSize: 6, color: C.caption, marginTop: 1, lineHeight: 1.35 },
  miniValue: { fontFamily: 'REM', fontWeight: 600, fontSize: 9, color: C.heading, textAlign: 'right' },

  // Sales phase rows
  groupHeading: {
    fontFamily: 'Noto Sans JP',
    fontSize: 7,
    color: C.caption,
    marginTop: 10,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: C.neutral100,
  },
  rowSubtotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: C.neutral200,
    backgroundColor: C.amber50,
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 6,
    backgroundColor: C.amber50,
    paddingHorizontal: 4,
    borderRadius: 3,
    marginTop: 4,
  },
  label: { fontFamily: 'Noto Sans JP', fontSize: 8, color: C.body, flex: 1, paddingRight: 8 },
  labelEmphasis: { fontFamily: 'REM', fontWeight: 600, fontSize: 9, color: C.heading, flex: 1, paddingRight: 8 },
  note: { fontFamily: 'Noto Sans JP', fontSize: 7, color: C.caption, marginTop: 1, lineHeight: 1.35 },
  party: { fontFamily: 'Noto Sans JP', fontSize: 7, color: C.caption, fontStyle: 'italic' },
  value: { fontFamily: 'REM', fontWeight: 600, fontSize: 9, color: C.heading, textAlign: 'right', minWidth: 80 },
  valueSubtotal: { fontFamily: 'REM', fontWeight: 600, fontSize: 11, color: C.heading, textAlign: 'right', minWidth: 80 },
  valueTotal: { fontFamily: 'REM', fontWeight: 600, fontSize: 13, color: C.heading, textAlign: 'right', minWidth: 80 },

  closing: {
    fontFamily: 'Noto Sans JP',
    fontSize: 8,
    color: C.body,
    lineHeight: 1.55,
    marginTop: 8,
  },
});

function MetaLine({ note, party }: { note?: string | null; party?: string | null }) {
  if (!note && !party) return null;
  return (
    <Text style={s.note}>
      {note ?? ''}
      {note && party ? ' · ' : ''}
      {party ? <Text style={s.party}>{party}</Text> : null}
    </Text>
  );
}

export function FinancialsPage1() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="07 | Financial projections" />
      <View style={s.content}>
        <Text style={s.heading}>The numbers.</Text>
        <Text style={s.subheading}>{p.sectionLabel}</Text>

        <View style={s.threeCol}>
          {/* Development phase */}
          <View style={s.card}>
            <Text style={s.cardTitle}>Development phase</Text>
            {p.development.map((row, i) => (
              <View key={row.row} style={i === 0 ? s.miniRowFirst : s.miniRow}>
                <View style={{ flex: 1, paddingRight: 6 }}>
                  <Text style={s.miniLabel}>{row.row}</Text>
                  <MetaLine note={row.note} party={row.party} />
                </View>
                <Text style={s.miniValue}>{row.value}</Text>
              </View>
            ))}
          </View>

          {/* Return on investment */}
          <View style={s.card}>
            <Text style={s.cardTitle}>Return on investment</Text>
            {p.returnOnInvestment.map((row, i) => (
              <View key={row.scenario} style={i === 0 ? s.miniRowFirst : s.miniRow}>
                <Text style={s.miniLabel}>{row.scenario}</Text>
                <Text style={s.miniValue}>{row.return}</Text>
              </View>
            ))}
          </View>

          {/* Rental yield */}
          <View style={s.card}>
            <Text style={s.cardTitle}>Rental yield</Text>
            {p.rentalYield.map((row, i) => (
              <View key={row.scenario} style={i === 0 ? s.miniRowFirst : s.miniRow}>
                <Text style={s.miniLabel}>{row.scenario}</Text>
                <Text style={s.miniValue}>{row.yield}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <PageFooter pageNumber={16} />
    </View>
  );
}

export function FinancialsPage2() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="07 | Sales phase" />
      <View style={s.content}>
        <Text style={s.heading}>Sales phase.</Text>
        <Text style={s.subheading}>Revenue, costs, and net result on one cycle.</Text>

        <View style={shared.twoCol}>
          {/* Left column: Revenue + Costs */}
          <View style={shared.col}>
            <Text style={s.groupHeading}>Revenue</Text>
            {p.salesRevenue.map((row) => (
              <View key={row.row} style={s.row}>
                <View style={{ flex: 1, paddingRight: 8 }}>
                  <Text style={s.label}>{row.row}</Text>
                  <MetaLine note={row.note} />
                </View>
                <Text style={s.value}>{row.value}</Text>
              </View>
            ))}

            <Text style={s.groupHeading}>Costs</Text>
            {p.salesCosts.map((row) => (
              <View key={row.row} style={s.row}>
                <View style={{ flex: 1, paddingRight: 8 }}>
                  <Text style={s.label}>{row.row}</Text>
                  <MetaLine note={row.note} party={row.party} />
                </View>
                <Text style={s.value}>{row.value}</Text>
              </View>
            ))}
          </View>

          {/* Right column: Net result + closing */}
          <View style={shared.col}>
            <Text style={s.groupHeading}>Net result</Text>
            {p.netResult.map((row) => {
              const isSubtotal = row.row === 'Profit (pre-tax)';
              const isTotal = row.row === 'Net profit';
              const rowStyle = isTotal ? s.rowTotal : isSubtotal ? s.rowSubtotal : s.row;
              const labelStyle = isSubtotal || isTotal ? s.labelEmphasis : s.label;
              const valueStyle = isTotal ? s.valueTotal : isSubtotal ? s.valueSubtotal : s.value;
              return (
                <View key={row.row} style={rowStyle}>
                  <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text style={labelStyle}>{row.row}</Text>
                    <MetaLine note={row.note} party={row.party} />
                  </View>
                  <Text style={valueStyle}>{row.value}</Text>
                </View>
              );
            })}

            {p.irrClosing.map((para, i) => (
              <Text key={i} style={s.closing}>{para}</Text>
            ))}
          </View>
        </View>
      </View>
      <PageFooter pageNumber={17} />
    </View>
  );
}
