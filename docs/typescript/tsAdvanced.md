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

## 实例属性初始化

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

## 构造函数

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

## 实例方法

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

## 类的继承

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

## implements 继承

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

## class 类的可见修饰符

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

## TS 类型兼容性说明

两种类型系统：1 Structural Type System 结构类型系统 2 Nominal Type System 标示类型系统

TS 采用的是结构化类型系统，也叫 duck typing(鸭子类型)，类型检查关注的是值具有的形状<br/>
也就是说，在结构化类型系统中，如果两个对象具有相同的形状，则认为他们属于同一类

```typescript
interface Animal {
  name: string;
}

interface Dog {
  name: string;
  breed: string;
}

let animal: Animal;
let dog: Dog;

animal = dog; // 兼容，因为 Dog 包含 Animal 的所有属性
// dog = animal; // 不兼容，因为 Animal 不包含 Dog 的所有属性

// 函数兼容性
let func1 = (x: number) => {};
let func2 = (x: number, y: number) => {};

func2 = func1; // 兼容
// func1 = func2; // 不兼容，因为 func1 的参数个数少于 func2

// 数组兼容性
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3, 4];

arr1 = arr2; // 兼容，因为 Array<number> 兼容于 number[]
// arr2 = arr1; // 不兼容，因为 arr1 的长度少于 arr2
```

解释：

1. Print 和 Print2D 是两个不同的类型
2. 变量 P 的类型被显示的标注为 Print 类型，但是，它却是 Print2D 的实例，并没有发生类型错误
3. 因为 TS 是结构化类型系统，只检查 Point 和 Porint2D 的结构是否相同
4. 但是，如果在 Nominal Type System 中，比如 Java，C#等，它们是不同的类，类型无法兼容

- 对象类型的兼容性

      注意，在结构化类型系统中，如果两个对象具有相同的形状，则认为他们属于同一类型，这种说法并不准确
      更准确的说法是Y的成员至少与X相同，则X兼容Y(成员多的可以赋值给成员少的)

  ```typescript
  interface Person {
    name: string;
    age: number;
  }

  // 对象兼容性示例
  let person1: Person = { name: "Alice", age: 30 };
  let person2 = { name: "Bob", age: 25, gender: "male" };

  person1 = person2; // 兼容，因为person1包含了person2的所有必需成员
  person2 = person1; // 不兼容，因为person2缺少了person1中的gender属性
  ```

- 接口之间的类型兼容性

      接口的类型兼容类似与class，并且class与interface之间也可以兼容

  ```typescript
  interface Shape {
    color: string;
  }

  interface Circle {
    color: string;
    radius: number;
  }

  let shape: Shape;
  let circle: Circle = { color: "red", radius: 10 };

  shape = circle; // 兼容，因为Shape接口包含了Circle接口的color属性
  ```

- 函数之间类型的兼容性

      函数之间的兼容情况比较复杂，需要考虑： 1. 参数个数 2. 参数类型 3. 返回值类型

      参数个数，参数多的兼容参数少的（或则说参数少的可以赋值给参数多的）

  ```typescript
  // 基本类型参数
  type F1 = (a: number) => void;
  type F2 = (a: number, b: number) => void;
  F2 = F1; // 兼容
  F1 = F2; // 不兼容

  const arr = ["a", "b", "c"];
  arr.forEach(() => {});
  arr.forEach((item) => {});

  // 引用类型参数
  interface IPerson {
    name: string;
    age: number;
  }

  let personData = function (data: IPerson) {
    console.log(data.name, data.age);
  };

  let personData2 = function (data: { name: string }) {};
  personData = personData2;

  // 函数返回值类型兼容

  interface IPerson {
    name: string;
    age: number;
  }

  let personData = function (data: IPerson): IPerson {
    return data;
  };

  let personData2 = function (data: IPerson): {
    name: string;
  } {
    return {
      name: data.name,
    };
  };

  personData2 = personData;
  ```

  解释:

  1. 参数少的可以赋值给参数多的
  2. 数组 forEach 方法的第一个参数是回调函数，该示例中类型为(value: string,index: number,array: string[]) => void
  3. 在 JS 中省略用不到的函数参数实际上是很常见的，这样的使用方式，促成了 TS 中函数类型之间的兼容性
  4. 并且回调函数是有类型的，所以，TS 会自动推导出 item,index,array 的类型

## 交叉类型

交叉类型(&)：功能类似于接口继承，(extends),用于组合多个类型为一个类型（常用于对象类型），比如

```typescript
interface Person {
  name: string;
}
interface Contact {
  phone: string;
}
type PersonDetail = Person & Contact;
const obj: PersonDetail = {
  name: "xxx",
  phone: "123",
};
```

解释: 使用交叉类型后，新的 PersonDetail 类型包含了 Person 和 Contact 的成员，相当于

