import { Image, Pressable, StyleSheet, Text, View, type ImageSourcePropType, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fontFamilies, radii, spacing, typography } from '../../constants/theme';
import { VerifiedBadge } from './VerifiedBadge';

export type ProfileCardProps = {
  name: string;
  age?: number | string;
  location: string;
  summary?: string;
  imageSource?: ImageSourcePropType;
  verified?: boolean;
  photoPlaceholderColor?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export function ProfileCard({
  name,
  age,
  location,
  summary,
  imageSource,
  verified = false,
  photoPlaceholderColor = colors.indigo,
  onPress,
  accessibilityLabel,
  style,
}: ProfileCardProps) {
  const displayName = age === undefined ? name : `${name}, ${age}`;
  const content = (
    <>
      <View style={[styles.photo, { backgroundColor: photoPlaceholderColor }]}>
        {imageSource ? (
          <Image resizeMode="cover" source={imageSource} style={StyleSheet.absoluteFill} />
        ) : (
          <View style={styles.placeholderMark} />
        )}
        {verified ? <VerifiedBadge accessible={false} size={18} style={styles.badge} /> : null}
      </View>
      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.name}>{displayName}</Text>
        <Text numberOfLines={1} style={styles.location}>{location}</Text>
        {summary ? <Text numberOfLines={2} style={styles.summary}>{summary}</Text> : null}
      </View>
    </>
  );

  return onPress ? (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? `${displayName}, ${location}${verified ? ', verified' : ''}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
    >
      {content}
    </Pressable>
  ) : (
    <View accessibilityLabel={accessibilityLabel} style={[styles.card, style]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    maxWidth: 320,
    minWidth: 0,
    flexGrow: 1,
    overflow: 'hidden',
    borderRadius: radii.small,
    backgroundColor: colors.surface,
  },
  photo: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderMark: {
    width: '42%',
    aspectRatio: 1,
    borderRadius: radii.circle,
    backgroundColor: colors.surface,
  },
  badge: {
    position: 'absolute',
    right: spacing[2],
    top: spacing[2],
  },
  details: {
    gap: spacing[1],
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[2],
  },
  name: {
    ...typography.label,
    color: colors.text,
  },
  location: {
    ...typography.caption,
    color: colors.textMuted,
  },
  summary: {
    color: colors.text,
    fontFamily: fontFamilies.body,
    fontSize: 12,
    lineHeight: 16,
  },
  pressed: {
    opacity: 0.9,
  },
});
