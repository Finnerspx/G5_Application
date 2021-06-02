const { white } = require('tailwindcss/colors')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        yello: colors.yellow,
        'black-dark': '#333333',
        'orange-bright': '#DD9425',
        'sundance-blue': '#2EA3F2',
        'custom-gray': '#C4C4C4',
        white: colors.white,
      },
      boxShadow: {
        'custom-shadow': '5px 5px 5px rgba(0.8, 0.7, 0.6, 0.5)' 
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}