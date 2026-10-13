/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08080a',
          900: '#0e0e12',
          850: '#131318',
          800: '#1a1a21',
          700: '#24242d',
          600: '#33333e',
          500: '#4a4a57',
          400: '#6b6b7a',
          300: '#9a9aae',
          200: '#c4c4d2',
          100: '#e4e4ea',
        },
        crimson: {
          50: '#fef2f4',
          100: '#fde6ea',
          200: '#fcd0d8',
          300: '#faa8b8',
          400: '#f47189',
          500: '#e63e5e',
          600: '#dc143c',
          700: '#c10f33',
          800: '#9f0e2c',
          900: '#841229',
          950: '#4a0613',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
