namespace payment {
  export function doPayment() {
    console.log("Payment processed successfully.");
  }
}

interface IPerson {}

function add<T>(a:T,b:T): T | undefined {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b as T;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a.concat(b) as T;
  } else {
    return a as any + b as any;
  }
}

const res = add<number>(1,2)
const res2 = add<string>('hello','world')
const res3 = add<number | string>(1,'2')
console.log(res2)
console.log(res3)
payment.doPayment()