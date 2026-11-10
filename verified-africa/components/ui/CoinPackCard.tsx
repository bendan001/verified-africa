import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { colors, dimensions, fontFamilies, spacing } from '../../constants/theme';
import { CoinIcon } from './CoinIcon';

export type CoinPackCardProps = { amount: number; priceLabel: string; selected?: boolean; onPress?: () => void; style?: StyleProp<ViewStyle> };

export function CoinPackCard({ amount, priceLabel, selected = false, onPress, style }: CoinPackCardProps) {
  return (
    <Pressable accessibilityRole="radio" accessibilityState={{ selected }} onPress={onPress} style={[styles.card, selected && styles.selected, style]}>
      <CoinIcon size={22} /><Text style={[styles.amount, selected && styles.selectedText]}>{amount.toLocaleString()}</Text><Text numberOfLines={1} style={[styles.price, selected && styles.selectedText]}>{priceLabel}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({ card: { minHeight: dimensions.minimumTapTarget + spacing[4], flex: 1, alignItems: 'flex-start', justifyContent: 'center', gap: spacing[1], padding: spacing[3], borderWidth: 1, borderColor: colors.divider, backgroundColor: colors.surface }, selected: { borderColor: colors.coral }, amount: { color: colors.text, fontFamily: fontFamilies.bold, fontSize: 16, lineHeight: 22 }, price: { color: colors.textMuted, fontFamily: fontFamilies.body, fontSize: 11, lineHeight: 15 }, selectedText: { color: colors.coral } });