```typescript
type PersonDetail = {
  name: string;
  phone: string;
};
```

## 交叉类型和接口之间的对比

交叉类型&,和接口继承 extends 的对比:

- 相同点：都可以实现对象类型的组合
- 不同点，两种方式实现类型组合时，对于同名属性之间，处理类型冲突的方式不同

```typescript
interface A {
  fn: (value: number) => string;
}
interface B extends A {
  fn: (value: string) => string;
}
// 报错
interface C {
  fn: (value: number) => string;
}
interface D {
  fn: (value: string) => string;
}
type E = C & D;
// 不会报错
```

说明：以上代码，接口继承会报错（类型不兼容），交叉类型没有报错，可以简单理解为

```typescript
fn: (value: number) => string | (value: string) => string;
```

## 泛型

泛型是可以在保证类型安全的情况下，让函数等多种类型一起工作，从而实现复用，常用于函数，接口，class 中。

需求，创建一个 id 函数，传入什么数据，就返回该数据本身（也就是说参数和返回值类型相同）

```typescript
function id<T>(value: T): T {
  return value;
}
```

解释:

1. 语法，在函数名称后面添加<>,尖括号中添加类型变量，比如此处的 Type
2. 类型遍历 Type，是一种特殊类型的变量，它处理类型而不是值
3. 该类型变量相当于一个类型容器，能够捕获用户提供的类型（用户是什么类型，由用户调用函数时指定）
4. 因为 Type 是类型，因此可以将其作为函数参数和返回值的类型，表示参数和返回值具有相同的类型
5. 类型变量 Type，可以是任何合法的变量名称
   泛型在保证类型安全（不会丢失类型信息）的同时，可以让函数等与多种不同的类型一起工作，灵活可复用

实际上，在 C#和 Java 等编程语言中，泛型都是用来实现可复用组件功能的主要工具之一

## 简化泛型函数的调用

```typescript
function id<T>(value: T): T {
  return value;
}
const num = id(10);
```

解释:

1. 在调用泛型函数时，可以省略<类型>来简化泛型函数调用
2. 此时，TS 內部会采用一种叫做类型推断的机制，来根据传入的实参自动推断泛型变量 Type 的类型
3. 比如，如果传入的参数是 10，TS 会自动推断出 num 的类型 number，并作为 Type 的类型值

推荐使用简化的方式来调用泛型函数，使用代码更短，易于阅读

说明，当编译器无法推断类型或者推断的类型不正确，就需要显示的传入类型参数

## 泛型约束

泛型约束: 默认情况下，泛型函数的类型变量 Type 可以代表任何类型，但有时，需要对泛型函数的类型变量进行约束，以限制其类型范围

```typescript
function getLength<T>(value: T): Type {
  console.log(value.length); // 报错
  return value;
}
```

解释: Type 可以表示任意类型，无法保证一定存在 length 属性，比如 number 类型就没有 length

此时，就需要为泛型添加类型约束来**收缩类型**

添加泛型的类型约束，主要有以下两种方式： 1：指定更加具体的类型 2：添加约束

**1. 指定更加具体的类型**

```typescript
function id<Type>(value: Type[]): Type[] {
  console.log(value.length);
  return value;
}
```

比如，将参数改为 Type[],因为只要是数组就一定存在 length 属性，因为就可以访问了

**2. 添加类型约束 extends**

```typescript
interface IWithLength {
  length: number;
}
function id<Type extends IWithLength>(value: Type): Type {
  console.log(value.length);
  return value;
}
```

解释:

1. 创建描述约束的接口 ILength，该接口要求提供 length 属性
2. 通过 extends 关键字，为泛型(类型变量)添加约束
3. 该约束表示：**<span style="color:red">传入的参数必须具有 length 属性</span>**

注意：传入的实参，（比如数组）只要具有 length 属性即可，这也符合前面讲到的接口的类型兼容性

## 多个泛型变量的情况

泛型的类型变量可以有多个，并且类型变量之间还可以约束，(比如第二个类型变量受第一个类型变量的约束)

```typescript
function getProp<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
let person = { name: "张三", age: 30 };
getProps(person, "name"); // 正确
```

解释:

1. 添加了第二个类型变量 key,两个类型变量之间使用,隔开
2. keyof 关键字接受一个对象类型，生成其键名称(可能是字符串或者数字)的联合类型
3. 本示例中 keyof Type 实际上获取的是 person 对象所有键的联合类型，也就是 'name' | 'age'
4. 类型变量 key 受 Type 约束,可以理解为：key 可能是 Type 所有键中的任何一个，或者只能访问对象中存在的键

## 泛型接口

泛型接口: 接口也可以配合泛型使用，以增加其灵活性，增强复用性

