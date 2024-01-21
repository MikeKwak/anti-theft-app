/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDelay: {
        '-100': '-100ms',
        '-200': '-200ms',
        '-300': '-300ms',
        '-400': '-400ms',
        '-800': '-800ms',
        // Add other negative delay values as needed
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

