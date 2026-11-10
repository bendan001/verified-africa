import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { getCurrentProfile, ProfileServiceError, type ProfileRow } from '../services/profile';

export type Gender = 'Woman' | 'Man' | 'Non-binary' | 'Prefer not to say' | '';

export type OnboardingProfile = {
  firstName: string;
  username: string;
  dateOfBirth: string;
  gender: Gender;
  country: string;
  countryId: string;
  stateRegion: string;
  city: string;
  profilePhotoUri: string | null;
  interests: string[];
  bio: string;
};

type ProfileLoadStatus = 'idle' | 'loading' | 'ready' | 'error';

type ProfileContextValue = {
  profile: OnboardingProfile;
  updateProfile: (updates: Partial<OnboardingProfile>) => void;
  savedProfile: ProfileRow | null;
  profileLoadStatus: ProfileLoadStatus;
  profileError: string | null;
  refreshProfile: () => Promise<ProfileRow | null>;
};

const emptyProfile: OnboardingProfile = {
  firstName: '', username: '', dateOfBirth: '', gender: '', country: '', countryId: '',
  stateRegion: '', city: '', profilePhotoUri: null, interests: ['Afrobeats', 'Travel', 'Film'], bio: '',
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function OnboardingProfileProvider({ children, user }: { children: ReactNode; user: User | null }) {
  const [profile, setProfile] = useState(emptyProfile);
  const [savedProfile, setSavedProfile] = useState<ProfileRow | null>(null);
  const [profileLoadStatus, setProfileLoadStatus] = useState<ProfileLoadStatus>('idle');
  const [profileError, setProfileError] = useState<string | null>(null);
  const refreshProfile = useCallback(async () => {
    if (!user) { setSavedProfile(null); setProfileLoadStatus('idle'); return null; }
    setProfileLoadStatus('loading'); setProfileError(null);
    try {
      const saved = await getCurrentProfile();
      setSavedProfile(saved);
      setProfile((current) => ({
        ...current,
        firstName: saved.first_name ?? '', username: saved.username ?? '',
        dateOfBirth: saved.date_of_birth ? `${saved.date_of_birth.slice(8, 10)}/${saved.date_of_birth.slice(5, 7)}/${saved.date_of_birth.slice(0, 4)}` : '',
        gender: (saved.gender as Gender | null) ?? '', countryId: saved.country_id ?? '',
        stateRegion: saved.state_region ?? '', city: saved.city ?? '', bio: saved.bio ?? '',
      }));
      setProfileLoadStatus('ready');
      return saved;
    } catch (error: unknown) {
      setProfileLoadStatus('error');
      setProfileError(error instanceof ProfileServiceError ? error.message : 'We could not load your account profile. Please try again.');
      return null;
    }
  }, [user]);
  useEffect(() => { void refreshProfile(); }, [refreshProfile]);
  const value = useMemo<ProfileContextValue>(() => ({
    profile,
    updateProfile: (updates) => setProfile((current) => ({ ...current, ...updates })),
    savedProfile, profileLoadStatus, profileError, refreshProfile,
  }), [profile, savedProfile, profileLoadStatus, profileError, refreshProfile]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useOnboardingProfile() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useOnboardingProfile must be used within OnboardingProfileProvider');
  return context;
}

export function ageFromDateOfBirth(value: string, now = new Date()): number | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day || date > now) return null;
  let age = now.getFullYear() - year;
  if (now.getMonth() < month - 1 || (now.getMonth() === month - 1 && now.getDate() < day)) age -= 1;
  return age;
}
