// This is a JavaScript coding problem from BFE.dev
type Func = (arr: Array<any>, depth?: number) => Array<any>;

const flat: Func = function (arr, depth = 1) {
  return depth
    ? arr.reduce(
        (prev, cur) =>
          prev.concat(Array.isArray(cur) ? flat(cur, depth - 1) : cur),
        []
      )
    : arr;
};

// test
const arr = [1, [2], [3, [4]]];

console.log(flat(arr));
// [1, 2, 3, [4]]

console.log(flat(arr, 1));
// [1, 2, 3, [4]]

console.log(flat(arr, 2));
// [1, 2, 3, 4]

export {};
