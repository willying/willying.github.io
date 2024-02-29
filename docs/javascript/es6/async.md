# async函数
## 基本概念
async函数是什么？一句话，它是Gnerator函数的语法糖<br/>
将上一节代码改为async函数版本
```javascript
const { promisify } = require('util')
const path = require('path')
const { readFile } = require('fs')
const file1 = path.join(__dirname,'./index1.txt')
const file2 = path.join(__dirname,'./index2.txt')
const readFileP = promisify(readFile)

function* f() {
  const data1 = yield readFileP(file1, 'utf-8')
  console.log('完成了1，数据是', data1)
  const data2 = yield readFileP(file2, 'utf-8')
  console.log('完成了2，数据是', data2)
}

async function fun () {
  const data1 = await readFileP(file1, 'utf-8')
  console.log('完成了1，数据是', data1)
  const data2 = await readFileP(file2, 'utf-8')
  console.log('完成了2，数据是', data2)
}

fun()
```
## 执行async函数
执行async函数相当于执行了一个自动运行的Gnerator函数，async函数如果返回的结果不是Promise对象，会自动将返回结果封装为Promise对象返回：
```javascript
async function f() {
  console.log(1)
}
f().then(() => console.log(2))

async function f1() {
  console.log(1)
  return 'done'
}
f1().then(value => {
  console.log(value)
})
```
## 错误处理
async函数内部抛出错误，会导致返回的Promise对象变为reject状态，抛出的错误对象会被catch方法回调函数接收到：
```javascript
async function f() {
  throw new Error('出错了')
}
f().then(()=> {}, (err) => {
  console.log(err)
})
```
## await关键字
与yield类似，async函数中可以使用await关键字，await关键字后面一般会写一个promise实例，async函数执行过程中，每次遇到await关键字，会将控制权转回到外部环境<br/>
- 如果await后面是Promise实例，则会等待该Promise实例被resolve后，才会把本次await到下次await之间的代码推到MircoTask中等待执行，并且await的返回值是该Promise实例resolve的值
- 如果await后面不是Promise实例，则会立即把本次await到下次await之间的代码推到MircoTask中等待执行，并且await的返回值等于await后面表达式的值
```javascript
async function f() {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello')
    }, 1000)
  })
  console.log(data)
  const data1 = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello')
    }, 1500)
  })
  console.log(data1)
}
f()
// console.log('hello')
```