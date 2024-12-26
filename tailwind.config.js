/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F3F9',
          100: '#CCE7F3',
          200: '#99CFE7',
          300: '#66B7DB',
          400: '#339FCF',
          500: '#0074A9', // Main brand color
          600: '#005D87',
          700: '#004665',
          800: '#002F44',
          900: '#001722',
        },
        // Deep blue colors for dark mode
        deep: {
          50: '#E6F3F9',
          100: '#CCE7F3',
          200: '#99CFE7',
          300: '#66B7DB',
          400: '#339FCF',
          500: '#0074A9',
          600: '#005D87',
          700: '#004665',
          800: '#002F44',
          900: '#001722',
        },
        // Pastel blue colors for light mode
        pastel: {
          50: '#F0F7FA',
          100: '#E1EFF5',
          200: '#C3DFEB',
          300: '#A5CFE1',
          400: '#87BFD7',
          500: '#0074A9',
          600: '#005D87',
          700: '#004665',
          800: '#002F44',
          900: '#001722',
        },
      },
    },
  },
  plugins: [],
};