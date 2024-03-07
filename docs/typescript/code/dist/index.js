"use strict";
const sm = Symbol(123);
const add = (x, y) => x + y;
add(1, 2);
// 函数可选参数必须在必选参数后面
const greet = (name, greeting) => {
    if (greeting) {
        return `${greeting}, ${name}`;
    }
    else {
        return `hello ${greeting}`;
    }
};
greet('will');
const person = {
    name: 'will',
    age: 26,
    gender: '男',
    hobby: ['学习', '看电影', '打游戏']
};
console.log(person);
