import { useEffect } from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamilies, spacing } from '../constants/theme';
import { useAuth } from '../hooks/useAuth';
import { useOnboardingProfile } from '../hooks/useOnboardingProfile';

export default function SplashScreen() {
  const { user, loading } = useAuth();
  const { profileLoadStatus, savedProfile } = useOnboardingProfile();
  const profileReady = !user || (profileLoadStatus !== 'idle' && profileLoadStatus !== 'loading');
  const destination = user ? (savedProfile?.is_profile_complete ? '/home' : '/onboarding/basics') : '/welcome';

  useEffect(() => {
    if (loading || !profileReady) return undefined;
    const timer = setTimeout(() => router.replace(destination), 1600);
    return () => clearTimeout(timer);
  }, [destination, loading, profileReady]);

  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Continue to Verified Africa" onPress={() => { if (!loading && profileReady) router.replace(destination); }} style={styles.root}>
      <View style={styles.brandMark}><Text style={styles.mark}>V</Text></View>
      <Text style={styles.name}>Verified Africa</Text>
      <Text style={styles.tagline}>Real people. Real connection.</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.indigo, padding: spacing[6] }, brandMark: { width: 76, height: 76, alignItems: 'center', justifyContent: 'center', borderRadius: 38, backgroundColor: colors.coral }, mark: { color: colors.surface, fontFamily: fontFamilies.bold, fontSize: 40, lineHeight: 48 }, name: { color: colors.surface, fontFamily: fontFamilies.bold, fontSize: 20, lineHeight: 26, marginTop: spacing[2] }, tagline: { color: colors.surface, fontFamily: fontFamilies.body, fontSize: 11, lineHeight: 16, marginTop: spacing[1] } });
