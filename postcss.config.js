const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./public/index.html"],
  css: ["./assets/css/*.css"],

  // Include any special characters you're using in this regular expression

  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    purgecss: process.env.NODE_ENV === "production" ? purgecss : "",
  },
};
