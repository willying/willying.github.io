class Animal {
  color: string;
  constructor(color: string) {
    this.color = color;
  }
}

class Dog extends Animal {
  name: string;
  constructor(color: string, name: string) {
    super(color);
    this.name = name;
  }
  bark() {
    console.log("Woof!");
  }
}

let animal = new Animal("黄色");
let dog: Animal = new Dog("黄色", "多多");
console.log(dog.color);

interface SuperType {
  name: string;
}

interface SuperType2 {
  name: string;
}

interface SuperType3 {
  name: string;
  age: number;
  gender: string;
}

let p1: SuperType = {
  name: "will",
};

let p2: SuperType2 = p1;

let p3: SuperType3 = {
  name: "will",
  age: 26,
  gender: "男",
};

p2 = p3;
