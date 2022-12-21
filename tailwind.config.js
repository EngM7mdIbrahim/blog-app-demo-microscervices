module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
      extend: {
          colors: {
              'midnightDark': '#0f172a',
              'midnightLight': '#1e293b',
              'lightblue': '#34aee6',
          }
      },
      screen:{
          'xs': '280px'
      }
  },
  variants: {
      extend: {},
  },
  plugins: [
  ],
};
