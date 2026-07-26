/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          primary: '#00e5ff',
          secondary: '#f5f5f7',
        },
        canvas: {
          DEFAULT: '#0a0a0a', // Muted charcoal
          surface: '#121212',
          border: '#1f1f1f',
          card: '#121212',
          hover: '#1f1f1f',
        },
        content: {
          primary: '#f5f5f7', // Subtle off-white
          secondary: '#a1a1a6', // Muted gray
          accent: '#00e5ff', // Neon sky blue
          neon: '#00e5ff',
          border: '#1f1f1f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'massive': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.05em' }],
        'giant': ['clamp(2rem, 5vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      spacing: {
        '128': '32rem',
        '160': '40rem',
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
}
