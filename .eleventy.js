const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
  // css minifier
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // date prettier
  eleventyConfig.addFilter("date", function(date) {
    const parsedDate = new Date(date);
    return parsedDate.toDateString();
  });

  // config object
  return {
    dir: {
      input: "./src",
      output: "./dist",
      includes: "./_includes",
      layouts: "./_layouts"
    }
  };
};
