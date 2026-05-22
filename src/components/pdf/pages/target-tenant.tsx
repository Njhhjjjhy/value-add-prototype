import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PageHeader, PageFooter } from '../page-chrome';
import { shared, C } from '../page-styles';
import { step10, step12 } from '@/content';

const personaStat = step10.prototype.personaStat;
const persona = step12.pdfReserved;
const physical = step10.pdfReserved.physical;
const mental = step10.pdfReserved.mental;

const s = StyleSheet.create({
  ...shared,
  categoryLabel: { fontFamily: 'REM', fontWeight: 600, fontSize: 10, color: C.amber600, marginBottom: 10 },
  painTitle: { fontFamily: 'REM', fontWeight: 600, fontSize: 9, color: C.heading, marginBottom: 2 },
  painBody: { fontFamily: 'Noto Sans JP', fontSize: 8, lineHeight: 1.5, color: C.body, marginBottom: 2 },
  painCompanies: { fontFamily: 'Noto Sans JP', fontSize: 7, color: C.caption, marginBottom: 10 },
  statBox: { ...shared.statBox, marginBottom: 16 },
});

export function TargetTenantPage1() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="03 | Target tenant" />
      <View style={s.content}>
        <View style={s.statBox}>
          <Text style={s.statValue}>{personaStat.value}</Text>
          <Text style={s.statLabel}>{personaStat.label}</Text>
        </View>
        <Text style={s.heading}>{persona.personaHeading}</Text>
        <View style={s.twoCol}>
          <View style={s.col}>
            <Text style={s.body}>{persona.personaConcept}</Text>
          </View>
          <View style={s.col}>
            <Text style={s.body}>{persona.personaMessage}</Text>
          </View>
        </View>
      </View>
      <PageFooter pageNumber={7} />
    </View>
  );
}

export function TargetTenantPage2() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="03 | Target tenant - pain points" />
      <View style={s.content}>
        <Text style={s.heading}>Pain points</Text>
        <View style={s.twoCol}>
          <View style={s.col}>
            <Text style={s.categoryLabel}>Physical</Text>
            {physical.map((p) => (
              <View key={p.id}>
                <Text style={s.painTitle}>{p.label}</Text>
                <Text style={s.painBody}>{p.expanded}</Text>
                <Text style={s.painCompanies}>Companies: {p.companies.join(', ')}</Text>
              </View>
            ))}
          </View>
          <View style={s.col}>
            <Text style={s.categoryLabel}>Mental</Text>
            {mental.map((p) => (
              <View key={p.id}>
                <Text style={s.painTitle}>{p.label}</Text>
                <Text style={s.painBody}>{p.expanded}</Text>
                <Text style={s.painCompanies}>Companies: {p.companies.join(', ')}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <PageFooter pageNumber={8} />
    </View>
  );
}
