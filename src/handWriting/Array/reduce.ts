/*
第一次执行回调函数时，不存在“上一次的计算结果”。如果需要回调函数从数组索引为 0 的元素开始执行，则需要传递初始值。
否则，数组索引为 0 的元素将被用作初始值，迭代器将从第二个元素开始执行（即从索引为 1 而不是 0 的位置开始）
*/

interface Array<T> {
  myReduce(
    callbackfn: (
      previousValue: number,
      currentValue: number,
      currentIndex: number,
      array: number[]
    ) => number,
    initialValue?: number
  ): number;
}

const arr7 = [1, 1, 1];

console.log(arr7.reduce((prev, cur) => prev + cur));
console.log(arr7.reduce((prev, cur) => prev + cur, 1));

Array.prototype.myReduce = function (cb, ...args) {
  let start = 0,
    ans = 0;
  if (args.length > 0) {
    ans = args[0];
  } else {
    ans = this[0];
    start = 1;
  }
  for (let i = start; i < this.length; i++) {
    ans = cb(ans, this[i], i, this);
  }
  return ans;
};

console.log(arr7.myReduce((prev, cur) => prev + cur));
console.log(arr7.myReduce((prev, cur) => prev + cur, 1));
