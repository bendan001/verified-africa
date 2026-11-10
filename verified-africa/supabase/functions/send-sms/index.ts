import { readStandardWebhookHeaders, verifySupabaseAuthHookSignature } from './signature.ts';
import { parseSendSmsEvent, readTermiiConfig, sendSmsWithTermii, SmsHookError } from './provider.ts';

function hookError(status: number, message: string): Response {
  return Response.json({ error: { http_code: status, message } }, { status });
}

Deno.serve(async (request) => {
  if (request.method !== 'POST') return hookError(405, 'Method not allowed.');

  const hookSecret = Deno.env.get('SEND_SMS_HOOK_SECRET');
  if (!hookSecret) {
    console.error(JSON.stringify({ event: 'send_sms_hook_configuration_error', reason: 'Missing SEND_SMS_HOOK_SECRET' }));
    return hookError(500, 'SMS delivery is not configured.');
  }

  const headers = readStandardWebhookHeaders(request.headers);
  if (!headers) {
    console.error(JSON.stringify({ event: 'send_sms_hook_signature_invalid' }));
    return hookError(401, 'Invalid hook signature.');
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 32_768) return hookError(413, 'Hook payload is too large.');

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return hookError(400, 'Malformed Send SMS hook payload.');
  }

  let signatureValid: boolean;
  try {
    signatureValid = verifySupabaseAuthHookSignature(rawBody, headers, hookSecret);
  } catch {
    console.error(JSON.stringify({ event: 'send_sms_hook_configuration_error', reason: 'Invalid SEND_SMS_HOOK_SECRET format' }));
    return hookError(500, 'SMS delivery is not configured.');
  }
  if (!signatureValid) {
    console.error(JSON.stringify({ event: 'send_sms_hook_signature_invalid' }));
    return hookError(401, 'Invalid hook signature.');
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody) as unknown;
  } catch {
    return hookError(400, 'Malformed Send SMS hook payload.');
  }

  try {
    const event = parseSendSmsEvent(payload);
    const config = readTermiiConfig((name) => Deno.env.get(name));
    await sendSmsWithTermii(event, config);
    return Response.json({}, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof SmsHookError) {
      if (error.status >= 500) {
        console.error(JSON.stringify({ event: 'send_sms_hook_delivery_failed', reason: error.message }));
      }
      return hookError(error.status, error.message);
    }
    console.error(JSON.stringify({ event: 'send_sms_hook_delivery_failed' }));
    return hookError(500, 'SMS delivery failed.');
  }
});
