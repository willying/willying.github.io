function* f() {
  yield 1
  console.log(123)
  yield* [2,3,4,5,6]
}

const a = f()
console.log(a.next())
console.log(a.next())
console.log(a.next())
console.log(a.next())
console.log(a.next())
console.log(a.next())
console.log(a.next())