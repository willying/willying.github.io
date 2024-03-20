# express

## express 介绍

express 是一个基于 nodejs 平台极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你创建各种 Web 应用。
简单来说，express 一个封装好的工具包，封装了很多功能，便于我们开发 web 应用(http 服务)

## 什么是路由

路由确定了运用程序如何响应客户端对特定端的请求

## 路由的使用

一个路由的组成有请求方法，路径，回调函数组成
express 中提供了一系列方法，可以很方便的注册路由，使用格式如下

app.\<method\>(path,handler)

代码示例:

```js
const express = require("express");
const app = express();
app.get("/home", (req, res) => res.end("Hello World!"));

app.post("/product", (req, res) => {
  res.json({
    code: 200,
    message: "success",
    data: [
      {
        id: 1,
        name: "手机",
        price: 1999,
      },
      {
        id: 2,
        name: "电脑",
        price: 1999,
      },
      {
        id: 3,
        name: "手表",
        price: 1999,
      },
      {
        id: 4,
        name: "电视机",
        price: 1999,
      },
    ],
  });
});

app.all("/test", function (req, res) {
  res.end("test");
});

app.all("*", function (req, res) {
  res.end("404 Not Found");
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
```

## 获取请求报文参数

```js
const express = require("express");
const app = express();
app.get("/home", (req, res) => {
  // 原生操作
  console.log("method", req.method);
  console.log("url", req.url);
  console.log("httpVersion", req.httpVersion);
  console.log("headers", req.headers);

  // express封装的操作
  console.log("pathname", req.path);
  console.log("query", req.query);
  console.log("ip地址", req.ip);
  console.log("express封装的获取请求头", req.get("host"));
  res.end("Hello World!");
});
app.listen(3000, () => console.log("Example app listening on port 3000!"));
```

### 获取动态路由参数

```js
const express = require("express");
const app = express();

// 动态路由
app.get("/:id.html", (req, res) => {
  // 获取路由参数
  console.log(req.params.id);
  res.setHeader("Content-Type", "text/html;charset=utf-8");
  res.end("商品详情");
});

app.listen(3000, function () {
  console.log("server is runing at http://localhost:3000");
});
```

## 一般响应设置

express 框架封装了一些 API 来方便给客户端响应数据，并且兼容原生的 HTTP 模块的获取方式

```js
const express = require("express");
const app = express();

app.get("/response", (req, res) => {
  // 原生响应
  // res.statusCode = 404
  // res.statusMessage = 'Not Found'
  // res.setHeader('will','ying')
  // res.write('hello willying')

  // express 设置响应
  // res.status(500);
  // res.set("aaa", "bbb");
  // res.send("中文响应不乱码");

  // 链式调用
  // res.status(500).set('aaaa','bbbb').send('中文不乱码')

  // express其它响应
  res.redirect("https://www.baidu.com"); // 重定向
  res.download("./package.json"); // 下载响应
  res.json(); // 响应json字符串
  res.sendFile(__dirname + "/home.html"); // 响应文件内容
});

app.listen(3000, function () {
  console.log("server is runing at http://localhost:3000");
});
```

## express 中间件

中间件本质是一个回调函数

中间件可以像路由回调一样访问请求对象 request,响应对象 response

### 中间件的作用

中间件的作用就是使用函数封装公共操作，简化代码

### 中间件的类型

- 全局中间件
- 路由中间件

### 定义全局中间件

每一个请求到达服务端后都会执行的全局中间件函数
