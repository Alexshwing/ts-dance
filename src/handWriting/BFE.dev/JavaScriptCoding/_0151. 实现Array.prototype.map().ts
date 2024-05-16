// copied from lib.es5.d.ts
declare interface Array<T> {
  myMap<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[];
}

Array.prototype.myMap = function (cb: any, thisArg: any) {
  const length = this.length;
  const res = [];
  for (let i = 0; i < length; i += 1) {
    if (i in this) {
      res.push(cb.call(thisArg, this[i], i, this));
    }
  }
  return res;
};

console.log([1, 2, 3].myMap((num) => num * 2));
