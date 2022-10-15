const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const minify = require("optimize-css-assets-webpack-plugin");

let mode = "developmant";
if (process.env.NODE_ENV === "production") {
  mode = "production";
}

let plugins = [
  new HtmlWebpackPlugin({ template: "./src/index.html" }),
  new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
];

module.exports = {
  mode,
  plugins,
  entry: "./src/app.js",
  output: {
    assetModuleFilename: "assets/[hash][ext][query]",
    filename: "[name].[contenthash].js",
    clean: true,
  },
  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimizer: [new minify({})],
  },
  module: {
    rules: [
      { test: /\.(html)$/, use: ["html-loader"] },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          mode === "developmant" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: "asset/resource",
        // изображения размером до 8кб будут инлайнится в код
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // не обрабатываем файлы из node_modules
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // Использование кэша для избежания рекомпиляции
            presets: ["@babel/preset-env"], // позволяет более точно настроить babel-loader
            // при каждом запуске
          },
        },
      },
    ],
  },
};

// const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const minify = require("optimize-css-assets-webpack-plugin");

// const plugins = [
//   new HtmlWebpackPlugin({
//     template: "./src/index.html", // Данный html будет использован как шаблон
//   }),
//   new MiniCssExtractPlugin({
//     filename: "style.css", // Формат имени файла
//   }),
// ];

// module.exports = {
//   mode: "development",
//   entry: "./src/app.js",
//   // devtool: "source-map",
//   plugins,
//   output: {
//     path: path.resolve(__dirname, "build"),
//     assetModuleFilename: "assets/[hash][ext][query]",
//     filename: "bundle.js",
//     clean: true,
//   },
//   module: {
//     rules: [
//       { test: /\.(html)$/, use: ["html-loader"] },
//       {
//         test: /\.(s[ac]|c)ss$/i,
//         use: [
//           MiniCssExtractPlugin.loader,
//           "css-loader",
//           "postcss-loader",
//           "sass-loader",
//         ],
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
//         type: "asset/resource",
//         // изображения размером до 8кб будут инлайнится в код
//       },
//       {
//         test: /\.(woff2?|eot|ttf|otf)$/i,
//         type: "asset/resource",
//       },
//       {
//         test: /\.js$/,
//         exclude: /node_modules/, // не обрабатываем файлы из node_modules
//         use: {
//           loader: "babel-loader",
//           options: {
//             cacheDirectory: true, // Использование кэша для избежания рекомпиляции
//             // при каждом запуске
//           },
//         },
//       },
//     ],
//   },
//   optimization: {
//     minimizer: [new minify({})],
//   },
// };
