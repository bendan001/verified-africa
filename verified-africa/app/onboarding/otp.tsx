import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DevelopmentNotice, FlowIntro } from '../../components/onboarding/FlowIntro';
import { OnboardingScreen } from '../../components/onboarding/OnboardingScreen';
import { OtpCodeInput } from '../../components/ui';
import { colors, spacing, typography } from '../../constants/theme';
import { getSupabaseClient, getSupabaseConfigurationError } from '../../services/supabase';
import { getFriendlyAuthError } from '../../utils/authError';

const RESEND_DELAY_SECONDS = 42;

export default function OtpEntryScreen() {
  const { phone: phoneParam } = useLocalSearchParams<{ phone?: string }>();
  const phone = typeof phoneParam === 'string' ? phoneParam : '';
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(RESEND_DELAY_SECONDS);
  const client = getSupabaseClient();

  useEffect(() => {
    if (!phone) router.replace('/onboarding/phone');
  }, [phone]);

  useEffect(() => {
    if (resendSeconds === 0) return undefined;
    const timer = setInterval(() => setResendSeconds((current) => Math.max(0, current - 1)), 1000);
    return () => clearInterval(timer);
  }, [resendSeconds]);

  const verify = async () => {
    if (!client || !phone || code.length !== 6) return;
    setVerifying(true);
    setError('');
    try {
      const { data, error: verifyError } = await client.auth.verifyOtp({ phone, token: code, type: 'sms' });
      if (verifyError) {
        setError(getFriendlyAuthError(verifyError, 'verifyOtp'));
        return;
      }
      if (!data.session || !data.user) {
        setError('We could not confirm your sign-in. Request a new code and try again.');
        return;
      }

      const { data: profile, error: profileError } = await client
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .maybeSingle();

      const profileSetup = profileError ? 'check_failed' : profile ? 'ready' : 'missing';
      router.replace({ pathname: '/onboarding/identity', params: { profileSetup } });
    } catch (verifyError: unknown) {
      setError(getFriendlyAuthError(verifyError, 'verifyOtp'));
    } finally {
      setVerifying(false);
    }
  };

  const resendCode = async () => {
    if (!client || !phone || resendSeconds > 0 || resending) return;
    setResending(true);
    setError('');
    try {
      const { error: resendError } = await client.auth.signInWithOtp({ phone });
      if (resendError) {
        setError(getFriendlyAuthError(resendError, 'sendOtp'));
        return;
      }
      setCode('');
      setResendSeconds(RESEND_DELAY_SECONDS);
    } catch (resendError: unknown) {
      setError(getFriendlyAuthError(resendError, 'sendOtp'));
    } finally {
      setResending(false);
    }
  };

  const formattedCountdown = `00:${String(resendSeconds).padStart(2, '0')}`;
  const configurationError = getSupabaseConfigurationError();

  return (
    <OnboardingScreen
      onContinue={() => { void verify(); }}
      continueLabel={verifying ? 'Verifying…' : 'Verify'}
      disabled={!client || !phone || code.length !== 6 || verifying || resending}
      contentStyle={styles.content}
    >
      <FlowIntro title="Enter the code we sent" description={`Sent to ${phone}`} />
      <OtpCodeInput
        value={code}
        onChangeValue={(value) => { setCode(value); setError(''); }}
        editable={!verifying && !resending}
        error={Boolean(error)}
      />
      {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
      <View style={styles.resend}>
        {resendSeconds > 0 ? (
          <Text style={styles.resendText}>Resend in {formattedCountdown}</Text>
        ) : (
          <Pressable accessibilityRole="button" disabled={resending} onPress={() => { void resendCode(); }}>
            <Text style={[styles.resendText, styles.resendAction]}>{resending ? 'Sending…' : 'Resend code'}</Text>
          </Pressable>
        )}
      </View>
      {!client && configurationError ? <DevelopmentNotice>{configurationError}</DevelopmentNotice> : null}
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: spacing[8] },
  resend: { minHeight: 40, backgroundColor: colors.neutral, alignItems: 'center', justifyContent: 'center', marginTop: spacing[3], marginBottom: spacing[4] },
  resendText: { ...typography.caption, color: colors.textMuted },
  resendAction: { color: colors.indigo },
  error: { ...typography.caption, color: colors.coral, marginTop: spacing[2] },
});
