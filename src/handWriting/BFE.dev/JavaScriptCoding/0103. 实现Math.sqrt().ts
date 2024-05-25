/**
Math.sqrt()可以用来取得平方根。

你能实现自己的 mySqrt() 吗? 你只需要返回整数部分，小数部分可以忽略。

 */
function mySqrt(x) {
  if (isNaN(x) || x < 0) {
    return NaN;
  }
  let left = 0,
    right = x;
  while (left < right) {
    let mid = Math.floor((left + right + 1) / 2);
    if (mid * mid <= x) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  return left;
}

console.log(mySqrt(0));
console.log(mySqrt(1));
console.log(mySqrt(2));
console.log(mySqrt(4));
console.log(mySqrt(NaN));
console.log(mySqrt(NaN));
