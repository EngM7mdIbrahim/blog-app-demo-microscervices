module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        midnightDark: "#0f172a",
        midnightLight: "#1e293b",
        lightblue: "#34aee6",
      },
    },
    screen: {
      xs: "280px",
    },
    animation:{
        'fadeIn': 'fadeIn 200ms linear forwards',
        'fadeOut': 'fadeOut 200ms linear forwards'
    },
    keyframes: {
      fadeIn: {
        "0%": {transform: 'translateX(0px)'},
        "1%": { opacity: 0},
        "100%": { opacity: 1},
      },
      fadeOut: {
        "0%": { opacity: 1, transform: 'translateX(0px)'},
        "99%": { opacity: 0, transform: 'translateX(0px)'},
        "100%": {transform: 'translateX(1000000px)'}
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
