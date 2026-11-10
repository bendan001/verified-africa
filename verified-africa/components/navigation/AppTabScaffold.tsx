import type { ReactNode } from 'react';
import { router, type Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/theme';
import { BottomTabBar, type BottomTabItem } from '../ui';

export type MainTab = 'home' | 'chat' | 'wallet' | 'profile';
const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: colors.surface }, content: { flex: 1 }, glyph: { color: colors.textMuted, fontSize: 16, lineHeight: 20 } });
const items: BottomTabItem[] = [
  { key: 'home', label: 'Home', icon: <Text style={styles.glyph}>⌂</Text> },
  { key: 'chat', label: 'Chat', icon: <Text style={styles.glyph}>◷</Text> },
  { key: 'wallet', label: 'Wallet', icon: <Text style={styles.glyph}>◉</Text> },
  { key: 'profile', label: 'Profile', icon: <Text style={styles.glyph}>○</Text> },
];
const routes = { home: '/home', chat: '/chat', wallet: '/wallet', profile: '/profile' } as const satisfies Record<MainTab, Href>;

export function AppTabScaffold({ selected, children }: { selected: MainTab; children: ReactNode }) {
  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      <View style={styles.content}>{children}</View>
      <BottomTabBar items={items} selectedKey={selected} onSelect={(key) => router.replace(routes[key as MainTab])} />
    </SafeAreaView>
  );
}
