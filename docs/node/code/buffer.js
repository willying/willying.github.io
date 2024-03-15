// 创建一个长度为10，且用零来填充
const buf1 = Buffer.alloc(10)
console.log(buf1)
// 创建一个长度为10，且用01填充的buffer

const buf2 = Buffer.alloc(10, 1)
console.log(buf2)

// 创建一个长度为10，且为初始化的buffer
const buf3 = Buffer.allocUnsafe(10)

// 返回的buffer实例可能包含旧数据
// 因此需要使用fill()活着write()重写

console.log(buf3)

// 创建一个包含0x1,0x2,0x3的buffer
const buf4 = Buffer.from([1,2,3])

console.log(buf4)
