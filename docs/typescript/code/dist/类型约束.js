"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPros(obj, key) {
    return obj[key];
}
const person = {
    name: "will",
    age: 26
};
console.log(getPros(person, "name"));
