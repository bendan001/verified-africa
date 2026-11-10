import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fontFamilies, radii, spacing, typography } from '../../constants/theme';

export type PremiumPlanCardProps = {
  name: string;
  priceLabel: string;
  periodLabel: string;
  benefits?: string[];
  badgeLabel?: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function PremiumPlanCard({
  name,
  priceLabel,
  periodLabel,
  benefits = [],
  badgeLabel,
  selected = false,
  onPress,
  style,
}: PremiumPlanCardProps) {
  const content = (
    <>
      <View style={styles.topRow}>
        <Text style={[styles.name, selected && styles.selectedText]}>{name}</Text>
        {badgeLabel ? (
          <Text style={[styles.badge, selected && styles.selectedBadge]}>{badgeLabel}</Text>
        ) : null}
      </View>
      <View style={styles.priceRow}>
        <Text adjustsFontSizeToFit minimumFontScale={0.75} numberOfLines={1} style={[styles.price, selected && styles.selectedText]}>
          {priceLabel}
        </Text>
        <Text style={[styles.period, selected && styles.selectedSupporting]}>{periodLabel}</Text>
      </View>
      {benefits.length > 0 ? (
        <View style={styles.benefits}>
          {benefits.map((benefit) => (
            <Text key={benefit} numberOfLines={2} style={[styles.benefit, selected && styles.selectedSupporting]}>
              {'✓ '}{benefit}
            </Text>
          ))}
        </View>
      ) : null}
    </>
  );

  return onPress ? (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.card, selected ? styles.selectedCard : styles.defaultCard, pressed && styles.pressed, style]}
    >
      {content}
    </Pressable>
  ) : (
    <View accessibilityState={{ selected }} style={[styles.card, selected ? styles.selectedCard : styles.defaultCard, style]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    gap: spacing[2],
    padding: spacing[4],
    borderWidth: 1,
    borderRadius: radii.small,
  },
  defaultCard: { borderColor: colors.divider, backgroundColor: colors.surface },
  selectedCard: { borderColor: colors.coral, backgroundColor: colors.coral },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing[2] },
  name: { ...typography.label, color: colors.text },
  badge: {
    ...typography.eyebrow,
    overflow: 'hidden',
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: radii.small,
    color: colors.surface,
    backgroundColor: colors.indigo,
    fontSize: 9,
    lineHeight: 12,
  },
  selectedBadge: { color: colors.coral, backgroundColor: colors.surface },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing[2] },
  price: { color: colors.text, fontFamily: fontFamilies.bold, fontSize: 22, lineHeight: 28, flexShrink: 1 },
  period: { color: colors.textMuted, fontFamily: fontFamilies.body, fontSize: 12, lineHeight: 16 },
  benefits: { gap: spacing[1] },
  benefit: { color: colors.textMuted, fontFamily: fontFamilies.body, fontSize: 12, lineHeight: 17 },
  selectedText: { color: colors.surface },
  selectedSupporting: { color: colors.surface },
  pressed: { opacity: 0.9 },
});