```typescript
interface IdFunc<Type> {
  id: (value: Type) => Type;
  ids: () => Type[];
}

let obj: IdFunc<number> = {
  id: (value) => value,
  ids: () => [1, 2, 3],
};
```

解释:

1. 在接口名称的后面添加<类型变量>那么，这个接口也就变成了泛型接口
2. 接口的类型变量，对接口所有其他成员可见，也就是接口中所有成员都可以使用类型变量
3. 使用泛型接口时，需要显示指定具体的类型，比如 IdFunc\<number\>
4. 此时，id 方法的参数和返回值类型都是 number，ids 方法的返回值类型是 number[]

## 数组是泛型接口

实际上，JS 中的数组在 TS 中就是一个泛型接口

当我们使用数组时，TS 会根据数组的不同类型，来自动将类型变量设置为相应的类型

技巧：可以通过 Ctry + 鼠标左键(command + 鼠标左键)来查看接口的类型定义

## 泛型类

泛型类： class 也可以配合泛型类使用

比如 React 的 class 组件的基类 Component 就是泛型类，不同组件有不同的 props 和 state

```typescript
interface IState {
  count: number;
}
interface IPros {
  maxLength: number;
}
class InputCount extends React.Component<IProps, IState> {
  state: IState = { count: 0 };
  render() {
    return (
      <div>
        <p>{this.props.maxLength}</p>
      </div>
    );
  }
}
```

解释：React.Component 泛型类两个变量，分别指 props 和 state 的类型

创建泛型类

```typescript
class Stack<T> {
  private elements: T[] = [];

  push(element: T): void {
    this.elements.push(element);
  }

  pop(): T | undefined {
    return this.elements.pop();
  }

  peek(): T | undefined {
    return this.elements[this.elements.length - 1];
  }

  isEmpty(): boolean {
    return this.elements.length === 0;
  }
}

// 使用示例
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);

console.log(numberStack.pop()); // 输出: 3
console.log(numberStack.peek()); // 输出: 2

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");

console.log(stringStack.pop()); // 输出: world
console.log(stringStack.peek()); // 输出: hello
```

类似与泛型接口，在创建 class 实例时，在类后面通过<类型>来指定明确的类型

## 泛型工具类型 Partial

在 TypeScript 中，Partial\<T\> 是一个泛型类型，它将类型 T 中的所有属性设置为可选的。这意味着使用 Partial\<T\> 包装的类型 T 中的所有属性都变为可选的，可以选择性地提供这些属性的值。

```typescript
interface User {
  id: number;
  name: string;
  age: number;
}

// 使用 Partial<User> 将 User 类型的属性变为可选
function updateUser(user: User, update: Partial<User>): User {
  return { ...user, ...update };
}

const existingUser: User = { id: 1, name: "Alice", age: 30 };

const updatedUser = updateUser(existingUser, { name: "Alice Smith" });
console.log(updatedUser); // 输出: { id: 1, name: 'Alice Smith', age: 30 }

const partialUpdate: Partial<User> = { age: 31 };
const updatedUser2 = updateUser(existingUser, partialUpdate);
console.log(updatedUser2); // 输出: { id: 1, name: 'Alice', age: 31 }
```

## 泛型工具类型 Readonly

在 TypeScript 中，ReadOnly\<T\> 是一个内置的类型，它可以用来创建一个只读版本的类型 T。这意味着使用 ReadOnly\<T\> 包装的类型 T 中的所有属性都变为只读的，不能被修改。

```typescript
interface Point {
  x: number;
  y: number;
}

const point: ReadOnly<Point> = { x: 10, y: 20 };

// 下面的操作会导致 TypeScript 报错，因为 point 是只读的
// point.x = 5; // Error: Cannot assign to 'x' because it is a read-only property

// 可以正常访问属性的值
console.log(point.x); // 输出: 10
console.log(point.y); // 输出: 20
```

## 泛型工具类型 Pick

在 TypeScript 中，Pick\<T, K\> 是一个内置的类型工具，用于从类型 T 中选择指定属性集合 K，并创建一个新的类型。这意味着使用 Pick\<T, K\> 可以从原始类型 T 中选择部分属性，形成一个新的类型。

```typescript
interface Person {
  name: string;
  age: number;
  address: string;
}

// 从 Person 类型中选择 name 和 age 属性，创建一个新的类型
type BasicInfo = Pick<Person, "name" | "age">;

const person: BasicInfo = { name: "Alice", age: 30 };
console.log(person); // 输出: { name: 'Alice', age: 30 }

// 下面的操作会导致 TypeScript 报错，因为 address 不在 BasicInfo 类型中
// const person2: BasicInfo = { name: 'Bob', age: 25, address: '123 Street' };
// Error: Object literal may only specify known properties, and 'address' does not exist in type 'BasicInfo'.
```

## 泛型工具类型 Record

