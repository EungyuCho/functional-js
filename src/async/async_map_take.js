import { go, take, L, takeAll, map } from "../common/common.fx.js";

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map(a => a + 10),
  take(2),
  console.log
);

go(
  [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
    Promise.resolve(4),
    Promise.resolve(5)
  ],
  map(a => a + 10),
  takeAll,
  console.log
);

go(
  [1, 2, 3],
  L.map(a => Promise.resolve(a + 10)),
  takeAll,
  console.log
);

go(
  [1, 2, 3],
  L.map(a => a + 10),
  takeAll,
  console.log
);

go(
  [1, 2, 3],
  L.map(a => a + 10),
  takeAll,
  console.log
);
