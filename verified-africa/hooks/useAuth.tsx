import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';

import { getSupabaseClient, getSupabaseConfigurationError } from '../services/supabase';
import { getFriendlyAuthError } from '../utils/authError';

type SignOutResult = { error: string | null };

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  configurationError: string | null;
  signOut: () => Promise<SignOutResult>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [configurationError, setConfigurationError] = useState<string | null>(null);

  useEffect(() => {
    const client = getSupabaseClient();
    if (!client) {
      setConfigurationError(getSupabaseConfigurationError());
      setLoading(false);
      return;
    }

    let mounted = true;
    let authEventReceived = false;
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, nextSession) => {
      authEventReceived = true;
      if (!mounted) return;
      setSession(nextSession);
      setError(null);
      setLoading(false);
    });

    void client.auth.getSession().then(({ data, error: sessionError }) => {
      if (!mounted) return;
      if (sessionError) {
        setSession(null);
        setError(getFriendlyAuthError(sessionError, 'restore'));
      } else if (!authEventReceived) {
        setSession(data.session);
      }
      setConfigurationError(null);
      setLoading(false);
    }).catch((sessionError: unknown) => {
      if (!mounted) return;
      setSession(null);
      setError(getFriendlyAuthError(sessionError, 'restore'));
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async (): Promise<SignOutResult> => {
    const client = getSupabaseClient();
    if (!client) {
      const message = getSupabaseConfigurationError() ?? 'Supabase is not configured.';
      setConfigurationError(message);
      return { error: message };
    }

    try {
      const { error: signOutError } = await client.auth.signOut({ scope: 'local' });
      if (signOutError) {
        const message = getFriendlyAuthError(signOutError, 'signOut');
        setError(message);
        return { error: message };
      }
      setError(null);
      return { error: null };
    } catch (signOutError: unknown) {
      const message = getFriendlyAuthError(signOutError, 'signOut');
      setError(message);
      return { error: message };
    }
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    user: session?.user ?? null,
    loading,
    error,
    configurationError,
    signOut,
  }), [session, loading, error, configurationError, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
