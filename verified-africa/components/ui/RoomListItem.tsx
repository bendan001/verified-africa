import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, dimensions, fontFamilies, spacing, typography } from '../../constants/theme';
import { Avatar, type AvatarTone } from './Avatar';

export type RoomListItemProps = {
  name: string;
  preview: string;
  activeCountLabel: string;
  avatarName?: string;
  avatarTone?: AvatarTone;
  verified?: boolean;
  isLive?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function RoomListItem({
  name,
  preview,
  activeCountLabel,
  avatarName = name,
  avatarTone = 'coral',
  verified = true,
  isLive = false,
  onPress,
  style,
}: RoomListItemProps) {
  const content = (
    <>
      <Avatar accessible={false} name={avatarName} size={dimensions.avatar} tone={avatarTone} verified={verified} />
      <View style={styles.copy}>
        <Text numberOfLines={1} style={styles.name}>{name}</Text>
        <Text numberOfLines={1} style={styles.preview}>{preview}</Text>
      </View>
      <View style={styles.meta}>
        <Text style={styles.activeCount}>{activeCountLabel}</Text>
        {isLive ? <View accessibilityLabel="Live" style={styles.liveDot} /> : null}
      </View>
    </>
  );

  return onPress ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}. ${preview}. ${activeCountLabel}${isLive ? ', live' : ''}`}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed, style]}
    >
      {content}
    </Pressable>
  ) : (
    <View style={[styles.row, style]}>{content}</View>
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
    backgroundColor: colors.surface,
  },
  copy: {
    flex: 1,
    minWidth: 0,
    gap: spacing[1],
  },
  name: {
    ...typography.label,
    color: colors.text,
  },
  preview: {
    ...typography.caption,
    color: colors.textMuted,
  },
  meta: {
    alignItems: 'flex-end',
    gap: spacing[1],
  },
  activeCount: {
    color: colors.coral,
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    lineHeight: 15,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  pressed: {
    opacity: 0.86,
  },
});
