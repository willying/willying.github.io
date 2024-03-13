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
    filename: 'bundle.js',
    assetModuleFilename: '[path][name][hash:4][ext][query]' // [path] 表示资源的目录
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
        test: /\.s[ac]ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 将小于 80KB 的文件转换为 base64
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/, // 排除node_modules
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-runtime']
            ]
          },
        }
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