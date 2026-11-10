import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';

export const colors = {
  indigo: '#0E1A3A',
  indigoDeep: '#070F24',
  indigoSecondary: '#1A2A55',
  indigoSecondaryAlt: '#17224A',
  coral: '#FF6A4D',
  coralSoft: '#FFD8CF',
  surface: '#FFFFFF',
  neutral: '#F1ECE4',
  canvas: '#FBF7F2',
  text: '#121A33',
  textMuted: '#6B7390',
  divider: '#E6E2DB',
  coin: '#F4B63F',
  success: '#2FA36A',
  disabledText: '#9AA0B4',
  overlay: 'rgba(7, 15, 36, 0.72)',
} as const;

export const fontFamilies = {
  display: 'Sora-Bold',
  heading: 'Sora-Bold',
  body: 'DM-Sans-Regular',
  medium: 'DM-Sans-Medium',
  bold: 'DM-Sans-Bold',
} as const;

export const typography = StyleSheet.create<Record<string, TextStyle>>({
  display: {
    fontFamily: fontFamilies.display,
    fontSize: 56,
    lineHeight: 64,
  },
  heading: {
    fontFamily: fontFamilies.heading,
    fontSize: 24,
    lineHeight: 32,
  },
  screenTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: 20,
    lineHeight: 28,
  },
  subheading: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    lineHeight: 24,
  },
  body: {
    fontFamily: fontFamilies.body,
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: fontFamilies.body,
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontFamily: fontFamilies.body,
    fontSize: 12,
    lineHeight: 16,
  },
  eyebrow: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  button: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    lineHeight: 20,
  },
});

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  6: 24,
  8: 32,
  12: 48,
} as const;

export const radii = {
  none: 0,
  small: 4,
  control: 6,
  card: 8,
  circle: 999,
} as const;

export const elevation = {
  flat: 0,
  subtle: 1,
} as const;

export const shadows: Record<'none' | 'subtle', ViewStyle> = {
  none: {
    shadowColor: colors.indigoDeep,
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: elevation.flat,
  },
  // Available for exceptional overlays; the Canva cards themselves are flat.
  subtle: {
    shadowColor: colors.indigoDeep,
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: elevation.subtle,
  },
};

export const dimensions = {
  minimumTapTarget: 48,
  buttonHeight: 48,
  inputHeight: 48,
  headerHeight: 56,
  tabBarHeight: 60,
  screenPadding: 16,
  screenPaddingWide: 24,
  avatar: 44,
  badge: 16,
  otpCell: 48,
  contentMaxWidth: 480,
  dialogMaxWidth: 440,
} as const;

export type ThemeColor = keyof typeof colors;
