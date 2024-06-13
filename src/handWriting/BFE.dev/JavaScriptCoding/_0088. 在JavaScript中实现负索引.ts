// Python支持负索引，但是JavaScript不支持。

// 请实现一个wrapper函数，使得JavaScript中的负索引变为可能。

// const originalArr = [1,2,3]
// const arr = wrap(originalArr)

// arr[0] // 1
// arr[1] // 2
// arr[2] // 3
// arr[3] // undefined
// arr[-1] // 3
// arr[-2] // 2
// arr[-3] // 1
// arr[-4] // undefined
// 对arr执行的所有操作，都必须反映在原来的数组中，意思就是：

// arr.push(4)
// arr[3] // 4
// originalArr[3] // 4

// arr.shift()
// arr[0] // 2
// originalArr[0] // 2

// arr.bfe = 'bfe'
// originalArr.bfe // 'bfe'

// arr[-1] = 5
// arr // [2,3,5]
// originalArr // [2,3,5]

// originalArr[2] = 6
// arr // [2,3,6]
// originalArr // [2,3,6]

/**
 * @param {any[]} arr
 * @returns {?} - sorry no type hint for this
 */
function wrap(arr) {
  // your code here
}

const originalArr = [1, 2, 3];
const arr = wrap(originalArr);
console.log(arr[-1]);

export {};
