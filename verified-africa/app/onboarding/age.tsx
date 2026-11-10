import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, dimensions, fontFamilies, radii, spacing, typography } from '../../constants/theme';
import { OnboardingScreen } from '../../components/onboarding/OnboardingScreen';

export default function AgeConfirmationScreen() {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <OnboardingScreen onContinue={() => router.push('/onboarding/phone')} continueLabel="Proceed" disabled={!confirmed} contentStyle={styles.content}>
      <View style={styles.ageMark}><Text style={styles.ageText}>18+</Text></View>
      <Text style={styles.title}>Confirm you are 18 or{ '\n' }older.</Text>
      <Text style={styles.description}>This community is strictly for adults. We verify ages with government ID.</Text>
      <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: confirmed }} onPress={() => setConfirmed((value) => !value)} style={styles.checkRow}>
        <View style={[styles.checkbox, confirmed && styles.checked]}>{confirmed ? <Text style={styles.check}>✓</Text> : null}</View>
        <Text style={styles.checkText}>I confirm I am 18 or older and accept the community rules.</Text>
      </Pressable>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({ content: { paddingTop: spacing[8], alignItems: 'center' }, ageMark: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.coralSoft, justifyContent: 'center', alignItems: 'center', marginTop: spacing[4], marginBottom: spacing[4] }, ageText: { color: colors.coral, fontFamily: fontFamilies.bold, fontSize: 16 }, title: { ...typography.subheading, color: colors.indigo, textAlign: 'center', marginBottom: spacing[3] }, description: { ...typography.caption, color: colors.textMuted, textAlign: 'center', maxWidth: 280, marginBottom: spacing[8] }, checkRow: { width: '100%', minHeight: dimensions.minimumTapTarget, flexDirection: 'row', alignItems: 'center', padding: spacing[2], backgroundColor: colors.neutral, gap: spacing[2] }, checkbox: { width: 16, height: 16, borderWidth: 1, borderColor: colors.divider, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' }, checked: { backgroundColor: colors.coral, borderColor: colors.coral }, check: { color: colors.surface, fontFamily: fontFamilies.bold, fontSize: 12, lineHeight: 14 }, checkText: { flex: 1, color: colors.text, fontFamily: fontFamilies.body, fontSize: 10, lineHeight: 14 } });
