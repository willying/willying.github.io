# TypeScript

## 类型注解

在 TypeScript 中，类型注解是一种用于给变量、函数参数、函数返回值等添加类型信息的方式。通过类型注解，你可以明确指定变量的类型，从而提高代码的可读性和可维护性

- 基本类型注解

```typescript
// 声明一个字符串变量
let myString: string;

// 声明一个数字变量
let myNumber: number;

// 声明一个布尔变量
let myBoolean: boolean;

// 声明一个数组变量，包含数字类型的元素
let myArray: number[];

// 声明一个元组，包含一个字符串和一个数字
let myTuple: [string, number];
```

- 函数参数和返回值注解

```typescript
// 函数参数和返回值的类型注解
function add(x: number, y: number): number {
  return x + y;
}
```

- 对象类型注解：

```typescript
// 对象类型注解
let myObject: { name: string; age: number };

myObject = { name: "John", age: 30 }; // 正确
// myObject = { name: "John" }; // 错误，缺少 age 属性
// myObject = { name: 30, age: "John" }; // 错误，属性类型不匹配
```

- 自定义类型注解：

```typescript
// 使用 type 关键字定义自定义类型注解
type Point = {
  x: number;
  y: number;
};
// 使用自定义类型注解
let myPoint: Point = { x: 10, y: 20 };
```

- 联合类型和交叉类型注解：

```typescript
// 联合类型注解
let myVar: string | number;

myVar = "Hello"; // 正确
myVar = 42; // 正确
// myVar = true; // 错误，类型不匹配

// 交叉类型注解
type Person = { name: string } & { age: number };

let myPerson: Person = { name: "John", age: 30 };
```

- 函数类型

```typescript
const add: (x: number, y: number) => number = (x, y) => x + y;
```

这些例子展示了 TypeScript 中常见的类型注解用法。通过使用类型注解，可以在编写代码时更早地捕获潜在的错误，并提供更好的开发工具支持

## Typescript 常用类型

可以把 TS 中的常用基础类型分为两大类：JS 已有类型, TS 新增类型

## JS 已有类型

- 原始类型（number,string,null,undefined,symbol, boolean
- 引用类型 （object 包含数组、对象、函数等对象）<br/>
  特点对象类型在 TS 中更加细化，每个具体的对象都有自己的类型语法 - 数组类型的两种写法：（推荐使用 number[]写法）

```typescript
const numbers: number[] = [1, 2, 3];
const strings: Array<string> = ["a", "b", "c"];
```

## TS 新增类型

联合类型、自定义类型（类型别名）、接口、元组、字面量类型、枚举、void、any 等

- **联合类型**

  需求：数组中既有字符串又有数字，如何表示？

  ```typescript
  const arr: (number | string)[] = [1, "1", 2];
  ```

  **解释：｜（竖线）在 TS 中叫做联合类型（由两个或则多个组成的类型，表示可以是这些类型中的任意一种），注意不要和 js 的 || 混淆了**

- **类型别名**

  类型别名（自定义类型）：为任意类型起别名
  使用场景：当同一类型（复杂）被多次使用时，可以通过类型别名，简化该类型的使用

  ```typescript
  type CustomArray = (number | string)[];
  const arr1: CustomArray = [1, "2"];
  const arr2: CustomArray = ["2", 1, "1", 2];
  ```

  解释：<br/>

  1. 使用 type 关键字来创建类型别名
  2. 类型别名（比如，此处的 CustomArray），可以是任意的合法变量名称
  3. 创建类型别名后，直接使用该类型别名作为变量的类型注解即可

- **函数类型**

  函数的类型实际上是指：函数的参数和返回值的类型<br/>
  为函数指定类型的两种方式，1 单独指定参数、返回值的类型 2 同时指定参数、返回值类型

  1. 单独指定参数、返回值的类型

  ```typescript
  function add(num1: number, num2: number): number {
    return num1 + num2;
  }
  const add2 = (num1: number, num2: number): number => num1 + num2;
  ```

  2. 同时指定参数和返回值类型

  ```typescript
  const add3: (num1: number, num2: number) => number = (num1, num2) =>
    num1 + num2;
  ```

  解释：当函数作为表达式时，可以通过类似箭头函数形式的语法来为函数添加类型

  注意这种形式只适用于函数表达式

  3. **void 类型**

  当函数没有返回值时，他的返回值类型就是 void 类型，但是如果函数显示返回 undefined，并不是 void 类型

  ```typescript
  function fn(): void {
    console.log("fn()");
  }
  ```

  4. **函数可选参数**
     使用函数实现某一个功能的时候，参数可以传也可以不传，这种情况下，在给函数指定参数时，就用到可选参数了
     比如数组的 slice 方法，可以 slice(1)还可以 slice(1,3)

  ```typescript
  function mySlice(start?: number, end?: number): number[] {
    return [];
  }
  ```

  5. **参数默认值**

  在 TypeScript 中，你可以为函数的参数设置默认值。这使得在调用函数时，如果没有提供相应参数的值，就会使用默认值

  ```typescript
  function mySlice(start = 0, end = this.length): number[] {
    return [];
  }
  ```

