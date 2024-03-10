// interface A {
//   fn: (value: number) => string
// }
// interface B extends A {
//   fn: (value: string) => string
// }


interface A {
  fn: (value: number) => string
}

interface B {
  fn: (value: string) => string
}

type C = A & B

const obj: C = {
  fn: (value: string | number) => {
    return value.toString()
  }
}