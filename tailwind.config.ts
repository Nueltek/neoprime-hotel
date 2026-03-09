import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary backgrounds - Deep luxury black/navy tones
        luxury: {
          black: '#0A0B10',
          dark: '#111318',
          navy: '#16181E',
        },
        // Gold accent palette
        gold: {
          DEFAULT: '#C6A56A',
          light: '#D4AF72',
          dark: '#B8975A',
        },
        // Text colors
        text: {
          primary: '#FFFFFF',
          secondary: '#D0D0D0',
          muted: '#9C9C9C',
        },
      },
      fontFamily: {
        // Body font - Newsreader (elegant serif)
        serif: ['Newsreader', 'Georgia', 'serif'],
        // Heading font - GT America style (modern sans-serif)
        sans: ['GT America', 'system-ui', 'sans-serif'],
        display: ['GT America', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Type scale as per spec
        'hero': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.1', letterSpacing: '0.02em' }],
        'section': ['clamp(2.5rem, 5vw, 3rem)', { lineHeight: '1.2', letterSpacing: '0.03em' }],
        'card-title': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '0.05em' }],
        'body': ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.7' }],
        'small': ['clamp(0.75rem, 1vw, 0.875rem)', { lineHeight: '1.5', letterSpacing: '0.1em' }],
      },
      spacing: {
        // Section spacing
        'section-desktop': '8rem',
        'section-mobile': '4rem',
      },
      maxWidth: {
        'content': '1280px',
      },
      letterSpacing: {
        'widest': '0.2em',
        'wide': '0.1em',
      },
      transitionDuration: {
        '400': '400ms',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
