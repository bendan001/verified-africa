-- Phase 3B: minimum identity and profile foundation.
-- Raw government identity values and biometric data must never be added here.

create table public.countries (
  id uuid primary key,
  code text not null unique,
  name text not null unique,
  phone_code text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.countries (id, code, name, phone_code) values
  ('00000000-0000-4000-8000-000000000001', 'NG', 'Nigeria', '+234'),
  ('00000000-0000-4000-8000-000000000002', 'GH', 'Ghana', '+233'),
  ('00000000-0000-4000-8000-000000000003', 'KE', 'Kenya', '+254'),
  ('00000000-0000-4000-8000-000000000004', 'ZA', 'South Africa', '+27'),
  ('00000000-0000-4000-8000-000000000005', 'UG', 'Uganda', '+256'),
  ('00000000-0000-4000-8000-000000000006', 'RW', 'Rwanda', '+250'),
  ('00000000-0000-4000-8000-000000000007', 'TZ', 'Tanzania', '+255');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique,
  first_name text,
  date_of_birth date,
  gender text,
  country_id uuid references public.countries (id),
  state_region text,
  city text,
  bio text,
  profile_photo_url text,
  occupation text,
  education text,
  relationship_goal text,
  is_profile_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.identity_verifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  provider text not null,
  provider_reference text,
  verification_status text not null default 'pending',
  verified_country_id uuid references public.countries (id),
  verified_date_of_birth date,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint identity_verifications_status_check check (
    verification_status in (
      'pending',
      'processing',
      'verified',
      'failed',
      'expired',
      'manual_review'
    )
  )
);

comment on column public.profiles.date_of_birth is
  'User-provided profile date only; use identity_verifications.verified_date_of_birth for verified age.';
comment on column public.profiles.country_id is
  'User-provided profile location only; use identity_verifications.verified_country_id for verified-country access.';
comment on column public.identity_verifications.provider_reference is
  'External provider reference only. Never store raw government ID numbers or biometric data here.';

-- The username and user_id UNIQUE constraints provide their indexes.
create index profiles_country_id_idx on public.profiles (country_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := pg_catalog.now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger identity_verifications_set_updated_at
before update on public.identity_verifications
for each row execute function public.set_updated_at();

-- A new auth user receives an empty profile. The fixed, qualified insert and
-- empty search_path keep this SECURITY DEFINER trigger function constrained.
create or replace function public.create_profile_for_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke all on function public.create_profile_for_new_auth_user()
  from public, anon, authenticated;

create trigger on_auth_user_created_create_profile
after insert on auth.users
for each row execute function public.create_profile_for_new_auth_user();

alter table public.countries enable row level security;
alter table public.profiles enable row level security;
alter table public.identity_verifications enable row level security;

-- Start with no client table privileges, then grant only the operations backed
-- by the policies below. service_role remains a trusted server-side role.
revoke all on table public.countries from public, anon, authenticated;
revoke all on table public.profiles from public, anon, authenticated;
revoke all on table public.identity_verifications from public, anon, authenticated;

grant select on table public.countries to authenticated;
grant select on table public.profiles to authenticated;
grant insert (
  id,
  username,
  first_name,
  date_of_birth,
  gender,
  country_id,
  state_region,
  city,
  bio,
  profile_photo_url,
  occupation,
  education,
  relationship_goal,
  is_profile_complete
) on table public.profiles to authenticated;
grant update (
  username,
  first_name,
  date_of_birth,
  gender,
  country_id,
  state_region,
  city,
  bio,
  profile_photo_url,
  occupation,
  education,
  relationship_goal,
  is_profile_complete
) on table public.profiles to authenticated;
grant select on table public.identity_verifications to authenticated;

grant all on table public.countries to service_role;
grant all on table public.profiles to service_role;
grant all on table public.identity_verifications to service_role;

create policy countries_select_active_authenticated
on public.countries
for select
to authenticated
using (is_active = true);

create policy profiles_select_authenticated
on public.profiles
for select
to authenticated
using (true);

create policy profiles_insert_own
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

create policy profiles_update_own
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy identity_verifications_select_own
on public.identity_verifications
for select
to authenticated
using ((select auth.uid()) = user_id);
