import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, dimensions, fontFamilies, radii, spacing, typography } from '../../constants/theme';
import { CoinIcon } from './CoinIcon';

export type CoinBalanceCardProps = {
  balance: string;
  label?: string;
  style?: StyleProp<ViewStyle>;
};

export function CoinBalanceCard({
  balance,
  label = 'COIN BALANCE',
  style,
}: CoinBalanceCardProps) {
  return (
    <View accessibilityLabel={`${label}: ${balance}`} style={[styles.card, style]}>
      <View style={styles.labelRow}>
        <CoinIcon size={24} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text adjustsFontSizeToFit minimumFontScale={0.7} numberOfLines={1} style={styles.balance}>
        {balance}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 112,
    justifyContent: 'center',
    gap: spacing[1],
    padding: spacing[4],
    borderRadius: radii.small,
    backgroundColor: colors.indigo,
  },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[2] },
  label: {
    ...typography.eyebrow,
    color: colors.surface,
    fontSize: 10,
    lineHeight: 14,
  },
  balance: {
    color: colors.surface,
    fontFamily: fontFamilies.bold,
    fontSize: 32,
    lineHeight: 38,
  },
});
