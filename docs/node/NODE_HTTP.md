# HTTP 协议(Hypertext Transfer Protocol)

## http 报文内容

![http请求报文](/http.png)
![http请求行](/请求行.png)

### 请求方法

| 方法      | 作用             |
| --------- | ---------------- |
| GET       | 主要用于获取数据 |
| POST      | 主要用于提交数据 |
| PUT/PATCH | 主要用于更新数据 |
| DELETE    | 主要用于删除数据 |

### URL 统一资源定位符

```js
// https(协议)://www.baidu.com(主机名)/(路径)
// https[协议]://(search.jd.com)[主机名（域名|IP地址）]:443[端口号]/（search）[路径]?（keyword=oneplus&psort=3）[查询字符串]
```

### http 版本号

| 版本号 | 发布时间 |
| ------ | -------- |
| 1.0    | 1996 年  |
| 1.1    | 1999 年  |
| 2      | 2015 年  |
| 3      | 2018 年  |

### http 响应报文

![http响应报文](/http响应报文.png)

### http 响应头

![http响应头](/http响应头.png)

### 响应状态吗

| 状态码 | 含义                                                 | 描述                  |
| ------ | ---------------------------------------------------- | --------------------- |
| 200    | 请求成功                                             | OK                    |
| 403    | 禁止请求，权限不足                                   | Forbidden             |
| 401    | 没有提供有效的身份验证信息或者未提供任何身份验证信息 | Unauthorized          |
| 404    | 找不到资源                                           | Not Found             |
| 500    | 服务器内部错误                                       | Internal Server Error |

## IP

IP 也成为 IP 地址，本身是一个数字标识

例如 192.168.1.3

IP 本质是一个 32Bit 的二进制数字，每 8 个 Bit 一组，把每一组转换为 10 进制数字，再合在一起用点分开

### IP 地址作用

用来标识网络中的设备，实现设备之间的通信

### IP 的分类

| 类型               | 说明                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------- |
| 本地回环 IP 地址   | 127.0.0.1 ～ 127.255.255.254                                                           |
| 局域网 IP          | 192.168.0.0 ~ 192.168.255.255 , 172.16.0.0 ~ 172.31.255.255, 10.0.0.0 ~ 10.255.255.255 |
| 广域网 IP(公网 IP) | 除去上述之外                                                                           |

## 端口

在计算机网络中，端口是用于标识特定进程或服务的逻辑通道。每个网络通信端点都有一个端口号，它可以是一个数字，范围从 0 到 65535，一个运用程序可以使用一个或多个端口

端口是运用程序的数字表示，主要作用是实现了不同主机运用程序之间的通信

## Nodejs 创建 http 服务

```js
const http = require("http");
const server = http.createServer((req, res) => {
  res.end("hello world");
});
server.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
```

### http 服务注意事项

1. 端口号不能使用 1024 以下的端口号，因为 1024 以下的端口号是系统保留的
2. 端口号如果被占用，可以尝试更换端口号
3. 如果 response.end('你好')是中文，需要设置 response 的编码格式，否则浏览器会显示乱码
4. http 协议的默认端口是 80，http 开发常用端口有 3000，8080，9000 等
5. https 默认端口是 443
6. MongoDB 的默认端口是 27017

## 提取 http 请求报文内容

想要获取请求的数据，需要使用 request 对象

| 含义           | 语法                                                                  | 重点掌握 |
| -------------- | --------------------------------------------------------------------- | -------- |
| 请求方法       | request.method                                                        | \*       |
| 请求版本       | request.httpVersion                                                   |          |
| 请求路径       | request.url (只包含路径和查询字符串)                                  | \*       |
| URL 路径       | require('url').parse(request.url).pathname                            | \*       |
| URL 查询字符串 | require('url').parse(request.url,true).query                          | \*       |
| 请求头         | request.headers                                                       | \*       |
| 请求体         | request.on('data', function(chunk) {}) request.on('end',function(){}) |          |

### 注意事项

1. request.url 只能获取路径以及查询字符串，无法获取 url 中的域名以及协议的内容
2. request.headers 将请求转换成一个对象，并将属性名都转换成了小写
3. 关于路径，如果访问网站的时候，只填写了 IP 地址或则域名信息，此时的请求路径是/
4. 关于 favicon.ico，这个请求属于浏览器自动发送的

