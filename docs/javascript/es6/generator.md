# Generator
## 基本概念
Generator生成器函数是ES6提供的一种异步编程解决方案，并且Generator函数的行为和传统函数完全不同
### 生成Gnerator函数
```javascript
function* helloWorldGenerator() {
  
}
```
形式上，Generator函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的中间状态。
### Generator函数的调用
执行Generator函数，函数本身不会执行，而是返回一个**遍历器对象**，同时该对象是可遍历的，因为在其原型链上也具有Symbol.iterator方法，并且该方法返回的对象就是该遍历器对象自身