const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const take = curry((l, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        res.push(a);
        if (res.length == l) return res;
    }
    return res;
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
    for (const a of iter) yield f(a);
});

L.filter = function* (f, iter) {
    for (const a of iter) {
        if (f(a)) yield a;
    }
};

const map = curry(pipe(L.map, takeAll));

const filter = curry(pipe(L.filter, takeAll));

const reduce = curry((f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    } else {
        iter = iter[Symbol.iterator]();
    }
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        acc = f(acc, a);
    }
    return acc;
});


L.entries = function* (obj) {
    for (const k in obj) yield [k, obj[k]];
};

const join = curry((sep = ',', iter) =>
    reduce((a, b) => `${a}${sep}${b}`, iter));


export {map, filter, reduce, go, pipe, curry, take, L, join};