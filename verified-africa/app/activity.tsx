import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { AppTabScaffold } from '../components/navigation/AppTabScaffold';
import { ActivityRow, ScreenHeader } from '../components/ui';
import { colors, dimensions, spacing, typography } from '../constants/theme';
import { mockNotifications } from '../data/mockData';

export default function ActivityScreen() {
  const today = mockNotifications.filter((item) => item.group === 'Today');
  const thisWeek = mockNotifications.filter((item) => item.group === 'This week');
  const openNotification = (kind: (typeof mockNotifications)[number]['kind']) => {
    if (kind === 'match') router.push('/match');
    else if (kind === 'message') router.push('/chat/tunde');
    else if (kind === 'coins') router.push('/wallet');
  };
  return (
    <AppTabScaffold selected="profile">
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Activity" onBackPress={() => router.back()} style={styles.header} />
        <Text style={styles.group}>Today</Text>
        {today.map((item) => <ActivityRow key={item.id} item={item} onPress={() => openNotification(item.kind)} />)}
        <Text style={styles.group}>This week</Text>
        {thisWeek.map((item) => <ActivityRow key={item.id} item={item} onPress={() => openNotification(item.kind)} />)}
      </ScrollView>
    </AppTabScaffold>
  );
}

const styles = StyleSheet.create({ content: { width: '100%', maxWidth: dimensions.contentMaxWidth, alignSelf: 'center', paddingHorizontal: dimensions.screenPadding, paddingTop: spacing[2], paddingBottom: spacing[4] }, header: { paddingHorizontal: 0 }, group: { ...typography.eyebrow, color: colors.textMuted, fontSize: 10, marginTop: spacing[4], marginBottom: spacing[1] } });
