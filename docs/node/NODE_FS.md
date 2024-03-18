# fs 模块(file system 文件系统)

fs 模块可以实现与硬盘的交互，例如文件的创建，删除，重命名，移动，还有文件内容的写入，读取，以及文件夹的相关操作

## 文件写入

- 普通写入

```js
const fs = require("fs");
fs.writeFile("./a.txt", "hello world", (err) => {
  if (!err) {
    console.log("写入成功");
  }
});
fs.writeFile("./a.txt", "hello world", { flag: "a" }, (err) => {
  if (!err) {
    console.log("追加写入成功");
  }
});
fs.appenFile("./a.txt", "hello world", (err) => {
  if (!err) {
    console.log("追加写入成功");
  }
});
```

- 流式写入

```js
const fs = require("fs");

const ws = fs.createWriteStream("观书有感.txt");
ws.write("床前明月光；\n");
ws.write("疑是地上霜；\n");
ws.write("举头望明月；\n");
ws.write("低头思故乡。\n");
ws.end(); // 关闭通道

ws.on("finish", () => {
  console.log("写入成功");
});

ws.on("error", (err) => {
  console.log("写入失败", err);
});
```

## 文件写入的运用场景

1. 下载程序
2. 安装程序
3. 保存程序日志
4. 编辑器保存文件
5. 视频录制

当需要持久化保存数据时，应该想到文件写入

## 文件读取

文件读取，顾名思义，通过程序从文件中取出其中的数据，我们推荐一下几种方式:

1. readFile 异步读取
2. readFileSync 同步读取
3. createReadStream 流式读取

```js
const fs = require("fs");

fs.readFile("./观书有感.txt", "utf-8", (err, data) => {
  if (!err) {
    console.log(data);
  }
});

const data = fs.readFileSync("./观书有感.txt", "utf-8");
console.log(data);

const rs = fs.createReadStream("./观书有感.txt", "utf-8");

rs.on("data", (chunk) => {
  // 当从文件中读取一块就会执行一次
  console.log(chunk);
});
rs.on("end", () => {
  console.log("文件读取完毕");
  rs.close();
});
```

## 文件读取的运用场景

- 电脑开机
- 程序运行
- 编辑器打开文件
- 查看图片
- 播放视频
- 播放音乐
- Git 查看日志
- 上传文件
- 查看聊天记录

## 文件复制练习

```js
/*
需求: 
复制.mggl
*/

const fs = require("fs");
const fileName = "毛不易-无名的人.mggl";
const path = require("path");
const rs = fs.createReadStream(path.resolve(__dirname, fileName));
const directoryPath = "../资料";
const filePath = path.join(directoryPath, fileName);

fs.mkdir(directoryPath, { recursive: true }, (err) => {
  if (err) throw err;
  const ws = fs.createWriteStream(filePath);
  rs.on("data", (chunk) => {
    ws.write(chunk);
  });
  rs.on("end", () => {
    console.log("file write over");
    ws.close(); // 结束文件写入流
    rs.close(); // 结束文件读取流
  });
  rs.on("error", (err) => {
    console.log("文件写入失败", err);
  });
});
```

## 文件重命名和移动

在 Nodejs 中，我们可以使用 rename 或者 renameSync 来移动或则重命名文件或则文件夹

语法:

- fs.rename(oldPath, newPath, callback)
- fs.renameSync(oldPath, newPath)

参数说明:

- oldPath: 需要重命名的文件或则文件夹的路径
- newPath: 新的文件或则文件夹的路径
- callback: 回调函数，当重命名操作完成时，会调用该函数

```js
const fs = require("fs");
fs.rename("./观书有感.txt", "./观书有感-副本.txt", (err) => {
  if (!err) {
    console.log("移动完成");
  }
});
fs.renameSync("./观书有感.txt", "./观书有感-副本.txt");
console.log("移动完成");
```

## 文件删除

在 Nodejs 中，我们可以使用 unlink 或则 unlinkSync 来删除文件或则文件夹

语法:

- fs.unlink(path, callback)
- fs.unlinkSync(path)

参数说明:

- path: 需要删除的文件或则文件夹的路径
- callback: 回调函数，当删除

```js
const fs = require("fs");
fs.unlink("./观书有感-副本.txt", (err) => {
  if (!err) {
    console.log("删除成功");
  }
});

fs.rm("./观书有感-副本.txt", (err) => {
  if (!err) {
    console.log("删除成功");
  }
});

fs.unlinkSync("./观书有感-副本.txt");
```

