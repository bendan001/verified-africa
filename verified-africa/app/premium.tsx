import { useState } from 'react';
import { router } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppTabScaffold } from '../components/navigation/AppTabScaffold';
import { PremiumPlanCard, PrimaryButton, ScreenHeader } from '../components/ui';
import { colors, dimensions, fontFamilies, spacing, typography } from '../constants/theme';
import { formatMarketPrice, mockPremiumConfiguration } from '../data/mockData';

export default function PremiumScreen() {
  const [selected, setSelected] = useState(true);
  const monthlyLabel = formatMarketPrice(mockPremiumConfiguration.monthlyPrice, mockPremiumConfiguration.currency, mockPremiumConfiguration.locale);
  return (
    <AppTabScaffold selected="wallet">
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Verified+" onBackPress={() => router.back()} style={styles.header} />
        <View style={styles.hero}><Text style={styles.brand}>VERIFIED+</Text><Text style={styles.heroTitle}>Go further,{ '\n' }stay verified.</Text></View>
        <Text style={styles.intro}>Premium adds reach and convenience. Core safety stays free for everyone.</Text>
        <PremiumPlanCard name="Monthly" priceLabel={monthlyLabel} periodLabel="/ month" selected={selected} onPress={() => setSelected(true)} benefits={['Unlimited messaging', 'See who viewed you']} style={styles.plan} />
        <Text style={styles.priceNote}>Nigeria price · configurable by market</Text>
        <View style={styles.benefits}>
          <Benefit title="Unlimited messaging" body="Match, DM, and chat with no daily caps." />
          <Benefit title="See profile views" body="Know who’s interested — mutually." />
          <Benefit title="Priority discover" body="Appear earlier in verified feeds." />
          <Benefit title="Verified+ badge" body="An elevated mark for long-term members." />
        </View>
        <View style={styles.quote}><Text style={styles.quoteText}>“Finally a social app where I don’t have to screenshot before replying. It just feels safer.”</Text><Text style={styles.quoteAuthor}>— Amara O. · Verified</Text></View>
        <PrimaryButton label="Upgrade to Verified+" onPress={() => Alert.alert('Demo only', 'Subscriptions and payments are not connected.')} style={styles.cta} />
        <Text style={styles.assurance}>Subscription preview · no payment will be taken</Text>
      </ScrollView>
    </AppTabScaffold>
  );
}

function Benefit({ title, body }: { title: string; body: string }) {
  return <View style={styles.benefit}><View style={styles.benefitMark}><Text style={styles.plus}>+</Text></View><Text style={styles.benefitTitle}>{title}</Text><Text style={styles.benefitBody}>{body}</Text></View>;
}

const styles = StyleSheet.create({ content: { width: '100%', maxWidth: dimensions.contentMaxWidth, alignSelf: 'center', paddingHorizontal: dimensions.screenPadding, paddingBottom: spacing[6] }, header: { paddingHorizontal: 0 }, hero: { minHeight: 136, justifyContent: 'center', padding: spacing[4], backgroundColor: colors.indigo }, brand: { ...typography.eyebrow, color: colors.coral, fontSize: 10, marginBottom: spacing[2] }, heroTitle: { color: colors.surface, fontFamily: fontFamilies.bold, fontSize: 22, lineHeight: 28 }, intro: { ...typography.bodySmall, color: colors.textMuted, marginVertical: spacing[3] }, plan: { marginTop: spacing[2] }, priceNote: { ...typography.caption, color: colors.textMuted, marginTop: spacing[2] }, benefits: { gap: spacing[2], marginTop: spacing[4] }, benefit: { minHeight: 78, padding: spacing[3], borderWidth: 1, borderColor: colors.divider }, benefitMark: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.coralSoft, marginBottom: spacing[1] }, plus: { color: colors.coral, fontFamily: fontFamilies.bold }, benefitTitle: { ...typography.label, color: colors.text }, benefitBody: { ...typography.caption, color: colors.textMuted }, quote: { padding: spacing[4], backgroundColor: colors.indigo, marginTop: spacing[4] }, quoteText: { ...typography.label, color: colors.surface }, quoteAuthor: { ...typography.caption, color: colors.coralSoft, marginTop: spacing[3] }, cta: { marginTop: spacing[4] }, assurance: { ...typography.caption, color: colors.textMuted, textAlign: 'center', marginTop: spacing[2] } });
