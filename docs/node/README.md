# Buffer

Buffer 是 Node.js 中用于处理二进制数据的类。它允许您在应用程序中以字节流的形式处理数据，这在处理网络流、文件系统操作、加密操作等方面非常有用

**Buffer 实例类似于整数数组，但其大小固定，且其中包含的是原始二进制数据，而不是 JavaScript 值。这使得 Buffer 在处理大量二进制数据时效率更高，因为它们不受 JavaScript 垃圾回收的影响**

以下是 Buffer 的一些常见用途：

1. 网络数据传输： 在处理网络数据时，经常需要将数据转换为 Buffer。例如，在创建 TCP 或 UDP 服务器时，接收到的数据是以 Buffer 的形式传输的。
2. 文件系统操作： 当读取或写入文件时，数据通常以 Buffer 的形式传输。这包括读取文件内容、写入文件内容以及文件复制等操作。
3. 加密操作： 许多加密操作需要处理原始的二进制数据，例如加密、解密、哈希等。Buffer 是处理这些数据的理想选择。
4. 处理图像、音频和视频等多媒体数据： 图像、音频和视频等多媒体数据都是以二进制格式存储的。Buffer 可以帮助您处理这些数据，例如加载图像文件、处理音频流等。
5. 缓存： 在某些情况下，您可能需要暂时存储一些数据以供稍后使用，Buffer 可以作为缓存区。

在 Node.js 中创建 Buffer 有多种方式，包括：

- 使用 Buffer 类的构造函数创建新的 Buffer 实例。
- 使用字符串和编码来创建 Buffer。例如，可以使用 Buffer.from() 方法。
- 使用 ArrayBuffer 和 TypedArray 来创建 Buffer。

注意：

需要注意的是，由于 Buffer 在处理大量数据时效率很高，但也会占用较多的内存。因此，在使用 Buffer 时应该注意内存的管理，避免出现内存泄漏等问题。此外，由于 Buffer 存在内存不安全的特性，因此在使用时需要特别注意安全性

## Buffer 的操作与注意事项

- Buffer 与字符串的转换

```js
let buf = Buffer.from([105, 108, 111, 101, 121, 111, 117]);
console.log(buf.toString()); // 输出 "iloeyou"
```

- Buffer 的读写

```js
const buf = Buffer.from("hello");
console.log(buf[0]); // 104 10进制表示
console.log(buf[0].toString(2)); // 01101000 2进制表示
buf[0] = 95;
console.log(buf);

buf[0] = 361; // 溢出，8个二进制能存储最大10进制是255，舍弃高位数字

const buf1 = Buffer.from("你好"); // 一个utf-8的中文一般占三个字节
console.log(buf1); // <Buffer e4 bd a0 e5 a5 bd>
```

## 计算机基本组成
- windos查看进程开启的线程
```shell
pslist -dmx 9451（进程号)
```
