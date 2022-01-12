import { DefaultTheme, configureFonts } from 'react-native-paper';

export const palette = {
  /* white */
  w1: '#FFFFFF',
  /* grey */
  g1: '#535353',
  g2: '#C4C4C4',
  g3: '#E8E8E8',
  gr: '#5BCD89',
  /* black */
  b1: '#000000',
  /* primary */
  p1: '#5F40F7',
  p2: '#9283FF',
  p3: '#DBE7F5',
  p4: '#F2F6FF',
  p5: '#D6D0FF',
  /* red */
  r1: '#FF6A59',
  r2: '#cf1322',
  /* turquoise */
  t1: '#419A94',
  /* yellow */
  y1: '#FFB952'
};

export const padding = {
  xsmall: 12,
  small: 16,
  medium: 24,
  large: 32
};

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  fonts: { default: { fontFamily: 'Cochin' } },
  colors: {
    ...DefaultTheme.colors,
    primary: palette.p1,
    ...palette
  }
};
