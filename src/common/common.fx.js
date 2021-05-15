const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const isIterable = a => a && a[Symbol.iterator];

const go1 = (a, f) => a instanceof  Promise ? a.then(f) : f(a)

const take = curry((l, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    return function recur() {
        let cur;
        while (!(cur = iter.next()).done) {
            const a = cur.value;
            if (a instanceof Promise) return a.then(a => (res.push(a), res).length === l ? res : recur());
            res.push(a);
            if (res.length === l) return res;
        }
        return res;
    }();
});

const takeAll = take(Infinity);

const L = {};

L.range = function* (l) {
    let i = -1;
    while (++i < l) {
        yield i;
    }
};

L.map = curry(function *(f, iter) {
    for (const a of iter) yield go1(a, f);
});

L.filter = function* (f, iter) {
    for (const a of iter) {
        if (f(a)) yield a;
    }
};

L.flatten = function *(iter) {
    for (const a of iter) {
        if (isIterable(a)) yield *a;
        else yield a;
    }
}

L.deepFlat = function *f(iter) {
    for (const a of iter) {
        if (isIterable(a)) yield *f(a);
        else yield a;
    }
}

L.flatMap = curry(pipe(L.map, L.flatten))

const map = curry(pipe(L.map, takeAll));

const filter = curry(pipe(L.filter, takeAll));

const reduce = curry((f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    } else {
        iter = iter[Symbol.iterator]();
    }
    return go1(acc, function recur(acc){
        let cur;
        while (!(cur = iter.next()).done) {
            const a = cur.value;
            acc = f(acc, a);
            if (acc instanceof Promise) return acc.then(recur);
        }
        return acc;
    });
});


L.entries = function* (obj) {
    for (const k in obj) yield [k, obj[k]];
};

const find = curry((f, iter) => go(
    iter,
    L.filter(f),
    take(1),
    ([a]) => a));

const join = curry((sep = ',', iter) =>
    reduce((a, b) => `${a}${sep}${b}`, iter));


export {map, filter, reduce, go, pipe, curry, take, L, join, takeAll, find};