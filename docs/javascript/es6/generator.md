---
permalink: /javascript/generator/
---
# Generator(生成器)
## 基本概念
Generator生成器函数是ES6提供的一种异步编程解决方案，并且Generator函数的行为和传统函数完全不同
### 生成Gnerator函数
```javascript
function* helloWorldGenerator() {}
```
形式上，Generator函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的中间状态。
### Generator函数的调用
执行Generator函数，函数本身不会执行，而是返回一个**遍历器对象**，同时该对象是可遍历的，因为在其原型链上也具有Symbol.iterator方法，并且该方法返回的对象就是该遍历器对象自身
```javascript
function* helloWorldGenerator() {
  console.log(1)
}
const a = f()
a[Symbol.iterator]() === a // true
```
因此Generator函数返回的对象也是可以被遍历的，相当于每次调用此对象的next()的value来作为遍历结果
只有执行了该遍历器的next()方法，Generator函数才会执行
```javascript
function* helloWorldGenerator() {
  console.log(1)
}
const a = f()
a.next() // 打印1返回{done: true, value: undefined}
```
### yield和yield*
Generator函数可以使用yield关键字来定义函数返回的遍历器对象每次next()后的value
```javascript
function* helloWorldGenerator() {
  yield 'hello'
}
const a = f()
a.next() // {done: false, value: 'hello'}
```
并且a每次执行next()，都会在下次yield处暂停，直到后面没有yield关键字，则执行剩余代码，并且返回done:true
```javascript
function* helloWorldGenerator() {
  console.log('step1')
  yield 1
  console.log('step2')
  yield 2
   console.log('step3')
}
const a = f()
a.next() // step1 {done: false, value: 1}
a.next() // step2 {done: false, value: 2}
a.next() // step3 {done: true, value: undefined}
```
<span style="color:red;">**yield**</span>本身没有返回值，yield的返回值是**下一次**next()函数传入的值。

所以next()方法的作用有两个:<br/>
- 执行本次yield到下一个yield之间的代码
- 将形参的值传给本次yield的返回值

<span style="color:red">**next()**</span>和<span style="color:red;">**yield**</span>实现了函数内外控制权的转移。

```javascript
function* helloWorldGenerator() {
  console.log('step1')
  const result = yield 1
  console.log('result', result)
}
const a = helloWorldGenerator()
a.next() // step1 {done: false, value: 1}
a.next(2) // result 2 {done: true, value: undefined}
```
<span style="color:red;">**yield***</span>等同于遍历某一个对象，并且yield每个结果.

```javascript
function* foo(x) {
  yield 'start'
  yield* [1,2,3]
  /*
  相当于
  [1,2,3].forEach(item => {
    yield item
  }
  */
 yield 'end'
}
const a = foo()
a.next() // {done: false, value: 'start'}
a.next() // {done: false, value: 1}
a.next() // {done: false, value: 2}
a.next() // {done: false, value: 3}
a.next() // {done: false, value: 'end'}
```
## Generator函数配合自动执行器
### 直接循环存在的问题
Generator函数是一种新的异步编程解决方案，但是每次手动调用next()很麻烦，如果写一个循环来执行next()，代码如下:
```javascript
function* foo() {
  yield 1
  console.log('完成1')
  yield 2
  console.log('完成2')
}
const f = foo()
const done = false
while (!done) {
  done = f.next().done
}
```
看似没有问题，但是如果yield后面本身就是一个异步操作，就会有问题
```javascript
function* foo() {
  yield readFile(file1)
  console.log('完成1')
  yield readFile(file2)
  console.log('完成2')
}
const f = foo()
const done = false
while (!done) {
  done = f.next().done
}
```
### Thunk函数
在javascript语言中，Thunk函数是指将多参数函数，将其替换为一个只接受一个回调函数作为参数的单参数函数。
```javascript
const path = require('path')
const fs = require('fs')

const thunk = (pathname) => {
  return function(callback) {
    fs.readFile(pathname,callback)
  }
}
const path1 = path.join(__dirname,'file1.txt')
const path2 = path.join(__dirname,'file2.txt')
const readFileThunk = thunk(path1)
readFileThunk(function(err,data){
  console.log(data.toString())
})
```
```javascript
const path = require('path')
const fs = require('fs')
const path1 = path.join(__dirname, 'index.txt')
const path2 = path.join(__dirname, 'index1.txt')

const thunk = function(pathname) {
  return function(callback) {
    fs.readFile(pathname, 'utf8', callback)
  }
}

function* f() {
  const data1 = yield thunk(path1)
  console.log(data1)
  const data2 = yield thunk(path2)
  console.log(data2)
}

function run(f) {
  const it = f()
  function nextStep(err,data) {
    const result = it.next(data)
    if (result.done) return
    result.value(nextStep)
  }
  nextStep()
}

run(f)
```