interface Array<T> {
  myFilter(
    predicate: (value: number, index: number, array: number[]) => unknown,
    thisArg?: any
  ): {}[];
}
const arr2 = [0, 2, 4];

console.log(arr2.filter((item, i) => item > i));

Array.prototype.myFilter = function (cb) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    const ans = cb(this[i], i, this);
    if (ans) {
      res.push(this[i]);
    }
  }
  return res;
};

console.log(arr2.myFilter((item, i) => item > i));
