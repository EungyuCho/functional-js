import {find, go} from "../common/common.fx.js";

// const user = [{id: 1,name: 'jorn'}, {id: 2, name: 'min'}, {id: 3, name: 'su'}];
//
// console.log(find(u => u.id === 2, user));

go(
    Promise.resolve(1),
        a => a + 10,
        a => Promise.reject("ㅜㅜ"),
    a => a + 1000,
    a => a + 10000,
    console.log
).catch(a => console.log(a))