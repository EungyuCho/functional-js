const map = (f, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(f(a));
    }
    return res;
};

const filter = (f, iter) => {
    let res = [];
    for (const a of iter) {
        if (f(a)) res.push(a);
    }
    return res;
};

const reduce = (f, acc, iter) => {
    if (!iter) {                            // 2번째 인자인 acc(초기값)가 없을 경우, iter.next() 를 초기값으로 설정해준다.
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
};

export {map, filter, reduce};