```js
const http = require("http");
const server = http.createServer((req, res) => {
  let body = "";
  // 获取请求方法
  console.log("method", req.method);
  // 获取请求url
  console.log("url", req.url);
  // 获取请求头
  console.log("header", req.headers);
  // 获取URL路径
  console.log("url路径", require("url").parse(req.url).pathname);
  // 获取查询字符串参数
  console.log("query", require("url").parse(req.url, true).query);
  // 获取请求版本
  console.log("httpVersion", req.httpVersion);

  req.on("data", (data) => {
    body += data;
  });
  req.on("end", function () {
    console.log("body", body.toString());
    console.log("请求体获取完毕");
  });
  res.setHeader("Content-Type", "text/plan;charset=utf-8");
  res.end("你好，世界");
});

server.listen(9000, function () {
  console.log("服务器启动成功...");
});
```

> 在 JavaScript 中，有两个与 URL 相关的构造函数：URL 构造函数和 URLSearchParams 构造函数。这两个构造函数用于处理 URL 和 URL 查询参数。

1. URL 构造函数：

   - URL 构造函数用于解析和操作 URL。
   - 通过 new URL() 创建一个 URL 对象，可以传入一个完整的 URL 或相对 URL 和基础 URL
   - URL 对象提供了属性和方法来访问和修改 URL 的各个部分，如协议、主机、路径、查询参数等。
   - 示例:

   ```js
   const myURL = new URL("https://www.example.com/path?query=123");
   console.log(myURL.host); // 输出：www.example.com
   console.log(myURL.searchParams.get("query")); // 输出：123
   ```

2. URLSearchParams 构造函数：

   - URLSearchParams 构造函数用于处理 URL 查询参数。
   - 可以通过 new URLSearchParams() 创建一个 URLSearchParams 对象，用于解析和操作 URL 查询参数
   - URLSearchParams 对象提供了方法来添加、获取、设置和删除查询参数
   - 示例:

   ```js
   // 创建一个新的 URLSearchParams 对象
   const params = new URLSearchParams();

   // 添加查询参数
   params.append("key1", "value1");
   params.append("key2", "value2");

   // 获取查询参数
   console.log(params.get("key1")); // 输出：value1

   // 设置查询参数
   params.set("key1", "newvalue1");
   console.log(params.get("key1")); // 输出：newvalue1

   // 删除查询参数
   params.delete("key2");
   console.log(params.has("key2")); // 输出：false

   // 迭代所有查询参数
   params.forEach((value, key) => {
     console.log(`${key}: ${value}`);
   });

   // 将 URLSearchParams 对象转换为查询字符串
   console.log(params.toString());
   ```

### http 请求练习，根据 pathname 不同返回不同内容

```js
const http = require("http");
const server = http.createServer((req, res) => {
  const url = new URL(`http://${req.headers.host}${req.url}`);
  const method = req.method;
  const pathname = url.pathname;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  if (pathname === "/login" && method === "GET") {
    res.end("登录页面");
  } else if (pathname === "/reg" && method === "GET") {
    res.end("注册页面");
  } else {
    res.writeHead(302, { Location: `http://${req.headers.host}/login` });
    res.end();
  }
});
server.listen(9000, function () {
  console.log("服务启动成功...");
});
```

## 设置 HTTP 响应报文

- 设置响应状态码

  - .writeHead(statusCode[, statusMessage][, headers]) 方法

    ```js
    const http = require("http");
    http
      .createServer((req, res) => {
        // 明确设置状态码和状态消息
        res.writeHead(404, 'Resource Not Found', {'Content-Type': 'text/plain'});
        res.end('The requested resource was not found on this server.');
      })
      .listen(3000);

    console.log("Server listening on port 3000");
    ```

  - 另一种设置状态码的方法是直接使用 response.statusCode 属性。这在你需要先设置状态码，稍后再发送响应头和体时很有用：

    ```js
    const http = require("http");

    http
      .createServer((req, res) => {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not Found");
      })
      .listen(3000);

    console.log("Server listening on port 3000");
    ```
- 设置响应状态描述
  - res.statusMessage = 'I love you'
- 设置响应头
  - res.setHeader('Content-Type', 'text/html; charset=utf-8')
  - res.setHeader('Server-List', 'WillYingServer')
  - 设置多个同名响应头 res.setHeader('test', ['a','b','c'])
- 响应体设置
  - res.write('hello'),一般在write设置了响应体，那么res.end()就不要设置响应体， write方法可以多次调用
  - 直接使用res.end('hello'), 在每一次执行回调函数时候只能有一个end方法
 