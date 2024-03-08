class Person {
  readonly name: string
  protected age:number
  gender: string
  private hobby: string[]
  constructor(name: string, age: number, gender: string, hobby: string[] = []) {
    this.name = name
    this.age = age
    this.gender = gender
    this.hobby = hobby
  }
  sayName() {
    console.log(`My name is ` + this.name)
  }
  changeName(name: string) {
    // this.name = name
  }
}
const p = new Person('will', 26, '男', ['学习','打游戏'])
// console.log('willying', p.age)
console.log(p.gender)
p.sayName()


class Teacher extends Person {
  constructor(name: string, age: number, gender: string, hobby: string[] = []) {
    super(name, age, gender, hobby)
  }
  sayAge() {
    console.log(this.age)
  }
}

const allen = new Teacher('will', 30, '男', ['学习','打游戏'])

allen.sayAge()