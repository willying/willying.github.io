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

可以把 TS 中的常用基础类型分为两大类：1 JS 已有类型 2 TS 新增类型

1.  JS 已有类型
    - 原始类型（number,string,null,undefined,symbol, boolean
    - 引用类型 （object 包含数组、对象、函数等对象）<br/>
      特点对象类型在 TS 中更加细化，每个具体的对象都有自己的类型语法 - 数组类型的两种写法：（推荐使用 number[]写法）
    ```typescript
    const numbers: number[] = [1, 2, 3];
    const strings: Array<string> = ["a", "b", "c"];
    ```
2.  TS 新增类型

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