interface Array<T> {
  myIncludes(searchElement: number, fromIndex?: number | undefined): boolean;
}

const arr5 = [1, NaN];

console.log(arr5.includes(1)); // true
console.log(arr5.includes(NaN)); // true
console.log(arr5.includes(1, 1)); // false
console.log(arr5.includes(1, -1)); // false
console.log(arr5.includes(1, -2)); // true

Array.prototype.myIncludes = function (target, fromIndex = 0) {
  if (fromIndex < 0) {
    fromIndex += this.length;
  }
  for (let i = fromIndex; i < this.length; i++) {
    if (target == this[i] || (Number.isNaN(this[i]) && Number.isNaN(target))) {
      return true;
    }
  }
  return false;
};

console.log(arr5.myIncludes(1)); // true
console.log(arr5.myIncludes(NaN)); // true
console.log(arr5.myIncludes(1, 1)); // false
console.log(arr5.myIncludes(1, -1)); // false
console.log(arr5.myIncludes(1, -2)); // true
