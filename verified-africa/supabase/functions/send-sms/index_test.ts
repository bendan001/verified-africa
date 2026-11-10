import { readStandardWebhookHeaders, verifySupabaseAuthHookSignature } from './signature.ts';
import {
  buildTermiiRequest,
  normalizeTermiiDestination,
  parseSendSmsEvent,
  readTermiiConfig,
  sendSmsWithTermii,
  SmsHookError,
  type SendSmsEvent,
} from './provider.ts';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function fixtureEvent(): SendSmsEvent {
  return { user: { phone: '+2347066557974' }, sms: { otp: '123456' } };
}

function fixtureConfig() {
  return {
    apiKey: 'unit-test-only',
    baseUrl: 'https://api.ng.termii.com',
    senderId: 'VerifiedAF',
    channel: 'dnd' as const,
  };
}

Deno.test('parses only the official user.phone and sms.otp fields', () => {
  const parsed = parseSendSmsEvent(fixtureEvent());
  assert(parsed.user.phone === '+2347066557974', 'Expected hook phone to be preserved.');
  assert(parsed.sms.otp === '123456', 'Expected Supabase OTP to be preserved.');
});

Deno.test('rejects malformed hook payloads and unsupported phone formats', () => {
  let malformedRejected = false;
  try { parseSendSmsEvent({ user: {}, sms: {} }); } catch (error) { malformedRejected = error instanceof SmsHookError; }
  assert(malformedRejected, 'Malformed hook payload must be rejected.');
  let phoneRejected = false;
  try { normalizeTermiiDestination('07066557974'); } catch (error) { phoneRejected = error instanceof SmsHookError; }
  assert(phoneRejected, 'A national-format phone number must be rejected.');
});

Deno.test('normalizes E.164 by removing only the plus and preserves other country codes', () => {
  assert(normalizeTermiiDestination('+2347066557974') === '2347066557974', 'Nigeria country code was changed.');
  assert(normalizeTermiiDestination('+254712345678') === '254712345678', 'Kenya country code was changed.');
});

Deno.test('validates Termii configuration without contacting the provider', () => {
  const values: Record<string, string> = {
    TERMII_API_KEY: 'unit-test-only',
    TERMII_BASE_URL: 'https://api.ng.termii.com',
    TERMII_SENDER_ID: 'VerifiedAF',
  };
  const config = readTermiiConfig((name) => values[name]);
  assert(config.channel === 'dnd', 'OTP messages must use Termii transactional DND route.');
  let missingRejected = false;
  try { readTermiiConfig(() => undefined); } catch (error) { missingRejected = error instanceof SmsHookError; }
  assert(missingRejected, 'Missing provider configuration must be rejected.');
});

Deno.test('builds the documented Termii SMS request from the Supabase OTP', () => {
  const request = buildTermiiRequest(fixtureEvent(), fixtureConfig());
  assert(request.url === 'https://api.ng.termii.com/api/sms/send', 'Unexpected Termii endpoint.');
  assert(request.body.to === '2347066557974', 'Unexpected Termii destination.');
  assert(request.body.type === 'plain' && request.body.channel === 'dnd', 'OTP must use the transactional SMS route.');
  assert(request.body.sms.includes('123456'), 'Request must contain the Supabase OTP.');
});

Deno.test('mock provider acceptance succeeds without sending an SMS', async () => {
  let called = false;
  await sendSmsWithTermii(fixtureEvent(), fixtureConfig(), async (input, init) => {
    called = true;
    assert(String(input).endsWith('/api/sms/send'), 'Unexpected provider URL.');
    const requestBody = JSON.parse(String(init?.body)) as { to?: string; sms?: string };
    assert(requestBody.to === '2347066557974', 'Unexpected mocked request destination.');
    return Response.json({ message_id: 'unit-test-message' });
  });
  assert(called, 'Expected mocked provider to be called.');
});

Deno.test('provider HTTP, API rejection, and network failures are handled', async () => {
  const calls = [
    async () => new Response('{}', { status: 503 }),
    async () => Response.json({ code: 'error' }),
    async () => { throw new Error('network test fixture'); },
  ];
  for (const fetcher of calls) {
    let rejected = false;
    try { await sendSmsWithTermii(fixtureEvent(), fixtureConfig(), fetcher); } catch (error) { rejected = error instanceof SmsHookError; }
    assert(rejected, 'Provider failure must be returned as a safe hook error.');
  }
});

Deno.test('verifies Standard Webhooks signatures against raw body and rejects tampering', async () => {
  const rawBody = JSON.stringify({ user: { phone: '+2347066557974' }, sms: { otp: '123456' } });
  const secretBytes = new Uint8Array(32).map((_value, index) => index + 1);
  const secretBase64 = btoa(String.fromCharCode(...secretBytes));
  const secret = `v1,whsec_${secretBase64}`;
  const webhookId = 'msg_test_event';
  const timestamp = String(Math.floor(Date.now() / 1000));
  const key = await crypto.subtle.importKey('raw', secretBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signatureBytes = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${webhookId}.${timestamp}.${rawBody}`));
  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signatureBytes)));
  const requestHeaders = new Headers({
    'webhook-id': webhookId,
    'webhook-timestamp': timestamp,
    'webhook-signature': `v1,${signatureBase64}`,
  });
  const parsedHeaders = readStandardWebhookHeaders(requestHeaders);
  assert(parsedHeaders !== null, 'Expected all Standard Webhooks headers.');
  assert(verifySupabaseAuthHookSignature(rawBody, parsedHeaders, secret), 'Expected valid signature to pass.');
  assert(!verifySupabaseAuthHookSignature(`${rawBody} `, parsedHeaders, secret), 'Tampered body must fail signature validation.');
});
