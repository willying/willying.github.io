"use strict";
// function fn<T>(value: T):T {
//   return value
// }
Object.defineProperty(exports, "__esModule", { value: true });
// const value1 = fn<number>(123)
// const value2 = fn<number[]>([1,2,3,4,5,6])
// value2.push(100)
function findMax(arr) {
    // 如果数组为空且没有提供初始值，则会抛出一个TypeError
    if (arr.length === 0) {
        return undefined;
    }
    return arr.reduce((max, current) => max > current ? max : current);
}
const res = findMax([1, 2, 3, 4, 5, 6]);
console.log(res);
