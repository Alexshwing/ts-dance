interface Array<T> {
  myFlat(): unknown;
}

const arr3 = [[1], [[2], 3]];

console.log(arr3.flat(Infinity));

// 1. reduce + 递归
function reduceFn(arr: any[]) {
  return arr.reduce(
    (prev, cur) => prev.concat(Array.isArray(cur) ? reduceFn(cur) : cur),
    []
  );
}

// 2. toString
function toStringFn(arr: any[]) {
  return arr.toString().split(',').map(Number);
}

// 3. 拓展运算符 + some + concat
function expandFn(arr: any[]) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

Array.prototype.myFlat = function () {
  // const ans = reduceFn(this)
  // const ans = toStringFn(this)
  const ans = expandFn(this);
  return ans;
};

console.log(arr3.myFlat());
