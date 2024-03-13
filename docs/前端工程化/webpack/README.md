# webpack

## 1. webpack 的安装

注意请自行安装 nodejs 最新版环境

- 全局安装 webpack

```javascript
npm i webpack webpack-cli -g
```

- 项目中安装 webpack

```javascript
npm i webpack webpack-cli -D
```

## 2. webpack 的基本使用

### 2.1 webpack-cli

npm 5.2 以上的版本提供了一个 npx 命令

npx 想要解决的主要问题，就是调用项目内部安装的模块，原理就是在 node_modules 下的.bin 目录找到对应的命令执行

使用 webpack 命令: npx webpack

webpack4 之后可以实现 0 配置打包构建，0 配置的特点就是限制比较多，无法自定义很多配置

开发中常用的还是使用 webpack 配置进行打包构建

### 2.2 webpack 配置

webpack 有四大核心概念:

- 入口(entry): 程序入口
- 输出(output): 打包后存放的位置
- loader: 用于对模块的源代码进行转换
- 插件(plugins): 插件可以用于执行范围更广的任务，插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等

1. 配置 webpack.config.js
2. 运行 npx webpack

```javascript
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
};
```

### 2.3 开发时自动编译工具

每次编译代码时，手动运行 npm run build 就会变得很麻烦。

webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码:

1. webpack watch mode
2. webpack-dev-server
3. webpack-dev-middleware

多数场景中，可能需要使用 webpack-dev-server,但是不妨探讨一下以上所有选项

#### 2.3.1. watch

在 webpack 指令后面加上--watch 参数即可

主要的作用就是监视本地项目文件的变化，发现有修改的代码会自动编译打包，生成输出文件

1. 配置 package.json 的 script "watch": "webpack --watch"
2. 运行 npm run watch

以上是 cli 的方式设置 watch 参数

还可以通过配置文件对 watch 的参数进行修改

```javascript
const path = require("path");
module.exports = {
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./dist"),
  },
};
```

#### 2.3.2. webpack-dev-server(推荐)

1. 安装 devServer:

devServer 需要依赖 webpack,必须在项目依赖中安装 webpack

npm i webpack webpack-dev-server -D

2. 在 index.html 文件中修改 script 的 src 属性
3. 运行: npx webpack-dev-server
4. 运行: npx webpack-dev-server --hot --open --port 8090
5. 配置 package.json 的 scripts: "dev": "webpack-dev-server --hot --open --port 8090 --static --compress ./"
   > --compress 开启 GZIP 压缩
   > --static 开启静态文件服务
   > --hot 开启 HMR 热模块更新
   > --open 自动打开浏览器
6. 运行 npm run dev

devServer 会在内存中生成一个打包好的 bundle.js 文件，专供开发的时候使用，打包效率更高，修改代码后会自动重新打包

以及刷新浏览器，用户体验非常好

以上是 cli 的方式设置 devServer 的参数

还可以通过配置文件对 devServer 的参数进行修改:

```javascript
module.exports = {
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./dist"),
  },
};
```

#### 2.3.3. html 插件

1. 安装 html-webpack-plugin 插件 npm i html-webpack-plugin -D
2. 在 webpack.config.js 中的 plugins 节点下配置

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
plugins: [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "./src/index.html",
  }),
];
```

#### 2.3.4. webpack-dev-middleware

webpack-dev-middleware 是一个容器 Wrapper，可以把 webpack 处理后的文件传递给一个服务器，Server，webpack-dev-server

在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求

1. 安装 express 和 webpack-dev-middleware：
   npm i express webpack-dev-middleware -D

2. 新建 server.js

```javascript
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("./webpack.config.js");
const app = express();
const compiler = webpack(config);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: "/",
  })
);
app.listen(3000, () => {
  console.log("http://localhost:3000/");
});
```

3. 配置 package.json 中的 scripts"server": "node server.js"

4. 运行 npm run server

注意： 如果要使用 webpack-dev-middleware 必须使用 html-webpack-plugin 插件

#### 2.3.5. 小结

只有在开发时才会使用自动编译工具，如 webpack-dev-server

项目上线都会直接使用 webpack 打包构建，不会要使用这些自动构建工具

自动编译工具只是为了提高开发体验

### 2.4. 处理 css

```javascript
// 配置用来解析.css文件的loader(style-loader和css-loader)
module.exports = {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"], // webpack底层调用这些包的顺序是从右往左
    },
  ],
};
```

解释:

- style-loader 将模块导出的内容作为样式并添加到 DOM 中
- css-loader 加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代码

### 2.5. 处理 less 和 sass

```javascript
  npm i less less-loader sass-loader node-sass -D

  npm install sass-loader sass  --save-dev
```

解释:

1. node-sass

   - node-sass 是一个 Node.js 模块，它是 Node.js 绑定的 LibSass，LibSass 是一个用 C/C++ 编写的 Sass 编译器。
   - node-sass 在后续版本中已经被弃用，建议使用 sass 替代。
   - 由于 node-sass 是对 LibSass 的绑定，因此它的性能通常比 sass 差一些。

2. sass

   - sass 是 Dart 编写的原生 Sass 编译器，它是官方推荐的 Sass 编译器
   - sass 具有更快的编译速度和更好的维护支持
   - 与 node-sass 相比，sass 提供了更好的功能和更好的性能
   - 由于 node-sass 已经被官方弃用，推荐使用 sass 作为 Sass 编译器。因此，您在安装依赖时可以使用 sass 替代 node-sass

```javascript
 {
    test: /\.less$/,
    use: ["style-loader", "css-loader",'less-loader'], // webpack底层调用这些包的顺序是从右往左
  }
```

```javascript
 {
    test: /\.less$/,
    use: ["style-loader", "css-loader",'sass-loader'], // webpack底层调用这些包的顺序是从右往左
  }
```

### 2.6. 处理图片和字体文件

```javascript
npm i file-loader url-loader -D
```

url-loader 封装了 file-loader，但是如果想要使用 url-loader，必须安装 file-loader

```javascript
module: {
  rules: [
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 8 * 1024, // 小于8kb的图片会被base64处理
            outputPath: "images", // 图片打包后的文件夹
            name: "[name][hash:6].[ext]", // 打包后的图片命名
          },
        },
      ],
    },
  ];
}
```

解释：
在 webpack5 中，使用资源模块处理文件类型,webpack5 默认会对资源文件进行处理

```javascript
{
  test: /\.(png|jpe?g|gif|svg)$/i,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 8 * 1024 // 将小于 8KB 的文件转换为 base64
    }
  }
}
```

### 2.7. babel

```javascript
npm i babel-loader @babel/core @babel/preset-env -D
```

如果需要支持更高级别的 ES6 语法，可以继续安装插件:

```javascript
npm i @babel/plugin-transform-runtime @babel/runtime -D
```
```javascript
{
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-runtime']
      }
    }
}
```