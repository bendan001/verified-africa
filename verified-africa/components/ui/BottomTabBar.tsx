import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, dimensions, fontFamilies, spacing } from '../../constants/theme';

export type BottomTabItem = {
  key: string;
  label: string;
  icon?: ReactNode;
};

export type BottomTabBarProps = {
  items: BottomTabItem[];
  selectedKey: string;
  onSelect: (key: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function BottomTabBar({ items, selectedKey, onSelect, style }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, spacing[1]) }, style]}>
      {items.map((item) => {
        const selected = item.key === selectedKey;

        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onSelect(item.key)}
            style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
          >
            {item.icon ? <View style={styles.icon}>{item.icon}</View> : null}
            <Text numberOfLines={1} style={[styles.label, selected && styles.selectedLabel]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: dimensions.tabBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
    backgroundColor: colors.surface,
  },
  tab: {
    flex: 1,
    minWidth: 0,
    minHeight: dimensions.minimumTapTarget,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[1],
  },
  icon: { alignItems: 'center', justifyContent: 'center' },
  label: {
    color: colors.textMuted,
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    lineHeight: 16,
  },
  selectedLabel: { color: colors.coral },
  pressed: { opacity: 0.72 },
});
