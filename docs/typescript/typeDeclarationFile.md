# 类型声明文件

今天几乎所有的 javascript 运用都会引入许多第三方库来完成任务需求<br/>
这些第三方库不管是否是 TS 编写的，最终都要编译成 JS 代码，才能发布给开发者使用<br/>
我们知道是 TS 提供了类型，才有了代码提示和类型保护的机制<br/>
但是在项目开发使用第三方库时，你会发现它们几乎都有相应的 TS 类型，这些类型是怎么来的呢？类型声明文件<br/>
类型声明文件，用来为已存在的 JS 库提供类型信息<br/>
这样在 TS 项目使用这些库时，就想用 TS 一样，都会有代码提示，类型保护等机制了

## TS 中的两种文件类型

TS 中有两种文件类型，.ts 文件 和 .d.ts 文件

- .ts 文件：
  1. 即包含类型信息又可以执行代码
  2. 可以被编译为.js 文件，然后执行代码
  3. 用途，编写程序代码的地方
- .d.ts 文件：
  1. 只包含类型信息的类型声明文件
  2. 不会生成.js 文件，仅用于提供类型信息
  3. 用途，为 JS 提供类型信息

总结： .ts 是 implementation(代码实现文件);.d.ts 是 declaration(类型声明文件)

如果要为 JS 库提供类型信息，要使用.d.ts 文件

## 类型声明文件的使用说明

在做 TS 项目开发时，类型声明文件的使用包含以下两种方式：

1. 使用已有的类型声明文件

- 内置类型声明文件

      TS为JS运行时可用的所有标准化内置API都提供了声明文件
      比如，在使用数组时，数组所有方法都会有相应的代码提示以及类型信息

  ```typescript
  (method) Array<number>.forEach(callbackfn: (value: number, index: number, array: number[]) => void, thisArg?: any):void
  ```

      实际上这都是TS提供的内置类型声明文件
      可以通过ctrl加鼠标左键(command+鼠标左键)来查看内置类型声明文件的内容
      比如，查看forEach方法的类型声明，在vscode会自动跳转到lib.es5.d.ts类型声明文件中
      当然像window、document等DOM、DOM API也都有相应的类型声明(lib.dom.d.ts)

- 第三方库的类型声明文件

  第三方库的类型声明文件: 目前，几乎所有常用的第三方库都有相应的类型声明文件
  第三方库的类型声明文件有两种存在形式: 1 库自带类型声明文件 2 由 DefinitelyTyped 提供

  1. 库自带类型声明文件，比如 axios

  ![](/ts_typing.png)

  解释：这种情况下，正常导入该库，**TS 就会自动加载库自己的类型声明文件**，以提供库的类型声明

  @types/lodash @types/react @types/jquery

2. 创建自己的类型声明文件

   创建自己的类型声明文件： 1，项目内共享类型 2，为已有 JS 文件提供类型声明

   - 项目内共享类型，如果多个.ts 文件都用到同一个类型，此时可以创建.d.ts 文件，来提供该类型的类型声明，实现类型共享

     操作步骤:

     1. 创建 index.d.ts 文件
     2. 创建需要恭喜的类型，并使用 export 导出(TS 中的类型也可以使用 import/export 实现模块化功能)
     3. 在需要使用共享类型的.ts 文件中，通过 import 导入即可(.d.ts 后缀导入时，直接省略)

   - 为已有的项目提供类型声明：
     1. 在将 JS 项目迁移到 TS 项目时，为了让已有的.js 文件都有类型声明
     2. 成为裤作者，创建库给其他人使用

     说明，TS项目中也可以使用.js文件

     说明，在导入.js文件时，TS会自动加载与.js同名的.d.ts文件，以提供类型声明

     declare关键字，**用于类型声明，为其他地方(比如.js文件)已经存在的变量类型，而不是创建一个新的变量**
       
       1. 对于type、interface等这些明确的TS类型的(只能在TS中使用)，可以省略declare关键字

       2. 对于let，function等具有双重含义(TS和JS都能用)，应该使用declare关键字，明确指出此处用于类型声明