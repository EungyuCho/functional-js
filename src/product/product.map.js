import {filter, map, reduce, go, pipe, curry} from "../common/common.fx.js";

const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 5000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 },
];

const add = (a, b) => a + b;

console.log(
    reduce(
    add,
    map(p => p.price,
        filter(p => p.price < 20000, products))));     // 30000


console.log(
    reduce(
        add,
        filter(n => n >= 20000,
            map(p => p.price, products)))     // 30000
);

const f = pipe(
    (a, b) => a + b,
    a => a + 10,
    a => a + 100
);

console.log(f(0, 1));
const total_price = pipe(
    map(p => p.price),
    reduce(add));
const base_total_price = predi => pipe(
    filter(predi),
    total_price);

go(
    products,
    base_total_price(p => p.price < 20000),
    console.log
);

const mult = curry((a, b) => a * b);
console.log(mult(3)(2));
const mult3 = mult(3);
console.log(mult3(2));