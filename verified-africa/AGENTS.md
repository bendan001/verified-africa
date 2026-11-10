# Verified Africa — Engineering and Product Guide

This file is the permanent engineering and product guide for the Verified Africa repository. Follow it when planning, implementing, reviewing, or operating the application. Update it when deliberate product or architectural decisions change.

## Project

- Product name: **Verified Africa**.
- An 18+ African social and dating application.
- Initial market: Nigeria. Design the architecture to expand to Ghana, Kenya, South Africa, Uganda, Rwanda, Tanzania, and other African countries.
- The product combines social chat rooms, friendships, dating, matching, and private messaging.
- Its core differentiator is identity verification and real-user trust.

## Design and Product Reference

- A completed Canva UI/UX prototype exists and is the visual source of truth and product UI/UX reference.
- Do not redesign the product unnecessarily. Before implementing major screens, inspect or refer to the provided Canva design.
- Reproduce the Canva design as closely as practical in layout, spacing, typography, colors, buttons, cards, navigation, and visual hierarchy.
- If an exact Canva asset is unavailable, create the closest appropriate implementation rather than inventing a substantially different design.
- Prioritize visual consistency across screens.
- The final application must be a real mobile application, not a web mockup.

## Technology

- Mobile application: React Native with Expo.
- Language: TypeScript.
- Use Expo Router for navigation unless a later architectural decision requires otherwise.
- Backend, authentication, database, realtime, and storage: Supabase, with PostgreSQL through Supabase.
- Use Supabase Realtime where appropriate and Supabase Storage where appropriate.
- Use Supabase Edge Functions or another secure server-side layer for sensitive operations where appropriate.
- The eventual admin dashboard will be a separate web application using Next.js and TypeScript.

## Development Principles

- Build incrementally in vertical feature slices. Do not generate the entire application in one uncontrolled operation.
- Keep components modular and reusable. Keep business logic separate from presentation.
- Use strong TypeScript types and avoid unnecessary dependencies.
- Do not invent APIs or claim integrations are complete when they are not. Use placeholders or interfaces for external services until they are configured.
- Never overwrite working functionality unnecessarily.
- For each feature, understand the requirement, inspect the existing architecture, plan the smallest appropriate implementation, implement it, run available type checks, linting, and tests, fix errors, and only then move to the next feature.
- After each major feature, run appropriate checks and fix errors before proceeding.
- Do not blindly create every planned database table at once. Design and implement the database incrementally according to the feature being built.

## Identity, Age, and Security

- The application is strictly 18+. Users must verify their identity before becoming active users.
- Identity verification may include government-issued identity verification, selfie/liveness verification, and phone verification.
- Nigerian users may use NIN or another supported government identity method through an approved identity-verification provider.
- Never store raw NIN or unnecessary sensitive government identity information in the client database. Store only the minimum required verification information, such as provider, reference, status, and timestamps.
- Identity verification must use trusted server-side logic. The client must never be able to set its own verified status, premium status, or coin balance.
- Payment and subscription state must be validated server-side.
- Use Supabase Row Level Security (RLS) to protect data.
- Never expose Supabase service-role keys, identity-provider secret keys, or payment secret keys in the mobile application.
- Store sensitive configuration in environment variables. Never commit real credentials or secrets.
- Age verification and age-room eligibility must derive from verified date of birth, not a user-editable value.

## Planned Social Features

- User registration and authentication.
- Phone verification, identity verification, and age verification.
- Verified profiles, username-based discovery, profile photos, and user profiles.
- Discover/browse, likes, matches, friend requests, and friendships.
- Private messaging and public chat rooms.
- Country-specific rooms, age-bracket rooms, and an Africa-wide general room.
- Notifications, blocking, reporting, and account deletion.

## Country and Age Room Access

- Users may access only their verified country's rooms. Determine country from verified identity rather than only a user-selected country.
- The Africa-wide room is available to eligible users across participating African countries.
- Enforce country and room access restrictions server-side, not only by hiding UI elements.
- Age rooms are 18–25, 26–35, 36–45, and 46+. Calculate access from verified date of birth; users cannot edit their verified age to enter another room.
- Enforce age-room access server-side.

## Chat and Coins

- Each public room message costs one coin.
- Private messaging with accepted friends and dating matches is free.
- Friend requests are free and must be protected with anti-spam controls and rate limits.
- Newly verified users receive 100 starter coins.
- Users may purchase additional coins.
- Coin balances and transactions must be server-controlled and every transaction auditable. Never allow the client to modify a user's coin balance directly.
- Coins are an internal virtual currency. Show them with a dedicated coin icon, never a fiat currency symbol. Use localized fiat currency only for actual purchases.
- Currency display for actual purchases must support localization by country or market; do not embed Naira formatting in reusable UI components.

