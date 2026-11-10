import { useRef } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, dimensions, fontFamilies, radii, spacing } from '../../constants/theme';

export type OtpCodeInputProps = {
  value: string;
  onChangeValue: (value: string) => void;
  length?: number;
  editable?: boolean;
  error?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export function OtpCodeInput({
  value,
  onChangeValue,
  length = 6,
  editable = true,
  error = false,
  accessibilityLabel = 'Verification code',
  style,
}: OtpCodeInputProps) {
  const inputRef = useRef<TextInput>(null);
  const digits = value.slice(0, length).split('');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${accessibilityLabel}, ${digits.length} of ${length} digits entered`}
      disabled={!editable}
      onPress={() => inputRef.current?.focus()}
      style={[styles.container, style]}
    >
      <View pointerEvents="none" style={styles.cells}>
        {Array.from({ length }, (_, index) => {
          const isCurrent = editable && index === digits.length;

          return (
            <View
              key={index}
              style={[
                styles.cell,
                isCurrent && styles.currentCell,
                error && styles.errorCell,
              ]}
            >
              <Text style={styles.digit}>{digits[index] ?? ''}</Text>
            </View>
          );
        })}
      </View>
      <TextInput
        ref={inputRef}
        accessibilityLabel={accessibilityLabel}
        autoComplete="sms-otp"
        caretHidden
        editable={editable}
        keyboardType="number-pad"
        maxLength={length}
        onChangeText={(nextValue) => onChangeValue(nextValue.replace(/\D/g, '').slice(0, length))}
        style={styles.hiddenInput}
        textContentType="oneTimeCode"
        value={value}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: dimensions.otpCell,
    justifyContent: 'center',
  },
  cells: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    minHeight: 32,
    maxHeight: dimensions.otpCell,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: radii.small,
    backgroundColor: colors.surface,
  },
  currentCell: {
    borderColor: colors.coral,
  },
  errorCell: {
    borderColor: colors.coral,
  },
  digit: {
    color: colors.indigo,
    fontFamily: fontFamilies.bold,
    fontSize: 20,
    lineHeight: 26,
  },
  hiddenInput: {
    ...StyleSheet.absoluteFill,
    opacity: 0,
    color: 'transparent',
  },
});
