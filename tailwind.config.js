/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#0a0a0a', // Muted charcoal
          surface: '#121212',
          border: '#1f1f1f',
        },
        content: {
          primary: '#f5f5f7', // Subtle off-white
          secondary: '#a1a1a6', // Muted gray
          accent: '#d4af37', // Muted bronze
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'massive': ['clamp(4rem, 15vw, 12rem)', { lineHeight: '0.9', letterSpacing: '-0.05em' }],
        'giant': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      spacing: {
        '128': '32rem',
        '160': '40rem',
      }
    },
  },
  plugins: [],
}
