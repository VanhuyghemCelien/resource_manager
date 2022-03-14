const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './app/**/*.{hbs,js,ts,html}',
    './tests/**/*.{hbs,js,ts,html}',
    './node_modules/@triptyk/tpk-ember-input/addon/**/*.{hbs,ts}',
  ],
  corePlugins: {},
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway'],
      },
      screens: {
        lxg: '1140px',
        '2xl': '1600px',
        '3xl': '1680px',
      },
    },
    colors: {
      primary: '#34404A',
      secondary: '#66727C',
      navbarBg: '#3787C0',
      navbarSelected: '#F2F2F2',
      text: '#647377',
      'text-secondary': '#384043',
      error: '#D72F33',
      warn: '#ED6A6A',
      white: colors.white,
      black: colors.black,
    },
  },
};