## Premium Membership

- Premium membership is planned as a monthly subscription.
- Initial Nigeria pricing is ₦4,999 per month. Keep plan prices configurable and localized by market; never hard-code a price into UI components or business logic.
- Define premium features during implementation.
- Control subscription status through trusted payment and subscription events. Never trust a client-side premium flag.

## Payments

- Potential providers include Paystack or Flutterwave, depending on market and platform requirements.
- Mobile app store billing may be required for some digital subscriptions under Apple or Google rules.
- Keep payment architecture provider-agnostic where practical.
- Never place payment secret keys in the mobile application.

## Safety and Moderation

Safety is an MVP requirement, not a later feature. Include architecture for:

- Blocking and reporting users, and reporting messages.
- Moderation actions, account suspension, and account deletion.
- Abuse prevention, rate limiting, and anti-spam protections.
- Privacy controls and secure handling of identity-verification information.
- Appropriate safeguards for an 18+ dating and social product.

## Planned Data Model

The backend is expected to eventually include entities or tables such as:

`users`, `profiles`, `countries`, `identity_verifications`, `subscriptions`, `plans`, `payments`, `likes`, `matches`, `friend_requests`, `friendships`, `conversations`, `messages`, `rooms`, `room_members`, `coin_transactions`, `notifications`, `devices`, `blocks`, `reports`, and `moderation_actions`.

Do not create all of these at once. Add and secure data structures incrementally as features require them.

## Project Structure

Prefer a clean structure similar to the following; adjust it as needed when Expo Router is initialized:

```text
src/
  components/
  screens/
    auth/
    onboarding/
    home/
    discover/
    rooms/
    chat/
    matches/
    profile/
    wallet/
    premium/
    settings/
  navigation/
  hooks/
  services/
  types/
  utils/
  constants/
  assets/
```

Keep code organized by responsibility. Avoid placing generated output or dependency folders in source control. Document the selected toolchain, setup, and exact build, run, and check commands here when established.

## Phone Authentication Architecture

- Supabase Auth is the canonical source for the authenticated user and session.
- `hooks/useAuth.tsx` restores the persisted Supabase session, subscribes to `onAuthStateChange`, and exposes the session, user, loading state, and local sign-out operation.
- Expo Router protected routes keep the main application screens behind a restored authenticated session. Onboarding routes remain available during the phone sign-in and post-sign-in setup flow.
- Phone sign-in sends E.164 numbers to Supabase Auth with `signInWithOtp`; the OTP screen verifies with `verifyOtp` using the SMS token. OTP codes must never be hard-coded.
- The Supabase client uses the public URL and publishable key only. Its React Native session persistence uses the existing Expo SQLite `localStorage` integration. Missing local configuration is surfaced in development rather than replaced with fake credentials.
- A successful OTP flow reads the authenticated user and checks the trigger-created profile. The client must not insert a duplicate profile or directly modify identity-verification records.
- Sign-out uses Supabase Auth local-session scope. Identity, age, country, payment, and subscription verification remain server-controlled and outside the phone-auth flow.

## Phone SMS Delivery Configuration

Phase 3E uses the Supabase Auth Send SMS Hook with the `send-sms` Edge Function and Termii's SMS Messaging API. Supabase Auth remains the only OTP authority: it generates the OTP before calling the hook, and the mobile client still uses `signInWithOtp` and `verifyOtp`. The Edge Function sends the hook's `sms.otp` using Termii `POST {TERMII_BASE_URL}/api/sms/send`; it never calls Termii's OTP-generation or verification endpoints. The custom hook replaces Auth's built-in SMS sending when enabled, so Twilio is not required for SMS delivery.

The function verifies the untouched request body using Standard Webhooks with `SEND_SMS_HOOK_SECRET`. Its public Edge Function gateway has `verify_jwt = false` because Auth Hook requests authenticate through the signature instead of a user JWT; invalid or missing signatures are rejected before payload parsing or provider access. The Termii provider implementation is separate from hook verification so another provider can be added later without changing mobile authentication.

