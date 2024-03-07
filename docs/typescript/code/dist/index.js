"use strict";
class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    calculateArea() {
        return Math.PI * this.radius ** 2;
    }
}
class Dog {
    makeSound() {
        console.log("Woof! Woof!");
    }
}
class Cat {
    makeSound() {
        console.log("Meow!");
    }
}
function playAnimalSound(animal) {
    animal.makeSound();
}
const myDog = new Dog();
const myCat = new Cat();
playAnimalSound(myDog); // 输出: Woof! Woof!
playAnimalSound(myCat); // 输出: Meow!
// 类型断言
const someValue = "this is a string";
const strLength = someValue.length;
const strLength2 = someValue.length;
// 枚举
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
console.log(Direction)
function direction(direction) {
    console.log(direction);
}
direction(0);
direction(Direction.Down);
const res = Direction[0];
console.log(res);
