import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppTabScaffold } from '../components/navigation/AppTabScaffold';
import { RoomListItem, ScreenHeader } from '../components/ui';
import { colors, dimensions, spacing, typography } from '../constants/theme';
import { mockProfiles, mockRooms } from '../data/mockData';

export default function ChatLandingScreen() {
  const zuri = mockProfiles[0];
  return (
    <AppTabScaffold selected="chat">
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Chat" style={styles.header} />
        <Text style={styles.sectionTitle}>Private chats</Text>
        <Text accessibilityRole="link" onPress={() => router.push('/match')} style={styles.matchPreview}>View mock match celebration ›</Text>
        <RoomListItem name={zuri.name} preview="No way. We need to collab." activeCountLabel="Online" avatarName={zuri.name} avatarTone={zuri.tone} verified onPress={() => router.push('/chat/zuri')} />
        <RoomListItem name="Tunde Adeyemi" preview="Hey, are you going to film night?" activeCountLabel="18m" avatarTone="indigo" verified onPress={() => router.push('/chat/tunde')} />
        <View style={styles.roomHeading}><Text style={styles.sectionTitle}>Rooms</Text><Text accessibilityRole="link" onPress={() => router.push('/rooms')} style={styles.viewAll}>View all</Text></View>
        {mockRooms.slice(0, 3).map((room) => <RoomListItem key={room.id} name={room.name} preview={room.preview} activeCountLabel={`${room.activeCount.toLocaleString()} active`} avatarTone={room.tone} isLive onPress={() => router.push({ pathname: '/rooms/[roomId]', params: { roomId: room.id } })} />)}
      </ScrollView>
    </AppTabScaffold>
  );
}

const styles = StyleSheet.create({ content: { width: '100%', maxWidth: dimensions.contentMaxWidth, alignSelf: 'center', paddingHorizontal: dimensions.screenPadding, paddingTop: spacing[2], paddingBottom: spacing[4] }, header: { paddingHorizontal: 0 }, sectionTitle: { ...typography.subheading, color: colors.indigo, marginTop: spacing[4], marginBottom: spacing[2] }, matchPreview: { ...typography.caption, color: colors.coral, marginBottom: spacing[2] }, roomHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing[2] }, viewAll: { ...typography.caption, color: colors.coral, padding: spacing[2] } });