在 TypeScript 中，Record\<K, T\> 是一个内置的类型工具，用于创建一个包含指定键类型 K 和值类型 T 的新对象类型。它可以用来定义一个具有特定键类型和值类型的对象。

```typescript
// 创建一个对象，键是 string 类型，值是 number 类型
type Ages = Record<string, number>;

const ages: Ages = {
  Alice: 30,
  Bob: 25,
  Charlie: 35,
};

console.log(ages);
// 输出: { Alice: 30, Bob: 25, Charlie: 35 }

// 下面的操作会导致 TypeScript 报错，因为值的类型不是 number
// const ages2: Ages = {
//   Alice: '30',
//   Bob: 25,
// };
// Error: Type 'string' is not assignable to type 'number'.
```

## 索引签名类型

绝大多数情况下，我们都可以在使用对象前就确定对象的结构，并为对象添加准确的类型

使用场景：当无法确定对象中有哪些属性的时候（或者说对象中可以出现多个属性），此时就用到了索引签名类型。

```typescript
interface Person {
  [key: string]: string | number;
}
const obj: Person = {
  name: "will",
  age: 26,
};
```

解释:

1. 使用[key:string]来约束该接口中允许出现的属性名称，表示只要是 string 类型的属性名称，都可以出现在对象中
2. 这样 obj 中就可以出现任意多个属性
3. key 只是一个占位符，可以换成任意合法的变量名称
4. 隐藏的前置知识，JS 中对象({})的键是 string 类型的

## 映射类型

映射类型：基于旧类型创建新类型(对象类型)，减少重复，提升开发效率

比如，类型 PropKeys 有 x/y/z，另一个类型 Type1 中也 x/y/z，并且 Type1 中 x/y/z 的类型相同

```typescript
type PropsKeys = "x" | "y" | "z";
type Type1 = {
  x: number;
  y: number;
  z: number;
};
```

这样写没错，但是 x/y/z 重复写了两次，像这种情况，就可以使用映射类型来简化代码

```typescript
type PropsKeys = "x" | "y" | "z";
type Type1 = {
  [Key in PropsKeys]: number;
};

interface Type2 {
  [Key in PropsKeys]: number;
}
// 映射类型不能在接口中使用，只能在类型别名中使用
```

解释：

1. 映射类型是基于索引签名的，所以，该语法类似于索引签名类型，也使用[]
2. Key in PropKeys 表示 Key 可以是 PropKeys 联合类型中的任意一个，类似于 for(let key in obj)
3. 使用映射类型创建新对象类型 Type2 和类型 Type1 结构完全相同
4. 注意： **映射类型只能在类型别名中使用，不能在接口中使用**

## 映射类型 keyof

映射类型除了根据联合类型创建新类型外，还可以根据对象类型来创建

```typescript
type Props = {
  a: number;
  b: string;
  c: boolean;
};
type Type3 = {
  [key in keyof Props]: Props[key];
};
```

解释：

1. 首先，先执行 keyof Props 获取对象类型 Props 中所有键的联合类型，"a" | "b" | "c"
2. 然后，key in ... 就表示 key 可以是 Props 中所有键名称中的任意一个

## 分析 Partial 的内部实现

```typescript
type Partial1<T> = {
  [key in keyof T]?: T[key];
};

type Props = {
  a: number;
  b: string;
  c: boolean;
};
type PartiaalProps = Partial1<Props>;
```

解释:

1. keyof T 即 keyof Props 表示获取 Props 的所有键，也就是'a' | 'b' | 'c'
2. 在[]号后面添加?号，表示这些属性变为可选的，以此来实现 Partial 的功能
3. 冒号后面的 T\[key\]表示从 T 中获取每一个键对应的类型，比如'a'类型是 number，'b'类型是 string
4. 最终，新类型 PartialProps 和旧类型 Props 结构完全相同，只是让所有类型变为可选的

## 索引查询类型(基本使用)

刚刚用到的 T\[key\]语法，在 TS 中叫做索引查询类型

作用，用来查询属性的类型

```typescript
type Props = {
  x: number;
  y: string;
  z: boolean;
};
type TypeX = Props["x"];
```

解释： Props['x']表示查询类型 Props 中属性'x'对应的 number，所以，TypeA 的类型为 number

注意: \[\-]中的属性必须存在于被查询类型中，否则会报错

## 索引查询类型(同时查询多个)

索引查询类型的其他使用方式，同时查询多个索引的类型

```typescript
type Props = {
  a: number;
  b: string;
  c: boolean;
};
type TypeA = Props["a" | "b"]; // string | number
```

解释: 使用字符串字面量的联合类型，获取属性 a 和 b 对应的类型，结果为 string | number

```typescript
type TypeA = Props[keyof Props]; // string | number | boolean
```

解释: 使用 keyof 操作符获取 Props 中所有键对应的类型，结果为 string | number | boolean
