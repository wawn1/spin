const path = require("path");
const nodeExternals = require("webpack-node-externals");
const merge = require("webpack-merge");
const config = require("./webpack.base.js");

const serverConfig = {
  target: "node",
  entry: "./src/server/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  externals: [nodeExternals()],

  mode: "development",
};
module.exports = merge(config, serverConfig);
