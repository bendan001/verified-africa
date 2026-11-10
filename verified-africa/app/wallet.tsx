import { useState } from 'react';
import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppTabScaffold } from '../components/navigation/AppTabScaffold';
import { CoinBalanceCard, CoinPackCard, PrimaryButton, ScreenHeader, TransactionRow } from '../components/ui';
import { colors, dimensions, spacing, typography } from '../constants/theme';
import { formatMarketPrice, mockCoinPacks, mockMarketConfiguration, mockTransactions, mockWallet } from '../data/mockData';

export default function WalletScreen() {
  const [selectedPack, setSelectedPack] = useState<string>(mockCoinPacks[0].id);
  return (
    <AppTabScaffold selected="wallet">
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Wallet" style={styles.header} />
        <CoinBalanceCard balance={mockWallet.balance.toLocaleString()} />
        <View style={styles.actions}>
          <Action label="Buy coins" selected onPress={() => Alert.alert('Demo only', 'Coin purchases are not connected yet.')} />
          <Action label="Redeem" onPress={() => Alert.alert('Coming soon', 'Redemption will be available later.')} />
          <Action label="History" onPress={() => Alert.alert('Activity', 'Recent coin activity is listed below.')} />
        </View>
        <Text style={styles.section}>Coin packs</Text>
        <View style={styles.packs}>{mockCoinPacks.map((pack) => <CoinPackCard key={pack.id} amount={pack.amount} priceLabel={formatMarketPrice(pack.priceMinor / 100, mockMarketConfiguration.currency, mockMarketConfiguration.locale)} selected={pack.id === selectedPack} onPress={() => setSelectedPack(pack.id)} />)}</View>
        <PrimaryButton label="Buy coins" onPress={() => Alert.alert('Demo only', 'No payment has been made.')} style={styles.buyButton} />
        <Pressable accessibilityRole="link" onPress={() => router.push('/premium')} style={styles.premiumLink}><Text style={styles.premiumText}>Explore Verified+  ›</Text></Pressable>
        <Text style={styles.section}>Recent activity</Text>
        {mockTransactions.map((transaction) => <TransactionRow key={transaction.id} title={transaction.title} description={transaction.description} timeLabel={transaction.timeLabel} coinAmountLabel={`${transaction.amount > 0 ? '+' : '−'} ${Math.abs(transaction.amount)}`} direction={transaction.direction} />)}
      </ScrollView>
    </AppTabScaffold>
  );
}

function Action({ label, selected = false, onPress }: { label: string; selected?: boolean; onPress: () => void }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={[styles.action, selected && styles.actionSelected]}><Text style={[styles.actionText, selected && styles.actionSelectedText]}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({ content: { width: '100%', maxWidth: dimensions.contentMaxWidth, alignSelf: 'center', paddingHorizontal: dimensions.screenPadding, paddingTop: spacing[2], paddingBottom: spacing[6] }, header: { paddingHorizontal: 0 }, actions: { flexDirection: 'row', gap: spacing[1], marginTop: spacing[3] }, action: { flex: 1, minHeight: 42, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.divider }, actionSelected: { backgroundColor: colors.coral, borderColor: colors.coral }, actionText: { ...typography.caption, color: colors.text }, actionSelectedText: { color: colors.surface }, section: { ...typography.label, color: colors.text, marginTop: spacing[4], marginBottom: spacing[2] }, packs: { flexDirection: 'row', gap: spacing[2] }, buyButton: { marginTop: spacing[3] }, premiumLink: { minHeight: 44, alignItems: 'center', justifyContent: 'center', marginTop: spacing[2] }, premiumText: { ...typography.label, color: colors.indigo } });
