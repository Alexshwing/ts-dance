interface Array<T> {
  myFindIndex(
    predicate: (value: number, index: number, obj: number[]) => unknown,
    thisArg?: any
  ): number;
}

const arr = [1, 2, 3];
console.log(arr.findIndex((item) => item == 3));

Array.prototype.myFindIndex = function (cb) {
  for (let i = 0; i < this.length; i++) {
    const ans = cb(this[i], i, this);
    if (ans) {
      return i;
    }
  }
  return -1;
};

console.log(arr.myFindIndex((item) => item === 3));
