import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, dimensions, fontFamilies, radii, spacing } from '../../constants/theme';
import { Avatar } from './Avatar';

export type ChatBubbleProps = {
  message: string;
  direction: 'incoming' | 'outgoing';
  senderName?: string;
  verified?: boolean;
  timestamp?: string;
  style?: StyleProp<ViewStyle>;
};

export function ChatBubble({ message, direction, senderName, verified = false, timestamp, style }: ChatBubbleProps) {
  const outgoing = direction === 'outgoing';

  return (
    <View style={[styles.row, outgoing ? styles.outgoingRow : styles.incomingRow, style]}>
      {!outgoing ? (
        <Avatar accessible={false} name={senderName ?? ''} size={dimensions.avatar - spacing[2]} verified={verified} />
      ) : null}
      <View style={[styles.content, outgoing ? styles.outgoingContent : styles.incomingContent]}>
        {!outgoing && senderName ? <Text style={styles.sender}>{senderName}</Text> : null}
        <View style={[styles.bubble, outgoing ? styles.outgoingBubble : styles.incomingBubble]}>
          <Text style={[styles.message, outgoing && styles.outgoingMessage]}>{message}</Text>
        </View>
        {timestamp ? (
          <Text style={[styles.timestamp, outgoing && styles.outgoingTimestamp]}>{timestamp}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing[2],
    marginVertical: spacing[1],
  },
  incomingRow: { justifyContent: 'flex-start' },
  outgoingRow: { justifyContent: 'flex-end' },
  content: { maxWidth: '82%', gap: spacing[1] },
  incomingContent: { alignItems: 'flex-start' },
  outgoingContent: { alignItems: 'flex-end' },
  sender: {
    color: colors.textMuted,
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    lineHeight: 15,
  },
  bubble: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radii.small,
  },
  incomingBubble: { backgroundColor: colors.neutral },
  outgoingBubble: { backgroundColor: colors.coral },
  message: {
    color: colors.text,
    fontFamily: fontFamilies.body,
    fontSize: 14,
    lineHeight: 20,
  },
  outgoingMessage: { color: colors.surface },
  timestamp: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: 10,
    lineHeight: 14,
  },
  outgoingTimestamp: { textAlign: 'right' },
});
