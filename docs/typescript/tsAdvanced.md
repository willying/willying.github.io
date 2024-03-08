# Typescript 进阶

TS 中高级类型有很多，重点学习以下高级类型:

1. class 类
2. 类型兼容性
3. 交叉类型
4. 泛型和 keyof
5. 索引签名类型和索引查询类型
6. 映射类型

## class 类

Typescript 全面支持 ES2015 中引入的 class 关键字，并为其添加了类型注解和其他语法（比如可见修饰符等）

class 基本使用如下:

```typescript
class Person {}
const p = new Person();
```

解释:

1. 根据 TS 中的类型推断，可以知道类型实例对象 p 的类型是 Person
2. **TS 中的 class，不仅提供了 class 的语法功能，也作为一种类型存在**

### 实例属性初始化:

```typescript
class Person {
  age: number;
  name: string;
  gender: string;
}
```

解释:

1. 声明成员 age，类型为 number，没有初始值
2. 声明成员 name，类型为 string，没有初始值

### 构造函数

```typescript
class Person {
  name: string;
  age: number;
  gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}
const p = new Person("will", 26, "男");
console.log(p.age);
console.log(p.gender);
```

解释:

1. 成员初始化（比如，age:number）后，才可以通过 this.age 访问实例成员
2. 需要为构造函数指定类型注解，否则会被隐式推断为 any，构造函数不需要返回值类型

### 实例方法

```typescript
class Point {
  x = 10;
  y = 10;
  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}
```

解释： 方法的类型注解(参数和返回值)与函数用法相同

### 类的继承

类的继承有两种方式， 1 extends(继承父类) 2 implements(实现接口)

说明: JS 中只有 extends，而 implements 是 TS 提供的

```typescript
class Animal {
  move() {
    console.log("Move along!");
  }
}
class Dog extends Animal {
  bark() {
    console.log("wang～");
  }
}
const dog = new Dog();
```

解释：

1. 通过 extends 关键字实现继承
2. 子类 Dog 继承父类 Animal 的所有属性和方法

### implements 继承

```typescript
interface IShape {
  radius: number;
  calculatedArea: () => number;
  calculatedPerimeter: () => number;
}

class Circle implements IShape {
  radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }
  calculatedArea() {
    return Math.PI * this.radius ** 2;
  }
  calculatedPerimeter() {
    return 2 * Math.PI * this.radius;
  }
}
```

解释：

1. 通过 implements 关键字让 class 实现接口
2. Point 类实现 IPoint 接口，意味着 Point 类必须提供 IPoint 接扣的所有属性和方法

### class 类的可见修饰符

1. public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的

```typescript
class Super {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}
class Children extends Super {
  constructor(name: string) {
    super(name);
    console.log(this.name);
  }
}
```

2. private 修饰的属性或方法是私有的，不能在声明它的类的外部访问

```typescript
class Super {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayName() {
    console.log(this.name) // 类本身可见
  }
}
class Children extends Super {
  constructor(name: string) {
    super(name);
    // console.log(this.name);  子类不允许被方法
  }
}
const super = new Super('super');
console.log(super.name); // 报错,也不允许在类的外部访问
super.sayName(); // 正常
```

3. protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

```typescript
class Super {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayName() {
    console.log(this.name) // 类本身可见
  }
}
class Children extends Super {
  constructor(name: string) {
    super(name);
    console.log(this.name); // 继承类可见
  }
}
const super = new Super('super');
console.log(super.name); // 报错,也不允许在类的外部访问
super.sayName(); // 正常
```

4. readonly 修饰的属性表示只读属性，只允许出现在属性声明或索引签名或构造函数中

```typescript
class Super {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayName() {
    console.log(this.name); // 类本身可见
  }
  changeName() {
    this.name = "new name"; // 报错,不允许修改
  }
}
```
