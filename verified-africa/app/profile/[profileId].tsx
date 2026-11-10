import { router, useLocalSearchParams } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, PrimaryButton, ScreenHeader, SecondaryButton, SelectableChip, VerifiedBadge } from '../../components/ui';
import { colors, dimensions, spacing, typography } from '../../constants/theme';
import { mockProfiles } from '../../data/mockData';

export default function ProfileDetailScreen() {
  const { profileId } = useLocalSearchParams<{ profileId: string }>();
  const profile = mockProfiles.find((item) => item.id === profileId) ?? mockProfiles[0];
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Profile" onBackPress={() => router.back()} rightAccessory={<Text accessibilityRole="button" onPress={() => router.push({ pathname: '/safety/report', params: { subjectId: profile.id, subjectName: profile.name } })} style={styles.more}>•••</Text>} style={styles.header} />
        <View style={styles.hero}>
          <Avatar name={profile.name} size={84} tone={profile.tone} verified={profile.verified} />
          <Text style={styles.name}>{profile.name}, {profile.age}</Text>
          <Text style={styles.location}>{profile.location} · Verified ID · 4.9★ community rating</Text>
          <View style={styles.verifiedLine}><VerifiedBadge size={16} /><Text style={styles.verifiedText}>Identity verified</Text></View>
        </View>
        <Text style={styles.bio}>{profile.bio}</Text>
        <Text style={styles.section}>MUTUAL INTERESTS</Text>
        <View style={styles.interests}>{profile.interests.map((item) => <SelectableChip key={item} label={item} selected onPress={() => undefined} />)}</View>
        <View style={styles.actions}><PrimaryButton label="Message" onPress={() => router.push(`/chat/${profile.id}`)} /><SecondaryButton label="Add friend" onPress={() => Alert.alert('Demo only', 'Friend requests are not connected.')} /></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: colors.surface }, content: { width: '100%', maxWidth: dimensions.contentMaxWidth, alignSelf: 'center', paddingBottom: spacing[4] }, header: { paddingHorizontal: spacing[2] }, more: { color: colors.indigo, fontSize: 18, paddingHorizontal: spacing[1] }, hero: { minHeight: 240, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.indigo, gap: spacing[2], marginHorizontal: dimensions.screenPadding }, name: { ...typography.screenTitle, color: colors.surface }, location: { ...typography.caption, color: colors.coralSoft, textAlign: 'center', paddingHorizontal: spacing[2] }, verifiedLine: { flexDirection: 'row', alignItems: 'center', gap: spacing[1] }, verifiedText: { ...typography.caption, color: colors.surface }, bio: { ...typography.bodySmall, color: colors.text, paddingHorizontal: dimensions.screenPadding, paddingTop: spacing[4] }, section: { ...typography.eyebrow, color: colors.textMuted, fontSize: 10, paddingHorizontal: dimensions.screenPadding, marginTop: spacing[4], marginBottom: spacing[2] }, interests: { flexDirection: 'row', gap: spacing[1], flexWrap: 'wrap', paddingHorizontal: dimensions.screenPadding }, actions: { flexDirection: 'row', gap: spacing[2], paddingHorizontal: dimensions.screenPadding, marginTop: spacing[6] } });
