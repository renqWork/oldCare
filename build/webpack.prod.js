const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin(), // 自动清空dist目录
  ],
});
