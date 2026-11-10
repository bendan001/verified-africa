import type { ReactNode } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, dimensions, fontFamilies, radii, spacing, typography } from '../../constants/theme';
import { PrimaryButton } from './PrimaryButton';

export type ConfirmationDialogProps = {
  visible: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  confirmDisabled?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  style?: StyleProp<ViewStyle>;
};

export function ConfirmationDialog({
  visible,
  title,
  description,
  children,
  confirmLabel,
  cancelLabel = 'Cancel',
  confirmDisabled = false,
  onConfirm,
  onCancel,
  style,
}: ConfirmationDialogProps) {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <View style={styles.overlay}>
        <Pressable accessibilityLabel="Dismiss dialog" onPress={onCancel} style={styles.backdrop} />
        <View
          accessibilityViewIsModal
          style={[styles.dialog, style]}
        >
          <ScrollView bounces={false} contentContainerStyle={styles.content}>
            <View style={styles.alertMark}>
              <Text style={styles.alertGlyph}>{'!'}</Text>
            </View>
            <Text accessibilityRole="header" style={styles.title}>{title}</Text>
            {description ? <Text style={styles.description}>{description}</Text> : null}
            {children}
            <PrimaryButton
              disabled={confirmDisabled}
              label={confirmLabel}
              onPress={onConfirm}
              style={styles.confirm}
            />
            <Pressable
              accessibilityRole="button"
              onPress={onCancel}
              style={styles.cancel}
            >
              <Text style={styles.cancelLabel}>{cancelLabel}</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing[6],
    backgroundColor: colors.overlay,
  },
  backdrop: { ...StyleSheet.absoluteFill },
  dialog: {
    width: '100%',
    maxWidth: dimensions.dialogMaxWidth,
    maxHeight: '90%',
    alignSelf: 'center',
    borderRadius: radii.small,
    backgroundColor: colors.surface,
  },
  content: {
    alignItems: 'stretch',
    gap: spacing[3],
    padding: spacing[3],
  },
  alertMark: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.circle,
    backgroundColor: colors.coralSoft,
  },
  alertGlyph: { color: colors.coral, fontFamily: fontFamilies.bold, fontSize: 22, lineHeight: 28 },
  title: { ...typography.subheading, color: colors.text, textAlign: 'center' },
  description: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
  confirm: { marginTop: spacing[1] },
  cancel: {
    minHeight: dimensions.minimumTapTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelLabel: { ...typography.label, color: colors.text },
});
