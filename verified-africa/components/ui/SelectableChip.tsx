import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { colors, fontFamilies, radii, spacing } from '../../constants/theme';

export type SelectableChipProps = { label: string; selected?: boolean; variant?: 'interest' | 'filter'; onPress?: () => void; style?: StyleProp<ViewStyle> };

export function SelectableChip({ label, selected = false, variant = 'interest', onPress, style }: SelectableChipProps) {
  const activeStyle = variant === 'filter' ? styles.filterSelected : styles.interestSelected;
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress} style={({ pressed }) => [styles.chip, selected && activeStyle, style, pressed && styles.pressed]}>
      <Text numberOfLines={1} style={[styles.label, variant === 'filter' && styles.filterLabel, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({ chip: { minHeight: 32, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing[3], paddingVertical: spacing[1], borderRadius: radii.none, backgroundColor: colors.neutral }, filterSelected: { backgroundColor: colors.indigo }, interestSelected: { backgroundColor: colors.coral }, label: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 12, lineHeight: 16 }, filterLabel: { fontSize: 10, lineHeight: 14 }, selectedLabel: { color: colors.surface }, pressed: { opacity: 0.78 } });
