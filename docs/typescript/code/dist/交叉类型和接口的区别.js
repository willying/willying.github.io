"use strict";
// interface A {
//   fn: (value: number) => string
// }
// interface B extends A {
//   fn: (value: string) => string
// }
Object.defineProperty(exports, "__esModule", { value: true });
const obj = {
    fn: (value) => {
        return value.toString();
    }
};
