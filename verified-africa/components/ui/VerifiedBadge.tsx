import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fontFamilies, radii } from '../../constants/theme';

export type VerifiedBadgeProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  accessible?: boolean;
};

export function VerifiedBadge({
  size = 16,
  style,
  accessibilityLabel = 'Verified account',
  accessible = true,
}: VerifiedBadgeProps) {
  return (
    <View
      accessible={accessible}
      accessibilityElementsHidden={!accessible}
      accessibilityLabel={accessibilityLabel}
      importantForAccessibility={accessible ? 'auto' : 'no-hide-descendants'}
      style={[styles.badge, { width: size, height: size, borderRadius: size / 2 }, style]}
    >
      <Text style={[styles.check, { fontSize: size * 0.66, lineHeight: size }]}>
        {'✓'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.coral,
    borderColor: colors.surface,
    borderWidth: 1,
    borderRadius: radii.circle,
  },
  check: {
    color: colors.surface,
    fontFamily: fontFamilies.bold,
    textAlign: 'center',
    includeFontPadding: false,
  },
});
