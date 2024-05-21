// [0,1,1,2,3,5,8,13 ...]
function fib(n) {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  let a = 0,
    b = 1;
  for (let i = 2; i <= n; i += 1) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

export {};
