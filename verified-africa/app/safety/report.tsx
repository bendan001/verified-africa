import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ConfirmationDialog, SelectableChip } from '../../components/ui';
import { colors, spacing } from '../../constants/theme';

const reasons = ['Harassment', 'Spam', 'Fake profile', 'Other'];

export default function ReportBlockScreen() {
  const { subjectName } = useLocalSearchParams<{ subjectName?: string }>();
  const [reason, setReason] = useState('Harassment');
  const close = () => router.back();
  return (
    <View style={styles.root}>
      <ConfirmationDialog visible title={`Report and block ${subjectName || 'this user'}?`} description="They will no longer be able to see your profile, send you messages, or appear in your rooms. You can undo a block in Settings." confirmLabel="Report & block" cancelLabel="Cancel" onConfirm={close} onCancel={close}>
        <View style={styles.reasons}>{reasons.map((item) => <SelectableChip key={item} label={item} selected={item === reason} onPress={() => setReason(item)} style={styles.reason} />)}</View>
      </ConfirmationDialog>
    </View>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: colors.indigoDeep }, reasons: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[1] }, reason: { flexGrow: 1, minWidth: '46%' } });
