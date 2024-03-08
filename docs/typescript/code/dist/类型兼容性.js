"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Animal {
    constructor(color) {
        this.color = color;
    }
}
class Dog extends Animal {
    constructor(color, name) {
        super(color);
        this.name = name;
    }
    bark() {
        console.log("Woof!");
    }
}
let animal = new Animal("黄色");
let dog = new Dog("黄色", "多多");
console.log(dog.color);
let p1 = {
    name: "will",
};
let p2 = p1;
let p3 = {
    name: "will",
    age: 26,
    gender: "男",
};
p2 = p3;
