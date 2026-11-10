import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../constants/theme';

export function ProgressLine({ progress }: { progress: 1 | 2 | 3 }) {
  return <View accessibilityLabel={`Profile setup step ${progress} of 3`} style={styles.track}><View style={[styles.fill, { width: `${progress * 33.333}%` }]} /></View>;
}

const styles = StyleSheet.create({ track: { height: 2, backgroundColor: colors.divider, marginBottom: spacing[4] }, fill: { height: '100%', backgroundColor: colors.coral } });
