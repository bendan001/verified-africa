import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { FlowIntro, DevelopmentNotice } from '../../components/onboarding/FlowIntro';
import { OnboardingScreen } from '../../components/onboarding/OnboardingScreen';
import { TextInput } from '../../components/ui';
import { colors, dimensions, spacing, typography } from '../../constants/theme';
import { getSupabaseClient, getSupabaseConfigurationError } from '../../services/supabase';
import { getFriendlyAuthError } from '../../utils/authError';
import { normalizePhoneNumber } from '../../utils/phoneNumber';
import { useAuth } from '../../hooks/useAuth';

export default function PhoneEntryScreen() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const client = getSupabaseClient();
  const { error: sessionError } = useAuth();

  const sendCode = async () => {
    const normalized = normalizePhoneNumber(phone, 'NG');
    if (!normalized.ok) {
      setError(normalized.error);
      return;
    }
    if (!client) {
      setError(getSupabaseConfigurationError() ?? 'Supabase is not configured.');
      return;
    }

    setSending(true);
    setError('');
    try {
      const { error: requestError } = await client.auth.signInWithOtp({ phone: normalized.e164 });
      if (requestError) {
        setError(getFriendlyAuthError(requestError, 'sendOtp'));
        return;
      }
      router.push({ pathname: '/onboarding/otp', params: { phone: normalized.e164 } });
    } catch (requestError: unknown) {
      setError(getFriendlyAuthError(requestError, 'sendOtp'));
    } finally {
      setSending(false);
    }
  };

  const configurationError = getSupabaseConfigurationError();

  return (
    <OnboardingScreen
      onContinue={() => { void sendCode(); }}
      continueLabel={sending ? 'Sending code…' : 'Send code'}
      disabled={!client || sending}
      contentStyle={styles.content}
    >
      <FlowIntro title="Enter your mobile number" description="We'll text a 6-digit code to verify." />
      <View style={styles.phoneRow}>
        <View accessibilityLabel="Nigeria country code +234" style={styles.countryCode}>
          <Text style={styles.flag}>🇳🇬</Text>
          <Text style={styles.code}>+234</Text>
        </View>
        <TextInput
          accessibilityLabel="Mobile number"
          autoComplete="tel-national"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(value) => { setPhone(value); setError(''); }}
          placeholder="812 345 6789"
          errorText={error}
          containerStyle={styles.phoneField}
          inputStyle={styles.numberInput}
          editable={!sending}
        />
      </View>
      <Text style={styles.policy}>By continuing you agree to the community guidelines and privacy policy.</Text>
      {!client && configurationError ? <DevelopmentNotice>{configurationError}</DevelopmentNotice> : null}
      {sessionError ? <Text accessibilityLiveRegion="polite" style={styles.error}>{sessionError}</Text> : null}
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: spacing[8] },
  phoneRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing[1] },
  countryCode: { width: 72, height: dimensions.inputHeight, backgroundColor: colors.neutral, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 },
  flag: { fontSize: 15 },
  code: { ...typography.label, color: colors.text },
  phoneField: { flex: 1, minWidth: 0 },
  numberInput: { borderColor: colors.coral, fontSize: 14 },
  policy: { ...typography.caption, fontSize: 10, lineHeight: 14, color: colors.textMuted, textAlign: 'center', marginTop: spacing[3] },
  error: { ...typography.caption, color: colors.coral, marginTop: spacing[2] },
});
