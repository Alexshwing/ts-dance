interface Array<T> {
  myFill(value: number, start?: number, end?: number): number[];
}

console.log([0, 0, 0, 0, 0, 0].fill(1, 3, 5)); // [ 0, 0, 0, 1, 1, 0 ]
console.log([0, 0, 0, 0, 0, 0].fill(1, 3, -1)); // [ 0, 0, 0, 1, 1, 0 ]

Array.prototype.myFill = function (
  value: number,
  start: number = 0,
  end: number
) {
  if (end < 0) {
    end += this.length;
  }
  for (let i = start; i < end; i++) {
    this[i] = value;
  }
  return this;
};

console.log([0, 0, 0, 0, 0, 0].myFill(1, 3, 5)); // [ 0, 0, 0, 1, 1, 0 ]
console.log([0, 0, 0, 0, 0, 0].myFill(1, 3, -1)); // [ 0, 0, 0, 1, 1, 0 ]
