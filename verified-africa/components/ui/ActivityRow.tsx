import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors, dimensions, fontFamilies, radii, spacing } from '../../constants/theme';
import type { MockNotification } from '../../data/mockData';

const glyphs: Record<MockNotification['kind'], string> = { match: '♡', message: '✉', digest: '✦', coins: '•', moderation: '✓' };
const markerColors: Record<MockNotification['kind'], string> = { match: colors.coral, message: colors.indigo, digest: colors.coin, coins: colors.success, moderation: colors.coral };

export function ActivityRow({ item, onPress, style }: { item: MockNotification; onPress?: () => void; style?: StyleProp<ViewStyle> }) {
  const content = <><View style={[styles.marker, { backgroundColor: markerColors[item.kind] }]}><Text style={styles.glyph}>{glyphs[item.kind]}</Text></View><View style={styles.copy}><Text style={styles.title}>{item.title}</Text><Text style={styles.description}>{item.description}</Text><Text style={styles.time}>{item.time}</Text></View></>;
  return onPress ? <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed, style]}>{content}</Pressable> : <View style={[styles.row, style]}>{content}</View>;
}

const styles = StyleSheet.create({ row: { minHeight: dimensions.minimumTapTarget + spacing[2], flexDirection: 'row', alignItems: 'center', gap: spacing[3], paddingVertical: spacing[2], borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.divider }, marker: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: radii.circle }, glyph: { color: colors.surface, fontSize: 16 }, copy: { flex: 1, gap: 2 }, title: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 12, lineHeight: 17 }, description: { color: colors.textMuted, fontFamily: fontFamilies.body, fontSize: 11, lineHeight: 15 }, time: { color: colors.textMuted, fontFamily: fontFamilies.body, fontSize: 9, lineHeight: 12 }, pressed: { opacity: 0.75 } });
