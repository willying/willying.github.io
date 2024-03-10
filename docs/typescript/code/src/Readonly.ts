interface IPerson {
  name: string
  age: number
  gender: string
}

type ReadonlyPerson = Readonly<IPerson>

const person: ReadonlyPerson = {
  name: "will",
  age: 26,
  gender: '男'
}

// person.age = 27