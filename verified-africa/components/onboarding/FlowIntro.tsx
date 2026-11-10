import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../constants/theme';

export function FlowIntro({ title, description, centered = false }: { title: string; description?: string; centered?: boolean }) {
  return (
    <View style={[styles.container, centered && styles.centered]}>
      <Text style={[styles.title, centered && styles.centeredText]}>{title}</Text>
      {description ? <Text style={[styles.description, centered && styles.centeredText]}>{description}</Text> : null}
    </View>
  );
}

export function DevelopmentNotice({ children }: { children: string }) {
  if (!__DEV__) return null;
  return <Text accessibilityRole="text" style={styles.notice}>{children}</Text>;
}

const styles = StyleSheet.create({ container: { gap: spacing[2], marginBottom: spacing[6] }, title: { ...typography.heading, color: colors.indigo }, description: { ...typography.bodySmall, color: colors.textMuted }, centered: { alignItems: 'center' }, centeredText: { textAlign: 'center' }, notice: { ...typography.caption, color: colors.textMuted, backgroundColor: colors.neutral, padding: spacing[3], borderRadius: 4, overflow: 'hidden' } });
