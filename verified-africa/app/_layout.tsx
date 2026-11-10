import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { OnboardingProfileProvider, useOnboardingProfile } from '../hooks/useOnboardingProfile';
import { AuthProvider, useAuth } from '../hooks/useAuth';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Sora-Bold': require('../assets/fonts/Sora-Bold.ttf'),
    'DM-Sans-Regular': require('../assets/fonts/DM-Sans-Regular.ttf'),
    'DM-Sans-Medium': require('../assets/fonts/DM-Sans-Medium.ttf'),
    'DM-Sans-Bold': require('../assets/fonts/DM-Sans-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}

function RootLayoutContent() {
  const { user } = useAuth();
  return (
    <OnboardingProfileProvider user={user}>
      <ProtectedRouter />
    </OnboardingProfileProvider>
  );
}

function ProtectedRouter() {
  const { user, loading } = useAuth();
  const { profileLoadStatus, savedProfile } = useOnboardingProfile();
  const profileComplete = profileLoadStatus === 'ready' && savedProfile?.is_profile_complete === true;
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFFFFF' } }}>
      <Stack.Screen name="index" />
      <Stack.Protected guard={!loading && !user}>
        <Stack.Screen name="welcome" />
      </Stack.Protected>
      <Stack.Protected guard={!loading && Boolean(user) && profileComplete}>
        <Stack.Screen name="home" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="chat/[conversationId]" />
        <Stack.Screen name="rooms" />
        <Stack.Screen name="rooms/[roomId]" />
        <Stack.Screen name="wallet" />
        <Stack.Screen name="premium" />
        <Stack.Screen name="activity" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="profile/[profileId]" />
        <Stack.Screen name="match" />
        <Stack.Screen name="safety/report" />
      </Stack.Protected>
      <Stack.Protected guard={!loading}>
        <Stack.Screen name="onboarding/age" />
        <Stack.Screen name="onboarding/phone" />
        <Stack.Screen name="onboarding/otp" />
        <Stack.Screen name="onboarding/identity" />
        <Stack.Screen name="onboarding/id" />
        <Stack.Screen name="onboarding/liveness" />
        <Stack.Screen name="onboarding/basics" />
        <Stack.Screen name="onboarding/photo" />
        <Stack.Screen name="onboarding/interests" />
      </Stack.Protected>
    </Stack>
  );
}
