const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.html"],
  darkMode: "media",
  theme: {
    colors: {
      orange: colors.orange,
      lime: colors.lime,
      gray: colors.coolGray,
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
