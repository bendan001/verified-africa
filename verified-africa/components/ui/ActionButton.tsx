import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { colors, dimensions, fontFamilies, radii, spacing } from '../../constants/theme';

export type ActionButtonProps = {
  label: string;
  onPress: PressableProps['onPress'];
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  leading?: ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

type Props = ActionButtonProps & { variant: 'primary' | 'secondary' };

export function ActionButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  accessibilityLabel,
  leading,
  style,
  labelStyle,
  variant,
}: Props) {
  const unavailable = disabled || loading;
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: unavailable }}
      disabled={unavailable}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        unavailable && styles.disabled,
        pressed && !unavailable && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.surface : colors.indigo} />
      ) : (
        <>
          {leading}
          <Text
            numberOfLines={1}
            style={[
              styles.label,
              isPrimary ? styles.primaryLabel : styles.secondaryLabel,
              unavailable && styles.disabledLabel,
              labelStyle,
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: dimensions.buttonHeight,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: radii.control,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
  },
  primary: {
    backgroundColor: colors.coral,
  },
  secondary: {
    backgroundColor: colors.indigo,
  },
  disabled: {
    backgroundColor: colors.divider,
  },
  pressed: {
    opacity: 0.88,
  },
  label: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    lineHeight: 20,
  },
  primaryLabel: {
    color: colors.surface,
  },
  secondaryLabel: {
    color: colors.surface,
  },
  disabledLabel: {
    color: colors.disabledText,
  },
});
