const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const devMode = process.env.NODE_ENV !== "production";
const devMode = false;
module.exports = {
  mode: 'development',
  entry: path.join(__dirname,'./src/index.js'),
  // watch: true,  开启监视模式，webpack监视文件的变化自动打包
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    // static: './src', // 指定路径
    port: 3000,
    hot: true, // 是否开启热更替
    compress: true, // 压缩是否启用
    // open: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
  ].concat(devMode ? [] : [new MiniCssExtractPlugin()])
}