// 创建一个长度为10，且用零来填充
const buf1 = Buffer.alloc(10)

buf1.write('hello', 'utf-8')
console.log(buf1.toString())
// 创建一个长度为10，且用01填充的buffer

const buf2 = Buffer.alloc(10, 1)
console.log(buf2)

// 创建一个长度为10，且为初始化的buffer
const buf3 = Buffer.allocUnsafe(10)

// 返回的buffer实例可能包含旧数据
// 因此需要使用fill()活着write()重写

console.log(buf3)

// 创建一个包含0x1,0x2,0x3的buffer
const buf4 = Buffer.from([1,2,3]) // 数组里面的每一个数字都会转换为二进制存到buffer中，如果是字符串，先找到对应字面的unicode编码，然后转换为16进制存储

console.log("willying",buf4)

const buf5 = Buffer.from([105,108,111,101,121,111,117]);

console.log(buf5.toString())
