/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: '#F8DDE8',
        lavender: '#E9DDFB',
        cream: '#FFF8F0',
        rose: '#EFA9C5',
        gold: '#D8B56D',
        'gold-light': '#FCE7B2',
        plum: '#57364F',
        'plum-dark': '#2B1425',
        'deep-night': '#170b1e',
      },
      fontFamily: {
        script: ['"Dancing Script"', 'cursive'],
        sans: ['"Quicksand"', 'system-ui', 'sans-serif'],
        handwritten: ['"Caveat"', '"Dancing Script"', 'cursive'],
        royal: ['"Cinzel Decorative"', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-fast': 'float 2.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s infinite',
        'spin-slow': 'spin 18s linear infinite',
        'sparkle': 'sparkle 1.8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
