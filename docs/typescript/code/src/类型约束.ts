function getPros<Type, Key extends keyof Type>(obj:Type, key:Key):Type[Key] {
  return obj[key]
}

const person = {
  name: "will",
  age: 26
}

console.log(getPros(person, "name"))