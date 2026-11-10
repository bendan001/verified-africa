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

export type MessageComposerProps = {
  value: string;
  onChangeText: (value: string) => void;
  onSend: () => void;
  onAccessoryPress?: () => void;
  placeholder?: string;
  sendDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function MessageComposer({
  value,
  onChangeText,
  onSend,
  onAccessoryPress,
  placeholder = 'Say something…',
  sendDisabled = false,
  style,
}: MessageComposerProps) {
  const disabled = sendDisabled || value.trim().length === 0;

  return (
    <View style={[styles.container, style]}>
      {onAccessoryPress ? (
        <Pressable
          accessibilityLabel="Open emoji picker"
          accessibilityRole="button"
          hitSlop={spacing[1]}
          onPress={onAccessoryPress}
          style={styles.accessory}
        >
          <Text style={styles.accessoryGlyph}>{'☺'}</Text>
        </Pressable>
      ) : null}
      <TextInput
        accessibilityLabel="Message"
        multiline
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        returnKeyType="default"
        style={styles.input}
        value={value}
      />
      <Pressable
        accessibilityLabel="Send message"
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onSend}
        style={[styles.sendButton, disabled && styles.sendDisabled]}
      >
        <Text style={styles.sendGlyph}>{'→'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: dimensions.minimumTapTarget,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: radii.control,
    backgroundColor: colors.surface,
  },
  accessory: {
    minWidth: dimensions.minimumTapTarget,
    minHeight: dimensions.minimumTapTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accessoryGlyph: { color: colors.textMuted, fontSize: 20 },
  input: {
    flex: 1,
    minWidth: 0,
    maxHeight: 120,
    paddingVertical: spacing[2],
    color: colors.text,
    fontFamily: fontFamilies.body,
    fontSize: 14,
    lineHeight: 20,
  },
  sendButton: {
    width: dimensions.minimumTapTarget,
    height: dimensions.minimumTapTarget,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.small,
    backgroundColor: colors.coral,
  },
  sendDisabled: { backgroundColor: colors.divider },
  sendGlyph: {
    color: colors.surface,
    fontFamily: fontFamilies.bold,
    fontSize: 22,
    lineHeight: 26,
  },
});
