import { forwardRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput as NativeTextInput,
  View,
  type TextInputProps as NativeTextInputProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { colors, dimensions, fontFamilies, radii, spacing } from '../../constants/theme';

export type TextInputProps = NativeTextInputProps & {
  label?: string;
  helperText?: string;
  errorText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export const TextInput = forwardRef<NativeTextInput, TextInputProps>(
  function TextInput(
    { label, helperText, errorText, containerStyle, inputStyle, accessibilityLabel, style, onFocus, onBlur, ...props },
    ref,
  ) {
    const [focused, setFocused] = useState(false);
    const message = errorText ?? helperText;

    return (
      <View style={[styles.container, containerStyle]}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <NativeTextInput
          ref={ref}
          accessibilityLabel={accessibilityLabel ?? label}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.coral}
          style={[styles.input, focused && styles.focusedInput, errorText && styles.errorInput, inputStyle, style]}
          {...props}
        />
        {message ? (
          <Text accessibilityLiveRegion="polite" style={[styles.helper, errorText && styles.errorText]}>
            {message}
          </Text>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: spacing[1],
  },
  label: {
    color: colors.textMuted,
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    lineHeight: 16,
  },
  input: {
    minHeight: dimensions.inputHeight,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: radii.small,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    fontFamily: fontFamilies.body,
    fontSize: 16,
    lineHeight: 22,
  },
  errorInput: {
    borderColor: colors.coral,
  },
  focusedInput: {
    borderColor: colors.coral,
  },
  helper: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: 12,
    lineHeight: 16,
  },
  errorText: {
    color: colors.text,
  },
});
