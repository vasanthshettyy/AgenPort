/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'pricing-card-hover',
    'pricing-card-hover-std',
    'faq-grid-accordion',
    'is-open',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          primary: '#00e5ff',
          secondary: '#f5f5f7',
        },
        canvas: {
          DEFAULT: '#0a0a0a',
          surface: '#121212',
          border: '#1f1f1f',
          card: '#121212',
          hover: '#1f1f1f',
        },
        content: {
          primary: '#f5f5f7',
          secondary: '#a1a1a6',
          accent: '#00e5ff',
          neon: '#00e5ff',
          border: '#1f1f1f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'massive': ['clamp(2rem, 8vw, 6rem)', { lineHeight: '0.9', letterSpacing: '-0.05em' }],
        'giant': ['clamp(1.5rem, 4vw, 3.5rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'mobile-h1': ['clamp(1.75rem, 5vw, 2.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'mobile-h2': ['clamp(1.5rem, 4vw, 2.25rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'mobile-h3': ['clamp(1.25rem, 3vw, 1.75rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '128': '32rem',
        '160': '40rem',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      scale: {
        '102': '1.02',
      },
      screens: {
        'xs': '360px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      minHeight: {
        'screen-100': '100dvh',
        'screen-90': '90dvh',
        'screen-80': '80dvh',
      },
    },
  },
  plugins: [],
}
