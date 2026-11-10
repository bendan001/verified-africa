import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, dimensions, fontFamilies, radii, spacing, typography } from '../../constants/theme';
import { DevelopmentNotice, FlowIntro } from '../../components/onboarding/FlowIntro';
import { OnboardingScreen } from '../../components/onboarding/OnboardingScreen';
import { SecondaryButton } from '../../components/ui';

function SampleIdentityCard() {
  return (
    <View accessibilityLabel="Illustrative sample identity card. No real ID is being processed." style={styles.sampleCard}>
      <View style={styles.cardPhoto} />
      <View style={styles.cardCopy}><Text style={styles.cardEyebrow}>SAMPLE ONLY</Text><Text style={styles.cardCountry}>FEDERAL REPUBLIC</Text><Text style={styles.cardName}>SAMPLE PERSON</Text><Text style={styles.cardMeta}>ID DETAILS NOT COLLECTED</Text></View>
    </View>
  );
}

export default function IdVerificationScreen() {
  const simulate = () => router.push('/onboarding/liveness');
  return (
    <OnboardingScreen onContinue={simulate} continueLabel={__DEV__ ? 'Simulate demo capture' : 'ID verification unavailable'} disabled={!__DEV__} contentStyle={styles.content} footer={__DEV__ ? <SecondaryButton label="Upload demo instead" onPress={simulate} /> : null}>
      <FlowIntro title="Capture your ID." description="Fit the card inside the frame." />
      <View style={styles.frame}><SampleIdentityCard /></View>
      <View style={styles.checklist}><Text style={styles.checkItem}>✓  Good lighting</Text><Text style={styles.checkItem}>✓  No glare</Text><Text style={styles.checkItem}>✓  All 4 edges visible</Text></View>
      <DevelopmentNotice>Development demo — capture and upload do not use a camera or send identity data.</DevelopmentNotice>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({ content: { paddingTop: spacing[8] }, frame: { width: '100%', aspectRatio: 1.45, backgroundColor: colors.indigoDeep, alignItems: 'center', justifyContent: 'center', padding: spacing[4], marginBottom: spacing[3] }, sampleCard: { width: '88%', aspectRatio: 1.58, flexDirection: 'row', alignItems: 'center', padding: spacing[3], gap: spacing[3], backgroundColor: '#DDE3F0', borderRadius: radii.none }, cardPhoto: { width: '30%', aspectRatio: 0.82, backgroundColor: colors.indigo }, cardCopy: { flex: 1, gap: 4 }, cardEyebrow: { color: colors.coral, fontFamily: fontFamilies.bold, fontSize: 8, letterSpacing: 1 }, cardCountry: { color: colors.indigo, fontFamily: fontFamilies.bold, fontSize: 8 }, cardName: { color: colors.indigo, fontFamily: fontFamilies.bold, fontSize: 10 }, cardMeta: { color: colors.textMuted, fontFamily: fontFamilies.body, fontSize: 7 }, checklist: { minHeight: dimensions.minimumTapTarget, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: colors.neutral, marginBottom: spacing[4] }, checkItem: { ...typography.caption, fontSize: 10, color: colors.text } });
