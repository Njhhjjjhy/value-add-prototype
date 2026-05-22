import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PageHeader, PageFooter } from '../page-chrome';
import { shared, C } from '../page-styles';
import { step2 } from '@/content';

const exec = step2.pdfReserved!.executiveSummary as {
  heading: string;
  subheading: string;
  bodyShort: string;
  bodyLong: string;
  stats: ReadonlyArray<{ value: string; label: string }>;
};

const s = StyleSheet.create({
  ...shared,
  heading: { ...shared.heading, fontSize: 24, marginBottom: 8 },
  subheading: { fontFamily: 'REM', fontWeight: 600, fontSize: 14, color: C.subheading, marginBottom: 20 },
  bodyCol: { flexDirection: 'row', gap: 40 },
  body: { ...shared.body, fontSize: 10, lineHeight: 1.65, marginBottom: 0 },
  statsRow: { flexDirection: 'row', gap: 20, marginTop: 24 },
  statBox: { ...shared.statBox, flex: 1, padding: 14, marginBottom: 0 },
  statValue: { ...shared.statValue, fontSize: 22, marginBottom: 4 },
});

export default function ExecutiveSummaryPage() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="01 | Executive summary" />

      <View style={s.content}>
        <Text style={s.heading}>{exec.heading}</Text>
        <Text style={s.subheading}>{exec.subheading}</Text>

        <View style={s.bodyCol}>
          <View style={s.col}>
            <Text style={s.body}>{exec.bodyShort}</Text>
          </View>
          <View style={s.col}>
            <Text style={s.body}>{exec.bodyLong}</Text>
          </View>
        </View>

        <View style={s.statsRow}>
          {exec.stats.map((stat) => (
            <View key={stat.value} style={s.statBox}>
              <Text style={s.statValue}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <PageFooter pageNumber={3} />
    </View>
  );
}
