const path = require("path");
const webpack = require("webpack");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");
const ESLintPlugin = require("eslint-webpack-plugin");

const entryFiles = glob.sync(path.join(__dirname, "../src/views/*/index.js"));
const entry = {}; //入口对象
const htmlWebpackPlugins = []; //html-webpack-plugin设置集合

// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || "/";

Object.keys(entryFiles).map((index) => {
  const entryFil = entryFiles[index];
  //获取文件夹名称
  const match = entryFil.match(/src\/views\/(.*)\/index\.js/);
  const pathname = match && match[1];
  //设置入口对象
  entry[pathname] = entryFil;
  //设置html-webpack-plugin设置
  htmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      //https://github.com/jantimon/html-webpack-plugin#options
      filename: `${pathname}.html`,
      template: path.join(__dirname, `../src/views/${pathname}/index.html`),
      chunks: [pathname],
      inject: "body",
    })
  );
});

module.exports = {
  context: path.join(__dirname, "../"),
  // 入口js路径
  entry,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      api: path.resolve(__dirname, "../src/api"),
      images: path.resolve(__dirname, "../src/images"),
      components: path.resolve(__dirname, "../src/components"),
      utils: path.resolve(__dirname, "../src/utils"),
      icons: path.resolve(__dirname, "../src/icons"),
      styles: path.resolve(__dirname, "../src/styles"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new ESLintPlugin({
      emitError: true,
    }),
  ].concat(htmlWebpackPlugins),
  optimization: {
    // minimize: false,
    splitChunks: {
      cacheGroups: {
        vendor: {
          //"vendor" key  chunk 的入口名称 路径
          name: "vendor",
          // name(module, chunks, cacheGroupKey) {
          //   const moduleFileName = module
          //     .identifier()
          //     .split("\\")
          //     .reduceRight((item) => item);
          //   const allChunksNames = chunks.map((item) => item.name).join("~");
          //   return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          // },
          test: /[\\/]node_modules[\\/]/, //在node_modules范围内进行匹配
          priority: 10, //优先级，先抽离公共的第三方库，再抽离业务代码，值越大优先级越高
          chunks: "all",
        },
        commons: {
          name: "commons", //分离出的公共模块的名字，如果没写就默认是上一层的名字
          chunks: "all", //在哪些js范围内寻找公共模块，可以是src下的文件里，也可以是node_modules中的js文件
          minChunks: 2, //当前公共模块出现的最少次数，
          // enforce:true,
          priority: 1, //优先级 默认 -20
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              generator: (content) => svgToMiniDataURI(content.toString()),
            },
          },
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attributes: true,
            minimize: true,
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "font/[hash][ext][query]",
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  // 编译输出配置
  output: {
    publicPath: ASSET_PATH,
    // js生成到dist/js，[name]表示保留原js文件名
    filename: "js/[name].[contenthash].bundle.js",
    chunkFilename: "js/[name].[contenthash].js",
    // 输出路径为dist
    path: path.resolve(__dirname, "../dist"),
  },
};
