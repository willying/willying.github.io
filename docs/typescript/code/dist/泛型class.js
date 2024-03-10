"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericNumber {
    constructor(defaultValue, add) {
        this.defaultValue = defaultValue;
        this.add = add;
    }
}
const add = (x, y) => x + y;
const myNum = new GenericNumber(100, add);
myNum.add(1, 2);
