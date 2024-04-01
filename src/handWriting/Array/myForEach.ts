interface Array<T> {
  myForEach(
    callbackfn: (value: number, index: number, array: number[]) => void,
    thisArg?: any
  ): void;
}

const arr4 = [1, 2, 3];

arr4.forEach((item, i, arr) => console.log(item, i, arr));
// 1 0 [ 1, 2, 3 ]
// 2 1 [ 1, 2, 3 ]
// 3 2 [ 1, 2, 3 ]

Array.prototype.myForEach = function (cb) {
  for (let i = 0; i < this.length; i++) {
    cb(this[i], i, this);
  }
};

arr4.myForEach((item, i, arr) => console.log(item, i, arr));
