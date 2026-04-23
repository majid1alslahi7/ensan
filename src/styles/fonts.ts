import localFont from 'next/font/local';

export const poppins = localFont({
  src: [
    { path: '../fonts/Poppins-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/Poppins-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../fonts/Poppins-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../fonts/Poppins-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-poppins',
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

export const cairo = localFont({
  src: [{ path: '../fonts/Cairo-VariableFont_slnt,wght.ttf', weight: '200 1000', style: 'normal' }],
  variable: '--font-cairo',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

export const allFontVariables = [poppins.variable, cairo.variable].join(' ');
