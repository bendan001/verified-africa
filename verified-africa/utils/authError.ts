type AuthErrorContext = 'sendOtp' | 'verifyOtp' | 'restore' | 'signOut';

function errorDetails(error: unknown): { message: string; status?: number; code?: string } {
  if (error instanceof Error) {
    const candidate = error as Error & { status?: unknown; code?: unknown };
    return {
      message: error.message,
      status: typeof candidate.status === 'number' ? candidate.status : undefined,
      code: typeof candidate.code === 'string' ? candidate.code : undefined,
    };
  }
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const candidate = error as { message?: unknown; status?: unknown; code?: unknown };
    return {
      message: typeof candidate.message === 'string' ? candidate.message : '',
      status: typeof candidate.status === 'number' ? candidate.status : undefined,
      code: typeof candidate.code === 'string' ? candidate.code : undefined,
    };
  }
  return { message: '' };
}

export function getFriendlyAuthError(error: unknown, context: AuthErrorContext): string {
  const details = errorDetails(error);
  const message = details.message.toLowerCase();
  const code = details.code?.toLowerCase() ?? '';

  if (details.status === 429 || message.includes('too many') || message.includes('rate limit')) {
    return context === 'sendOtp'
      ? 'Too many code requests. Please wait a few minutes before trying again.'
      : 'Too many attempts. Please wait a few minutes and try again.';
  }
  if (context === 'verifyOtp' && (message.includes('expired') || code.includes('expired'))) {
    return 'That code has expired. Request a new code and try again.';
  }
  if (context === 'verifyOtp' && (message.includes('invalid') || message.includes('token') || code.includes('otp'))) {
    return 'That code is invalid. Check the six digits and try again.';
  }
  if (message.includes('fetch') || message.includes('network') || message.includes('connection')) {
    return 'Connection problem. Check your internet and try again.';
  }
  if (context === 'restore') {
    return 'We could not restore your saved sign-in. Check your connection and reopen the app.';
  }
  if (context === 'signOut') {
    return 'We could not sign you out right now. Please try again.';
  }
  if (context === 'sendOtp') {
    return 'We could not send a code right now. Check the number and try again.';
  }
  return 'We could not verify that code. Please try again or request a new one.';
}
