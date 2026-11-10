import type { User } from '@supabase/supabase-js';
import { getSupabaseClient } from './supabase';
import type { Database } from '../types/database';

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type Country = Pick<Database['public']['Tables']['countries']['Row'], 'id' | 'name' | 'code'>;
export type ProfileUpdateInput = Partial<Pick<ProfileRow,
  'username' | 'first_name' | 'date_of_birth' | 'gender' | 'country_id' |
  'state_region' | 'city' | 'bio' | 'profile_photo_url' | 'occupation' |
  'education' | 'relationship_goal' | 'is_profile_complete'>>;

export class ProfileServiceError extends Error {
  constructor(message: string, readonly code?: string) {
    super(message);
    this.name = 'ProfileServiceError';
  }
}

async function getCurrentUser(): Promise<User> {
  const client = getSupabaseClient();
  if (!client) throw new ProfileServiceError('Supabase is not configured.');
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) throw new ProfileServiceError('Your sign-in has expired. Please sign in again.', error?.code);
  return data.user;
}

export async function getCurrentProfile(): Promise<ProfileRow> {
  const client = getSupabaseClient();
  if (!client) throw new ProfileServiceError('Supabase is not configured.');
  const user = await getCurrentUser();
  const { data, error } = await client.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (error) throw new ProfileServiceError('We could not load your account profile. Please try again.', error.code);
  if (!data) throw new ProfileServiceError('Your account profile needs recovery. Please contact support.', 'PROFILE_MISSING');
  return data;
}

export async function updateCurrentProfile(input: ProfileUpdateInput): Promise<ProfileRow> {
  const client = getSupabaseClient();
  if (!client) throw new ProfileServiceError('Supabase is not configured.');
  const user = await getCurrentUser();
  const normalized: ProfileUpdateInput = { ...input };
  if (typeof normalized.username === 'string') normalized.username = normalized.username.trim().toLowerCase();
  if (typeof normalized.first_name === 'string') normalized.first_name = normalized.first_name.trim();
  if (typeof normalized.bio === 'string') normalized.bio = normalized.bio.trim();
  const { data, error } = await client.from('profiles').update(normalized).eq('id', user.id).select('*').single();
  if (error) {
    if (error.code === '23505') throw new ProfileServiceError('That username is already taken. Please choose another.', error.code);
    if (error.code === 'PGRST116') throw new ProfileServiceError('Your account profile needs recovery. Please contact support.', error.code);
    throw new ProfileServiceError('We could not save your profile. Check your connection and try again.', error.code);
  }
  return data;
}

export async function getActiveCountries(): Promise<Country[]> {
  const client = getSupabaseClient();
  if (!client) throw new ProfileServiceError('Supabase is not configured.');
  await getCurrentUser();
  const { data, error } = await client.from('countries').select('id,name,code').eq('is_active', true).order('name');
  if (error) throw new ProfileServiceError('We could not load the country list. Please try again.', error.code);
  return data;
}
