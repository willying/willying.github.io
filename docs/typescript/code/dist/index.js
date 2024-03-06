"use strict";
var payment;
(function (payment) {
    function doPayment() {
        console.log("Payment processed successfully.");
    }
    payment.doPayment = doPayment;
})(payment || (payment = {}));
function add(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    else if (typeof a === 'string' && typeof b === 'string') {
        return a.concat(b);
    }
    else {
        return a + b;
    }
}
const res = add(1, 2);
const res2 = add('hello', 'world');
const res3 = add(1, '2');
console.log(res2);
console.log(res3);
payment.doPayment();
