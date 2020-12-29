const PurgeCSS = require("purgecss");

const purge = await new PurgeCSS().purge({
  content: ["./public/index.html"],
  css: ["./assets/css/*.css"],

  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

const plugins = {
  tailwindcss: {},
  autoprefixer: {},
  purgecss: process.env.NODE_ENV === "production" ? purge : "",
};
console.log(plugins);

module.exports = {
  plugins,
};
