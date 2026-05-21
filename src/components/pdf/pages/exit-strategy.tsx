import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PageHeader, PageFooter } from '../page-chrome';
import { shared, C } from '../page-styles';
import { step24 } from '@/content';

const s = StyleSheet.create({
  ...shared,
  subheading: { fontFamily: 'Noto Sans JP', fontSize: 11, color: C.caption, marginBottom: 24 },
  body: { fontFamily: 'Noto Sans JP', fontSize: 10, lineHeight: 1.6, color: C.body, maxWidth: 460 },
});

export default function ExitStrategyPage() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="09 | Exit strategy" />
      <View style={s.content}>
        <Text style={s.heading}>{step24.prototype.headline}</Text>
        <Text style={s.subheading}>{step24.prototype.subheadline}</Text>
        <Text style={s.body}>{step24.prototype.body}</Text>
      </View>
      <PageFooter pageNumber={22} />
    </View>
  );
}
