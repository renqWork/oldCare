const { merge } = require("webpack-merge");
const common = require("./webpack.common");

// const path = require("path");

// function resolve(dir) {
//   return path.join(__dirname, dir);
// }
// const devIp="http://172.20.10.66:80/" // 生产服务器
const devIp = "http://172.20.10.71:80/"; // 测试服务器
// const devIp = "http://192.168.1.108:80/"; //戴梦璇电脑

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: "./",
    useLocalIp: true,
    open: true, // 自动打开浏览器
    openPage: "Home.html",
    index: "Home.html",
    // can be overwritten by process.env.HOST
    host: "0.0.0.0",
    port: 5566,
    hot: true,
    stats: "errors-only",
    compress: true,
    overlay: true,
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
