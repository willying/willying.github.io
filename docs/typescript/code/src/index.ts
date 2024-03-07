// 约定结构
interface Shape {
  calculateArea(): number;
}

class Circle implements Shape {
  radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }
  calculateArea() {
    return Math.PI * this.radius ** 2;
  }
}

// 多态性
interface Animal {
  makeSound(): void;
}
class Dog implements Animal {
  makeSound() {
    console.log("Woof! Woof!");
  }
}
class Cat implements Animal {
  makeSound() {
    console.log("Meow!");
  }
}

function playAnimalSound(animal: Animal) {
  animal.makeSound();
}

const myDog = new Dog();
const myCat = new Cat();

playAnimalSound(myDog); // 输出: Woof! Woof!
playAnimalSound(myCat); // 输出: Meow!

type A = number
type B = string
type C = A | B


// 类型断言

const someValue: any = "this is a string";
const strLength = (<string>someValue).length;
const strLength2 = (someValue as string).length;


// 枚举

enum Direction {
  Up,
  Down,
  Left,
  Right
}
function direction(direction:Direction) {
  console.log(direction)
}
direction(0)
direction(Direction.Down)
const res = Direction[0]
console.log(res)