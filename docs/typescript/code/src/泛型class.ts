class GenericNumber<NumType> {
  defaultValue: NumType
  add: (x: NumType, y: NumType) => NumType
  constructor(defaultValue: NumType, add: (x: NumType, y: NumType) => NumType) {
    this.defaultValue = defaultValue
    this.add = add
  }
}

const add = (x: number, y: number) => x + y
const myNum = new GenericNumber(100, add)

myNum.add(1, 2)