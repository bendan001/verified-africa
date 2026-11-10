import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, dimensions, fontFamilies, spacing, typography } from '../../constants/theme';

export type ScreenHeaderProps = {
  title: string;
  onBackPress?: () => void;
  backAccessibilityLabel?: string;
  rightAccessory?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function ScreenHeader({
  title,
  onBackPress,
  backAccessibilityLabel = 'Go back',
  rightAccessory,
  style,
}: ScreenHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      {onBackPress ? (
        <Pressable
          accessibilityLabel={backAccessibilityLabel}
          accessibilityRole="button"
          hitSlop={spacing[2]}
          onPress={onBackPress}
          style={styles.side}
        >
          <Text style={styles.backGlyph}>‹</Text>
        </Pressable>
      ) : (
        <View style={styles.side} />
      )}
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <View style={[styles.side, styles.rightSide]}>{rightAccessory}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: dimensions.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[2],
    backgroundColor: colors.surface,
  },
  side: {
    width: dimensions.minimumTapTarget,
    minHeight: dimensions.minimumTapTarget,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightSide: {
    alignItems: 'flex-end',
  },
  title: {
    ...typography.subheading,
    flex: 1,
    color: colors.text,
    textAlign: 'center',
  },
  backGlyph: {
    color: colors.indigo,
    fontFamily: fontFamilies.body,
    fontSize: 32,
    lineHeight: 36,
  },
});
