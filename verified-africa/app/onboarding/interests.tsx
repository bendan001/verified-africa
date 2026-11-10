import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../constants/theme';
import { ProgressLine } from '../../components/onboarding/ProgressLine';
import { FlowIntro } from '../../components/onboarding/FlowIntro';
import { OnboardingScreen } from '../../components/onboarding/OnboardingScreen';
import { SelectableChip, TextInput } from '../../components/ui';
import { useOnboardingProfile } from '../../hooks/useOnboardingProfile';
import { ProfileServiceError, updateCurrentProfile } from '../../services/profile';

const interestOptions = ['Afrobeats', 'Travel', 'Film', 'Fitness', 'Faith', 'Cooking', 'Fashion', 'Books'];

export default function InterestsBioScreen() {
  const { profile, updateProfile, refreshProfile } = useOnboardingProfile();
  const [bio, setBio] = useState(profile.bio);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  useEffect(() => { setBio(profile.bio); }, [profile.bio]);
  const toggleInterest = (interest: string) => {
    const interests = profile.interests.includes(interest) ? profile.interests.filter((item) => item !== interest) : [...profile.interests, interest];
    updateProfile({ interests });
  };
  const finish = async () => {
    if (!profile.firstName.trim() || !profile.username.trim() || !profile.dateOfBirth || !profile.gender || !profile.countryId || !profile.city.trim()) {
      setError('Complete your required profile details before finishing setup.'); router.replace('/onboarding/basics'); return;
    }
    setSaving(true); setError('');
    try {
      await updateCurrentProfile({ bio: bio.trim(), is_profile_complete: true });
      updateProfile({ bio: bio.trim() });
      await refreshProfile();
      router.replace('/home');
    } catch (saveError: unknown) {
      setError(saveError instanceof ProfileServiceError ? saveError.message : 'We could not save your profile. Check your connection and try again.');
    } finally { setSaving(false); }
  };
  return (
    <OnboardingScreen onContinue={() => { void finish(); }} continueLabel={saving ? 'Saving…' : 'Finish setup'} disabled={saving} contentStyle={styles.content}>
      <FlowIntro title="Interests & bio" />
      <ProgressLine progress={3} />
      <View style={styles.chips}>{interestOptions.map((interest) => <SelectableChip key={interest} label={interest} selected={profile.interests.includes(interest)} onPress={() => toggleInterest(interest)} style={styles.chip} />)}</View>
      <TextInput label="Short bio" value={bio} onChangeText={(value) => { const next = value.slice(0, 160); setBio(next); updateProfile({ bio: next }); }} placeholder="Tell people a little about yourself…" multiline maxLength={160} inputStyle={styles.bioInput} containerStyle={styles.bioField} />
      <Text style={styles.counter}>{bio.length} / 160</Text>
      {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({ content: { paddingTop: spacing[6] }, chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[1], marginBottom: spacing[6] }, chip: { minWidth: '23%' }, bioField: { marginTop: spacing[2] }, bioInput: { minHeight: 100, textAlignVertical: 'top' }, counter: { ...typography.caption, color: colors.textMuted, textAlign: 'right', marginTop: spacing[1] }, error: { ...typography.caption, color: colors.coral, marginTop: spacing[2] } });
