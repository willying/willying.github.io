import './css/index.css'
import './sass/index.scss';
import { add } from './util'
import img from './img/logo.jpeg'
console.log(img)
const num = 100;
const res = add(num, 200);
console.log(res)
console.log(res + 100)

console.log("嘿嘿")
console.log("will 真帅")

let arr = [1,2,3,4,5,6]
arr = arr.map((item,index) => item + 1)

Promise.resolve().then(() => {
  console.log(9999)
})

class Person {
  constructor(name,age) {
    this.name = name
    this.age = age
  }
}

function p() {
  return new Promise((resolve,reject) => {
    resolve(123)
  })
}

async function fn() {
  const res = await p()
  console.log(res)
}
fn()

const set = new Set([1,2,3,4,5])
console.log(set,"will")


const myConcat = (a,b) => a + b;
console.log(myConcat(1,2),'willying123')
const res1 = myConcat("2",'2')
console.log(res1 + 100)