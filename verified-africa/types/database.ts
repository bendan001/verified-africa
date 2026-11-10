export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type VerificationStatus =
  | 'pending'
  | 'processing'
  | 'verified'
  | 'failed'
  | 'expired'
  | 'manual_review';

export type Database = {
  public: {
    Tables: {
      countries: {
        Row: {
          id: string;
          code: string;
          name: string;
          phone_code: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          code: string;
          name: string;
          phone_code?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          name?: string;
          phone_code?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          username: string | null;
          first_name: string | null;
          date_of_birth: string | null;
          gender: string | null;
          country_id: string | null;
          state_region: string | null;
          city: string | null;
          bio: string | null;
          profile_photo_url: string | null;
          occupation: string | null;
          education: string | null;
          relationship_goal: string | null;
          is_profile_complete: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          first_name?: string | null;
          date_of_birth?: string | null;
          gender?: string | null;
          country_id?: string | null;
          state_region?: string | null;
          city?: string | null;
          bio?: string | null;
          profile_photo_url?: string | null;
          occupation?: string | null;
          education?: string | null;
          relationship_goal?: string | null;
          is_profile_complete?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          first_name?: string | null;
          date_of_birth?: string | null;
          gender?: string | null;
          country_id?: string | null;
          state_region?: string | null;
          city?: string | null;
          bio?: string | null;
          profile_photo_url?: string | null;
          occupation?: string | null;
          education?: string | null;
          relationship_goal?: string | null;
          is_profile_complete?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_country_id_fkey';
            columns: ['country_id'];
            isOneToOne: false;
            referencedRelation: 'countries';
            referencedColumns: ['id'];
          },
        ];
      };
      identity_verifications: {
        Row: {
          id: string;
          user_id: string;
          provider: string;
          provider_reference: string | null;
          verification_status: VerificationStatus;
          verified_country_id: string | null;
          verified_date_of_birth: string | null;
          verified_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          provider: string;
          provider_reference?: string | null;
          verification_status?: VerificationStatus;
          verified_country_id?: string | null;
          verified_date_of_birth?: string | null;
          verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          provider?: string;
          provider_reference?: string | null;
          verification_status?: VerificationStatus;
          verified_country_id?: string | null;
          verified_date_of_birth?: string | null;
          verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'identity_verifications_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'identity_verifications_verified_country_id_fkey';
            columns: ['verified_country_id'];
            isOneToOne: false;
            referencedRelation: 'countries';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
