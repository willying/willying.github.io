// interface IData {
//   [key: string | symbol | number]: any;
// }

// const obj:IData = {
//   0: 'will',
//   1: '26',
// }

// console.log(obj); // 'will'

type Props = {
  a: number
  b: string
  c: boolean
}

type Type = {
  [key in keyof Props]: Props[key]
}

type Partial1<T> = {
  [key in keyof T]?: T[key]
}