Implementation references: [Supabase Send SMS Hook](https://supabase.com/docs/guides/auth/auth-hooks/send-sms-hook), [Supabase Auth Hooks](https://supabase.com/docs/guides/auth/auth-hooks), and [Termii Messaging API](https://developers.termii.com/messaging-api).

### Manual hosted Supabase configuration

1. Enable Phone sign-in in **Authentication → Sign In / Providers**. Keep Supabase's Auth OTP generation and verification settings enabled, with the OTP length and expiration matching the six-digit mobile interface.
2. Deploy `supabase/functions/send-sms` to the hosted project. The function is configured with `verify_jwt = false`; do not expose it to callers without a valid Send SMS Hook signature.
3. In the project's Edge Function secrets, set `TERMII_API_KEY`, `TERMII_BASE_URL`, and `TERMII_SENDER_ID`. Use the Termii account's base URL from its dashboard and an approved 3–11 character sender ID. OTPs always use Termii's `dnd` transactional route; Termii requires account activation for DND delivery, so request it before testing. The promotional `generic` route must not be used for OTPs. Also store the signing secret generated/configured for the Auth hook as `SEND_SMS_HOOK_SECRET`. Never put these values in React Native, `app.json`, `EXPO_PUBLIC_*`, or Git.
4. In **Authentication → Hooks**, create/enable the **Send SMS** HTTP hook and set its URL to `https://<project-ref>.supabase.co/functions/v1/send-sms`. Use the Standard Webhooks signing secret and store the same secret in Edge Function secrets as `SEND_SMS_HOOK_SECRET`. The Auth Hook configuration is the switch from built-in provider sending to the custom provider path; retain the old provider configuration until a real test confirms the hook works.
5. Check current OTP request and verification limits in **Authentication → Rate Limits**. Do not lower/disable these protections for the Termii integration. The hosted project's current values are not present in this repository and were not inspectable in the development environment; record them during Dashboard setup.
6. Add the Supabase project URL and publishable key to the ignored local `.env` as `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, then restart Expo. Never use a service-role/secret key in the mobile app.
7. Confirm Auth's SMS hook delivery history/logs, then use a real test number to verify one Supabase-generated OTP arrives and succeeds through `supabase.auth.verifyOtp`.

Local Supabase CLI and Deno are not installed in the current development environment. The Deno test suite is committed alongside the function and uses a mocked provider fetcher; it never sends SMS. Hosted Auth OTP rate limits and a real Termii delivery test require manual Dashboard access and server-side secrets.

## Current Development Phase

Phase 3D — onboarding profile persistence implemented. Authenticated users load their trigger-created `profiles` row; missing rows surface a recoverable profile-recovery message and are never inserted by the client. Basics persist first name, normalized username, self-reported date of birth, gender, selected country UUID, state/region, and city. The interests screen persists bio and marks the profile complete only after required profile fields have been saved. Profile DOB and country remain self-reported; provider-confirmed DOB and country come only from `identity_verifications.verified_date_of_birth` and `identity_verifications.verified_country_id`. Interests remain in local onboarding state until a later database phase. Photo selection remains a local placeholder; production profile-photo storage is deferred until a storage bucket and RLS design are established.

On authenticated launch, the app fetches the current user's profile. Complete profiles route to Home; incomplete profiles resume at `/onboarding/basics`. Saved profile fields prefill onboarding. Country options are fetched from active rows in `countries`; the displayed country name is resolved from its database UUID. Usernames are trimmed and lowercased before persistence, with unique conflicts shown as a friendly validation error. Client-side DOB validation checks calendar validity and the 18+ minimum for user experience only; it is not identity verification.

Phase 3E — custom SMS delivery implementation added. The Supabase Auth Send SMS Hook calls the `send-sms` Edge Function, which verifies the Standard Webhooks signature and sends Supabase's OTP through Termii's SMS API using its transactional `dnd` route. Required server-side settings are `SEND_SMS_HOOK_SECRET`, `TERMII_API_KEY`, `TERMII_BASE_URL`, and `TERMII_SENDER_ID`; none belong in mobile configuration. Supabase Auth continues to generate and verify OTPs. A Deno test path covers hook payload parsing, signature validation, Termii request construction, and provider/configuration failures without sending SMS. Mobile TypeScript and Expo validation are tracked in the implementation report; Deno tests and real OTP delivery remain manual because Deno, Supabase CLI, hosted secrets, and dashboard access are unavailable here. Provider parsing/request/error scenarios were also exercised with a local mocked fetcher; no SMS was sent. Hosted OTP rate-limit values require Dashboard inspection.

The next task is **Phase 3F**: configure the hosted Send SMS Hook and Edge Function secrets, inspect and record the existing Supabase Auth rate limits without weakening them, then run one real Nigerian OTP delivery and verification test. After delivery is confirmed, plan normalized interests persistence and production photo storage as separate data/storage work.
