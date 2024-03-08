"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    constructor(name, age, gender, hobby = []) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.hobby = hobby;
    }
    sayName() {
        console.log(`My name is ` + this.name);
    }
    changeName(name) {
        // this.name = name
    }
}
const p = new Person('will', 26, '男', ['学习', '打游戏']);
// console.log('willying', p.age)
console.log(p.gender);
p.sayName();
class Teacher extends Person {
    constructor(name, age, gender, hobby = []) {
        super(name, age, gender, hobby);
    }
    sayAge() {
        console.log(this.age);
    }
}
const allen = new Teacher('will', 30, '男', ['学习', '打游戏']);
allen.sayAge();
class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    calculatedArea() {
        return Math.PI * this.radius ** 2;
    }
    calculatedPerimeter() {
        return 2 * Math.PI * this.radius;
    }
}
class Super {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}
class Children extends Super {
    constructor(name) {
        super(name);
        console.log(this.name);
    }
}
const super1 = new Super('will');
let add1 = function add1(x, y) {
    console.log(x + y);
};
let add2 = function add2(x, y, z) {
    console.log(x + y + z);
};
// add1 = add2 函数少的可以赋值给多的，但是多的不能赋值给少的
// 在类中子类可以赋值给父类，父亲不能赋值给子类
