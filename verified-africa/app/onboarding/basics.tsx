import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, typography } from '../../constants/theme';
import { ProgressLine } from '../../components/onboarding/ProgressLine';
import { FlowIntro } from '../../components/onboarding/FlowIntro';
import { OnboardingScreen } from '../../components/onboarding/OnboardingScreen';
import { TextInput } from '../../components/ui';
import { ageFromDateOfBirth, type Gender, useOnboardingProfile } from '../../hooks/useOnboardingProfile';
import { getActiveCountries, ProfileServiceError, updateCurrentProfile, type Country } from '../../services/profile';

const genders: Exclude<Gender, ''>[] = ['Woman', 'Man', 'Non-binary', 'Prefer not to say'];

export default function ProfileBasicsScreen() {
  const { profile, updateProfile, savedProfile, profileLoadStatus, profileError, refreshProfile } = useOnboardingProfile();
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [countryError, setCountryError] = useState('');
  const [countryPicker, setCountryPicker] = useState(false);

  useEffect(() => {
    let active = true;
    void getActiveCountries().then((items) => { if (active) { setCountries(items); setCountryError(''); } }).catch(() => { if (active) setCountryError('Country list could not be loaded. Check your connection and try again.'); });
    return () => { active = false; };
  }, []);

  const continueSetup = async () => {
    const username = profile.username.trim();
    const age = ageFromDateOfBirth(profile.dateOfBirth);
    if (!profile.firstName.trim() || !/^[a-zA-Z0-9_]{3,20}$/.test(username) || !profile.gender || !profile.countryId || !profile.city.trim() || !age) {
      setError('Complete each field with a valid date of birth (DD/MM/YYYY) and country.'); return;
    }
    if (age < 18) { setError('Verified Africa is for people aged 18 and over.'); return; }
    if (!countries.some((country) => country.id === profile.countryId)) { setError('Choose a valid country from the list.'); return; }
    const [day, month, year] = profile.dateOfBirth.split('/');
    setSaving(true); setError('');
    try {
      await updateCurrentProfile({
        first_name: profile.firstName.trim(), username: username.toLowerCase(),
        date_of_birth: `${year}-${month}-${day}`, gender: profile.gender,
        country_id: profile.countryId, state_region: profile.stateRegion.trim() || null,
        city: profile.city.trim(), is_profile_complete: false,
      });
      await refreshProfile();
      router.push('/onboarding/photo');
    } catch (saveError: unknown) {
      setError(saveError instanceof ProfileServiceError ? saveError.message : 'We could not save your profile. Check your connection and try again.');
    } finally { setSaving(false); }
  };

  const selectedCountry = countries.find((country) => country.id === profile.countryId);
  return (
    <OnboardingScreen onContinue={() => { void continueSetup(); }} continueLabel={saving ? 'Saving…' : 'Continue'} disabled={saving || profileLoadStatus === 'loading'} contentStyle={styles.content}>
      <FlowIntro title="About you" />
      <ProgressLine progress={1} />
      {profileError && !savedProfile ? <Text style={styles.error}>{profileError}</Text> : null}
      <TextInput label="First name" value={profile.firstName} onChangeText={(firstName) => updateProfile({ firstName })} placeholder="Amara" autoCapitalize="words" />
      <TextInput label="Username" value={profile.username} onChangeText={(username) => updateProfile({ username })} placeholder="amara_okafor" autoCapitalize="none" helperText="3–20 letters, numbers or underscores" containerStyle={styles.field} />
      <TextInput label="Date of birth" value={profile.dateOfBirth} onChangeText={(dateOfBirth) => updateProfile({ dateOfBirth: dateOfBirth.replace(/[^0-9/]/g, '').slice(0, 10) })} placeholder="DD/MM/YYYY" keyboardType="numbers-and-punctuation" helperText="Self-reported date of birth" containerStyle={styles.field} />
      <Text style={styles.label}>Gender</Text>
      <View style={styles.genders}>{genders.map((gender) => <Text key={gender} accessibilityRole="button" onPress={() => updateProfile({ gender })} style={[styles.genderOption, profile.gender === gender && styles.genderSelected]}>{gender}</Text>)}</View>
      <Text style={[styles.label, styles.countryLabel]}>Country</Text>
      <Pressable accessibilityRole="button" onPress={() => setCountryPicker(true)} style={styles.countryButton}><Text style={selectedCountry ? styles.countryText : styles.placeholder}>{selectedCountry?.name ?? 'Select your country'}</Text><Text style={styles.chevron}>⌄</Text></Pressable>
      {countryError ? <Text style={styles.error}>{countryError}</Text> : null}
      <TextInput label="State / region" value={profile.stateRegion} onChangeText={(stateRegion) => updateProfile({ stateRegion })} placeholder="Lagos State" autoCapitalize="words" containerStyle={styles.field} />
      <TextInput label="City" value={profile.city} onChangeText={(city) => updateProfile({ city })} placeholder="Lagos" autoCapitalize="words" containerStyle={styles.field} />
      {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
      <Modal visible={countryPicker} transparent animationType="slide" onRequestClose={() => setCountryPicker(false)}>
        <View style={styles.modalBackdrop}><View style={styles.modal}><Text style={styles.modalTitle}>Select country</Text><ScrollView>{countries.map((country) => <Pressable key={country.id} onPress={() => { updateProfile({ country: country.name, countryId: country.id }); setCountryPicker(false); }} style={styles.countryOption}><Text style={styles.countryText}>{country.name}</Text></Pressable>)}</ScrollView><Pressable onPress={() => setCountryPicker(false)} style={styles.cancel}><Text style={styles.countryText}>Cancel</Text></Pressable></View></View>
      </Modal>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({ content: { paddingTop: spacing[6] }, field: { marginTop: spacing[3] }, label: { ...typography.caption, color: colors.textMuted, marginTop: spacing[3], marginBottom: spacing[1] }, countryLabel: { marginTop: spacing[3] }, genders: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[1] }, genderOption: { ...typography.caption, color: colors.text, borderWidth: 1, borderColor: colors.divider, paddingHorizontal: spacing[2], paddingVertical: spacing[2] }, genderSelected: { borderColor: colors.coral, color: colors.coral }, error: { ...typography.caption, color: colors.coral, marginTop: spacing[3] }, countryButton: { height: 48, borderWidth: 1, borderColor: colors.divider, borderRadius: 4, paddingHorizontal: spacing[3], flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, countryText: { ...typography.bodySmall, color: colors.text }, placeholder: { ...typography.bodySmall, color: colors.textMuted }, chevron: { color: colors.textMuted, fontSize: 20 }, modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#0008' }, modal: { maxHeight: '75%', backgroundColor: colors.surface, padding: spacing[4] }, modalTitle: { ...typography.label, color: colors.text, marginBottom: spacing[2] }, countryOption: { minHeight: 48, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: colors.divider }, cancel: { paddingTop: spacing[3], alignItems: 'center' } });
