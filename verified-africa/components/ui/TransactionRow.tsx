import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, dimensions, fontFamilies, radii, spacing } from '../../constants/theme';
import { CoinIcon } from './CoinIcon';

export type TransactionRowProps = {
  title: string;
  description: string;
  timeLabel: string;
  coinAmountLabel: string;
  direction: 'earned' | 'spent';
  style?: StyleProp<ViewStyle>;
};

export function TransactionRow({
  title,
  description,
  timeLabel,
  coinAmountLabel,
  direction,
  style,
}: TransactionRowProps) {
  const isEarned = direction === 'earned';

  return (
    <View style={[styles.row, style]}>
      <View style={[styles.marker, isEarned ? styles.earnedMarker : styles.spentMarker]}>
        <CoinIcon size={18} />
      </View>
      <View style={styles.copy}>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
        <Text numberOfLines={1} style={styles.description}>{description}</Text>
        <Text style={styles.time}>{timeLabel}</Text>
      </View>
      <Text style={[styles.amount, isEarned ? styles.earnedAmount : styles.spentAmount]}>
        {coinAmountLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    minHeight: dimensions.minimumTapTarget + spacing[2],
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[2],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  marker: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.circle,
  },
  earnedMarker: { backgroundColor: colors.success },
  spentMarker: { backgroundColor: colors.coralSoft },
  copy: { flex: 1, minWidth: 0, gap: spacing[1] },
  title: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 14, lineHeight: 19 },
  description: { color: colors.textMuted, fontFamily: fontFamilies.body, fontSize: 12, lineHeight: 16 },
  time: { color: colors.textMuted, fontFamily: fontFamilies.body, fontSize: 10, lineHeight: 14 },
  amount: { fontFamily: fontFamilies.bold, fontSize: 14, lineHeight: 20 },
  earnedAmount: { color: colors.success },
  spentAmount: { color: colors.coral },
});