## 文件夹操作

借助 NodeJs 的能力，我们可以对文件夹进行创建，读取，删除等操作

| 方法               | 说明       |
| ------------------ | ---------- |
| mkdir/mkdirSync    | 创建文件夹 |
| readdir/readirSync | 读取文件夹 |
| rmdir/rmdirSync    | 删除文件夹 |

## 创建文件夹

在 nodejs 中我们可以使用 mkdir 或则 mkdirSync 来创建文件夹

语法:

```js
fs.mkdir(path[, options], callback)
fs.mkdirSync(path[, options])
```

参数说明:

- path 文件夹路径
- options 选项配置(可选)
- callback 操作后的回调

```js
fs.mkdir("./page", (err) => {
  if (!err) {
    console.log("创建成功");
  }
});

// 递归创建
fs.mkdir("./page/a/b/c", { recursive: true }, (err) => {
  if (!err) {
    console.log("递归创建");
  }
});
```

## 文件夹的读取

```js
fs.readdir("./page/a/b/c", (err, data) => {
  if (!err) {
    console.log(data);
  }
});
```

## 删除文件夹

```js
// 递归删除
fs.rmdir("./page/a/b/c", { recursive: true }, (err, data) => {
  if (!err) {
    console.log(data);
  }
});
// 这个警告是因为在未来版本的Node.js中，fs.rmdir()方法将被弃用，建议使用fs.rm()方法来代替，特别是在需要递归删除目录时。fs.rm()方法提供了更通用的方式来处理文件和目录的删除操作。
```

解释:

- 当删除的文件夹不是空的，必须加上 recursive 为 true
- 不推荐使用 rmdir 删除文件夹，而是使用更加通用的 rm 方法

## 查看文件状态

在 nodejs 中我们可以使用 stat 或 statSync 来查看资源的详细信息
语法:

```js
fs.stat(path[, options], callback)
fs.statSync(path[, options])
```

参数说明:

- path 文件路径
- options 选项配置(可选)
- callback 操作后的回调

示例代码:

```js
fs.stat("./data.txt", (err, data) => {
  if (!err) {
    console.log(data);
  }
});

const data = fs.statSync("./data.txt");
```

结果值对象结构:

- size 文件大小
- birthtime 文件的创建时间
- mtime 文件的修改时间
- isFile 是否是文件
- isDirectory 是否是文件夹

## 相对路径问题

fs 对资源操作时，路径有两种写法

- 相对路径
  - ./座右铭.txt 当前目录下的座右铭.txt
  - 座右铭.txt 等于上面写法
  - ../座右铭.txt 上一级目录下的座右铭.txt
- 绝对路径
  - D:/Program Files/nodejs/node.exe windows 下面的绝对路径
  - /usr/bin linux 下面的绝对路径

> 相对路径中所谓的当前目录，指的是**命令行的工作目录**，而并非文件所在目录
> 所以当命令行的工作目录和文件所在目录不一致时，使用相对路径会出错

### \_\_dirname

\_\_dirname 和 require 类似，都是 NodeJs 环境中的全局变量
\_\_dirname 保存着当前文件所在目录的绝对路径，可以使用\_\_dirname 与文件名称拼接成绝对路径

```js
const data = fs.readFileSync(__dirname + "/data.txt");
```

> 使用 fs 模块的时候，尽量使用\_\_dirname 将路径转换为绝对路径，这样可以避免相对路径参数的 bug

## fs 批量重命名

```js
const fs = require("fs");
const path = require("path");
const directoryPath = path.join(__dirname, "./page/js/util");

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log("读取文件夹错误", err);
    throw err;
  }
  let idx = 1;
  files.forEach((file) => {
    const pathName = path.join(directoryPath, file);
    fs.stat(pathName, (err, stats) => {
      if (err) {
        console.log("读取文件状态错误");
        throw err;
      }
      if (stats.isDirectory()) return;
      const fileExt = path.extname(pathName);
      const fileExtWithoutDot = fileExt.slice(1);
      if (fileExtWithoutDot !== "js") return;
      const newFileName = path.join(
        directoryPath,
        `${idx}${path.basename(pathName)}`
      );
      idx++;
      fs.rename(pathName, newFileName, (err) => {
        if (!err) {
          console.log("修改成功");
        } else {
          console.log(err);
        }
      });
    });
  });
});
```
