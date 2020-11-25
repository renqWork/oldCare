module.exports = {
  // 动态监测并实时更新页面
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 5555,
    // 热更新，无需刷新
    hot: true,
  },
  devtool: "source-map",
  // 编译输出配置
  output: {
    // js生成到dist/js，[name]表示保留原js文件名
    filename: "js/[name].bundle.js",
    // 输出路径为dist
    path: path.resolve(__dirname, "../dist"),
  },
};
