import { useState } from 'react';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput as NativeTextInput, View } from 'react-native';
import { colors, dimensions, fontFamilies, spacing, typography } from '../constants/theme';
import { ProfileCard, SelectableChip } from '../components/ui';
import { AppTabScaffold } from '../components/navigation/AppTabScaffold';
import { mockProfiles } from '../data/mockData';

const profiles = [mockProfiles[2], mockProfiles[1], mockProfiles[0], mockProfiles[3]];
const filters = ['All', 'Nearby', 'New', 'Verified only'];

export default function HomeDiscoverScreen() {
  const [activeFilter, setActiveFilter] = useState('Verified only');
  return (
    <AppTabScaffold selected="home">
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Discover</Text>
        <View style={styles.search}>
          <Text style={styles.searchIcon}>⌕</Text>
          <NativeTextInput accessibilityLabel="Search profiles" placeholder="Lagos · 24–32 · Afrobeats" placeholderTextColor={colors.textMuted} style={styles.searchInput} />
        </View>
        <View style={styles.filters}>{filters.map((filter) => <SelectableChip key={filter} label={filter} variant="filter" selected={filter === activeFilter} onPress={() => setActiveFilter(filter)} style={styles.filter} />)}</View>
        <View style={styles.grid}>{profiles.map((profile) => <ProfileCard key={profile.id} name={profile.name} age={profile.age} location={profile.location} summary={profile.interests.join(' • ')} verified={profile.verified} photoPlaceholderColor={profile.tone === 'coral' ? colors.coral : profile.tone === 'indigo' ? colors.indigo : profile.tone === 'coin' ? colors.coin : colors.success} onPress={() => router.push({ pathname: '/profile/[profileId]', params: { profileId: profile.id } })} style={styles.profile} />)}</View>
      </ScrollView>
    </AppTabScaffold>
  );
}

const styles = StyleSheet.create({ content: { width: '100%', maxWidth: dimensions.contentMaxWidth, alignSelf: 'center', paddingHorizontal: dimensions.screenPadding, paddingTop: spacing[6], paddingBottom: spacing[4] }, title: { ...typography.screenTitle, color: colors.indigo, marginBottom: spacing[3] }, search: { height: 40, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.neutral, paddingHorizontal: spacing[2], marginBottom: spacing[2] }, searchIcon: { color: colors.textMuted, fontSize: 20, marginRight: spacing[1] }, searchInput: { flex: 1, color: colors.text, fontFamily: fontFamilies.body, fontSize: 12, paddingVertical: 0 }, filters: { flexDirection: 'row', gap: spacing[1], marginBottom: spacing[4] }, filter: { flex: 1, paddingHorizontal: spacing[1] }, grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: spacing[3] }, profile: { width: '48%' } });
