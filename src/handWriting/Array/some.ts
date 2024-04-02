interface Array<T> {
  mySome(
    predicate: (value: number, index: number, array: number[]) => unknown,
    thisArg?: any
  ): boolean;
}
const arr8 = [0, 1, 4];

console.log(arr8.some((item, i) => item > i));

Array.prototype.mySome = function (cb) {
  for (let i = 0; i < this.length; i++) {
    const ans = cb(this[i], i, this);
    if (ans) {
      return true;
    }
  }
  return false;
};

console.log(arr8.mySome((item, i) => item > i));
