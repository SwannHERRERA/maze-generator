module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    process.env.NODE_ENV === "production"
      ? require("@fullhuman/postcss-purgecss")({
          content: ["./public/index.html"],
          css: ["./assets/css/*.css"],
        })
      : "",
  ],
};
