import {go, join, map, pipe, reduce, L, filter, take, curry} from "../common/common.fx.js";


const queryStr =  pipe(
    L.entries,
    L.map(([k, v]) => `${k}=${v}`),
    join('&'),
    console.log
);

queryStr({ limit: 10, offset: 10, type: 'notice'});

// take, find
const users = [
    {age: 32},
    {age: 31},
    {age: 37},
    {age: 28},
    {age: 25},
    {age: 32},
    {age: 21},
];

const find = curry((f, iter) => go(
    iter,
    filter(f),
    take(1),
    ([a]) => a));

console.log(find(u => u.age < 30)(users));

go(users,
    L.map(u => u.age),
    find(n => n < 30),
    console.log);

console.log(map(a => a + 10, L.range(4)));

const isIterable = a => a && a[Symbol.iterator];

L.flatten = function *(iter) {
    for (const a of iter) {
        if (isIterable(a)) {
            for (const b of a)
                yield b;
        }
        else yield a;
    }
}

var it = L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9], [10, 11]]);
console.log(...it);