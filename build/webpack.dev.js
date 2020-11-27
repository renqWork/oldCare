const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
// const devIp="http://172.20.10.66:80/" // 生产服务器
const devIp = "http://172.20.10.71:80/"; // 测试服务器
// const devIp = "http://192.168.1.108:80/"; //戴梦璇电脑

module.exports = merge(common, {
  // 动态监测并实时更新页面
  devServer: {
    // contentBase: resolve("../dist"),
    useLocalIp: true,
    port: 5555,
    hot: true,
    stats: "errors-only",
    compress: true,
    proxy: {
      "/sky": {
        target: devIp,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
      },
      "/tea": {
        target: devIp,
        changeOrigin: true,
        ws: true,
      },
      "/dolphin-web": {
        target: devIp,
        changeOrigin: true,
        ws: true,
      },
      "/rose": {
        target: devIp,
        changeOrigin: true,
        ws: true,
      },
      "/white": {
        target: devIp,
        changeOrigin: true,
        ws: true,
      },
      "/moon": {
        target: devIp,
        changeOrigin: true,
        ws: true,
      },
      "/ice": {
        target: devIp,
        changeOrigin: true,
        ws: true,
      },
      "/zimg-web": {
        target: "http://172.20.74.155:80/", // 图片服务器
        changeOrigin: true,
        ws: true,
      },
    },
  },
  devtool: "inline-source-map",
  output: {
    publicPath: "/",
  },
});
