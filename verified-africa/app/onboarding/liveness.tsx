import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamilies, spacing, typography } from '../../constants/theme';
import { DevelopmentNotice } from '../../components/onboarding/FlowIntro';
import { OnboardingScreen } from '../../components/onboarding/OnboardingScreen';

export default function LivenessScreen() {
  return (
    <OnboardingScreen backgroundColor={colors.indigoDeep} onContinue={() => router.push('/onboarding/basics')} continueLabel={__DEV__ ? 'Simulate demo step' : 'Liveness verification unavailable'} disabled={!__DEV__} contentStyle={styles.content}>
      <Text style={styles.instruction}>Center your face, then blink.</Text>
      <View style={styles.faceFrame}><View style={styles.face} /></View>
      <View style={styles.progress}><View style={styles.progressFill} /></View>
      <Text style={styles.status}>Demo preview — no liveness check is running.</Text>
      <Text style={styles.privacy}>🔒 No image is captured in this demo.</Text>
      <DevelopmentNotice>Development demo — no camera is active and no liveness result is produced.</DevelopmentNotice>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({ content: { alignItems: 'center', justifyContent: 'center', paddingTop: spacing[8] }, instruction: { ...typography.subheading, color: colors.surface, textAlign: 'center', marginBottom: spacing[8] }, faceFrame: { width: 180, height: 240, borderRadius: 90, borderWidth: 2, borderStyle: 'dashed', borderColor: colors.coral, alignItems: 'center', justifyContent: 'center' }, face: { width: 96, height: 132, borderRadius: 48, backgroundColor: colors.indigoSecondary }, progress: { width: '80%', height: 4, backgroundColor: colors.indigoSecondary, marginTop: spacing[4] }, progressFill: { width: '68%', height: '100%', backgroundColor: colors.coral }, status: { ...typography.caption, color: colors.surface, marginTop: spacing[2], marginBottom: spacing[4] }, privacy: { ...typography.caption, color: colors.surface, textAlign: 'center', backgroundColor: colors.indigoSecondary, padding: spacing[3], width: '100%', marginBottom: spacing[3] } });
