export type PhoneCountry = 'NG';

type PhoneCountryConfig = {
  callingCode: string;
  nationalNumberLength: number;
  trunkPrefix: string;
  mobilePrefixPattern: RegExp;
};

// Keep numbering rules data-driven so additional African countries can be added here.
const phoneCountries: Record<PhoneCountry, PhoneCountryConfig> = {
  NG: {
    callingCode: '234',
    nationalNumberLength: 10,
    trunkPrefix: '0',
    mobilePrefixPattern: /^(?:70|80|81|90|91)\d{8}$/,
  },
};

export type PhoneNormalizationResult =
  | { ok: true; e164: string }
  | { ok: false; error: string };

export function normalizePhoneNumber(input: string, country: PhoneCountry = 'NG'): PhoneNormalizationResult {
  const value = input.trim();
  if (!value || !/^[+\d\s().-]+$/.test(value)) {
    return { ok: false, error: 'Enter a valid mobile number.' };
  }

  const config = phoneCountries[country];
  let digits = value.replace(/\D/g, '');

  if (value.startsWith('+')) {
    if (!digits.startsWith(config.callingCode)) {
      return { ok: false, error: `Enter a number with country code +${config.callingCode}.` };
    }
    digits = digits.slice(config.callingCode.length);
  } else if (digits.startsWith(config.callingCode) && digits.length === config.nationalNumberLength + config.callingCode.length) {
    digits = digits.slice(config.callingCode.length);
  } else if (digits.startsWith(config.trunkPrefix) && digits.length === config.nationalNumberLength + config.trunkPrefix.length) {
    digits = digits.slice(config.trunkPrefix.length);
  }

  if (digits.length !== config.nationalNumberLength || !config.mobilePrefixPattern.test(digits)) {
    return { ok: false, error: 'Enter a valid Nigerian mobile number, such as 08012345678.' };
  }

  return { ok: true, e164: `+${config.callingCode}${digits}` };
}
