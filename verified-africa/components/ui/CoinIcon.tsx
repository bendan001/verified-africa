import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radii } from '../../constants/theme';

export type CoinIconProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

/** Decorative token mark; deliberately contains no fiat currency glyph. */
export function CoinIcon({ size = 24, style }: CoinIconProps) {
  const innerSize = size * 0.62;

  return (
    <View accessible={false} style={[styles.coin, { width: size, height: size, borderRadius: size / 2 }, style]}>
      <View
        style={[
          styles.inner,
          {
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
            borderWidth: Math.max(1, size * 0.06),
          },
        ]}
      >
        <View style={[styles.centerLine, { width: size * 0.24, height: Math.max(1, size * 0.06) }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  coin: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.coin },
  inner: { alignItems: 'center', justifyContent: 'center', borderColor: colors.indigo },
  centerLine: { borderRadius: radii.circle, backgroundColor: colors.indigo },
});