- **对象类型**

  JS 中的对象是由属性和方法组成的，在 TS 中，对象的类型就是在描述对象的结构（有什么类型的属性和方法）

  对象类型的写法

  ```typescript
  const obj: { name: string; age: number; sayHi(name: string): void } = {
    name: "张三",
    age: 18,
    sayHi(name) {
      console.log("hello");
    },
  };
  ```

  解释：

      1. 直接使用{}来描述对象的结构，属性采用属性名：类型的形式，方法采用方法名(): 返回值类型的形式
      2. 如果方法有参数，就在方法名后面的小括号中指定参数的类型（比如：greet(name:string):void）
      3. 在一行代码中指定多个属性的类型时，使用;来隔开
      4. 如果一行代码中只指定一个属性类型(通过换行分隔多个属性类型),可以去掉;(分号)
      5. 方法类型是可以使用箭头函数形式（比如{sayHi:(name:string) => void}）

  对象中的可选属性

  对象的属性和方法，也是可以可选的，此时就用到了可选属性了

  比如 axios({})时，如果发送 GET 请求，methods 属性就可以省略

  ```typescript
  function myAxios(config: { url: string; method?: string }) {
    console.log(config);
  }
  ```

  可选属性的语法与函数可选参数的语法一致，都使用?(问好)来表示

- **接口**
  当一个对象类型被多次调用时，一般会使用接口(interface)来描述对象的类型，达到复用的目的

  解释:

      1. 使用interface关键字来声明接口
      2. 接口名称（比如，此处的IPseron），可以是任何合法的变量名称
      3. 声明接口后，直接使用接口的名称作为变量的类型
      4. 因为每一行只有一个属性类型，因此属性类型后面没有;号<br/>

  ```typescript
  interface IPerson {
    name: string;
    age: number;
    sayHi(name: string): void;
  }
  let person: IPerson = {
    name: "will",
    age: 26,
    sayHi: (name) => {
      console.log(name + "say hello");
    },
  };
  ```

- **接口和类型别名对比**
  interface 接口和 type 类型别名的对比:
  - 相同点: 都可以给对象指定类型
  - 不同点:
    - 接口，接口只能为对象类型
    - 类型别名，类型别名可以为任意类型
    - interface，可以通过声明合并进行扩展
    - 类型别名，不能进行声明合并
    ```typescript
    interface IPerson {
      name: string;
    }
    interface IPerson {
      age: number;
    }
    const person:IPerson = {
      name: "will"，
      age: 26
    }
    type PersonAlias = {
      name: string
    }
    type PersonAlias = {
      age: number
    } //  Error: Duplicate identifier 'PersonAlias'.
    ```
    - 接口 interface 可以被实现 class implements
    - 接口可以通过 extends 实现扩展接口
    ```typescript
    interface IPrint2D {
      x: number;
      y: number;
    }
    interface IPrint3D extends IPrint2D {
      z: number;
    }
    ```
    - 类型别名 type 可以通过联合类型扩展
    ```typescript
    type A = number;
    type B = string;
    type C = A | B;
    ```
- **元组**
  场景：在地图中，使用经纬度来标记位置信息

  可以使用数组来记录坐标，那么，该数组中只有两个元素，并且这两个元素都是数值类型

  ```typescript
  const position: number[] = [123, 456];
  ```

  使用 number[]的缺点，不严谨，因为该类型的数组中可以出现任意多个数字

  更好的方式:元组 Tuple

  元组类型是另一种类型的数组，它确切的知道包含多少个元素，以及特定索引对应的类型

  ```typescript
  const position: [number, number] = [123, 456];
  ```

  解释：

      1. 元组类型可以确切的标记出多少个元素，以及每个元素的类型
      2. 该示例中，元素有两个元素，每个索引元素的类型都是number类型

