import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, ChatBubble, MessageComposer } from '../../components/ui';
import { colors, dimensions, fontFamilies, spacing, typography } from '../../constants/theme';
import { mockPrivateMessages, mockProfiles, mockTundeMessages, type MockMessage } from '../../data/mockData';

export default function PrivateChatScreen() {
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>();
  const profile = mockProfiles.find((item) => item.id === conversationId) ?? mockProfiles[0];
  const [messages, setMessages] = useState<MockMessage[]>(conversationId === 'tunde' ? mockTundeMessages : mockPrivateMessages);
  const [draft, setDraft] = useState('');
  const send = () => {
    if (!draft.trim()) return;
    setMessages((current) => [...current, { id: `local-${Date.now()}`, senderName: 'You', text: draft.trim(), direction: 'outgoing', time: 'now' }]);
    setDraft('');
  };
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.root}>
      <View style={styles.header}>
        <Text accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} style={styles.back}>‹</Text>
        <Avatar name={profile.name} size={40} tone={profile.tone} verified={profile.verified} />
        <View style={styles.person}><Text style={styles.name}>{profile.name}</Text><Text style={styles.status}>● Online · {profile.location}</Text></View>
        <Text accessibilityRole="button" accessibilityLabel="More chat options" onPress={() => router.push({ pathname: '/safety/report', params: { subjectId: profile.id, subjectName: profile.name } })} style={styles.more}>•••</Text>
      </View>
      <ScrollView contentContainerStyle={styles.messages}>
        {messages.map((message) => <ChatBubble key={message.id} message={message.text} direction={message.direction} senderName={message.direction === 'incoming' ? profile.name : undefined} verified={message.direction === 'incoming' && profile.verified} timestamp={message.time} />)}
        <View style={styles.typing}><View style={styles.dots}><Text style={styles.dot}>•</Text><Text style={styles.dot}>•</Text><Text style={styles.dot}>•</Text></View><Text style={styles.typingText}>{profile.name.split(' ')[0]} is typing…</Text></View>
      </ScrollView>
      <View style={styles.composerArea}><Text style={styles.privateNote}>Private conversation · free between accepted friends and matches</Text><MessageComposer value={draft} onChangeText={setDraft} onSend={send} placeholder="Send a message…" /></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: colors.surface }, header: { minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: spacing[2], paddingHorizontal: dimensions.screenPadding, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.divider }, back: { width: 28, color: colors.indigo, fontSize: 30 }, person: { flex: 1, gap: 2 }, name: { ...typography.label, color: colors.text }, status: { color: colors.success, fontFamily: fontFamilies.body, fontSize: 10, lineHeight: 14 }, more: { width: 30, textAlign: 'right', color: colors.textMuted, fontSize: 18 }, messages: { maxWidth: dimensions.contentMaxWidth, width: '100%', alignSelf: 'center', paddingHorizontal: dimensions.screenPadding, paddingVertical: spacing[4], flexGrow: 1 }, typing: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: spacing[2], marginTop: spacing[3] }, dots: { flexDirection: 'row', gap: spacing[1], paddingHorizontal: spacing[2], paddingVertical: spacing[1], backgroundColor: colors.neutral }, dot: { color: colors.textMuted, fontSize: 18, lineHeight: 20 }, typingText: { ...typography.caption, color: colors.textMuted, fontStyle: 'italic' }, composerArea: { paddingHorizontal: dimensions.screenPadding, paddingVertical: spacing[2], borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.divider, gap: spacing[2] }, privateNote: { ...typography.caption, color: colors.textMuted, textAlign: 'center' } });
