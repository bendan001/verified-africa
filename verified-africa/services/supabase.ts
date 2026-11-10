import 'react-native-url-polyfill/auto';
import 'expo-sqlite/localStorage/install';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/types/database';

let client: SupabaseClient<Database> | null = null;
let configurationError: string | null = null;

/** Lazily build the shared client so the app can show a configuration state when env is missing. */
export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (client) return client;

  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    configurationError =
      'Supabase is not configured. Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY to your local .env file, then restart Expo.';
    return null;
  }

  if (!supabasePublishableKey.startsWith('sb_publishable_')) {
    configurationError =
      'EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY must be a Supabase publishable key. Never use a secret or service-role key in the mobile app.';
    return null;
  }

  try {
    client = createClient<Database>(supabaseUrl, supabasePublishableKey, {
      auth: {
        storage: localStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
    configurationError = null;
    return client;
  } catch {
    configurationError =
      'Supabase configuration is invalid. Check the project URL and publishable key in your local .env file.';
    return null;
  }
}

export function getSupabaseConfigurationError(): string | null {
  if (client) return null;
  getSupabaseClient();
  return configurationError;
}
