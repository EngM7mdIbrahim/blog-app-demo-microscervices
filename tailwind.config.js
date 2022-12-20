module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
      extend: {
          colors: {
              'midnightBG': '#0f172a',
              'midnightFG': '#1e293b',
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
