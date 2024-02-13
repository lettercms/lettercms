const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, "src/pages/**/*.{js,ts,jsx,tsx}"),
    path.join(__dirname, "src/components/**/*.{js,ts,jsx,tsx}")
  ],
  theme: {
    fontFamily: {
      sans: ['Quicksand', 'sans-serif'],
      rubik: ['Rubik', 'sans-serif']
    },
    extend: {
      colors: {
        main: {
          100: '#a99efb',
          300: '#837bbf',
          500: '#5f4dee',
          700: '#362e6f',
          900: '#110c36'
        }
      }
    }
  },
  plugins: []
}
