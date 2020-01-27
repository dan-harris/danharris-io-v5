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

  // markdown parser
  const markdownIt = require("markdown-it");
  const markdownItPrism = require("markdown-it-prism");
  const options = {
    html: true
  };
  let markdownLib = markdownIt(options).use(markdownItPrism);
  eleventyConfig.setLibrary("md", markdownLib);

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
