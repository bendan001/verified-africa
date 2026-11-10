import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { AppTabScaffold } from '../components/navigation/AppTabScaffold';
import { CoinBalancePill, RoomListItem, ScreenHeader } from '../components/ui';
import { colors, dimensions, spacing, typography } from '../constants/theme';
import { mockRooms, mockWallet } from '../data/mockData';

export default function RoomsScreen() {
  const nigeriaRooms = mockRooms.filter((room) => room.category !== 'africa');
  const africaRoom = mockRooms.find((room) => room.category === 'africa');
  return (
    <AppTabScaffold selected="chat">
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Rooms" onBackPress={() => router.back()} rightAccessory={<CoinBalancePill balance={mockWallet.balance} />} style={styles.header} />
        <Text style={styles.sectionTitle}>🇳🇬 Nigeria rooms</Text>
        <Text style={styles.caption}>Country room access is based on verified country</Text>
        {nigeriaRooms.map((room) => <RoomListItem key={room.id} name={room.name} preview={room.preview} activeCountLabel={`${room.activeCount.toLocaleString()} active`} avatarTone={room.tone} isLive onPress={() => router.push({ pathname: '/rooms/[roomId]', params: { roomId: room.id } })} />)}
        {africaRoom ? <><Text style={styles.sectionTitle}>Africa-wide</Text><RoomListItem name={africaRoom.name} preview={africaRoom.preview} activeCountLabel={`${africaRoom.activeCount.toLocaleString()} members`} avatarTone={africaRoom.tone} isLive onPress={() => router.push({ pathname: '/rooms/[roomId]', params: { roomId: africaRoom.id } })} /></> : null}
      </ScrollView>
    </AppTabScaffold>
  );
}

const styles = StyleSheet.create({ content: { width: '100%', maxWidth: dimensions.contentMaxWidth, alignSelf: 'center', paddingHorizontal: dimensions.screenPadding, paddingTop: spacing[2], paddingBottom: spacing[4] }, header: { paddingHorizontal: 0 }, sectionTitle: { ...typography.subheading, color: colors.indigo, marginTop: spacing[3], marginBottom: spacing[1] }, caption: { ...typography.caption, color: colors.textMuted, marginBottom: spacing[2] } });
