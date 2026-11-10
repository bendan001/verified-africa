import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppTabScaffold } from '../components/navigation/AppTabScaffold';
import { Avatar, ConfirmationDialog, ScreenHeader, SettingRow } from '../components/ui';
import { colors, dimensions, spacing, typography } from '../constants/theme';
import { useOnboardingProfile } from '../hooks/useOnboardingProfile';
import { useAuth } from '../hooks/useAuth';
import { getActiveCountries } from '../services/profile';

export default function ProfileSettingsScreen() {
  const { profile, savedProfile } = useOnboardingProfile();
  const { user, signOut } = useAuth();
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);
  const [countryName, setCountryName] = useState('');
  useEffect(() => { let active = true; void getActiveCountries().then((countries) => { if (active) setCountryName(countries.find((item) => item.id === profile.countryId)?.name ?? ''); }).catch(() => { if (active) setCountryName(''); }); return () => { active = false; }; }, [profile.countryId]);
  const name = profile.firstName || 'Your profile';
  const location = [profile.city, profile.stateRegion, countryName].filter(Boolean).join(', ') || user?.phone || 'Location not added';

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    setSignOutError(null);
    const result = await signOut();
    setSigningOut(false);
    if (result.error) setSignOutError(result.error);
  };
  return (
    <AppTabScaffold selected="profile">
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Profile" style={styles.header} />
        <View style={styles.profileCard}><Avatar name={name} size={56} tone="coral" /><View style={styles.profileCopy}><Text style={styles.name}>{name}</Text><Text style={styles.location}>{profile.username ? `@${profile.username}` : 'Username not added'}</Text><Text style={styles.location}>{location}</Text>{profile.bio ? <Text style={styles.location}>{profile.bio}</Text> : null}<Text style={styles.location}>{savedProfile?.is_profile_complete ? 'Profile complete' : 'Profile incomplete'}</Text><Text style={styles.viewProfile} onPress={() => router.push('/onboarding/basics')}>View profile ›</Text></View></View>
        <Text style={styles.group}>ACCOUNT</Text>
        <SettingRow label="Edit profile" onPress={() => router.push('/onboarding/basics')} />
        <SettingRow label="Privacy & verification" detail="Identity status and privacy controls" onPress={() => Alert.alert('Privacy & verification', 'Settings will be connected in a later phase.')} />
        <SettingRow label="Subscription — Verified+" onPress={() => router.push('/premium')} />
        <SettingRow label="Notifications" onPress={() => router.push('/activity')} />
        <Text style={styles.group}>SAFETY</Text>
        <SettingRow label="Safety & blocked users" onPress={() => router.push({ pathname: '/safety/report', params: { subjectId: 'tunde', subjectName: 'Tunde Adeyemi' } })} />
        <SettingRow label="Report or block a user" onPress={() => router.push({ pathname: '/safety/report', params: { subjectId: 'tunde', subjectName: 'Tunde Adeyemi' } })} />
        <Text style={styles.group}>PREFERENCES</Text>
        <SettingRow label="Language" detail="English" onPress={() => Alert.alert('Language', 'Language selection is not configured yet.')} />
        <SettingRow label="Help centre" onPress={() => Alert.alert('Help centre', 'Help resources will be added later.')} />
        <Text style={styles.group}>ACCOUNT MANAGEMENT</Text>
        <SettingRow label={signingOut ? 'Signing out…' : 'Log out'} detail={signOutError ?? undefined} destructive onPress={() => { void handleSignOut(); }} />
        <SettingRow label="Delete account" destructive onPress={() => setDeleteVisible(true)} />
      </ScrollView>
      <ConfirmationDialog visible={deleteVisible} title="Delete your account?" description="This demo does not have an account to delete. No information will be removed." confirmLabel="Understood" onConfirm={() => setDeleteVisible(false)} onCancel={() => setDeleteVisible(false)} />
    </AppTabScaffold>
  );
}

const styles = StyleSheet.create({ content: { width: '100%', maxWidth: dimensions.contentMaxWidth, alignSelf: 'center', paddingHorizontal: dimensions.screenPadding, paddingTop: spacing[2], paddingBottom: spacing[4] }, header: { paddingHorizontal: 0 }, profileCard: { minHeight: 88, flexDirection: 'row', alignItems: 'center', gap: spacing[3], padding: spacing[3], backgroundColor: colors.neutral, marginTop: spacing[2] }, profileCopy: { flex: 1, gap: spacing[1] }, name: { ...typography.label, color: colors.text }, location: { ...typography.caption, color: colors.textMuted }, viewProfile: { ...typography.caption, color: colors.indigo }, group: { ...typography.eyebrow, color: colors.textMuted, fontSize: 10, marginTop: spacing[4], marginBottom: spacing[1] } });
