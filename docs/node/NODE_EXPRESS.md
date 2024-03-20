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
app.get("/home", function (req, res) {
  res.end("hello world");
});
app.listen(3000, function () {
  console.log("服务启动成功");
});
```