## 类型推导

自动推导出类型

```typescript
let age = 18;
```

在 ts 中，某些没有明确指出类型的地方，TS 的类型推论机制会帮助提供类型

换句话说，由于类型推论的存在，这些地方，类型注解可以不写

发生类型推论的 2 种常见场景：1 声明变量并初始化 2 决定函数的返回值

## 类型断言

在 TypeScript 中，类型断言（Type Assertion）是一种告诉编译器某个值的类型的方法。它与其他编程语言中的类型转换有些相似，但是在编译器中不进行实质性的转换或检查。TypeScript 的类型断言有两种形式：尖括号语法和 as 语法。

**尖括号语法:**

```typescript
let someValue: any = "This is a string";
let strLength: number = (<string>someValue).length;
// 或者
let anotherValue: any = "This is another string";
let length: number = (anotherValue as string).length;
```

**as 语法:**

```typescript
let someValue: any = "This is a string";
let strLength: number = (someValue as string).length;
```

## 字面量类型

在 TypeScript 中，字面量类型（Literal Types）是一种特殊的类型，用于约束变量只能取特定的字面量值。字面量类型包括字符串字面量类型、数字字面量类型、布尔字面量类型和对象字面量类型。

思考下面代码，两个变量的类型分别是什么

```typescript
let str1 = "Hello TS";
const str2 = "Hello TS";
```

通过 TS 的类型推导机制，可以得到答案：

1. 变量 str1 的类型为 string
2. 变量 str2 的类型为'Hello TS'

解释： 1. str1 使用的 let 声明的变量，它的值可以是任意字符串，所以类型是字符串 2. str2 使用的 const 声明的变量，它的值只能是'Hello TS'，所以类型是'Hello TS'

使用模式：字面量类型配合联合类型一起使用

使用场景：用来表示一组明确的可选值列表

比如，在贪吃蛇游戏中，游戏方向的可选值只能是上、下、左、右

```typescript
function changeDirection(direction: "up" | "down" | "left" | "right") {
  console.log(direction);
}
```

1.字符串字面量类型：

```typescript
let status: "success" | "error";
status = "success"; // 合法
status = "failure"; // 编译错误，只能是 "success" 或 "error"
```

2. 数字字面量类型：

```typescript
let age: 25 | 30 | 35;
age = 30; // 合法
age = 40; // 编译错误，只能是 25、30 或 35
```

3. 布尔字面量类型：

```typescript
let isTrue: true;
isTrue = true; // 合法
isTrue = false; // 编译错误，只能是 true
```

4. 对象字面量类型：

```typescript
let person: { name: "John"; age: 30 };
person = { name: "John", age: 30 }; // 合法
person = { name: "Jane", age: 25 }; // 编译错误，只能是 { name: "John", age: 30 }
```

5. 联合类型和类型别名的结合：

```typescript
type Status = "success" | "error";
let apiStatus: Status;
apiStatus = "success"; // 合法
apiStatus = "failure"; // 编译错误，只能是 "success" 或 "error"
```

字面量类型的主要优势在于它们提供了更精确的类型信息，使得代码更加清晰，同时通过字面量类型的约束，TypeScript 编译器能够更准确地进行类型检查。字面量类型通常在一些特定场景下用于确保变量只能取特定的值，从而增加代码的可读性和安全性。

## 枚举类型

枚举类型（Enum）是 TypeScript 中的一种特殊类型，枚举类型的功能类似于字面量类型 ➕ 联合类型组合的功能，也可以表示一组明确的可选值。

枚举： 定义一组命名常量，它描述一个值，该值可以是这些命名常量中的一个

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
function dieaction(direction: Direction) {
  console.log(direction);
}
dieaction(Direction.Up);
```

解释:

1. 使用 enum 关键字定义枚举
2. 约定枚举名称，枚举中的值以大写字母开头
3. 枚举中的多个值之间，逗号隔开
4. 定义好枚举后，直接使用枚举名称作为类型注解

问题: 我们把枚举成员作为了函数的实参，它的值是什么？

答：枚举成员是有值的，默认为：从 0 开始至增的数字

我们把，枚举成员的值为数字的枚举称为数字枚举

当然也可以给枚举成员初始值

```typescript
enum Direction {
  Up = 10,
  Down = 20,
  Left = 30,
  Right = 40,
}
```
