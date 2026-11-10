import { Webhook } from 'npm:standardwebhooks@1.0.0';

export type StandardWebhookHeaders = {
  'webhook-id': string;
  'webhook-timestamp': string;
  'webhook-signature': string;
};

export function readStandardWebhookHeaders(headers: Headers): StandardWebhookHeaders | null {
  const id = headers.get('webhook-id');
  const timestamp = headers.get('webhook-timestamp');
  const signature = headers.get('webhook-signature');
  if (!id || !timestamp || !signature) return null;
  return { 'webhook-id': id, 'webhook-timestamp': timestamp, 'webhook-signature': signature };
}

function webhookSecretCandidates(secret: string): string[] {
  return secret.split('|').map((candidate) => candidate.trim()).filter((candidate) =>
    /^v\d+,whsec_[A-Za-z0-9+/_=-]+$/.test(candidate)
  ).map((candidate) => candidate.replace(/^v\d+,whsec_/, ''));
}

/** Verifies the untouched request body before the caller parses its JSON. */
export function verifySupabaseAuthHookSignature(
  rawBody: string,
  headers: StandardWebhookHeaders,
  configuredSecret: string,
): boolean {
  const candidates = webhookSecretCandidates(configuredSecret);
  if (candidates.length === 0) throw new Error('Invalid Send SMS hook secret configuration.');
  for (const secret of candidates) {
    try {
      new Webhook(secret).verify(rawBody, headers);
      return true;
    } catch {
      // Try the next configured secret to support a safe secret rotation window.
    }
  }
  return false;
}
