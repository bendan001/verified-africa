export type SendSmsEvent = {
  user: { phone: string };
  sms: { otp: string };
};

export type TermiiConfig = {
  apiKey: string;
  baseUrl: string;
  senderId: string;
  channel: 'dnd';
};

type TermiiRequestBody = {
  api_key: string;
  to: string;
  from: string;
  sms: string;
  type: 'plain';
  channel: 'dnd';
};

export class SmsHookError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'SmsHookError';
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function parseSendSmsEvent(value: unknown): SendSmsEvent {
  if (!isRecord(value) || !isRecord(value.user) || !isRecord(value.sms)) {
    throw new SmsHookError('Malformed Send SMS hook payload.', 400);
  }
  const phone = value.user.phone;
  const otp = value.sms.otp;
  if (typeof phone !== 'string' || phone.length === 0) {
    throw new SmsHookError('The Send SMS hook payload has no phone number.', 400);
  }
  if (typeof otp !== 'string' || otp.length === 0) {
    throw new SmsHookError('The Send SMS hook payload has no OTP.', 400);
  }
  return { user: { phone }, sms: { otp } };
}

/** Accept E.164 only; removing its leading plus preserves the complete country code. */
export function normalizeTermiiDestination(phone: string): string {
  if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
    throw new SmsHookError('Unsupported destination phone number.', 400);
  }
  return phone.slice(1);
}

export function readTermiiConfig(readEnv: (name: string) => string | undefined): TermiiConfig {
  const apiKey = readEnv('TERMII_API_KEY')?.trim();
  const baseUrl = readEnv('TERMII_BASE_URL')?.trim();
  const senderId = readEnv('TERMII_SENDER_ID')?.trim();
  if (!apiKey) throw new SmsHookError('Missing TERMII_API_KEY.', 500);
  if (!baseUrl) throw new SmsHookError('Missing TERMII_BASE_URL.', 500);
  if (!senderId) throw new SmsHookError('Missing TERMII_SENDER_ID.', 500);
  if (senderId.length < 3 || senderId.length > 11 || !/^[A-Za-z0-9]+$/.test(senderId)) {
    throw new SmsHookError('Invalid Termii sender configuration.', 500);
  }
  let parsedBaseUrl: URL;
  try {
    parsedBaseUrl = new URL(baseUrl);
  } catch {
    throw new SmsHookError('Invalid TERMII_BASE_URL.', 500);
  }
  if (parsedBaseUrl.protocol !== 'https:' || parsedBaseUrl.username || parsedBaseUrl.password || parsedBaseUrl.pathname !== '/' || parsedBaseUrl.search || parsedBaseUrl.hash) {
    throw new SmsHookError('Invalid TERMII_BASE_URL.', 500);
  }

  return { apiKey, baseUrl: parsedBaseUrl.origin, senderId, channel: 'dnd' };
}

export function buildTermiiRequest(event: SendSmsEvent, config: TermiiConfig): { url: string; body: TermiiRequestBody } {
  const destination = normalizeTermiiDestination(event.user.phone);
  return {
    url: `${config.baseUrl}/api/sms/send`,
    body: {
      api_key: config.apiKey,
      to: destination,
      from: config.senderId,
      sms: `Your Verified Africa verification code is ${event.sms.otp}. It expires soon. Do not share this code.`,
      type: 'plain',
      channel: config.channel,
    },
  };
}

function isAcceptedProviderResponse(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return (typeof value.message_id === 'string' && value.message_id.length > 0) || value.code === 'ok';
}

export async function sendSmsWithTermii(
  event: SendSmsEvent,
  config: TermiiConfig,
  fetcher: typeof fetch = fetch,
): Promise<void> {
  const request = buildTermiiRequest(event, config);
  let response: Response;
  try {
    response = await fetcher(request.url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(request.body),
      signal: AbortSignal.timeout(3500),
    });
  } catch {
    throw new SmsHookError('SMS provider request failed.', 502);
  }

  if (!response.ok) {
    throw new SmsHookError('SMS provider request failed.', 502);
  }

  let responseBody: unknown;
  try {
    responseBody = await response.json();
  } catch {
    throw new SmsHookError('SMS provider returned an invalid response.', 502);
  }
  if (!isAcceptedProviderResponse(responseBody)) {
    throw new SmsHookError('SMS provider rejected the message.', 502);
  }
}
