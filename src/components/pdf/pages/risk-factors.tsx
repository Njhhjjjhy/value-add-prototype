import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PageHeader, PageFooter } from '../page-chrome';
import { shared, C } from '../page-styles';
import { step22, step26 } from '@/content';

const beat5 = step22.prototype.beat5;
const parallel = step26.prototype;
const mohaIntelLine = step26.pdfReserved.mohaIntelLine;

const s = StyleSheet.create({
  ...shared,
  subheading: { fontFamily: 'Noto Sans JP', fontSize: 8, color: C.caption, marginBottom: 12 },
  twoCol: { flexDirection: 'row', gap: 30 },
  colHeading: { fontFamily: 'REM', fontWeight: 600, fontSize: 10, color: C.heading, marginBottom: 1 },
  colCaption: { fontFamily: 'Noto Sans JP', fontSize: 7, color: C.caption, marginBottom: 8 },
  phaseYear: { fontFamily: 'REM', fontWeight: 600, fontSize: 8, color: C.heading, marginBottom: 1 },
  phaseTitle: { fontFamily: 'Noto Sans JP', fontSize: 7, color: C.subheading, marginBottom: 2 },
  phaseBody: { fontFamily: 'Noto Sans JP', fontSize: 7, lineHeight: 1.45, color: C.body, marginBottom: 8 },
  calloutBox: { backgroundColor: C.amber50, borderRadius: 3, padding: 5, marginBottom: 8 },
  calloutBody: { fontFamily: 'Noto Sans JP', fontSize: 7, lineHeight: 1.45, color: C.body, fontStyle: 'italic' },
  metricBox: { backgroundColor: C.amber50, borderRadius: 3, padding: 6, marginBottom: 4 },
  metricBoxAlt: { backgroundColor: C.neutral100, borderRadius: 3, padding: 6, marginBottom: 4 },
  metricValue: { fontFamily: 'REM', fontWeight: 600, fontSize: 14, color: C.heading },
  metricLabel: { fontFamily: 'Noto Sans JP', fontSize: 7, color: C.caption },
  metricSub: { fontFamily: 'Noto Sans JP', fontSize: 6, color: C.caption, marginTop: 1 },
  positionBox: { backgroundColor: C.amber50, borderRadius: 4, padding: 10, marginTop: 8 },
  positionLead: { fontFamily: 'REM', fontWeight: 600, fontSize: 9, color: C.heading, marginBottom: 4 },
  positionText: { fontFamily: 'Noto Sans JP', fontSize: 8, lineHeight: 1.5, color: C.body },
  // Risk panels page
  riskGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  riskCard: { width: '48%', borderWidth: 0.5, borderColor: C.neutral200, borderRadius: 4, padding: 10, marginBottom: 4 },
  riskName: { fontFamily: 'REM', fontWeight: 600, fontSize: 9, color: C.heading, marginBottom: 5 },
  riskGroupLabel: { fontFamily: 'Noto Sans JP', fontSize: 6, color: C.caption, letterSpacing: 0.3, marginBottom: 2 },
  riskBody: { fontFamily: 'Noto Sans JP', fontSize: 7, lineHeight: 1.45, color: C.body, marginBottom: 6 },
  hedgeRow: { flexDirection: 'row', marginBottom: 2 },
  hedgeBullet: { fontFamily: 'Noto Sans JP', fontSize: 7, lineHeight: 1.45, color: C.caption, width: 8 },
  hedgeText: { fontFamily: 'Noto Sans JP', fontSize: 7, lineHeight: 1.45, color: C.body, flex: 1 },
});

export function RiskHsinchuPage() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="08 | Risk factors - Hsinchu precedent" />
      <View style={s.content}>
        <Text style={s.heading}>Kumamoto-Hsinchu parallel timeline</Text>
        <View style={s.twoCol}>
          <View style={s.col}>
            <Text style={s.colHeading}>{parallel.kumamoto.headline}</Text>
            <Text style={s.colCaption}>{parallel.kumamoto.caption} · {parallel.kumamoto.badge}</Text>
            {parallel.kumamoto.timeline.map((p, i) =>
              'isCallout' in p && p.isCallout ? (
                <View key={i} style={s.calloutBox}>
                  <Text style={s.calloutBody}>{p.detail}</Text>
                </View>
              ) : (
                <View key={i}>
                  {p.years && <Text style={s.phaseYear}>{p.years}</Text>}
                  {p.title && <Text style={s.phaseTitle}>{p.title}</Text>}
                  <Text style={s.phaseBody}>{p.detail}</Text>
                </View>
              )
            )}
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {parallel.kumamoto.metrics.map((m, i) => (
                <View key={i} style={[s.metricBox, { flex: 1 }]}>
                  <Text style={s.metricValue}>{m.stat}</Text>
                  <Text style={s.metricLabel}>{m.label}</Text>
                  <Text style={s.metricSub}>{m.sub}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={s.col}>
            <Text style={[s.colHeading, { color: C.caption }]}>{parallel.hsinchu.headline}</Text>
            <Text style={s.colCaption}>{parallel.hsinchu.caption} · {parallel.hsinchu.badge}</Text>
            {parallel.hsinchu.timeline.map((p, i) => (
              <View key={i}>
                {p.years && <Text style={s.phaseYear}>{p.years}</Text>}
                {p.title && <Text style={s.phaseTitle}>{p.title}</Text>}
                <Text style={s.phaseBody}>{p.detail}</Text>
              </View>
            ))}
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {parallel.hsinchu.metrics.map((m, i) => (
                <View key={i} style={[s.metricBoxAlt, { flex: 1 }]}>
                  <Text style={s.metricValue}>{m.stat}</Text>
                  <Text style={s.metricLabel}>{m.label}</Text>
                  <Text style={s.metricSub}>{m.sub}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={s.positionBox}>
          <Text style={s.positionLead}>{parallel.closingLine}</Text>
          <Text style={s.positionText}>{mohaIntelLine}</Text>
        </View>
      </View>
      <PageFooter pageNumber={19} />
    </View>
  );
}

export function RiskPanelsPage() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="08 | Risk factors and hedges" />
      <View style={s.content}>
        <Text style={s.heading}>Risk factors and hedges</Text>
        <Text style={s.subheading}>Every investment carries risk. Here is how this one is structured to mitigate them.</Text>
        <View style={s.riskGrid}>
          {beat5.risks.map((panel) => (
            <View key={panel.name} style={s.riskCard}>
              <Text style={s.riskName}>{panel.name}</Text>
              <Text style={s.riskGroupLabel}>Risk</Text>
              <Text style={s.riskBody}>{panel.risk}</Text>
              <Text style={s.riskGroupLabel}>Hedges</Text>
              {panel.hedges.map((hedge, i) => (
                <View key={i} style={s.hedgeRow}>
                  <Text style={s.hedgeBullet}>•</Text>
                  <Text style={s.hedgeText}>{hedge}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
      <PageFooter pageNumber={20} />
    </View>
  );
}
