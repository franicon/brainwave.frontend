/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          300: '#A78BFA',
          400: '#8B5CF6',
          500: '#7C3AED',
          600: '#6D28D9',
          900: '#1E1B4B',
        },
        navy: {
          600: '#1F2937',
          700: '#111827',
          800: '#0F172A',
          900: '#030712',
        },
        gray: {
          50: '#F9FAFB',
          900: '#111827',
        },
        blue: {
          400: '#60A5FA',
        },
        indigo: {
          500: '#6366F1',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.75rem',
      },
      ringOpacity: {
        50: '0.5',
      },
    },
  },
  plugins: [],
}