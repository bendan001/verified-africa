import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, PrimaryButton, SecondaryButton, SelectableChip, VerifiedBadge } from '../components/ui';
import { colors, dimensions, fontFamilies, spacing, typography } from '../constants/theme';
import { mockMatch } from '../data/mockData';

export default function MatchCelebrationScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.root}>
      <View style={styles.confetti}><Text style={[styles.spark, styles.sparkOne]}>•</Text><Text style={[styles.spark, styles.sparkTwo]}>•</Text><Text style={[styles.spark, styles.sparkThree]}>•</Text></View>
      <Text style={styles.eyebrow}>IT’S A MATCH</Text>
      <Text style={styles.title}>You & {mockMatch.second.name.split(' ')[0]}</Text>
      <View style={styles.avatars}>
        <Avatar name="You" size={96} tone="coral" verified />
        <Avatar name={mockMatch.second.name} size={96} tone="coin" verified />
      </View>
      <Text style={styles.sectionLabel}>MUTUAL INTERESTS</Text>
      <View style={styles.interests}>{mockMatch.interests.map((interest) => <SelectableChip key={interest} label={interest} selected variant="filter" />)}</View>
      <View style={styles.buttons}>
        <PrimaryButton label="Send a message" onPress={() => router.push('/chat/zuri')} />
        <SecondaryButton label="Keep browsing" onPress={() => router.replace('/home')} />
      </View>
      <View style={styles.verified}><VerifiedBadge size={14} accessible={false} /><Text style={styles.verifiedText}>Both profiles are verified.</Text></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: dimensions.screenPaddingWide, backgroundColor: colors.indigoDeep }, confetti: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }, spark: { position: 'absolute', color: colors.coral, fontSize: 24 }, sparkOne: { top: '22%', left: '18%' }, sparkTwo: { top: '27%', right: '17%', color: colors.coin }, sparkThree: { top: '44%', right: '12%', color: colors.coralSoft }, eyebrow: { ...typography.eyebrow, color: colors.coral, fontSize: 10, marginBottom: spacing[2] }, title: { ...typography.heading, color: colors.surface, textAlign: 'center', marginBottom: spacing[6] }, avatars: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing[6] }, sectionLabel: { ...typography.eyebrow, color: colors.surface, fontSize: 9, marginBottom: spacing[2] }, interests: { flexDirection: 'row', justifyContent: 'center', gap: spacing[1], marginBottom: spacing[6] }, buttons: { width: '100%', maxWidth: dimensions.contentMaxWidth, gap: spacing[2] }, verified: { flexDirection: 'row', alignItems: 'center', gap: spacing[2], marginTop: spacing[4] }, verifiedText: { ...typography.caption, color: colors.surface } });
