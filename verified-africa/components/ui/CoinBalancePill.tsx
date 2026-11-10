import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors, fontFamilies, spacing } from '../../constants/theme';
import { CoinIcon } from './CoinIcon';

export function CoinBalancePill({ balance, style }: { balance: string | number; style?: StyleProp<ViewStyle> }) {
  return <View accessibilityLabel={`${balance} coins`} style={[styles.pill, style]}><CoinIcon size={18} /><Text style={styles.balance}>{balance}</Text></View>;
}

const styles = StyleSheet.create({ pill: { minHeight: 36, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing[1], paddingHorizontal: spacing[2], backgroundColor: colors.indigo }, balance: { color: colors.surface, fontFamily: fontFamilies.bold, fontSize: 13, lineHeight: 18 } });
