// import { DefaultTheme } from '@emotion/react';

export const colors = {
  MAIN_GREEN: '#88CD34',
  MAIN_GREEN2: '#3E5617',
  MAIN_BLACK: '#201E50',
  MAIN_BG: '#FFFFFF',
};

export const paddings = {
  X_SMALL: '0.75rem',
  SMALL: '1rem',
  MEDIUM: '1.5rem',
  LARGE: '2rem',
  X_LARGE: '3rem',
};

export const fontSize = {
  heading1: '3rem',
  heading2: '2.25rem',
  heading3: '1.5rem',
  content: '1rem',
  description: '0.875rem',
  tag: '0.75rem',
};

export const fontWeight = {
  thicker: '700',
  thick: '600',
  default: '400',
  thin: '300',
};

export const borderRadius = {
  circle: '50%',
};

export const theme = {
  colors,
  paddings,
  fontSize,
  fontWeight,
  borderRadius,
};

export type ThemeType = typeof theme;
