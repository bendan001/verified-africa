import { Image, StyleSheet, Text, View, type ImageSourcePropType, type StyleProp, type ViewStyle } from 'react-native';

import { colors, dimensions, fontFamilies, radii } from '../../constants/theme';
import { VerifiedBadge } from './VerifiedBadge';

export type AvatarTone = 'coral' | 'indigo' | 'coin' | 'success';

export type AvatarProps = {
  name: string;
  imageSource?: ImageSourcePropType;
  size?: number;
  tone?: AvatarTone;
  verified?: boolean;
  accessible?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const avatarColors: Record<AvatarTone, string> = {
  coral: colors.coral,
  indigo: colors.indigo,
  coin: colors.coin,
  success: colors.success,
};

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  return parts.length === 1
    ? parts[0].slice(0, 1).toUpperCase()
    : `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function Avatar({
  name,
  imageSource,
  size = dimensions.avatar,
  tone = 'coral',
  verified = false,
  accessible = true,
  accessibilityLabel,
  style,
}: AvatarProps) {
  const badgeSize = Math.max(dimensions.badge, Math.round(size * 0.34));

  return (
    <View
      accessible={accessible}
      accessibilityElementsHidden={!accessible}
      accessibilityLabel={accessibilityLabel ?? `${name}${verified ? ', verified' : ''}`}
      importantForAccessibility={accessible ? 'auto' : 'no-hide-descendants'}
      style={[styles.container, { width: size, height: size, borderRadius: size / 2 }, style]}
    >
      <View style={[styles.visual, { width: size, height: size, borderRadius: size / 2 }, !imageSource && { backgroundColor: avatarColors[tone] }]}>
        {imageSource ? (
          <Image resizeMode="cover" source={imageSource} style={styles.image} />
        ) : (
          <Text style={[styles.initials, { fontSize: size * 0.42, lineHeight: size * 0.5 }]}>
            {initialsFromName(name)}
          </Text>
        )}
      </View>
      {verified ? (
        <VerifiedBadge
          accessibilityLabel={`${name} is verified`}
          accessible={false}
          size={badgeSize}
          style={styles.verifiedBadge}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'visible',
  },
  visual: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.coral,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    color: colors.surface,
    fontFamily: fontFamilies.bold,
    textAlign: 'center',
    includeFontPadding: false,
  },
  verifiedBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
  },
});
