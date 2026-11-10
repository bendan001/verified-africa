import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, dimensions, spacing } from '../../constants/theme';
import { PrimaryButton } from '../ui';

type Props = {
  children: ReactNode;
  onContinue?: () => void;
  continueLabel?: string;
  disabled?: boolean;
  footer?: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  scroll?: boolean;
};

export function OnboardingScreen({ children, onContinue, continueLabel = 'Continue', disabled, footer, contentStyle, backgroundColor = colors.surface, scroll = true }: Props) {
  const content = <View style={[styles.content, contentStyle]}>{children}</View>;
  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.root, { backgroundColor }]}>
      {scroll ? <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>{content}</ScrollView> : <View style={styles.fill}>{content}</View>}
      {onContinue || footer ? (
        <View style={styles.footer}>
          {onContinue ? <PrimaryButton label={continueLabel} onPress={onContinue} disabled={disabled} /> : null}
          {footer}
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  fill: { flex: 1 },
  scroll: { flexGrow: 1 },
  content: { width: '100%', maxWidth: dimensions.contentMaxWidth, alignSelf: 'center', flexGrow: 1, paddingHorizontal: dimensions.screenPadding, paddingTop: spacing[4], paddingBottom: spacing[4] },
  footer: { width: '100%', maxWidth: dimensions.contentMaxWidth, alignSelf: 'center', paddingHorizontal: dimensions.screenPadding, paddingTop: spacing[2], paddingBottom: spacing[2], gap: spacing[2], backgroundColor: colors.surface },
});
