# async 函数

## 基本概念

async 函数是什么？一句话，它是 Gnerator 函数的语法糖<br/>
将上一节代码改为 async 函数版本

```javascript
const { promisify } = require("util");
const path = require("path");
const { readFile } = require("fs");
const file1 = path.join(__dirname, "./index1.txt");
const file2 = path.join(__dirname, "./index2.txt");
const readFileP = promisify(readFile);

function* f() {
  const data1 = yield readFileP(file1, "utf-8");
  console.log("完成了1，数据是", data1);
  const data2 = yield readFileP(file2, "utf-8");
  console.log("完成了2，数据是", data2);
}

async function fun() {
  const data1 = await readFileP(file1, "utf-8");
  console.log("完成了1，数据是", data1);
  const data2 = await readFileP(file2, "utf-8");
  console.log("完成了2，数据是", data2);
}

fun();
```

## 执行 async 函数

执行 async 函数相当于执行了一个自动运行的 Gnerator 函数，async 函数如果返回的结果不是 Promise 对象，会自动将返回结果封装为 Promise 对象返回：

```javascript
async function f() {
  console.log(1);
}
f().then(() => console.log(2));

async function f1() {
  console.log(1);
  return "done";
}
f1().then((value) => {
  console.log(value);
});
```

## 错误处理

async 函数内部抛出错误，会导致返回的 Promise 对象变为 reject 状态，抛出的错误对象会被 catch 方法回调函数接收到：

```javascript
async function f() {
  throw new Error("出错了");
}
f().then(
  () => {},
  (err) => {
    console.log(err);
  }
);
```

## await 关键字

与 yield 类似，async 函数中可以使用 await 关键字，await 关键字后面一般会写一个 promise 实例，async 函数执行过程中，每次遇到 await 关键字，会将控制权转回到外部环境<br/>

- 如果 await 后面是 Promise 实例，则会等待该 Promise 实例被 resolve 后，才会把本次 await 到下次 await 之间的代码推到<span style="color:red;">**MircoTask**</span>中等待执行，并且**await 的返回值是该 Promise 实例 resolve 的值**
- 如果 await 后面不是 Promise 实例，则会立即把本次 await 到下次 await 之间的代码推到 MircoTask 中等待执行，并且**await 的返回值等于 await 后面表达式的值**
- 微任务本次事件循环结束前执行，宏任务本次事件循环结束前不会执行

```javascript
async function f() {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello");
    }, 1000);
  });
  console.log(data);
  const data1 = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello");
    }, 1500);
  });
  console.log(data1);
}
f();
// console.log('hello')
```

## async 函数的错误处理

如果 Promise 被 reject 或抛出错误，await 之后的代码不会执行，因此，需要使用 try...catch 对 await 语句进行错误捕获：

```javascript
async function f() {
  try {
    const data = await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("出错了");
      }, 1000);
    });
    console.log("done"); // 不会执行
  } catch (err) {
    console.log(err);
  }
}
```

## async 函数处理并发任务

如果，async 函数中的每个 await 都是等前面的 await resolve 后才执行，如果想并发执行，可以使用 Promise.all()方法

```javascript
async function f() {
  const time1 = new Date();
  const data1 = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello");
    }, 2000);
  });
  const data2 = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello");
    }, 3000);
  });
  console.log("data1和data2执行事件", new Date() - time1); // 大于5s
}
f();
```

```javascript
async function f() {
  const time1 = new Date();
  const [data1,data2] = await Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("hello");
      }, 2000);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("hello");
      }, 3000);
    }),
  ]);
  console.log("data1和data2执行事件", new Date() - time1); // 3s多一点
}
```
## async函数与Promise的对比
用async函数写异步逻辑相比Promise会更加简洁，在处理**不同异步结果互相依赖**，错误处理，if...else分支等场景下，async函数会非常方便。
```javascript
const {readFile} = require('fs')
const {promisify} = require('util')
const path = require('path')
const file1 = path.join(__dirname, './file1.txt')
const file2 = path.join(__dirname, './file2.txt')
const file3 = path.join(__dirname, './file3.txt')
const readFileP = promisify(readFile)
function f1() {
  readFileP(file1).then(data1 => {
    console.log('✌，完成了1，数据是'+data1)
    return readFileP(file2)
  }).then(data2 => {
    console.log('✌，完成了1，数据是'+data2)
    return readFileP(file3)
  }).then(data3 => {
    console.log('✌，完成了1，数据是'+data3)
  })
}
```