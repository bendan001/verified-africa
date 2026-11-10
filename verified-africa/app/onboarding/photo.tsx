import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../constants/theme';
import { DevelopmentNotice, FlowIntro } from '../../components/onboarding/FlowIntro';
import { OnboardingScreen } from '../../components/onboarding/OnboardingScreen';
import { ProgressLine } from '../../components/onboarding/ProgressLine';
import { useOnboardingProfile } from '../../hooks/useOnboardingProfile';

export default function ProfilePhotoScreen() {
  const { profile, updateProfile } = useOnboardingProfile();
  const usePhoto = () => {
    updateProfile({ profilePhotoUri: 'mock:profile-photo' });
    router.push('/onboarding/interests');
  };
  return (
    <OnboardingScreen onContinue={usePhoto} continueLabel="Use photo" contentStyle={styles.content}>
      <FlowIntro title="Add your photo" />
      <ProgressLine progress={2} />
      <View accessibilityLabel={profile.profilePhotoUri ? 'Development profile photo placeholder' : 'Photo crop preview'} style={styles.cropFrame}>
        <View style={styles.cropCircle}><View style={styles.head} /><View style={styles.shoulders} /></View>
      </View>
      <Text style={styles.zoomLabel}>Zoom</Text>
      <View style={styles.slider}><View style={styles.sliderTrack} /><View style={styles.sliderKnob} /></View>
      <DevelopmentNotice>No photo picker is connected yet. This is a visual placeholder only.</DevelopmentNotice>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({ content: { paddingTop: spacing[6] }, cropFrame: { width: '100%', aspectRatio: 1, backgroundColor: colors.indigoDeep, alignItems: 'center', justifyContent: 'center', marginBottom: spacing[2] }, cropCircle: { width: '70%', aspectRatio: 1, borderRadius: 500, overflow: 'hidden', borderWidth: 1, borderColor: colors.coral, alignItems: 'center', paddingTop: '19%' }, head: { width: '36%', aspectRatio: 1, borderRadius: 100, backgroundColor: colors.indigoSecondary }, shoulders: { width: '68%', height: '42%', marginTop: '5%', borderTopLeftRadius: 120, borderTopRightRadius: 120, backgroundColor: colors.indigoSecondary }, zoomLabel: { ...typography.caption, color: colors.textMuted, marginBottom: spacing[1] }, slider: { height: 20, justifyContent: 'center', marginBottom: spacing[3] }, sliderTrack: { height: 2, backgroundColor: colors.divider }, sliderKnob: { position: 'absolute', left: '58%', width: 12, height: 12, borderRadius: 6, backgroundColor: colors.coral }, selectedText: { ...typography.caption, color: colors.textMuted, marginBottom: spacing[2] } });
