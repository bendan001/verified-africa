import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatBubble, CoinBalancePill, CoinIcon, MessageComposer, ScreenHeader } from '../../components/ui';
import { colors, dimensions, spacing, typography } from '../../constants/theme';
import { mockRoomMessages, mockRooms, mockWallet, roomMessageCost, type MockMessage } from '../../data/mockData';

export default function PublicRoomScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const room = mockRooms.find((item) => item.id === roomId) ?? mockRooms[0];
  const [messages, setMessages] = useState<MockMessage[]>(mockRoomMessages);
  const [draft, setDraft] = useState('');
  const send = () => {
    if (!draft.trim()) return;
    setMessages((current) => [...current, { id: `local-${Date.now()}`, senderName: 'You', text: draft.trim(), direction: 'outgoing', time: 'now' }]);
    setDraft('');
  };
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.root}>
      <ScreenHeader title={room.name} onBackPress={() => router.back()} rightAccessory={<CoinBalancePill balance={mockWallet.balance} />} style={styles.header} />
      <Text style={styles.subtitle}>{room.activeCount.toLocaleString()} active · public room</Text>
      <View style={styles.rules}><Text style={styles.ruleLabel}>✦ COMMUNITY RULES</Text><Text style={styles.ruleText}>Be kind. No solicitation. Report anything that doesn’t feel right.</Text></View>
      <ScrollView contentContainerStyle={styles.messages}>
        {messages.map((message) => <ChatBubble key={message.id} message={message.text} direction={message.direction} senderName={message.direction === 'incoming' ? message.senderName : undefined} verified={message.verified} timestamp={message.time} />)}
      </ScrollView>
      <View style={styles.composerArea}><View style={styles.costNote}><CoinIcon size={16} /><Text style={styles.costText}>Each public room message costs {roomMessageCost} coin</Text></View><MessageComposer value={draft} onChangeText={setDraft} onSend={send} placeholder="Message the room…" /></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: colors.surface }, header: { paddingHorizontal: spacing[2] }, subtitle: { ...typography.caption, color: colors.coral, paddingHorizontal: dimensions.screenPadding, paddingBottom: spacing[2] }, rules: { marginHorizontal: dimensions.screenPadding, padding: spacing[3], borderLeftWidth: 3, borderLeftColor: colors.coral, backgroundColor: colors.coralSoft }, ruleLabel: { ...typography.eyebrow, color: colors.coral, fontSize: 10, marginBottom: spacing[1] }, ruleText: { ...typography.caption, color: colors.text }, messages: { width: '100%', maxWidth: dimensions.contentMaxWidth, alignSelf: 'center', paddingHorizontal: dimensions.screenPadding, paddingVertical: spacing[4], gap: spacing[2] }, composerArea: { paddingHorizontal: dimensions.screenPadding, paddingTop: spacing[2], paddingBottom: spacing[2], borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.divider, gap: spacing[2] }, costNote: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing[2] }, costText: { ...typography.caption, color: colors.textMuted } });
