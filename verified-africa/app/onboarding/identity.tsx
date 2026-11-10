import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors, dimensions, fontFamilies, radii, spacing, typography } from '../../constants/theme';
import { DevelopmentNotice } from '../../components/onboarding/FlowIntro';
import { OnboardingScreen } from '../../components/onboarding/OnboardingScreen';

const steps = [
  { number: '1', title: 'Snap your government ID', detail: "NIN, passport, driver's licence or voter's card" },
  { number: '2', title: 'Take a liveness selfie', detail: 'A quick face check matches you to your ID.' },
];

export default function IdentityIntroductionScreen() {
  const { profileSetup } = useLocalSearchParams<{ profileSetup?: string }>();
  const profileSetupWarning = profileSetup === 'missing'
    ? 'Your phone is verified, but the automatic profile record was not found. No duplicate was created. Please contact support before continuing.'
    : profileSetup === 'check_failed'
      ? 'Your phone is verified, but we could not check your profile record. No duplicate was created. Please try again later or contact support.'
      : null;

  return (
    <OnboardingScreen onContinue={() => router.push('/onboarding/id')} continueLabel={__DEV__ ? "I'm ready" : 'Verification unavailable'} disabled={!__DEV__} contentStyle={styles.content}>
      <Text style={styles.title}>Two quick steps to verify.</Text>
      <View style={styles.steps}>{steps.map((step) => <View key={step.number} style={styles.step}><View style={styles.number}><Text style={styles.numberText}>{step.number}</Text></View><View style={styles.stepCopy}><Text style={styles.stepTitle}>{step.title}</Text><Text style={styles.stepDetail}>{step.detail}</Text></View></View>)}</View>
      <View style={styles.privacy}><Text style={styles.lock}>♙</Text><Text style={styles.privacyText}>Encrypted. Never shared publicly.</Text></View>
      {profileSetupWarning ? <Text accessibilityLiveRegion="polite" style={styles.profileWarning}>{profileSetupWarning}</Text> : null}
      <DevelopmentNotice>Development demo — identity checks are simulated and no ID is collected.</DevelopmentNotice>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({ content: { paddingTop: spacing[8] }, title: { ...typography.subheading, color: colors.indigo, marginBottom: spacing[4] }, steps: { gap: spacing[2] }, step: { minHeight: 80, flexDirection: 'row', alignItems: 'center', padding: spacing[3], backgroundColor: colors.neutral, gap: spacing[3] }, number: { width: 28, height: 28, borderRadius: radii.circle, backgroundColor: colors.coral, alignItems: 'center', justifyContent: 'center' }, numberText: { color: colors.surface, fontFamily: fontFamilies.bold, fontSize: 14 }, stepCopy: { flex: 1, gap: 3 }, stepTitle: { ...typography.label, color: colors.text }, stepDetail: { ...typography.caption, fontSize: 10, color: colors.textMuted }, privacy: { minHeight: dimensions.minimumTapTarget, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing[2], borderColor: colors.divider, borderWidth: 1, marginTop: spacing[4], marginBottom: spacing[4] }, lock: { color: colors.coin, fontSize: 14 }, privacyText: { ...typography.caption, color: colors.text }, profileWarning: { ...typography.caption, color: colors.coral, backgroundColor: colors.neutral, padding: spacing[3], marginBottom: spacing[3] } });
