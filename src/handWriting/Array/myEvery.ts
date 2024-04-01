interface Array<T> {
  myEvery(
    predicate: (value: number, index: number, array: number[]) => unknown,
    thisArg?: any
  ): boolean;
}

const arr1 = [1, 2, 3];

console.log(arr1.every((item) => item > 4));
console.log(arr1.every((item) => item <= 4));

Array.prototype.myEvery = function (cb) {
  for (let i = 0; i < this.length; i++) {
    const ans = cb(this[i], i, this);
    if (!ans) {
      return false;
    }
  }
  return true;
};

console.log(arr1.myEvery((item) => item > 4));
console.log(arr1.myEvery((item) => item <= 4));
