const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
  // liquid
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true
    // strict_filters: true
  });

  // css minifier
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
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
