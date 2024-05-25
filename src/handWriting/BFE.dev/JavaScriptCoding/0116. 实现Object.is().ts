/**
Object.is() 和===基于一致，除了以下情况：

Object.is(0, -0) // false
0 === -0 // true

Object.is(NaN, NaN) // true
NaN === NaN // false
 */

// https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/same-value.js
function is(a, b) {
  return a === b ? a !== 0 || 1 / a === 1 / b : a !== a && b !== b;
}

console.log(is({}, {}));
