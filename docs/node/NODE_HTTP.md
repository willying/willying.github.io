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

### IP

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

### 端口

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
        res.writeHead(404, "Resource Not Found", {
          "Content-Type": "text/plain",
        });
        res.end("The requested resource was not found on this server.");
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
  - res.write('hello'),一般在 write 设置了响应体，那么 res.end()就不要设置响应体， write 方法可以多次调用
  - 直接使用 res.end('hello'), 在每一次执行回调函数时候只能有一个 end 方法

## 网页资源加载的基本过程

网页资源加载的基本过程如下：

1.  **解析 HTML**：当用户在浏览器地址栏输入网址或点击链接时，浏览器会发送请求到服务器，并接收服务器返回的 HTML 文件。
2.  **构建 DOM 树**：浏览器开始解析 HTML 文件，并构建文档对象模型（DOM）树，表示页面的结构。
3.  **加载外部资源**：在解析 HTML 文件的过程中，浏览器会遇到外部资源的引用，比如 CSS 文件、JavaScript 文件、图片、字体等。这些资源的加载方式如下：

- **CSS 文件**：浏览器会并行下载 CSS 文件，并在下载完成后解析样式规则，应用到页面上的元素，从而影响页面的布局和外观
- **JavaScript 文件**：浏览器在下载 JavaScript 文件时会阻塞页面的解析和渲染，因为 JavaScript 可能会修改页面的结构和内容。JavaScript 文件下载完成后会执行，影响页面的交互和行为
- **图片、字体等资源**：这些资源的加载不会阻塞 HTML 的解析和其他资源的加载，但会影响页面的渲染和性能。

4. **构建 CSSOM 树**：浏览器会解析 CSS 文件，构建 CSS 对象模型（CSSOM）树，表示页面的样式信息。
5. **构建渲染树**：浏览器将 DOM 树和 CSSOM 树结合起来，构建渲染树（Render Tree），确定页面上哪些元素需要显示，以及它们的样式和布局信息。
6. **页面布局（Reflow）**：浏览器根据渲染树的信息，进行页面布局计算，确定每个元素在页面中的位置和大小。
7. **页面绘制（Repaint）**：浏览器根据页面布局信息，进行页面渲染，将页面内容绘制到屏幕上。
8. **交互和动态更新**：用户与页面交互时，JavaScript 可以修改 DOM 结构和样式，触发页面的重新布局和绘制，实现动态更新。

## 静态资源与动态资源

- 静态资源：静态资源是指在服务器上存储的不会随着用户请求而改变的文件，例如 HTML 文件、CSS 样式表、JavaScript 脚本、图片、字体文件等。这些文件在服务器上保存不会发生变化，并且每次请求这些资源时，服务器都会返回相同的内容。静态资源的特点是内容固定，不会根据用户或其他条件动态生成。

- 动态资源：动态资源是指在服务器上存储的内容可能会根据用户请求、用户输入或其他条件而动态生成的文件。通常，动态资源的内容是根据用户的请求实时生成的，例如动态网页、数据库查询结果、用户个性化内容等。动态资源的内容不是固定的，而是根据特定条件动态生成的。

## 网站根目录或静态资源目录

HTTP 服务在那个文件夹中寻找静态资源，那个文件夹就是静态资源目录，也称为网站根目录

> 思考: vscode 中使用 live-server 访问 html 时，它启动的服务网站根目录是？

## 网页 URL 之绝对路径

网页中的 URL 主要分为两大类：相对路径和绝对路径

- 绝对路径
  绝对路径可靠性更强，而且更容易理解
  | 形式 | 特点 |
  | ------ | -------- |
  | http://www.baidu.com/web | 直接向目标资源发送请求，容易理解，网站的外链会用到此形式 |
  | //atguigu.com/web | 与页面的 URL 的协议拼接形成完整的 URL 再发送请求，大型网站用的比较多 |
  | /web | 与页面的 URL 的协议、主机名、端口拼接形成完整的 URL 再发送请求，中小型网站 |
- 相对路径
  相对路径在发送请求时，需要与当前页面 URL 路径进行**计算**，得到完整的 URL 后，再发送请求，学习阶段用的比较多

  例如当前页面 url 为http://www.atguigu.com/course/h5.html
  | 形式 | 最终 URL |
  | ------ | -------- |
  | ./css/app.css | http://www.atguigu.com/course/css/app.css |
  | js/app.js | http://www.atguigu.com/course/js/app.js |
  | ../img/logo.png | http://www.atguigu.com/img/logo.png |
  | ../..mp4/show.mp4 | http://www.atguigu.com/mp4/show.mp4 |

### 网页中使用 URL 场景小结

包括但不限于

    - a 标签的 href
    - link 标签的 href
    - script 标签的 src
    - img 标签的 src
    - video audio 标签的 src
    - form 的action
    - Ajax请求中的URL

## 设置资源类型(mime 类型)

媒体类型(通常称为 Multipurpose Internet Mail Extensions 或 MIME 类型)是一种标准，用来表示文档、文件或字节流的性质和格式。在 HTTP 协议消息头中，使用 Content-Type 字段来表示具体请求中的媒体类型信息。

mime 类型结构: [type]/[subType]
例如： text/html text/css image/jpeg image/png application/json

http 服务可以设置响应头 Content-Type 来表明响应体中的 MIME 类型，浏览器会根据该类型决定如何处理资源

下面是常见的文件对应的 mime 类型

| 文件类型 | mime 类型        |
| -------- | ---------------- |
| html     | text/html        |
| css      | text/css         |
| js       | text/js          |
| png      | image/png        |
| jpg      | image/jpg        |
| gif      | image/gif        |
| mp4      | video/mp4        |
| mp3      | audio/mpeg       |
| json     | application/json |

> 对于未知资源类型，可以选择 application/octet-stream 类型，浏览器遇到该类型的响应时，会对响应体内容进行独立存储，也就是我们常说的下载效果

## NodeJs 模块化

将一个复杂的程序文件依据一定的规则拆分多个文件的过程称为模块化
其中拆分出的每一个文件就是一个模块，模块的内部数据是私有的，不过模块可以暴露内部数据以便其他模块使用

### 什么是模块化项目

编码时按照模块一个一个编码的，整个项目就是一个模块化项目

### 模块化的好处

- 防止命名冲突
- 高复用性
- 高维护性

### 暴露数据

模块暴力数据有两种：

1. module.exports = value
2. exports.xxx = value

> 使用时注意事项
>
> 1. module.exports 可以暴露任意数据
> 2. 不能使用 exports= value 的形式保留，模块内部 module 与 exports 的隐士关系 exports = module.exports = {}
> 3. require 的返回结果是 module.exports 的值

### 导入或引入模块

在模块中使用 require 传入文件路径即可引入文件

```js
const test = require("test");
```

require 使用的注意事项:

1. 对于自己创建的模块，导入时路径建议写相对路径，且不能./和../
2. js 和 json 文件导入时，可以不用写后缀，c/c++编写的 node 扩展文件也可以不用写后缀，但是一般用不到
3. 如果导入其他类型的文件，会以 js 文件进行处理
4. 如果导入的路径是一个文件夹，则会首先检查该文件夹下 package.json 文件中 main 属性对应的文件，如果 main 属性不存在，或则 package.json 文件不存在，则默认导入该文件夹下的 index.js 或 index.json,如果还没有找到则会报错

### commonjs规范
module.exports、exports以及require这些都是CommonJs模块化规范的内容。
而nodejs是CommonJs模块化规范的实现。，二者关系像javascript和ECMAScript