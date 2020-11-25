const path = require("path");
const webpack = require("webpack");
const glob = require("glob");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const entryFiles = glob.sync(path.join(__dirname, "../src/views/*/index.js"));
const entry = {}; //入口对象
const htmlWebpackPlugins = []; //html-webpack-plugin设置集合

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
    })
  );
});

module.exports = {
  context: path.join(__dirname, "../"),
  // 入口js路径
  entry,
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new CleanWebpackPlugin(), // 自动清空dist目录
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ].concat(htmlWebpackPlugins),
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /jquery/,
          name: "jquery",
          chunks: "all",
        },
        styles: {
          test: /[\\/]common[\\/].+\.css$/,
          name: "style",
          chunks: "all",
          enforce: true,
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
        test: /\.(png|svg|jpg|gif|webp)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // 最终生成的css代码中,图片url前缀
              publicPath: "../images",
              // 图片输出的实际路径(相对于dist)
              outputPath: "images",
              // 当小于某KB时转为base64
              limit: 0,
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
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            // 保留原文件名和后缀名
            name: "[name].[ext]",
            // 输出到dist/fonts/目录
            outputPath: "fonts",
          },
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
    // js生成到dist/js，[name]表示保留原js文件名
    filename: "js/[name].[contenthash].bundle.js",
    // 输出路径为dist
    path: path.resolve(__dirname, "../dist"),
  },
};
