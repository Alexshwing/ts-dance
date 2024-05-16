// copied from lib.es5.d.ts
declare interface Array<T> {
  myReduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T;
  myReduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T;
  myReduce<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U;
}

Array.prototype.myReduce = function (cb: any, ...args: any) {
  let start = 0,
    ans = 0;
  if (args.length > 0) {
    ans = args[0];
  } else {
    if (this.length === 0) {
      throw new Error('empty Array');
    }
    ans = this[0];
    start = 1;
  }
  for (let i = start; i < this.length; i += 1) {
    ans = cb(ans, this[i], i, this);
  }
  return ans;
};

console.log([1, 2, 3].myReduce((sum, item) => sum + item));
console.log([].myReduce((sum, item) => sum + item));
