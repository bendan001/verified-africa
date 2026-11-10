import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors, dimensions, fontFamilies, spacing } from '../../constants/theme';

export type SettingRowProps = { label: string; detail?: string; destructive?: boolean; onPress?: () => void; style?: StyleProp<ViewStyle> };

export function SettingRow({ label, detail, destructive = false, onPress, style }: SettingRowProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed, style]}>
      <View style={styles.copy}><Text style={[styles.label, destructive && styles.destructive]}>{label}</Text>{detail ? <Text style={styles.detail}>{detail}</Text> : null}</View>
      <Text style={[styles.chevron, destructive && styles.destructive]}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({ row: { minHeight: dimensions.minimumTapTarget, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing[3], borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.divider, paddingHorizontal: spacing[1] }, copy: { flex: 1, gap: 2 }, label: { color: colors.text, fontFamily: fontFamilies.body, fontSize: 13, lineHeight: 18 }, detail: { color: colors.textMuted, fontFamily: fontFamilies.body, fontSize: 11, lineHeight: 15 }, chevron: { color: colors.textMuted, fontSize: 20 }, destructive: { color: colors.coral }, pressed: { opacity: 0.7 } });
