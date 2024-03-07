const sm: symbol = Symbol(123)
const add: (x:number,y:number) => number = (x,y) => x + y
add(1,2)

// 函数可选参数必须在必选参数后面
const greet = (name: string, greeting?: string) => {
  if (greeting) {
    return `${greeting}, ${name}`
  } else {
    return `hello ${greeting}`
  }
}
greet('will')


const person: {
  name: string,
  age: number,
  gender: string,
  hobby?: string[]
  [key: string]: any
} = {
  name: 'will',
  age: 26,
  gender: '男',
  hobby: ['学习','看电影','打游戏']
}
console.log(person)