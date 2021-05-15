import {filter, map, reduce, go, curry, take, L, pipe } from "../common/common.fx.js";

const products = [
    { name: '반팔티', price: 15000, quantity: 1 },
    { name: '긴팔티', price: 20000, quantity: 2 },
    { name: '핸드폰케이스', price: 5000, quantity: 3 },
    { name: '후드티', price: 30000, quantity: 4 },
    { name: '바지', price: 25000, quantity: 5 },
];

console.log(flatMap(map(p => p.price, products)))
console.log()

const add = (a, b) => a + b;
const sum = curry((f, iter) => go(
    iter,
    map(f),
    reduce(add)));

const total_quantity = sum(p => p.quantity);
const total_price = sum(p => p.quantity * p.price);
console.log(total_quantity(products));
console.log(total_price(products));

const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) {
        res.push(i);
    }
    return res;
};

var list = range(4);
console.log(list);
console.log(reduce(add, list));


var list = L.range(4);
console.log(list);
console.log(reduce(add, list));

console.log(take(5, range(100)));
console.log(take(5, L.range(100)));

var it = L.filter(a => a % 2, [1, 2, 3]);
console.log(...it);                 // 1, 3;

go(range(10),
    map(n => n + 10),
    filter(n => n % 2),
    take(2),
    console.log);