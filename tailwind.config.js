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
          DEFAULT: '#080B10',
          light: '#0A0D14',
        },
        accent: {
          primary: '#00D4FF',
          secondary: '#7C3AED',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
