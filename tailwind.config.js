/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    transitionDuration: {
      DEFAULT: '200ms',
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        btn: {
          background: 'hsl(var(--btn-background))',
          'background-hover': 'hsl(var(--btn-background-hover))',
        },
        black: '#000000',
        grayDark3: '#1C1D1E',
        grayDark2: '#2E3133',
        grayDark15: '#4B5054',
        grayDark1: '#7A8184',
        grayBase: '#B6BEC1',
        grayLight1: '#E1E8EA',
        grayLight2: '#EFF4F4',
        white: '#FFFFFF',
        attention: '#3349D8',
        attentionBackground: '#E6EFF4',
        success: '#2C8C1C',
        successBackground: '#E7FAD4',
        coution: '#B75F00',
        coutionBackground: '#FFF2CC',
        critical: '#DB2C36',
        criticalBackground: '#FFE6D8',
      },
    },
    fontSize: {
      body: [
        '12px',
        {
          fontWeight: 400,
          lineHeight: '16px',
        },
      ],
      body2: [
        '14px',
        {
          fontWeight: 400,
          lineHeight: '20px',
        },
      ],
      bodyStrong: [
        '14px',
        {
          fontWeight: 600,
          lineHeight: '20px',
        },
      ],
      bodyLarge: [
        '16px',
        {
          fontWeight: 400,
          lineHeight: '24px',
        },
      ],
      bodyLarge2: [
        '16px',
        {
          fontWeight: 600,
          lineHeight: '24px',
        },
      ],
      subtitle: [
        '20px',
        {
          fontWeight: 600,
          lineHeight: '28px',
        },
      ],
      title: [
        '24px',
        {
          fontWeight: 600,
          lineHeight: '36px',
        },
      ],
      titleLarge: [
        '40px',
        {
          fontWeight: 600,
          lineHeight: '52px',
        },
      ],
      titleLarge2: [
        '48px',
        {
          fontWeight: 600,
          lineHeight: '92px',
        },
      ],
    },
    screens: {
      sm: { max: '719px' },
      md: { min: '720px', max: '1279px' },
      lg: { min: '1280px' },
    },
  },
  plugins: [],
};
