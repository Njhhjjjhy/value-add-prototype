import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PageHeader, PageFooter } from '../page-chrome';
import { shared, C } from '../page-styles';
import { step6 } from '@/content';

const pdf = step6.pdfReserved;

const s = StyleSheet.create({
  ...shared,
  subheading: { fontFamily: 'Noto Sans JP', fontSize: 10, color: C.caption, marginBottom: 20 },
  stepTitle: { fontFamily: 'REM', fontWeight: 600, fontSize: 11, color: C.heading, marginBottom: 4 },
  stepBody: { fontFamily: 'Noto Sans JP', fontSize: 9, lineHeight: 1.55, color: C.body, marginBottom: 14 },
  statValue: { ...shared.statValue, fontSize: 20 },
});

export default function MarketContextPage() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="02 | Market context" />
      <View style={s.content}>
        <Text style={s.heading}>{pdf.sectionTitle}</Text>
        <Text style={s.subheading}>{pdf.sectionSubtitle}</Text>
        <View style={s.twoCol}>
          <View style={s.col}>
            {pdf.pillars.map((pillar) => (
              <View key={pillar.id}>
                <Text style={s.stepTitle}>{pillar.title}</Text>
                <Text style={s.stepBody}>{pillar.body}</Text>
              </View>
            ))}
          </View>
          <View style={s.col}>
            {pdf.stats.map((stat, i) => (
              <View key={i} style={s.statBox}>
                <Text style={s.statValue}>{stat.value}</Text>
                <Text style={s.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <PageFooter pageNumber={5} />
    </View>
  );
}
