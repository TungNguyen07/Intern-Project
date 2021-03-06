const withCSS = require("@zeit/next-css");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  },
  webpack: config => {
    config.node = {
      fs: "empty"
    };

    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, "./.env"),
        systemvars: true
      })
    ];

    return config;
  }
});
