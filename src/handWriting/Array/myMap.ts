interface Array<T> {
  myMap(
    callbackfn: (value: number, index: number, array: number[]) => number,
    thisArg?: any
  ): number[];
}

const arr6 = [1, 2, 3];

console.log(arr6.map((item, i) => item * i));

Array.prototype.myMap = function (cb) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(cb(this[i], i, this));
  }
  return res;
};

console.log(arr6.myMap((item, i) => item * i));
