// const mp = new Map();
// function fib(n) {
//   if (mp.has(n)) {
//     return mp.get(n);
//   }
//   if (n === 0) return 0;
//   if (n === 1) return 1;
//   const res = fib(n - 1) + fib(n - 2);
//   mp.set(n, res);
//   return res;
// }

// [0,1,1,2,3,5,8,13 ...]
function fib(n, a = 0, b = 1) {
  if (n === 0) {
    return 0;
  }
  if (n <= 1) {
    return b;
  }
  return fib(n - 1, b, a + b);
}

console.log(fib(0));
console.log(fib(1));
console.log(fib(2));
console.log(fib(3));
console.log(fib(4));

/*
1. theshy ning xiaocaobao wx fireloli
2. xiyang haoye melo smlz baolan
30
*/

export {};
