var path = require("path");
var webpack = require("webpack");

module.exports = {
  devtool: "eval",
  entry: ["webpack-dev-server/client?http://localhost:3000", "./src/index.jsx"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ["babel-loader"],
        include: path.join(__dirname, "src")
      }
    ]
  }
};