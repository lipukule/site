const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'media',
  content: [
    "./themes/**/layouts/**/*.html",
    "./content/**/layouts/**/*.html",
    "./layouts/**/*.html",
    "./content/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f9f4ed',
        'cream-red': '#ffeff5',
        'cream-orange': '#ffeacb',
        'dark-cream': '#2a2a2a',
        'dark-cream-red': '#352724',
        'dark-cream-orange': '#30291f',
        'lojunu': '#ffa4c5',
        'loje': '#ffa893',
        'lojelo': '#ffb777',
        'jelo': '#cac976',
        'graso': '#8ed890',
        'laso': '#66dfc2',
        'blaso': '#5bddfd',
        'lasewi': '#76d0ff',
        'lasunu': '#b3beff',
        'unu': '#fbadff',
      },
      fontFamily: {
        'sans': [...defaultTheme.fontFamily.sans, "sitelenselikiwenjuniko"],
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ]
}