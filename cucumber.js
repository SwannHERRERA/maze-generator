let common = [
  "src/features/**/*.feature", // Specify our feature files
  "--require-module ts-node/register", // Load TypeScript module
  // "--require dist/step-definitions/**/*.js", // Load step in js definitions
  "--require src/step-definitions/**/*.ts", // Load step definitions
  "--format progress-bar", // Load custom formatter
].join(" ");

module.exports = {
  default: common,
};
