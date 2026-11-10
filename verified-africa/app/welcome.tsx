import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamilies, spacing, typography } from '../constants/theme';
import { OnboardingScreen } from '../components/onboarding/OnboardingScreen';
import { DevelopmentNotice } from '../components/onboarding/FlowIntro';
import { useAuth } from '../hooks/useAuth';

export default function WelcomeScreen() {
  const { configurationError, error } = useAuth();
  return (
    <OnboardingScreen scroll={false} contentStyle={styles.content} footer={<Pressable accessibilityRole="button" onPress={() => router.push('/onboarding/phone')} style={styles.signIn}><Text style={styles.signInText}>Already have an account?  Sign in</Text></Pressable>} onContinue={() => router.push('/onboarding/age')} continueLabel="Get started">
      {configurationError ? <DevelopmentNotice>{configurationError}</DevelopmentNotice> : null}
      {error ? <DevelopmentNotice>{error}</DevelopmentNotice> : null}
      <View style={styles.illustration}>
        <View style={[styles.person, styles.personCoral]}><Text style={styles.initial}>A</Text></View>
        <View style={[styles.person, styles.personIndigo]}><Text style={styles.initial}>T</Text></View>
        <View style={[styles.person, styles.personGold]}><Text style={styles.initial}>Z</Text></View>
        <View style={styles.miniCheck}><Text style={styles.check}>✓</Text></View>
      </View>
      <Text style={styles.title}>Meet real people,{ '\n' }verified first.</Text>
      <Text style={styles.description}>Every profile passes phone + government ID checks before activation.</Text>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({ content: { justifyContent: 'center' }, illustration: { height: 180, backgroundColor: colors.neutral, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: spacing[6], position: 'relative' }, person: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginHorizontal: 2 }, personCoral: { backgroundColor: colors.coral, transform: [{ translateY: -12 }] }, personIndigo: { backgroundColor: colors.indigo, transform: [{ translateY: 8 }] }, personGold: { backgroundColor: colors.coin, transform: [{ translateY: -12 }] }, initial: { color: colors.surface, fontFamily: fontFamilies.bold, fontSize: 16 }, miniCheck: { position: 'absolute', left: '39%', top: '52%', width: 18, height: 18, borderRadius: 9, backgroundColor: colors.coral, alignItems: 'center', justifyContent: 'center' }, check: { color: colors.surface, fontSize: 12, lineHeight: 16 }, title: { ...typography.screenTitle, color: colors.indigo, fontSize: 22, lineHeight: 28 }, description: { ...typography.bodySmall, color: colors.textMuted, marginTop: spacing[3] }, signIn: { minHeight: 36, alignItems: 'center', justifyContent: 'center' }, signInText: { ...typography.caption, color: colors.textMuted } });
